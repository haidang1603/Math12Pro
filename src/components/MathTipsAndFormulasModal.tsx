"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  Search,
  Zap,
  Check,
  Calculator,
  Flame,
  Copy,
} from "lucide-react";
import {
  CHAPTER_FORMULAS,
  QUICK_TIPS,
  CASIO_HACKS,
} from "@/data/mathTipsAndFormulasData";
import MathRenderer from "@/components/MathRenderer";

interface MathTipsAndFormulasModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "formulas" | "tips" | "casio";
}

export default function MathTipsAndFormulasModal({
  isOpen,
  onClose,
  initialTab = "formulas",
}: MathTipsAndFormulasModalProps) {
  const [activeTab, setActiveTab] = useState<"formulas" | "tips" | "casio">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | "ALL">("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Filter formulas
  const filteredFormulas = CHAPTER_FORMULAS.filter((f) => {
    const matchChapter = selectedChapter === "ALL" || f.chapterId === selectedChapter;
    const matchQuery =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formulaLatex.toLowerCase().includes(searchQuery.toLowerCase());
    return matchChapter && matchQuery;
  });

  // Filter tips
  const filteredTips = QUICK_TIPS.filter((t) => {
    const matchChapter = selectedChapter === "ALL" || !t.chapterId || t.chapterId === selectedChapter;
    const matchQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortcutRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchChapter && matchQuery;
  });

  // Filter Casio hacks
  const filteredCasio = CASIO_HACKS.filter((c) => {
    const matchQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keySequence580.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.proTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Cẩm Nang Công Thức & Mẹo Giải Toán 12
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Chuẩn 2025
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Toàn bộ công thức 6 chương, phương pháp giải nhanh trắc nghiệm & bí kíp Casio FX-580 / FX-880
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

        {/* Tab Selection & Search Navigation */}
        <div className="px-4 sm:px-5 py-3 bg-slate-950/50 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            <button
              onClick={() => setActiveTab("formulas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "formulas"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sổ tay Công thức (6C)</span>
              <span className="sm:hidden">Công thức</span>
            </button>

            <button
              onClick={() => setActiveTab("tips")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "tips"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Mẹo giải nhanh trắc nghiệm</span>
              <span className="sm:hidden">Mẹo trắc nghiệm</span>
            </button>

            <button
              onClick={() => setActiveTab("casio")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "casio"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bí kíp Casio 580 & 880</span>
              <span className="sm:hidden">Mẹo Casio</span>
            </button>
          </div>

          <div className="relative w-full sm:w-auto sm:min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm công thức, tiệm cận, Casio..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>
        </div>

        {/* Chapter Filter Pill for Formulas & Tips */}
        {activeTab !== "casio" && (
          <div className="px-5 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-400 shrink-0 font-medium">Lọc theo chương:</span>
            <button
              onClick={() => setSelectedChapter("ALL")}
              className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                selectedChapter === "ALL" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Tất cả 6 chương
            </button>
            {[1, 2, 3, 4, 5, 6].map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChapter(ch)}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  selectedChapter === ch ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Chương {ch}
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: FORMULAS */}
          {activeTab === "formulas" && (
            <div className="space-y-4">
              {filteredFormulas.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Không tìm thấy công thức nào khớp với từ khóa &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredFormulas.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/60 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            Chương {item.chapterId} • {item.topic}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-sm mt-1">{item.title}</h3>
                      </div>

                      <button
                        onClick={() => handleCopy(item.id, item.formulaLatex)}
                        className="p-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors border border-slate-700 shrink-0"
                        title="Sao chép mã công thức LaTeX"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? "Đã copy" : "Copy LaTeX"}</span>
                      </button>
                    </div>

                    {/* Formula Render Box - Crisp White Background for optimal KaTeX readability */}
                    <div className="p-4 rounded-xl bg-white border-2 border-slate-200 text-slate-950 text-center font-serif text-base sm:text-lg overflow-x-auto shadow-md">
                      <MathRenderer text={`$$${item.formulaLatex}$$`} />
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                    {item.notes && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Lưu ý bẫy đề thi: </span>
                          <MathRenderer text={item.notes} inline />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: QUICK TIPS */}
          {activeTab === "tips" && (
            <div className="space-y-4">
              {filteredTips.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Không tìm thấy mẹo nào khớp với từ khóa &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/60 transition-all space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {tip.categoryLabel}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">{tip.title}</h3>
                    <p className="text-xs text-slate-300">{tip.summary}</p>

                    {/* Detailed Steps - Clean White Card */}
                    <div className="p-3.5 rounded-xl bg-white border-2 border-slate-200 space-y-1.5 text-xs text-slate-900 shadow-sm">
                      <div className="font-bold text-slate-600 text-[11px] uppercase tracking-wider mb-1">
                        Các bước xử lý nhanh:
                      </div>
                      {tip.detailedSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold shrink-0">•</span>
                          <span className="text-slate-900 font-medium">
                            <MathRenderer text={step} inline />
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shortcut Rule */}
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Khẩu quyết 5 giây: </span>
                        <span>{tip.shortcutRule}</span>
                      </div>
                    </div>

                    {tip.sampleQuestion && (
                      <div className="text-xs text-slate-900 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <span className="font-bold text-blue-700">Ví dụ áp dụng: </span>
                        <span className="font-medium">
                          <MathRenderer text={tip.sampleQuestion} inline />
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: CASIO HACKS */}
          {activeTab === "casio" && (
            <div className="space-y-4">
              {filteredCasio.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Không tìm thấy bí kíp Casio nào khớp với từ khóa &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredCasio.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 border border-purple-500/30 transition-all space-y-3.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <Calculator className="w-3 h-3" />
                        Casio FX-580VN X & FX-880BTG
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">{c.title}</h3>
                    <p className="text-xs text-slate-300">
                      <span className="font-semibold text-purple-300">Bài toán mục tiêu: </span>
                      {c.targetProblem}
                    </p>

                    {/* Key Sequence Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white border-2 border-blue-200 shadow-sm space-y-1.5">
                        <div className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                          <span>🔵 Casio FX-580VN X:</span>
                        </div>
                        <div className="font-mono text-xs text-slate-900 bg-blue-50/70 border border-blue-100 p-2 rounded-lg leading-relaxed font-semibold">
                          {c.keySequence580}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border-2 border-purple-200 shadow-sm space-y-1.5">
                        <div className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
                          <span>🟣 Casio FX-880BTG:</span>
                        </div>
                        <div className="font-mono text-xs text-slate-900 bg-purple-50/70 border border-purple-100 p-2 rounded-lg leading-relaxed font-semibold">
                          {c.keySequence880}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">{c.explanation}</p>

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-2">
                      <Flame className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Mẹo cao thủ (Pro Tip): </span>
                        <span>{c.proTip}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Tài liệu biên soạn chuẩn theo chương trình GDPT Toán 12 mới (3 bộ SGK)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Đóng cẩm nang
          </button>
        </div>
      </div>
    </div>
  );
}
