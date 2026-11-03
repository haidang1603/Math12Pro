import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { SubmitExamDto, ExamSubmissionResponseDto } from "../dto/submit-exam.dto";
import { ExamScoringService, QuestionEntity } from "./exam-scoring.service";

export type MistakeTag = "MISREAD_PREMISE" | "CALCULATION_ERROR" | "FORMULA_MISTAKE" | string;

// Interface representing the Prisma Client interface used by the service
export interface IPrismaService {
  exam: {
    findUnique: (args: any) => Promise<any>;
  };
  examSubmission: {
    create: (args: any) => Promise<any>;
  };
  mistakeNotebook: {
    findFirst: (args: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
  };
  $transaction: <T>(fn: (tx: any) => Promise<T>) => Promise<T>;
}

@Injectable()
export class ExamService {
  constructor(
    private readonly scoringService: ExamScoringService,
    // In actual NestJS, inject real PrismaService:
    // private readonly prisma: PrismaService,
  ) {}

  /**
   * Determine suitable mistake tag based on question section & user answer
   */
  private detectMistakeTag(section: string, question: QuestionEntity): MistakeTag {
    if (section === "PART_2_TRUE_FALSE") {
      return "MISREAD_PREMISE"; // Thường đọc sót giả thiết trong câu đúng/sai
    }
    if (section === "PART_3_SHORT_ANSWER") {
      return "CALCULATION_ERROR"; // Tính toán sai số
    }
    return "FORMULA_MISTAKE"; // Nhầm công thức
  }

  /**
   * Core workflow:
   * 1. Retrieve Exam and its questions
   * 2. Grade using ExamScoringService
   * 3. Persist submission, details, and auto-insert mistakes in a transaction
   * 4. Return formatted response for Frontend Radar & Result Dashboard
   */
  public async submitExam(
    userId: string,
    dto: SubmitExamDto,
    prisma: IPrismaService
  ): Promise<ExamSubmissionResponseDto> {
    // 1. Fetch exam with questions
    const exam = await prisma.exam.findUnique({
      where: { id: dto.examId },
      include: {
        questions: {
          orderBy: [{ section: "asc" }, { questionNumber: "asc" }],
        },
      },
    });

    if (!exam) {
      throw new NotFoundException(`Đề thi với ID ${dto.examId} không tồn tại.`);
    }

    if (!exam.questions || exam.questions.length === 0) {
      throw new BadRequestException("Đề thi này chưa có câu hỏi được cấu hình.");
    }

    // Transform DB questions to QuestionEntity format
    const questionEntities: QuestionEntity[] = exam.questions.map((q: any) => ({
      id: q.id,
      chapterId: q.chapterId,
      section: q.section,
      questionNumber: q.questionNumber,
      topic: q.topic,
      maxPoints: Number(q.maxPoints),
      options: q.options,
      correctAnswer: q.correctAnswer,
      acceptableAnswers: q.acceptableAnswers,
      statements: q.statements,
      explanation: q.explanation,
      unit: q.unit,
    }));

    // 2. Compute exact scores & radar analytics
    const grading = this.scoringService.gradeExam(questionEntities, dto);

    // 3. Execute DB Transaction
    const submissionResult = await prisma.$transaction(async (tx: any) => {
      // 3.1 Create ExamSubmission record
      const submission = await tx.examSubmission.create({
        data: {
          userId,
          examId: dto.examId,
          scorePart1: grading.scorePart1,
          scorePart2: grading.scorePart2,
          scorePart3: grading.scorePart3,
          totalScore: grading.totalScore,
          timeSpentSeconds: dto.timeSpentSeconds,
          radarAnalysis: grading.radarAnalysis,
          weakChapters: grading.weakChapters,
          details: {
            create: grading.questionDetails.map((detail) => ({
              questionId: detail.questionId,
              userAnswer: detail.userAnswer ?? {},
              pointsEarned: detail.pointsEarned,
              maxPoints: detail.maxPoints,
              isFullPoints: detail.isFullPoints,
            })),
          },
        },
      });

      // 3.2 Automatically record wrong questions into MistakeNotebook
      let mistakesCount = 0;
      for (const detail of grading.questionDetails) {
        // Any question with pointsEarned < maxPoints is recorded as a mistake
        if (!detail.isFullPoints) {
          mistakesCount++;
          const targetQuestion = questionEntities.find((q) => q.id === detail.questionId);

          const studentAnsString =
            typeof detail.userAnswer === "object"
              ? JSON.stringify(detail.userAnswer)
              : String(detail.userAnswer || "Chưa nhập");

          const correctAnsString =
            typeof detail.correctAnswer === "object"
              ? JSON.stringify(detail.correctAnswer)
              : String(detail.correctAnswer || "");

          const tag = this.detectMistakeTag(detail.section, targetQuestion!);

          // Check if already in notebook for this user
          const existingEntry = await tx.mistakeNotebook.findFirst({
            where: {
              userId,
              questionId: detail.questionId,
            },
          });

          if (existingEntry) {
            await tx.mistakeNotebook.update({
              where: { id: existingEntry.id },
              data: {
                submissionId: submission.id,
                studentAnswer: studentAnsString,
                correctAnswer: correctAnsString,
                reviewCount: { increment: 1 },
                isResolved: false, // Mark unresolved again because student erred
              },
            });
          } else {
            await tx.mistakeNotebook.create({
              data: {
                userId,
                questionId: detail.questionId,
                submissionId: submission.id,
                studentAnswer: studentAnsString,
                correctAnswer: correctAnsString,
                tag,
                reviewCount: 1,
                isResolved: false,
              },
            });
          }
        }
      }

      return { submission, mistakesCount };
    });

    // 4. Return complete response DTO for Frontend
    return {
      submissionId: submissionResult.submission.id,
      totalScore: grading.totalScore,
      scorePart1: grading.scorePart1,
      scorePart2: grading.scorePart2,
      scorePart3: grading.scorePart3,
      timeSpentSeconds: dto.timeSpentSeconds,
      totalQuestions: grading.totalQuestions,
      totalAnswered: grading.totalAnswered,
      radarAnalysis: grading.radarAnalysis,
      weakChapters: grading.weakChapters,
      mistakesRecordedCount: submissionResult.mistakesCount,
      submittedAt: new Date().toISOString(),
      details: grading.questionDetails,
    };
  }
}
