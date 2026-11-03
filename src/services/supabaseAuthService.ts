import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";
import { UserProfile, UserRole } from "@/types/user";

/**
 * Chuyển đổi dữ liệu user từ Supabase sang chuẩn UserProfile của ứng dụng Math12Pro.
 */
export function mapSupabaseUserToProfile(sbUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  created_at?: string;
}): UserProfile {
  const meta = sbUser.user_metadata || {};
  const fullName =
    (typeof meta.full_name === "string" && meta.full_name.trim()) ||
    (typeof meta.name === "string" && meta.name.trim()) ||
    (sbUser.email ? sbUser.email.split("@")[0] : "Học sinh 12");

  const avatarUrl =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

  const role = (meta.role as UserRole) || "STUDENT";
  const schoolName = typeof meta.school_name === "string" ? meta.school_name : "THPT Quốc Gia";
  const grade = typeof meta.grade === "string" ? meta.grade : "Lớp 12";

  return {
    id: sbUser.id,
    email: sbUser.email || "",
    fullName,
    role,
    schoolName,
    grade,
    avatarUrl,
    streakDays: 1,
    lastActiveAt: new Date().toISOString(),
    createdAt: sbUser.created_at || new Date().toISOString(),
  };
}

/**
 * Đăng nhập bằng tài khoản Google thông qua Supabase OAuth.
 */
export async function signInWithGoogleOAuth(): Promise<{ error: string | null; url?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      error: "Supabase chưa được cấu hình hoàn tất trong file .env (cần NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    };
  }

  try {
    const redirectTo = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data?.url && typeof window !== "undefined") {
      // Navigate browser to Google OAuth consent screen
      window.location.assign(data.url);
      return { error: null, url: data.url };
    }

    return { error: null };
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi kết nối Google OAuth.",
    };
  }
}

/**
 * Đăng xuất khỏi phiên đăng nhập Supabase.
 */
export async function signOutSupabase(): Promise<{ error: string | null }> {
  if (!supabase) return { error: null };
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return { error: null };
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Lỗi khi đăng xuất Supabase.",
    };
  }
}

function translateSupabaseError(msg: string): string {
  if (msg.includes("Invalid login credentials")) {
    return "Email hoặc mật khẩu không chính xác.";
  }
  if (msg.includes("User already registered")) {
    return "Email này đã được đăng ký tài khoản trước đó. Vui lòng chuyển sang Đăng nhập.";
  }
  if (msg.includes("Password should be at least")) {
    return "Mật khẩu phải có độ dài tối thiểu 6 ký tự.";
  }
  if (msg.includes("Email not confirmed")) {
    return "Tài khoản chưa được kích hoạt qua email. Vui lòng kiểm tra hộp thư.";
  }
  return msg;
}

/**
 * Đăng nhập bằng Email & Mật khẩu qua Supabase Auth
 */
export async function signInWithSupabaseEmail(
  email: string,
  password: string
): Promise<{ profile: UserProfile | null; error: string | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { profile: null, error: "Supabase chưa được cấu hình." };
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { profile: null, error: translateSupabaseError(error.message) };
    }
    if (data.user) {
      const profile = mapSupabaseUserToProfile(data.user);
      return { profile, error: null };
    }
    return { profile: null, error: "Không tìm thấy thông tin tài khoản." };
  } catch (err: unknown) {
    return {
      profile: null,
      error: err instanceof Error ? translateSupabaseError(err.message) : "Lỗi kết nối Supabase.",
    };
  }
}

/**
 * Đăng ký tài khoản mới bằng Email & Mật khẩu qua Supabase Auth
 */
export async function signUpWithSupabaseEmail(
  email: string,
  password: string,
  metadata: {
    fullName: string;
    role: UserRole;
    schoolName: string;
    grade: string;
  }
): Promise<{ profile: UserProfile | null; needsEmailConfirmation: boolean; error: string | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { profile: null, needsEmailConfirmation: false, error: "Supabase chưa được cấu hình." };
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.fullName,
          role: metadata.role,
          school_name: metadata.schoolName,
          grade: metadata.grade,
        },
      },
    });
    if (error) {
      return { profile: null, needsEmailConfirmation: false, error: translateSupabaseError(error.message) };
    }
    if (data.user) {
      const profile = mapSupabaseUserToProfile(data.user);
      const needsEmailConfirmation = !data.session;
      return { profile, needsEmailConfirmation, error: null };
    }
    return { profile: null, needsEmailConfirmation: false, error: "Không thể tạo tài khoản lúc này." };
  } catch (err: unknown) {
    return {
      profile: null,
      needsEmailConfirmation: false,
      error: err instanceof Error ? translateSupabaseError(err.message) : "Lỗi kết nối Supabase.",
    };
  }
}

/**
 * Lấy session hiện tại từ Supabase nếu có.
 */
export async function getSupabaseCurrentProfile(): Promise<UserProfile | null> {
  if (!supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      return mapSupabaseUserToProfile(session.user);
    }
    return null;
  } catch {
    return null;
  }
}
