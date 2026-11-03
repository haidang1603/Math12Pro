import { ExamData, ExamResult, ExamUserAnswers, MilestoneType, ExamAttemptRecord } from "@/types/exam";
import { MistakeItem } from "@/types/learning";
import { saveExamAttempt, saveMistake, updateChapterMasteryScore } from "./storageService";
import { EXAMS_BY_MILESTONE, MOCK_EXAM_2025 } from "@/data/mockExamData";

export interface SubmitExamPayload {
  milestone: MilestoneType;
  examId?: string;
  examTitle?: string;
  examData?: ExamData;
  answers: ExamUserAnswers;
  timeSpentSeconds: number;
}

export interface SubmitExamApiResponse {
  success: boolean;
  milestone: MilestoneType;
  examTitle: string;
  result: ExamResult;
  mistakes: MistakeItem[];
}

export interface CheckSingleQuestionPayload {
  questionId: string;
  userAnswer: unknown;
}

export interface CheckSingleQuestionApiResponse {
  success: boolean;
  questionId: string;
  chapterId: number;
  format: string;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  correctAnswer: string | number | boolean | Record<string, boolean>;
  generalExplanation: string;
  statementResults?: Array<{
    key: string;
    userAnswer?: boolean;
    correctAnswer: boolean;
    isCorrect: boolean;
    explanation: string;
  }>;
}

/**
 * Submit Exam to API (with offline fallback)
 */
export async function submitExamApi(
  payload: SubmitExamPayload,
  fallbackCalculator: () => ExamResult,
  examTitle: string
): Promise<{ result: ExamResult; mistakes: MistakeItem[]; savedAttempt: ExamAttemptRecord }> {
  try {
    const res = await fetch("/api/v1/exams/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data: SubmitExamApiResponse = await res.json();
      if (data.success && data.result) {
        // Save to persistent storage
        const savedAttempt = saveExamAttempt(
          payload.examId ? `exam-${payload.examId}` : `exam-${payload.milestone}`,
          data.examTitle || examTitle,
          payload.milestone,
          data.result,
          payload.answers
        );

        // Save all returned mistakes
        if (data.mistakes && Array.isArray(data.mistakes)) {
          data.mistakes.forEach((m) => saveMistake(m));
        }

        // Update chapter mastery from exam result
        data.result.chapterRadar.forEach((ch) => {
          updateChapterMasteryScore(ch.chapterId, 4, Math.round((ch.earnedScore / ch.maxScore) * 4));
        });

        return { result: data.result, mistakes: data.mistakes || [], savedAttempt };
      }
    }
  } catch (err) {
    console.warn("[ApiClient] API call failed, falling back to local computation:", err);
  }

  // Offline Fallback
  const localResult = fallbackCalculator();
  const savedAttempt = saveExamAttempt(
    `exam-${payload.milestone}`,
    examTitle,
    payload.milestone,
    localResult,
    payload.answers
  );

  // Extract mistakes locally
  const exam = EXAMS_BY_MILESTONE[payload.milestone] || MOCK_EXAM_2025;
  const localMistakes: MistakeItem[] = [];

  if (exam) {
    // Part 1
    exam.part1.forEach((q) => {
      if (payload.answers.part1[q.id] && payload.answers.part1[q.id] !== q.correctAnswer) {
        const m: MistakeItem = {
          id: `exam-p1-${q.id}-${Date.now()}`,
          source: "MOCK_EXAM",
          questionNumber: q.number,
          part: 1,
          chapterId: q.chapterId,
          chapterTitle: q.chapterName,
          topic: q.topic,
          problem: q.content,
          studentAnswer: payload.answers.part1[q.id] || "Chưa chọn",
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          tag: "Nhầm công thức",
          reviewCount: 1,
          resolved: false,
          date: "Thi thử hôm nay",
        };
        saveMistake(m);
        localMistakes.push(m);
      }
    });

    // Part 2
    exam.part2.forEach((q) => {
      const subAns = payload.answers.part2[q.id] || {};
      const wrongStatements: string[] = [];
      q.statements.forEach((stmt) => {
        if (subAns[stmt.key] !== stmt.correct) {
          wrongStatements.push(`Ý ${stmt.key}: chọn ${subAns[stmt.key] === undefined ? "Chưa chọn" : (subAns[stmt.key] ? "Đúng" : "Sai")} (Đáp án: ${stmt.correct ? "Đúng" : "Sai"})`);
        }
      });
      if (wrongStatements.length > 0) {
        const m: MistakeItem = {
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
        };
        saveMistake(m);
        localMistakes.push(m);
      }
    });

    // Part 3
    exam.part3.forEach((q) => {
      const rawUserAns = (payload.answers.part3[q.id] || "").trim().toLowerCase();
      const cleanUserAns = rawUserAns.replace(/\./g, ",");
      const cleanCorrect = q.correctAnswer.trim().toLowerCase().replace(/\./g, ",");
      const isMatch =
        cleanUserAns === cleanCorrect ||
        (q.acceptableAnswers &&
          q.acceptableAnswers.some((ans) => ans.trim().toLowerCase().replace(/\./g, ",") === cleanUserAns));

      if (rawUserAns && !isMatch) {
        const m: MistakeItem = {
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
        };
        saveMistake(m);
        localMistakes.push(m);
      }
    });
  }

  return { result: localResult, mistakes: localMistakes, savedAttempt };
}

/**
 * Check Single Question in Study Mode (with offline fallback)
 */
export async function checkSingleQuestionApi(
  payload: CheckSingleQuestionPayload
): Promise<CheckSingleQuestionApiResponse | null> {
  try {
    const res = await fetch("/api/v1/practice/check-single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        // Update chapter mastery
        updateChapterMasteryScore(data.chapterId, 1, data.isCorrect ? 1 : 0);
        return data;
      }
    }
  } catch (err) {
    console.warn("[ApiClient] checkSingleQuestion API failed, fallback to local:", err);
  }
  return null;
}

/**
 * Fetch practice questions
 */
export async function fetchPracticeQuestionsApi(params: {
  chapterId?: number | string;
  topic?: string;
  difficulty?: string;
  format?: string;
  limit?: number;
}) {
  try {
    const query = new URLSearchParams();
    if (params.chapterId) query.set("chapterId", String(params.chapterId));
    if (params.topic && params.topic !== "ALL") query.set("topic", params.topic);
    if (params.difficulty && params.difficulty !== "ALL") query.set("difficulty", params.difficulty);
    if (params.format && params.format !== "ALL") query.set("format", params.format);
    if (params.limit) query.set("limit", String(params.limit));

    const res = await fetch(`/api/v1/practice/questions?${query.toString()}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn("[ApiClient] fetchPracticeQuestions failed:", err);
  }
  return null;
}
