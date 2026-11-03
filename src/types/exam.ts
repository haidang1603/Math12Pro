export type SectionType = "PART_1" | "PART_2" | "PART_3";

export type MilestoneType = "GIUA_KI_1" | "CUOI_KI_1" | "GIUA_CUOI_KI_2" | "TOT_NGHIEP_THPT";

export interface SingleChoiceQuestionData {
  id: number;
  part: 1;
  number: number; // 1 to 12
  chapterId: number;
  chapterName: string;
  topic: string;
  content: string;
  svgContent?: string;
  imageUrl?: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty?: "Nhận biết" | "Thông hiểu" | "Vận dụng" | "Vận dụng cao";
}

export interface StatementData {
  key: "a" | "b" | "c" | "d";
  text: string;
  correct: boolean; // true = Đúng, false = Sai
  explanation: string;
}

export interface TrueFalseQuestionData {
  id: number;
  part: 2;
  number: number; // 1 to 4
  chapterId: number;
  chapterName: string;
  topic: string;
  context: string; // The primary problem statement/formula
  svgContent?: string;
  imageUrl?: string;
  statements: StatementData[];
  difficulty?: "Thông hiểu" | "Vận dụng" | "Vận dụng cao";
}

export interface ShortAnswerQuestionData {
  id: number;
  part: 3;
  number: number; // 1 to 6 or custom
  chapterId: number;
  chapterName: string;
  topic: string;
  content: string;
  svgContent?: string;
  imageUrl?: string;
  correctAnswer: string; // Exactly matched string, e.g., "12" or "-2,5" or "0,75"
  acceptableAnswers?: string[];
  explanation: string;
  unit?: string;
  difficulty?: "Vận dụng" | "Vận dụng cao";
  isEssay?: boolean; // Tự luận giải thích chi tiết
  pointWeight?: number; // Điểm số tùy biến cho câu này (vd: 1.0 điểm)
}

export type ExamFormatType =
  | "THPT_2026" // Chuẩn GDPT mới (12 TN + 4 Đ/S + 6 Trả lời ngắn)
  | "MULTIPLE_CHOICE_50" // 50 câu trắc nghiệm (90 phút)
  | "MULTIPLE_CHOICE_40" // 40 câu trắc nghiệm (50 phút)
  | "HYBRID_30_3" // 30 câu trắc nghiệm + 3 câu tự luận (90 phút)
  | "CUSTOM"; // Định dạng tùy ý theo học sinh / giáo viên

export interface ExamData {
  id: string;
  title: string;
  milestone: MilestoneType;
  durationMinutes: number; // 90
  part1: SingleChoiceQuestionData[];
  part2: TrueFalseQuestionData[];
  part3: ShortAnswerQuestionData[];
  examFormat?: ExamFormatType;
  isCustom?: boolean;
  createdAt?: string;
  authorName?: string;
  description?: string;
  tags?: string[];
}

export interface ExamUserAnswers {
  part1: Record<number, "A" | "B" | "C" | "D" | undefined>;
  part2: Record<number, Record<"a" | "b" | "c" | "d", boolean | undefined>>;
  part3: Record<number, string>;
  flagged: Record<string, boolean>; // e.g., "p1-3": true, "p2-1": true
}

export interface ChapterAnalysis {
  chapterId: number;
  chapterName: string;
  earnedScore: number;
  maxScore: number;
  percentage: number;
  status: "Tốt" | "Khá" | "Yếu" | "Cần ôn tập gấp";
  weakTopics: string[];
}

export interface ExamResult {
  scorePart1: number; // Max 3.0
  scorePart2: number; // Max 4.0
  scorePart3: number; // Max 3.0
  totalScore: number; // Max 10.0
  chapterRadar: ChapterAnalysis[];
  weakChapters: ChapterAnalysis[];
  timeSpentSeconds: number;
  totalAnswered: number;
  totalQuestions: number; // 22 questions (12 + 4 + 6)
  part2Breakdown: {
    questionNumber: number;
    correctCount: number;
    score: number;
  }[];
  submittedAt: string;
}

export interface ExamAttemptRecord {
  id: string;
  examId: string;
  examTitle: string;
  milestone: MilestoneType;
  totalScore: number;
  scorePart1: number;
  scorePart2: number;
  scorePart3: number;
  timeSpentSeconds: number;
  submittedAt: string;
  result: ExamResult;
  answers: ExamUserAnswers;
}

