"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  HelpCircle,
  Award,
  CheckCircle2,
  Filter,
  PlayCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Target,
  AlertCircle,
} from "lucide-react";
import { Chapter, StudyQuestion, MistakeItem } from "@/types/learning";
import { STUDY_QUESTIONS } from "@/data/chaptersData";
import { checkSingleQuestionApi } from "@/services/apiClient";
import { updateChapterMasteryScore, getStoredMastery } from "@/services/storageService";
import MathRenderer from "./MathRenderer";
import CubicGraphSimulator from "./classroom/CubicGraphSimulator";
import TheoryDocumentViewer from "./classroom/TheoryDocumentViewer";
import OxyzVectorLab3D from "./classroom/OxyzVectorLab3D";
import GroupedStatsLab from "./classroom/GroupedStatsLab";
import DefiniteIntegralLab from "./classroom/DefiniteIntegralLab";
import SpatialGeometry3DLab from "./classroom/SpatialGeometry3DLab";
import ProbabilitySimulationLab from "./classroom/ProbabilitySimulationLab";

interface ChapterPracticeHubProps {
  chapter: Chapter | null;
  initialTab?: "theory" | "study" | "test";
  onClose: () => void;
  onAddMistake?: (mistake: MistakeItem) => void;
  onStartExam?: () => void;
}

export default function ChapterPracticeHub({
  chapter,
  initialTab = "theory",
  onClose,
  onAddMistake,
  onStartExam,
}: ChapterPracticeHubProps) {
  const [activeTab, setActiveTab] = useState<"theory" | "study" | "test">(initialTab);

  // Filters for Study Mode (Tab 2)
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");

  // User responses in Study Mode
  const [studyAnswers, setStudyAnswers] = useState<Record<string, string | boolean | Record<string, boolean>>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  // Dynamic mastery tracking
  const [masteryPercent, setMasteryPercent] = useState<number>(() => {
    if (!chapter) return 0;
    const m = getStoredMastery();
    return m[chapter.id]?.masteryPercent ?? chapter.masteryPercent;
  });

  if (!chapter) return null;

  // Filter study questions for this chapter
  const chapterQuestions = STUDY_QUESTIONS.filter((q) => {
    if (q.chapterId !== chapter.id) return false;
    if (selectedTopic !== "ALL" && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== "ALL" && q.difficulty !== selectedDifficulty) return false;
    if (selectedFormat !== "ALL" && q.format !== selectedFormat) return false;
    return true;
  });

  // Handle checking answer for a question in Study Mode
  const handleCheckAnswer = async (q: StudyQuestion) => {
    setCheckedQuestions((prev) => ({ ...prev, [q.id]: true }));

    const userAns = studyAnswers[q.id];
    let isCorrect = false;

    // Call API (or fallback)
    const apiResult = await checkSingleQuestionApi({
      questionId: q.id,
      userAnswer: userAns,
    });

    if (apiResult) {
      isCorrect = apiResult.isCorrect;
    } else {
      if (q.format === "MULTIPLE_CHOICE") {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.format === "SHORT_ANSWER") {
        const cleanUser = String(userAns || "").trim().toLowerCase().replace(/\./g, ",");
        const cleanTarget = String(q.correctAnswer || "").trim().toLowerCase().replace(/\./g, ",");
        isCorrect = cleanUser === cleanTarget;
      } else if (q.format === "TRUE_FALSE" && q.statements) {
        const subMap = (typeof userAns === "object" && userAns !== null ? userAns : {}) as Record<string, boolean>;
        isCorrect = q.statements.every((stmt) => subMap[stmt.key] === stmt.correct);
      }
      updateChapterMasteryScore(q.chapterId, 1, isCorrect ? 1 : 0);
    }

    const updatedMap = getStoredMastery();
    if (updatedMap[q.chapterId]) {
      setMasteryPercent(updatedMap[q.chapterId].masteryPercent);
    }

    // Auto-save to Mistake Notebook if wrong
    if (!isCorrect && onAddMistake) {
      onAddMistake({
        id: `study-${q.id}`,
        source: "STUDY_MODE",
        chapterId: q.chapterId,
        chapterTitle: chapter.title,
        topic: q.topic,
        problem: q.content,
        studentAnswer: typeof userAns === "object" ? JSON.stringify(userAns) : String(userAns || "Chưa nhập"),
        correctAnswer: String(q.correctAnswer || "Xem giải thích"),
        explanation: q.explanation,
        tag: "Nhầm công thức",
        reviewCount: 1,
        resolved: false,
        date: "Hôm nay",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-50 rounded-3xl shadow-2xl border border-slate-700/50 w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* ========================================================================= */}
        {/* 1. REDESIGNED HEADER: BREADCRUMBS, TITLE, BADGES, SAFE CLOSE BUTTON */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white p-4 sm:p-6 border-b border-slate-800 relative">
          <div className="flex items-start justify-between gap-4">
            
            {/* Title & Metadata Area */}
            <div className="space-y-2 flex-1 pr-2">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 font-medium flex-wrap">
                <span className="text-slate-300">Toán 12</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-blue-400 font-semibold">Chương {chapter.number}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-200 truncate max-w-[200px] sm:max-w-none">
                  {activeTab === "theory"
                    ? "Lý thuyết & Mô phỏng"
                    : activeTab === "study"
                    ? "Luyện tập phân dạng"
                    : "Đề kiểm tra 45p"}
                </span>
              </nav>

              {/* Lesson Title (prominent, wraps gracefully) */}
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {chapter.title}
              </h2>

              {/* Badges Row */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {/* Mastery Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-xs">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Thành thạo {masteryPercent}%</span>
                </div>

                {/* Interactive Feature Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>{chapter.specialFeature.badge}</span>
                </div>

                {/* 3 Textbook Standards */}
                <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium hidden sm:inline-block">
                  Chuẩn 3 Bộ SGK 2025–2026
                </span>
              </div>
            </div>

            {/* Close Button (Touch target >= 44px, never blocked by title) */}
            <button
              onClick={onClose}
              aria-label="Đóng phòng học"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 border border-slate-700 cursor-pointer shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. REDESIGNED TABS BAR: BALANCED, ACCESSIBLE, UNIFORM HEIGHT */}
        {/* ========================================================================= */}
        <div className="bg-slate-100 border-b border-slate-200/90 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar select-none">
          <nav role="tablist" aria-label="Khu vực phòng học" className="flex items-center gap-1.5 sm:gap-2">
            {/* Tab 1: Theory & Tools */}
            <button
              role="tab"
              aria-selected={activeTab === "theory"}
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0 ${
                activeTab === "theory"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:text-blue-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">1. Lý thuyết & Mô phỏng</span>
              <span className="sm:hidden">1. Lý thuyết & Lab</span>
            </button>

            {/* Tab 2: Study Mode */}
            <button
              role="tab"
              aria-selected={activeTab === "study"}
              onClick={() => setActiveTab("study")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-orange-500 shrink-0 ${
                activeTab === "study"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:text-orange-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">2. Luyện tập phân dạng</span>
              <span className="sm:hidden">2. Luyện tập</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 font-mono">
                {chapterQuestions.length}
              </span>
            </button>

            {/* Tab 3: Chapter Test */}
            <button
              role="tab"
              aria-selected={activeTab === "test"}
              onClick={() => setActiveTab("test")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-slate-800 shrink-0 ${
                activeTab === "test"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">3. Đề kiểm tra chương (45p)</span>
              <span className="sm:hidden">3. Kiểm tra 45p</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium hidden lg:block">
              Chuẩn 3 Bộ SGK 2025–2026
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MODAL BODY (SCROLLABLE WORKSPACE) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/50">
          
          {/* ========================================================================= */}
          {/* TAB 1: LÝ THUYẾT GIÁO TRÌNH SỐ & CÔNG CỤ TƯƠNG TÁC ĐỒ THỊ */}
          {/* ========================================================================= */}
          {activeTab === "theory" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              {/* CHAPTER 1 SPECIAL INTERACTIVE WORKSPACE: CUBIC GRAPH SIMULATOR */}
              {chapter.id === 1 && (
                <CubicGraphSimulator
                  initialA={1}
                  initialB={-3}
                  initialC={0}
                  initialD={2}
                />
              )}

              {/* CHAPTER 2: 3D VECTOR OXYZ INTERACTIVE LAB */}
              {chapter.id === 2 && <OxyzVectorLab3D />}

              {/* CHAPTER 3: GROUPED STATS INTERACTIVE LAB & HISTOGRAM */}
              {chapter.id === 3 && <GroupedStatsLab />}

              {/* CHAPTER 4: DEFINITE INTEGRAL & SHADED AREA LAB */}
              {chapter.id === 4 && <DefiniteIntegralLab />}

              {/* CHAPTER 5: 3D SPATIAL GEOMETRY & PLANES LAB */}
              {chapter.id === 5 && <SpatialGeometry3DLab />}

              {/* CHAPTER 6: PROBABILITY MONTE CARLO & BAYES TREE LAB */}
              {chapter.id === 6 && <ProbabilitySimulationLab />}

              {/* DIGITAL TEXTBOOK VIEWER (Structured Markdown & 3-Textbook Integration) */}
              <TheoryDocumentViewer chapter={chapter} />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LUYỆN TẬP PHÂN DẠNG (STUDY MODE WITH REAL-TIME CHECKING) */}
          {/* ========================================================================= */}
          {activeTab === "study" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Filter controls */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-orange-500" />
                    <span>Bộ Lọc Câu Hỏi Phân Dạng</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Tìm thấy: <strong className="text-blue-600 font-bold">{chapterQuestions.length}</strong> câu
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Topic Filter */}
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Chuyên đề:</label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ALL">Tất cả chuyên đề ({chapter.studyTopics.length})</option>
                      {chapter.studyTopics.map((topic, i) => (
                        <option key={i} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Format Filter */}
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Định dạng:</label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ALL">Tất cả định dạng</option>
                      <option value="MULTIPLE_CHOICE">Phần I: 4 Lựa chọn</option>
                      <option value="TRUE_FALSE">Phần II: Đúng/Sai 4 ý</option>
                      <option value="SHORT_ANSWER">Phần III: Trả lời ngắn</option>
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Mức độ:</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ALL">Tất cả mức độ</option>
                      <option value="Nhận biết">Nhận biết</option>
                      <option value="Thông hiểu">Thông hiểu</option>
                      <option value="Vận dụng">Vận dụng</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Question list or Empty State */}
              <div className="space-y-4">
                {chapterQuestions.length === 0 ? (
                  <div className="p-10 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-base">
                      Không tìm thấy câu hỏi phù hợp bộ lọc
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Vui lòng thử chọn lại chuyên đề hoặc mức độ nhận thức khác để tiếp tục luyện tập.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTopic("ALL");
                        setSelectedDifficulty("ALL");
                        setSelectedFormat("ALL");
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                ) : (
                  chapterQuestions.map((q, idx) => {
                    const isChecked = !!checkedQuestions[q.id];
                    const userAns = studyAnswers[q.id];

                    return (
                      <div
                        key={q.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
                      >
                        {/* Question Header & Badges */}
                        <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-700">
                              {q.topic}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                              {q.format === "MULTIPLE_CHOICE"
                                ? "4 Lựa chọn"
                                : q.format === "TRUE_FALSE"
                                ? "Đúng/Sai 4 ý"
                                : "Trả lời ngắn"}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
                              {q.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="text-sm font-medium text-slate-900 leading-relaxed">
                          <MathRenderer text={q.content} />
                        </div>

                        {/* Multiple Choice Options */}
                        {q.format === "MULTIPLE_CHOICE" && q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {q.options.map((opt) => (
                              <button
                                key={opt.key}
                                type="button"
                                disabled={isChecked}
                                onClick={() =>
                                  setStudyAnswers((prev) => ({ ...prev, [q.id]: opt.key }))
                                }
                                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                                  userAns === opt.key
                                    ? "bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600"
                                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                                }`}
                              >
                                <span className="w-5 h-5 rounded-md bg-slate-100 font-bold text-slate-700 flex items-center justify-center shrink-0">
                                  {opt.key}
                                </span>
                                <div className="flex-1">
                                  <MathRenderer text={opt.text} />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* True/False Statements */}
                        {q.format === "TRUE_FALSE" && q.statements && (
                          <div className="space-y-2">
                            {q.statements.map((stmt) => {
                              const subMap = (typeof userAns === "object" && userAns !== null ? userAns : {}) as Record<string, boolean>;
                              const val = subMap[stmt.key];

                              return (
                                <div
                                  key={stmt.key}
                                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                                >
                                  <div className="flex items-start gap-2 flex-1">
                                    <span className="font-bold text-slate-800">{stmt.key})</span>
                                    <div className="text-slate-800 font-medium">
                                      <MathRenderer text={stmt.text} />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      disabled={isChecked}
                                      onClick={() =>
                                        setStudyAnswers((prev) => {
                                          const cur = (typeof prev[q.id] === "object" && prev[q.id] !== null ? prev[q.id] : {}) as Record<string, boolean>;
                                          return {
                                            ...prev,
                                            [q.id]: { ...cur, [stmt.key]: true },
                                          };
                                        })
                                      }
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                        val === true
                                          ? "bg-blue-600 text-white"
                                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                                      }`}
                                    >
                                      Đúng
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isChecked}
                                      onClick={() =>
                                        setStudyAnswers((prev) => {
                                          const cur = (typeof prev[q.id] === "object" && prev[q.id] !== null ? prev[q.id] : {}) as Record<string, boolean>;
                                          return {
                                            ...prev,
                                            [q.id]: { ...cur, [stmt.key]: false },
                                          };
                                        })
                                      }
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                        val === false
                                          ? "bg-blue-600 text-white"
                                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                                      }`}
                                    >
                                      Sai
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Short Answer Input */}
                        {q.format === "SHORT_ANSWER" && (
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              disabled={isChecked}
                              maxLength={4}
                              placeholder="Đáp số (VD: 1)"
                              value={typeof userAns === "string" ? userAns : ""}
                              onChange={(e) =>
                                setStudyAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                              }
                              className="w-44 h-10 px-3 font-mono font-bold text-center rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                            />
                            {q.unit && <span className="text-xs text-slate-500 font-medium">{q.unit}</span>}
                          </div>
                        )}

                        {/* Check Answer Button & Instant Solution */}
                        {!isChecked ? (
                          <button
                            onClick={() => handleCheckAnswer(q)}
                            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Kiểm tra đáp án & Xem lời giải ngay</span>
                          </button>
                        ) : (
                          <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 animate-in fade-in duration-150">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">
                                Đáp án chính xác:{" "}
                                <strong className="text-blue-700 font-mono text-sm">
                                  {q.format === "TRUE_FALSE" && q.statements
                                    ? q.statements.map((s) => `${s.key}: ${s.correct ? "Đ" : "S"}`).join(" | ")
                                    : String(q.correctAnswer)}
                                </strong>
                              </span>
                              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                Đã cập nhật năng lực
                              </span>
                            </div>
                            <div className="text-slate-700 pt-2 border-t border-slate-200">
                              <strong className="text-slate-900 block mb-1">💡 Lời giải chi tiết:</strong>
                              <MathRenderer text={q.explanation} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ĐỀ KIỂM TRA CHƯƠNG (45 PHÚT) */}
          {/* ========================================================================= */}
          {activeTab === "test" && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto shadow-sm my-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
                <Clock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Đánh giá toàn diện
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Bài Kiểm Tra Chương {chapter.number}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Mô phỏng bài thi định kỳ 45 phút riêng cho chuyên đề {chapter.title}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5">Thời gian</span>
                  <strong className="text-sm font-bold text-slate-800">45 phút</strong>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Số câu hỏi</span>
                  <strong className="text-sm font-bold text-slate-800">15 câu</strong>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Thang điểm</span>
                  <strong className="text-sm font-bold text-orange-600">10.0 điểm</strong>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onStartExam) onStartExam();
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>BẮT ĐẦU LÀM BÀI KIỂM TRA 45 PHÚT</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. MODAL FOOTER */}
        {/* ========================================================================= */}
        <div className="bg-white border-t border-slate-200/90 p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate max-w-[280px] sm:max-w-none">
            Chương {chapter.number}: <strong className="text-slate-700">{chapter.shortTitle || chapter.title}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
          >
            Đóng phòng học
          </button>
        </div>
      </div>
    </div>
  );
}
