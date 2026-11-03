import { ExamData, MilestoneType } from "@/types/exam";
import { MOCK_EXAM_2026 } from "./exams/official2026";
import { OFFICIAL_EXAM_2025 } from "./exams/official2025";
import { MOCK_EXAM_2025_CHUYEN_SP } from "./exams/mockChuyen2025";
import { MOCK_EXAM_2025_SO_HN } from "./exams/mockSoHaNoi2025";
import { EXAM_GIUA_KI_1 } from "./exams/examGiuaKi1";
import { EXAM_CUOI_KI_1 } from "./exams/examCuoiKi1";
import { EXAM_HOC_KI_2 } from "./exams/examHocKi2";
import {
  HONG_YEN_GIUA_KI_1_EXAMS,
  EXAM_GIUA_KI_1_DE1_HONG_YEN,
  EXAM_GIUA_KI_1_DE2_HONG_YEN,
  EXAM_GIUA_KI_1_DE3_HONG_YEN,
  EXAM_GIUA_KI_1_DE4_HONG_YEN,
  EXAM_GIUA_KI_1_DE5_HONG_YEN,
  EXAM_GIUA_KI_1_DE6_HONG_YEN,
  EXAM_GIUA_KI_1_DE7_HONG_YEN,
  EXAM_GIUA_KI_1_DE8_HONG_YEN,
  EXAM_GIUA_KI_1_DE9_HONG_YEN,
  EXAM_GIUA_KI_1_DE10_HONG_YEN,
} from "./exams/hongYenGiuaKi1";

// Export individual exams
export {
  MOCK_EXAM_2026,
  OFFICIAL_EXAM_2025,
  MOCK_EXAM_2025_CHUYEN_SP,
  MOCK_EXAM_2025_SO_HN,
  EXAM_GIUA_KI_1,
  EXAM_CUOI_KI_1,
  EXAM_HOC_KI_2,
  HONG_YEN_GIUA_KI_1_EXAMS,
  EXAM_GIUA_KI_1_DE1_HONG_YEN,
  EXAM_GIUA_KI_1_DE2_HONG_YEN,
  EXAM_GIUA_KI_1_DE3_HONG_YEN,
  EXAM_GIUA_KI_1_DE4_HONG_YEN,
  EXAM_GIUA_KI_1_DE5_HONG_YEN,
  EXAM_GIUA_KI_1_DE6_HONG_YEN,
  EXAM_GIUA_KI_1_DE7_HONG_YEN,
  EXAM_GIUA_KI_1_DE8_HONG_YEN,
  EXAM_GIUA_KI_1_DE9_HONG_YEN,
  EXAM_GIUA_KI_1_DE10_HONG_YEN,
};

// Aliases for backwards compatibility
export const MOCK_EXAM_2025: ExamData = OFFICIAL_EXAM_2025;
export const MOCK_EXAM_GIUA_KI_1: ExamData = EXAM_GIUA_KI_1_DE4_HONG_YEN;
export const MOCK_EXAM_CUOI_KI_1: ExamData = EXAM_CUOI_KI_1;
export const MOCK_EXAM_GIUA_CUOI_KI_2: ExamData = EXAM_HOC_KI_2;

// All authentic default official & mock exams in the Exam Bank (Kho đề thi)
export const ALL_DEFAULT_OFFICIAL_EXAMS: ExamData[] = [
  ...HONG_YEN_GIUA_KI_1_EXAMS,
  OFFICIAL_EXAM_2025,
  MOCK_EXAM_2026,
  MOCK_EXAM_2025_CHUYEN_SP,
  MOCK_EXAM_2025_SO_HN,
  EXAM_GIUA_KI_1,
  EXAM_CUOI_KI_1,
  EXAM_HOC_KI_2,
];

// Default milestone mapping for the 4 primary milestones
export const EXAMS_BY_MILESTONE: Record<MilestoneType, ExamData> = {
  GIUA_KI_1: EXAM_GIUA_KI_1_DE4_HONG_YEN,
  CUOI_KI_1: EXAM_CUOI_KI_1,
  GIUA_CUOI_KI_2: EXAM_HOC_KI_2,
  TOT_NGHIEP_THPT: OFFICIAL_EXAM_2025,
};
