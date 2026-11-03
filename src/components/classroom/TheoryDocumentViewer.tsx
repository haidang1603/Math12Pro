"use client";

import React, { useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Chapter } from "@/types/learning";
import MathRenderer from "../MathRenderer";

interface TheoryDocumentViewerProps {
  chapter: Chapter;
}

export default function TheoryDocumentViewer({ chapter }: TheoryDocumentViewerProps) {
  // Parse theorySummary into structured sections
  const parsedSections = useMemo(() => {
    if (!chapter.theorySummary) return [];

    // Split text by lines starting with "### "
    const rawChunks = chapter.theorySummary.split(/(?=###\s+)/g);

    return rawChunks
      .map((chunk) => chunk.trim())
      .filter((chunk) => chunk.length > 0)
      .map((chunk, idx) => {
        const lines = chunk.split("\n");
        const headingLine = lines[0].replace(/^###\s+/, "").trim();
        const contentLines = lines.slice(1).join("\n").trim();

        return {
          id: `sec-${idx}`,
          title: headingLine,
          content: contentLines,
        };
      });
  }, [chapter.theorySummary]);

  // Clean markdown parsing helper for inline text (stripping raw ** and rendering bold)
  const formatMarkdownText = (text: string) => {
    // If the text contains list items, we render them neatly
    const lines = text.split("\n");

    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lIdx} className="h-2" />;

      const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("+ ");
      const cleanLine = isBullet ? trimmed.replace(/^[-+]\s+/, "") : trimmed;

      return (
        <div
          key={lIdx}
          className={`${
            isBullet
              ? "flex items-start gap-2.5 my-1.5 pl-2 text-slate-700"
              : "my-1 text-slate-800"
          }`}
        >
          {isBullet && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
          )}
          <div className="flex-1 leading-relaxed">
            <MathRenderer text={cleanLine} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. 3-Textbook Comparison Master Banner */}
      {chapter.textbookNotes && (
        <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                Đối chiếu & Tích hợp Kiến thức 3 Bộ Sách Giáo Khoa Mới
              </h4>
              <p className="text-xs text-amber-800/80">
                Chuẩn hóa nội dung chung của Kết nối tri thức, Cánh diều và Chân trời sáng tạo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* KNTT */}
            <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-xl border border-blue-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 pb-1 border-b border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Kết nối tri thức (KNTT)</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                <MathRenderer text={chapter.textbookNotes.kntt} />
              </p>
            </div>

            {/* Cánh Diều */}
            <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-xl border border-emerald-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 pb-1 border-b border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Cánh Diều</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                <MathRenderer text={chapter.textbookNotes.canhDieu} />
              </p>
            </div>

            {/* Chân Trời Sáng Tạo */}
            <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-xl border border-purple-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-900 pb-1 border-b border-purple-100">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>Chân trời sáng tạo (CTST)</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                <MathRenderer text={chapter.textbookNotes.chanTroi} />
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Key Formulas Quick Grid (Công thức trọng tâm) */}
      {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              Công Thức Trọng Tâm Cần Ghi Nhớ
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {chapter.keyFormulas.map((formula, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 transition-colors flex items-center gap-3"
              >
                <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="text-xs sm:text-sm font-serif text-slate-900 overflow-x-auto py-0.5">
                  <MathRenderer text={`$${formula}$`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Main Theory Sections (Structured Textbook Reader) */}
      <div className="space-y-4">
        {parsedSections.length > 0 ? (
          parsedSections.map((sec, idx) => (
            <div
              key={sec.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-colors space-y-3"
            >
              {/* Section Heading */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-base tracking-tight">
                  {sec.title}
                </h4>
              </div>

              {/* Section Body */}
              <div className="text-sm leading-relaxed text-slate-800">
                {formatMarkdownText(sec.content)}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Lý thuyết cốt lõi
            </h4>
            <div className="text-sm text-slate-800 leading-relaxed">
              <MathRenderer text={chapter.theorySummary} />
            </div>
          </div>
        )}
      </div>

      {/* 4. Practical Learning Tips */}
      <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs text-blue-950 flex items-start gap-3">
        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <strong>Lời khuyên làm bài thi tốt nghiệp 2025–2026:</strong>
          <p className="text-slate-700 leading-relaxed">
            Dạng câu hỏi Đúng/Sai (Phần II) thường lồng ghép cả 4 tính chất (tính đơn điệu, cực trị, tiệm cận và giá trị lớn nhất - nhỏ nhất) vào một hàm số cho trước. Hãy nắm vững bản chất đạo hàm cấp 1 và cấp 2 để giải quyết trọn vẹn cả 4 mệnh đề.
          </p>
        </div>
      </div>
    </div>
  );
}
