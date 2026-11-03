"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  RotateCcw,
  Sliders,
  TrendingUp,
  Activity,
  AlertTriangle,
  Calculator,
  Sparkles,
} from "lucide-react";
import MathRenderer from "../MathRenderer";
import { createMathEvaluator } from "@/utils/mathParser";

interface CubicGraphSimulatorProps {
  initialA?: number;
  initialB?: number;
  initialC?: number;
  initialD?: number;
}

export default function CubicGraphSimulator({
  initialA = 1,
  initialB = -3,
  initialC = 0,
  initialD = 2,
}: CubicGraphSimulatorProps) {
  // Mode: "custom" (Nhập hàm số bất kỳ f(x)) vs "cubic" (Khảo sát hàm bậc 3 dạng ax^3+bx^2+cx+d)
  const [activeMode, setActiveMode] = useState<"custom" | "cubic">("custom");

  // Custom Expression State
  const [customExpr, setCustomExpr] = useState<string>("x^3 - 3*x + 2");

  // Coefficients for Cubic Mode: y = a*x^3 + b*x^2 + c*x + d
  const [a, setA] = useState<number>(initialA);
  const [b, setB] = useState<number>(initialB);
  const [c, setC] = useState<number>(initialC);
  const [d, setD] = useState<number>(initialD);

  // Tangent line point x0
  const [x0, setX0] = useState<number>(1);
  const [showTangent, setShowTangent] = useState<boolean>(true);

  // Mouse hover coordinate inspection
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Safe Math Evaluator for Custom Function
  const evaluator = useMemo(() => {
    return createMathEvaluator(customExpr);
  }, [customExpr]);

  // Reset function
  const handleReset = () => {
    if (activeMode === "custom") {
      setCustomExpr("x^3 - 3*x + 2");
      setX0(1);
    } else {
      setA(initialA);
      setB(initialB);
      setC(initialC);
      setD(initialD);
      setX0(1);
    }
    setHoverCoord(null);
  };

  // Preset functions
  const applyPresetFunction = (fnStr: string) => {
    setCustomExpr(fnStr);
    setX0(1);
  };

  // Evaluate function at x depending on active mode
  const evaluateY = useCallback(
    (xVal: number): number => {
      if (activeMode === "cubic") {
        return a * Math.pow(xVal, 3) + b * Math.pow(xVal, 2) + c * xVal + d;
      } else {
        if (evaluator.error) return NaN;
        return evaluator.evaluate(xVal, 0);
      }
    },
    [activeMode, a, b, c, d, evaluator]
  );

  // Numerical derivative f'(x)
  const evaluateDerivative = useCallback(
    (xVal: number): number => {
      if (activeMode === "cubic") {
        return 3 * a * Math.pow(xVal, 2) + 2 * b * xVal + c;
      } else {
        const eps = 0.001;
        const yPlus = evaluateY(xVal + eps);
        const yMinus = evaluateY(xVal - eps);
        if (isNaN(yPlus) || isNaN(yMinus) || !isFinite(yPlus) || !isFinite(yMinus)) return NaN;
        return (yPlus - yMinus) / (2 * eps);
      }
    },
    [activeMode, a, b, c, evaluateY]
  );

  // Tangent line properties at x0
  const tangentProps = useMemo(() => {
    const yVal0 = evaluateY(x0);
    const slopeK = evaluateDerivative(x0);
    if (isNaN(yVal0) || isNaN(slopeK) || !isFinite(yVal0) || !isFinite(slopeK)) return null;

    // y - y0 = k*(x - x0) => y = k*x + (y0 - k*x0)
    const interceptM = yVal0 - slopeK * x0;
    return {
      x0,
      y0: yVal0,
      slopeK,
      interceptM,
      equationStr: `y = ${slopeK.toFixed(2)}x ${interceptM >= 0 ? "+ " + interceptM.toFixed(2) : "- " + Math.abs(interceptM).toFixed(2)}`,
    };
  }, [x0, evaluateY, evaluateDerivative]);

  // Format LaTeX equation cleanly for cubic mode
  const latexEquation = useMemo(() => {
    if (activeMode === "custom") {
      return `y = ${customExpr}`;
    }

    if (a === 0 && b === 0 && c === 0 && d === 0) return "y = 0";

    const parts: string[] = [];
    if (a !== 0) {
      if (a === 1) parts.push("x^3");
      else if (a === -1) parts.push("-x^3");
      else parts.push(`${a}x^3`);
    }
    if (b !== 0) {
      const sign = b > 0 ? (parts.length > 0 ? "+ " : "") : "- ";
      const absB = Math.abs(b);
      const bStr = absB === 1 ? "x^2" : `${absB}x^2`;
      parts.push(`${sign}${bStr}`);
    }
    if (c !== 0) {
      const sign = c > 0 ? (parts.length > 0 ? "+ " : "") : "- ";
      const absC = Math.abs(c);
      const cStr = absC === 1 ? "x" : `${absC}x`;
      parts.push(`${sign}${cStr}`);
    }
    if (d !== 0) {
      const sign = d > 0 ? (parts.length > 0 ? "+ " : "") : "- ";
      parts.push(`${sign}${Math.abs(d)}`);
    }

    if (parts.length === 0) return "y = 0";
    return `y = ${parts.join(" ")}`;
  }, [activeMode, customExpr, a, b, c, d]);

  // First derivative equation LaTeX
  const derivativeLatex = useMemo(() => {
    if (activeMode === "custom") {
      return "f'(x) \\text{ (Đạo hàm số học)}";
    }

    const da = 3 * a;
    const db = 2 * b;
    const dc = c;

    if (da === 0 && db === 0 && dc === 0) return "y' = 0";

    const parts: string[] = [];
    if (da !== 0) {
      if (da === 1) parts.push("x^2");
      else if (da === -1) parts.push("-x^2");
      else parts.push(`${da}x^2`);
    }
    if (db !== 0) {
      const sign = db > 0 ? (parts.length > 0 ? "+ " : "") : "- ";
      const absDb = Math.abs(db);
      const dbStr = absDb === 1 ? "x" : `${absDb}x`;
      parts.push(`${sign}${dbStr}`);
    }
    if (dc !== 0) {
      const sign = dc > 0 ? (parts.length > 0 ? "+ " : "") : "- ";
      parts.push(`${sign}${Math.abs(dc)}`);
    }

    return `y' = ${parts.join(" ")}`;
  }, [activeMode, a, b, c]);

  // Math Analysis for Cubic Equation
  const mathAnalysis = useMemo(() => {
    if (activeMode === "custom") {
      return {
        isDegenerate: false,
        deltaPrime: null,
        numExtrema: 0,
        extrema: [],
        inflectionPoint: null,
        description: `Đang khảo sát hàm số tùy chọn: y = ${customExpr}`,
      };
    }

    if (a === 0) {
      return {
        isDegenerate: true,
        deltaPrime: null,
        numExtrema: b !== 0 ? 1 : 0,
        extrema: [],
        inflectionPoint: null,
        description: "Hàm số suy biến (a = 0): Đồ thị là Parabol hoặc đường thẳng.",
      };
    }

    const deltaPrime = Math.pow(b, 2) - 3 * a * c;
    const inflectionX = -b / (3 * a);
    const inflectionY = evaluateY(inflectionX);
    const inflectionPt = { x: inflectionX, y: inflectionY };

    if (deltaPrime > 0) {
      const x1 = (-b - Math.sqrt(deltaPrime)) / (3 * a);
      const x2 = (-b + Math.sqrt(deltaPrime)) / (3 * a);
      const y1 = evaluateY(x1);
      const y2 = evaluateY(x2);

      const pt1 = { x: x1, y: y1, type: a > 0 ? "Cực đại" : "Cực tiểu" };
      const pt2 = { x: x2, y: y2, type: a > 0 ? "Cực tiểu" : "Cực đại" };

      return {
        isDegenerate: false,
        deltaPrime,
        numExtrema: 2,
        extrema: [pt1, pt2],
        inflectionPoint: inflectionPt,
        description: "Hàm số có 2 điểm cực trị phân biệt (Δ' > 0).",
      };
    } else if (deltaPrime === 0) {
      return {
        isDegenerate: false,
        deltaPrime,
        numExtrema: 0,
        extrema: [],
        inflectionPoint: inflectionPt,
        description: a > 0 ? "Hàm số luôn đồng biến trên ℝ (Δ' = 0)." : "Hàm số luôn nghịch biến trên ℝ (Δ' = 0).",
      };
    } else {
      return {
        isDegenerate: false,
        deltaPrime,
        numExtrema: 0,
        extrema: [],
        inflectionPoint: inflectionPt,
        description: a > 0 ? "Hàm số luôn đồng biến trên ℝ (Δ' < 0)." : "Hàm số luôn nghịch biến trên ℝ (Δ' < 0).",
      };
    }
  }, [activeMode, customExpr, a, b, c, evaluateY]);

  // SVG Coordinates & Scales
  const SVG_WIDTH = 580;
  const SVG_HEIGHT = 340;
  const X_MIN = -5;
  const X_MAX = 5;
  const Y_MIN = -5;
  const Y_MAX = 5;

  const toSvgX = useCallback(
    (xVal: number) => ((xVal - X_MIN) / (X_MAX - X_MIN)) * SVG_WIDTH,
    [X_MIN, X_MAX, SVG_WIDTH]
  );

  const toSvgY = useCallback(
    (yVal: number) => SVG_HEIGHT - ((yVal - Y_MIN) / (Y_MAX - Y_MIN)) * SVG_HEIGHT,
    [Y_MIN, Y_MAX, SVG_HEIGHT]
  );

  const fromSvgCoords = useCallback(
    (svgX: number, svgY: number) => {
      const xVal = X_MIN + (svgX / SVG_WIDTH) * (X_MAX - X_MIN);
      const yVal = Y_MAX - (svgY / SVG_HEIGHT) * (Y_MAX - Y_MIN);
      return { x: xVal, y: yVal };
    },
    [X_MIN, X_MAX, Y_MIN, Y_MAX, SVG_WIDTH, SVG_HEIGHT]
  );

  // Generate SVG path for the curve (handles discontinuities / asymptotes cleanly)
  const curvePath = useMemo(() => {
    const samples = 260;
    const step = (X_MAX - X_MIN) / samples;
    const pathSegments: string[] = [];
    let currentSegment: string[] = [];
    let lastY = NaN;

    for (let i = 0; i <= samples; i++) {
      const xVal = X_MIN + i * step;
      const yVal = evaluateY(xVal);

      // Check if point is valid and not a discontinuity jump
      const isInvalid = isNaN(yVal) || !isFinite(yVal) || Math.abs(yVal) > 30;
      const isDiscontinuity = !isNaN(lastY) && Math.abs(yVal - lastY) > 12;

      if (isInvalid || isDiscontinuity) {
        if (currentSegment.length > 0) {
          pathSegments.push(currentSegment.join(" "));
          currentSegment = [];
        }
        lastY = NaN;
        continue;
      }

      const px = toSvgX(xVal);
      const py = toSvgY(yVal);

      if (currentSegment.length === 0) {
        currentSegment.push(`M ${px.toFixed(1)} ${py.toFixed(1)}`);
      } else {
        currentSegment.push(`L ${px.toFixed(1)} ${py.toFixed(1)}`);
      }

      lastY = yVal;
    }

    if (currentSegment.length > 0) {
      pathSegments.push(currentSegment.join(" "));
    }

    return pathSegments.join(" ");
  }, [evaluateY, toSvgX, toSvgY, X_MIN, X_MAX]);

  // Handle SVG Mouse Move for inspecting coordinates
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const svgX = (clientX / rect.width) * SVG_WIDTH;
    const svgY = (clientY / rect.height) * SVG_HEIGHT;

    const { x: mathX } = fromSvgCoords(svgX, svgY);
    const mathY = evaluateY(mathX);

    if (!isNaN(mathY) && isFinite(mathY)) {
      setHoverCoord({ x: mathX, y: mathY });
    } else {
      setHoverCoord(null);
    }
  };

  // Handle Touch Move for mobile inspection
  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = touch.clientX - rect.left;
    const clientY = touch.clientY - rect.top;

    const svgX = (clientX / rect.width) * SVG_WIDTH;
    const svgY = (clientY / rect.height) * SVG_HEIGHT;

    const { x: mathX } = fromSvgCoords(svgX, svgY);
    const mathY = evaluateY(mathX);

    if (!isNaN(mathY) && isFinite(mathY)) {
      setHoverCoord({ x: mathX, y: mathY });
    } else {
      setHoverCoord(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  // Table of values for x in [-3, 3]
  const tableValues = useMemo(() => {
    const xs = [-3, -2, -1, 0, 1, 2, 3];
    return xs.map((xVal) => {
      const yVal = evaluateY(xVal);
      const dy = evaluateDerivative(xVal);
      return {
        x: xVal,
        y: isNaN(yVal) ? "Không XĐ" : yVal.toFixed(2),
        dy: isNaN(dy) ? "Không XĐ" : dy.toFixed(2),
      };
    });
  }, [evaluateY, evaluateDerivative]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-xl space-y-5">
      {/* 1. Header with Mode Selector & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-base text-white tracking-tight">
              Phòng Thí Nghiệm & Khảo Sát Đồ Thị Hàm Số 12
            </h3>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Khảo sát Giải tích
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Tự do nhập hàm số bất kỳ • Vẽ tiếp tuyến tại điểm • Lập bảng giá trị • Khảo sát tính đơn điệu & cực trị
          </p>
        </div>

        {/* Mode Toggle & Reset */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveMode("custom")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeMode === "custom"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nhập hàm số tự do f(x)</span>
              <span className="sm:hidden">Hàm f(x)</span>
            </button>
            <button
              onClick={() => setActiveMode("cubic")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeMode === "cubic"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Họ hàm bậc ba (a, b, c, d)</span>
              <span className="sm:hidden">Hàm bậc 3</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/80 shadow-xs shrink-0"
            title="Đặt lại hàm số ban đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CUSTOM EXPRESSION INPUT BAR (FEATURE: NHẬP HÀM SỐ BẤT KỲ) */}
      {activeMode === "custom" && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-orange-500/30 space-y-3 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nhập biểu thức hàm số y = f(x):</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customExpr}
                  onChange={(e) => setCustomExpr(e.target.value)}
                  placeholder="Ví dụ: x^3 - 3*x + 2, (2*x + 1)/(x - 1), x^4 - 2*x^2 + 1, sin(x)..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none shadow-inner"
                />
              </div>
              {evaluator.error && (
                <span className="text-[11px] text-rose-400 block pt-0.5">
                  Lỗi cú pháp: {evaluator.error}
                </span>
              )}
            </div>

            {/* Current Math LaTeX Display */}
            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-2 self-start sm:self-end">
              <span className="text-xs text-slate-400">Hiển thị:</span>
              <div className="font-serif text-sm font-bold text-orange-300">
                <MathRenderer text={`$${latexEquation}$`} />
              </div>
            </div>
          </div>

          {/* Quick Presets for Common 12th Grade Functions */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-slate-900">
            <span className="text-[11px] text-slate-500 mr-1 shrink-0">Hàm số mẫu:</span>
            <button
              onClick={() => applyPresetFunction("x^3 - 3*x + 2")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-800 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Bậc 3: y = x³ - 3x + 2
            </button>
            <button
              onClick={() => applyPresetFunction("-x^3 + 3*x")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-800 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Bậc 3 (a &lt; 0): y = -x³ + 3x
            </button>
            <button
              onClick={() => applyPresetFunction("x^4 - 2*x^2 + 1")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-800 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Trùng phương: y = x⁴ - 2x² + 1
            </button>
            <button
              onClick={() => applyPresetFunction("(2*x + 1)/(x - 1)")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-cyan-300 border border-cyan-900/40 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Nhất biến: y = (2x+1)/(x-1)
            </button>
            <button
              onClick={() => applyPresetFunction("(x^2 - 2*x + 2)/(x - 1)")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-purple-300 border border-purple-900/40 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Bậc 2/1: y = (x²-2x+2)/(x-1)
            </button>
            <button
              onClick={() => applyPresetFunction("sin(x)")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-emerald-300 border border-emerald-900/40 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Lượng giác: y = sin(x)
            </button>
          </div>
        </div>
      )}

      {/* Warning if Degenerate in cubic mode */}
      {activeMode === "cubic" && a === 0 && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Chú ý:</strong> Khi <span className="font-mono">a = 0</span>, đồ thị suy biến thành{" "}
            {b !== 0 ? "Parabol hàm số bậc hai" : "đường thẳng"} chứ không còn là đường cong bậc ba.
          </span>
        </div>
      )}

      {/* 3. Main Workspace: Graph Area (8 cols) + Analytical Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Graph SVG Screen (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-2 sm:p-3 relative overflow-hidden shadow-2xl">
          {/* Top overlay: Derivative formula & Hover badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 flex-wrap pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-xs text-blue-300 font-mono shadow-md">
              <MathRenderer text={`$${derivativeLatex}$`} />
            </div>
            {hoverCoord && (
              <div className="bg-orange-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-orange-500/30 text-xs text-orange-300 font-mono shadow-md">
                x = {hoverCoord.x.toFixed(2)}, y = {hoverCoord.y.toFixed(2)}
              </div>
            )}
          </div>

          {/* Graph Legend */}
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Đồ thị y = f(x)
            </span>
            {showTangent && tangentProps && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Tiếp tuyến tại x₀
              </span>
            )}
            {activeMode === "cubic" && mathAnalysis.extrema.length > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Cực trị
              </span>
            )}
          </div>

          {/* SVG Canvas */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-auto max-h-[360px] cursor-crosshair select-none block touch-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
          >
            <defs>
              <clipPath id="graphClip">
                <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} rx="12" />
              </clipPath>
            </defs>

            <g clipPath="url(#graphClip)">
              {/* Background Cartesian Grid Lines */}
              {Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => X_MIN + i).map((xVal) => {
                const px = toSvgX(xVal);
                const isAxis = xVal === 0;
                return (
                  <g key={`v-${xVal}`}>
                    <line
                      x1={px}
                      y1={0}
                      x2={px}
                      y2={SVG_HEIGHT}
                      stroke={isAxis ? "#64748b" : "#1e293b"}
                      strokeWidth={isAxis ? 1.5 : 0.6}
                      strokeDasharray={isAxis ? undefined : "2 2"}
                    />
                    {!isAxis && (
                      <text
                        x={px}
                        y={toSvgY(0) + 12}
                        fill="#64748b"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {xVal}
                      </text>
                    )}
                  </g>
                );
              })}

              {Array.from({ length: Y_MAX - Y_MIN + 1 }, (_, i) => Y_MIN + i).map((yVal) => {
                const py = toSvgY(yVal);
                const isAxis = yVal === 0;
                return (
                  <g key={`h-${yVal}`}>
                    <line
                      x1={0}
                      y1={py}
                      x2={SVG_WIDTH}
                      y2={py}
                      stroke={isAxis ? "#64748b" : "#1e293b"}
                      strokeWidth={isAxis ? 1.5 : 0.6}
                      strokeDasharray={isAxis ? undefined : "2 2"}
                    />
                    {!isAxis && (
                      <text
                        x={toSvgX(0) - 8}
                        y={py + 3}
                        fill="#64748b"
                        fontSize="9"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {yVal}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Axis Labels (O, x, y) */}
              <text x={toSvgX(0) - 10} y={toSvgY(0) + 12} fill="#94a3b8" fontSize="11" fontWeight="bold">
                O
              </text>
              <text x={SVG_WIDTH - 12} y={toSvgY(0) - 8} fill="#94a3b8" fontSize="11" fontWeight="bold">
                x
              </text>
              <text x={toSvgX(0) + 8} y={14} fill="#94a3b8" fontSize="11" fontWeight="bold">
                y
              </text>

              {/* Main Curve y = f(x) */}
              {curvePath && (
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Tangent Line at x0 */}
              {showTangent && tangentProps && (
                (() => {
                  const pX1 = X_MIN;
                  const pY1 = tangentProps.slopeK * pX1 + tangentProps.interceptM;
                  const pX2 = X_MAX;
                  const pY2 = tangentProps.slopeK * pX2 + tangentProps.interceptM;

                  const sX1 = toSvgX(pX1);
                  const sY1 = toSvgY(pY1);
                  const sX2 = toSvgX(pX2);
                  const sY2 = toSvgY(pY2);

                  const pt0X = toSvgX(tangentProps.x0);
                  const pt0Y = toSvgY(tangentProps.y0);

                  return (
                    <g key="tangent-group">
                      <line
                        x1={sX1}
                        y1={sY1}
                        x2={sX2}
                        y2={sY2}
                        stroke="#fbbf24"
                        strokeWidth="1.8"
                        strokeDasharray="5 3"
                      />
                      {/* Tangent point M0 */}
                      <circle cx={pt0X} cy={pt0Y} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <text
                        x={pt0X + 8}
                        y={pt0Y - 8}
                        fill="#fde047"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        M₀({tangentProps.x0.toFixed(1)}, {tangentProps.y0.toFixed(1)})
                      </text>
                    </g>
                  );
                })()
              )}

              {/* Extrema Points in Cubic Mode */}
              {activeMode === "cubic" &&
                mathAnalysis.extrema.map((pt, i) => {
                  if (pt.x < X_MIN || pt.x > X_MAX || pt.y < Y_MIN || pt.y > Y_MAX) return null;
                  const px = toSvgX(pt.x);
                  const py = toSvgY(pt.y);
                  const isMax = pt.type === "Cực đại";
                  return (
                    <g key={`extrema-${i}`}>
                      <circle
                        cx={px}
                        cy={py}
                        r="4.5"
                        fill={isMax ? "#10b981" : "#3b82f6"}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={px}
                        y={isMax ? py - 8 : py + 14}
                        fill={isMax ? "#34d399" : "#60a5fa"}
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        ({pt.x.toFixed(1)}, {pt.y.toFixed(1)})
                      </text>
                    </g>
                  );
                })}

              {/* Hover Crosshair */}
              {hoverCoord && (
                <g>
                  <circle
                    cx={toSvgX(hoverCoord.x)}
                    cy={toSvgY(hoverCoord.y)}
                    r="4"
                    fill="#f97316"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Analytical Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-slate-800 pb-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <span>Phân Tích & Tiếp Tuyến</span>
          </div>

          {/* Tangent Line Controller */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <span>Tiếp tuyến tại x₀:</span>
              </span>
              <button
                onClick={() => setShowTangent(!showTangent)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                  showTangent ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-slate-800 text-slate-500"
                }`}
              >
                {showTangent ? "Bật" : "Tắt"}
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-[11px]">Hoành độ tiếp điểm x₀:</span>
                <span className="font-mono text-amber-300 font-bold">{x0.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.1"
                value={x0}
                onChange={(e) => setX0(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {tangentProps && (
              <div className="pt-1 text-[11px] font-mono text-amber-200">
                <span className="text-slate-400 font-sans block text-[10px]">Phương trình tiếp tuyến:</span>
                <strong className="text-amber-300">{tangentProps.equationStr}</strong>
                <span className="block text-[10px] text-slate-400 font-sans">
                  Hệ số góc k = f&apos;(x₀) = {tangentProps.slopeK.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Table of Values */}
          <div className="space-y-1.5">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Bảng giá trị (x, y, y&apos;):
            </span>
            <div className="max-h-36 overflow-y-auto border border-slate-800 rounded-xl bg-slate-900/60 font-mono text-[11px]">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/80">
                    <th className="py-1">x</th>
                    <th className="py-1">f(x)</th>
                    <th className="py-1">f&apos;(x)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tableValues.map((row) => (
                    <tr key={`val-${row.x}`} className="hover:bg-slate-800/40">
                      <td className="py-1 font-bold text-slate-300">{row.x}</td>
                      <td className="py-1 text-orange-300">{row.y}</td>
                      <td className="py-1 text-blue-300">{row.dy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status description for cubic mode */}
          {activeMode === "cubic" && (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-orange-400 block mb-0.5">Trạng thái:</strong>
              {mathAnalysis.description}
            </div>
          )}
        </div>
      </div>

      {/* 4. COEFFICIENT CONTROL CARDS (ONLY IN CUBIC MODE) */}
      {activeMode === "cubic" && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-orange-400" />
              <span>Thanh Điều Khiển 4 Hệ Số (a, b, c, d)</span>
            </div>
          </div>

          {/* 4 Interactive Slider Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Slider A */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-400">Hệ số a (Bậc 3)</span>
                <span className="font-mono font-bold text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-md">
                  {a}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Slider B */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400">Hệ số b (Bậc 2)</span>
                <span className="font-mono font-bold text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md">
                  {b}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Slider C */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">Hệ số c (Bậc 1)</span>
                <span className="font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                  {c}
                </span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Slider D */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400">Hệ số d (Hằng số)</span>
                <span className="font-mono font-bold text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md">
                  {d}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={d}
                onChange={(e) => setD(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
