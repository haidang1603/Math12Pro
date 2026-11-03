export type TextbookSeries = "KNTT" | "CANH_DIEU" | "CHAN_TROI" | "ALL";

export type QuestionDifficulty = "Nhận biết" | "Thông hiểu" | "Vận dụng";

export type QuestionFormat = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";

export interface StudyQuestion {
  id: string;
  chapterId: number;
  topic: string;
  difficulty: QuestionDifficulty;
  format: QuestionFormat;
  content: string; // KaTeX supported
  options?: { key: "A" | "B" | "C" | "D"; text: string }[];
  correctAnswer?: "A" | "B" | "C" | "D" | string;
  statements?: { key: "a" | "b" | "c" | "d"; text: string; correct: boolean; explanation: string }[];
  explanation: string;
  unit?: string;
}

export interface ChapterTest {
  id: string;
  title: string;
  durationMinutes: number; // 45
  totalPoints: number; // 10
  questionsCount: number;
}

export interface Chapter {
  id: number;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  masteryPercent: number; // 0 - 100 based on practice history
  studyTopics: string[];
  specialFeature: {
    type: "desmos" | "vector3d" | "statistics" | "flashcard" | "mindmap" | "probabilityTree";
    label: string;
    badge: string;
  };
  theorySummary: string;
  keyFormulas: string[];
  textbookNotes: {
    kntt: string;
    canhDieu: string;
    chanTroi: string;
  };
}

export interface Flashcard {
  id: number;
  category: string;
  front: string;
  back: string;
  note: string;
}

export interface MistakeItem {
  id: string;
  source: "STUDY_MODE" | "MOCK_EXAM";
  questionNumber?: number;
  part?: number;
  chapterId: number;
  chapterTitle: string;
  topic: string;
  problem: string;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
  tag: "Nhầm công thức" | "Sai tính toán" | "Đọc sót giả thiết" | "Bẫy điều kiện xác định";
  reviewCount: number;
  resolved: boolean;
  date: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  avatar: string;
  score: number;
  timeSpent: string;
  accuracy: number;
  badge?: string;
}
