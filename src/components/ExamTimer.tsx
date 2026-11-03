"use client";

import React, { useEffect } from "react";
import { Clock, AlertTriangle, Pause, Play } from "lucide-react";

interface ExamTimerProps {
  initialSeconds?: number; // default 5400 (90 mins)
  onTimeUp: () => void;
  isPaused?: boolean;
  onTogglePause?: () => void;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}

export default function ExamTimer({
  initialSeconds = 5400,
  onTimeUp,
  isPaused = false,
  onTogglePause,
  timeRemaining,
  setTimeRemaining,
}: ExamTimerProps) {
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeRemaining, onTimeUp, setTimeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progressPercent = Math.max(0, Math.min(100, (timeRemaining / initialSeconds) * 100));

  const isUrgent = timeRemaining <= 300; // < 5 minutes
  const isWarning = timeRemaining <= 900 && !isUrgent; // < 15 minutes

  let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let barColor = "bg-blue-600";
  let timeTextColor = "text-slate-900";

  if (isUrgent) {
    badgeColor = "bg-rose-50 text-rose-700 border-rose-300 animate-pulse";
    barColor = "bg-rose-600";
    timeTextColor = "text-rose-600";
  } else if (isWarning) {
    badgeColor = "bg-amber-50 text-amber-700 border-amber-300";
    barColor = "bg-amber-500";
    timeTextColor = "text-amber-700";
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Thời gian làm bài
            </span>
            <div className="text-xs text-slate-400">90 phút chuẩn Bộ GD&ĐT</div>
          </div>
        </div>

        {onTogglePause && (
          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 transition-colors"
            title={isPaused ? "Tiếp tục" : "Tạm dừng"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-slate-600" />}
            <span className="font-medium text-[11px]">{isPaused ? "Tiếp tục" : "Tạm dừng"}</span>
          </button>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-3 mb-2">
        <div className={`text-3xl font-mono font-bold tracking-tight ${timeTextColor}`}>
          {formattedTime}
        </div>
        <div className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${badgeColor}`}>
          {isUrgent ? "Sắp hết giờ!" : isWarning ? "Còn ít thời gian" : "Đang làm bài"}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${barColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {isUrgent && (
        <div className="mt-2 text-xs text-rose-600 flex items-center gap-1.5 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Còn dưới 5 phút! Hãy rà soát lại các câu đã làm.</span>
        </div>
      )}
    </div>
  );
}
