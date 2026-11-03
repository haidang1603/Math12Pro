import { NextRequest, NextResponse } from "next/server";
import { ALL_DEFAULT_OFFICIAL_EXAMS, EXAMS_BY_MILESTONE, MOCK_EXAM_2025 } from "@/data/mockExamData";
import { calculateExamResult, isAnswerMatching } from "@/utils/scoring";
import { ExamData, ExamUserAnswers, MilestoneType } from "@/types/exam";
import { MistakeItem } from "@/types/learning";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { milestone = "TOT_NGHIEP_THPT", answers, timeSpentSeconds = 0, examData, examId } = body;

    let exam: ExamData | undefined = examData;
    if (!exam && examId) {
      exam = ALL_DEFAULT_OFFICIAL_EXAMS.find((e) => e.id === examId);
    }
    if (!exam) {
      exam = EXAMS_BY_MILESTONE[milestone as MilestoneType] || MOCK_EXAM_2025;
    }

    if (!exam) {
      return NextResponse.json(
        { success: false, message: `Không tìm thấy đề thi cho mốc: ${milestone}` },
        { status: 404 }
      );
    }

    if (!answers) {
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bài làm (answers)" },
        { status: 400 }
      );
    }

    const safeAnswers: ExamUserAnswers = {
      part1: answers.part1 || {},
      part2: answers.part2 || {},
      part3: answers.part3 || {},
      part4: answers.part4 || {},
      flagged: answers.flagged || {},
    };

    // Calculate result using official scoring rules
    const result = calculateExamResult(exam, safeAnswers, timeSpentSeconds);

    // Identify all mistakes across Part 1, Part 2, Part 3, Part 4
    const mistakes: MistakeItem[] = [];

    // 1. Part 1 mistakes
    exam.part1.forEach((q) => {
      const studentAns = safeAnswers.part1[q.id];
      if (studentAns !== q.correctAnswer) {
        mistakes.push({
          id: `exam-p1-${q.id}-${Date.now()}`,
          source: "MOCK_EXAM",
          questionNumber: q.number,
          part: 1,
          chapterId: q.chapterId,
          chapterTitle: q.chapterName,
          topic: q.topic,
          problem: q.content,
          studentAnswer: studentAns || "Chưa chọn",
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          tag: "Nhầm công thức",
          reviewCount: 1,
          resolved: false,
          date: "Thi thử hôm nay",
        });
      }
    });

    // 2. Part 2 mistakes (if any of the 4 statements is incorrect)
    exam.part2.forEach((q) => {
      const subAns = safeAnswers.part2[q.id] || {};
      const wrongStatements: string[] = [];
      q.statements.forEach((stmt) => {
        if (subAns[stmt.key] !== stmt.correct) {
          wrongStatements.push(`Ý ${stmt.key}: chọn ${subAns[stmt.key] === undefined ? "Chưa chọn" : (subAns[stmt.key] ? "Đúng" : "Sai")} (Đáp án: ${stmt.correct ? "Đúng" : "Sai"})`);
        }
      });

      if (wrongStatements.length > 0) {
        mistakes.push({
          id: `exam-p2-${q.id}-${Date.now()}`,
          source: "MOCK_EXAM",
          questionNumber: q.number,
          part: 2,
          chapterId: q.chapterId,
          chapterTitle: q.chapterName,
          topic: q.topic,
          problem: q.context,
          studentAnswer: wrongStatements.join("; "),
          correctAnswer: q.statements.map((s) => `${s.key}: ${s.correct ? "Đ" : "S"}`).join(" | "),
          explanation: q.statements.map((s) => `[Ý ${s.key}]: ${s.explanation}`).join("\n"),
          tag: "Đọc sót giả thiết",
          reviewCount: 1,
          resolved: false,
          date: "Thi thử hôm nay",
        });
      }
    });

    // 3. Part 3 mistakes (if short answer is incorrect)
    exam.part3.forEach((q) => {
      const rawUserAns = safeAnswers.part3[q.id];
      const isMatch = isAnswerMatching(rawUserAns, q.correctAnswer, q.acceptableAnswers);

      if (!isMatch) {
        mistakes.push({
          id: `exam-p3-${q.id}-${Date.now()}`,
          source: "MOCK_EXAM",
          questionNumber: q.number,
          part: 3,
          chapterId: q.chapterId,
          chapterTitle: q.chapterName,
          topic: q.topic,
          problem: q.content,
          studentAnswer: rawUserAns || "Chưa nhập",
          correctAnswer: q.correctAnswer + (q.unit ? ` (${q.unit})` : ""),
          explanation: q.explanation,
          tag: "Sai tính toán",
          reviewCount: 1,
          resolved: false,
          date: "Thi thử hôm nay",
        });
      }
    });

    // 4. Part 4 mistakes (Tự luận essay)
    if (exam.part4 && Array.isArray(exam.part4)) {
      exam.part4.forEach((q) => {
        const rawUserAns = safeAnswers.part4?.[q.id];
        const isMatch = isAnswerMatching(rawUserAns, q.correctAnswer, q.acceptableAnswers);

        if (!isMatch) {
          mistakes.push({
            id: `exam-p4-${q.id}-${Date.now()}`,
            source: "MOCK_EXAM",
            questionNumber: q.number,
            part: 4,
            chapterId: q.chapterId,
            chapterTitle: q.chapterName,
            topic: q.topic,
            problem: q.content,
            studentAnswer: rawUserAns || "Chưa nhập",
            correctAnswer: q.correctAnswer + (q.unit ? ` (${q.unit})` : ""),
            explanation: q.explanation,
            tag: "Sai tính toán",
            reviewCount: 1,
            resolved: false,
            date: "Thi thử hôm nay",
          });
        }
      });
    }

    return NextResponse.json({
      success: true,
      milestone,
      examTitle: exam.title,
      result,
      mistakes,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi chấm bài thi thử",
        error: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
