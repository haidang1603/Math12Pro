import { MilestoneType } from "@prisma/client";

export type StepType = "THEORY" | "EXAMPLES" | "PRACTICE" | "CHAPTER_TEST";

export interface ChapterStepStatusDto {
  stepType: StepType;
  isCompleted: boolean;
  score?: number;
  completedAt?: Date;
}

export interface ChapterGateStatusDto {
  chapterId: number;
  chapterTitle: string;
  isUnlocked: boolean;
  steps: {
    theoryCompleted: boolean;
    examplesCompleted: boolean;
    practiceCompleted: boolean;
    chapterTestScore?: number; // 0.00 to 10.00
    chapterTestPassed: boolean; // >= 7.0
  };
}

export interface MilestoneUnlockStatusDto {
  milestone: MilestoneType;
  isUnlocked: boolean;
  requiredChapters: number[];
  requirementsDescription: string;
  unmetRequirements: string[];
}
