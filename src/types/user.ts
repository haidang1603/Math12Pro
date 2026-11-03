export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  schoolName?: string;
  grade?: string; // e.g. "Lớp 12"
  avatarUrl?: string;
  streakDays: number;
  lastActiveAt: string;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  token?: string;
  isAuthenticated: boolean;
}
