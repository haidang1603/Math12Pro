import { Injectable, NotFoundException } from "@nestjs/common";
import {
  GetPracticeQuestionsDto,
  CheckSingleQuestionDto,
  CheckSingleQuestionResponseDto,
  StatementCheckDetail,
} from "../dto/practice.dto";

// Prisma client interface for dependency injection
export interface IPracticePrismaService {
  question: {
    findMany: (args: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any>;
  };
  chapterMastery: {
    findUnique: (args: any) => Promise<any>;
    upsert: (args: any) => Promise<any>;
  };
  mistakeNotebook: {
    findUnique: (args: any) => Promise<any>;
    upsert: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
  };
}

@Injectable()
export class PracticeService {
  /**
   * Helper: Normalize short answer string
   * Trim whitespace, convert '.' to ',', max 4 chars
   */
  public normalizeShortAnswer(input: any): string {
    if (input === null || input === undefined) return "";
    let str = String(input).trim();
    str = str.replace(/\./g, ",");
    return str.slice(0, 4);
  }

  /**
   * Helper: Calculate Part II progressive points
   */
  public calculateTrueFalsePoints(correctCount: number): number {
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
   * 1. Get Practice Questions based on flexible multi-dimensional filters
   * Does NOT lock route: students can practice any chapter freely.
   */
  public async getPracticeQuestions(
    dto: GetPracticeQuestionsDto,
    prisma: IPracticePrismaService
  ) {
    const where: any = {};

    if (dto.chapterId) where.chapterId = dto.chapterId;
    if (dto.topicId) where.topicId = dto.topicId;
    if (dto.problemTypeId) where.problemTypeId = dto.problemTypeId;
    if (dto.format) where.format = dto.format;
    if (dto.difficulty) where.difficulty = dto.difficulty;

    const questions = await prisma.question.findMany({
      where,
      take: dto.limit || 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        chapterId: true,
        topicId: true,
        problemTypeId: true,
        format: true,
        difficulty: true,
        content: true,
        options: true,
        statements: true, // Only statements text, not correct values in client list
        maxPoints: true,
        unit: true,
      },
    });

    return questions;
  }

  /**
   * 2. Instant grading for a single question in Study Mode:
   * - Evaluates answer based on question format
   * - Provides step-by-step mathematical explanation
   * - Upserts MistakeNotebook if pointsEarned < maxPoints
   * - Updates ChapterMastery percentage for the user
   */
  public async checkSingleQuestion(
    userId: string,
    dto: CheckSingleQuestionDto,
    prisma: IPracticePrismaService
  ): Promise<CheckSingleQuestionResponseDto> {
    const question = await prisma.question.findUnique({
      where: { id: dto.questionId },
      include: {
        topic: true,
        problemType: true,
      },
    });

    if (!question) {
      throw new NotFoundException(`Câu hỏi ID ${dto.questionId} không tồn tại.`);
    }

    const maxPoints = Number(question.maxPoints);
    let pointsEarned = 0;
    let isFullPoints = false;
    let statementResults: StatementCheckDetail[] | undefined = undefined;

    // A. Single Choice (Phần I - 0.25đ)
    if (question.format === "SINGLE_CHOICE") {
      const userChoice = String(dto.userAnswer || "").trim().toUpperCase();
      const correctChoice = String(question.correctAnswer || "").trim().toUpperCase();
      const isMatch = userChoice === correctChoice;

      pointsEarned = isMatch ? maxPoints : 0;
      isFullPoints = isMatch;
    }
    // B. True / False (Phần II - Lũy tiến tối đa 1.0đ)
    else if (question.format === "TRUE_FALSE") {
      const userStatements = (dto.userAnswer || {}) as Record<string, boolean>;
      const rawStatements = (question.statements || []) as any[];

      let correctCount = 0;
      statementResults = [];

      for (const stmt of rawStatements) {
        const userVal = userStatements[stmt.key];
        const isCorrect = userVal !== undefined && userVal === stmt.correct;

        if (isCorrect) correctCount++;

        statementResults.push({
          key: stmt.key,
          userAnswer: userVal,
          correctAnswer: stmt.correct,
          isCorrect,
          explanation: stmt.explanation,
        });
      }

      pointsEarned = this.calculateTrueFalsePoints(correctCount);
      isFullPoints = correctCount === 4;
    }
    // C. Short Answer (Phần III - Chuẩn hóa chuỗi 0.50đ)
    else if (question.format === "SHORT_ANSWER") {
      const normalizedUser = this.normalizeShortAnswer(dto.userAnswer);
      const normalizedCorrect = this.normalizeShortAnswer(question.correctAnswer);
      const acceptable = ((question.acceptableAnswers || []) as string[]).map((ans) =>
        this.normalizeShortAnswer(ans)
      );

      const isMatch =
        Boolean(normalizedUser) &&
        (normalizedUser === normalizedCorrect || acceptable.includes(normalizedUser));

      pointsEarned = isMatch ? maxPoints : 0;
      isFullPoints = isMatch;
    }

    // 3. Upsert into MistakeNotebook if pointsEarned < maxPoints
    if (!isFullPoints) {
      await prisma.mistakeNotebook.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: question.id,
          },
        },
        create: {
          userId,
          questionId: question.id,
          problemTypeId: question.problemTypeId,
          source: "PRACTICE",
          studentAnswer:
            typeof dto.userAnswer === "object"
              ? JSON.stringify(dto.userAnswer)
              : String(dto.userAnswer || "Chưa nhập"),
          correctAnswer:
            typeof question.correctAnswer === "object"
              ? JSON.stringify(question.correctAnswer)
              : String(question.correctAnswer || "Xem giải thích"),
          wrongCount: 1,
          isResolved: false,
          lastMistakeAt: new Date(),
        },
        update: {
          studentAnswer:
            typeof dto.userAnswer === "object"
              ? JSON.stringify(dto.userAnswer)
              : String(dto.userAnswer || "Chưa nhập"),
          wrongCount: { increment: 1 },
          isResolved: false,
          lastMistakeAt: new Date(),
        },
      });
    } else {
      // If student achieved full points, mark mistake resolved if it was present
      try {
        await prisma.mistakeNotebook.update({
          where: {
            userId_questionId: {
              userId,
              questionId: question.id,
            },
          },
          data: {
            isResolved: true,
            resolvedAt: new Date(),
          },
        });
      } catch (e) {
        // Not previously in mistake notebook, ignore
      }
    }

    // 4. Update ChapterMastery score
    const existingMastery = await prisma.chapterMastery.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId: question.chapterId,
        },
      },
    });

    const totalAttempted = (existingMastery?.totalAttempted || 0) + 1;
    const totalCorrect = (existingMastery?.totalCorrect || 0) + (isFullPoints ? 1 : 0);
    const newMasteryScore = Math.round((totalCorrect / totalAttempted) * 10000) / 100; // 0.00 to 100.00 %

    const updatedMastery = await prisma.chapterMastery.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: question.chapterId,
        },
      },
      create: {
        userId,
        chapterId: question.chapterId,
        totalAttempted,
        totalCorrect,
        masteryScore: newMasteryScore,
        lastPracticedAt: new Date(),
      },
      update: {
        totalAttempted,
        totalCorrect,
        masteryScore: newMasteryScore,
        lastPracticedAt: new Date(),
      },
    });

    return {
      questionId: question.id,
      isCorrect: pointsEarned > 0,
      isFullPoints,
      pointsEarned,
      maxPoints,
      correctAnswer: question.correctAnswer || question.statements,
      generalExplanation: question.generalExplanation,
      statementResults,
      chapterId: question.chapterId,
      currentChapterMastery: Number(updatedMastery.masteryScore),
    };
  }
}
