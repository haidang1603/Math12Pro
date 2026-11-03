/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  LogOut,
  Flame,
  School,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { UserProfile, UserRole } from "@/types/user";
import {
  registerNewUser,
  loginExistingUser,
  logoutCurrentUser,
  syncSupabaseUserProfile,
} from "@/services/storageService";
import {
  signInWithGoogleOAuth,
  signOutSupabase,
  signInWithSupabaseEmail,
  signUpWithSupabaseEmail,
} from "@/services/supabaseAuthService";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register" | "profile">(
    currentUser ? "profile" : "login"
  );

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("Lớp 12");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setIsGoogleLoading(true);
    const res = await signInWithGoogleOAuth();
    if (res.error) {
      setIsGoogleLoading(false);
      setErrorMsg(res.error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim()) {
      setErrorMsg("Vui lòng nhập địa chỉ email");
      return;
    }
    if (!password) {
      setErrorMsg("Vui lòng nhập mật khẩu");
      return;
    }

    setIsSubmitting(true);
    // 1. Try Supabase Auth
    const sbRes = await signInWithSupabaseEmail(email.trim(), password);
    if (sbRes.profile) {
      const saved = syncSupabaseUserProfile(sbRes.profile);
      onUserChange(saved);
      setIsSubmitting(false);
      setSuccessMsg(`Chào mừng trở lại, ${saved.fullName}!`);
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 900);
      return;
    }

    if (sbRes.error && !sbRes.error.includes("chưa được cấu hình")) {
      setIsSubmitting(false);
      setErrorMsg(sbRes.error);
      return;
    }

    // 2. Fallback to local storage
    const user = loginExistingUser(email.trim());
    onUserChange(user);
    setIsSubmitting(false);
    setSuccessMsg(`Chào mừng trở lại, ${user.fullName}!`);
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 900);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!fullName.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên của bạn");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("Mật khẩu phải có độ dài tối thiểu 6 ký tự");
      return;
    }

    setIsSubmitting(true);
    // 1. Try Supabase Auth Sign Up
    const sbRes = await signUpWithSupabaseEmail(email.trim(), password, {
      fullName: fullName.trim(),
      role,
      schoolName: schoolName.trim() || "THPT Quốc Gia",
      grade: grade.trim() || "Lớp 12",
    });

    if (sbRes.error && !sbRes.error.includes("chưa được cấu hình")) {
      setIsSubmitting(false);
      setErrorMsg(sbRes.error);
      return;
    }

    if (sbRes.profile) {
      if (sbRes.needsEmailConfirmation) {
        setIsSubmitting(false);
        setSuccessMsg("Tài khoản đã tạo thành công! Hãy kiểm tra hộp thư email nếu cần kích hoạt.");
        setTimeout(() => {
          setSuccessMsg("");
          setTab("login");
        }, 2200);
        return;
      }
      const saved = syncSupabaseUserProfile(sbRes.profile);
      onUserChange(saved);
      setIsSubmitting(false);
      setSuccessMsg(`Đăng ký thành công! Chào bạn ${saved.fullName}`);
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 900);
      return;
    }

    // 2. Fallback local registration
    const user = registerNewUser({
      fullName: fullName.trim(),
      email: email.trim(),
      role,
      schoolName: schoolName.trim() || "THPT Quốc Gia",
      grade,
    });
    onUserChange(user);
    setIsSubmitting(false);
    setSuccessMsg(`Đăng ký thành công! Chào bạn ${user.fullName}`);
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 900);
  };

  const handleOfflineLogin = () => {
    if (!email.trim()) return;
    const user = loginExistingUser(email.trim());
    onUserChange(user);
    setErrorMsg("");
    setSuccessMsg(`Đã đăng nhập thành công: ${user.fullName}`);
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 800);
  };

  const handleLogout = async () => {
    logoutCurrentUser();
    await signOutSupabase();
    onUserChange(null);
    setTab("login");
    setSuccessMsg("Đã đăng xuất tài khoản.");
    setTimeout(() => setSuccessMsg(""), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header Gradient */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Math12Pro Account
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  2025
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {currentUser ? "Quản lý thông tin & tiến độ học tập" : "Đăng ký / Đăng nhập ôn thi chuẩn Bộ GD&ĐT"}
              </p>
            </div>
          </div>

          {/* Tab Navigation if not logged in */}
          {!currentUser && (
            <div className="flex items-center gap-2 mt-4 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setTab("login");
                  setErrorMsg("");
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === "login"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("register");
                  setErrorMsg("");
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === "register"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Tạo tài khoản mới
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
              {errorMsg.includes("kích hoạt qua email") && email && (
                <button
                  type="button"
                  onClick={handleOfflineLogin}
                  className="mt-1 self-start px-3 py-1.5 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 text-rose-200 border border-rose-500/40 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  👉 Bấm vào đây để vào học ngay (Bỏ qua xác nhận email)
                </button>
              )}
            </div>
          )}

          {currentUser ? (
            /* Logged in Profile View */
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <img
                  src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                  alt={currentUser.fullName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base truncate">{currentUser.fullName}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {currentUser.role === "TEACHER" ? "Giáo viên" : "Học sinh 12"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                    <School className="w-3 h-3 text-slate-500" />
                    {currentUser.schoolName || "THPT Quốc Gia"} • {currentUser.grade || "Lớp 12"}
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Flame className="w-5 h-5 fill-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Chuỗi học tập</div>
                    <div className="text-sm font-bold text-white">{currentUser.streakDays} ngày liên tiếp</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Mục tiêu</div>
                    <div className="text-sm font-bold text-emerald-400">9.0+ Toán THPT</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  Tiếp tục ôn luyện ngay
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-rose-500/40"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất tài khoản
                </button>
              </div>
            </div>
          ) : tab === "login" ? (
            /* Login Form */
            <div className="space-y-4">
              {/* Google Sign In via Supabase OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer border border-slate-200 disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Đăng nhập bằng Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-wider shrink-0 font-medium">
                  hoặc bằng email
                </span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email học sinh / giáo viên
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@email.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Register Form */
            <div className="space-y-4">
              {/* Google Sign In via Supabase OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer border border-slate-200 disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Đăng ký nhanh bằng Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-wider shrink-0 font-medium">
                  hoặc tạo tài khoản
                </span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@email.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Vai trò
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition-all"
                    >
                      <option value="STUDENT">Học sinh 12</option>
                      <option value="TEACHER">Giáo viên Toán</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Lớp / Khối
                    </label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Lớp 12A1"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Trường THPT
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="THPT Chuyên"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang tạo tài khoản...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng ký tài khoản</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
