"use client";

import React, { useState, useEffect } from "react";
import { X, Zap, CheckCircle, Clock, RotateCcw, Award } from "lucide-react";
import MathRenderer from "./MathRenderer";
import confetti from "canvas-confetti";

interface QuickQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  {
    id: 1,
    question: "Đạo hàm của hàm số $y = \\ln(2x + 1)$ là:",
    options: ["y' = \\dfrac{1}{2x+1}", "y' = \\dfrac{2}{2x+1}", "y' = \\dfrac{1}{x}", "y' = 2x+1"],
    correct: 1,
    hint: "Công thức: $(\\ln u)' = \\dfrac{u'}{u}$."
  },
  {
    id: 2,
    question: "Trong $Oxyz$, khoảng cách từ $M(2; -1; 3)$ đến mặt phẳng $(Oxy)$ là:",
    options: ["2", "1", "3", "\\sqrt{14}"],
    correct: 2,
    hint: "Mặt phẳng $(Oxy)$ có phương trình $z = 0$, khoảng cách là $|z_M| = |3| = 3$."
  },
  {
    id: 3,
    question: "Cho $\\int_1^3 f(x)\\,dx = 5$. Khi đó $\\int_1^3 2f(x)\\,dx$ bằng:",
    options: ["10", "7", "25", "2,5"],
    correct: 0,
    hint: "Đưa hằng số ra ngoài dấu tích phân: $2 \\times 5 = 10$."
  },
  {
    id: 4,
    question: "Số tiệm cận ngang của đồ thị hàm số $y = \\dfrac{3x - 1}{x + 2}$ là:",
    options: ["0", "1", "2", "3"],
    correct: 1,
    hint: "Bậc tử bằng bậc mẫu, $\\lim_{x \\to \\pm\\infty} y = 3 \\implies 1$ đường tiệm cận ngang $y = 3$."
  },
  {
    id: 5,
    question: "Cho hai biến cố $A$ và $B$ độc lập có $P(A) = 0,3$ và $P(B) = 0,4$. Xác suất $P(A \\cap B)$ là:",
    options: ["0,7", "0,12", "0,1", "0,58"],
    correct: 1,
    hint: "Biến cố độc lập: $P(A \\cap B) = P(A) \\times P(B) = 0,3 \\times 0,4 = 0,12$."
  }
];

export default function QuickQuizModal({ isOpen, onClose }: QuickQuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 minutes
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen || isFinished) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isFinished]);

  if (!isOpen) return null;

  const currentQ = QUICK_QUESTIONS[currentIndex];
  const userAns = selectedAnswers[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIdx }));
  };

  const handleFinish = () => {
    setIsFinished(true);
    let correct = 0;
    QUICK_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    if (correct >= 4) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setSecondsLeft(900);
    setIsFinished(false);
  };

  let totalCorrect = 0;
  QUICK_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correct) totalCorrect++;
  });

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-200 fill-amber-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">Luyện Phản Xạ 15 Phút</h3>
              <p className="text-xs text-amber-100">5 câu hỏi then chốt • Tăng tốc độ bấm máy & tư duy</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{timeFormatted}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-medium">
              <span>Câu hỏi {currentIndex + 1} / {QUICK_QUESTIONS.length}</span>
              <span>Đã trả lời {Object.keys(selectedAnswers).length}/{QUICK_QUESTIONS.length} câu</span>
            </div>

            {/* Question Text */}
            <div className="text-base text-slate-800 font-medium mb-5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <MathRenderer text={currentQ.question} />
            </div>

            {/* 4 Choices */}
            <div className="space-y-2.5 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAns === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-50 border-orange-500 text-orange-950 ring-1 ring-orange-500 font-semibold"
                        : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <MathRenderer text={`$${opt}$`} inline />
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-orange-600" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                ← Câu trước
              </button>

              {currentIndex < QUICK_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                >
                  Câu tiếp theo →
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md cursor-pointer"
                >
                  Nộp bài phản xạ
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900">Hoàn thành Luyện phản xạ!</h4>
              <p className="text-xs text-slate-500 mt-1">Kết quả kiểm tra tốc độ tư duy nhanh:</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 max-w-xs mx-auto text-center">
              <div>
                <span className="text-xs text-slate-500 block">Số câu đúng</span>
                <strong className="text-2xl font-bold text-blue-700">{totalCorrect}/5</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Thời gian</span>
                <strong className="text-2xl font-bold text-slate-800">
                  {Math.floor((900 - secondsLeft) / 60)}p { (900 - secondsLeft) % 60 }s
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Luyện lại lần nữa
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
