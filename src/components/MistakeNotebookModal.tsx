"use client";

import React, { useState } from "react";
import { X, BookX, CheckCircle, RefreshCw } from "lucide-react";
import { MistakeItem } from "@/types/learning";
import { MISTAKE_NOTEBOOK_ITEMS } from "@/data/chaptersData";
import { toggleResolveMistake } from "@/services/storageService";
import MathRenderer from "./MathRenderer";

interface MistakeNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakesList?: MistakeItem[];
  onReTestItem?: (item: MistakeItem) => void;
}

export default function MistakeNotebookModal({
  isOpen,
  onClose,
  mistakesList = MISTAKE_NOTEBOOK_ITEMS,
}: MistakeNotebookModalProps) {
  const [localOverrides, setLocalOverrides] = useState<Record<string, boolean>>({});
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [retryAnswerInput, setRetryAnswerInput] = useState<Record<string, string>>({});
  const [retryResult, setRetryResult] = useState<Record<string, "CORRECT" | "WRONG">>({});

  if (!isOpen) return null;

  const items = mistakesList.map((item) => ({
    ...item,
    resolved: localOverrides[item.id] !== undefined ? localOverrides[item.id] : item.resolved,
  }));

  const tags = ["ALL", "Nhầm công thức", "Sai tính toán", "Đọc sót giả thiết", "Bẫy điều kiện xác định"];

  const filteredItems = items.filter((item) => {
    if (selectedTag === "ALL") return true;
    return item.tag === selectedTag;
  });

  const toggleResolved = (id: string) => {
    toggleResolveMistake(id);
    setLocalOverrides((prev) => {
      const currentVal = prev[id] !== undefined ? prev[id] : mistakesList.find((m) => m.id === id)?.resolved;
      return { ...prev, [id]: !currentVal };
    });
  };

  const handleRetrySubmit = (item: MistakeItem) => {
    const input = (retryAnswerInput[item.id] || "").trim().toLowerCase().replace(/\./g, ",");
    const target = item.correctAnswer.trim().toLowerCase().replace(/\./g, ",");

    if (input === target || target.includes(input)) {
      setRetryResult((prev) => ({ ...prev, [item.id]: "CORRECT" }));
      toggleResolved(item.id);
    } else {
      setRetryResult((prev) => ({ ...prev, [item.id]: "WRONG" }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-rose-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center justify-center">
              <BookX className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Sổ Tay Lỗi Sai Tự Động (Mistake Notebook)</h3>
              <p className="text-xs text-rose-200">
                Tự động gom câu làm sai trong lúc Ôn luyện chương & Thi thử • Hỗ trợ bấm &quot;Làm lại câu sai&quot;
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter tags bar */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedTag === tag
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tag === "ALL" ? "Tất cả lỗi sai" : tag}
            </button>
          ))}
        </div>

        {/* List of mistakes */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-14 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2.5 opacity-80" />
              <p className="text-sm font-bold text-slate-700">Chưa ghi nhận lỗi sai nào</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                Khi bạn làm đề thi thử hoặc luyện tập các câu hỏi và chọn phương án chưa chính xác, hệ thống sẽ tự động lưu lại vào đây để bạn rèn luyện và làm lại.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const res = retryResult[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.resolved
                      ? "bg-emerald-50/30 border-emerald-200"
                      : "bg-white border-slate-200 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.chapterTitle} • {item.topic}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleResolved(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          item.resolved
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{item.resolved ? "Đã khắc phục" : "Chưa thuộc"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-slate-800 font-medium my-2">
                    <MathRenderer text={item.problem} />
                  </div>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-900">
                      <span className="text-rose-600 font-bold block">Bạn đã chọn/nhập sai:</span>
                      <span className="font-semibold">{item.studentAnswer}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900">
                      <span className="text-emerald-600 font-bold block">Đáp án chuẩn:</span>
                      <span className="font-semibold">{item.correctAnswer}</span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 mb-3">
                    <strong className="text-slate-900 block mb-1">💡 Hướng dẫn khắc phục lỗi:</strong>
                    <MathRenderer text={item.explanation} />
                  </div>

                  {/* Feature: "Làm lại câu sai" right here! */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
                      Làm lại câu này:
                    </span>
                    <input
                      type="text"
                      placeholder="Nhập đáp án..."
                      value={retryAnswerInput[item.id] || ""}
                      onChange={(e) =>
                        setRetryAnswerInput((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="px-2.5 py-1 rounded-lg border border-slate-300 font-bold text-xs w-36"
                    />
                    <button
                      onClick={() => handleRetrySubmit(item)}
                      className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer"
                    >
                      Kiểm tra
                    </button>

                    {res === "CORRECT" && (
                      <span className="text-emerald-600 font-bold">✓ Chuẩn xác! Đã đánh dấu hoàn thành.</span>
                    )}
                    {res === "WRONG" && (
                      <span className="text-rose-600 font-bold">✗ Vẫn chưa chính xác, hãy xem lại lời giải!</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <span>Tổng số lỗi trong sổ tay: {items.length} câu</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 cursor-pointer"
          >
            Đóng sổ tay
          </button>
        </div>
      </div>
    </div>
  );
}
