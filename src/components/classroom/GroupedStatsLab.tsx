"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  Plus,
  Trash2,
  RotateCcw,
  FileSpreadsheet,
} from "lucide-react";

export interface GroupItem {
  id: string;
  start: number;
  end: number;
  freq: number;
}

export default function GroupedStatsLab() {
  // Group intervals state
  const [groups, setGroups] = useState<GroupItem[]>([
    { id: "g1", start: 10, end: 15, freq: 6 },
    { id: "g2", start: 15, end: 20, freq: 12 },
    { id: "g3", start: 20, end: 25, freq: 14 },
    { id: "g4", start: 25, end: 30, freq: 8 },
    { id: "g5", start: 30, end: 35, freq: 4 },
  ]);

  const [csvInput, setCsvInput] = useState<string>("");
  const [showCsvBox, setShowCsvBox] = useState<boolean>(false);
  const [activeBarHover, setActiveBarHover] = useState<number | null>(null);

  // Statistics Calculations (GDPT 2018 Standards)
  const stats = useMemo(() => {
    const validGroups = groups.filter((g) => g.end > g.start && g.freq >= 0);
    const n = validGroups.reduce((acc, g) => acc + g.freq, 0);

    if (n === 0 || validGroups.length === 0) {
      return null;
    }

    // Midpoints c_i
    const midpoints = validGroups.map((g) => (g.start + g.end) / 2);

    // Mean x̄ = sum(m_i * c_i) / n
    const sumMC = validGroups.reduce((acc, g, i) => acc + g.freq * midpoints[i], 0);
    const mean = sumMC / n;

    // Variance s^2 = sum(m_i * (c_i - mean)^2) / n
    const sumVar = validGroups.reduce(
      (acc, g, i) => acc + g.freq * Math.pow(midpoints[i] - mean, 2),
      0
    );
    const variance = sumVar / n;
    const stdDev = Math.sqrt(variance);

    // Range R = max(end) - min(start)
    const range = validGroups[validGroups.length - 1].end - validGroups[0].start;

    // Cumulative frequencies C_i
    const cumulative: number[] = [];
    let currentC = 0;
    for (const g of validGroups) {
      currentC += g.freq;
      cumulative.push(currentC);
    }

    // Median Me: p is first group where C_p >= n / 2
    const halfN = n / 2;
    let p = validGroups.findIndex((_, idx) => cumulative[idx] >= halfN);
    if (p === -1) p = validGroups.length - 1;
    const cpPrev = p > 0 ? cumulative[p - 1] : 0;
    const hMedian = validGroups[p].end - validGroups[p].start;
    const median =
      validGroups[p].freq > 0
        ? validGroups[p].start + ((halfN - cpPrev) / validGroups[p].freq) * hMedian
        : validGroups[p].start;

    // Quartile Q1: first group where C_j >= n / 4
    const q1N = n / 4;
    let j = validGroups.findIndex((_, idx) => cumulative[idx] >= q1N);
    if (j === -1) j = 0;
    const cjPrev = j > 0 ? cumulative[j - 1] : 0;
    const hQ1 = validGroups[j].end - validGroups[j].start;
    const q1 =
      validGroups[j].freq > 0
        ? validGroups[j].start + ((q1N - cjPrev) / validGroups[j].freq) * hQ1
        : validGroups[j].start;

    // Quartile Q3: first group where C_k >= 3n / 4
    const q3N = (3 * n) / 4;
    let k = validGroups.findIndex((_, idx) => cumulative[idx] >= q3N);
    if (k === -1) k = validGroups.length - 1;
    const ckPrev = k > 0 ? cumulative[k - 1] : 0;
    const hQ3 = validGroups[k].end - validGroups[k].start;
    const q3 =
      validGroups[k].freq > 0
        ? validGroups[k].start + ((q3N - ckPrev) / validGroups[k].freq) * hQ3
        : validGroups[k].start;

    const iqr = q3 - q1; // Interquartile Range

    // Mode Mo (Nhóm chứa mốt có tần số lớn nhất)
    let mIndex = 0;
    for (let i = 1; i < validGroups.length; i++) {
      if (validGroups[i].freq > validGroups[mIndex].freq) {
        mIndex = i;
      }
    }
    const mFreq = validGroups[mIndex].freq;
    const mPrev = mIndex > 0 ? validGroups[mIndex - 1].freq : 0;
    const mNext = mIndex < validGroups.length - 1 ? validGroups[mIndex + 1].freq : 0;
    const denom = mFreq - mPrev + (mFreq - mNext);
    const hMode = validGroups[mIndex].end - validGroups[mIndex].start;
    const mode = denom > 0 ? validGroups[mIndex].start + ((mFreq - mPrev) / denom) * hMode : midpoints[mIndex];

    return {
      n,
      validGroups,
      midpoints,
      mean,
      variance,
      stdDev,
      median,
      q1,
      q3,
      iqr,
      range,
      mode,
    };
  }, [groups]);

  // Handlers for Add, Delete, Edit
  const handleAddGroup = () => {
    const lastGroup = groups[groups.length - 1];
    const newStart = lastGroup ? lastGroup.end : 0;
    const newEnd = newStart + 5;
    setGroups((prev) => [
      ...prev,
      { id: `g-${Date.now()}`, start: newStart, end: newEnd, freq: 5 },
    ]);
  };

  const handleRemoveGroup = (id: string) => {
    if (groups.length <= 2) return;
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleUpdateGroup = (id: string, field: "start" | "end" | "freq", value: number) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  // Preset Scenarios
  const applyPreset = (preset: "scores" | "running" | "income") => {
    if (preset === "scores") {
      setGroups([
        { id: "s1", start: 2, end: 4, freq: 3 },
        { id: "s2", start: 4, end: 6, freq: 12 },
        { id: "s3", start: 6, end: 8, freq: 24 },
        { id: "s4", start: 8, end: 10, freq: 11 },
      ]);
    } else if (preset === "running") {
      setGroups([
        { id: "r1", start: 12, end: 14, freq: 5 },
        { id: "r2", start: 14, end: 16, freq: 18 },
        { id: "r3", start: 16, end: 18, freq: 15 },
        { id: "r4", start: 18, end: 20, freq: 6 },
        { id: "r5", start: 20, end: 22, freq: 2 },
      ]);
    } else if (preset === "income") {
      setGroups([
        { id: "i1", start: 5, end: 10, freq: 10 },
        { id: "i2", start: 10, end: 15, freq: 25 },
        { id: "i3", start: 15, end: 20, freq: 32 },
        { id: "i4", start: 20, end: 25, freq: 18 },
        { id: "i5", start: 25, end: 30, freq: 8 },
      ]);
    }
  };

  // CSV Import handler
  const handleImportCsv = () => {
    const lines = csvInput.trim().split("\n");
    const parsed: GroupItem[] = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(/[,;\t]/).map((s) => parseFloat(s.trim()));
      if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        parsed.push({
          id: `csv-${i}`,
          start: parts[0],
          end: parts[1],
          freq: Math.max(0, parts[2]),
        });
      }
    }
    if (parsed.length >= 2) {
      setGroups(parsed);
      setShowCsvBox(false);
      setCsvInput("");
    }
  };

  // SVG Histogram calculations
  const HISTO_W = 560;
  const HISTO_H = 260;
  const PAD_X = 50;
  const PAD_Y = 30;
  const PLOT_W = HISTO_W - PAD_X * 2;
  const PLOT_H = HISTO_H - PAD_Y * 2;

  const minX = stats && stats.validGroups.length > 0 ? stats.validGroups[0].start : 0;
  const maxX = stats && stats.validGroups.length > 0 ? stats.validGroups[stats.validGroups.length - 1].end : 35;
  const maxFreq = stats && stats.validGroups.length > 0 ? Math.max(...stats.validGroups.map((g) => g.freq), 1) : 10;

  const toHistoX = (val: number) => PAD_X + ((val - minX) / (maxX - minX || 1)) * PLOT_W;
  const toHistoY = (freq: number) => HISTO_H - PAD_Y - (freq / maxFreq) * PLOT_H;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-5">
      {/* 1. Header with Presets & Import */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Phòng Thí Nghiệm Thống Kê Mẫu Số Liệu Ghép Nhóm
            </h3>
            <p className="text-xs text-slate-400">
              Chuẩn GDPT 2018 • Tự động tính Số trung bình, Trung vị, Tứ phân vị, Phương sai & Độ lệch chuẩn
            </p>
          </div>
        </div>

        {/* Action Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 mr-1 hidden md:inline">Mẫu thực tế:</span>
          <button
            onClick={() => applyPreset("scores")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Điểm thi Toán 12
          </button>
          <button
            onClick={() => applyPreset("running")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Thời gian chạy 100m
          </button>
          <button
            onClick={() => applyPreset("income")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Thu nhập khảo sát
          </button>
          <button
            onClick={() => setShowCsvBox(!showCsvBox)}
            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Dán CSV</span>
          </button>
          <button
            onClick={() => applyPreset("scores")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            title="Đặt lại dữ liệu ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại</span>
          </button>
        </div>
      </div>

      {/* CSV Box Toggle */}
      {showCsvBox && (
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-300 block">Dán danh sách các nhóm (Dạng: a, b, tần số):</span>
          <textarea
            rows={3}
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="10, 15, 6&#10;15, 20, 12&#10;20, 25, 14"
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
          />
          <button
            onClick={handleImportCsv}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer text-xs"
          >
            Nạp dữ liệu
          </button>
        </div>
      )}

      {/* 2. Main Workspace: Table Editor (5 Cols) + Histogram & Analytical Metrics (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Table Editor (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              Bảng Tần Số Ghép Nhóm:
            </span>
            <button
              onClick={handleAddGroup}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 font-bold border border-orange-500/30 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm nhóm</span>
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto border border-slate-800/80 rounded-xl bg-slate-900/50">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] sticky top-0">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Khoảng [a, b)</th>
                  <th className="p-2">Tần số (m)</th>
                  <th className="p-2 text-right">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {groups.map((g, idx) => (
                  <tr key={g.id} className="hover:bg-slate-900/40">
                    <td className="p-2 text-slate-500">{idx + 1}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">[</span>
                        <input
                          type="number"
                          step="any"
                          value={g.start}
                          onChange={(e) => handleUpdateGroup(g.id, "start", parseFloat(e.target.value) || 0)}
                          className="w-12 bg-slate-950 border border-slate-700 rounded px-1 py-0.5 text-white font-bold"
                        />
                        <span className="text-slate-400">;</span>
                        <input
                          type="number"
                          step="any"
                          value={g.end}
                          onChange={(e) => handleUpdateGroup(g.id, "end", parseFloat(e.target.value) || 0)}
                          className="w-12 bg-slate-950 border border-slate-700 rounded px-1 py-0.5 text-white font-bold"
                        />
                        <span className="text-slate-400">)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={g.freq}
                        onChange={(e) => handleUpdateGroup(g.id, "freq", Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-14 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-orange-400 font-bold"
                      />
                    </td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => handleRemoveGroup(g.id)}
                        disabled={groups.length <= 2}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 disabled:opacity-30 cursor-pointer"
                        title="Xóa nhóm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 bg-slate-900 rounded-xl text-slate-400 text-[11px] flex justify-between">
            <span>Tổng kích thước mẫu n:</span>
            <strong className="text-white font-mono text-sm">{stats?.n || 0}</strong>
          </div>
        </div>

        {/* Histogram & Analytical Metrics (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Histogram SVG Chart */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 relative shadow-md">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300">Biểu Đồ Tần Số Ghép Nhóm (Histogram):</span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> x̄ = {stats?.mean.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Me = {stats?.median.toFixed(1)}
                </span>
              </div>
            </div>

            <svg viewBox={`0 0 ${HISTO_W} ${HISTO_H}`} className="w-full h-auto block select-none">
              {/* Axes */}
              <line x1={PAD_X} y1={HISTO_H - PAD_Y} x2={HISTO_W - PAD_X / 2} y2={HISTO_H - PAD_Y} stroke="#475569" strokeWidth="1.5" />
              <line x1={PAD_X} y1={PAD_Y / 2} x2={PAD_X} y2={HISTO_H - PAD_Y} stroke="#475569" strokeWidth="1.5" />

              {/* Bars */}
              {stats?.validGroups.map((g, idx) => {
                const x1 = toHistoX(g.start);
                const x2 = toHistoX(g.end);
                const w = Math.max(1, x2 - x1);
                const y = toHistoY(g.freq);
                const h = HISTO_H - PAD_Y - y;
                const isHover = activeBarHover === idx;

                return (
                  <g
                    key={g.id}
                    onMouseEnter={() => setActiveBarHover(idx)}
                    onMouseLeave={() => setActiveBarHover(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={x1}
                      y={y}
                      width={w}
                      height={h}
                      fill={isHover ? "#f97316" : "#ea580c"}
                      fillOpacity={isHover ? "0.9" : "0.75"}
                      stroke="#fb923c"
                      strokeWidth="1.5"
                    />
                    <text
                      x={x1 + w / 2}
                      y={y - 4}
                      fill="#fed7aa"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {g.freq}
                    </text>
                    {/* Tick Label on Axis */}
                    <text
                      x={x1}
                      y={HISTO_H - PAD_Y + 12}
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {g.start}
                    </text>
                  </g>
                );
              })}

              {/* Last tick mark */}
              {stats && stats.validGroups.length > 0 && (
                <text
                  x={toHistoX(stats.validGroups[stats.validGroups.length - 1].end)}
                  y={HISTO_H - PAD_Y + 12}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {stats.validGroups[stats.validGroups.length - 1].end}
                </text>
              )}

              {/* Mean & Median vertical lines */}
              {stats && (
                <>
                  {/* Mean Line */}
                  <line
                    x1={toHistoX(stats.mean)}
                    y1={PAD_Y / 2}
                    x2={toHistoX(stats.mean)}
                    y2={HISTO_H - PAD_Y}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Median Line */}
                  <line
                    x1={toHistoX(stats.median)}
                    y1={PAD_Y / 2}
                    x2={toHistoX(stats.median)}
                    y2={HISTO_H - PAD_Y}
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Statistical Metrics Cards */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {/* Mean */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-blue-900/40 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Số trung bình x̄:</span>
                <strong className="text-blue-400 font-mono text-base font-bold">
                  {stats.mean.toFixed(2)}
                </strong>
              </div>

              {/* Median */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-900/40 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Trung vị Me:</span>
                <strong className="text-emerald-400 font-mono text-base font-bold">
                  {stats.median.toFixed(2)}
                </strong>
              </div>

              {/* Variance */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-orange-900/40 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Phương sai s²:</span>
                <strong className="text-orange-400 font-mono text-base font-bold">
                  {stats.variance.toFixed(2)}
                </strong>
              </div>

              {/* Standard Deviation */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-amber-900/40 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Độ lệch chuẩn s:</span>
                <strong className="text-amber-300 font-mono text-base font-bold">
                  {stats.stdDev.toFixed(2)}
                </strong>
              </div>

              {/* Q1 */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Tứ phân vị thứ nhất Q1:</span>
                <strong className="text-slate-200 font-mono">{stats.q1.toFixed(2)}</strong>
              </div>

              {/* Q3 */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Tứ phân vị thứ ba Q3:</span>
                <strong className="text-slate-200 font-mono">{stats.q3.toFixed(2)}</strong>
              </div>

              {/* IQR */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Khoảng tứ phân vị &Delta;Q:</span>
                <strong className="text-purple-400 font-mono">{stats.iqr.toFixed(2)}</strong>
              </div>

              {/* Mode */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">Mốt ghép nhóm Mo:</span>
                <strong className="text-pink-400 font-mono">{stats.mode.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
