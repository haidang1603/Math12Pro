"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  RotateCcw,
  BookOpen,
  Calculator,
} from "lucide-react";
import { createMathEvaluator } from "@/utils/mathParser";
import MathRenderer from "../MathRenderer";
import { FORMULA_FLASHCARDS } from "@/data/chaptersData";

// SVG Plot Settings
const SVG_W = 560;
const SVG_H = 280;
const X_MIN = -3;
const X_MAX = 5;
const Y_MIN = -4;
const Y_MAX = 6;

const toSvgX = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * SVG_W;
const toSvgY = (y: number) => SVG_H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * SVG_H;

export default function DefiniteIntegralLab() {
  // Mode: "calculator" (numerical definite integral & shaded area) vs "flashcard" (formula memorization)
  const [activeMode, setActiveMode] = useState<"calculator" | "flashcard">("calculator");

  // Integral Parameters
  const [functionStr, setFunctionStr] = useState<string>("x^2 - 2x");
  const [lowerLimit, setLowerLimit] = useState<number>(0);
  const [upperLimit, setUpperLimit] = useState<number>(3);
  const [steps, setSteps] = useState<number>(100);

  // Flashcard State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Math Evaluator
  const evaluator = useMemo(() => {
    return createMathEvaluator(functionStr);
  }, [functionStr]);

  // Numerical Integration (Simpson's 1/3 Rule & Absolute Area)
  const results = useMemo(() => {
    if (evaluator.error) return null;

    const a = lowerLimit;
    const b = upperLimit;
    const n = Math.max(10, steps % 2 === 0 ? steps : steps + 1); // must be even
    const h = (b - a) / n;

    let simpsonSum = 0;
    let absoluteAreaSum = 0;
    let volumeSum = 0;

    const evalY = (xVal: number) => {
      const res = evaluator.evaluate(xVal, 0);
      return isNaN(res) || !isFinite(res) ? 0 : res;
    };

    // Endpoints
    const y0 = evalY(a);
    const yn = evalY(b);
    simpsonSum += y0 + yn;
    absoluteAreaSum += (Math.abs(y0) + Math.abs(yn)) / 2;
    volumeSum += (Math.pow(y0, 2) + Math.pow(yn, 2)) / 2;

    for (let i = 1; i < n; i++) {
      const xVal = a + i * h;
      const yVal = evalY(xVal);
      const coeff = i % 2 === 1 ? 4 : 2;
      simpsonSum += coeff * yVal;
      absoluteAreaSum += Math.abs(yVal);
      volumeSum += Math.pow(yVal, 2);
    }

    const integralValue = (h / 3) * simpsonSum;
    const areaValue = h * absoluteAreaSum;
    const volumeValue = Math.PI * h * volumeSum;

    return {
      integral: integralValue,
      area: areaValue,
      volume: volumeValue,
      n,
    };
  }, [evaluator, lowerLimit, upperLimit, steps]);

  // Generate Shaded SVG Polygons for Positive and Negative Regions
  const shadedSegments = useMemo(() => {
    if (evaluator.error) return [];

    const a = Math.min(lowerLimit, upperLimit);
    const b = Math.max(lowerLimit, upperLimit);
    const numSub = 60;
    const dx = (b - a) / numSub;

    const segments: { d: string; isPositive: boolean }[] = [];
    const baseY = toSvgY(0);

    for (let i = 0; i < numSub; i++) {
      const x1 = a + i * dx;
      const x2 = a + (i + 1) * dx;
      const midX = (x1 + x2) / 2;

      const y1 = evaluator.evaluate(x1, 0);
      const y2 = evaluator.evaluate(x2, 0);
      const yMid = evaluator.evaluate(midX, 0);

      if (isNaN(y1) || isNaN(y2) || !isFinite(y1) || !isFinite(y2)) continue;

      const px1 = toSvgX(x1);
      const px2 = toSvgX(x2);
      const py1 = toSvgY(y1);
      const py2 = toSvgY(y2);

      const d = `M ${px1} ${baseY} L ${px1} ${py1} L ${px2} ${py2} L ${px2} ${baseY} Z`;
      segments.push({ d, isPositive: yMid >= 0 });
    }

    return segments;
  }, [evaluator, lowerLimit, upperLimit]);

  // Curve SVG Path
  const curvePath = useMemo(() => {
    if (evaluator.error) return "";

    const numPoints = 160;
    const dx = (X_MAX - X_MIN) / numPoints;
    let d = "";
    let isDrawing = false;

    for (let i = 0; i <= numPoints; i++) {
      const xVal = X_MIN + i * dx;
      const yVal = evaluator.evaluate(xVal, 0);

      if (isNaN(yVal) || !isFinite(yVal) || Math.abs(yVal) > 20) {
        isDrawing = false;
        continue;
      }

      const px = toSvgX(xVal);
      const py = toSvgY(yVal);

      if (!isDrawing) {
        d += `M ${px.toFixed(1)} ${py.toFixed(1)} `;
        isDrawing = true;
      } else {
        d += `L ${px.toFixed(1)} ${py.toFixed(1)} `;
      }
    }

    return d;
  }, [evaluator]);

  // Presets
  const applyPreset = (preset: "parabola" | "sine" | "sqrt" | "cubic") => {
    if (preset === "parabola") {
      setFunctionStr("x^2 - 2x");
      setLowerLimit(0);
      setUpperLimit(3);
    } else if (preset === "sine") {
      setFunctionStr("sin(x)");
      setLowerLimit(0);
      setUpperLimit(3.14);
    } else if (preset === "sqrt") {
      setFunctionStr("sqrt(x)");
      setLowerLimit(0);
      setUpperLimit(4);
    } else if (preset === "cubic") {
      setFunctionStr("x^3 - 3x");
      setLowerLimit(-1);
      setUpperLimit(2);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 border border-indigo-900/60 shadow-2xl space-y-5">
      {/* 1. Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-900/60 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Phòng Thí Nghiệm Nguyên Hàm, Tích Phân & Diện Tích Hình Phẳng
            </h3>
            <p className="text-xs text-slate-400">
              Nhập hàm số • Tính tích phân xác định Simpson • Diện tích S và Thể tích khối tròn xoay V
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-indigo-900 text-xs font-semibold overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setActiveMode("calculator")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
              activeMode === "calculator"
                ? "bg-indigo-600 text-white shadow-xs font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mô phỏng Tích phân & Diện tích</span>
            <span className="sm:hidden">Tích phân & S</span>
          </button>
          <button
            onClick={() => setActiveMode("flashcard")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
              activeMode === "flashcard"
                ? "bg-indigo-600 text-white shadow-xs font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Flashcard ({cardIndex + 1}/{FORMULA_FLASHCARDS.length})</span>
          </button>
        </div>
      </div>

      {/* MODE 1: INTEGRAL CALCULATOR & VISUALIZER */}
      {activeMode === "calculator" && (
        <div className="space-y-4">
          {/* Quick Presets */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full text-xs py-1">
            <span className="text-slate-400 text-[11px] shrink-0">Hàm mẫu:</span>
            <button
              onClick={() => applyPreset("parabola")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer whitespace-nowrap shrink-0"
            >
              f(x) = x² - 2x [0, 3]
            </button>
            <button
              onClick={() => applyPreset("sine")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer whitespace-nowrap shrink-0"
            >
              f(x) = sin(x) [0, π]
            </button>
            <button
              onClick={() => applyPreset("sqrt")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer whitespace-nowrap shrink-0"
            >
              f(x) = √x [0, 4]
            </button>
            <button
              onClick={() => applyPreset("cubic")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer whitespace-nowrap shrink-0"
            >
              f(x) = x³ - 3x [-1, 2]
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* SVG Visualizer (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-indigo-900/60 p-3 relative shadow-2xl overflow-hidden select-none">
              {/* Legend Top */}
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-300">Đồ thị & Miền Tích Phân:</span>
                  <span className="text-orange-400 font-mono text-[11px]">y = {functionStr}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/60 border border-emerald-400"></span> f(x) ≥ 0
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/60 border border-rose-400"></span> f(x) &lt; 0
                  </span>
                </div>
              </div>

              {/* SVG Canvas */}
              <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto block">
                {/* Axes */}
                <line x1={0} y1={toSvgY(0)} x2={SVG_W} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
                <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={SVG_H} stroke="#475569" strokeWidth="1.5" />
                <text x={SVG_W - 12} y={toSvgY(0) - 6} fill="#94a3b8" fontSize="10" fontWeight="bold">x</text>
                <text x={toSvgX(0) + 6} y={12} fill="#94a3b8" fontSize="10" fontWeight="bold">y</text>

                {/* Shaded Area Segments */}
                {shadedSegments.map((seg, i) => (
                  <path
                    key={i}
                    d={seg.d}
                    fill={seg.isPositive ? "#10b981" : "#f43f5e"}
                    fillOpacity="0.35"
                    stroke={seg.isPositive ? "#059669" : "#e11d48"}
                    strokeWidth="0.5"
                  />
                ))}

                {/* Function Curve */}
                {curvePath && (
                  <path d={curvePath} fill="none" stroke="#f97316" strokeWidth="2.5" />
                )}

                {/* Boundary lines x = a and x = b */}
                <line
                  x1={toSvgX(lowerLimit)}
                  y1={0}
                  x2={toSvgX(lowerLimit)}
                  y2={SVG_H}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x={toSvgX(lowerLimit) - 4}
                  y={toSvgY(0) + 14}
                  fill="#38bdf8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  a={lowerLimit}
                </text>

                <line
                  x1={toSvgX(upperLimit)}
                  y1={0}
                  x2={toSvgX(upperLimit)}
                  y2={SVG_H}
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x={toSvgX(upperLimit) + 4}
                  y={toSvgY(0) + 14}
                  fill="#c084fc"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="start"
                  fontFamily="monospace"
                >
                  b={upperLimit}
                </text>
              </svg>
            </div>

            {/* Controls & Metrics Results (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              {/* Parameter Inputs */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 space-y-3 shadow-md">
                <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
                  Thiết Lập Hàm Số & Cận Tích Phân:
                </span>

                {/* Function Input */}
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Hàm số f(x):</label>
                  <input
                    type="text"
                    value={functionStr}
                    onChange={(e) => setFunctionStr(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 font-mono text-white text-xs focus:outline-none"
                    placeholder="x^2 - 2x"
                  />
                  {evaluator.error && (
                    <span className="text-[10px] text-rose-400 block mt-1">{evaluator.error}</span>
                  )}
                </div>

                {/* Limits a and b */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-blue-300 block mb-1">Cận dưới a:</label>
                    <input
                      type="number"
                      step="0.5"
                      value={lowerLimit}
                      onChange={(e) => setLowerLimit(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 font-mono text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-purple-300 block mb-1">Cận trên b:</label>
                    <input
                      type="number"
                      step="0.5"
                      value={upperLimit}
                      onChange={(e) => setUpperLimit(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 font-mono text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Analytical Results */}
              {results && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 space-y-2.5 font-mono shadow-md">
                  <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px] font-sans">
                    Kết Quả Tính Toán Tích Phân & Hình Học:
                  </span>

                  <div className="space-y-2 text-slate-300">
                    {/* Signed Integral */}
                    <div className="p-2.5 bg-indigo-950/40 border border-indigo-900/50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-300 font-sans">Tích phân có dấu ∫ f(x)dx:</span>
                        <strong className="text-indigo-200 text-sm">
                          {results.integral.toFixed(3)}
                        </strong>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        Tính theo công thức Newton-Leibniz F(b) - F(a)
                      </span>
                    </div>

                    {/* Geometric Area */}
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-300 font-sans">Diện tích hình phẳng S:</span>
                        <strong className="text-emerald-300 text-sm">
                          {results.area.toFixed(3)} (đvdt)
                        </strong>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        Công thức diện tích thực: S = ∫ |f(x)|dx
                      </span>
                    </div>

                    {/* Volume of Revolution */}
                    <div className="p-2.5 bg-purple-950/40 border border-purple-900/50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 font-sans">Thể tích khối tròn xoay V_Ox:</span>
                        <strong className="text-purple-200 text-sm">
                          {results.volume.toFixed(3)} ≈ {(results.volume / Math.PI).toFixed(2)}π
                        </strong>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        Công thức quay quanh Ox: V = π ∫ [f(x)]² dx
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="text-[10px] text-slate-400 block mb-1">Độ chia xấp xỉ Simpson (n bước):</label>
                    <select
                      value={steps}
                      onChange={(e) => setSteps(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-1.5 font-mono text-white text-xs cursor-pointer"
                    >
                      <option value="50">50 bước (nhanh)</option>
                      <option value="100">100 bước (chuẩn)</option>
                      <option value="200">200 bước (chính xác cao)</option>
                      <option value="500">500 bước (cực chuẩn)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FORMULA FLASHCARDS */}
      {activeMode === "flashcard" && (
        <div className="space-y-4 max-w-2xl mx-auto">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[180px] bg-white/10 hover:bg-white/15 rounded-2xl p-6 border border-white/20 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-lg select-none"
          >
            <span className="text-xs text-orange-400 font-semibold mb-2">
              {FORMULA_FLASHCARDS[cardIndex].category} • {isFlipped ? "ĐÁP ÁN (NGUYÊN HÀM)" : "CÂU HỎI"}
            </span>
            <div className="text-lg font-serif">
              <MathRenderer
                text={
                  isFlipped
                    ? `$$${FORMULA_FLASHCARDS[cardIndex].back}$$`
                    : `$$${FORMULA_FLASHCARDS[cardIndex].front}$$`
                }
              />
            </div>
            {isFlipped && (
              <p className="text-xs text-slate-300 mt-2 italic">
                {FORMULA_FLASHCARDS[cardIndex].note}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex((prev) => (prev === 0 ? FORMULA_FLASHCARDS.length - 1 : prev - 1));
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer"
            >
              ← Thẻ trước
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Lật thẻ</span>
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex((prev) => (prev === FORMULA_FLASHCARDS.length - 1 ? 0 : prev + 1));
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer"
            >
              Thẻ tiếp →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
