"use client";

import React, { useState } from "react";
import {
  X,
  Trophy,
  Users,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { LIVE_LEADERBOARD_DATA } from "@/data/chaptersData";
import confetti from "canvas-confetti";

interface LiveArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinExam: () => void;
}

export default function LiveArenaModal({ isOpen, onClose, onJoinExam }: LiveArenaModalProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen) return null;

  const handleRegister = () => {
    setIsRegistered(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with fiery Arena styling */}
        <div className="bg-gradient-to-r from-red-950 via-slate-950 to-orange-950 text-white p-5 sm:p-6 flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse" />
                Sự Kiện Trực Tiếp Hàng Tuần
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1">
                <Users className="w-3 h-3" />
                Đang mở cổng đăng ký trực tiếp
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Đấu Trường Toán 12 - Chủ Nhật 20h00
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Phòng thi trực tuyến đồng loạt toàn quốc mô phỏng áp lực phòng thi thật với Bảng xếp hạng thời gian thực.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-colors relative z-10 flex-shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Arena Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Banner Countdown & Action */}
          <div className="p-5 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                  Lịch thi đấu kỳ này
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Chủ Nhật tuần này • 20:00 - 21:30
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Thời gian làm bài: 90 phút • Đề thi bảo mật mở tự động
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Đăng ký tham gia ngay</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã đăng ký
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onJoinExam();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>Vào phòng thi thử ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Rules & Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Chống gian lận
              </strong>
              <p className="text-slate-600">Xáo trộn ngẫu nhiên thứ tự câu hỏi và phương án theo mã đề riêng.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                Vinh danh Top 10
              </strong>
              <p className="text-slate-600">Nhận Huy hiệu vàng & quyền truy cập kho chuyên đề nâng cao miễn phí.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                Trả lời giải 21h35
              </strong>
              <p className="text-slate-600">Phát video live chữa chi tiết các câu vận dụng cao ngay sau khi hết giờ.</p>
            </div>
          </div>

          {/* Real-time Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-500" />
                BẢNG XẾP HẠNG TOÀN QUỐC (TOP THÍ SINH DẪN ĐẦU KỲ TRƯỚC)
              </h3>
              <span className="text-xs text-slate-400">Cập nhật thời gian thực</span>
            </div>

            <div className="space-y-2.5">
              {LIVE_LEADERBOARD_DATA.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Chưa có kết quả thi đấu kỳ này</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Bảng vàng sẽ tự động ghi danh và vinh danh thí sinh đạt điểm cao ngay sau khi hoàn thành bài thi 90 phút.
                  </p>
                </div>
              ) : (
                LIVE_LEADERBOARD_DATA.map((user) => (
                  <div
                    key={user.rank}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      user.rank === 1
                        ? "bg-amber-50/80 border-amber-300 ring-1 ring-amber-200"
                        : user.rank === 2
                        ? "bg-slate-50 border-slate-300"
                        : user.rank === 3
                        ? "bg-orange-50/60 border-orange-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                          user.rank === 1
                            ? "bg-amber-500 text-white shadow-xs"
                            : user.rank === 2
                            ? "bg-slate-400 text-white"
                            : user.rank === 3
                            ? "bg-amber-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.rank}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-slate-900">{user.name}</strong>
                          {user.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {user.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{user.school}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black font-mono text-blue-700 block">
                        {user.score.toFixed(2)}đ
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {user.timeSpent} • {user.accuracy}% chính xác
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <span>Hệ thống thi thử trực tuyến Math12Pro Live</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
