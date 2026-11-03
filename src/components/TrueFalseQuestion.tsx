"use client";

import React from "react";
import { Bookmark, CheckCircle2, XCircle } from "lucide-react";
import { TrueFalseQuestionData } from "@/types/exam";
import MathRenderer from "./MathRenderer";

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionData;
  userAnswer?: Record<"a" | "b" | "c" | "d", boolean | undefined>;
  onAnswerChange: (subKey: "a" | "b" | "c" | "d", value: boolean) => void;
  isFlagged?: boolean;
  onToggleFlag: () => void;
  isReviewMode?: boolean;
}

export default function TrueFalseQuestion({
  question,
  userAnswer = { a: undefined, b: undefined, c: undefined, d: undefined },
  onAnswerChange,
  isFlagged = false,
  onToggleFlag,
  isReviewMode = false,
}: TrueFalseQuestionProps) {
  // Count correct answers for scoring in review mode
  let correctStatementsCount = 0;
  if (isReviewMode) {
    question.statements.forEach((stmt) => {
      if (userAnswer[stmt.key] === stmt.correct) {
        correctStatementsCount++;
      }
    });
  }

  const getPointsForCorrectCount = (cnt: number) => {
    if (cnt === 1) return 0.1;
    if (cnt === 2) return 0.25;
    if (cnt === 3) return 0.5;
    if (cnt === 4) return 1.0;
    return 0.0;
  };

  const pointsEarned = getPointsForCorrectCount(correctStatementsCount);

  return (
    <div
      id={`p2-${question.id}`}
      className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
        isFlagged ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200/90"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold text-xs">
            Câu {question.number} (Phần II)
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            {question.chapterName}
          </span>
          <span className="text-xs text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100 font-medium">
            Đúng / Sai (Tối đa 1.0đ)
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

      {/* Primary Problem Context */}
      <div className="text-slate-800 text-sm md:text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <MathRenderer text={question.context} />
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
            className="my-4 flex justify-center overflow-x-auto p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs"
            dangerouslySetInnerHTML={{ __html: question.svgContent }}
          />
        )}
      </div>

      {/* 4 Statements Table / Grid */}
      <div className="space-y-3">
        {question.statements.map((stmt) => {
          const val = userAnswer[stmt.key];
          const isThisStatementCorrect = isReviewMode && val === stmt.correct;

          return (
            <div
              key={stmt.key}
              className={`p-3.5 rounded-xl border transition-all ${
                isReviewMode
                  ? isThisStatementCorrect
                    ? "bg-emerald-50/40 border-emerald-200"
                    : "bg-rose-50/40 border-rose-200"
                  : val !== undefined
                  ? "bg-white border-blue-200 shadow-2xs"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Statement text with label */}
                <div className="flex items-start gap-2.5 flex-1">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {stmt.key})
                  </span>
                  <div className="text-sm text-slate-800 font-medium leading-relaxed">
                    <MathRenderer text={stmt.text} inline />
                  </div>
                </div>

                {/* True / False Selection Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 pl-8 sm:pl-0">
                  {/* Button Đúng */}
                  <button
                    type="button"
                    disabled={isReviewMode}
                    onClick={() => onAnswerChange(stmt.key, true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isReviewMode
                        ? stmt.correct === true
                          ? "bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-xs font-black cursor-default"
                          : val === true
                          ? "bg-rose-100 text-rose-800 border border-rose-300 line-through cursor-default"
                          : "bg-slate-100 text-slate-400 opacity-60 cursor-default"
                        : val === true
                        ? "bg-blue-600 text-white shadow-xs cursor-pointer"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                    }`}
                  >
                    <span>Đúng</span>
                    {isReviewMode && stmt.correct === true && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Button Sai */}
                  <button
                    type="button"
                    disabled={isReviewMode}
                    onClick={() => onAnswerChange(stmt.key, false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isReviewMode
                        ? stmt.correct === false
                          ? "bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-xs font-black cursor-default"
                          : val === false
                          ? "bg-rose-100 text-rose-800 border border-rose-300 line-through cursor-default"
                          : "bg-slate-100 text-slate-400 opacity-60 cursor-default"
                        : val === false
                        ? "bg-blue-600 text-white shadow-xs cursor-pointer"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                    }`}
                  >
                    <span>Sai</span>
                    {isReviewMode && stmt.correct === false && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Review Mode Indicator */}
                  {isReviewMode && (
                    <div className="flex items-center gap-1.5 ml-2">
                      {isThisStatementCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Chính xác ({stmt.correct ? "Đúng" : "Sai"})</span>
                        </span>
                      ) : val === undefined ? (
                        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Chưa làm • Đáp án: <strong>{stmt.correct ? "Đúng" : "Sai"}</strong>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Bạn chọn {val ? "Đúng" : "Sai"} • Đáp án: <strong className="text-emerald-700 underline">{stmt.correct ? "Đúng" : "Sai"}</strong></span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Statement explanation in review mode */}
              {isReviewMode && stmt.explanation && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 pl-8 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Giải thích {stmt.key}): </span>
                  <MathRenderer text={stmt.explanation} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Mode Summary for this question */}
      {isReviewMode && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-700">
            Quy tắc chấm: <span className="font-medium">1 ý=0.1đ | 2 ý=0.25đ | 3 ý=0.5đ | 4 ý=1.0đ</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">
              Đúng <strong>{correctStatementsCount}/4</strong> mệnh đề:
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold text-xs">
              +{pointsEarned.toFixed(2)} điểm
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
