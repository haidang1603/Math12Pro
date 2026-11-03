import { NextRequest, NextResponse } from "next/server";
import { EXAMS_BY_MILESTONE, MOCK_EXAM_2025 } from "@/data/mockExamData";
import { calculateExamResult } from "@/utils/scoring";
import { MilestoneType } from "@/types/exam";
import { MistakeItem } from "@/types/learning";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { milestone = "TOT_NGHIEP_THPT", answers, timeSpentSeconds = 0 } = body;

    const exam = EXAMS_BY_MILESTONE[milestone as MilestoneType] || MOCK_EXAM_2025;
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

    const safeAnswers = {
      part1: answers.part1 || {},
      part2: answers.part2 || {},
      part3: answers.part3 || {},
      flagged: answers.flagged || {},
    };

    // Calculate result using official MoET 2025 rules
    const result = calculateExamResult(exam, safeAnswers, timeSpentSeconds);

    // Identify all mistakes across Part 1, Part 2, Part 3
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
      const rawUserAns = (safeAnswers.part3[q.id] || "").trim().toLowerCase();
      const cleanUserAns = rawUserAns.replace(/\./g, ",");
      const cleanCorrect = q.correctAnswer.trim().toLowerCase().replace(/\./g, ",");

      const isMatch =
        cleanUserAns === cleanCorrect ||
        (q.acceptableAnswers &&
          q.acceptableAnswers.some((ans) => ans.trim().toLowerCase().replace(/\./g, ",") === cleanUserAns));

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
