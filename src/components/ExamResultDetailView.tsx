/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo } from "react";
import {
  Award,
  Clock,
  RotateCcw,
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  Printer,
  ChevronRight,
  FolderKanban,
  BookmarkPlus,
  Check,
  BookOpen,
} from "lucide-react";
import { ExamData, ExamResult, ExamUserAnswers } from "@/types/exam";
import { getExamScoreStructure, isAnswerMatching } from "@/utils/scoring";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion";
import MathRenderer from "./MathRenderer";
import { MistakeItem } from "@/types/learning";

interface ExamResultDetailViewProps {
  exam: ExamData;
  result: ExamResult;
  answers: ExamUserAnswers;
  onRetakeExam: () => void;
  onViewRadarAnalytics: () => void;
  onOpenExamManager: () => void;
  onAddMistake?: (mistake: MistakeItem) => void;
}

export default function ExamResultDetailView({
  exam,
  result,
  answers,
  onRetakeExam,
  onViewRadarAnalytics,
  onOpenExamManager,
  onAddMistake,
}: ExamResultDetailViewProps) {
  const [filterType, setFilterType] = useState<"ALL" | "WRONG" | "CORRECT">("ALL");
  const [sectionFilter, setSectionFilter] = useState<"ALL" | "PART_1" | "PART_2" | "PART_3" | "PART_4">("ALL");
  const [savedMistakesMap, setSavedMistakesMap] = useState<Record<string, boolean>>({});

  const scoreStructure = useMemo(() => getExamScoreStructure(exam), [exam]);

  // Evaluate correctness for each question in Part 1
  const part1Status = useMemo(() => {
    return exam.part1.map((q) => {
      const userAns = answers.part1[q.id];
      const isAnswered = Boolean(userAns);
      const isCorrect = userAns === q.correctAnswer;
      return {
        id: q.id,
        number: q.number,
        userAns: userAns || "—",
        correctAns: q.correctAnswer,
        isAnswered,
        isCorrect,
        topic: q.topic,
        chapterName: q.chapterName,
      };
    });
  }, [exam.part1, answers.part1]);

  // Evaluate correctness for each question in Part 2
  const part2Status = useMemo(() => {
    return exam.part2.map((q) => {
      const subAns = answers.part2[q.id] || { a: undefined, b: undefined, c: undefined, d: undefined };
      let correctCount = 0;
      let answeredCount = 0;
      const statementDetails = q.statements.map((stmt) => {
        const userVal = subAns[stmt.key];
        const isAns = userVal !== undefined;
        if (isAns) answeredCount++;
        const isRight = userVal === stmt.correct;
        if (isRight) correctCount++;
        return {
          key: stmt.key,
          userVal,
          correctVal: stmt.correct,
          isRight,
        };
      });

      const isFullyCorrect = correctCount === 4;
      const isPartiallyCorrect = correctCount > 0 && correctCount < 4;
      const isWrong = correctCount === 0;

      return {
        id: q.id,
        number: q.number,
        statementDetails,
        correctCount,
        answeredCount,
        isFullyCorrect,
        isPartiallyCorrect,
        isWrong,
        topic: q.topic,
        chapterName: q.chapterName,
      };
    });
  }, [exam.part2, answers.part2]);

  // Evaluate correctness for each question in Part 3
  const part3Status = useMemo(() => {
    return exam.part3.map((q) => {
      const rawUserAns = (answers.part3[q.id] || "").trim();
      const isAnswered = rawUserAns.length > 0;
      const isCorrect = isAnswerMatching(rawUserAns, q.correctAnswer, q.acceptableAnswers);

      return {
        id: q.id,
        number: q.number,
        userAns: isAnswered ? rawUserAns : "—",
        correctAns: q.correctAnswer,
        isAnswered,
        isCorrect,
        isEssay: Boolean(q.isEssay),
        topic: q.topic,
        chapterName: q.chapterName,
      };
    });
  }, [exam.part3, answers.part3]);

  // Analyze Part 4 questions (Tự luận)
  const part4Status = useMemo(() => {
    if (!exam.part4 || exam.part4.length === 0) return [];
    return exam.part4.map((q) => {
      const rawUserAns = answers.part4?.[q.id] || "";
      const isAnswered = Boolean(rawUserAns.trim());
      const isCorrect = isAnswerMatching(rawUserAns, q.correctAnswer, q.acceptableAnswers);

      return {
        id: q.id,
        number: q.number,
        userAns: isAnswered ? rawUserAns : "—",
        correctAns: q.correctAnswer,
        isAnswered,
        isCorrect,
        isEssay: true,
        topic: q.topic,
        chapterName: q.chapterName,
      };
    });
  }, [exam.part4, answers.part4]);

  // Total summary counts
  const totalQuestions =
    exam.part1.length + exam.part2.length + exam.part3.length + (exam.part4?.length || 0);
  const correctCountP1 = part1Status.filter((q) => q.isCorrect).length;
  const wrongCountP1 = part1Status.filter((q) => q.isAnswered && !q.isCorrect).length;
  const unansCountP1 = part1Status.filter((q) => !q.isAnswered).length;

  const correctCountP2 = part2Status.filter((q) => q.isFullyCorrect).length;
  const partialCountP2 = part2Status.filter((q) => q.isPartiallyCorrect).length;
  const wrongCountP2 = part2Status.filter((q) => q.isWrong).length;

  const correctCountP3 = part3Status.filter((q) => q.isCorrect).length;
  const wrongCountP3 = part3Status.filter((q) => q.isAnswered && !q.isCorrect).length;
  const unansCountP3 = part3Status.filter((q) => !q.isAnswered).length;

  const correctCountP4 = part4Status.filter((q) => q.isCorrect).length;
  const wrongCountP4 = part4Status.filter((q) => q.isAnswered && !q.isCorrect).length;
  const unansCountP4 = part4Status.filter((q) => !q.isAnswered).length;

  const totalCorrect = correctCountP1 + correctCountP2 + correctCountP3 + correctCountP4;
  const totalWrong = wrongCountP1 + wrongCountP2 + wrongCountP3 + wrongCountP4;
  const totalUnanswered = unansCountP1 + unansCountP3 + unansCountP4;

  // Smooth scroll helper
  const scrollToQuestion = (elemId: string) => {
    const el = document.getElementById(elemId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Add mistake helper
  const handleSaveToNotebook = (qKey: string, mistake: MistakeItem) => {
    if (onAddMistake) {
      onAddMistake(mistake);
      setSavedMistakesMap((prev) => ({ ...prev, [qKey]: true }));
    }
  };

  // Print helper
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Filter logic for displaying questions
  const filteredPart1 = useMemo(() => {
    if (sectionFilter !== "ALL" && sectionFilter !== "PART_1") return [];
    return exam.part1.filter((q) => {
      const isCorrect = answers.part1[q.id] === q.correctAnswer;
      if (filterType === "CORRECT") return isCorrect;
      if (filterType === "WRONG") return !isCorrect;
      return true;
    });
  }, [exam.part1, answers.part1, filterType, sectionFilter]);

  const filteredPart2 = useMemo(() => {
    if (sectionFilter !== "ALL" && sectionFilter !== "PART_2") return [];
    return exam.part2.filter((q) => {
      const subAns = answers.part2[q.id] || { a: undefined, b: undefined, c: undefined, d: undefined };
      const correctCount = q.statements.filter((s) => subAns[s.key] === s.correct).length;
      if (filterType === "CORRECT") return correctCount === 4;
      if (filterType === "WRONG") return correctCount < 4;
      return true;
    });
  }, [exam.part2, answers.part2, filterType, sectionFilter]);

  const filteredPart3 = useMemo(() => {
    if (sectionFilter !== "ALL" && sectionFilter !== "PART_3") return [];
    return exam.part3.filter((q) => {
      const isCorrect = isAnswerMatching(answers.part3[q.id], q.correctAnswer, q.acceptableAnswers);
      if (filterType === "CORRECT") return isCorrect;
      if (filterType === "WRONG") return !isCorrect;
      return true;
    });
  }, [exam.part3, answers.part3, filterType, sectionFilter]);

  const filteredPart4 = useMemo(() => {
    if (!exam.part4 || exam.part4.length === 0) return [];
    if (sectionFilter !== "ALL" && sectionFilter !== "PART_4") return [];
    return exam.part4.filter((q) => {
      const isCorrect = isAnswerMatching(answers.part4?.[q.id], q.correctAnswer, q.acceptableAnswers);
      if (filterType === "CORRECT") return isCorrect;
      if (filterType === "WRONG") return !isCorrect;
      return true;
    });
  }, [exam.part4, answers.part4, filterType, sectionFilter]);

  // Score rank styling
  const scoreBadgeColor =
    result.totalScore >= 8.5
      ? "from-emerald-500 to-teal-600 text-white"
      : result.totalScore >= 7.0
      ? "from-blue-600 to-indigo-600 text-white"
      : result.totalScore >= 5.0
      ? "from-amber-500 to-orange-600 text-white"
      : "from-rose-500 to-pink-600 text-white";

  const rankLabel =
    result.totalScore >= 8.5
      ? "Xuất sắc"
      : result.totalScore >= 7.0
      ? "Khá - Giỏi"
      : result.totalScore >= 5.0
      ? "Trung bình khá"
      : "Cần cải thiện";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* TOP FLOATING / STICKY ACTION BAR */}
      {/* ========================================================================= */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider">
              ✓ Đã chấm điểm tự động
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Nộp lúc: {result.submittedAt}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {exam.title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="In đề thi và toàn bộ lời giải chi tiết (hoặc lưu PDF)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In lời giải</span>
          </button>

          <button
            onClick={onViewRadarAnalytics}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Xem biểu đồ Radar phân tích 6 chương và lỗ hổng kiến thức"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Radar Năng Lực</span>
          </button>

          <button
            onClick={onOpenExamManager}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Mở kho đề để chọn đề thi khác"
          >
            <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
            <span>Kho Đề Thi</span>
          </button>

          <button
            onClick={onRetakeExam}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="Xóa kết quả này và bắt đầu thi lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại đề</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO SCORE & PERFORMANCE SUMMARY CARD */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Decorative blur rings */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>BẢNG KẾT QUẢ VÀ LỜI GIẢI CHI TIẾT CHUẨN BỘ GD&ĐT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kết Quả Bài Thi Toán 12
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dưới đây là bảng đối chiếu đáp án nhanh và hướng dẫn giải chi tiết từng bước cho toàn bộ {totalQuestions} câu hỏi của đề thi. Hãy rà soát kĩ các câu làm sai để củng cố ngay.
            </p>
          </div>

          {/* Big Score Box */}
          <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/20 flex items-center gap-5 shrink-0 self-start lg:self-auto">
            <div>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest block mb-1">
                TỔNG ĐIỂM
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                {result.totalScore.toFixed(2)}
                <span className="text-lg sm:text-xl text-slate-400 font-sans font-normal"> / 10.0</span>
              </div>
            </div>

            <div className="pl-5 border-l border-white/20 flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 block mb-1">Xếp loại</span>
              <span
                className={`text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl bg-gradient-to-r ${scoreBadgeColor} shadow-xs whitespace-nowrap`}
              >
                {rankLabel}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">Thời gian hoàn thành</span>
            <div className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                {Math.floor(result.timeSpentSeconds / 60)}p {result.timeSpentSeconds % 60}s
              </span>
            </div>
          </div>

          <div className="bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-300 block mb-0.5">Số câu làm đúng</span>
            <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{totalCorrect} câu</span>
            </div>
          </div>

          <div className="bg-rose-500/10 p-3.5 rounded-2xl border border-rose-500/20">
            <span className="text-[11px] text-rose-300 block mb-0.5">Số câu làm sai</span>
            <div className="text-base sm:text-lg font-bold text-rose-400 font-mono flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{totalWrong} câu</span>
            </div>
          </div>

          <div className="bg-slate-500/10 p-3.5 rounded-2xl border border-slate-500/20">
            <span className="text-[11px] text-slate-300 block mb-0.5">Chưa điền đáp án</span>
            <div className="text-base sm:text-lg font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{totalUnanswered} câu</span>
            </div>
          </div>
        </div>

        {/* Section Breakdown Bars */}
        <div className={`grid grid-cols-1 ${exam.part4 && exam.part4.length > 0 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"} gap-3 mt-4`}>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center justify-between text-slate-300 mb-1">
              <span>Phần I (4 lựa chọn):</span>
              <strong className="text-white font-mono">{result.scorePart1.toFixed(2)} / {scoreStructure.part1Score.toFixed(1)}đ</strong>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${scoreStructure.part1Score > 0 ? (result.scorePart1 / scoreStructure.part1Score) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center justify-between text-slate-300 mb-1">
              <span>Phần II (Đúng / Sai):</span>
              <strong className="text-white font-mono">{result.scorePart2.toFixed(2)} / {scoreStructure.part2Score.toFixed(1)}đ</strong>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${scoreStructure.part2Score > 0 ? (result.scorePart2 / scoreStructure.part2Score) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center justify-between text-slate-300 mb-1">
              <span>Phần III (Trả lời ngắn):</span>
              <strong className="text-white font-mono">{result.scorePart3.toFixed(2)} / {scoreStructure.part3Score.toFixed(1)}đ</strong>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${scoreStructure.part3Score > 0 ? (result.scorePart3 / scoreStructure.part3Score) * 100 : 0}%` }}
              />
            </div>
          </div>

          {exam.part4 && exam.part4.length > 0 && (
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span>Phần IV (Tự luận):</span>
                <strong className="text-white font-mono">{(result.scorePart4 || 0).toFixed(2)} / {(scoreStructure.part4Score || 1.0).toFixed(1)}đ</strong>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${(scoreStructure.part4Score || 1.0) > 0 ? ((result.scorePart4 || 0) / (scoreStructure.part4Score || 1.0)) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK ANSWER MATRIX (BẢNG TRA CỨU ĐỐI CHIẾU ĐÁP ÁN TOÀN BỘ ĐỀ THI) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Bảng Đối Chiếu Nhanh Đáp Án Toàn Bộ Đề Thi
            </h3>
            <p className="text-xs text-slate-500">
              Nhấn vào bất kỳ câu nào để cuộn mượt xuống xem ngay đề bài và lời giải chi tiết
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Đúng
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              Sai
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
              Chưa làm
            </span>
          </div>
        </div>

        {/* Matrix Grid: Part 1, Part 2, Part 3 */}
        <div className="space-y-4">
          {/* Part 1 Matrix */}
          {part1Status.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                <span>Phần I: 4 Lựa chọn ({part1Status.length} câu)</span>
                <span className="text-slate-400 font-normal">
                  Đúng {correctCountP1}/{part1Status.length} câu
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                {part1Status.map((q) => {
                  const cardBg = q.isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                    : q.isAnswered
                    ? "bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100";

                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p1-${q.id}`)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer shadow-2xs ${cardBg}`}
                      title={`Câu ${q.number}: Bạn chọn [${q.userAns}], Đáp án đúng là [${q.correctAns}]`}
                    >
                      <span className="block text-[11px] font-bold">Câu {q.number}</span>
                      <span className="block text-xs font-black font-mono mt-0.5">
                        {q.userAns}
                        {q.isCorrect ? (
                          <span className="text-emerald-600 text-[10px] ml-0.5">✓</span>
                        ) : (
                          <span className="text-rose-500 text-[10px] ml-0.5">({q.correctAns})</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Part 2 Matrix */}
          {part2Status.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                <span>Phần II: Đúng / Sai ({part2Status.length} câu)</span>
                <span className="text-slate-400 font-normal">
                  Đúng hoàn toàn {correctCountP2}/{part2Status.length} câu
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {part2Status.map((q) => {
                  const badgeColor = q.isFullyCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : q.isPartiallyCorrect
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-rose-50 border-rose-300 text-rose-900";

                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p2-${q.id}`)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-2xs ${badgeColor} hover:shadow-xs`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong className="text-xs font-bold">Câu {q.number} (Đ/S)</strong>
                        <span className="text-[11px] font-mono font-bold">
                          {q.correctCount}/4 ý đúng
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-[10px] font-mono font-bold">
                        {q.statementDetails.map((st) => (
                          <span
                            key={st.key}
                            className={`py-0.5 text-center rounded ${
                              st.isRight
                                ? "bg-emerald-500 text-white"
                                : st.userVal !== undefined
                                ? "bg-rose-500 text-white"
                                : "bg-slate-200 text-slate-600"
                            }`}
                            title={`Ý ${st.key}: Bạn chọn [${st.userVal === true ? "Đúng" : st.userVal === false ? "Sai" : "Chưa làm"}], Đ/A: [${st.correctVal ? "Đúng" : "Sai"}]`}
                          >
                            {st.key.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Part 3 Matrix */}
          {part3Status.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                <span>Phần III: Trả lời ngắn ({part3Status.length} câu)</span>
                <span className="text-slate-400 font-normal">
                  Đúng {correctCountP3}/{part3Status.length} câu
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2">
                {part3Status.map((q) => {
                  const cardBg = q.isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                    : q.isAnswered
                    ? "bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100";

                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p3-${q.id}`)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer shadow-2xs ${cardBg}`}
                      title={`Câu ${q.number}: Bạn nhập [${q.userAns}], Đáp án: [${q.correctAns}]`}
                    >
                      <span className="block text-[11px] font-bold">
                        Câu {q.number}
                      </span>
                      <span className="block text-xs font-black font-mono truncate mt-0.5">
                        {q.isCorrect ? (
                          <span className="text-emerald-700">{q.correctAns} ✓</span>
                        ) : (
                          <span className="text-rose-600">Đ/A: {q.correctAns}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Part 4 Matrix (Tự luận) */}
          {part4Status.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                <span>Phần IV: Tự luận ({part4Status.length} câu)</span>
                <span className="text-slate-400 font-normal">
                  Đúng {correctCountP4}/{part4Status.length} câu
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {part4Status.map((q) => {
                  const cardBg = q.isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                    : q.isAnswered
                    ? "bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100";

                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p4-${q.id}`)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-2xs ${cardBg}`}
                      title={`Câu ${q.number} (Tự luận): Bạn nhập [${q.userAns}], Đáp án: [${q.correctAns}]`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-xs font-bold">Câu {q.number} (Tự luận)</strong>
                        <span className="text-[11px] font-mono font-bold">
                          {q.isCorrect ? "✓ Đạt 0.5đ" : q.isAnswered ? "✗ 0.0đ" : "Chưa làm"}
                        </span>
                      </div>
                      <span className="block text-xs font-mono truncate">
                        {q.isCorrect ? (
                          <span className="text-emerald-700 font-bold">{q.correctAns} ✓</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">Đáp số chuẩn: {q.correctAns}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER CONTROLS BAR */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Bộ lọc:
          </span>
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              filterType === "ALL"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Tất cả ({totalQuestions} câu)
          </button>
          <button
            onClick={() => setFilterType("WRONG")}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
              filterType === "WRONG"
                ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                : "bg-white text-rose-700 border-rose-200 hover:bg-rose-50"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Chỉ xem câu làm sai ({totalWrong})</span>
          </button>
          <button
            onClick={() => setFilterType("CORRECT")}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
              filterType === "CORRECT"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Câu làm đúng ({totalCorrect})</span>
          </button>
        </div>

        {/* Section Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold shrink-0">
          <button
            onClick={() => setSectionFilter("ALL")}
            className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              sectionFilter === "ALL"
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"
            }`}
          >
            Toàn bộ đề
          </button>
          {exam.part1.length > 0 && (
            <button
              onClick={() => setSectionFilter("PART_1")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                sectionFilter === "PART_1"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
              }`}
            >
              Phần I ({exam.part1.length} câu)
            </button>
          )}
          {exam.part2.length > 0 && (
            <button
              onClick={() => setSectionFilter("PART_2")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                sectionFilter === "PART_2"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
              }`}
            >
              Phần II ({exam.part2.length} câu)
            </button>
          )}
          {exam.part3.length > 0 && (
            <button
              onClick={() => setSectionFilter("PART_3")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                sectionFilter === "PART_3"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
              }`}
            >
              Phần III ({exam.part3.length} câu)
            </button>
          )}
          {exam.part4 && exam.part4.length > 0 && (
            <button
              onClick={() => setSectionFilter("PART_4")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                sectionFilter === "PART_4"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
              }`}
            >
              Phần IV: Tự luận ({exam.part4.length} câu)
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN MAIN REVIEW LAYOUT: LEFT 75% QUESTIONS, RIGHT 25% STICKY JUMP */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8-9 cols: Detailed Question Solution Cards */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* ==================== PHẦN I ==================== */}
          {filteredPart1.length > 0 && (
            <section className="space-y-4">
              <div className="bg-blue-900 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">
                    PHẦN I: CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN
                  </h3>
                  <span className="text-[11px] text-blue-200">
                    Mỗi câu hỏi thí sinh chọn một phương án duy nhất.
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-full">
                  {scoreStructure.part1Score.toFixed(1)} Điểm
                </span>
              </div>

              <div className="space-y-4">
                {filteredPart1.map((q) => {
                  const isCorrect = answers.part1[q.id] === q.correctAnswer;
                  const isSaved = savedMistakesMap[`p1-${q.id}`];

                  return (
                    <div key={q.id} className="relative group">
                      <SingleChoiceQuestion
                        question={q}
                        userAnswer={answers.part1[q.id]}
                        onAnswerChange={() => {}}
                        onToggleFlag={() => {}}
                        isReviewMode={true}
                      />

                      {/* Save to Mistake Notebook button for incorrect answers */}
                      {!isCorrect && onAddMistake && (
                        <div className="mt-2 flex justify-end">
                          <button
                            disabled={isSaved}
                            onClick={() =>
                              handleSaveToNotebook(`p1-${q.id}`, {
                                id: `mistake-p1-${q.id}-${Date.now()}`,
                                source: "MOCK_EXAM",
                                questionNumber: q.number,
                                part: 1,
                                chapterId: q.chapterId,
                                chapterTitle: q.chapterName,
                                topic: q.topic,
                                problem: q.content,
                                studentAnswer: answers.part1[q.id] || "Chưa chọn",
                                correctAnswer: q.correctAnswer,
                                explanation: q.explanation,
                                tag: "Sai tính toán",
                                reviewCount: 0,
                                resolved: false,
                                date: new Date().toLocaleDateString("vi-VN"),
                              })
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isSaved
                                ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
                                : "bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Đã lưu vào Sổ tay câu sai</span>
                              </>
                            ) : (
                              <>
                                <BookmarkPlus className="w-3.5 h-3.5" />
                                <span>Lưu câu sai vào Sổ tay để luyện lại</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ==================== PHẦN II ==================== */}
          {filteredPart2.length > 0 && (
            <section className="space-y-4 pt-4">
              <div className="bg-indigo-950 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">
                    PHẦN II: CÂU TRẮC NGHIỆM ĐÚNG / SAI
                  </h3>
                  <span className="text-[11px] text-indigo-200">
                    Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai. Chấm điểm lũy tiến.
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-full">
                  {scoreStructure.part2Score.toFixed(1)} Điểm
                </span>
              </div>

              <div className="space-y-4">
                {filteredPart2.map((q) => {
                  return (
                    <div key={q.id}>
                      <TrueFalseQuestion
                        question={q}
                        userAnswer={answers.part2[q.id]}
                        onAnswerChange={() => {}}
                        onToggleFlag={() => {}}
                        isReviewMode={true}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ==================== PHẦN III ==================== */}
          {filteredPart3.length > 0 && (
            <section className="space-y-4 pt-4">
              <div className="bg-emerald-950 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">
                    PHẦN III: CÂU HỎI TRẢ LỜI NGẮN
                  </h3>
                  <span className="text-[11px] text-emerald-200">
                    Điền kết quả chính xác dưới dạng số thập phân, phân số hoặc số nguyên.
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-full">
                  {scoreStructure.part3Score.toFixed(1)} Điểm
                </span>
              </div>

              <div className="space-y-4">
                {filteredPart3.map((q) => {
                  return (
                    <div key={q.id}>
                      <ShortAnswerQuestion
                        question={q}
                        userAnswer={answers.part3[q.id]}
                        onAnswerChange={() => {}}
                        onToggleFlag={() => {}}
                        isReviewMode={true}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ==================== PHẦN IV ==================== */}
          {filteredPart4.length > 0 && (
            <section className="space-y-4 pt-4">
              <div className="bg-purple-950 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">
                    PHẦN IV: BÀI TOÁN TỰ LUẬN
                  </h3>
                  <span className="text-[11px] text-purple-200">
                    Khảo sát sự biến thiên và vẽ đồ thị hàm số / Bài toán ứng dụng thực tế tối ưu hóa (Trình bày chi tiết từng bước).
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-full">
                  {(scoreStructure.part4Score || 1.0).toFixed(1)} Điểm
                </span>
              </div>

              <div className="space-y-4">
                {filteredPart4.map((q) => {
                  const userAns = (answers.part4?.[q.id] || "").trim().replace(/\./g, ",");
                  const correct = q.correctAnswer.trim().replace(/\./g, ",");
                  const isCorrect =
                    userAns === correct ||
                    Boolean(q.acceptableAnswers?.some((acc) => acc.trim().replace(/\./g, ",") === userAns));
                  const isSaved = savedMistakesMap[`p4-${q.id}`];

                  return (
                    <div key={q.id} className="relative group">
                      <ShortAnswerQuestion
                        question={q}
                        userAnswer={answers.part4?.[q.id]}
                        onAnswerChange={() => {}}
                        onToggleFlag={() => {}}
                        isReviewMode={true}
                      />

                      {!isCorrect && onAddMistake && (
                        <div className="mt-2 flex justify-end">
                          <button
                            disabled={isSaved}
                            onClick={() =>
                              handleSaveToNotebook(`p4-${q.id}`, {
                                id: `mistake-p4-${q.id}-${Date.now()}`,
                                source: "MOCK_EXAM",
                                questionNumber: q.number,
                                part: 4,
                                chapterId: q.chapterId,
                                chapterTitle: q.chapterName,
                                topic: q.topic,
                                problem: q.content,
                                studentAnswer: answers.part4?.[q.id] || "Chưa nhập",
                                correctAnswer: q.correctAnswer,
                                explanation: q.explanation,
                                tag: "Sai tính toán",
                                reviewCount: 0,
                                resolved: false,
                                date: new Date().toLocaleDateString("vi-VN"),
                              })
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isSaved
                                ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
                                : "bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Đã lưu vào Sổ tay câu sai</span>
                              </>
                            ) : (
                              <>
                                <BookmarkPlus className="w-3.5 h-3.5" />
                                <span>Lưu câu sai vào Sổ tay để luyện lại</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Empty state if all filtered out */}
          {filteredPart1.length === 0 && filteredPart2.length === 0 && filteredPart3.length === 0 && filteredPart4.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Không tìm thấy câu hỏi nào phù hợp với bộ lọc
              </h4>
              <p className="text-xs text-slate-500">
                Hãy chuyển bộ lọc sang &quot;Tất cả câu hỏi&quot; để xem toàn bộ nội dung đề thi.
              </p>
              <button
                onClick={() => {
                  setFilterType("ALL");
                  setSectionFilter("ALL");
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

          {/* Bottom Action Cards */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-blue-950">
                Bạn muốn luyện tập thêm để cải thiện điểm số?
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                Hệ thống có kho đề thi thử tốt nghiệp, đề các sở giáo dục và bộ 10 đề thi giữa kì chọn lọc.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onRetakeExam}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-orange-500 text-slate-800 hover:text-orange-600 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                Làm lại đề này
              </button>
              <button
                onClick={onOpenExamManager}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Kho Đề Thi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 3-4 cols: Sticky Quick-Jump Sidebar Navigator */}
        <div className="hidden lg:block lg:col-span-3 sticky top-36 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Mục Lục Câu Hỏi
              </h4>
              <span className="text-[11px] font-bold text-slate-500 font-mono">
                {totalCorrect}/{totalQuestions} câu
              </span>
            </div>

            {/* Part 1 Links */}
            {part1Status.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Phần I ({part1Status.length} câu)
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {part1Status.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p1-${q.id}`)}
                      className={`h-8 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        q.isCorrect
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : q.isAnswered
                          ? "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={`Câu ${q.number}: ${q.isCorrect ? "Đúng" : "Sai"}`}
                    >
                      {q.number}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Part 2 Links */}
            {part2Status.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Phần II (Đúng/Sai)
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {part2Status.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p2-${q.id}`)}
                      className={`h-8 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        q.isFullyCorrect
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : q.isPartiallyCorrect
                          ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                          : "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"
                      }`}
                      title={`Câu ${q.number}: ${q.correctCount}/4 ý đúng`}
                    >
                      {q.number}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Part 3 Links */}
            {part3Status.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Phần III (Trả lời ngắn)
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {part3Status.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p3-${q.id}`)}
                      className={`h-8 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        q.isCorrect
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : q.isAnswered
                          ? "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={`Câu ${q.number}: ${q.isCorrect ? "Đúng" : "Sai"}`}
                    >
                      {q.number}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Part 4 Links (Tự luận) */}
            {part4Status.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Phần IV (Tự luận)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {part4Status.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(`p4-${q.id}`)}
                      className={`h-8 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        q.isCorrect
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : q.isAnswered
                          ? "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={`Câu ${q.number} (Tự luận): ${q.isCorrect ? "Đúng" : "Sai"}`}
                    >
                      TL {q.number}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={onViewRadarAnalytics}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Xem Radar Năng Lực</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

