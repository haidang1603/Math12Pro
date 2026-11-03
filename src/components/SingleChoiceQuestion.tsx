"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { SingleChoiceQuestionData } from "@/types/exam";
import MathRenderer from "./MathRenderer";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionData;
  userAnswer?: "A" | "B" | "C" | "D";
  onAnswerChange: (answer: "A" | "B" | "C" | "D") => void;
  isFlagged?: boolean;
  onToggleFlag: () => void;
  isReviewMode?: boolean; // When viewing results
}

export default function SingleChoiceQuestion({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged = false,
  onToggleFlag,
  isReviewMode = false,
}: SingleChoiceQuestionProps) {
  const isCorrect = isReviewMode && userAnswer === question.correctAnswer;
  const isWrong = isReviewMode && userAnswer && userAnswer !== question.correctAnswer;

  return (
    <div
      id={`p1-${question.id}`}
      className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
        isFlagged ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200/90"
      }`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold text-xs">
            Câu {question.number}
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            {question.chapterName}
          </span>
          {question.topic && (
            <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
              {question.topic}
            </span>
          )}
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

      {/* Question Content */}
      <div className="text-slate-800 text-sm md:text-base leading-relaxed mb-5">
        <MathRenderer text={question.content} />
        {question.imageUrl && (
          <div className="my-4 flex justify-center">
            <img
              src={question.imageUrl}
              alt={`Hình minh họa câu ${question.number}`}
              className="max-h-72 rounded-2xl object-contain border border-slate-200/90 shadow-2xs bg-white p-1"
            />
          </div>
        )}
        {question.svgContent && (
          <div
            className="my-4 flex justify-center overflow-x-auto p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 shadow-2xs"
            dangerouslySetInnerHTML={{ __html: question.svgContent }}
          />
        )}
      </div>

      {/* 4 Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        {question.options.map((opt) => {
          const isSelected = userAnswer === opt.key;
          const isThisCorrect = isReviewMode && opt.key === question.correctAnswer;
          const isThisWrongChoice = isReviewMode && isSelected && !isThisCorrect;

          let cardStyle = "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300";
          let badgeStyle = "bg-white text-slate-700 border-slate-200";

          if (isSelected) {
            cardStyle = "border-blue-600 bg-blue-50/60 ring-1 ring-blue-500";
            badgeStyle = "bg-blue-600 text-white border-blue-600";
          }

          if (isReviewMode) {
            if (isThisCorrect) {
              cardStyle = "border-emerald-500 bg-emerald-50/80 ring-1 ring-emerald-500";
              badgeStyle = "bg-emerald-600 text-white border-emerald-600";
            } else if (isThisWrongChoice) {
              cardStyle = "border-rose-400 bg-rose-50/80 ring-1 ring-rose-400";
              badgeStyle = "bg-rose-600 text-white border-rose-600";
            }
          }

          return (
            <button
              key={opt.key}
              type="button"
              disabled={isReviewMode}
              onClick={() => onAnswerChange(opt.key)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${cardStyle}`}
            >
              <span
                className={`w-7 h-7 rounded-lg border font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors ${badgeStyle}`}
              >
                {opt.key}
              </span>
              <div className="text-sm font-medium text-slate-800 flex-1 pt-0.5">
                <MathRenderer text={opt.text} inline />
              </div>
            </button>
          );
        })}
      </div>

      {/* Review Explanation */}
      {isReviewMode && (
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-5 rounded-b-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              {isCorrect ? "✓ Trả lời Đúng (+0.25đ)" : isWrong ? "✗ Trả lời Sai (0đ)" : "Chưa trả lời (0đ)"}
            </span>
            <span className="text-xs text-slate-600">
              Đáp án chính xác: <strong className="text-blue-700 font-bold">{question.correctAnswer}</strong>
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
