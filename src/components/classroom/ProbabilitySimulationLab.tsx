"use client";

import React, { useState, useMemo } from "react";
import {
  GitFork,
  Play,
  Dice5,
} from "lucide-react";

type SimulationType = "DICE_EVEN" | "DICE_GTE5" | "COIN_HEADS" | "DICE_SUM7";

export default function ProbabilitySimulationLab() {
  // Tabs: "experiment" (Mô phỏng ngẫu nhiên & Tần suất) vs "bayes" (Sơ đồ cây & Công thức Bayes)
  const [activeTab, setActiveTab] = useState<"experiment" | "bayes">("experiment");

  // --- TAB 1: EXPERIMENTAL SIMULATION STATE ---
  const [simType, setSimType] = useState<SimulationType>("DICE_EVEN");
  const [numTrials, setNumTrials] = useState<number>(500);
  const [simResults, setSimResults] = useState<{
    trials: number;
    successes: number;
    empiricalFreq: number;
    theoreticalProb: number;
    history: number[];
  } | null>(null);

  // Theoretical probability mapping
  const theoreticalProb = useMemo(() => {
    switch (simType) {
      case "DICE_EVEN":
        return 3 / 6; // {2, 4, 6} => 0.5
      case "DICE_GTE5":
        return 2 / 6; // {5, 6} => 0.3333
      case "COIN_HEADS":
        return 0.5; // {Heads} => 0.5
      case "DICE_SUM7":
        return 6 / 36; // (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) => 1/6 ≈ 0.1667
      default:
        return 0.5;
    }
  }, [simType]);

  // Run Simulation
  const handleRunSimulation = () => {
    let successCount = 0;
    const historySample: number[] = [];

    for (let i = 1; i <= numTrials; i++) {
      let isSuccess = false;

      if (simType === "DICE_EVEN") {
        const roll = Math.floor(Math.random() * 6) + 1;
        isSuccess = roll % 2 === 0;
      } else if (simType === "DICE_GTE5") {
        const roll = Math.floor(Math.random() * 6) + 1;
        isSuccess = roll >= 5;
      } else if (simType === "COIN_HEADS") {
        isSuccess = Math.random() < 0.5;
      } else if (simType === "DICE_SUM7") {
        const r1 = Math.floor(Math.random() * 6) + 1;
        const r2 = Math.floor(Math.random() * 6) + 1;
        isSuccess = r1 + r2 === 7;
      }

      if (isSuccess) successCount++;

      // Record 40 sample points along the trial history for plotting
      if (i % Math.max(1, Math.floor(numTrials / 40)) === 0 || i === numTrials) {
        historySample.push(successCount / i);
      }
    }

    setSimResults({
      trials: numTrials,
      successes: successCount,
      empiricalFreq: successCount / numTrials,
      theoreticalProb,
      history: historySample,
    });
  };

  // --- TAB 2: BAYES THEOREM DYNAMIC INPUTS ---
  const [priorA, setPriorA] = useState<number>(0.02); // P(A): Tỷ lệ nhiễm bệnh (2%)
  const [pBgivenA, setPBgivenA] = useState<number>(0.95); // P(B|A): Độ nhạy (95%)
  const [pBgivenNotA, setPBgivenNotA] = useState<number>(0.08); // P(B|Not A): Dương tính giả (8%)

  // Bayes Calculations
  const bayesMetrics = useMemo(() => {
    const pNotA = 1 - priorA;
    const pAandB = priorA * pBgivenA;
    const pNotAandB = pNotA * pBgivenNotA;

    // Total probability P(B)
    const pB = pAandB + pNotAandB;

    // Bayes posterior P(A|B)
    const pAgivenB = pB > 0 ? pAandB / pB : 0;

    return {
      pNotA,
      pAandB,
      pNotAandB,
      pB,
      pAgivenB,
    };
  }, [priorA, pBgivenA, pBgivenNotA]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-5">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Phòng Thí Nghiệm Xác Suất & Định Lý Bayes
            </h3>
            <p className="text-xs text-slate-400">
              Mô phỏng Monte Carlo (Xúc xắc / Đồng xu) • Tần suất vs Xác suất lý thuyết • Sơ đồ cây Bayes
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("experiment")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "experiment"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>Mô Phỏng Thực Nghiệm</span>
          </button>
          <button
            onClick={() => setActiveTab("bayes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "bayes"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Sơ Đồ Cây & Công Thức Bayes</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RANDOM EXPERIMENT & LAW OF LARGE NUMBERS */}
      {/* ========================================================================= */}
      {activeTab === "experiment" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Experiment selector (6 cols) */}
            <div className="sm:col-span-6 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 text-[11px]">Phép thử:</span>
              <button
                onClick={() => setSimType("DICE_EVEN")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  simType === "DICE_EVEN"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Xúc xắc: Mặt chẵn (P = 0.5)
              </button>
              <button
                onClick={() => setSimType("DICE_GTE5")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  simType === "DICE_GTE5"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Xúc xắc: ≥ 5 chấm (P = 1/3)
              </button>
              <button
                onClick={() => setSimType("COIN_HEADS")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  simType === "COIN_HEADS"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Tung đồng xu: Mặt Sấp
              </button>
              <button
                onClick={() => setSimType("DICE_SUM7")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  simType === "DICE_SUM7"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2 Xúc xắc: Tổng = 7
              </button>
            </div>

            {/* Trial count & Run Button (6 cols) */}
            <div className="sm:col-span-6 flex items-center justify-end gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Số lần thử N:</span>
                <select
                  value={numTrials}
                  onChange={(e) => setNumTrials(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs font-bold"
                >
                  <option value={50}>50 lần</option>
                  <option value={200}>200 lần</option>
                  <option value={500}>500 lần</option>
                  <option value={1000}>1,000 lần</option>
                  <option value={5000}>5,000 lần</option>
                </select>
              </div>

              <button
                onClick={handleRunSimulation}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Chạy Mô Phỏng</span>
              </button>
            </div>
          </div>

          {/* Results Display */}
          {simResults ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Convergence Line Chart (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-3 relative shadow-md">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="font-bold text-slate-300">
                    Sự Hội Tụ Của Tần Suất f_N Về Xác Suất Lý Thuyết P(A):
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px]">
                    Định luật số lớn
                  </span>
                </div>

                <svg viewBox="0 0 500 200" className="w-full h-auto block select-none">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="2 2" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="2 2" />
                  <line x1="40" y1="180" x2="480" y2="180" stroke="#475569" strokeWidth="1.5" />
                  <line x1="40" y1="10" x2="40" y2="180" stroke="#475569" strokeWidth="1.5" />

                  <text x="32" y="24" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">1.0</text>
                  <text x="32" y="104" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">0.5</text>
                  <text x="32" y="184" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">0.0</text>

                  {/* Theoretical Line (Green Dashed) */}
                  {(() => {
                    const theoY = 180 - simResults.theoreticalProb * 160;
                    return (
                      <g>
                        <line
                          x1="40"
                          y1={theoY}
                          x2="480"
                          y2={theoY}
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                        <text
                          x="485"
                          y={theoY + 3}
                          fill="#10b981"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          P={simResults.theoreticalProb.toFixed(3)}
                        </text>
                      </g>
                    );
                  })()}

                  {/* Empirical Path (Orange Line) */}
                  {simResults.history.length > 1 && (
                    <path
                      d={simResults.history
                        .map((f, i) => {
                          const px = 40 + (i / (simResults.history.length - 1)) * 440;
                          const py = 180 - Math.min(1, Math.max(0, f)) * 160;
                          return `${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>

              {/* Analytical Numbers (5 cols) */}
              <div className="lg:col-span-5 space-y-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px] font-sans">
                    Kết Quả Mô Phỏng {simResults.trials} Lần:
                  </span>

                  <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                    <span className="font-sans">Số lần biến cố xảy ra (k):</span>
                    <strong className="text-orange-400 font-bold text-sm">
                      {simResults.successes} / {simResults.trials}
                    </strong>
                  </div>

                  <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                    <span className="font-sans">Tần suất thực nghiệm f_N:</span>
                    <strong className="text-orange-300 font-bold text-sm">
                      {simResults.empiricalFreq.toFixed(4)}
                    </strong>
                  </div>

                  <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                    <span className="font-sans">Xác suất lý thuyết P(A):</span>
                    <strong className="text-emerald-400 font-bold text-sm">
                      {simResults.theoreticalProb.toFixed(4)}
                    </strong>
                  </div>

                  <div className="flex justify-between p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-xl">
                    <span className="font-sans text-cyan-300">Sai lệch tuyệt đối:</span>
                    <strong className="text-cyan-200 text-sm">
                      |f_N - P| = {Math.abs(simResults.empiricalFreq - simResults.theoreticalProb).toFixed(4)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
              <Dice5 className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                Nhấn nút <strong>&quot;Chạy Mô Phỏng&quot;</strong> ở góc trên để tiến hành gieo ngẫu nhiên và theo dõi luật số lớn.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PROBABILITY TREE DIAGRAM & BAYES THEOREM */}
      {/* ========================================================================= */}
      {activeTab === "bayes" && (
        <div className="space-y-4 text-xs">
          {/* Sliders for Prior and Conditional Probabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Slider 1: Prior P(A) */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-bold">Xác suất P(A):</span>
                <span className="font-mono font-bold text-blue-300">{(priorA * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.2"
                step="0.005"
                value={priorA}
                onChange={(e) => setPriorA(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <span className="text-[10px] text-slate-500 block">Ví dụ: Tỷ lệ nhiễm bệnh trong cộng đồng</span>
            </div>

            {/* Slider 2: Sensitivity P(B|A) */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-bold">Độ nhạy P(B|A):</span>
                <span className="font-mono font-bold text-emerald-300">{(pBgivenA * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.0"
                step="0.01"
                value={pBgivenA}
                onChange={(e) => setPBgivenA(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <span className="text-[10px] text-slate-500 block">Khả năng test Dương tính khi thực sự bị bệnh</span>
            </div>

            {/* Slider 3: False Positive P(B|Not A) */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-rose-400 font-bold">Dương tính giả P(B|Ā):</span>
                <span className="font-mono font-bold text-rose-300">{(pBgivenNotA * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.3"
                step="0.01"
                value={pBgivenNotA}
                onChange={(e) => setPBgivenNotA(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <span className="text-[10px] text-slate-500 block">Khả năng test Dương tính dù hoàn toàn khỏe mạnh</span>
            </div>
          </div>

          {/* Probability Tree SVG & Bayes Posterior Result */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Interactive Tree View (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2 shadow-md">
              <span className="font-bold text-slate-300 block mb-1">
                Sơ Đồ Cây Xác Suất Hai Tầng (Probability Tree):
              </span>

              <div className="space-y-2 font-mono text-slate-300 text-xs">
                {/* Branch 1: A -> B */}
                <div className="p-2.5 bg-blue-950/40 border border-blue-900/50 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-blue-300 font-bold">Nhánh A ∩ B:</span>
                    <span className="text-slate-400 text-[11px] block">
                      P(A) · P(B|A) = {(priorA * 100).toFixed(1)}% · {(pBgivenA * 100).toFixed(1)}%
                    </span>
                  </div>
                  <strong className="text-blue-200 text-sm">
                    {bayesMetrics.pAandB.toFixed(4)}
                  </strong>
                </div>

                {/* Branch 2: Not A -> B (False positive) */}
                <div className="p-2.5 bg-rose-950/30 border border-rose-900/40 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-rose-300 font-bold">Nhánh Ā ∩ B (Dương tính giả):</span>
                    <span className="text-slate-400 text-[11px] block">
                      P(Ā) · P(B|Ā) = {(bayesMetrics.pNotA * 100).toFixed(1)}% · {(pBgivenNotA * 100).toFixed(1)}%
                    </span>
                  </div>
                  <strong className="text-rose-200 text-sm">
                    {bayesMetrics.pNotAandB.toFixed(4)}
                  </strong>
                </div>

                {/* Total Probability P(B) */}
                <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center text-slate-300">
                  <span>Xác suất toàn phần test Dương tính P(B):</span>
                  <strong className="text-amber-400 text-sm font-bold">
                    {(bayesMetrics.pB * 100).toFixed(2)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Bayes Result Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-cyan-800/60 space-y-3 font-mono shadow-md">
              <span className="font-bold text-cyan-300 block uppercase tracking-wider text-[11px] font-sans">
                Xác Suất Hậu Nghiệm (Định Lý Bayes):
              </span>

              <div className="p-3.5 bg-cyan-950/60 border border-cyan-800 rounded-xl space-y-1">
                <span className="text-slate-300 font-sans block text-xs">
                  Xác suất thực sự bị bệnh khi test cho kết quả Dương tính:
                </span>
                <div className="text-2xl font-bold text-orange-400">
                  P(A | B) = {(bayesMetrics.pAgivenB * 100).toFixed(1)}%
                </div>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed pt-1">
                  Công thức Bayes: <br />
                  <span className="text-cyan-300">P(A|B) = [P(A) · P(B|A)] / P(B)</span>
                </p>
              </div>

              <div className="text-slate-400 text-[11px] font-sans leading-relaxed p-2 bg-slate-900 rounded-xl">
                💡 <strong>Nghịch lý tỷ lệ nền:</strong> Dù test có độ nhạy đến {(pBgivenA * 100).toFixed(0)}%, do tỷ lệ nhiễm bệnh thấp ({(priorA * 100).toFixed(1)}%), đa số kết quả dương tính trong sàng lọc đại trà có thể là dương tính giả!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
