/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Flame,
  Zap,
  BookMarked,
  GraduationCap,
  ChevronDown,
  ChevronRight,
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
  Calculator,
  Menu,
  X,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 flex items-center justify-between gap-2">
        
        {/* ========================================================================= */}
        {/* LEFT: BRAND & PRIMARY SEGMENTED TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Logo */}
          <div
            onClick={() => onChangeTab("learning")}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden ring-1.5 ring-orange-500/40 group-hover:ring-orange-500 shadow-md shadow-orange-500/10 group-hover:scale-105 transition-all flex items-center justify-center shrink-0 bg-slate-800">
              <img
                src="/logo.jpg"
                alt="Math12Pro Logo"
                className="w-full h-full object-cover object-top"
              />
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

          {/* Segmented Navigation (Gọn gàng trên cả Mobile và Desktop) */}
          <nav className="flex items-center gap-0.5 bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/60 text-xs font-semibold whitespace-nowrap shrink-0">
            <button
              onClick={() => onChangeTab("learning")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "learning"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Lộ trình ôn luyện 6 Chương"
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Ôn luyện</span>
            </button>
            <button
              onClick={() => onChangeTab("exam")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "exam"
                  ? "bg-orange-500 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Phòng thi thử 90 phút chuẩn Bộ GD&ĐT"
            >
              <Timer className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline text-xs">Thi thử 90p</span>
              <span className="sm:hidden text-[11px]">Thi thử</span>
            </button>
            <button
              onClick={() => onChangeTab("analytics")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentTab === "analytics"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
              title="Phân tích Radar năng lực & chuyên đề yếu"
            >
              <BarChart2 className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Năng lực</span>
            </button>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT (DESKTOP: FULL ACTION HUB - lg:flex) */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          
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

          {/* AI Math Solver Button */}
          <button
            onClick={onOpenMathAiSolver}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 hover:from-purple-600/50 hover:to-blue-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
            title="Giải toán AI: Tải ảnh hoặc dán đề bài"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0" />
            <span>Giải Toán AI</span>
          </button>

          {/* Formulas & Casio Hacks */}
          <button
            onClick={onOpenMathTips}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Sổ tay công thức 6 chương & mẹo bấm máy Casio"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Mẹo & Casio</span>
          </button>

          {/* Unified Exam Hub Dropdown: Gộp Tạo đề Azota + Tải đề + Kho & Xoá đề + Lịch sử */}
          <div className="relative" ref={examMenuRef}>
            <button
              onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Quản lý kho đề, tạo đề Azota, tải đề lên thi"
            >
              <FolderKanban className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Kho Đề Thi</span>
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

          {/* Sổ lỗi */}
          <button
            onClick={onOpenMistakeNotebook}
            className="p-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
            title="Sổ tay ghi nhớ câu sai & luyện lại"
          >
            <BookMarked className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="hidden 2xl:inline">Sổ lỗi</span>
          </button>

          {/* Quick Quiz 15m Button */}
          <button
            onClick={onOpenQuickQuiz}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-orange-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
            title="Luyện phản xạ 5 câu ngẫu nhiên trong 15 phút"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>15p</span>
          </button>

          {/* Streak Counter */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold whitespace-nowrap shrink-0"
            title={`Chuỗi học tập liên tục ${streakDays} ngày`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 shrink-0" />
            <span>{streakDays}d</span>
          </div>

          {/* User Auth Profile Trigger Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition-colors cursor-pointer shrink-0"
            title={currentUser ? `Tài khoản: ${currentUser.fullName}` : "Đăng nhập / Đăng ký"}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={currentUser.fullName}
                  className="w-5 h-5 rounded-full object-cover border border-blue-400 shrink-0"
                />
                <span className="max-w-[80px] truncate text-slate-200 font-semibold whitespace-nowrap">
                  {currentUser.fullName.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-blue-400 font-semibold whitespace-nowrap">Đăng nhập</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT (MOBILE / TABLET COMPACT CONTROLS: lg:hidden) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          {/* Quick AI button on mobile */}
          <button
            onClick={onOpenMathAiSolver}
            className="p-1.5 px-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
            title="Giải Toán AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-[11px]">AI</span>
          </button>

          {/* Quick Streak on mobile */}
          <div
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold"
            title={`Chuỗi ${streakDays} ngày`}
          >
            <Flame className="w-3 h-3 fill-orange-500 text-orange-500 shrink-0" />
            <span className="text-[11px]">{streakDays}d</span>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Mở menu tính năng"
            className="p-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Menu className="w-4 h-4 text-slate-200" />
            <span className="text-xs font-bold hidden xs:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FULL NAVIGATION DRAWER (Slide-over Sheet) */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full max-w-sm bg-slate-900 border-l border-slate-800 text-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                {currentUser ? (
                  <>
                    <img
                      src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                      alt={currentUser.fullName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shrink-0"
                    />
                    <div className="truncate max-w-[190px]">
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">Học sinh Toán 12</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <LogIn className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        Đăng nhập tài khoản
                      </div>
                      <div className="text-[10px] text-slate-400">Đồng bộ kết quả & lưu bài thi</div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-slate-800/80">
              
              {/* Section 1: Chọn bộ sách SGK */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Chương trình Sách Giáo Khoa
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {textbooks.map((tb) => {
                    const isSelected = selectedTextbook === tb.id;
                    return (
                      <button
                        key={tb.id}
                        onClick={() => {
                          onSelectTextbook(tb.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                          isSelected
                            ? "bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-xs"
                            : "bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px]">{tb.shortLabel}</span>
                          {isSelected && <Check className="w-3 h-3 text-blue-400" />}
                        </div>
                        <span className="text-[9px] text-slate-400 leading-tight line-clamp-1">
                          {tb.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Công cụ tương tác & AI */}
              <div className="pt-4 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Công cụ & Tiện ích thông minh
                </span>

                <div className="space-y-1.5">
                  {/* AI Giải Toán 12 */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenMathAiSolver();
                    }}
                    className="w-full p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-purple-300">
                          AI Giải Toán 12 Cao Cấp
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Chụp ảnh đề hoặc dán văn bản để AI giải chi tiết
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>

                  {/* Mẹo & Casio */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenMathTips();
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300">
                          Sổ Tay Công Thức & Mẹo Casio
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Công thức 6 chương & thủ thuật Casio 580/880
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Section 3: Quản lý Kho Đề Thi */}
              <div className="pt-4 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Kho Đề Thi & Quản Lý
                </span>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAzotaCreator();
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center gap-1.5">
                          <span>Tạo & Tải Đề Thi</span>
                          <span className="text-[9px] font-extrabold uppercase px-1 rounded bg-blue-500/20 text-blue-300">
                            Word • PDF
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Tải tệp đề thi hoặc dán đề soạn thảo
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenExamManager();
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <FolderKanban className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                          Quản Lý Kho & Xóa Đề
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Xem toàn bộ đề thi đã lưu trong máy
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>

                  {onOpenExamHistory && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenExamHistory();
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                            Lịch Sử Bài Thi Thử
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Xem lại các bài thi thử 90 phút đã hoàn thành
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Section 4: Rèn Luyện & Ôn Tập */}
              <div className="pt-4 space-y-2 pb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Rèn Luyện & Thử Thách
                </span>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenQuickQuiz();
                    }}
                    className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 fill-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300">
                          Luyện Phản Xạ Nhanh 15 Phút
                        </div>
                        <div className="text-[10px] text-slate-400">
                          5 câu hỏi trắc nghiệm bấm giờ siêu tốc
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenMistakeNotebook();
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                        <BookMarked className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-rose-300">
                          Sổ Tay Ghi Nhớ Câu Sai
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Luyện lại các câu từng làm sai trong đề thi
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </button>

                  {onOpenLiveArena && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenLiveArena();
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                          <Flame className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-red-300 flex items-center gap-1.5">
                            <span>Đấu Trường Toán Học Trực Tiếp</span>
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Thi đấu trực tiếp Chủ Nhật hàng tuần
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
