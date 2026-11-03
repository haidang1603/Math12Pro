"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { ShortAnswerQuestionData } from "@/types/exam";
import MathRenderer from "./MathRenderer";

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuestionData;
  userAnswer?: string;
  onAnswerChange: (value: string) => void;
  isFlagged?: boolean;
  onToggleFlag: () => void;
  isReviewMode?: boolean;
}

export default function ShortAnswerQuestion({
  question,
  userAnswer = "",
  onAnswerChange,
  isFlagged = false,
  onToggleFlag,
  isReviewMode = false,
}: ShortAnswerQuestionProps) {
  // Enforce validation: max 4 chars, only digits, minus sign '-', and comma ','
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\./g, ","); // convert dot to comma
    // Filter out invalid characters
    val = val.replace(/[^0-9,-]/g, "");

    // Minus can only be at index 0
    if (val.indexOf("-") > 0) {
      val = val[0] + val.slice(1).replace(/-/g, "");
    }

    // Only one comma allowed
    const commaIndex = val.indexOf(",");
    if (commaIndex !== -1) {
      val = val.slice(0, commaIndex + 1) + val.slice(commaIndex + 1).replace(/,/g, "");
    }

    // Limit to 4 characters
    if (val.length <= 4) {
      onAnswerChange(val);
    }
  };

  const handleInsertChar = (char: string) => {
    if (userAnswer.length >= 4) return;
    if (char === "-" && userAnswer.length > 0) return;
    if (char === "," && userAnswer.includes(",")) return;
    onAnswerChange(userAnswer + char);
  };

  const handleBackspace = () => {
    onAnswerChange(userAnswer.slice(0, -1));
  };

  // Review status
  const cleanUserAns = (userAnswer || "").trim().toLowerCase().replace(/\./g, ",");
  const cleanCorrect = question.correctAnswer.trim().toLowerCase().replace(/\./g, ",");
  const isMatch =
    cleanUserAns === cleanCorrect ||
    (question.acceptableAnswers &&
      question.acceptableAnswers.some((ans) => ans.trim().toLowerCase().replace(/\./g, ",") === cleanUserAns));

  const isCorrect = isReviewMode && Boolean(cleanUserAns) && isMatch;
  const isWrong = isReviewMode && Boolean(cleanUserAns) && !isMatch;

  return (
    <div
      id={`p${question.part || 3}-${question.id}`}
      className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
        isFlagged ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200/90"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg font-bold text-xs ${
            question.part === 4 ? "bg-purple-50 text-purple-800" : "bg-emerald-50 text-emerald-800"
          }`}>
            Câu {question.number} {question.part === 4 ? "(Tự luận)" : "(Phần III)"}
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            {question.chapterName}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
            question.part === 4
              ? "text-purple-700 bg-purple-50 border-purple-200"
              : "text-emerald-700 bg-emerald-50 border-emerald-200"
          }`}>
            {question.part === 4 || question.isEssay ? `Tự luận (${question.pointWeight || 0.5}đ)` : "Trả lời ngắn"}
          </span>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
            isFlagged
              ? "bg-amber-100 text-amber-800 border border-amber-300"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent"
          }`}
          title="Đánh dấu câu này để xem lại"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? "fill-amber-600 text-amber-600" : ""}`} />
          <span>{isFlagged ? "Đã lưu" : "Xem lại"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="text-slate-800 text-sm md:text-base leading-relaxed mb-5">
        <MathRenderer text={question.content} />
        {question.imageUrl && (
          <div className="my-4 flex justify-center">
            <img
              src={question.imageUrl}
              alt={`Hình minh họa câu ${question.number}`}
              className="max-h-72 rounded-2xl object-contain border border-slate-200/90 shadow-2xs bg-white p-2"
            />
          </div>
        )}
        {!question.imageUrl && question.svgContent && (
          <div
            className="my-4 flex justify-center overflow-x-auto p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 shadow-2xs"
            dangerouslySetInnerHTML={{ __html: question.svgContent }}
          />
        )}
      </div>

      {/* Input Field and Quick Pad */}
      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 max-w-xl">
        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
          {question.isEssay
            ? "Ô nhập bài làm tự luận / đáp số"
            : "Ô nhập đáp án (Tối đa 4 ký tự: số, dấu trừ -, dấu phẩy ,)"}
        </label>

        {question.isEssay ? (
          <div>
            <textarea
              disabled={isReviewMode}
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              rows={3}
              placeholder="Nhập lời giải tóm tắt hoặc đáp số câu tự luận..."
              className="w-full p-3 text-sm font-sans rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs leading-relaxed"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <div className="relative shrink-0">
              <input
                type="text"
                disabled={isReviewMode}
                value={userAnswer}
                onChange={handleInputChange}
                maxLength={4}
                placeholder="VD: 12"
                className={`w-32 sm:w-36 h-11 sm:h-12 text-center text-lg sm:text-xl font-mono font-bold rounded-xl border tracking-widest bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  isReviewMode
                    ? isCorrect
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                      : "border-rose-400 bg-rose-50/50 text-rose-800"
                    : "border-slate-300 text-slate-900"
                }`}
              />
              <span className="absolute right-2.5 bottom-1 text-[10px] text-slate-400 font-mono">
                {userAnswer.length}/4
              </span>
            </div>

            {/* Quick Buttons for special keys */}
            {!isReviewMode && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleInsertChar("-")}
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-base cursor-pointer"
                  title="Dấu âm (-)"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertChar(",")}
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-base cursor-pointer"
                  title="Dấu phẩy thập phân (,)"
                >
                  ,
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="px-2.5 sm:px-3 h-9 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium text-xs hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  title="Xóa ký tự cuối"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-[11px] text-slate-500 mt-2">
          Theo định dạng chuẩn: nếu kết quả là số âm thì dấu trừ đứng trước, số thập phân dùng dấu phẩy (ví dụ: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">-2,5</code> hoặc <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-800">12</code>).
        </p>
      </div>

      {/* Review Mode Explanation */}
      {isReviewMode && (
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-5 rounded-b-2xl">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              {isCorrect ? "✓ Trả lời Đúng (+0.5đ)" : isWrong ? "✗ Trả lời Sai (0đ)" : "Chưa trả lời (0đ)"}
            </span>
            <span className="text-xs text-slate-700">
              Đáp án chính xác:{" "}
              <strong className="text-emerald-700 font-mono text-sm px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                {question.correctAnswer}
              </strong>
            </span>
          </div>

          <div className="text-xs text-slate-700 mt-2">
            <strong className="text-slate-900 block mb-1">Lời giải chi tiết:</strong>
            <MathRenderer text={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}
