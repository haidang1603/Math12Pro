import { NextRequest, NextResponse } from "next/server";
import { STUDY_QUESTIONS } from "@/data/chaptersData";

interface StatementResult {
  key: string;
  userAnswer?: boolean;
  correctAnswer: boolean;
  isCorrect: boolean;
  explanation: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, userAnswer } = body;

    if (!questionId) {
      return NextResponse.json(
        { success: false, message: "Thiếu questionId" },
        { status: 400 }
      );
    }

    const question = STUDY_QUESTIONS.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { success: false, message: `Không tìm thấy câu hỏi với id: ${questionId}` },
        { status: 404 }
      );
    }

    let isCorrect = false;
    let earnedPoints = 0;
    let maxPoints = 0.25;
    let statementResults: StatementResult[] | null = null;

    if (question.format === "MULTIPLE_CHOICE") {
      maxPoints = 0.25;
      isCorrect = String(userAnswer).trim().toUpperCase() === String(question.correctAnswer).trim().toUpperCase();
      earnedPoints = isCorrect ? maxPoints : 0;
    } else if (question.format === "SHORT_ANSWER") {
      maxPoints = 0.50;
      const cleanUser = String(userAnswer || "").trim().toLowerCase().replace(/\./g, ",");
      const cleanTarget = String(question.correctAnswer || "").trim().toLowerCase().replace(/\./g, ",");
      isCorrect = cleanUser === cleanTarget;
      earnedPoints = isCorrect ? maxPoints : 0;
    } else if (question.format === "TRUE_FALSE" && question.statements) {
      maxPoints = 1.0;
      let correctCount = 0;
      statementResults = question.statements.map((stmt) => {
        const userVal = userAnswer?.[stmt.key];
        const isStmtCorrect = userVal === stmt.correct;
        if (isStmtCorrect) correctCount += 1;
        return {
          key: stmt.key,
          userAnswer: userVal,
          correctAnswer: stmt.correct,
          isCorrect: isStmtCorrect,
          explanation: stmt.explanation,
        };
      });

      // MoET 2025 progressive scoring
      if (correctCount === 1) earnedPoints = 0.1;
      else if (correctCount === 2) earnedPoints = 0.25;
      else if (correctCount === 3) earnedPoints = 0.5;
      else if (correctCount === 4) earnedPoints = 1.0;
      else earnedPoints = 0;

      isCorrect = correctCount === 4;
    }

    return NextResponse.json({
      success: true,
      questionId,
      chapterId: question.chapterId,
      format: question.format,
      isCorrect,
      earnedPoints,
      maxPoints,
      correctAnswer: question.correctAnswer,
      generalExplanation: question.explanation,
      statementResults,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi chấm câu hỏi ôn luyện",
        error: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
