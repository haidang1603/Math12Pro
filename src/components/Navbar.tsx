/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Flame,
  Zap,
  BookMarked,
  GraduationCap,
  ChevronDown,
  Check,
  LayoutDashboard,
  Timer,
  BarChart2,
  Clock,
  Sparkles,
  Upload,
  FolderKanban,
  LogIn,
  Lightbulb,
} from "lucide-react";
import { TextbookSeries } from "@/types/learning";
import { UserProfile } from "@/types/user";

interface NavbarProps {
  currentTab: "learning" | "exam" | "analytics";
  onChangeTab: (tab: "learning" | "exam" | "analytics") => void;
  selectedTextbook: TextbookSeries;
  onSelectTextbook: (series: TextbookSeries) => void;
  onOpenQuickQuiz: () => void;
  onOpenMistakeNotebook: () => void;
  onOpenLiveArena?: () => void;
  onOpenExamHistory?: () => void;
  onOpenAuth: () => void;
  onOpenMathAiSolver: () => void;
  onOpenAzotaCreator: () => void;
  onOpenExamManager: () => void;
  onOpenMathTips: () => void;
  currentUser: UserProfile | null;
  streakDays?: number;
}

export default function Navbar({
  currentTab,
  onChangeTab,
  selectedTextbook,
  onSelectTextbook,
  onOpenQuickQuiz,
  onOpenMistakeNotebook,
  onOpenLiveArena,
  onOpenExamHistory,
  onOpenAuth,
  onOpenMathAiSolver,
  onOpenAzotaCreator,
  onOpenExamManager,
  onOpenMathTips,
  currentUser,
  streakDays = 0,
}: NavbarProps) {
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);

  const textbookRef = useRef<HTMLDivElement>(null);
  const examMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (textbookRef.current && !textbookRef.current.contains(event.target as Node)) {
        setIsTextbookOpen(false);
      }
      if (examMenuRef.current && !examMenuRef.current.contains(event.target as Node)) {
        setIsExamDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textbooks: { id: TextbookSeries; label: string; shortLabel: string }[] = [
    { id: "ALL", label: "Tổng hợp 3 bộ sách (Khuyên dùng)", shortLabel: "3 Bộ SGK" },
    { id: "KNTT", label: "Kết nối tri thức với cuộc sống", shortLabel: "KNTT" },
    { id: "CANH_DIEU", label: "Cánh diều", shortLabel: "Cánh Diều" },
    { id: "CHAN_TROI", label: "Chân trời sáng tạo", shortLabel: "CTST" },
  ];

  const currentTextbookObj = textbooks.find((t) => t.id === selectedTextbook) || textbooks[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 flex items-center justify-between gap-2.5">
        
        {/* ========================================================================= */}
        {/* LEFT: BRAND & PRIMARY SEGMENTED TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Logo */}
          <div
            onClick={() => onChangeTab("learning")}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-sm text-white italic">∫x</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-extrabold text-sm tracking-tight text-white">Math12</span>
                <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-orange-500 text-white">
                  PRO
                </span>
              </div>
              <span className="text-[9px] text-slate-400 block font-medium mt-0.5">
                Toán 12 Chuẩn Mới
              </span>
            </div>
          </div>

          {/* Segmented Navigation (Gọn gàng & 1 dòng duy nhất) */}
          <nav className="flex items-center gap-0.5 bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/60 text-xs font-semibold whitespace-nowrap shrink-0">
            <button
              onClick={() => onChangeTab("learning")}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "learning"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Lộ trình ôn luyện 6 Chương"
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span>Ôn luyện</span>
            </button>
            <button
              onClick={() => onChangeTab("exam")}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "exam"
                  ? "bg-orange-500 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Phòng thi thử 90 phút chuẩn Bộ GD&ĐT"
            >
              <Timer className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Thi thử 90p</span>
              <span className="sm:hidden">Thi thử</span>
            </button>
            <button
              onClick={() => onChangeTab("analytics")}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "analytics"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Phân tích Radar năng lực & chuyên đề yếu"
            >
              <BarChart2 className="w-3.5 h-3.5 shrink-0" />
              <span>Năng lực</span>
            </button>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: SMART COMPACT ACTION HUB */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 max-w-full overflow-x-auto no-scrollbar py-0.5">
          
          {/* Textbook Switcher Dropdown */}
          <div className="relative hidden xl:block" ref={textbookRef}>
            <button
              onClick={() => setIsTextbookOpen(!isTextbookOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              title="Chọn chương trình sách giáo khoa"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="font-semibold text-slate-200">{currentTextbookObj.shortLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isTextbookOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/60">
                  Chương trình SGK
                </div>
                {textbooks.map((tb) => (
                  <button
                    key={tb.id}
                    onClick={() => {
                      onSelectTextbook(tb.id);
                      setIsTextbookOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-slate-200 hover:bg-slate-700/80 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="font-medium">{tb.label}</span>
                    {selectedTextbook === tb.id && (
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Math Solver Button (Nổi bật, gọn gàng, 1 dòng) */}
          <button
            onClick={onOpenMathAiSolver}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 hover:from-purple-600/50 hover:to-blue-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
            title="Giải toán AI: Tải ảnh hoặc dán đề bài"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0" />
            <span className="hidden md:inline">Giải Toán AI</span>
            <span className="md:hidden">AI</span>
          </button>

          {/* Formulas & Casio Hacks (Gọn gàng) */}
          <button
            onClick={onOpenMathTips}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Sổ tay công thức 6 chương & mẹo bấm máy Casio"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden lg:inline">Mẹo & Casio</span>
          </button>

          {/* Unified Exam Hub Dropdown: Gộp Tạo đề Azota + Tải đề + Kho & Xoá đề + Lịch sử */}
          <div className="relative" ref={examMenuRef}>
            <button
              onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Quản lý kho đề, tạo đề Azota, tải đề lên thi"
            >
              <FolderKanban className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="hidden sm:inline">Kho Đề Thi</span>
              <span className="sm:hidden">Kho đề</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isExamDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 divide-y divide-slate-800">
                <div className="px-3 py-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Kho Đề Thi & Quản Lý
                  </div>
                </div>

                <div className="py-1 space-y-0.5">
                  {/* Option 1: Tạo & Tải Đề Thi (Word, PDF, Azota) */}
                  <button
                    onClick={() => {
                      setIsExamDropdownOpen(false);
                      onOpenAzotaCreator();
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-800/90 flex items-center gap-2.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500/20 to-purple-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-blue-500/30">
                      <Upload className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-200 group-hover:text-white flex items-center gap-1.5">
                        <span>Tạo & Tải Đề Thi</span>
                        <span className="text-[9px] font-extrabold uppercase px-1 rounded bg-blue-500/20 text-blue-300">
                          Word • PDF
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Tải file .docx, .doc, .pdf hoặc dán đề Azota
                      </div>
                    </div>
                  </button>

                  {/* Option 3: Quản lý kho & Xoá đề */}
                  <button
                    onClick={() => {
                      setIsExamDropdownOpen(false);
                      onOpenExamManager();
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-800/90 flex items-center gap-2.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FolderKanban className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-200 group-hover:text-white">Quản lý kho & Xoá đề</div>
                      <div className="text-[10px] text-slate-400">Xem tất cả đề & xoá đề cũ</div>
                    </div>
                  </button>
                </div>

                {onOpenExamHistory && (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setIsExamDropdownOpen(false);
                        onOpenExamHistory();
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-800/90 flex items-center gap-2.5 cursor-pointer transition-colors text-slate-300"
                    >
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-semibold text-xs">Lịch sử bài thi thử</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grouped Compact Tools: Sổ lỗi, Đấu trường */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/70 p-0.5 rounded-xl shrink-0">
            {/* Mistake Notebook Button */}
            <button
              onClick={onOpenMistakeNotebook}
              className="p-1.5 px-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
              title="Sổ tay ghi nhớ câu sai & luyện lại"
            >
              <BookMarked className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="hidden 2xl:inline">Sổ lỗi</span>
            </button>

            {/* Live Arena */}
            {onOpenLiveArena && (
              <button
                onClick={onOpenLiveArena}
                className="p-1.5 px-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 text-xs font-medium transition-all cursor-pointer relative flex items-center gap-1.5"
                title="Đấu trường Toán học trực tiếp (Chủ Nhật 20h00)"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="hidden 2xl:inline">Đấu trường</span>
              </button>
            )}
          </div>

          {/* Quick Quiz 15m Button */}
          <button
            onClick={onOpenQuickQuiz}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-orange-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
            title="Luyện phản xạ 5 câu ngẫu nhiên trong 15 phút"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>15p</span>
          </button>

          {/* Streak Counter */}
          <div
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold whitespace-nowrap shrink-0"
            title={`Chuỗi học tập liên tục ${streakDays} ngày`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 shrink-0" />
            <span>{streakDays}d</span>
          </div>

          {/* User Auth Profile Trigger Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition-colors cursor-pointer shrink-0"
            title={currentUser ? `Tài khoản: ${currentUser.fullName}` : "Đăng nhập / Đăng ký"}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={currentUser.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-blue-400 shrink-0"
                />
                <span className="hidden md:inline max-w-[80px] truncate text-slate-200 font-semibold whitespace-nowrap">
                  {currentUser.fullName.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="hidden sm:inline text-blue-400 font-semibold whitespace-nowrap">Đăng nhập</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
