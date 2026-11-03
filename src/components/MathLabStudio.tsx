"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Sliders,
  Table,
  Image as ImageIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass,
  Save,
  Check,
  AlertCircle,
  HelpCircle,
  Activity,
  Calculator,
} from "lucide-react";
import { createMathEvaluator } from "@/utils/mathParser";
import MathRenderer from "./MathRenderer";

export interface CustomFunctionItem {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  name: string;
}

export interface DataPoint {
  id: string;
  x: number;
  y: number;
}

export interface GeometryPoint {
  name: string;
  x: number;
  y: number;
  color: string;
}

export interface MathLabSession {
  id: string;
  title: string;
  updatedAt: string;
  functions: CustomFunctionItem[];
  paramM: number;
  points: GeometryPoint[];
  tableData: DataPoint[];
  viewport: { xMin: number; xMax: number; yMin: number; yMax: number };
}

interface MathLabStudioProps {
  isOpen: boolean;
  onClose: () => void;
  initialFunction?: string;
  initialFormula?: string;
}

const PRESET_COLORS = [
  "#f97316", // Orange
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#a855f7", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#eab308", // Yellow
];

const STORAGE_KEY = "math12pro_mathlab_sessions";

export default function MathLabStudio({
  isOpen,
  onClose,
  initialFunction,
  initialFormula,
}: MathLabStudioProps) {
  const formulaToUse = initialFormula || initialFunction;

  // Navigation tabs within MathLab
  const [activeTab, setActiveTab] = useState<"functions" | "table" | "geometry" | "image" | "settings">("functions");

  // Viewport Settings
  const [xMin, setXMin] = useState<number>(-6);
  const [xMax, setXMax] = useState<number>(6);
  const [yMin, setYMin] = useState<number>(-6);
  const [yMax, setYMax] = useState<number>(6);
  const [gridStep, setGridStep] = useState<number>(1);

  // Dynamic Parameter m
  const [paramM, setParamM] = useState<number>(1);

  // Functions List
  const [functions, setFunctions] = useState<CustomFunctionItem[]>([
    {
      id: "fn-1",
      expression: initialFunction || initialFormula || "x^3 - 3x + 1",
      color: "#f97316",
      visible: true,
      name: "f(x)",
    },
    {
      id: "fn-2",
      expression: "2x - 1",
      color: "#3b82f6",
      visible: true,
      name: "g(x)",
    },
  ]);

  // Sync formula if updated from outside
  const [prevFormula, setPrevFormula] = useState(formulaToUse);
  if (formulaToUse !== prevFormula) {
    setPrevFormula(formulaToUse);
    if (formulaToUse) {
      setFunctions([
        {
          id: "fn-1",
          expression: formulaToUse,
          color: "#f97316",
          visible: true,
          name: "f(x)",
        },
      ]);
    }
  }

  // Data Table (Scatter Data)
  const [tableData, setTableData] = useState<DataPoint[]>([
    { id: "p1", x: -2, y: -3 },
    { id: "p2", x: -1, y: -1 },
    { id: "p3", x: 0, y: 1 },
    { id: "p4", x: 1, y: 3 },
    { id: "p5", x: 2, y: 5 },
  ]);
  const [csvInput, setCsvInput] = useState<string>("");
  const [showConnectLine, setShowConnectLine] = useState<boolean>(true);

  // Geometry Points
  const [geomPointA, setGeomPointA] = useState<GeometryPoint>({ name: "A", x: -2, y: -1, color: "#ef4444" });
  const [geomPointB, setGeomPointB] = useState<GeometryPoint>({ name: "B", x: 3, y: 4, color: "#10b981" });
  const [showGeomLine, setShowGeomLine] = useState<boolean>(true);

  // Image Upload Lab
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(100);
  const [imageRotation, setImageRotation] = useState<number>(0);

  // Hover Coordinates
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Sessions Management
  const [savedSessions, setSavedSessions] = useState<MathLabSession[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedSessions(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);
  const [sessionTitle, setSessionTitle] = useState<string>("Bài toán của tôi");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  // Evaluators cache
  const evaluators = useMemo(() => {
    return functions.map((fn) => {
      const evaluator = createMathEvaluator(fn.expression);
      return {
        id: fn.id,
        evaluator,
        color: fn.color,
        visible: fn.visible,
        name: fn.name,
      };
    });
  }, [functions]);

  // Coordinate Conversion Functions
  const SVG_WIDTH = 640;
  const SVG_HEIGHT = 440;

  const toSvgX = useCallback(
    (xVal: number) => ((xVal - xMin) / (xMax - xMin)) * SVG_WIDTH,
    [xMin, xMax, SVG_WIDTH]
  );

  const toSvgY = useCallback(
    (yVal: number) => SVG_HEIGHT - ((yVal - yMin) / (yMax - yMin)) * SVG_HEIGHT,
    [yMin, yMax, SVG_HEIGHT]
  );

  const fromSvgCoords = useCallback(
    (svgX: number, svgY: number) => {
      const xVal = xMin + (svgX / SVG_WIDTH) * (xMax - xMin);
      const yVal = yMax - (svgY / SVG_HEIGHT) * (yMax - yMin);
      return { x: xVal, y: yVal };
    },
    [xMin, xMax, yMin, yMax, SVG_WIDTH, SVG_HEIGHT]
  );

  // Handle Mouse Move for live inspection
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const svgX = (clientX / rect.width) * SVG_WIDTH;
    const svgY = (clientY / rect.height) * SVG_HEIGHT;

    setHoverCoord(fromSvgCoords(svgX, svgY));
  };

  // Add a new function
  const handleAddFunction = () => {
    const nextIndex = functions.length + 1;
    const color = PRESET_COLORS[(nextIndex - 1) % PRESET_COLORS.length];
    setFunctions((prev) => [
      ...prev,
      {
        id: `fn-${Date.now()}`,
        expression: "x^2",
        color,
        visible: true,
        name: `f${nextIndex}(x)`,
      },
    ]);
  };

  // Update a function
  const handleUpdateFunction = (id: string, updates: Partial<CustomFunctionItem>) => {
    setFunctions((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  // Remove a function
  const handleRemoveFunction = (id: string) => {
    setFunctions((prev) => prev.filter((f) => f.id !== id));
  };

  // CSV Data Import
  const handleImportCsv = () => {
    if (!csvInput.trim()) return;
    const lines = csvInput.trim().split("\n");
    const parsed: DataPoint[] = [];

    lines.forEach((line, idx) => {
      const parts = line.split(/[,\t ]+/).map((p) => p.trim());
      if (parts.length >= 2) {
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        if (!isNaN(x) && !isNaN(y)) {
          parsed.push({ id: `csv-${idx}-${Date.now()}`, x, y });
        }
      }
    });

    if (parsed.length > 0) {
      setTableData(parsed);
      setCsvInput("");
    }
  };

  // Geometry calculations between Point A and Point B
  const geomDistance = useMemo(() => {
    return Math.sqrt(Math.pow(geomPointB.x - geomPointA.x, 2) + Math.pow(geomPointB.y - geomPointA.y, 2));
  }, [geomPointA, geomPointB]);

  const geomMidpoint = useMemo(() => {
    return {
      x: (geomPointA.x + geomPointB.x) / 2,
      y: (geomPointA.y + geomPointB.y) / 2,
    };
  }, [geomPointA, geomPointB]);

  const geomLineEquation = useMemo(() => {
    const dx = geomPointB.x - geomPointA.x;
    const dy = geomPointB.y - geomPointA.y;

    if (Math.abs(dx) < 1e-9) {
      return `x = ${geomPointA.x.toFixed(2)}`;
    }

    const slope = dy / dx;
    const intercept = geomPointA.y - slope * geomPointA.x;

    const slopeStr = slope === 1 ? "x" : slope === -1 ? "-x" : `${slope.toFixed(2)}x`;
    const interceptStr = intercept > 0 ? `+ ${intercept.toFixed(2)}` : intercept < 0 ? `- ${Math.abs(intercept).toFixed(2)}` : "";

    return `y = ${slopeStr} ${interceptStr}`.trim();
  }, [geomPointA, geomPointB]);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save current session
  const handleSaveSession = () => {
    const newSession: MathLabSession = {
      id: `session-${Date.now()}`,
      title: sessionTitle || `Phiên ${new Date().toLocaleDateString("vi-VN")}`,
      updatedAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      functions,
      paramM,
      points: [geomPointA, geomPointB],
      tableData,
      viewport: { xMin, xMax, yMin, yMax },
    };

    const updated = [newSession, ...savedSessions.slice(0, 9)];
    setSavedSessions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveSuccessMsg("Đã lưu phiên thành công!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
    } catch {
      // ignore
    }
  };

  // Restore session
  const handleLoadSession = (session: MathLabSession) => {
    setFunctions(session.functions);
    setParamM(session.paramM ?? 1);
    if (session.points?.[0]) setGeomPointA(session.points[0]);
    if (session.points?.[1]) setGeomPointB(session.points[1]);
    if (session.tableData) setTableData(session.tableData);
    if (session.viewport) {
      setXMin(session.viewport.xMin);
      setXMax(session.viewport.xMax);
      setYMin(session.viewport.yMin);
      setYMax(session.viewport.yMax);
    }
    setSaveSuccessMsg(`Đã tải: ${session.title}`);
    setTimeout(() => setSaveSuccessMsg(""), 2500);
  };

  // Auto-fit viewport
  const handleAutoFit = () => {
    setXMin(-6);
    setXMax(6);
    setYMin(-6);
    setYMax(6);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 w-full max-w-7xl max-h-[96vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* ========================================================================= */}
        {/* HEADER */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  Phòng Thí Nghiệm Toán Học (MathLab Studio)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  Tương Tác Tự Do
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Nhập hàm số bất kỳ, số liệu thực nghiệm, tọa độ điểm hình học & hình ảnh đề bài
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSession}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Lưu phiên làm việc hiện tại"
            >
              <Save className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Lưu phiên</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Đóng phòng thí nghiệm"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Notification Banner */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-emerald-400 flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN SPLIT WORKSPACE: LEFT TOOLS (40%) + RIGHT GRAPH CANVAS (60%) */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* LEFT CONTROLS PANEL (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-900/90 border-r border-slate-800 flex flex-col overflow-hidden">
            {/* Tool Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 border-b border-slate-800 text-xs overflow-x-auto select-none">
              <button
                onClick={() => setActiveTab("functions")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "functions" ? "bg-orange-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Hàm số ({functions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "table" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Bảng số liệu ({tableData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("geometry")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "geometry" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Hình học</span>
              </button>

              <button
                onClick={() => setActiveTab("image")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "image" ? "bg-purple-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Đề bài ảnh</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "settings" ? "bg-slate-700 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Hệ trục</span>
              </button>
            </div>

            {/* Panel Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* TAB 1: FUNCTIONS */}
              {activeTab === "functions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Danh sách hàm số khảo sát
                    </span>
                    <button
                      onClick={handleAddFunction}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 text-xs font-semibold border border-orange-500/30 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm hàm</span>
                    </button>
                  </div>

                  {/* Functions List */}
                  <div className="space-y-2.5">
                    {functions.map((fn) => {
                      const evalResult = evaluators.find((e) => e.id === fn.id)?.evaluator;
                      const hasError = !!evalResult?.error;

                      return (
                        <div
                          key={fn.id}
                          className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 shadow-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              {/* Color Badge */}
                              <input
                                type="color"
                                value={fn.color}
                                onChange={(e) => handleUpdateFunction(fn.id, { color: e.target.value })}
                                className="w-5 h-5 rounded-md border-0 bg-transparent cursor-pointer"
                                title="Đổi màu nét vẽ"
                              />

                              <span className="font-mono text-xs font-bold" style={{ color: fn.color }}>
                                y =
                              </span>

                              {/* Expression Input */}
                              <input
                                type="text"
                                value={fn.expression}
                                onChange={(e) => handleUpdateFunction(fn.id, { expression: e.target.value })}
                                placeholder="VD: x^3 - 3*x + 1"
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-mono text-white focus:ring-1 focus:ring-orange-500 focus:outline-none"
                              />
                            </div>

                            {/* Visibility & Delete */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateFunction(fn.id, { visible: !fn.visible })}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                title={fn.visible ? "Ẩn đồ thị" : "Hiện đồ thị"}
                              >
                                {fn.visible ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
                              </button>

                              {functions.length > 1 && (
                                <button
                                  onClick={() => handleRemoveFunction(fn.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                                  title="Xóa hàm số này"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Error or KaTeX Preview */}
                          {hasError ? (
                            <div className="text-[11px] text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-1.5 rounded-lg">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{evalResult?.error}</span>
                            </div>
                          ) : (
                            <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono px-1">
                              <span>Hàm số hợp lệ</span>
                              <span className="text-slate-500 font-sans">
                                Tại x=1: <strong className="text-slate-300">{evalResult?.evaluate(1, paramM).toFixed(2)}</strong>
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Parameter Slider (m) */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" />
                        Tham số động m:
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        m = {paramM}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={paramM}
                      onChange={(e) => setParamM(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                    />
                    <p className="text-[10px] text-slate-500">
                      Mẹo: Nhập biểu thức chứa biến <span className="font-mono text-amber-300">m</span> (ví dụ: <span className="font-mono text-slate-300">x^2 - 2*m*x + 1</span>) để khảo sát họ đường cong theo tham số!
                    </p>
                  </div>

                  {/* Syntax Guide Quick Card */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      Cú pháp hàm số hỗ trợ:
                    </span>
                    <div className="text-slate-300 py-1">
                      <MathRenderer text={"Hỗ trợ các hàm $y = x^3 - 3x + 1$, $y = \\frac{x^2 - 1}{x - 1}$, $y = \\sin(x)$, $y = \\sqrt{x}$, $y = e^x$, $y = \\ln(x)$"} />
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-400 font-mono text-[10px]">
                      <li>Đa thức: <span className="text-slate-300">x^3 - 3*x + 2</span>, <span className="text-slate-300">2x^2 + 1</span></li>
                      <li>Phân thức: <span className="text-slate-300">(x^2 - 1)/(x - 1)</span></li>
                      <li>Lượng giác: <span className="text-slate-300">sin(x)</span>, <span className="text-slate-300">cos(x)</span>, <span className="text-slate-300">tan(x)</span></li>
                      <li>Mũ & Lôgarit: <span className="text-slate-300">exp(x)</span>, <span className="text-slate-300">ln(x)</span>, <span className="text-slate-300">sqrt(x)</span></li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: DATA TABLE */}
              {activeTab === "table" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Bảng Số Liệu Thực Nghiệm (X, Y)
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showConnectLine}
                          onChange={(e) => setShowConnectLine(e.target.checked)}
                          className="accent-blue-500 rounded cursor-pointer"
                        />
                        <span>Nối điểm</span>
                      </label>
                    </div>
                  </div>

                  {/* Points Table */}
                  <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] sticky top-0">
                        <tr>
                          <th className="p-2">#</th>
                          <th className="p-2">X</th>
                          <th className="p-2">Y</th>
                          <th className="p-2 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {tableData.map((pt, i) => (
                          <tr key={pt.id} className="hover:bg-slate-900/40">
                            <td className="p-2 text-slate-500">{i + 1}</td>
                            <td className="p-2">
                              <input
                                type="number"
                                step="any"
                                value={pt.x}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setTableData((prev) =>
                                    prev.map((item) => (item.id === pt.id ? { ...item, x: val } : item))
                                  );
                                }}
                                className="w-16 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-white"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                step="any"
                                value={pt.y}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setTableData((prev) =>
                                    prev.map((item) => (item.id === pt.id ? { ...item, y: val } : item))
                                  );
                                }}
                                className="w-16 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-white"
                              />
                            </td>
                            <td className="p-2 text-right">
                              <button
                                onClick={() => setTableData((prev) => prev.filter((item) => item.id !== pt.id))}
                                className="text-slate-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() =>
                      setTableData((prev) => [
                        ...prev,
                        { id: `p-${Date.now()}`, x: prev.length, y: prev.length * 2 },
                      ])
                    }
                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm hàng điểm</span>
                  </button>

                  {/* CSV Quick Paste */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">
                      Dán dữ liệu từ Excel / CSV:
                    </span>
                    <textarea
                      rows={3}
                      value={csvInput}
                      onChange={(e) => setCsvInput(e.target.value)}
                      placeholder="0, 1&#10;1, 3&#10;2, 5"
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={handleImportCsv}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                    >
                      Nạp dữ liệu vào đồ thị
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: GEOMETRY */}
              {activeTab === "geometry" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Khảo Sát Điểm & Đo Đạc Hình Học
                  </span>

                  {/* Point A */}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-400">Điểm A</span>
                      <span className="font-mono text-slate-400">({geomPointA.x}, {geomPointA.y})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500">Hoành độ xA:</label>
                        <input
                          type="number"
                          step="0.5"
                          value={geomPointA.x}
                          onChange={(e) => setGeomPointA((p) => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Tung độ yA:</label>
                        <input
                          type="number"
                          step="0.5"
                          value={geomPointA.y}
                          onChange={(e) => setGeomPointA((p) => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Point B */}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400">Điểm B</span>
                      <span className="font-mono text-slate-400">({geomPointB.x}, {geomPointB.y})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500">Hoành độ xB:</label>
                        <input
                          type="number"
                          step="0.5"
                          value={geomPointB.x}
                          onChange={(e) => setGeomPointB((p) => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Tung độ yB:</label>
                        <input
                          type="number"
                          step="0.5"
                          value={geomPointB.y}
                          onChange={(e) => setGeomPointB((p) => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Geometry Calculations Result */}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-300 block text-[11px] uppercase tracking-wider">
                      Kết Quả Tính Toán Tự Động:
                    </span>
                    <div className="space-y-1 font-mono text-slate-300">
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>Khoảng cách AB:</span>
                        <strong className="text-amber-400">{geomDistance.toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>Trung điểm M:</span>
                        <strong className="text-blue-400">({geomMidpoint.x.toFixed(2)}, {geomMidpoint.y.toFixed(2)})</strong>
                      </div>
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>PT đường thẳng AB:</span>
                        <strong className="text-emerald-400">{geomLineEquation}</strong>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1 text-slate-300">
                      <input
                        type="checkbox"
                        checked={showGeomLine}
                        onChange={(e) => setShowGeomLine(e.target.checked)}
                        className="rounded text-emerald-500"
                      />
                      <span>Vẽ đoạn thẳng nối A và B</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 4: IMAGE LAB */}
              {activeTab === "image" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Đề Bài Hình Ảnh & Sơ Đồ
                  </span>

                  {uploadedImage ? (
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-2 flex items-center justify-center min-h-[180px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uploadedImage}
                          alt="Đề bài tải lên"
                          className="max-h-[220px] object-contain transition-transform duration-200"
                          style={{
                            transform: `scale(${imageZoom / 100}) rotate(${imageRotation}deg)`,
                          }}
                        />
                      </div>

                      {/* Image Controls */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setImageZoom((z) => Math.max(50, z - 20))}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Thu nhỏ"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] font-mono px-1">{imageZoom}%</span>
                          <button
                            onClick={() => setImageZoom((z) => Math.min(250, z + 20))}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Phóng to"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setImageRotation((r) => (r + 90) % 360)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
                            title="Xoay 90 độ"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Xoay</span>
                          </button>

                          <button
                            onClick={() => setUploadedImage(null)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                            title="Xóa hình ảnh"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl text-center space-y-2">
                      <ImageIcon className="w-8 h-8 text-slate-500 mx-auto" />
                      <p className="text-xs text-slate-400">
                        Tải ảnh chụp đề bài, đồ thị hoặc sơ đồ hình học (PNG, JPG, WebP)
                      </p>
                      <label className="inline-block px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer text-xs">
                        <span>Chọn tệp ảnh</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: VIEWPORT SETTINGS & SESSIONS */}
              {activeTab === "settings" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cài Đặt Hệ Trục Tọa Độ & Khung Nhìn
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">X Min:</label>
                      <input
                        type="number"
                        value={xMin}
                        onChange={(e) => setXMin(parseFloat(e.target.value) || -10)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">X Max:</label>
                      <input
                        type="number"
                        value={xMax}
                        onChange={(e) => setXMax(parseFloat(e.target.value) || 10)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Y Min:</label>
                      <input
                        type="number"
                        value={yMin}
                        onChange={(e) => setYMin(parseFloat(e.target.value) || -10)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Y Max:</label>
                      <input
                        type="number"
                        value={yMax}
                        onChange={(e) => setYMax(parseFloat(e.target.value) || 10)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-mono text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-slate-400 block mb-1">Bước chia lưới (Grid step):</label>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={gridStep}
                        onChange={(e) => setGridStep(Math.max(0.2, parseFloat(e.target.value) || 1))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-mono text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAutoFit}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Tự động đặt lại khung chuẩn (-6 đến 6)</span>
                  </button>

                  {/* Save Session Section */}
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <label className="text-[11px] text-slate-400 block font-semibold">
                      Lưu phiên làm việc vào thiết bị:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                        placeholder="Đặt tên phiên..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 font-medium text-white text-xs focus:outline-none"
                      />
                      <button
                        onClick={handleSaveSession}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Lưu</span>
                      </button>
                    </div>
                    {saveSuccessMsg && (
                      <span className="text-[11px] text-emerald-400 block">{saveSuccessMsg}</span>
                    )}
                  </div>

                  {/* Saved Sessions list */}
                  {savedSessions.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Các phiên đã lưu:
                      </span>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {savedSessions.map((ses) => (
                          <div
                            key={ses.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                          >
                            <div>
                              <strong className="text-slate-200 block">{ses.title}</strong>
                              <span className="text-[10px] text-slate-500">{ses.updatedAt}</span>
                            </div>
                            <button
                              onClick={() => handleLoadSession(ses)}
                              className="px-2 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-[11px] font-semibold"
                            >
                              Mở
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT GRAPH WORKSPACE (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-950 p-3 sm:p-5 flex flex-col justify-between relative overflow-hidden">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between gap-2 z-10 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm">
                  Oxy: [{xMin}, {xMax}] × [{yMin}, {yMax}]
                </span>

                {hoverCoord && (
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 text-xs font-mono text-orange-300">
                    x = {hoverCoord.x.toFixed(2)}, y = {hoverCoord.y.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Functions Legend Pill */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-[280px]">
                {functions.filter((f) => f.visible).map((fn) => (
                  <span
                    key={fn.id}
                    className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800"
                    style={{ color: fn.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: fn.color }} />
                    {fn.expression}
                  </span>
                ))}
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="flex-1 flex items-center justify-center relative min-h-[360px] overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-inner">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                className="w-full h-full max-h-[440px] cursor-crosshair select-none block"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverCoord(null)}
              >
                <defs>
                  <clipPath id="studioGraphClip">
                    <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} rx="12" />
                  </clipPath>
                </defs>

                <g clipPath="url(#studioGraphClip)">
                  {/* Grid Lines */}
                  {/* Vertical lines */}
                  {Array.from(
                    { length: Math.floor((xMax - xMin) / gridStep) + 1 },
                    (_, i) => Math.ceil(xMin / gridStep) * gridStep + i * gridStep
                  ).map((xVal) => {
                    if (xVal < xMin || xVal > xMax) return null;
                    const px = toSvgX(xVal);
                    const isAxis = Math.abs(xVal) < 1e-6;

                    return (
                      <g key={`vgrid-${xVal}`}>
                        <line
                          x1={px}
                          y1={0}
                          x2={px}
                          y2={SVG_HEIGHT}
                          stroke={isAxis ? "#94a3b8" : "#1e293b"}
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

                  {/* Horizontal lines */}
                  {Array.from(
                    { length: Math.floor((yMax - yMin) / gridStep) + 1 },
                    (_, i) => Math.ceil(yMin / gridStep) * gridStep + i * gridStep
                  ).map((yVal) => {
                    if (yVal < yMin || yVal > yMax) return null;
                    const py = toSvgY(yVal);
                    const isAxis = Math.abs(yVal) < 1e-6;

                    return (
                      <g key={`hgrid-${yVal}`}>
                        <line
                          x1={0}
                          y1={py}
                          x2={SVG_WIDTH}
                          y2={py}
                          stroke={isAxis ? "#94a3b8" : "#1e293b"}
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

                  {/* Axis Origin & Directions */}
                  <text
                    x={toSvgX(0) - 10}
                    y={toSvgY(0) + 12}
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    O
                  </text>
                  <text
                    x={SVG_WIDTH - 14}
                    y={toSvgY(0) - 6}
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    x
                  </text>
                  <text
                    x={toSvgX(0) + 8}
                    y={16}
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    y
                  </text>

                  {/* Render Curves for all active functions */}
                  {evaluators.map((fn) => {
                    if (!fn.visible || fn.evaluator.error) return null;

                    const samples = 260;
                    const step = (xMax - xMin) / samples;
                    const paths: string[] = [];
                    let currentPath = "";

                    for (let i = 0; i <= samples; i++) {
                      const xVal = xMin + i * step;
                      const yVal = fn.evaluator.evaluate(xVal, paramM);

                      // Discontinuity or asymptote detection
                      if (isNaN(yVal) || !isFinite(yVal) || yVal < yMin - 15 || yVal > yMax + 15) {
                        if (currentPath) {
                          paths.push(currentPath);
                          currentPath = "";
                        }
                        continue;
                      }

                      const px = toSvgX(xVal);
                      const py = toSvgY(yVal);

                      if (!currentPath) {
                        currentPath = `M ${px.toFixed(1)} ${py.toFixed(1)}`;
                      } else {
                        currentPath += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
                      }
                    }

                    if (currentPath) paths.push(currentPath);

                    return (
                      <g key={fn.id}>
                        {paths.map((d, pIdx) => (
                          <path
                            key={pIdx}
                            d={d}
                            fill="none"
                            stroke={fn.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-75"
                          />
                        ))}
                      </g>
                    );
                  })}

                  {/* Render Data Table Scatter Points & Line */}
                  {tableData.length > 0 && (
                    <g>
                      {/* Connecting Line */}
                      {showConnectLine && tableData.length > 1 && (
                        <path
                          d={tableData
                            .map((pt, i) => `${i === 0 ? "M" : "L"} ${toSvgX(pt.x).toFixed(1)} ${toSvgY(pt.y).toFixed(1)}`)
                            .join(" ")}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Scatter Circles */}
                      {tableData.map((pt) => {
                        const px = toSvgX(pt.x);
                        const py = toSvgY(pt.y);
                        return (
                          <g key={pt.id}>
                            <circle
                              cx={px}
                              cy={py}
                              r="4"
                              fill="#0284c7"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                            <text
                              x={px}
                              y={py - 6}
                              fill="#38bdf8"
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              ({pt.x}, {pt.y})
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  )}

                  {/* Render Geometry Points & Segment AB */}
                  {showGeomLine && (
                    <g>
                      {/* Line Segment AB */}
                      <line
                        x1={toSvgX(geomPointA.x)}
                        y1={toSvgY(geomPointA.y)}
                        x2={toSvgX(geomPointB.x)}
                        y2={toSvgY(geomPointB.y)}
                        stroke="#a855f7"
                        strokeWidth="2"
                      />

                      {/* Point A */}
                      <circle
                        cx={toSvgX(geomPointA.x)}
                        cy={toSvgY(geomPointA.y)}
                        r="5"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={toSvgX(geomPointA.x) - 10}
                        y={toSvgY(geomPointA.y) - 6}
                        fill="#f87171"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        A
                      </text>

                      {/* Point B */}
                      <circle
                        cx={toSvgX(geomPointB.x)}
                        cy={toSvgY(geomPointB.y)}
                        r="5"
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={toSvgX(geomPointB.x) + 8}
                        y={toSvgY(geomPointB.y) - 6}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        B
                      </text>

                      {/* Midpoint M */}
                      <circle
                        cx={toSvgX(geomMidpoint.x)}
                        cy={toSvgY(geomMidpoint.y)}
                        r="3.5"
                        fill="#60a5fa"
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                      <text
                        x={toSvgX(geomMidpoint.x) + 6}
                        y={toSvgY(geomMidpoint.y) + 12}
                        fill="#93c5fd"
                        fontSize="9"
                        fontFamily="sans-serif"
                      >
                        M
                      </text>
                    </g>
                  )}

                  {/* Hover Crosshair Point */}
                  {hoverCoord && (
                    <circle
                      cx={toSvgX(hoverCoord.x)}
                      cy={toSvgY(hoverCoord.y)}
                      r="4.5"
                      fill="#f97316"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              </svg>
            </div>

            {/* Bottom Status / Tip */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <span>Di chuột trên đồ thị để đọc tọa độ (x, y) thời gian thực</span>
              <button
                onClick={handleAutoFit}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                Căn giữa đồ thị
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
