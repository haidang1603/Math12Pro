import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  Min,
  Max,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

export enum QuestionFormatEnum {
  SINGLE_CHOICE = "SINGLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SHORT_ANSWER = "SHORT_ANSWER",
}

export enum DifficultyLevelEnum {
  NHAN_BIET = "NHAN_BIET",
  THONG_HIEU = "THONG_HIEU",
  VAN_DUNG = "VAN_DUNG",
  VAN_DUNG_CAO = "VAN_DUNG_CAO",
}

export class GetPracticeQuestionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(6)
  chapterId?: number;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsString()
  problemTypeId?: string;

  @IsOptional()
  @IsEnum(QuestionFormatEnum)
  format?: QuestionFormatEnum;

  @IsOptional()
  @IsEnum(DifficultyLevelEnum)
  difficulty?: DifficultyLevelEnum;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;
}

export class CheckSingleQuestionDto {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  /**
   * Flexible answer depending on question format:
   * - SINGLE_CHOICE: "A" | "B" | "C" | "D"
   * - TRUE_FALSE: { "a": true, "b": false, "c": true, "d": false }
   * - SHORT_ANSWER: string up to 4 chars, e.g. "18" or "-2,5"
   */
  @IsNotEmpty()
  userAnswer: any;
}

export interface StatementCheckDetail {
  key: "a" | "b" | "c" | "d";
  userAnswer?: boolean;
  correctAnswer: boolean;
  isCorrect: boolean;
  explanation?: string;
}

export interface CheckSingleQuestionResponseDto {
  questionId: string;
  isCorrect: boolean;
  isFullPoints: boolean;
  pointsEarned: number;
  maxPoints: number;
  correctAnswer: any;
  generalExplanation: string;
  statementResults?: StatementCheckDetail[];
  chapterId: number;
  currentChapterMastery: number; // Updated % Mastery in ChapterMastery
}
