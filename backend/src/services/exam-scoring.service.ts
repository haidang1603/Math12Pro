import { Injectable } from "@nestjs/common";
import {
  SubmitExamDto,
  QuestionGradingDetail,
  ChapterRadarScore,
  StatementAnswer,
} from "../dto/submit-exam.dto";

export interface QuestionEntity {
  id: string;
  chapterId: number;
  section: "PART_1_SINGLE_CHOICE" | "PART_2_TRUE_FALSE" | "PART_3_SHORT_ANSWER";
  questionNumber: number;
  topic: string;
  maxPoints: number;
  options?: any;
  correctAnswer?: string;
  acceptableAnswers?: string[];
  statements?: { key: "a" | "b" | "c" | "d"; text: string; correct: boolean; explanation: string }[];
  explanation: string;
  unit?: string;
}

export interface ExamGradingOutput {
  scorePart1: number;
  scorePart2: number;
  scorePart3: number;
  totalScore: number;
  totalQuestions: number;
  totalAnswered: number;
  radarAnalysis: ChapterRadarScore[];
  weakChapters: ChapterRadarScore[];
  questionDetails: QuestionGradingDetail[];
}

@Injectable()
export class ExamScoringService {
  private readonly chapterNames: Record<number, string> = {
    1: "Đạo hàm & Khảo sát đồ thị",
    2: "Vectơ & Hệ trục Oxyz",
    3: "Số đặc trưng mẫu ghép nhóm",
    4: "Nguyên hàm & Tích phân",
    5: "Phương pháp tọa độ Oxyz",
    6: "Xác suất có điều kiện",
  };

  /**
   * Normalize short-answer inputs:
   * 1. Trim leading and trailing whitespace
   * 2. Replace all '.' with ',' (Vietnamese decimal comma format)
   * 3. Limit to at most 4 characters
   */
  public normalizeShortAnswer(input: string | undefined | null): string {
    if (!input) return "";
    let normalized = input.trim();
    // Convert period to comma
    normalized = normalized.replace(/\./g, ",");
    // Limit to max 4 characters
    return normalized.slice(0, 4);
  }

  /**
   * Official MoET progressive scoring rule for Part II:
   * - 1 statement correct: 0.10 pt
   * - 2 statements correct: 0.25 pt
   * - 3 statements correct: 0.50 pt
   * - 4 statements correct: 1.00 pt
   * - 0 statement correct: 0.00 pt
   */
  public calculatePart2Points(correctCount: number): number {
    switch (correctCount) {
      case 1:
        return 0.1;
      case 2:
        return 0.25;
      case 3:
        return 0.5;
      case 4:
        return 1.0;
      default:
        return 0.0;
    }
  }

  /**
   * Core scoring algorithm for 2025-2026 graduation exam structure
   */
  public gradeExam(
    questions: QuestionEntity[],
    submission: SubmitExamDto
  ): ExamGradingOutput {
    let scorePart1 = 0;
    let scorePart2 = 0;
    let scorePart3 = 0;
    let totalAnswered = 0;

    const chapterEarned: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const chapterMax: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const chapterWeakTopics: Record<number, Set<string>> = {
      1: new Set(),
      2: new Set(),
      3: new Set(),
      4: new Set(),
      5: new Set(),
      6: new Set(),
    };

    const questionDetails: QuestionGradingDetail[] = [];

    for (const q of questions) {
      const maxPoints = Number(q.maxPoints);
      chapterMax[q.chapterId] = (chapterMax[q.chapterId] || 0) + maxPoints;

      // -----------------------------------------------------------------------
      // PART I: SINGLE CHOICE (12 questions - 0.25 pt each)
      // -----------------------------------------------------------------------
      if (q.section === "PART_1_SINGLE_CHOICE") {
        const userChoice = submission.part1[q.id] || submission.part1[String(q.questionNumber)];
        if (userChoice) totalAnswered++;

        const isCorrect = Boolean(
          userChoice && userChoice.toUpperCase() === q.correctAnswer?.toUpperCase()
        );

        const pointsEarned = isCorrect ? maxPoints : 0;
        scorePart1 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        if (!isCorrect) {
          chapterWeakTopics[q.chapterId].add(q.topic);
        }

        questionDetails.push({
          questionId: q.id,
          chapterId: q.chapterId,
          section: "PART_1",
          questionNumber: q.questionNumber,
          topic: q.topic,
          maxPoints,
          pointsEarned,
          isFullPoints: isCorrect,
          userAnswer: userChoice || null,
          correctAnswer: q.correctAnswer,
        });
      }

      // -----------------------------------------------------------------------
      // PART II: TRUE / FALSE (4 questions - progressive scoring up to 1.0 pt)
      // -----------------------------------------------------------------------
      else if (q.section === "PART_2_TRUE_FALSE") {
        const userSubAnswers =
          submission.part2[q.id] || submission.part2[String(q.questionNumber)] || {};

        const hasAnsweredAny = ["a", "b", "c", "d"].some(
          (k) => userSubAnswers[k as "a" | "b" | "c" | "d"] !== undefined
        );
        if (hasAnsweredAny) totalAnswered++;

        const statementResults: StatementAnswer[] = [];
        let correctCount = 0;

        if (Array.isArray(q.statements)) {
          for (const stmt of q.statements) {
            const userVal = userSubAnswers[stmt.key];
            const isMatch = userVal !== undefined && userVal === stmt.correct;

            if (isMatch) correctCount++;

            statementResults.push({
              key: stmt.key,
              userAnswer: userVal,
              correctAnswer: stmt.correct,
              isCorrect: isMatch,
              explanation: stmt.explanation,
            });
          }
        }

        const pointsEarned = this.calculatePart2Points(correctCount);
        scorePart2 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        const isFullPoints = correctCount === 4;
        if (!isFullPoints) {
          chapterWeakTopics[q.chapterId].add(q.topic);
        }

        questionDetails.push({
          questionId: q.id,
          chapterId: q.chapterId,
          section: "PART_2",
          questionNumber: q.questionNumber,
          topic: q.topic,
          maxPoints,
          pointsEarned,
          isFullPoints,
          userAnswer: userSubAnswers,
          correctAnswer: q.statements?.map((s) => ({ key: s.key, correct: s.correct })),
          part2Statements: statementResults,
        });
      }

      // -----------------------------------------------------------------------
      // PART III: SHORT ANSWER (6 questions - 0.50 pt each)
      // -----------------------------------------------------------------------
      else if (q.section === "PART_3_SHORT_ANSWER") {
        const rawUserAns =
          submission.part3[q.id] || submission.part3[String(q.questionNumber)];

        const normalizedUserAns = this.normalizeShortAnswer(rawUserAns);
        if (normalizedUserAns) totalAnswered++;

        const normalizedCorrectAns = this.normalizeShortAnswer(q.correctAnswer);
        const normalizedAcceptables = (q.acceptableAnswers || []).map((ans) =>
          this.normalizeShortAnswer(ans)
        );

        const isCorrect = Boolean(
          normalizedUserAns &&
            (normalizedUserAns === normalizedCorrectAns ||
              normalizedAcceptables.includes(normalizedUserAns))
        );

        const pointsEarned = isCorrect ? maxPoints : 0;
        scorePart3 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        if (!isCorrect) {
          chapterWeakTopics[q.chapterId].add(q.topic);
        }

        questionDetails.push({
          questionId: q.id,
          chapterId: q.chapterId,
          section: "PART_3",
          questionNumber: q.questionNumber,
          topic: q.topic,
          maxPoints,
          pointsEarned,
          isFullPoints: isCorrect,
          userAnswer: normalizedUserAns || null,
          correctAnswer: normalizedCorrectAns,
        });
      }
    }

    // Round scores to 2 decimal places to prevent floating-point anomalies
    scorePart1 = Math.round(scorePart1 * 100) / 100;
    scorePart2 = Math.round(scorePart2 * 100) / 100;
    scorePart3 = Math.round(scorePart3 * 100) / 100;
    const totalScore = Math.min(
      10.0,
      Math.round((scorePart1 + scorePart2 + scorePart3) * 100) / 100
    );

    // Chapter Radar Analysis
    const radarAnalysis: ChapterRadarScore[] = [1, 2, 3, 4, 5, 6].map((chId) => {
      const max = chapterMax[chId] || 1;
      const earned = chapterEarned[chId] || 0;
      const percentage = Math.round((earned / max) * 100);

      let status: ChapterRadarScore["status"] = "Tốt";
      if (percentage < 50) status = "Cần ôn tập gấp";
      else if (percentage < 65) status = "Yếu";
      else if (percentage < 80) status = "Khá";

      return {
        chapterId: chId,
        chapterName: this.chapterNames[chId] || `Chương ${chId}`,
        earnedScore: Math.round(earned * 100) / 100,
        maxScore: Math.round(max * 100) / 100,
        percentage,
        status,
        weakTopics: Array.from(chapterWeakTopics[chId]),
      };
    });

    const weakChapters = radarAnalysis.filter((c) => c.percentage < 75);

    return {
      scorePart1,
      scorePart2,
      scorePart3,
      totalScore,
      totalQuestions: questions.length,
      totalAnswered,
      radarAnalysis,
      weakChapters,
      questionDetails,
    };
  }
}
