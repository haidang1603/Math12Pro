import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import {
  SubmitExamDto,
  ExamAttemptResponseDto,
  ChapterRadarScore,
  WeakTopicSuggestion,
} from "../dto/exam.dto";

export interface IExamPrismaService {
  exam: {
    findUnique: (args: any) => Promise<any>;
  };
  examAttempt: {
    create: (args: any) => Promise<any>;
  };
  mistakeNotebook: {
    upsert: (args: any) => Promise<any>;
  };
  $transaction: <T>(fn: (tx: any) => Promise<T>) => Promise<T>;
}

@Injectable()
export class ExamGradingService {
  private readonly chapterNames: Record<number, string> = {
    1: "Đạo hàm & Khảo sát đồ thị",
    2: "Vectơ & Hệ trục Oxyz",
    3: "Số đặc trưng mẫu ghép nhóm",
    4: "Nguyên hàm & Tích phân",
    5: "Phương pháp tọa độ Oxyz",
    6: "Xác suất có điều kiện",
  };

  /**
   * String normalization for Part III short answers:
   * 1. Trim leading and trailing whitespace
   * 2. Replace all '.' with ','
   * 3. Limit to at most 4 characters
   */
  public normalizeShortAnswer(input: any): string {
    if (input === null || input === undefined) return "";
    let str = String(input).trim();
    str = str.replace(/\./g, ",");
    return str.slice(0, 4);
  }

  /**
   * MoET Progressive scoring rule for Part II:
   * - 1 statement correct: 0.10 pt
   * - 2 statements correct: 0.25 pt
   * - 3 statements correct: 0.50 pt
   * - 4 statements correct: 1.00 pt
   * - 0 statement correct: 0.00 pt
   */
  public calculatePart2ProgressivePoints(correctCount: number): number {
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
   * Grade an exam submission and compute analytics
   */
  public gradeSubmission(questions: any[], dto: SubmitExamDto) {
    let scorePart1 = 0;
    let scorePart2 = 0;
    let scorePart3 = 0;

    const chapterEarned: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const chapterMax: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const lostPointsPerTopic: Record<string, { topicId: string; title: string; chapterId: number; lost: number }> = {};

    const gradedDetails: any[] = [];

    for (const q of questions) {
      const maxPoints = Number(q.maxPoints);
      chapterMax[q.chapterId] = (chapterMax[q.chapterId] || 0) + maxPoints;

      // -----------------------------------------------------------------------
      // PHẦN I: SINGLE CHOICE (12 câu - 0.25đ/câu)
      // -----------------------------------------------------------------------
      if (q.format === "SINGLE_CHOICE") {
        const userChoice = dto.part1[q.id] || dto.part1[String(q.questionNumber)];
        const isMatch = Boolean(
          userChoice &&
            String(userChoice).trim().toUpperCase() === String(q.correctAnswer).trim().toUpperCase()
        );

        const pointsEarned = isMatch ? maxPoints : 0;
        scorePart1 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        if (!isMatch) {
          const topicKey = q.topicId || `t-${q.chapterId}`;
          if (!lostPointsPerTopic[topicKey]) {
            lostPointsPerTopic[topicKey] = {
              topicId: q.topicId,
              title: q.topic?.title || "Chuyên đề",
              chapterId: q.chapterId,
              lost: 0,
            };
          }
          lostPointsPerTopic[topicKey].lost += maxPoints;
        }

        gradedDetails.push({
          questionId: q.id,
          problemTypeId: q.problemTypeId,
          chapterId: q.chapterId,
          format: q.format,
          questionNumber: q.questionNumber,
          userAnswer: userChoice || null,
          correctAnswer: q.correctAnswer,
          pointsEarned,
          maxPoints,
          isFullPoints: isMatch,
        });
      }

      // -----------------------------------------------------------------------
      // PHẦN II: TRUE / FALSE (4 câu - Lũy tiến tối đa 1.0đ/câu)
      // -----------------------------------------------------------------------
      else if (q.format === "TRUE_FALSE") {
        const userStatements =
          dto.part2[q.id] || dto.part2[String(q.questionNumber)] || {};

        let correctCount = 0;
        const rawStatements = (q.statements || []) as any[];

        for (const stmt of rawStatements) {
          const val = userStatements[stmt.key];
          if (val !== undefined && val === stmt.correct) {
            correctCount++;
          }
        }

        const pointsEarned = this.calculatePart2ProgressivePoints(correctCount);
        scorePart2 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        const isFullPoints = correctCount === 4;
        if (!isFullPoints) {
          const topicKey = q.topicId || `t-${q.chapterId}`;
          if (!lostPointsPerTopic[topicKey]) {
            lostPointsPerTopic[topicKey] = {
              topicId: q.topicId,
              title: q.topic?.title || "Chuyên đề",
              chapterId: q.chapterId,
              lost: 0,
            };
          }
          lostPointsPerTopic[topicKey].lost += maxPoints - pointsEarned;
        }

        gradedDetails.push({
          questionId: q.id,
          problemTypeId: q.problemTypeId,
          chapterId: q.chapterId,
          format: q.format,
          questionNumber: q.questionNumber,
          userAnswer: userStatements,
          correctAnswer: q.statements,
          pointsEarned,
          maxPoints,
          isFullPoints,
          correctStatementsCount: correctCount,
        });
      }

      // -----------------------------------------------------------------------
      // PHẦN III: SHORT ANSWER (6 câu - Chuẩn hóa 4 ký tự - 0.50đ/câu)
      // -----------------------------------------------------------------------
      else if (q.format === "SHORT_ANSWER") {
        const rawUserAns = dto.part3[q.id] || dto.part3[String(q.questionNumber)];
        const normalizedUser = this.normalizeShortAnswer(rawUserAns);
        const normalizedCorrect = this.normalizeShortAnswer(q.correctAnswer);
        const normalizedAcceptables = ((q.acceptableAnswers || []) as string[]).map((ans) =>
          this.normalizeShortAnswer(ans)
        );

        const isMatch =
          Boolean(normalizedUser) &&
          (normalizedUser === normalizedCorrect ||
            normalizedAcceptables.includes(normalizedUser));

        const pointsEarned = isMatch ? maxPoints : 0;
        scorePart3 += pointsEarned;
        chapterEarned[q.chapterId] = (chapterEarned[q.chapterId] || 0) + pointsEarned;

        if (!isMatch) {
          const topicKey = q.topicId || `t-${q.chapterId}`;
          if (!lostPointsPerTopic[topicKey]) {
            lostPointsPerTopic[topicKey] = {
              topicId: q.topicId,
              title: q.topic?.title || "Chuyên đề",
              chapterId: q.chapterId,
              lost: 0,
            };
          }
          lostPointsPerTopic[topicKey].lost += maxPoints;
        }

        gradedDetails.push({
          questionId: q.id,
          problemTypeId: q.problemTypeId,
          chapterId: q.chapterId,
          format: q.format,
          questionNumber: q.questionNumber,
          userAnswer: normalizedUser || null,
          correctAnswer: normalizedCorrect,
          pointsEarned,
          maxPoints,
          isFullPoints: isMatch,
        });
      }
    }

    // Round scores
    scorePart1 = Math.round(scorePart1 * 100) / 100;
    scorePart2 = Math.round(scorePart2 * 100) / 100;
    scorePart3 = Math.round(scorePart3 * 100) / 100;
    const totalScore = Math.min(
      10.0,
      Math.round((scorePart1 + scorePart2 + scorePart3) * 100) / 100
    );

    // Compute Radar scores for 6 chapters
    const radarAnalysis: ChapterRadarScore[] = [1, 2, 3, 4, 5, 6].map((chId) => {
      const max = chapterMax[chId] || 1;
      const earned = chapterEarned[chId] || 0;
      const percentage = Math.round((earned / max) * 100);

      let status: ChapterRadarScore["status"] = "Tốt";
      if (percentage < 50) status = "Cần ôn tập gấp";
      else if (percentage < 65) status = "Yếu";
      else if (percentage < 80) status = "Khá";

      const chapterWeakTopics = Object.values(lostPointsPerTopic)
        .filter((t) => t.chapterId === chId)
        .map((t) => ({ topicId: t.topicId, title: t.title }));

      return {
        chapterId: chId,
        chapterName: this.chapterNames[chId],
        earnedScore: Math.round(earned * 100) / 100,
        maxScore: Math.round(max * 100) / 100,
        percentage,
        status,
        weakTopics: chapterWeakTopics,
      };
    });

    const weakTopics: WeakTopicSuggestion[] = Object.values(lostPointsPerTopic)
      .sort((a, b) => b.lost - a.lost)
      .map((t) => ({
        topicId: t.topicId,
        topicTitle: t.title,
        chapterId: t.chapterId,
        chapterTitle: this.chapterNames[t.chapterId],
        lostPoints: Math.round(t.lost * 100) / 100,
      }));

    return {
      scorePart1,
      scorePart2,
      scorePart3,
      totalScore,
      radarAnalysis,
      weakTopics,
      gradedDetails,
    };
  }

  /**
   * Main submit service method executing transactional persistence
   * and Mistake Notebook automatic upsert
   */
  public async submitExamService(
    userId: string,
    dto: SubmitExamDto,
    prisma: IExamPrismaService
  ): Promise<ExamAttemptResponseDto> {
    const exam = await prisma.exam.findUnique({
      where: { id: dto.examId },
      include: {
        questions: {
          include: {
            topic: true,
            problemType: true,
          },
          orderBy: [{ format: "asc" }, { questionNumber: "asc" }],
        },
      },
    });

    if (!exam) {
      throw new NotFoundException(`Đề thi ID ${dto.examId} không tồn tại.`);
    }

    if (!exam.questions || exam.questions.length === 0) {
      throw new BadRequestException("Đề thi này chưa có câu hỏi.");
    }

    // 1. Grade the submission
    const grading = this.gradeSubmission(exam.questions, dto);

    // 2. Perform DB Transaction
    const transactionResult = await prisma.$transaction(async (tx: any) => {
      // Create ExamAttempt
      const attempt = await tx.examAttempt.create({
        data: {
          userId,
          examId: dto.examId,
          scorePart1: grading.scorePart1,
          scorePart2: grading.scorePart2,
          scorePart3: grading.scorePart3,
          totalScore: grading.totalScore,
          timeSpentSeconds: dto.timeSpentSeconds,
          radarAnalysis: grading.radarAnalysis,
          weakTopics: grading.weakTopics,
          attemptAnswers: {
            create: grading.gradedDetails.map((detail) => ({
              questionId: detail.questionId,
              userAnswer: detail.userAnswer ?? {},
              pointsEarned: detail.pointsEarned,
              maxPoints: detail.maxPoints,
              isFullPoints: detail.isFullPoints,
            })),
          },
        },
      });

      // Upsert into MistakeNotebook for all questions where pointsEarned < maxPoints
      let mistakesUpserted = 0;
      for (const detail of grading.gradedDetails) {
        if (!detail.isFullPoints) {
          mistakesUpserted++;

          const studentAnsString =
            typeof detail.userAnswer === "object"
              ? JSON.stringify(detail.userAnswer)
              : String(detail.userAnswer || "Chưa nhập");

          const correctAnsString =
            typeof detail.correctAnswer === "object"
              ? JSON.stringify(detail.correctAnswer)
              : String(detail.correctAnswer || "Xem đáp án");

          await tx.mistakeNotebook.upsert({
            where: {
              userId_questionId: {
                userId,
                questionId: detail.questionId,
              },
            },
            create: {
              userId,
              questionId: detail.questionId,
              problemTypeId: detail.problemTypeId,
              source: "MOCK_EXAM",
              studentAnswer: studentAnsString,
              correctAnswer: correctAnsString,
              wrongCount: 1,
              isResolved: false,
              lastMistakeAt: new Date(),
            },
            update: {
              studentAnswer: studentAnsString,
              wrongCount: { increment: 1 },
              isResolved: false,
              lastMistakeAt: new Date(),
            },
          });
        }
      }

      return { attempt, mistakesUpserted };
    });

    return {
      attemptId: transactionResult.attempt.id,
      examId: dto.examId,
      totalScore: grading.totalScore,
      scorePart1: grading.scorePart1,
      scorePart2: grading.scorePart2,
      scorePart3: grading.scorePart3,
      timeSpentSeconds: dto.timeSpentSeconds,
      radarAnalysis: grading.radarAnalysis,
      weakTopics: grading.weakTopics,
      mistakesUpsertedCount: transactionResult.mistakesUpserted,
      submittedAt: new Date().toISOString(),
      details: grading.gradedDetails,
    };
  }
}
