"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  TrendingUp,
  Compass,
  BarChart3,
  Layers,
  Box,
  GitFork,
  ArrowRight,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Award,
  Clock,
  Flame,
  Zap,
  FilePlus,
  FolderKanban,
  Lightbulb,
  ListChecks,
  X,
  Calculator,
} from "lucide-react";

import { Chapter, TextbookSeries, MistakeItem } from "@/types/learning";
import { ExamUserAnswers, ExamResult, MilestoneType, ExamAttemptRecord, ExamData } from "@/types/exam";
import { UserProfile } from "@/types/user";
import { CHAPTERS_DATA } from "@/data/chaptersData";
import { EXAMS_BY_MILESTONE, MOCK_EXAM_2025, ALL_DEFAULT_OFFICIAL_EXAMS } from "@/data/mockExamData";
import { calculateExamResult, getExamScoreStructure } from "@/utils/scoring";
import {
  getStoredMistakes,
  getChaptersWithDynamicMastery,
  getExamHistory,
  saveMistake,
  getStoredStreak,
  getCurrentUser,
  syncSupabaseUserProfile,
  getCustomExams,
} from "@/services/storageService";
import { supabase } from "@/utils/supabaseClient";
import { mapSupabaseUserToProfile } from "@/services/supabaseAuthService";
import { submitExamApi } from "@/services/apiClient";

import Navbar from "@/components/Navbar";
import ExamTimer from "@/components/ExamTimer";
import QuestionPalette from "@/components/QuestionPalette";
import SingleChoiceQuestion from "@/components/SingleChoiceQuestion";
import TrueFalseQuestion from "@/components/TrueFalseQuestion";
import ShortAnswerQuestion from "@/components/ShortAnswerQuestion";
import RadarAnalytics from "@/components/RadarAnalytics";
import ChapterPracticeHub from "@/components/ChapterPracticeHub";
import QuickQuizModal from "@/components/QuickQuizModal";
import MistakeNotebookModal from "@/components/MistakeNotebookModal";
import LiveArenaModal from "@/components/LiveArenaModal";
import ExamHistoryModal from "@/components/ExamHistoryModal";
import AuthModal from "@/components/AuthModal";
import AzotaExamCreatorModal from "@/components/AzotaExamCreatorModal";
import ExamManagerModal from "@/components/ExamManagerModal";
import MathAiSolverModal from "@/components/MathAiSolverModal";
import MathTipsAndFormulasModal from "@/components/MathTipsAndFormulasModal";
import MathLabStudio from "@/components/MathLabStudio";
import confetti from "canvas-confetti";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<"learning" | "exam" | "analytics">("learning");
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookSeries>("ALL");
  const [chapters, setChapters] = useState<Chapter[]>(CHAPTERS_DATA);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType>("TOT_NGHIEP_THPT");

  // Chapter Practice Hub Modal
  const [activeChapterForHub, setActiveChapterForHub] = useState<Chapter | null>(null);
  const [hubInitialTab, setHubInitialTab] = useState<"theory" | "study" | "test">("theory");

  // Other Modals
  const [isQuickQuizOpen, setIsQuickQuizOpen] = useState(false);
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);
  const [isLiveArenaOpen, setIsLiveArenaOpen] = useState(false);
  const [isExamHistoryOpen, setIsExamHistoryOpen] = useState(false);
  const [isMathLabOpen, setIsMathLabOpen] = useState(false);
  const [examHistoryCount, setExamHistoryCount] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);

  // Dynamic Mistake Notebook State
  const [mistakesList, setMistakesList] = useState<MistakeItem[]>([]);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Hydrate client-stored state after initial render to avoid SSR hydration mismatch
  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setStreakDays(getStoredStreak());
    setExamHistoryCount(getExamHistory().length);
    setMistakesList(getStoredMistakes());
    setChapters(getChaptersWithDynamicMastery(CHAPTERS_DATA));
    const custom = getCustomExams();
    setCustomExams(custom);
    setAllExamsList([...custom, ...ALL_DEFAULT_OFFICIAL_EXAMS]);
  }, []);

  // Supabase Google OAuth Session & State Sync Listener
  useEffect(() => {
    if (!supabase) return;

    const handleSession = (session: { user: Parameters<typeof mapSupabaseUserToProfile>[0] }) => {
      if (session?.user) {
        const profile = mapSupabaseUserToProfile(session.user);
        const saved = syncSupabaseUserProfile(profile);
        setCurrentUser(saved);
      }
    };

    // 1. Check for OAuth error in URL parameters or hash
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(
        window.location.hash.startsWith("#") ? window.location.hash.substring(1) : ""
      );
      const oauthError =
        urlParams.get("error_description") ||
        hashParams.get("error_description") ||
        urlParams.get("error") ||
        hashParams.get("error");

      if (oauthError) {
        const decoded = decodeURIComponent(oauthError).replace(/\+/g, " ");
        console.error("Lỗi xác thực OAuth:", decoded);
        alert(
          `⚠️ Đăng nhập Google thất bại:\n${decoded}\n\n👉 Nguyên nhân: Mã "Client Secret" điền trên Supabase Dashboard không khớp hoặc đã bị thay đổi trên Google Cloud Console.`
        );
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // Check for PKCE code in URL
      const code = urlParams.get("code");
      if (code) {
        supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
          if (data?.session) {
            handleSession(data.session);
            window.history.replaceState({}, document.title, window.location.pathname);
          } else if (error) {
            console.error("Lỗi exchangeCodeForSession:", error.message);
          }
        });
      }

      // Check for implicit grant hash tokens (#access_token=...)
      if (window.location.hash.includes("access_token")) {
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token") || "";
        if (accessToken) {
          supabase.auth
            .setSession({ access_token: accessToken, refresh_token: refreshToken })
            .then(({ data }) => {
              if (data?.session) {
                handleSession(data.session);
                window.history.replaceState({}, document.title, window.location.pathname);
              }
            });
        }
      }
    }

    // 2. Check existing session on initial mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleSession(session);
      }
    });

    // 3. Listen to real-time auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        handleSession(session);
        if (typeof window !== "undefined" && (window.location.hash.includes("access_token") || window.location.search.includes("code="))) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else if (event === "SIGNED_OUT") {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // New Feature Modals States
  const [isAzotaCreatorOpen, setIsAzotaCreatorOpen] = useState(false);
  const [isExamManagerOpen, setIsExamManagerOpen] = useState(false);
  const [isMathAiSolverOpen, setIsMathAiSolverOpen] = useState(false);
  const [isMathTipsOpen, setIsMathTipsOpen] = useState(false);
  const [mathTipsInitialTab, setMathTipsInitialTab] = useState<"formulas" | "tips" | "casio">("formulas");

  // Custom & Combined Exams
  const [, setCustomExams] = useState<ExamData[]>([]);

  const getAllCombinedExams = () => {
    const official = ALL_DEFAULT_OFFICIAL_EXAMS;
    const custom = getCustomExams();
    return [...custom, ...official];
  };

  const [allExamsList, setAllExamsList] = useState<ExamData[]>(() => ALL_DEFAULT_OFFICIAL_EXAMS);

  const refreshExams = () => {
    const updatedCustom = getCustomExams();
    setCustomExams(updatedCustom);
    setAllExamsList(getAllCombinedExams());
  };

  // Start a custom or uploaded exam immediately
  const handleStartCustomExam = (newExam: ExamData, startImmediately: boolean = true) => {
    refreshExams();
    if (startImmediately) {
      setExam(newExam);
      setAnswers({
        part1: {},
        part2: {},
        part3: {},
        flagged: {},
      });
      setTimeRemaining((newExam.durationMinutes || 90) * 60);
      setExamResult(null);
      setCurrentTab("exam");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Exam States
  const [exam, setExam] = useState(EXAMS_BY_MILESTONE["TOT_NGHIEP_THPT"]);
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 mins
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<"ALL" | "PART_1" | "PART_2" | "PART_3">("ALL");

  // User Answers
  const [answers, setAnswers] = useState<ExamUserAnswers>({
    part1: {},
    part2: {},
    part3: {},
    flagged: {},
  });

  // Submit Modal & Results
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "WRONG_ONLY">("ALL");

  // Handle milestone change (Giữa kì 1, Cuối kì 1, Học kì 2, Tốt nghiệp THPT)
  const handleSelectMilestone = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    const newExam = EXAMS_BY_MILESTONE[milestone] || MOCK_EXAM_2025;
    setExam(newExam);
    // Reset answers for the new milestone
    setAnswers({
      part1: {},
      part2: {},
      part3: {},
      flagged: {},
    });
    setTimeRemaining(5400);
  };

  // Add mistake dynamically to notebook
  const handleAddMistake = (newMistake: MistakeItem) => {
    const updated = saveMistake(newMistake);
    setMistakesList(updated);
  };

  // Select an attempt from history to view details
  const handleSelectAttempt = (attempt: ExamAttemptRecord) => {
    setSelectedMilestone(attempt.milestone);
    setExam(EXAMS_BY_MILESTONE[attempt.milestone] || MOCK_EXAM_2025);
    setAnswers(attempt.answers);
    setExamResult(attempt.result);
    setCurrentTab("analytics");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Chapter icon mapper
  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case "Compass": return <Compass className="w-5 h-5 text-blue-500" />;
      case "BarChart3": return <BarChart3 className="w-5 h-5 text-emerald-500" />;
      case "Layers": return <Layers className="w-5 h-5 text-purple-500" />;
      case "Box": return <Box className="w-5 h-5 text-cyan-500" />;
      case "GitFork": return <GitFork className="w-5 h-5 text-rose-500" />;
      default: return <BookOpen className="w-5 h-5 text-blue-500" />;
    }
  };

  // Scroll to selected question
  const handleScrollToQuestion = (section: "part1" | "part2" | "part3", id: number) => {
    let prefix = "p1";
    if (section === "part2") prefix = "p2";
    if (section === "part3") prefix = "p3";

    const elemId = `${prefix}-${id}`;
    setActiveQuestionId(elemId);
    setSelectedSectionFilter("ALL");

    setTimeout(() => {
      const el = document.getElementById(elemId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  // Toggle flag on question
  const handleToggleFlag = (key: string) => {
    setAnswers((prev) => ({
      ...prev,
      flagged: {
        ...prev.flagged,
        [key]: !prev.flagged[key],
      },
    }));
  };

  // Handle Submit Exam with API & persistent storage
  const handleConfirmSubmit = async () => {
    setIsConfirmSubmitOpen(false);
    const timeSpent = 5400 - timeRemaining;

    const { result } = await submitExamApi(
      {
        milestone: selectedMilestone,
        answers,
        timeSpentSeconds: timeSpent,
      },
      () => calculateExamResult(exam, answers, timeSpent),
      exam.title
    );

    setExamResult(result);
    setMistakesList(getStoredMistakes());
    setChapters(getChaptersWithDynamicMastery(CHAPTERS_DATA));
    setExamHistoryCount(getExamHistory().length);
    setCurrentTab("analytics");

    if (result.totalScore >= 7.0) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset exam for new attempt
  const handleResetExam = () => {
    setAnswers({
      part1: {},
      part2: {},
      part3: {},
      flagged: {},
    });
    setTimeRemaining(5400);
    setExamResult(null);
    setCurrentTab("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Jump from weak chapter directly to Chapter Practice Hub (Tab 2: Study Mode)
  const handleJumpToChapterStudy = (chapterId: number) => {
    const targetChapter = chapters.find((c) => c.id === chapterId);
    if (targetChapter) {
      setHubInitialTab("study");
      setActiveChapterForHub(targetChapter);
    }
  };

  // Count answered questions
  let answeredCount = 0;
  exam.part1.forEach((q) => {
    if (answers.part1[q.id]) answeredCount++;
  });
  exam.part2.forEach((q) => {
    const sub = answers.part2[q.id];
    if (sub && (sub.a !== undefined || sub.b !== undefined || sub.c !== undefined || sub.d !== undefined)) {
      answeredCount++;
    }
  });
  exam.part3.forEach((q) => {
    if (answers.part3[q.id]?.trim()) answeredCount++;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onChangeTab={(tab) => {
          if (tab === "exam") {
            handleSelectMilestone("TOT_NGHIEP_THPT");
          }
          setCurrentTab(tab);
        }}
        selectedTextbook={selectedTextbook}
        onSelectTextbook={setSelectedTextbook}
        onOpenQuickQuiz={() => setIsQuickQuizOpen(true)}
        onOpenMistakeNotebook={() => setIsMistakeNotebookOpen(true)}
        onOpenLiveArena={() => setIsLiveArenaOpen(true)}
        onOpenExamHistory={() => setIsExamHistoryOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMathAiSolver={() => setIsMathAiSolverOpen(true)}
        onOpenAzotaCreator={() => setIsAzotaCreatorOpen(true)}
        onOpenExamManager={() => setIsExamManagerOpen(true)}
        onOpenMathTips={() => {
          setMathTipsInitialTab("formulas");
          setIsMathTipsOpen(true);
        }}
        onOpenMathLab={() => setIsMathLabOpen(true)}
        currentUser={currentUser}
        streakDays={streakDays}
      />

      <main className="flex-1 pb-16">
        {/* ========================================================================= */}
        {/* TAB 1: TRANG CHỦ & KHÔNG GIAN ÔN LUYỆN THEO 6 CHƯƠNG (OPEN PRACTICE HUB) */}
        {/* ========================================================================= */}
        {currentTab === "learning" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 animate-in fade-in duration-300">
            {/* Hero Banner with Free Open Access USP */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ôn Luyện Tự Do Theo 6 Chương • Tích Hợp 3 Bộ Sách Mới</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
                  Không Gian Ôn Luyện Toán 12{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                    Math12Pro
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                  Truy cập mở hoàn toàn vào mọi chương, không khóa lộ trình. Tự chọn chuyên đề, cấp độ khó và định dạng câu hỏi để luyện tập kèm <strong>lời giải chi tiết tức thì</strong>.
                </p>

                {/* 3 Main USPs Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                    <strong className="text-orange-400 block mb-1">1. Tích hợp 3 bộ sách:</strong>
                    <span className="text-slate-300">Kết nối tri thức, Cánh diều, Chân trời sáng tạo.</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                    <strong className="text-blue-400 block mb-1">2. Mở tự do 6 chương:</strong>
                    <span className="text-slate-300">Học sinh tự chọn dạng toán, xem đáp án tức thì.</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                    <strong className="text-emerald-400 block mb-1">3. Chuẩn Bộ GD&ĐT 2025–2026:</strong>
                    <span className="text-slate-300">3 phần: 4 lựa chọn, Đúng/Sai lũy tiến, Trả lời ngắn.</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      handleSelectMilestone("TOT_NGHIEP_THPT");
                      setCurrentTab("exam");
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Vào Phòng Thi Thử 90 Phút (Đề 2026)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsLiveArenaOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600/30 to-orange-600/30 hover:from-red-600/40 border border-orange-500/40 text-orange-300 font-bold text-sm transition-all cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span>Đấu trường Chủ Nhật 20h00</span>
                  </button>

                  <button
                    onClick={() => setIsMathLabOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600/30 to-amber-600/30 hover:from-orange-600/45 border border-orange-500/40 text-orange-200 font-bold text-sm transition-all cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-orange-400" />
                    <span>Phòng Thí Nghiệm MathLab</span>
                  </button>

                  <button
                    onClick={() => setIsQuickQuizOpen(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Luyện phản xạ 15p</span>
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: 4 INTERACTIVE ADVANCED FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: AI Math Solver Gemini */}
              <div
                onClick={() => setIsMathAiSolverOpen(true)}
                className="group p-5 rounded-2xl bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-slate-900/5 hover:from-purple-900/20 hover:to-indigo-900/20 border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer shadow-sm hover:shadow-md space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 animate-pulse text-purple-600" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 border border-purple-200">
                    AI Solver
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                    Giải Bài Toán Bằng AI
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Tải ảnh hoặc dán đề bài để AI phân tích và giải chi tiết từng bước & chỉ dẫn phím bấm Casio.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-1 text-xs font-bold text-purple-600">
                  <span>Trải nghiệm ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Unified Azota & Upload Exam Creator */}
              <div
                onClick={() => setIsAzotaCreatorOpen(true)}
                className="group p-5 rounded-2xl bg-gradient-to-br from-orange-900/10 via-amber-900/10 to-slate-900/5 hover:from-orange-900/20 hover:to-amber-900/20 border border-orange-500/30 hover:border-orange-500/60 transition-all cursor-pointer shadow-sm hover:shadow-md space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                    <FilePlus className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-orange-100 text-orange-700 border border-orange-200">
                    Word • PDF • Azota
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                    Tạo & Tải Đề Thi
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Tải file (.docx, .doc, .pdf) hoặc dán văn bản trích xuất câu hỏi tự động và làm bài thi ngay.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-1 text-xs font-bold text-orange-600">
                  <span>Tạo & Tải đề ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Exam Manager & Custom Bank */}
              <div
                onClick={() => setIsExamManagerOpen(true)}
                className="group p-5 rounded-2xl bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-slate-900/5 hover:from-blue-900/20 hover:to-indigo-900/20 border border-blue-500/30 hover:border-blue-500/60 transition-all cursor-pointer shadow-sm hover:shadow-md space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <FolderKanban className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700 border border-blue-200">
                    Kho đề tự tạo
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    Kho Đề & Luyện Tập
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Xem danh sách các đề thi bạn đã tạo, thi lại bất cứ lúc nào hoặc xoá đề không còn dùng.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-1 text-xs font-bold text-blue-600">
                  <span>Mở kho đề</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Formulas & Casio Hacks */}
              <div
                onClick={() => {
                  setMathTipsInitialTab("formulas");
                  setIsMathTipsOpen(true);
                }}
                className="group p-5 rounded-2xl bg-gradient-to-br from-amber-900/10 via-yellow-900/10 to-slate-900/5 hover:from-amber-900/20 hover:to-yellow-900/20 border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer shadow-sm hover:shadow-md space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-700 border border-amber-200">
                    Mẹo & Casio
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                    Cẩm Nang Công Thức 12
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Tra cứu công thức 6 chương, mẹo giải trắc nghiệm 5 giây & phím bấm Casio 580/880.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-1 text-xs font-bold text-amber-600">
                  <span>Mở cẩm nang</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Section Title with Mastery Progress Notice */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>6 Chương Toán 12 Mở Tự Do</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                    Truy cập mở hoàn toàn
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bấm vào bất kỳ chương nào để vào Không gian Ôn luyện 3 Tab (Lý thuyết, Luyện tập phân dạng, Đề kiểm tra)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Chuẩn chương trình Bộ GD&ĐT 2025–2026
                </span>
              </div>
            </div>

            {/* 6 Chapters Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((ch) => {
                return (
                  <div
                    key={ch.id}
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group shadow-xs"
                  >
                    <div className="p-6">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shadow-2xs">
                            {getChapterIcon(ch.iconName)}
                          </div>
                          <span className="text-xs text-slate-500 font-bold">Chương {ch.number}</span>
                        </div>

                        <span className="text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-orange-500" />
                          {ch.specialFeature.label}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                        {ch.description}
                      </p>

                      {/* Topics pills */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {ch.studyTopics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                        {ch.studyTopics.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            +{ch.studyTopics.length - 3} dạng khác
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setHubInitialTab("study");
                          setActiveChapterForHub(ch);
                        }}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Luyện phân dạng</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          setHubInitialTab("theory");
                          setActiveChapterForHub(ch);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Mở Chương</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HỆ THỐNG PHÒNG THI THỬ THEO 4 GIAI ĐOẠN (MOCK EXAM ROOM) */}
        {/* ========================================================================= */}
        {currentTab === "exam" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 animate-in fade-in duration-300">
            {/* 4 Exam Milestones Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold text-xs uppercase tracking-wider">
                      Phòng Thi Thử Chuẩn Năm 2026
                    </span>
                    <span className="text-xs text-slate-500">Đề thi Tốt nghiệp THPT 2026 môn Toán • 90 Phút</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">{exam.title}</h2>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                  <button
                    onClick={() => setIsAzotaCreatorOpen(true)}
                    className="text-xs px-3 py-2 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Tạo đề hoặc tải file Word, PDF làm bài thi"
                  >
                    <FilePlus className="w-3.5 h-3.5 text-orange-600" />
                    <span>Tạo & Tải Đề Thi</span>
                  </button>

                  <button
                    onClick={() => setIsExamManagerOpen(true)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Xem kho đề & Xoá các đề thi"
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Kho & Xoá đề</span>
                  </button>

                  <button
                    onClick={() => setIsExamHistoryOpen(true)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Xem lại lịch sử các đợt thi thử trước đây"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Lịch sử ({examHistoryCount})</span>
                  </button>
                </div>
              </div>

              {/* 4 Milestone Tabs Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                {[
                  {
                    id: "GIUA_KI_1",
                    title: "1. Giữa Học kì 1",
                    sub: "Trọng tâm Chương 1 & 2",
                  },
                  {
                    id: "CUOI_KI_1",
                    title: "2. Cuối Học kì 1",
                    sub: "Toàn bộ Chương 1, 2, 3",
                  },
                  {
                    id: "GIUA_CUOI_KI_2",
                    title: "3. Học kì 2",
                    sub: "Trọng tâm Chương 4, 5, 6",
                  },
                  {
                    id: "TOT_NGHIEP_THPT",
                    title: "4. Tốt nghiệp THPT 2026",
                    sub: "Chuẩn Bộ GD&ĐT 90 phút (22 câu)",
                  },
                ].map((m) => {
                  const isActive = selectedMilestone === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMilestone(m.id as MilestoneType)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50/60 hover:bg-slate-100 border-slate-200 text-slate-800"
                      }`}
                    >
                      <strong className="text-xs block font-bold leading-tight">{m.title}</strong>
                      <span className={`text-[11px] block mt-0.5 ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                        {m.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section Filter Pills */}
            {(() => {
              const scoreStructure = getExamScoreStructure(exam);
              const totalExamQuestions = (exam.part1?.length || 0) + (exam.part2?.length || 0) + (exam.part3?.length || 0);

              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold pb-1">
                    <span className="text-slate-400 font-medium whitespace-nowrap">Lọc phần:</span>
                    <button
                      onClick={() => setSelectedSectionFilter("ALL")}
                      className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                        selectedSectionFilter === "ALL"
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Tất cả ({totalExamQuestions} câu)
                    </button>

                    {exam.part1 && exam.part1.length > 0 && (
                      <button
                        onClick={() => setSelectedSectionFilter("PART_1")}
                        className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                          selectedSectionFilter === "PART_1"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {exam.part2.length === 0 && exam.part3.length === 0
                          ? `Trắc nghiệm (${exam.part1.length} câu - 10.0đ)`
                          : `Phần I: 4 Lựa chọn (${exam.part1.length} câu - ${scoreStructure.part1Score.toFixed(1)}đ)`}
                      </button>
                    )}

                    {exam.part2 && exam.part2.length > 0 && (
                      <button
                        onClick={() => setSelectedSectionFilter("PART_2")}
                        className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                          selectedSectionFilter === "PART_2"
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Phần II: Đúng / Sai ({exam.part2.length} câu - {scoreStructure.part2Score.toFixed(1)}đ)
                      </button>
                    )}

                    {exam.part3 && exam.part3.length > 0 && (
                      <button
                        onClick={() => setSelectedSectionFilter("PART_3")}
                        className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                          selectedSectionFilter === "PART_3"
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {exam.part2.length === 0
                          ? `Tự luận / Điền số (${exam.part3.length} câu - ${scoreStructure.part3Score.toFixed(1)}đ)`
                          : `Phần III: Trả lời ngắn (${exam.part3.length} câu - ${scoreStructure.part3Score.toFixed(1)}đ)`}
                      </button>
                    )}
                  </div>

                  {/* Informational format banner if custom / non-standard */}
                  {exam.isCustom && (
                    <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                      <span className="font-semibold">
                        Cấu trúc đề thi tùy biến: {scoreStructure.formatLabel}
                      </span>
                      <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                        Thang điểm 10.0
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 2-Column Main Exam Layout: Left 75% Questions, Right 25% Sticky Sidebar */}
            {(() => {
              const scoreStructure = getExamScoreStructure(exam);
              const examMinutes = Math.floor(timeRemaining / 60);
              const examSeconds = timeRemaining % 60;
              const formattedExamTime = `${String(examMinutes).padStart(2, "0")}:${String(examSeconds).padStart(2, "0")}`;

              const isP1Done = (id: number) => Boolean(answers.part1[id]);
              const isP2Done = (id: number) => {
                const sub = answers.part2[id];
                if (!sub) return false;
                return ["a", "b", "c", "d"].some((k) => sub[k as "a" | "b" | "c" | "d"] !== undefined);
              };
              const isP3Done = (id: number) => Boolean(answers.part3[id]?.trim());

              let totalExamAnswered = 0;
              exam.part1?.forEach((q) => { if (isP1Done(q.id)) totalExamAnswered++; });
              exam.part2?.forEach((q) => { if (isP2Done(q.id)) totalExamAnswered++; });
              exam.part3?.forEach((q) => { if (isP3Done(q.id)) totalExamAnswered++; });
              const totalExamQuestionsCount = (exam.part1?.length || 0) + (exam.part2?.length || 0) + (exam.part3?.length || 0);

              return (
                <div className="space-y-4">
                  {/* STICKY MOBILE EXAM BAR (< lg) */}
                  <div className="lg:hidden sticky top-14 z-30 bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 -mx-4 sm:-mx-6 rounded-b-2xl shadow-lg border-b border-slate-800 flex items-center justify-between gap-2">
                    {/* Timer badge */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wider ${
                        timeRemaining <= 300 
                          ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse" 
                          : timeRemaining <= 900 
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" 
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      }`}>
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{formattedExamTime}</span>
                        {isExamPaused && <span className="text-[10px] text-amber-300 font-sans font-normal">(Dừng)</span>}
                      </div>
                    </div>

                    {/* Center / Action buttons */}
                    <div className="flex items-center gap-2">
                      {/* Open Question Palette Drawer */}
                      <button
                        onClick={() => setIsMobilePaletteOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        title="Mở danh mục câu hỏi"
                      >
                        <ListChecks className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{totalExamAnswered}/{totalExamQuestionsCount} câu</span>
                      </button>

                      {/* Quick Submit Button */}
                      <button
                        onClick={() => setIsConfirmSubmitOpen(true)}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        Nộp bài
                      </button>
                    </div>
                  </div>

                  {/* MOBILE QUESTION PALETTE BOTTOM DRAWER */}
                  {isMobilePaletteOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
                        onClick={() => setIsMobilePaletteOpen(false)}
                      />
                      {/* Sheet */}
                      <div className="relative bg-white rounded-t-3xl shadow-2xl p-4 max-h-[80vh] flex flex-col z-10 animate-in slide-in-from-bottom duration-200">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>Danh mục câu hỏi</span>
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                              {totalExamAnswered}/{totalExamQuestionsCount} câu
                            </span>
                          </span>
                          <button
                            onClick={() => setIsMobilePaletteOpen(false)}
                            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="overflow-y-auto pt-3 pb-2">
                          <QuestionPalette
                            exam={exam}
                            answers={answers}
                            activeQuestionId={activeQuestionId}
                            onSelectQuestion={(sec, id) => {
                              handleScrollToQuestion(sec, id);
                              setIsMobilePaletteOpen(false);
                            }}
                            onSubmitClick={() => {
                              setIsMobilePaletteOpen(false);
                              setIsConfirmSubmitOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    {/* LEFT 75% (3 cols on lg) */}
                    <div className="lg:col-span-3 space-y-6">
                    {/* PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN */}
                    {exam.part1 && exam.part1.length > 0 && (selectedSectionFilter === "ALL" || selectedSectionFilter === "PART_1") && (
                      <div className="space-y-4">
                        <div className="bg-blue-50/80 border border-blue-200/80 p-4 rounded-2xl flex items-center justify-between">
                          <div>
                            <h3 className="font-extrabold text-blue-950 text-sm">
                              {exam.part2.length === 0 && exam.part3.length === 0
                                ? `TRẮC NGHIỆM 4 LỰA CHỌN (${exam.part1.length} CÂU - ${scoreStructure.part1Score.toFixed(1)} ĐIỂM)`
                                : `PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN (${exam.part1.length} CÂU - ${scoreStructure.part1Score.toFixed(1)} ĐIỂM)`}
                            </h3>
                            <p className="text-xs text-blue-700 mt-0.5">
                              Thí sinh chọn 1 phương án đúng duy nhất (A, B, C hoặc D). Mỗi câu đúng được {scoreStructure.perP1.toFixed(2)} điểm.
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-white text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                            {scoreStructure.perP1.toFixed(2)}đ / câu
                          </span>
                        </div>

                        {exam.part1.map((q) => (
                          <SingleChoiceQuestion
                            key={q.id}
                            question={q}
                            userAnswer={answers.part1[q.id]}
                            onAnswerChange={(ans) =>
                              setAnswers((prev) => ({
                                ...prev,
                                part1: { ...prev.part1, [q.id]: ans },
                              }))
                            }
                            isFlagged={Boolean(answers.flagged[`p1-${q.id}`])}
                            onToggleFlag={() => handleToggleFlag(`p1-${q.id}`)}
                          />
                        ))}
                      </div>
                    )}

                    {/* PHẦN II: CÂU ĐÚNG / SAI */}
                    {exam.part2 && exam.part2.length > 0 && (selectedSectionFilter === "ALL" || selectedSectionFilter === "PART_2") && (
                      <div className="space-y-4 pt-4">
                        <div className="bg-indigo-50/80 border border-indigo-200/80 p-4 rounded-2xl flex items-center justify-between">
                          <div>
                            <h3 className="font-extrabold text-indigo-950 text-sm">
                              PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI ({exam.part2.length} CÂU - {scoreStructure.part2Score.toFixed(1)} ĐIỂM)
                            </h3>
                            <p className="text-xs text-indigo-700 mt-0.5">
                              Mỗi câu có 4 ý a), b), c), d). Điểm lũy tiến: đúng 1 ý = {(scoreStructure.perP2Max * 0.1).toFixed(2)}đ; 2 ý = {(scoreStructure.perP2Max * 0.25).toFixed(2)}đ; 3 ý = {(scoreStructure.perP2Max * 0.5).toFixed(2)}đ; 4 ý = {scoreStructure.perP2Max.toFixed(2)}đ.
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-white text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                            Tối đa {scoreStructure.perP2Max.toFixed(2)}đ / câu
                          </span>
                        </div>

                        {exam.part2.map((q) => (
                          <TrueFalseQuestion
                            key={q.id}
                            question={q}
                            userAnswer={answers.part2[q.id]}
                            onAnswerChange={(subKey, val) =>
                              setAnswers((prev) => ({
                                ...prev,
                                part2: {
                                  ...prev.part2,
                                  [q.id]: {
                                    ...(prev.part2[q.id] || { a: undefined, b: undefined, c: undefined, d: undefined }),
                                    [subKey]: val,
                                  },
                                },
                              }))
                            }
                            isFlagged={Boolean(answers.flagged[`p2-${q.id}`])}
                            onToggleFlag={() => handleToggleFlag(`p2-${q.id}`)}
                          />
                        ))}
                      </div>
                    )}

                    {/* PHẦN III: TRẢ LỜI NGẮN / TỰ LUẬN */}
                    {exam.part3 && exam.part3.length > 0 && (selectedSectionFilter === "ALL" || selectedSectionFilter === "PART_3") && (
                      <div className="space-y-4 pt-4">
                        <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-2xl flex items-center justify-between">
                          <div>
                            <h3 className="font-extrabold text-emerald-950 text-sm">
                              {exam.part2.length === 0
                                ? `PHẦN TỰ LUẬN / TRẢ LỜI NGẮN (${exam.part3.length} CÂU - ${scoreStructure.part3Score.toFixed(1)} ĐIỂM)`
                                : `PHẦN III: TRẮC NGHIỆM TRẢ LỜI NGẮN (${exam.part3.length} CÂU - ${scoreStructure.part3Score.toFixed(1)} ĐIỂM)`}
                            </h3>
                            <p className="text-xs text-emerald-700 mt-0.5">
                              {exam.part2.length === 0
                                ? `Thí sinh làm bài tự luận hoặc tự điền đáp số vào ô vuông. Mỗi câu tương ứng ${scoreStructure.perP3.toFixed(2)} điểm.`
                                : `Thí sinh tự điền đáp số vào ô vuông (tối đa 4 ký tự: số, dấu trừ -, dấu phẩy ,). Mỗi câu đúng = ${scoreStructure.perP3.toFixed(2)} điểm.`}
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                            {scoreStructure.perP3.toFixed(2)}đ / câu
                          </span>
                        </div>

                        {exam.part3.map((q) => (
                          <ShortAnswerQuestion
                            key={q.id}
                            question={q}
                            userAnswer={answers.part3[q.id]}
                            onAnswerChange={(val) =>
                              setAnswers((prev) => ({
                                ...prev,
                                part3: { ...prev.part3, [q.id]: val },
                              }))
                            }
                            isFlagged={Boolean(answers.flagged[`p3-${q.id}`])}
                            onToggleFlag={() => handleToggleFlag(`p3-${q.id}`)}
                          />
                        ))}
                      </div>
                    )}

                    {/* Bottom Submit Action Card */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Đã hoàn thành các câu hỏi?</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tiến độ: <strong className="text-blue-600 font-semibold">{totalExamAnswered}/{totalExamQuestionsCount}</strong> câu hỏi. Hãy kiểm tra kĩ trước khi nộp bài.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsConfirmSubmitOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer shrink-0"
                      >
                        Nộp bài thi ngay
                      </button>
                    </div>
                  </div>

                  {/* RIGHT 25% (Sticky Sidebar for lg+) */}
                  <div className="hidden lg:block lg:col-span-1 sticky top-20 space-y-4">
                    <ExamTimer
                      timeRemaining={timeRemaining}
                      setTimeRemaining={setTimeRemaining}
                      onTimeUp={handleConfirmSubmit}
                      isPaused={isExamPaused}
                      onTogglePause={() => setIsExamPaused(!isExamPaused)}
                    />

                    <QuestionPalette
                      exam={exam}
                      answers={answers}
                      activeQuestionId={activeQuestionId}
                      onSelectQuestion={handleScrollToQuestion}
                      onSubmitClick={() => setIsConfirmSubmitOpen(true)}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GIAO DIỆN KẾT QUẢ & PHÂN TÍCH (ANALYTICS DASHBOARD) */}
        {/* ========================================================================= */}
        {currentTab === "analytics" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 animate-in fade-in duration-300">
            {!examResult ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Chưa có kết quả bài thi</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hãy vào Phòng Thi Thử và hoàn thành bài thi 90 phút để nhận bảng phân tích điểm số chuẩn Bộ GD&ĐT và biểu đồ Radar năng lực 6 chương.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab("exam")}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Vào làm đề thi ngay
                  </button>
                </div>
              </div>
            ) : (
              /* RESULTS DASHBOARD CONTENT */
              <div className="space-y-8">
                {/* Score & KPI Header */}
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                        Đã chấm thi tự động chuẩn Bộ GD&ĐT 2025–2026
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Bảng Phân Tích Năng Lực Toán 12
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        Thời gian nộp bài: {examResult.submittedAt} • Hoàn thành trong{" "}
                        <strong className="text-white font-bold">
                          {Math.floor(examResult.timeSpentSeconds / 60)} phút{" "}
                          {examResult.timeSpentSeconds % 60} giây
                        </strong>
                      </p>
                    </div>

                    {/* Total Score Display Badge */}
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 self-start lg:self-auto">
                      <div>
                        <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold block">
                          TỔNG ĐIỂM
                        </span>
                        <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                          {examResult.totalScore.toFixed(2)}
                          <span className="text-xl text-slate-400 font-sans font-normal"> / 10.0</span>
                        </div>
                      </div>

                      <div className="pl-4 border-l border-white/20">
                        <span className="text-xs text-slate-300 block mb-1">Xếp loại</span>
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-lg ${
                            examResult.totalScore >= 8.5
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : examResult.totalScore >= 6.5
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          }`}
                        >
                          {examResult.totalScore >= 8.5
                            ? "Xuất sắc"
                            : examResult.totalScore >= 7.0
                            ? "Khá - Giỏi"
                            : examResult.totalScore >= 5.0
                            ? "Trung bình khá"
                            : "Cần cải thiện"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Section Scores Breakdown Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block mb-1">Phần I (12 câu 4 lựa chọn):</span>
                      <div className="text-lg font-bold text-white font-mono">
                        {examResult.scorePart1.toFixed(2)}{" "}
                        <span className="text-slate-400 font-normal text-xs">/ 3.0 điểm</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block mb-1">Phần II (4 câu Đúng/Sai lũy tiến):</span>
                      <div className="text-lg font-bold text-white font-mono">
                        {examResult.scorePart2.toFixed(2)}{" "}
                        <span className="text-slate-400 font-normal text-xs">/ 4.0 điểm</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block mb-1">Phần III (6 câu Trả lời ngắn):</span>
                      <div className="text-lg font-bold text-white font-mono">
                        {examResult.scorePart3.toFixed(2)}{" "}
                        <span className="text-slate-400 font-normal text-xs">/ 3.0 điểm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Radar Chart & Chapter Mastery Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Biểu Đồ Năng Lực 6 Chương (Radar)
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Tỷ lệ điểm đạt được theo từng phân môn Toán 12
                      </p>
                    </div>

                    <RadarAnalytics data={examResult.chapterRadar} />

                    <div className="text-[11px] text-slate-400 text-center mt-2">
                      Mức chuẩn đại học top đầu: &ge; 80% mỗi chương
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      Chi Tiết Điểm Từng Chương
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Phân tích mức độ thành thạo và gợi ý chuyên đề ôn tập
                    </p>

                    <div className="space-y-3">
                      {examResult.chapterRadar.map((ch) => (
                        <div
                          key={ch.chapterId}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-slate-800">
                                Chương {ch.chapterId}: {ch.chapterName}
                              </span>
                              <span className="text-xs font-mono font-bold text-blue-700">
                                {ch.earnedScore} / {ch.maxScore}đ ({ch.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  ch.percentage >= 80
                                    ? "bg-emerald-500"
                                    : ch.percentage >= 60
                                    ? "bg-blue-600"
                                    : "bg-rose-500"
                                }`}
                                style={{ width: `${ch.percentage}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                                ch.percentage >= 80
                                ? "bg-emerald-100 text-emerald-800"
                                : ch.percentage >= 60
                                ? "bg-blue-100 text-blue-800"
                                : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {ch.status}
                            </span>

                            <button
                              onClick={() => handleJumpToChapterStudy(ch.chapterId)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-orange-400 text-orange-600 text-xs font-bold cursor-pointer transition-colors"
                              title="Nhảy thẳng tới Tab Luyện tập phân dạng của chương này"
                            >
                              Luyện ngay
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WARNING BANNER: Gợi ý link nhảy thẳng tới Tab Luyện tập phân dạng của chương bị mất điểm */}
                {examResult.weakChapters.length > 0 && (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <h3 className="font-extrabold text-amber-950 text-base">
                            CẢNH BÁO CHUYÊN ĐỀ BỊ MẤT ĐIỂM • GỢI Ý ÔN TẬP TRỌNG TÂM
                          </h3>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                            {examResult.weakChapters.length} chương cần củng cố
                          </span>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed mb-4">
                          Hệ thống đã nhận diện các điểm yếu trong bài thi. Hãy nhấn nút dưới đây để nhảy thẳng vào <strong>Tab Luyện tập phân dạng</strong> của chương tương ứng và sửa sai ngay:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                          {examResult.weakChapters.map((wc) => (
                            <div
                              key={wc.chapterId}
                              className="p-3.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between gap-3 shadow-2xs"
                            >
                              <div>
                                <strong className="text-xs font-bold text-slate-800 block">
                                  Chương {wc.chapterId}: {wc.chapterName}
                                </strong>
                                <span className="text-[11px] text-rose-600 font-medium">
                                  Điểm đạt được: {wc.percentage}% ({wc.earnedScore}/{wc.maxScore}đ)
                                </span>
                              </div>

                              <button
                                onClick={() => handleJumpToChapterStudy(wc.chapterId)}
                                className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                              >
                                <span>Luyện phân dạng</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DETAILED SOLUTION REVIEW SECTION */}
                <div className="space-y-6 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Xem Lại Chi Tiết Lời Giải Từng Câu Hỏi
                      </h3>
                      <p className="text-xs text-slate-500">
                        Kèm công thức LaTeX và đối chiếu đáp án của bạn
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReviewFilter("ALL")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                          reviewFilter === "ALL"
                            ? "bg-slate-900 text-white"
                            : "bg-white border border-slate-200 text-slate-600"
                        }`}
                      >
                        Tất cả câu hỏi
                      </button>
                      <button
                        onClick={() => setReviewFilter("WRONG_ONLY")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                          reviewFilter === "WRONG_ONLY"
                            ? "bg-rose-600 text-white"
                            : "bg-white border border-slate-200 text-slate-600"
                        }`}
                      >
                        Chỉ xem câu làm sai
                      </button>
                    </div>
                  </div>

                  {/* Render Questions in Review Mode */}
                  <div className="space-y-6">
                    {/* Part I in review */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
                        Phần I: Trắc nghiệm 4 lựa chọn (12 câu)
                      </h4>
                      {exam.part1
                        .filter((q) => {
                          if (reviewFilter === "WRONG_ONLY") {
                            return answers.part1[q.id] !== q.correctAnswer;
                          }
                          return true;
                        })
                        .map((q) => (
                          <SingleChoiceQuestion
                            key={q.id}
                            question={q}
                            userAnswer={answers.part1[q.id]}
                            onAnswerChange={() => {}}
                            onToggleFlag={() => {}}
                            isReviewMode={true}
                          />
                        ))}
                    </div>

                    {/* Part II in review */}
                    <div className="space-y-4 pt-4">
                      <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">
                        Phần II: Đúng / Sai (4 câu)
                      </h4>
                      {exam.part2.map((q) => (
                        <TrueFalseQuestion
                          key={q.id}
                          question={q}
                          userAnswer={answers.part2[q.id]}
                          onAnswerChange={() => {}}
                          onToggleFlag={() => {}}
                          isReviewMode={true}
                        />
                      ))}
                    </div>

                    {/* Part III in review */}
                    <div className="space-y-4 pt-4">
                      <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                        Phần III: Trả lời ngắn (6 câu)
                      </h4>
                      {exam.part3
                        .filter((q) => {
                          if (reviewFilter === "WRONG_ONLY") {
                            const ans = (answers.part3[q.id] || "").trim().replace(/\./g, ",");
                            const correct = q.correctAnswer.trim().replace(/\./g, ",");
                            return ans !== correct;
                          }
                          return true;
                        })
                        .map((q) => (
                          <ShortAnswerQuestion
                            key={q.id}
                            question={q}
                            userAnswer={answers.part3[q.id]}
                            onAnswerChange={() => {}}
                            onToggleFlag={() => {}}
                            isReviewMode={true}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-center gap-4 pt-8">
                    <button
                      onClick={handleResetExam}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Làm lại đề thi này</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab("learning");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer"
                    >
                      Quay về Không gian Ôn luyện 6 chương
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* SUBMIT CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 mx-auto flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Xác Nhận Nộp Bài Thi</h3>
              <p className="text-xs text-slate-500 mt-1">
                Bạn có chắc chắn muốn nộp bài để hệ thống tiến hành chấm điểm?
              </p>
            </div>

            {/* Answered vs Unanswered summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-white rounded-xl">
                <span className="text-slate-500 block">Đã làm</span>
                <strong className="text-lg font-bold text-blue-700">{answeredCount} câu</strong>
              </div>
              <div className="p-2 bg-white rounded-xl">
                <span className="text-slate-500 block">Chưa làm</span>
                <strong className="text-lg font-bold text-rose-600">
                  {22 - answeredCount} câu
                </strong>
              </div>
            </div>

            {22 - answeredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-left flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Bạn vẫn còn {22 - answeredCount} câu chưa điền đáp án!</span>
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Nộp bài & Chấm điểm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER PRACTICE HUB (3 TABS: THEORY, STUDY MODE, CHAPTER TEST) */}
      {/* ========================================================================= */}
      {activeChapterForHub && (
        <ChapterPracticeHub
          chapter={activeChapterForHub}
          initialTab={hubInitialTab}
          onClose={() => setActiveChapterForHub(null)}
          onAddMistake={handleAddMistake}
          onStartExam={() => {
            setActiveChapterForHub(null);
            setCurrentTab("exam");
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* QUICK QUIZ 15-MINUTE MODAL */}
      {/* ========================================================================= */}
      <QuickQuizModal
        isOpen={isQuickQuizOpen}
        onClose={() => setIsQuickQuizOpen(false)}
      />

      {/* ========================================================================= */}
      {/* MISTAKE NOTEBOOK MODAL */}
      {/* ========================================================================= */}
      <MistakeNotebookModal
        isOpen={isMistakeNotebookOpen}
        mistakesList={mistakesList}
        onClose={() => setIsMistakeNotebookOpen(false)}
      />

      {/* ========================================================================= */}
      {/* LIVE ARENA MODAL (SUNDAY 20H00) */}
      {/* ========================================================================= */}
      <LiveArenaModal
        isOpen={isLiveArenaOpen}
        onClose={() => setIsLiveArenaOpen(false)}
        onJoinExam={() => {
          setIsLiveArenaOpen(false);
          setCurrentTab("exam");
        }}
      />

      {/* ========================================================================= */}
      {/* EXAM HISTORY MODAL */}
      {/* ========================================================================= */}
      <ExamHistoryModal
        isOpen={isExamHistoryOpen}
        onClose={() => setIsExamHistoryOpen(false)}
        onSelectAttempt={handleSelectAttempt}
      />

      {/* ========================================================================= */}
      {/* AUTHENTICATION MODAL (REGISTER / LOGIN) */}
      {/* ========================================================================= */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      {/* ========================================================================= */}
      {/* AZOTA EXAM CREATOR MODAL */}
      {/* ========================================================================= */}
      <AzotaExamCreatorModal
        isOpen={isAzotaCreatorOpen}
        onClose={() => setIsAzotaCreatorOpen(false)}
        onExamCreated={handleStartCustomExam}
      />



      {/* ========================================================================= */}
      {/* EXAM MANAGER & DELETION MODAL */}
      {/* ========================================================================= */}
      <ExamManagerModal
        isOpen={isExamManagerOpen}
        onClose={() => setIsExamManagerOpen(false)}
        allExams={allExamsList}
        onSelectExam={(ex) => handleStartCustomExam(ex, true)}
        onExamsUpdated={refreshExams}
      />

      {/* ========================================================================= */}
      {/* AI MATH SOLVER (GEMINI API) MODAL */}
      {/* ========================================================================= */}
      <MathAiSolverModal
        isOpen={isMathAiSolverOpen}
        onClose={() => setIsMathAiSolverOpen(false)}
        onSaveToMistakeNotebook={handleAddMistake}
      />

      {/* ========================================================================= */}
      {/* MATH TIPS, FORMULAS & CASIO HACKS MODAL */}
      {/* ========================================================================= */}
      <MathTipsAndFormulasModal
        isOpen={isMathTipsOpen}
        onClose={() => setIsMathTipsOpen(false)}
        initialTab={mathTipsInitialTab}
      />

      {/* ========================================================================= */}
      {/* MATHLAB STUDIO (PHÒNG THÍ NGHIỆM TOÁN HỌC) MODAL */}
      {/* ========================================================================= */}
      <MathLabStudio
        isOpen={isMathLabOpen}
        onClose={() => setIsMathLabOpen(false)}
      />
    </div>
  );
}
