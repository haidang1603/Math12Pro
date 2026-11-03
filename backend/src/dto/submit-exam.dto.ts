import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  Min,
  Max,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class TrueFalseSubAnswerDto {
  a?: boolean;
  b?: boolean;
  c?: boolean;
  d?: boolean;
}

export class SubmitExamDto {
  @IsString()
  @IsNotEmpty()
  examId: string;

  @IsNumber()
  @Min(0)
  @Max(5400) // 90 minutes max
  timeSpentSeconds: number;

  /**
   * Part I Answers: Map questionId/number -> "A" | "B" | "C" | "D"
   * Example: { "q-p1-1": "C", "q-p1-2": "B" }
   */
  @IsObject()
  part1: Record<string, string>;

  /**
   * Part II Answers: Map questionId/number -> { a: boolean, b: boolean, c: boolean, d: boolean }
   * Example: { "q-p2-1": { a: true, b: true, c: true, d: false } }
   */
  @IsObject()
  part2: Record<string, Record<"a" | "b" | "c" | "d", boolean | undefined>>;

  /**
   * Part III Answers: Map questionId/number -> string (up to 4 chars)
   * Example: { "q-p3-1": "18", "q-p3-2": "2,5" }
   */
  @IsObject()
  part3: Record<string, string>;
}

export interface StatementAnswer {
  key: "a" | "b" | "c" | "d";
  userAnswer?: boolean;
  correctAnswer: boolean;
  isCorrect: boolean;
  explanation: string;
}

export interface QuestionGradingDetail {
  questionId: string;
  chapterId: number;
  section: "PART_1" | "PART_2" | "PART_3";
  questionNumber: number;
  topic: string;
  maxPoints: number;
  pointsEarned: number;
  isFullPoints: boolean;
  userAnswer: any;
  correctAnswer: any;
  part2Statements?: StatementAnswer[];
}

export interface ChapterRadarScore {
  chapterId: number;
  chapterName: string;
  earnedScore: number;
  maxScore: number;
  percentage: number;
  status: "Tốt" | "Khá" | "Yếu" | "Cần ôn tập gấp";
  weakTopics: string[];
}

export interface ExamSubmissionResponseDto {
  submissionId: string;
  totalScore: number; // 0.00 to 10.00
  scorePart1: number; // 0.00 to 3.00
  scorePart2: number; // 0.00 to 4.00
  scorePart3: number; // 0.00 to 3.00
  timeSpentSeconds: number;
  totalQuestions: number;
  totalAnswered: number;
  radarAnalysis: ChapterRadarScore[];
  weakChapters: ChapterRadarScore[];
  mistakesRecordedCount: number;
  submittedAt: string;
  details: QuestionGradingDetail[];
}
