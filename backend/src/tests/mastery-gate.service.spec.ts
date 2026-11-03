jest.mock("@nestjs/common", () => ({
  Injectable: () => (target: any) => target,
  NotFoundException: class NotFoundException extends Error {},
  BadRequestException: class BadRequestException extends Error {},
}));

import { MasteryGateService, MockPrismaProgressRecord } from "../services/mastery-gate.service";

describe("MasteryGateService (Logic Khóa chốt chặn)", () => {
  let service: MasteryGateService;

  beforeEach(() => {
    service = new MasteryGateService();
  });

  describe("evaluateMidTerm1Unlock (Điều kiện mở khóa Phòng thi Giữa Học kì 1)", () => {
    it("should keep Mid-Term 1 locked if Chapter 1 score is under 7.0", () => {
      const progress: MockPrismaProgressRecord[] = [
        { userId: "u1", chapterId: 1, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 6.8 },
        { userId: "u1", chapterId: 2, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 8.5 },
      ];

      const result = service.evaluateMidTerm1Unlock(progress);
      expect(result.isUnlocked).toBe(false);
      expect(result.reasons.length).toBeGreaterThan(0);
      expect(result.reasons[0]).toContain("Chương 1");
    });

    it("should keep Mid-Term 1 locked if Chapter 2 score is under 7.0", () => {
      const progress: MockPrismaProgressRecord[] = [
        { userId: "u1", chapterId: 1, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 8.0 },
        { userId: "u1", chapterId: 2, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 5.5 },
      ];

      const result = service.evaluateMidTerm1Unlock(progress);
      expect(result.isUnlocked).toBe(false);
      expect(result.reasons[0]).toContain("Chương 2");
    });

    it("should UNLOCK Mid-Term 1 when both Chapter 1 and Chapter 2 scores are >= 7.0", () => {
      const progress: MockPrismaProgressRecord[] = [
        { userId: "u1", chapterId: 1, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 7.0 },
        { userId: "u1", chapterId: 2, stepType: "CHAPTER_TEST", isCompleted: true, bestScore: 7.5 },
      ];

      const result = service.evaluateMidTerm1Unlock(progress);
      expect(result.isUnlocked).toBe(true);
      expect(result.reasons.length).toBe(0);
    });
  });

  describe("canAttemptStep (Tuân thủ thứ tự 4 bước: THEORY -> EXAMPLES -> PRACTICE -> CHAPTER_TEST)", () => {
    it("should always allow THEORY step without prerequisites", () => {
      expect(service.canAttemptStep("THEORY", [])).toBe(true);
    });

    it("should not allow PRACTICE if EXAMPLES is not completed", () => {
      const progress: MockPrismaProgressRecord[] = [
        { userId: "u1", chapterId: 1, stepType: "THEORY", isCompleted: true },
        { userId: "u1", chapterId: 1, stepType: "EXAMPLES", isCompleted: false },
      ];

      expect(service.canAttemptStep("PRACTICE", progress)).toBe(false);
    });

    it("should allow CHAPTER_TEST once PRACTICE is completed", () => {
      const progress: MockPrismaProgressRecord[] = [
        { userId: "u1", chapterId: 1, stepType: "THEORY", isCompleted: true },
        { userId: "u1", chapterId: 1, stepType: "EXAMPLES", isCompleted: true },
        { userId: "u1", chapterId: 1, stepType: "PRACTICE", isCompleted: true },
      ];

      expect(service.canAttemptStep("CHAPTER_TEST", progress)).toBe(true);
    });
  });
});
