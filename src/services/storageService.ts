import { ExamAttemptRecord, ExamResult, ExamUserAnswers, MilestoneType } from "@/types/exam";
import { Chapter, MistakeItem } from "@/types/learning";
import { CHAPTERS_DATA } from "@/data/chaptersData";

const STORAGE_KEYS = {
  EXAM_HISTORY: "math12pro_exam_history",
  MISTAKE_NOTEBOOK: "math12pro_mistakes",
  CHAPTER_MASTERY: "math12pro_chapter_mastery",
  STREAK_DATA: "math12pro_streak_data",
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`[Storage] Failed to read key ${key}:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[Storage] Failed to save key ${key}:`, e);
  }
}

/**
 * Exam History Management
 */
export function getExamHistory(): ExamAttemptRecord[] {
  return safeGet<ExamAttemptRecord[]>(STORAGE_KEYS.EXAM_HISTORY, []);
}

export function saveExamAttempt(
  examId: string,
  examTitle: string,
  milestone: MilestoneType,
  result: ExamResult,
  answers: ExamUserAnswers
): ExamAttemptRecord {
  const history = getExamHistory();
  const newAttempt: ExamAttemptRecord = {
    id: `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    examId,
    examTitle,
    milestone,
    totalScore: result.totalScore,
    scorePart1: result.scorePart1,
    scorePart2: result.scorePart2,
    scorePart3: result.scorePart3,
    timeSpentSeconds: result.timeSpentSeconds,
    submittedAt: new Date().toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    result,
    answers,
  };

  const updatedHistory = [newAttempt, ...history];
  safeSet(STORAGE_KEYS.EXAM_HISTORY, updatedHistory);
  return newAttempt;
}

export function clearExamHistory(): void {
  safeSet(STORAGE_KEYS.EXAM_HISTORY, []);
}

/**
 * Mistake Notebook Management
 */
export function getStoredMistakes(): MistakeItem[] {
  return safeGet<MistakeItem[]>(STORAGE_KEYS.MISTAKE_NOTEBOOK, []);
}

export function saveMistake(newMistake: MistakeItem): MistakeItem[] {
  const current = getStoredMistakes();
  // Check if identical problem exists
  const existingIdx = current.findIndex(
    (m) => (m.chapterId === newMistake.chapterId && m.problem === newMistake.problem) || m.id === newMistake.id
  );

  let updated: MistakeItem[];
  if (existingIdx >= 0) {
    // Increase review count and mark unresolved
    updated = [...current];
    updated[existingIdx] = {
      ...updated[existingIdx],
      reviewCount: (updated[existingIdx].reviewCount || 1) + 1,
      studentAnswer: newMistake.studentAnswer,
      resolved: false,
      date: "Vừa xong",
    };
  } else {
    updated = [newMistake, ...current];
  }

  safeSet(STORAGE_KEYS.MISTAKE_NOTEBOOK, updated);
  return updated;
}

export function toggleResolveMistake(mistakeId: string): MistakeItem[] {
  const current = getStoredMistakes();
  const updated = current.map((m) => {
    if (m.id === mistakeId) {
      return { ...m, resolved: !m.resolved };
    }
    return m;
  });
  safeSet(STORAGE_KEYS.MISTAKE_NOTEBOOK, updated);
  return updated;
}

/**
 * Chapter Mastery Tracking
 */
export interface ChapterMasteryRecord {
  chapterId: number;
  totalAttempted: number;
  totalCorrect: number;
  masteryPercent: number;
  lastPracticedAt: string;
}

export function getStoredMastery(): Record<number, ChapterMasteryRecord> {
  const defaultMastery: Record<number, ChapterMasteryRecord> = {};
  CHAPTERS_DATA.forEach((ch) => {
    defaultMastery[ch.id] = {
      chapterId: ch.id,
      totalAttempted: 0,
      totalCorrect: 0,
      masteryPercent: 0,
      lastPracticedAt: "Chưa luyện tập",
    };
  });
  return safeGet<Record<number, ChapterMasteryRecord>>(STORAGE_KEYS.CHAPTER_MASTERY, defaultMastery);
}

export function updateChapterMasteryScore(
  chapterId: number,
  addedAttempted: number,
  addedCorrect: number
): Record<number, ChapterMasteryRecord> {
  const current = getStoredMastery();
  const record = current[chapterId] || {
    chapterId,
    totalAttempted: 0,
    totalCorrect: 0,
    masteryPercent: 0,
    lastPracticedAt: "Hôm nay",
  };

  const newAttempted = record.totalAttempted + addedAttempted;
  const newCorrect = record.totalCorrect + addedCorrect;
  const newPercent = newAttempted > 0 ? Math.min(100, Math.round((newCorrect / newAttempted) * 100)) : 0;

  const updated: Record<number, ChapterMasteryRecord> = {
    ...current,
    [chapterId]: {
      chapterId,
      totalAttempted: newAttempted,
      totalCorrect: newCorrect,
      masteryPercent: newPercent,
      lastPracticedAt: new Date().toLocaleDateString("vi-VN"),
    },
  };

  safeSet(STORAGE_KEYS.CHAPTER_MASTERY, updated);
  return updated;
}

export function getChaptersWithDynamicMastery(initialChapters: Chapter[]): Chapter[] {
  const masteryMap = getStoredMastery();
  return initialChapters.map((ch) => {
    const record = masteryMap[ch.id];
    if (record) {
      return {
        ...ch,
        masteryPercent: record.masteryPercent,
      };
    }
    return ch;
  });
}

export function getStoredStreak(): number {
  return safeGet<number>(STORAGE_KEYS.STREAK_DATA, 0);
}

/**
 * User & Authentication Management
 */
import { UserProfile, UserRole } from "@/types/user";
import { ExamData } from "@/types/exam";

const AUTH_KEYS = {
  CURRENT_USER: "math12pro_current_user",
  ALL_USERS: "math12pro_users_list",
  CUSTOM_EXAMS: "math12pro_custom_exams",
  HIDDEN_EXAMS: "math12pro_hidden_exams",
  GEMINI_API_KEY: "math12pro_gemini_api_key",
  SAVED_MATH_SOLUTIONS: "math12pro_saved_math_solutions",
};

const MOCK_USER_IDS = ["student-demo-12a1", "user-teacher-demo"];
const MOCK_EMAILS = ["hocsinh12@math12pro.edu.vn", "giaovien.toan@math12pro.edu.vn"];

function isMockUser(u: { id?: string; email?: string } | null | undefined): boolean {
  if (!u) return false;
  const isMockId = typeof u.id === "string" && MOCK_USER_IDS.includes(u.id);
  const isMockEmail = typeof u.email === "string" && MOCK_EMAILS.includes(u.email.toLowerCase());
  return isMockId || isMockEmail;
}

export function getCurrentUser(): UserProfile | null {
  const user = safeGet<UserProfile | null>(AUTH_KEYS.CURRENT_USER, null);
  if (isMockUser(user)) {
    safeSet(AUTH_KEYS.CURRENT_USER, null);
    return null;
  }
  return user;
}

export function saveCurrentUser(user: UserProfile | null): void {
  if (isMockUser(user)) {
    safeSet(AUTH_KEYS.CURRENT_USER, null);
    return;
  }
  safeSet(AUTH_KEYS.CURRENT_USER, user);
}

export function getAllUsers(): UserProfile[] {
  const users = safeGet<UserProfile[]>(AUTH_KEYS.ALL_USERS, []);
  const realUsers = users.filter((u) => !isMockUser(u));
  if (realUsers.length !== users.length) {
    safeSet(AUTH_KEYS.ALL_USERS, realUsers);
  }
  return realUsers;
}

export function syncSupabaseUserProfile(profile: UserProfile): UserProfile {
  const users = getAllUsers();
  const existingIdx = users.findIndex(
    (u) => u.id === profile.id || (u.email && u.email.toLowerCase() === profile.email.toLowerCase())
  );

  let merged: UserProfile;
  if (existingIdx >= 0) {
    merged = {
      ...users[existingIdx],
      ...profile,
      fullName: profile.fullName || users[existingIdx].fullName,
      avatarUrl: profile.avatarUrl || users[existingIdx].avatarUrl,
      lastActiveAt: new Date().toISOString(),
    };
    users[existingIdx] = merged;
  } else {
    merged = profile;
    users.push(merged);
  }

  safeSet(AUTH_KEYS.ALL_USERS, users);
  safeSet(AUTH_KEYS.CURRENT_USER, merged);
  return merged;
}

export function registerNewUser(data: {
  fullName: string;
  email: string;
  role?: UserRole;
  schoolName?: string;
  grade?: string;
}): UserProfile {
  const users = getAllUsers();
  const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    saveCurrentUser(existing);
    return existing;
  }

  const newUser: UserProfile = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    email: data.email,
    fullName: data.fullName,
    role: data.role || "STUDENT",
    schoolName: data.schoolName || "THPT Quốc Gia",
    grade: data.grade || "Lớp 12",
    streakDays: 1,
    avatarUrl: data.role === "TEACHER" 
      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    lastActiveAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  safeSet(AUTH_KEYS.ALL_USERS, updatedUsers);
  saveCurrentUser(newUser);
  return newUser;
}

export function loginExistingUser(email: string): UserProfile {
  const users = getAllUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    saveCurrentUser(found);
    return found;
  }

  // Auto create student if not found for seamless local dev
  const created = registerNewUser({
    fullName: email.split("@")[0].toUpperCase() || "Học sinh Math12Pro",
    email,
    role: "STUDENT",
  });
  return created;
}

export function logoutCurrentUser(): void {
  safeSet(AUTH_KEYS.CURRENT_USER, null);
}

/**
 * Custom Exams & Exam Deletion Management
 */
export function getCustomExams(): ExamData[] {
  return safeGet<ExamData[]>(AUTH_KEYS.CUSTOM_EXAMS, []);
}

export function saveCustomExam(newExam: ExamData): ExamData {
  const current = getCustomExams();
  const existingIdx = current.findIndex((e) => e.id === newExam.id);
  let updated: ExamData[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = newExam;
  } else {
    updated = [newExam, ...current];
  }

  safeSet(AUTH_KEYS.CUSTOM_EXAMS, updated);
  return newExam;
}

export function deleteExamById(examId: string): void {
  // If custom exam, remove from custom exams list
  const custom = getCustomExams();
  const updatedCustom = custom.filter((e) => e.id !== examId);
  safeSet(AUTH_KEYS.CUSTOM_EXAMS, updatedCustom);

  // Mark as hidden in deleted exams registry (supports deleting/hiding official exams too)
  const hidden = getHiddenExamIds();
  if (!hidden.includes(examId)) {
    safeSet(AUTH_KEYS.HIDDEN_EXAMS, [...hidden, examId]);
  }
}

export function getHiddenExamIds(): string[] {
  return safeGet<string[]>(AUTH_KEYS.HIDDEN_EXAMS, []);
}

export function restoreAllHiddenExams(): void {
  safeSet(AUTH_KEYS.HIDDEN_EXAMS, []);
}

/**
 * Gemini API Key Storage
 */
export function getStoredGeminiApiKey(): string {
  return safeGet<string>(AUTH_KEYS.GEMINI_API_KEY, "");
}

export function saveStoredGeminiApiKey(apiKey: string): void {
  safeSet(AUTH_KEYS.GEMINI_API_KEY, apiKey.trim());
}

/**
 * Saved Math AI Solutions History
 */
export interface SavedMathSolution {
  id: string;
  problemText: string;
  imageUrl?: string;
  solutionMarkdown: string;
  topicTag?: string;
  savedAt: string;
}

export function getSavedMathSolutions(): SavedMathSolution[] {
  return safeGet<SavedMathSolution[]>(AUTH_KEYS.SAVED_MATH_SOLUTIONS, []);
}

export function saveMathSolution(item: Omit<SavedMathSolution, "id" | "savedAt">): SavedMathSolution {
  const list = getSavedMathSolutions();
  const newItem: SavedMathSolution = {
    ...item,
    id: `sol-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    savedAt: new Date().toLocaleString("vi-VN"),
  };
  safeSet(AUTH_KEYS.SAVED_MATH_SOLUTIONS, [newItem, ...list]);
  return newItem;
}

export function deleteSavedMathSolution(id: string): SavedMathSolution[] {
  const list = getSavedMathSolutions();
  const updated = list.filter((s) => s.id !== id);
  safeSet(AUTH_KEYS.SAVED_MATH_SOLUTIONS, updated);
  return updated;
}


