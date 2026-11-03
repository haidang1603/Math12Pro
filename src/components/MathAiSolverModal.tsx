/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Key,
  Copy,
  Check,
  BookMarked,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import {
  getStoredGeminiApiKey,
  saveStoredGeminiApiKey,
  saveMathSolution,
} from "@/services/storageService";
import { MistakeItem } from "@/types/learning";
import MathRenderer from "@/components/MathRenderer";

interface MathAiSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToMistakeNotebook?: (mistake: MistakeItem) => void;
}

const SAMPLE_PROMPTS = [
  "Tìm tất cả các đường tiệm cận của đồ thị hàm số y = (2x^2 - 3x + 1) / (x - 2)",
  "Trong không gian Oxyz, tính khoảng cách từ điểm A(1; -2; 3) đến mặt phẳng (P): 2x + 2y - z + 9 = 0",
  "Tính tích phân I = int_0^1 (2x + 3) e^x dx",
  "Một hộp có 10 viên bi (6 đỏ, 4 xanh). Lấy ngẫu nhiên 2 viên, tính xác suất để cả 2 viên cùng màu đỏ",
];

export default function MathAiSolverModal({
  isOpen,
  onClose,
  onSaveToMistakeNotebook,
}: MathAiSolverModalProps) {
  const [prompt, setPrompt] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");

  const [apiKey, setApiKey] = useState(() => getStoredGeminiApiKey());
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle image upload from file input
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Vui lòng chỉ tải lên file hình ảnh (JPG, PNG, WEBP).");
      return;
    }
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageBase64(result);
      setImagePreview(result);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle clipboard paste (Ctrl + V)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          break;
        }
      }
    }
  };

  const handleSaveApiKey = () => {
    saveStoredGeminiApiKey(apiKey);
    setShowApiKeyInput(false);
    setStatusMessage("Đã lưu API Key thành công!");
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleSolve = async () => {
    if (!prompt.trim() && !imageBase64) {
      setErrorMessage("Vui lòng nhập văn bản đề bài hoặc tải ảnh bài toán lên.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    setSolution(null);
    setIsSaved(false);

    try {
      const response = await fetch("/api/v1/ai/solve-math", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageBase64,
          mimeType,
          apiKey: apiKey.trim(),
        }),
      });

      const data = await response.json();

      if (data.success && data.solution) {
        setSolution(data.solution);
        setModelUsed(data.modelUsed || "gemini-3.5-flash");
        if (data.isOfflineFallback) {
          setStatusMessage("Đã phân tích với bộ giải toán mẫu chuẩn. Thêm API Key Gemini để AI giải đề bài bất kỳ!");
        }
      } else if (data.fallbackSolution) {
        setSolution(data.fallbackSolution);
        setModelUsed(null);
        setErrorMessage(data.message || "Không thể gọi API Gemini trực tiếp, đã chuyển sang bộ giải mẫu.");
      } else {
        setErrorMessage(data.message || "Không thể giải bài toán. Vui lòng kiểm tra lại đề bài.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrorMessage("Lỗi kết nối máy chủ: " + errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySolution = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveToNotebook = () => {
    if (!solution) return;
    saveMathSolution({
      problemText: prompt || "Bài toán từ hình ảnh tải lên",
      imageUrl: imagePreview || undefined,
      solutionMarkdown: solution,
      topicTag: "Giải toán AI Gemini",
    });

    if (onSaveToMistakeNotebook) {
      onSaveToMistakeNotebook({
        id: `ai-sol-${Date.now()}`,
        source: "STUDY_MODE",
        chapterId: 1,
        chapterTitle: "AI Giải Toán 12",
        topic: "Bài toán cần ghi nhớ",
        problem: prompt || "Bài toán từ hình ảnh tải lên",
        studentAnswer: "Đã lưu từ Gemini AI",
        correctAnswer: "Xem lời giải chi tiết",
        explanation: solution,
        tag: "Nhầm công thức",
        reviewCount: 1,
        resolved: false,
        date: "Hôm nay",
      });
    }

    setIsSaved(true);
    setStatusMessage("Đã lưu bài toán vào Sổ tay ghi nhớ!");
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleReset = () => {
    setPrompt("");
    setImageBase64(null);
    setImagePreview(null);
    setSolution(null);
    setModelUsed(null);
    setErrorMessage(null);
    setStatusMessage(null);
  };

  return (
    <div
      onPaste={handlePaste}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                AI Giải Toán 12 Cao Cấp
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI Solver
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Dán đề hoặc tải ảnh để AI phân tích, giải chi tiết từng bước & kèm mẹo bấm máy Casio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Cài đặt khóa API Gemini của bạn"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{apiKey ? "API Key: Đã lưu" : "Cài API Key"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gemini API Key Configuration Panel */}
        {showApiKeyInput && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-400" /> Nhập Google Gemini API Key:
                </span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-[11px] flex items-center gap-1"
                >
                  Lấy API Key miễn phí tại Google AI Studio <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Lưu Key
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Khóa API được lưu an toàn trong trình duyệt của bạn (Local Storage) để giải toán siêu tốc.
              </p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Status / Error Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                Nhập đề bài hoặc dán ảnh (Ctrl + V):
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" /> Tải ảnh bài toán lên
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Dán hoặc gõ nội dung bài toán vào đây... (Hoặc nhấn Ctrl+V để dán trực tiếp ảnh chụp đề từ clipboard)"
                rows={imagePreview ? 3 : 5}
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-700 font-sans text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed resize-none"
              />

              {/* Image Preview Thumbnail if loaded */}
              {imagePreview && (
                <div className="mt-2 relative inline-block border border-slate-700 rounded-xl overflow-hidden group bg-slate-950 p-1">
                  <img
                    src={imagePreview}
                    alt="Uploaded Math"
                    className="max-h-36 rounded-lg object-contain"
                  />
                  <button
                    onClick={() => {
                      setImageBase64(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/90 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                    title="Xoá ảnh"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Samples */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-medium">Thử nhanh bài mẫu:</span>
              {SAMPLE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer truncate max-w-[220px]"
                  title={p}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleReset}
              disabled={isLoading || (!prompt && !imagePreview && !solution)}
              className="text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Làm mới
            </button>

            <button
              onClick={handleSolve}
              disabled={isLoading || (!prompt.trim() && !imageBase64)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-mono tracking-wider animate-pulse">Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Bắt đầu giải chi tiết</span>
                </>
              )}
            </button>
          </div>

          {/* Thinking / Loading Reasoning State */}
          {isLoading && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-purple-500/30 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                  <span className="font-mono text-sm font-bold text-purple-300 tracking-widest">
                    Thinking...
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Đang suy luận logic & kiểm tra kết quả
                </span>
              </div>

              {/* Animated Thinking Progression */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-purple-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping shrink-0" />
                  <span>Phân tích giả thiết & xác định dạng toán theo chương trình Toán 12...</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  <span>Thiết lập chuỗi biến đổi tương đương, chuẩn hóa KaTeX và tính đạo hàm / tích phân...</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  <span>Xác minh đáp số và đối chiếu mẹo bấm máy tính Casio FX-580 / FX-880...</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>AI đang suy luận từng bước theo cấu trúc sư phạm chuẩn GDPT mới. Vui lòng đợi trong giây lát...</span>
              </div>
            </div>
          )}

          {/* Solution Display Area - White textbook background for crystal clear math visibility */}
          {solution && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-purple-300 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 text-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Lời Giải Chi Tiết Từ AI</h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Chính xác • Từng bước • Kèm Casio • Chuẩn GDPT mới
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySolution}
                    className="p-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300 font-medium"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Đã sao chép" : "Sao chép"}</span>
                  </button>

                  <button
                    onClick={handleSaveToNotebook}
                    disabled={isSaved}
                    className="p-1.5 px-2.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-purple-300 font-medium disabled:opacity-50"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>{isSaved ? "Đã lưu sổ tay" : "Lưu vào sổ tay"}</span>
                  </button>
                </div>
              </div>

              {/* KaTeX Rendered Solution */}
              <div className="text-slate-900 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
                <MathRenderer text={solution} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
