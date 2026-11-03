import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  Min,
  Max,
} from "class-validator";

export class SubmitExamDto {
  @IsString()
  @IsNotEmpty()
  examId: string;

  @IsNumber()
  @Min(0)
  @Max(5400) // 90 minutes
  timeSpentSeconds: number;

  /**
   * Part I: Map questionId/number -> "A" | "B" | "C" | "D"
   */
  @IsObject()
  part1: Record<string, string>;

  /**
   * Part II: Map questionId/number -> { a: boolean, b: boolean, c: boolean, d: boolean }
   */
  @IsObject()
  part2: Record<string, Record<"a" | "b" | "c" | "d", boolean | undefined>>;

  /**
   * Part III: Map questionId/number -> string (up to 4 chars)
   */
  @IsObject()
  part3: Record<string, string>;
}

export interface ChapterRadarScore {
  chapterId: number;
  chapterName: string;
  earnedScore: number;
  maxScore: number;
  percentage: number;
  status: "Tốt" | "Khá" | "Yếu" | "Cần ôn tập gấp";
  weakTopics: { topicId: string; title: string }[];
}

export interface WeakTopicSuggestion {
  topicId: string;
  topicTitle: string;
  chapterId: number;
  chapterTitle: string;
  lostPoints: number;
}

export interface ExamAttemptResponseDto {
  attemptId: string;
  examId: string;
  totalScore: number; // 0.00 to 10.00
  scorePart1: number; // 0.00 to 3.00
  scorePart2: number; // 0.00 to 4.00
  scorePart3: number; // 0.00 to 3.00
  timeSpentSeconds: number;
  radarAnalysis: ChapterRadarScore[];
  weakTopics: WeakTopicSuggestion[];
  mistakesUpsertedCount: number;
  submittedAt: string;
  details: any[];
}
