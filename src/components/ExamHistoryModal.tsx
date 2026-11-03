"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  Award,
  ChevronRight,
  Calendar,
  FileText,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { ExamAttemptRecord } from "@/types/exam";
import { getExamHistory, clearExamHistory } from "@/services/storageService";

interface ExamHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAttempt: (attempt: ExamAttemptRecord) => void;
}

export default function ExamHistoryModal({
  isOpen,
  onClose,
  onSelectAttempt,
}: ExamHistoryModalProps) {
  const [history, setHistory] = useState<ExamAttemptRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getExamHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử thi thử không?")) {
      clearExamHistory();
      setHistory([]);
    }
  };

  const totalExams = history.length;
  const avgScore =
    totalExams > 0
      ? (history.reduce((sum, h) => sum + h.totalScore, 0) / totalExams).toFixed(2)
      : "0.00";
  const highestScore =
    totalExams > 0 ? Math.max(...history.map((h) => h.totalScore)).toFixed(2) : "0.00";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Lịch Sử Thi Thử</h2>
              <p className="text-xs text-slate-300">
                Theo dõi tiến trình và xem lại chi tiết bài làm các đợt thi thử
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center sm:items-start">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-500" /> Số đề đã thi
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalExams}</span>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center sm:items-start">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Điểm trung bình
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
              {avgScore} <span className="text-xs font-normal text-slate-400">/ 10</span>
            </span>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center sm:items-start">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Điểm cao nhất
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
              {highestScore} <span className="text-xs font-normal text-slate-400">/ 10</span>
            </span>
          </div>
        </div>

        {/* Attempt List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 mx-auto flex items-center justify-center mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Chưa có bài thi nào</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Hãy bắt đầu thử sức với các đề thi thử tại Phòng thi ảo để hệ thống lưu lại lịch sử và phân tích năng lực của bạn.
              </p>
            </div>
          ) : (
            history.map((attempt) => {
              const minutes = Math.floor(attempt.timeSpentSeconds / 60);
              const seconds = attempt.timeSpentSeconds % 60;
              const isHigh = attempt.totalScore >= 8.0;
              const isMedium = attempt.totalScore >= 5.0 && attempt.totalScore < 8.0;

              return (
                <div
                  key={attempt.id}
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 transition-all shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {attempt.examTitle}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          isHigh
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isMedium
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {attempt.totalScore.toFixed(2)} điểm
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {attempt.submittedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {minutes}p {seconds}s
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        P.I: {attempt.scorePart1.toFixed(2)}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        P.II: {attempt.scorePart2.toFixed(2)}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        P.III: {attempt.scorePart3.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAttempt(attempt);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 self-end sm:self-center"
                  >
                    Xem chi tiết bài làm
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handleClear}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa lịch sử
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
