"use client";

import React, { useSyncExternalStore } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChapterAnalysis } from "@/types/exam";

interface RadarAnalyticsProps {
  data: ChapterAnalysis[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      subject: string;
      percentage: number;
      earned: number;
      max: number;
    };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs border border-slate-700">
        <p className="font-bold text-orange-400 mb-1">{item.subject}</p>
        <p>
          Mức độ thành thạo: <span className="font-bold text-white">{item.percentage}%</span>
        </p>
        <p className="text-slate-300 text-[11px]">
          Điểm đạt được: {item.earned} / {item.max} điểm
        </p>
      </div>
    );
  }
  return null;
}

// Client-side hydration helper without cascading effect
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function RadarAnalytics({ data }: RadarAnalyticsProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="h-[320px] w-full flex items-center justify-center bg-slate-50/50 rounded-2xl animate-pulse text-xs text-slate-400">
        Đang tải biểu đồ radar...
      </div>
    );
  }

  // Format data for radar
  const chartData = data.map((item) => ({
    subject: item.chapterName,
    percentage: item.percentage,
    earned: item.earnedScore,
    max: item.maxScore,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[320px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="68%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#334155", fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            stroke="#cbd5e1"
          />
          <Radar
            name="Độ thành thạo (%)"
            dataKey="percentage"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.4}
            strokeWidth={2.5}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
