"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  text: string;
  className?: string;
  inline?: boolean;
}

export default function MathRenderer({ text, className = "", inline = false }: MathRendererProps) {
  const renderedContent = useMemo(() => {
    if (!text) return "";

    // Replace $$...$$ first (display mode), then $...$ (inline mode)
    const parts: { type: "text" | "inline-math" | "block-math"; value: string }[] = [];
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          value: text.substring(lastIndex, match.index),
        });
      }

      const matchedStr = match[0];
      if (matchedStr.startsWith("$$") && matchedStr.endsWith("$$")) {
        parts.push({
          type: "block-math",
          value: matchedStr.slice(2, -2).trim(),
        });
      } else if (matchedStr.startsWith("$") && matchedStr.endsWith("$")) {
        parts.push({
          type: "inline-math",
          value: matchedStr.slice(1, -1).trim(),
        });
      }

      lastIndex = match.index + matchedStr.length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        value: text.substring(lastIndex),
      });
    }

    return parts.map((part, idx) => {
      if (part.type === "text") {
        const formatted = part.value
          .replace(
            /!\[(.*?)\]\((.*?)\)/g,
            '<img src="$2" alt="$1" class="max-h-64 my-2 mx-auto rounded-xl object-contain border border-slate-200" />'
          )
          .replace(/\n/g, "<br/>");
        return <span key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
      }

      const isBlock = part.type === "block-math";
      try {
        const html = katex.renderToString(part.value, {
          displayMode: isBlock && !inline,
          throwOnError: false,
          output: "htmlAndMathml",
        });

        if (isBlock && !inline) {
          return (
            <div
              key={idx}
              className="my-2 overflow-x-auto py-1 text-center font-serif text-current"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block px-0.5 align-baseline font-serif text-current"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <code key={idx} className="text-red-500 font-mono text-xs">{part.value}</code>;
      }
    });
  }, [text, inline]);

  return <div className={`math-content leading-relaxed ${className}`}>{renderedContent}</div>;
}
