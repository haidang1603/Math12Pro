import { Injectable, BadRequestException } from "@nestjs/common";
import { MilestoneType } from "@prisma/client";
import { StepType } from "../dto/mastery-gate.dto";

export interface MockPrismaProgressRecord {
  userId: string;
  chapterId: number;
  stepType: StepType;
  isCompleted: boolean;
  bestScore?: number | null;
}

export interface MilestoneUnlockResult {
  milestone: MilestoneType;
  isUnlocked: boolean;
  requiredChapters: number[];
  unmetConditions: string[];
}

@Injectable()
export class MasteryGateService {
  // In NestJS, PrismaService is injected here via constructor:
  // constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper to verify if step ordering is respected:
   * THEORY -> EXAMPLES -> PRACTICE -> CHAPTER_TEST
   */
  public getPreviousStep(step: StepType): StepType | null {
    switch (step) {
      case "THEORY":
        return null;
      case "EXAMPLES":
        return "THEORY";
      case "PRACTICE":
        return "EXAMPLES";
      case "CHAPTER_TEST":
        return "PRACTICE";
      default:
        return null;
    }
  }

  /**
   * Evaluates if a student has met the Mastery Gate requirements
   * for unlocking "Phòng thi Giữa Học kì 1" (MID_TERM_1):
   * Rule: Must score at least 7.0 / 10.0 on CHAPTER_TEST for both Chapter 1 and Chapter 2.
   */
  public evaluateMidTerm1Unlock(
    chapterProgressList: MockPrismaProgressRecord[]
  ): { isUnlocked: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const PASSING_SCORE = 7.0;

    // Check Chapter 1 test
    const ch1Test = chapterProgressList.find(
      (p) => p.chapterId === 1 && p.stepType === "CHAPTER_TEST"
    );
    const ch1Score = ch1Test?.bestScore != null ? Number(ch1Test.bestScore) : 0;
    if (!ch1Test || !ch1Test.isCompleted || ch1Score < PASSING_SCORE) {
      reasons.push(
        `Chưa đạt yêu cầu Chương 1: Điểm kiểm tra hiện tại là ${ch1Score.toFixed(1)}/10.0 (Yêu cầu tối thiểu ${PASSING_SCORE.toFixed(1)})`
      );
    }

    // Check Chapter 2 test
    const ch2Test = chapterProgressList.find(
      (p) => p.chapterId === 2 && p.stepType === "CHAPTER_TEST"
    );
    const ch2Score = ch2Test?.bestScore != null ? Number(ch2Test.bestScore) : 0;
    if (!ch2Test || !ch2Test.isCompleted || ch2Score < PASSING_SCORE) {
      reasons.push(
        `Chưa đạt yêu cầu Chương 2: Điểm kiểm tra hiện tại là ${ch2Score.toFixed(1)}/10.0 (Yêu cầu tối thiểu ${PASSING_SCORE.toFixed(1)})`
      );
    }

    const isUnlocked = reasons.length === 0;
    return { isUnlocked, reasons };
  }

  /**
   * General unlock evaluation for all 4 exam milestones
   */
  public evaluateMilestoneUnlock(
    milestone: MilestoneType,
    chapterProgressList: MockPrismaProgressRecord[]
  ): MilestoneUnlockResult {
    const PASSING_SCORE = 7.0;
    const unmetConditions: string[] = [];
    let requiredChapters: number[] = [];

    switch (milestone) {
      case "MID_TERM_1":
        requiredChapters = [1, 2];
        break;
      case "END_TERM_1":
        requiredChapters = [1, 2, 3];
        break;
      case "TERM_2":
        requiredChapters = [4, 5, 6];
        break;
      case "GRADUATION_THPT":
        requiredChapters = [1, 2, 3, 4, 5, 6];
        break;
    }

    for (const chId of requiredChapters) {
      const testRecord = chapterProgressList.find(
        (p) => p.chapterId === chId && p.stepType === "CHAPTER_TEST"
      );
      const score = testRecord?.bestScore != null ? Number(testRecord.bestScore) : 0;

      if (!testRecord || !testRecord.isCompleted || score < PASSING_SCORE) {
        unmetConditions.push(
          `Chương ${chId}: Cần hoàn thành bài kiểm tra cuối chương với điểm >= ${PASSING_SCORE}. Hiện tại: ${score.toFixed(1)} điểm.`
        );
      }
    }

    return {
      milestone,
      isUnlocked: unmetConditions.length === 0,
      requiredChapters,
      unmetConditions,
    };
  }

  /**
   * Check if a student can attempt a specific step within a chapter
   * (Must complete previous step first)
   */
  public canAttemptStep(
    step: StepType,
    existingProgress: MockPrismaProgressRecord[]
  ): boolean {
    const prevStep = this.getPreviousStep(step);
    if (!prevStep) return true; // THEORY has no prerequisites

    const prevRecord = existingProgress.find((p) => p.stepType === prevStep);
    return Boolean(prevRecord && prevRecord.isCompleted);
  }
}
