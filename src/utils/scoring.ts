import { ExamData, ExamUserAnswers, ExamResult, ChapterAnalysis } from "@/types/exam";

export interface ExamScoreStructure {
  part1Score: number;
  part2Score: number;
  part3Score: number;
  perP1: number;
  perP2Max: number;
  perP3: number;
  formatLabel: string;
}

export function getExamScoreStructure(exam: ExamData): ExamScoreStructure {
  const countP1 = exam.part1?.length || 0;
  const countP2 = exam.part2?.length || 0;
  const countP3 = exam.part3?.length || 0;

  // Case 1: Pure Multiple Choice (e.g. 50 or 40 or 25 questions)
  if (countP2 === 0 && countP3 === 0 && countP1 > 0) {
    const perQ = 10.0 / countP1;
    return {
      part1Score: 10.0,
      part2Score: 0,
      part3Score: 0,
      perP1: perQ,
      perP2Max: 0,
      perP3: 0,
      formatLabel: `${countP1} câu Trắc nghiệm 4 lựa chọn (${perQ.toFixed(2)}đ/câu - Tổng 10.0đ)`,
    };
  }

  // Case 2: Hybrid Multiple Choice + Essay / Short Answer (e.g. 30 MC + 3 Essay)
  if (countP2 === 0 && countP3 > 0 && countP1 > 0) {
    const perP1 = 7.0 / countP1;
    const perP3 = 3.0 / countP3;
    return {
      part1Score: 7.0,
      part2Score: 0,
      part3Score: 3.0,
      perP1,
      perP2Max: 0,
      perP3,
      formatLabel: `${countP1} câu Trắc nghiệm (7.0đ) + ${countP3} câu Tự luận (3.0đ)`,
    };
  }

  // Case 3: Standard MOET GDPT 2025 - 2026 format (12 + 4 + 6)
  if (countP1 === 12 && countP2 === 4 && countP3 === 6) {
    return {
      part1Score: 3.0,
      part2Score: 4.0,
      part3Score: 3.0,
      perP1: 0.25,
      perP2Max: 1.0,
      perP3: 0.5,
      formatLabel: "Chuẩn GDPT 2026 (12 TN: 3.0đ • 4 Đ/S: 4.0đ • 6 TLN: 3.0đ)",
    };
  }

  // Case 4: General flexible custom distribution
  const rawTotal = countP1 * 0.25 + countP2 * 1.0 + countP3 * 0.5;
  const scale = rawTotal > 0 ? 10.0 / rawTotal : 1.0;
  const perP1 = 0.25 * scale;
  const perP2Max = 1.0 * scale;
  const perP3 = 0.5 * scale;

  return {
    part1Score: Math.round(countP1 * perP1 * 100) / 100,
    part2Score: Math.round(countP2 * perP2Max * 100) / 100,
    part3Score: Math.round(countP3 * perP3 * 100) / 100,
    perP1,
    perP2Max,
    perP3,
    formatLabel: `Tự do: ${countP1 + countP2 + countP3} câu (${countP1} TN • ${countP2} Đ/S • ${countP3} Tự luận/TLN)`,
  };
}

export function calculateExamResult(
  exam: ExamData,
  answers: ExamUserAnswers,
  timeSpentSeconds: number
): ExamResult {
  const structure = getExamScoreStructure(exam);

  // 1. Calculate Part 1 score (Dynamically weighted per question)
  let scorePart1 = 0;
  const chapterEarned: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const chapterMax: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const chapterWeakTopics: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  exam.part1.forEach((q) => {
    const maxQScore = structure.perP1;
    chapterMax[q.chapterId] = (chapterMax[q.chapterId] || 0) + maxQScore;

    const userAns = answers.part1[q.id];
    if (userAns === q.correctAnswer) {
      scorePart1 += maxQScore;
      chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + maxQScore;
    } else {
      chapterWeakTopics[q.chapterId].push(q.topic);
    }
  });

  // 2. Calculate Part 2 score (Progressive rule scaled to structure.perP2Max)
  let scorePart2 = 0;
  const part2Breakdown: { questionNumber: number; correctCount: number; score: number }[] = [];

  exam.part2.forEach((q) => {
    const maxQScore = structure.perP2Max;
    chapterMax[q.chapterId] = (chapterMax[q.chapterId] || 0) + maxQScore;

    const userSubAns = answers.part2[q.id] || { a: undefined, b: undefined, c: undefined, d: undefined };
    let correctInQuestion = 0;

    q.statements.forEach((stmt) => {
      if (userSubAns[stmt.key] === stmt.correct) {
        correctInQuestion += 1;
      }
    });

    let qPoints = 0;
    if (correctInQuestion === 1) qPoints = maxQScore * 0.1;
    else if (correctInQuestion === 2) qPoints = maxQScore * 0.25;
    else if (correctInQuestion === 3) qPoints = maxQScore * 0.5;
    else if (correctInQuestion === 4) qPoints = maxQScore * 1.0;

    scorePart2 += qPoints;
    chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + qPoints;

    if (correctInQuestion < 4) {
      chapterWeakTopics[q.chapterId].push(q.topic);
    }

    part2Breakdown.push({
      questionNumber: q.number,
      correctCount: correctInQuestion,
      score: qPoints,
    });
  });

  // 3. Calculate Part 3 score (Short answer / Essay weighted score)
  let scorePart3 = 0;

  exam.part3.forEach((q) => {
    const maxQScore = q.pointWeight || structure.perP3;
    chapterMax[q.chapterId] = (chapterMax[q.chapterId] || 0) + maxQScore;

    const rawUserAns = (answers.part3[q.id] || "").trim().toLowerCase();
    const cleanUserAns = rawUserAns.replace(/\./g, ",");
    const cleanCorrect = q.correctAnswer.trim().toLowerCase().replace(/\./g, ",");

    const isMatch =
      cleanUserAns === cleanCorrect ||
      (q.acceptableAnswers &&
        q.acceptableAnswers.some((ans) => ans.trim().toLowerCase().replace(/\./g, ",") === cleanUserAns));

    if (rawUserAns && isMatch) {
      scorePart3 += maxQScore;
      chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + maxQScore;
    } else {
      chapterWeakTopics[q.chapterId].push(q.topic);
    }
  });

  // Round scores to 2 decimal places to avoid floating point issues
  scorePart1 = Math.round(scorePart1 * 100) / 100;
  scorePart2 = Math.round(scorePart2 * 100) / 100;
  scorePart3 = Math.round(scorePart3 * 100) / 100;
  const totalScore = Math.min(10, Math.round((scorePart1 + scorePart2 + scorePart3) * 100) / 100);

  // Chapter radar analysis
  const chapterNames: Record<number, string> = {
    1: "Đạo hàm & Khảo sát",
    2: "Vectơ Oxyz",
    3: "Số đặc trưng ghép nhóm",
    4: "Nguyên hàm & Tích phân",
    5: "Tọa độ không gian",
    6: "Xác suất có điều kiện",
  };

  const chapterRadar: ChapterAnalysis[] = [1, 2, 3, 4, 5, 6].map((chId) => {
    const max = chapterMax[chId] || 1;
    const earned = chapterEarned[chId] || 0;
    const percentage = Math.round((earned / max) * 100);

    let status: ChapterAnalysis["status"] = "Tốt";
    if (percentage < 50) status = "Cần ôn tập gấp";
    else if (percentage < 70) status = "Yếu";
    else if (percentage < 85) status = "Khá";

    return {
      chapterId: chId,
      chapterName: chapterNames[chId],
      earnedScore: Math.round(earned * 100) / 100,
      maxScore: Math.round(max * 100) / 100,
      percentage,
      status,
      weakTopics: Array.from(new Set(chapterWeakTopics[chId])),
    };
  });

  const weakChapters = chapterRadar.filter((c) => c.percentage < 75);

  // Count total answered questions
  let answeredCount = 0;
  exam.part1.forEach((q) => {
    if (answers.part1[q.id]) answeredCount++;
  });
  exam.part2.forEach((q) => {
    const sub = answers.part2[q.id];
    if (sub && (sub.a !== undefined || sub.b !== undefined || sub.c !== undefined || sub.d !== undefined)) {
      answeredCount++;
    }
  });
  exam.part3.forEach((q) => {
    if (answers.part3[q.id]?.trim()) answeredCount++;
  });

  return {
    scorePart1,
    scorePart2,
    scorePart3,
    totalScore,
    chapterRadar,
    weakChapters,
    timeSpentSeconds,
    totalAnswered: answeredCount,
    totalQuestions: exam.part1.length + exam.part2.length + exam.part3.length,
    part2Breakdown,
    submittedAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}
