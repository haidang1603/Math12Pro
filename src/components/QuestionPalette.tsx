"use client";

import React from "react";
import { Bookmark, CheckCircle2 } from "lucide-react";
import { ExamData, ExamUserAnswers } from "@/types/exam";
import { getExamScoreStructure } from "@/utils/scoring";

interface QuestionPaletteProps {
  exam: ExamData;
  answers: ExamUserAnswers;
  activeQuestionId: string | null;
  onSelectQuestion: (section: "part1" | "part2" | "part3" | "part4", id: number) => void;
  onSubmitClick: () => void;
}

export default function QuestionPalette({
  exam,
  answers,
  activeQuestionId,
  onSelectQuestion,
  onSubmitClick,
}: QuestionPaletteProps) {
  // Check completion of part 1 questions
  const isPart1Answered = (id: number) => Boolean(answers.part1[id]);

  // Check completion of part 2 questions (has answered at least 1, or all 4)
  const getPart2Status = (id: number) => {
    const sub = answers.part2[id];
    if (!sub) return { answeredCount: 0, isComplete: false };
    const count = ["a", "b", "c", "d"].filter(
      (k) => sub[k as "a" | "b" | "c" | "d"] !== undefined
    ).length;
    return { answeredCount: count, isComplete: count === 4 };
  };

  // Check completion of part 3 questions
  const isPart3Answered = (id: number) => Boolean(answers.part3[id]?.trim());

  // Check completion of part 4 questions (Tự luận)
  const isPart4Answered = (id: number) => Boolean(answers.part4?.[id]?.trim());

  // Count total answered
  let answeredCount = 0;
  exam.part1.forEach((q) => {
    if (isPart1Answered(q.id)) answeredCount++;
  });
  exam.part2.forEach((q) => {
    if (getPart2Status(q.id).answeredCount > 0) answeredCount++;
  });
  exam.part3.forEach((q) => {
    if (isPart3Answered(q.id)) answeredCount++;
  });
  if (exam.part4) {
    exam.part4.forEach((q) => {
      if (isPart4Answered(q.id)) answeredCount++;
    });
  }

  const flaggedCount = Object.values(answers.flagged).filter(Boolean).length;
  const totalQuestions =
    (exam.part1?.length || 0) +
    (exam.part2?.length || 0) +
    (exam.part3?.length || 0) +
    (exam.part4?.length || 0);
  const structure = getExamScoreStructure(exam);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col gap-4">
      {/* Header and counter */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <span>Danh mục câu hỏi</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {totalQuestions} câu
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tiến độ: <strong className="text-blue-700 font-semibold">{answeredCount}</strong>/{totalQuestions} câu
          </p>
        </div>

        {flaggedCount > 0 && (
          <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Bookmark className="w-3 h-3 fill-amber-500" />
            <span>{flaggedCount} câu xem lại</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-blue-600 border border-blue-600"></div>
          <span>Đã làm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-white border border-slate-300"></div>
          <span>Chưa làm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-amber-50 border-2 border-amber-400 relative">
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" />
          </div>
          <span>Đánh dấu xem lại</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-blue-100 border-2 border-blue-600"></div>
          <span>Đang chọn</span>
        </div>
      </div>

      {/* Section 1: Part 1 (Trắc nghiệm 4 lựa chọn) - Render only if questions exist */}
      {exam.part1 && exam.part1.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {exam.part2.length === 0 && exam.part3.length === 0
                ? "Trắc nghiệm 4 lựa chọn"
                : "Phần I: Trắc nghiệm 4 lựa chọn"}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {exam.part1.length} câu • {structure.part1Score.toFixed(1)}đ
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {exam.part1.map((q) => {
              const answered = isPart1Answered(q.id);
              const flagged = answers.flagged[`p1-${q.id}`];
              const isActive = activeQuestionId === `p1-${q.id}`;

              let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
              if (answered) {
                btnStyle = "bg-blue-600 text-white border-blue-600 shadow-xs hover:bg-blue-700";
              }
              if (isActive) {
                btnStyle += " ring-2 ring-orange-500 ring-offset-1 font-bold";
              }
              if (flagged) {
                btnStyle += " ring-2 ring-amber-400 border-amber-400";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion("part1", q.id)}
                  className={`relative h-9 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {q.number}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 2: Part 2 (Đúng / Sai) - Render only if questions exist */}
      {exam.part2 && exam.part2.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Phần II: Đúng / Sai
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {exam.part2.length} câu • {structure.part2Score.toFixed(1)}đ
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {exam.part2.map((q) => {
              const { answeredCount: subAnsCount, isComplete } = getPart2Status(q.id);
              const flagged = answers.flagged[`p2-${q.id}`];
              const isActive = activeQuestionId === `p2-${q.id}`;

              let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-300";
              if (isComplete) {
                btnStyle = "bg-blue-600 text-white border-blue-600 shadow-xs hover:bg-blue-700";
              } else if (subAnsCount > 0) {
                btnStyle = "bg-blue-100 text-blue-900 border-blue-300";
              }
              if (isActive) {
                btnStyle += " ring-2 ring-orange-500 ring-offset-1 font-bold";
              }
              if (flagged) {
                btnStyle += " ring-2 ring-amber-400 border-amber-400";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion("part2", q.id)}
                  className={`relative py-1.5 px-2 rounded-lg border text-xs font-medium flex flex-col items-center justify-center transition-all ${btnStyle}`}
                >
                  <span>Câu {q.number}</span>
                  <span className="text-[10px] opacity-80">{subAnsCount}/4 ý</span>
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: Part 3 (Trả lời ngắn) - Render only if questions exist */}
      {exam.part3 && exam.part3.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {exam.part2.length === 0 ? "Phần Tự luận / Trả lời ngắn" : "Phần III: Trả lời ngắn"}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {exam.part3.length} câu • {structure.part3Score.toFixed(1)}đ
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {exam.part3.map((q) => {
              const answered = isPart3Answered(q.id);
              const flagged = answers.flagged[`p3-${q.id}`];
              const isActive = activeQuestionId === `p3-${q.id}`;

              let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
              if (answered) {
                btnStyle = "bg-blue-600 text-white border-blue-600 shadow-xs hover:bg-blue-700";
              }
              if (isActive) {
                btnStyle += " ring-2 ring-orange-500 ring-offset-1 font-bold";
              }
              if (flagged) {
                btnStyle += " ring-2 ring-amber-400 border-amber-400";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion("part3", q.id)}
                  className={`relative h-9 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {q.number}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 4: Part 4 (Tự luận) - Render if questions exist */}
      {exam.part4 && exam.part4.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">
              Phần IV: Câu hỏi Tự luận
            </span>
            <span className="text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              {exam.part4.length} câu • {(structure.part4Score || 1.0).toFixed(1)}đ
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {exam.part4.map((q) => {
              const answered = isPart4Answered(q.id);
              const flagged = answers.flagged[`p4-${q.id}`];
              const isActive = activeQuestionId === `p4-${q.id}`;

              let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
              if (answered) {
                btnStyle = "bg-purple-600 text-white border-purple-600 shadow-xs hover:bg-purple-700";
              }
              if (isActive) {
                btnStyle += " ring-2 ring-purple-500 ring-offset-1 font-bold";
              }
              if (flagged) {
                btnStyle += " ring-2 ring-amber-400 border-amber-400";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion("part4", q.id)}
                  className={`relative h-9 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${btnStyle}`}
                >
                  TL {q.number}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={onSubmitClick}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-[0.99] shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>NỘP BÀI THI</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Hệ thống sẽ tự động chấm điểm và phân tích theo chuẩn MoET
        </p>
      </div>
    </div>
  );
}
