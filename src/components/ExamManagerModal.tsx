"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  FolderKanban,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  Search,
} from "lucide-react";
import { ExamData } from "@/types/exam";
import {
  deleteExamById,
  restoreAllHiddenExams,
  clearExamHistory,
  getHiddenExamIds,
} from "@/services/storageService";

interface ExamManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allExams: ExamData[];
  onSelectExam: (exam: ExamData) => void;
  onExamsUpdated: () => void;
}

export default function ExamManagerModal({
  isOpen,
  onClose,
  allExams,
  onSelectExam,
  onExamsUpdated,
}: ExamManagerModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "CUSTOM" | "OFFICIAL">("ALL");
  const [examToDelete, setExamToDelete] = useState<ExamData | null>(null);
  const [notification, setNotification] = useState("");

  if (!isOpen) return null;

  const hiddenIds = getHiddenExamIds();
  const visibleExams = allExams.filter((e) => !hiddenIds.includes(e.id));

  const filteredExams = visibleExams.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.authorName && e.authorName.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchSearch) return false;

    if (filterType === "CUSTOM") return !!e.isCustom;
    if (filterType === "OFFICIAL") return !e.isCustom;
    return true;
  });

  const confirmDelete = () => {
    if (!examToDelete) return;
    deleteExamById(examToDelete.id);
    onExamsUpdated();
    setNotification(`Đã xoá đề thi "${examToDelete.title}" thành công.`);
    setExamToDelete(null);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleRestoreDefaults = () => {
    restoreAllHiddenExams();
    onExamsUpdated();
    setNotification("Đã khôi phục tất cả đề thi mặc định.");
    setTimeout(() => setNotification(""), 2500);
  };

  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá toàn bộ lịch sử các lần thi thử không?")) {
      clearExamHistory();
      setNotification("Đã dọn sạch toàn bộ lịch sử thi thử.");
      setTimeout(() => setNotification(""), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FolderKanban className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Kho Đề Thi & Quản Lý Đề
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {visibleExams.length} Đề thi
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Xem danh sách đề, chọn đề luyện tập hoặc xoá các đề thi không còn dùng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm đề thi..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === "ALL" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Tất cả ({visibleExams.length})
            </button>
            <button
              onClick={() => setFilterType("CUSTOM")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === "CUSTOM" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Tự tạo / Tải lên ({visibleExams.filter((e) => e.isCustom).length})
            </button>
            <button
              onClick={() => setFilterType("OFFICIAL")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === "OFFICIAL" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Đề thi thử & Tốt nghiệp ({visibleExams.filter((e) => !e.isCustom).length})
            </button>
          </div>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Exams List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {filteredExams.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FolderKanban className="w-12 h-12 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-medium">Không tìm thấy đề thi phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">
                Hãy tạo đề thi mới qua tính năng Azota hoặc bấm Tải đề lên
              </p>
            </div>
          ) : (
            filteredExams.map((exam) => {
              const totalQ =
                (exam.part1?.length || 0) +
                (exam.part2?.length || 0) +
                (exam.part3?.length || 0);

              return (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {exam.title}
                      </h3>
                      {exam.isCustom ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Tự tạo Azota
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Chuẩn GDPT 2018
                        </span>
                      )}
                      {exam.authorName && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {exam.authorName}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {exam.durationMinutes} phút
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                        {totalQ} câu hỏi ({exam.part1?.length || 0} P1, {exam.part2?.length || 0} P2, {exam.part3?.length || 0} P3)
                      </span>
                      {exam.createdAt && (
                        <>
                          <span>•</span>
                          <span>Tạo ngày: {exam.createdAt}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectExam(exam);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Luyện tập ngay
                    </button>

                    <button
                      onClick={() => setExamToDelete(exam)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 hover:border-rose-500/30 transition-colors cursor-pointer"
                      title="Xoá đề thi này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <button
              onClick={handleRestoreDefaults}
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Khôi phục đề thi mặc định
            </button>
            <span>•</span>
            <button
              onClick={handleClearHistory}
              className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
            >
              Xoá lịch sử thi thử
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Đóng
          </button>
        </div>

        {/* Delete Confirmation Dialog */}
        {examToDelete && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-sm p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-rose-400">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Xác nhận xoá đề thi?</h3>
                  <p className="text-xs text-slate-400">Thao tác này sẽ xoá đề khỏi danh sách</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                &quot;{examToDelete.title}&quot;
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setExamToDelete(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition-colors"
                >
                  Xoá đề thi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
