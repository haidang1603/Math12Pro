"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  Compass,
  RotateCcw,
  Move,
} from "lucide-react";

interface Point3D {
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function OxyzVectorLab3D() {
  // Points A, B, C in 3D
  const [pointA, setPointA] = useState<Point3D>({ name: "A", x: 0, y: 0, z: 0, color: "#f97316" });
  const [pointB, setPointB] = useState<Point3D>({ name: "B", x: 3, y: 0, z: 2, color: "#3b82f6" });
  const [pointC, setPointC] = useState<Point3D>({ name: "C", x: 0, y: 4, z: 1, color: "#10b981" });

  // View settings
  const [yaw, setYaw] = useState<number>(35); // rotation around Z in degrees
  const [pitch, setPitch] = useState<number>(25); // tilt angle in degrees
  const [zoom, setZoom] = useState<number>(35); // pixels per unit
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showDropLines, setShowDropLines] = useState<boolean>(true);
  const [showCrossProduct, setShowCrossProduct] = useState<boolean>(true);
  const [showTriangleFace, setShowTriangleFace] = useState<boolean>(true);

  // Drag rotation state
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Calculations
  const calculations = useMemo(() => {
    // Vector u = AB
    const ux = pointB.x - pointA.x;
    const uy = pointB.y - pointA.y;
    const uz = pointB.z - pointA.z;

    // Vector v = AC
    const vx = pointC.x - pointA.x;
    const vy = pointC.y - pointA.y;
    const vz = pointC.z - pointA.z;

    const lenU = Math.sqrt(ux * ux + uy * uy + uz * uz);
    const lenV = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // Dot product u . v
    const dot = ux * vx + uy * vy + uz * vz;

    // Angle theta
    let cosTheta = 0;
    let angleDeg = 0;
    if (lenU > 1e-9 && lenV > 1e-9) {
      cosTheta = Math.max(-1, Math.min(1, dot / (lenU * lenV)));
      angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;
    }

    // Cross product [u, v]
    const cx = uy * vz - uz * vy;
    const cy = uz * vx - ux * vz;
    const cz = ux * vy - uy * vx;
    const lenCross = Math.sqrt(cx * cx + cy * cy + cz * cz);

    // Area of triangle ABC
    const area = 0.5 * lenCross;

    return {
      u: { x: ux, y: uy, z: uz, len: lenU },
      v: { x: vx, y: vy, z: vz, len: lenV },
      dot,
      cosTheta,
      angleDeg,
      cross: { x: cx, y: cy, z: cz, len: lenCross },
      area,
    };
  }, [pointA, pointB, pointC]);

  // 3D Projection into 2D SVG
  const SVG_W = 560;
  const SVG_H = 380;
  const originX = SVG_W / 2;
  const originY = SVG_H / 2 + 30;

  const project3D = useCallback(
    (x: number, y: number, z: number) => {
      const radYaw = (yaw * Math.PI) / 180;
      const radPitch = (pitch * Math.PI) / 180;

      // Rotate around Z axis (yaw)
      const x1 = x * Math.cos(radYaw) - y * Math.sin(radYaw);
      const y1 = x * Math.sin(radYaw) + y * Math.cos(radYaw);
      const z1 = z;

      // Rotate around X axis (pitch)
      const x2 = x1;
      const y2 = y1 * Math.cos(radPitch) - z1 * Math.sin(radPitch);
      const z2 = y1 * Math.sin(radPitch) + z1 * Math.cos(radPitch);

      // Map to 2D screen coordinates (right: +x2, up: -z2, depth: y2)
      const screenX = originX + x2 * zoom;
      const screenY = originY - z2 * zoom + y2 * 0.25 * zoom;

      return { x: screenX, y: screenY, depth: y2 };
    },
    [yaw, pitch, zoom, originX, originY]
  );

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setYaw((y) => (y + dx * 0.7) % 360);
    setPitch((p) => Math.max(-80, Math.min(80, p + dy * 0.7)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Preset Configurations
  const applyPreset = (presetName: string) => {
    if (presetName === "orthogonal") {
      setPointA({ name: "A", x: 0, y: 0, z: 0, color: "#f97316" });
      setPointB({ name: "B", x: 4, y: 0, z: 0, color: "#3b82f6" });
      setPointC({ name: "C", x: 0, y: 3, z: 2, color: "#10b981" });
    } else if (presetName === "cube") {
      setPointA({ name: "A", x: 0, y: 0, z: 0, color: "#f97316" });
      setPointB({ name: "B", x: 3, y: 0, z: 0, color: "#3b82f6" });
      setPointC({ name: "C", x: 0, y: 3, z: 3, color: "#10b981" });
    } else if (presetName === "pyramid") {
      setPointA({ name: "A", x: 0, y: 0, z: 0, color: "#f97316" });
      setPointB({ name: "B", x: 2, y: 2, z: 4, color: "#3b82f6" });
      setPointC({ name: "C", x: -2, y: 2, z: 4, color: "#10b981" });
    }
    setYaw(35);
    setPitch(25);
  };

  // Render Projected Elements
  const pO = project3D(0, 0, 0);
  const pX = project3D(6, 0, 0);
  const pY = project3D(0, 6, 0);
  const pZ = project3D(0, 0, 6);

  const pA = project3D(pointA.x, pointA.y, pointA.z);
  const pB = project3D(pointB.x, pointB.y, pointB.z);
  const pC = project3D(pointC.x, pointC.y, pointC.z);

  const pA0 = project3D(pointA.x, pointA.y, 0);
  const pB0 = project3D(pointB.x, pointB.y, 0);
  const pC0 = project3D(pointC.x, pointC.y, 0);

  // Normal vector arrow origin and end
  const pNorm = project3D(
    pointA.x + (calculations.cross.len > 0 ? (calculations.cross.x / calculations.cross.len) * 3 : 0),
    pointA.y + (calculations.cross.len > 0 ? (calculations.cross.y / calculations.cross.len) * 3 : 0),
    pointA.z + (calculations.cross.len > 0 ? (calculations.cross.z / calculations.cross.len) * 3 : 0)
  );

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-5">
      {/* 1. Header with Title & Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                Không Gian Vectơ & Tọa Độ 3D Oxyz Tương Tác
              </h3>
              <p className="text-xs text-slate-400">
                Nhập tọa độ 3 điểm • Tự động tính tích có hướng, tích vô hướng, góc & diện tích
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 mr-1 hidden md:inline">Hình mẫu:</span>
          <button
            onClick={() => applyPreset("orthogonal")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Tam giác Oxy
          </button>
          <button
            onClick={() => applyPreset("cube")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Đường chéo hình hộp
          </button>
          <button
            onClick={() => applyPreset("pyramid")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Hình chóp tam giác
          </button>
          <button
            onClick={() => {
              setYaw(35);
              setPitch(25);
              setZoom(35);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Đặt lại góc nhìn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main Workspace: 3D Viewport (7 Cols) + Inputs & Results (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 3D SVG Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-2 sm:p-3 relative overflow-hidden shadow-2xl select-none">
          {/* Controls Overlay Top */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono">
              <Move className="w-3 h-3 text-blue-400" />
              <span>Kéo chuột để xoay 360°</span>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono">
              Yaw: {Math.round(yaw)}° | Pitch: {Math.round(pitch)}°
            </div>
          </div>

          {/* Visibility Toggles Bottom Left */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                showGrid
                  ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                  : "bg-slate-900/80 text-slate-500 border-slate-800"
              }`}
            >
              Lưới Oxy
            </button>
            <button
              onClick={() => setShowDropLines(!showDropLines)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                showDropLines
                  ? "bg-orange-600/20 text-orange-300 border-orange-500/30"
                  : "bg-slate-900/80 text-slate-500 border-slate-800"
              }`}
            >
              Hình chiếu
            </button>
            <button
              onClick={() => setShowCrossProduct(!showCrossProduct)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                showCrossProduct
                  ? "bg-purple-600/20 text-purple-300 border-purple-500/30"
                  : "bg-slate-900/80 text-slate-500 border-slate-800"
              }`}
            >
              Vectơ Pháp tuyến
            </button>
            <button
              onClick={() => setShowTriangleFace(!showTriangleFace)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                showTriangleFace
                  ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-900/80 text-slate-500 border-slate-800"
              }`}
            >
              Mặt ABC
            </button>
          </div>

          {/* SVG 3D Canvas */}
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-auto max-h-[380px] cursor-grab active:cursor-grabbing block"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <marker
                id="arrowX"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
              </marker>
              <marker
                id="arrowY"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker
                id="arrowZ"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker
                id="arrowVector"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker
                id="arrowNormal"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#c084fc" />
              </marker>
            </defs>

            {/* 1. Grid on Oxy Plane (z = 0) */}
            {showGrid && (
              <g stroke="#1e293b" strokeWidth="0.8">
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((gVal) => {
                  const p1 = project3D(gVal, -5, 0);
                  const p2 = project3D(gVal, 5, 0);
                  const q1 = project3D(-5, gVal, 0);
                  const q2 = project3D(5, gVal, 0);
                  return (
                    <g key={`grid-${gVal}`}>
                      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} strokeDasharray="2 2" />
                      <line x1={q1.x} y1={q1.y} x2={q2.x} y2={q2.y} strokeDasharray="2 2" />
                    </g>
                  );
                })}
              </g>
            )}

            {/* 2. Main 3D Axes: Ox, Oy, Oz */}
            <g strokeWidth="2">
              {/* Ox (Red) */}
              <line x1={pO.x} y1={pO.y} x2={pX.x} y2={pX.y} stroke="#ef4444" markerEnd="url(#arrowX)" />
              <text x={pX.x + 8} y={pX.y + 4} fill="#ef4444" fontSize="12" fontWeight="bold">x</text>

              {/* Oy (Green) */}
              <line x1={pO.x} y1={pO.y} x2={pY.x} y2={pY.y} stroke="#10b981" markerEnd="url(#arrowY)" />
              <text x={pY.x + 8} y={pY.y + 4} fill="#10b981" fontSize="12" fontWeight="bold">y</text>

              {/* Oz (Blue) */}
              <line x1={pO.x} y1={pO.y} x2={pZ.x} y2={pZ.y} stroke="#38bdf8" markerEnd="url(#arrowZ)" />
              <text x={pZ.x + 4} y={pZ.y - 8} fill="#38bdf8" fontSize="12" fontWeight="bold">z</text>

              {/* Origin O */}
              <circle cx={pO.x} cy={pO.y} r="3" fill="#cbd5e1" />
              <text x={pO.x - 12} y={pO.y + 12} fill="#94a3b8" fontSize="11" fontWeight="bold">O</text>
            </g>

            {/* 3. Drop Lines to Oxy Plane */}
            {showDropLines && (
              <g stroke="#64748b" strokeWidth="1" strokeDasharray="3 3">
                <line x1={pA.x} y1={pA.y} x2={pA0.x} y2={pA0.y} />
                <circle cx={pA0.x} cy={pA0.y} r="2" fill="#64748b" />

                <line x1={pB.x} y1={pB.y} x2={pB0.x} y2={pB0.y} />
                <circle cx={pB0.x} cy={pB0.y} r="2" fill="#64748b" />

                <line x1={pC.x} y1={pC.y} x2={pC0.x} y2={pC0.y} />
                <circle cx={pC0.x} cy={pC0.y} r="2" fill="#64748b" />
              </g>
            )}

            {/* 4. Triangle ABC Face */}
            {showTriangleFace && (
              <polygon
                points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
                fill="#3b82f6"
                fillOpacity="0.18"
                stroke="#60a5fa"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            )}

            {/* 5. Vectors AB and AC */}
            <g strokeWidth="2.5">
              {/* Vector AB */}
              <line
                x1={pA.x}
                y1={pA.y}
                x2={pB.x}
                y2={pB.y}
                stroke="#f59e0b"
                markerEnd="url(#arrowVector)"
              />

              {/* Vector AC */}
              <line
                x1={pA.x}
                y1={pA.y}
                x2={pC.x}
                y2={pC.y}
                stroke="#10b981"
                markerEnd="url(#arrowVector)"
              />

              {/* Vector Normal [u, v] */}
              {showCrossProduct && calculations.cross.len > 0.1 && (
                <line
                  x1={pA.x}
                  y1={pA.y}
                  x2={pNorm.x}
                  y2={pNorm.y}
                  stroke="#c084fc"
                  strokeWidth="2"
                  markerEnd="url(#arrowNormal)"
                />
              )}
            </g>

            {/* 6. Points A, B, C */}
            <g>
              {/* Point A */}
              <circle cx={pA.x} cy={pA.y} r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
              <text x={pA.x + 8} y={pA.y - 4} fill="#fdba74" fontSize="12" fontWeight="bold">
                A({pointA.x},{pointA.y},{pointA.z})
              </text>

              {/* Point B */}
              <circle cx={pB.x} cy={pB.y} r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
              <text x={pB.x + 8} y={pB.y - 4} fill="#93c5fd" fontSize="12" fontWeight="bold">
                B({pointB.x},{pointB.y},{pointB.z})
              </text>

              {/* Point C */}
              <circle cx={pC.x} cy={pC.y} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              <text x={pC.x + 8} y={pC.y - 4} fill="#86efac" fontSize="12" fontWeight="bold">
                C({pointC.x},{pointC.y},{pointC.z})
              </text>

              {/* Normal Label */}
              {showCrossProduct && calculations.cross.len > 0.1 && (
                <text x={pNorm.x + 8} y={pNorm.y - 4} fill="#e9d5ff" fontSize="11" fontWeight="bold">
                  [u, v] (Pháp tuyến)
                </text>
              )}
            </g>
          </svg>
        </div>

        {/* Inputs & Analytical Results Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          {/* Coordinates Input Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
              Tọa Độ 3 Điểm A, B, C:
            </span>

            {/* Point A Inputs */}
            <div className="p-2.5 bg-slate-900 rounded-xl space-y-1.5 border border-slate-800/80">
              <span className="font-bold text-orange-400 block">Điểm A (Gốc vectơ):</span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">xA:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointA.x}
                    onChange={(e) => setPointA((p) => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">yA:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointA.y}
                    onChange={(e) => setPointA((p) => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">zA:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointA.z}
                    onChange={(e) => setPointA((p) => ({ ...p, z: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Point B Inputs */}
            <div className="p-2.5 bg-slate-900 rounded-xl space-y-1.5 border border-slate-800/80">
              <span className="font-bold text-blue-400 block">Điểm B:</span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">xB:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointB.x}
                    onChange={(e) => setPointB((p) => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">yB:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointB.y}
                    onChange={(e) => setPointB((p) => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">zB:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointB.z}
                    onChange={(e) => setPointB((p) => ({ ...p, z: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Point C Inputs */}
            <div className="p-2.5 bg-slate-900 rounded-xl space-y-1.5 border border-slate-800/80">
              <span className="font-bold text-emerald-400 block">Điểm C:</span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">xC:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointC.x}
                    onChange={(e) => setPointC((p) => ({ ...p, x: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">yC:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointC.y}
                    onChange={(e) => setPointC((p) => ({ ...p, y: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">zC:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pointC.z}
                    onChange={(e) => setPointC((p) => ({ ...p, z: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Analytical Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 font-mono shadow-md">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px] font-sans">
              Kết Quả Tính Toán Vectơ Tự Động:
            </span>

            <div className="space-y-1.5 text-slate-300">
              {/* Vectơ AB */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Vectơ u = AB:</span>
                <strong className="text-amber-400">
                  ({calculations.u.x}, {calculations.u.y}, {calculations.u.z})
                </strong>
              </div>

              {/* Độ dài AB */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Độ dài |AB|:</span>
                <strong className="text-amber-300">{calculations.u.len.toFixed(2)}</strong>
              </div>

              {/* Vectơ AC */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Vectơ v = AC:</span>
                <strong className="text-emerald-400">
                  ({calculations.v.x}, {calculations.v.y}, {calculations.v.z})
                </strong>
              </div>

              {/* Độ dài AC */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Độ dài |AC|:</span>
                <strong className="text-emerald-300">{calculations.v.len.toFixed(2)}</strong>
              </div>

              {/* Tích vô hướng u . v */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Tích vô hướng u · v:</span>
                <strong className="text-blue-400">{calculations.dot.toFixed(2)}</strong>
              </div>

              {/* Góc giữa AB và AC */}
              <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                <span>Góc (AB, AC):</span>
                <strong className="text-orange-400 font-bold">{calculations.angleDeg.toFixed(1)}°</strong>
              </div>

              {/* Tích có hướng [u, v] */}
              <div className="flex justify-between p-2 bg-purple-950/40 border border-purple-900/50 rounded-xl">
                <span className="text-purple-300">Tích có hướng [u, v]:</span>
                <strong className="text-purple-200">
                  ({calculations.cross.x}, {calculations.cross.y}, {calculations.cross.z})
                </strong>
              </div>

              {/* Diện tích tam giác ABC */}
              <div className="flex justify-between p-2 bg-blue-950/40 border border-blue-900/50 rounded-xl">
                <span className="text-blue-300">Diện tích S(ABC):</span>
                <strong className="text-blue-200 font-bold">{calculations.area.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
