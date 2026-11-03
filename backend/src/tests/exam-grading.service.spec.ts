jest.mock("@nestjs/common", () => ({
  Injectable: () => (target: any) => target,
  NotFoundException: class NotFoundException extends Error {},
  BadRequestException: class BadRequestException extends Error {},
}));

import { ExamGradingService } from "../services/exam-grading.service";
import { SubmitExamDto } from "../dto/exam.dto";

describe("ExamGradingService (Unit Test Chấm Điểm Chuẩn 2025-2026)", () => {
  let service: ExamGradingService;

  beforeEach(() => {
    service = new ExamGradingService();
  });

  // =========================================================================
  // TEST SUITE 1: EDGE CASES OF PART III SHORT ANSWER NORMALIZATION
  // =========================================================================
  describe("normalizeShortAnswer (Chuẩn hóa trả lời ngắn Phần III)", () => {
    it("should trim leading and trailing spaces and newlines", () => {
      expect(service.normalizeShortAnswer("   18   ")).toBe("18");
      expect(service.normalizeShortAnswer("\n 3 \t")).toBe("3");
    });

    it("should convert decimal point '.' to comma ',' (chuẩn dấu phẩy VN)", () => {
      expect(service.normalizeShortAnswer("2.5")).toBe("2,5");
      expect(service.normalizeShortAnswer("0.75")).toBe("0,75");
    });

    it("should strictly limit string length to maximum 4 characters", () => {
      expect(service.normalizeShortAnswer("123456")).toBe("1234");
      expect(service.normalizeShortAnswer("-12.5")).toBe("-12,"); // '-12,' is 4 chars
      expect(service.normalizeShortAnswer("-2,5")).toBe("-2,5");
    });

    it("should handle null, undefined, numbers, and empty strings gracefully", () => {
      expect(service.normalizeShortAnswer(null)).toBe("");
      expect(service.normalizeShortAnswer(undefined)).toBe("");
      expect(service.normalizeShortAnswer("")).toBe("");
      expect(service.normalizeShortAnswer(18)).toBe("18");
      expect(service.normalizeShortAnswer(2.5)).toBe("2,5");
    });

    it("should correctly preserve negative integers and signs within 4 chars", () => {
      expect(service.normalizeShortAnswer("-15")).toBe("-15");
      expect(service.normalizeShortAnswer("-100")).toBe("-100");
    });
  });

  // =========================================================================
  // TEST SUITE 2: EDGE CASES OF PART II TRUE/FALSE PROGRESSIVE SCORING
  // =========================================================================
  describe("calculatePart2ProgressivePoints (Quy tắc lũy tiến Đúng/Sai Phần II)", () => {
    it("should grant 0.00 points when 0 statements are correct", () => {
      expect(service.calculatePart2ProgressivePoints(0)).toBe(0.0);
    });

    it("should grant exactly 0.10 points when 1 statement is correct", () => {
      expect(service.calculatePart2ProgressivePoints(1)).toBe(0.1);
    });

    it("should grant exactly 0.25 points when 2 statements are correct", () => {
      expect(service.calculatePart2ProgressivePoints(2)).toBe(0.25);
    });

    it("should grant exactly 0.50 points when 3 statements are correct", () => {
      expect(service.calculatePart2ProgressivePoints(3)).toBe(0.5);
    });

    it("should grant maximum 1.00 point when all 4 statements are correct", () => {
      expect(service.calculatePart2ProgressivePoints(4)).toBe(1.0);
    });

    it("should return 0.00 for invalid, negative, or overflow values", () => {
      expect(service.calculatePart2ProgressivePoints(-1)).toBe(0.0);
      expect(service.calculatePart2ProgressivePoints(5)).toBe(0.0);
    });
  });

  // =========================================================================
  // TEST SUITE 3: FULL 22-QUESTION EXAM GRADING & RADAR CALCULATION
  // =========================================================================
  describe("gradeSubmission (Tổng hợp đề thi chuẩn Bộ GD&ĐT 22 câu)", () => {
    const mockExamQuestions = [
      // 12 câu Phần I (0.25đ/câu)
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `q-p1-${i + 1}`,
        chapterId: (i % 6) + 1,
        topicId: `topic-${(i % 6) + 1}`,
        topic: { title: `Chuyên đề ${(i % 6) + 1}` },
        format: "SINGLE_CHOICE",
        questionNumber: i + 1,
        maxPoints: 0.25,
        correctAnswer: "A",
      })),

      // 4 câu Phần II (tối đa 1.0đ/câu)
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `q-p2-${i + 1}`,
        chapterId: i + 1,
        topicId: `topic-${i + 1}`,
        topic: { title: `Chuyên đề ${i + 1}` },
        format: "TRUE_FALSE",
        questionNumber: i + 1,
        maxPoints: 1.0,
        statements: [
          { key: "a", correct: true },
          { key: "b", correct: false },
          { key: "c", correct: true },
          { key: "d", correct: false },
        ],
      })),

      // 6 câu Phần III (0.50đ/câu)
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `q-p3-${i + 1}`,
        chapterId: i + 1,
        topicId: `topic-${i + 1}`,
        topic: { title: `Chuyên đề ${i + 1}` },
        format: "SHORT_ANSWER",
        questionNumber: i + 1,
        maxPoints: 0.5,
        correctAnswer: i === 0 ? "2,5" : `${(i + 1) * 2}`,
        acceptableAnswers: i === 0 ? ["2.5"] : [],
      })),
    ];

    it("should score a perfect submission with exactly 10.00 total points", () => {
      const perfectDto: SubmitExamDto = {
        examId: "exam-thpt-2025",
        timeSpentSeconds: 4800,
        part1: Object.fromEntries(
          Array.from({ length: 12 }, (_, i) => [`q-p1-${i + 1}`, "A"])
        ),
        part2: Object.fromEntries(
          Array.from({ length: 4 }, (_, i) => [
            `q-p2-${i + 1}`,
            { a: true, b: false, c: true, d: false },
          ])
        ),
        part3: {
          "q-p3-1": "2.5", // tests '.' to ',' normalization
          "q-p3-2": "4",
          "q-p3-3": "6",
          "q-p3-4": "8",
          "q-p3-5": "10",
          "q-p3-6": "12",
        },
      };

      const result = service.gradeSubmission(mockExamQuestions, perfectDto);

      expect(result.scorePart1).toBe(3.0);
      expect(result.scorePart2).toBe(4.0);
      expect(result.scorePart3).toBe(3.0);
      expect(result.totalScore).toBe(10.0);
      expect(result.radarAnalysis.length).toBe(6);
      expect(result.weakTopics.length).toBe(0);
    });

    it("should compute exact progressive score for mixed Part II statements", () => {
      const mixedDto: SubmitExamDto = {
        examId: "exam-thpt-2025",
        timeSpentSeconds: 4200,
        part1: {},
        part2: {
          // Câu 1: đúng cả 4 ý -> 1.00đ
          "q-p2-1": { a: true, b: false, c: true, d: false },
          // Câu 2: đúng 3 ý (a, b, c đúng; d sai) -> 0.50đ
          "q-p2-2": { a: true, b: false, c: true, d: true },
          // Câu 3: đúng 2 ý (a, b đúng; c, d sai) -> 0.25đ
          "q-p2-3": { a: true, b: false, c: false, d: true },
          // Câu 4: đúng 1 ý (a đúng) -> 0.10đ
          "q-p2-4": { a: true, b: true, c: false, d: true },
        },
        part3: {},
      };

      const result = service.gradeSubmission(mockExamQuestions, mixedDto);

      // Part II = 1.00 + 0.50 + 0.25 + 0.10 = 1.85đ
      expect(result.scorePart2).toBe(1.85);
      expect(result.totalScore).toBe(1.85);
      // Questions 2, 3, 4 should be marked with isFullPoints = false
      const nonFullPointsDetails = result.gradedDetails.filter((d) => !d.isFullPoints);
      expect(nonFullPointsDetails.length).toBeGreaterThan(0);
    });

    it("should accurately calculate radar analysis percentages across 6 chapters", () => {
      const dto: SubmitExamDto = {
        examId: "exam-thpt-2025",
        timeSpentSeconds: 3000,
        part1: {
          "q-p1-1": "A", // Chapter 1
          "q-p1-2": "A", // Chapter 2
        },
        part2: {},
        part3: {},
      };

      const result = service.gradeSubmission(mockExamQuestions, dto);

      expect(result.radarAnalysis.length).toBe(6);
      const ch1Radar = result.radarAnalysis.find((r) => r.chapterId === 1);
      expect(ch1Radar).toBeDefined();
      expect(ch1Radar?.earnedScore).toBeGreaterThan(0);
      expect(result.weakTopics.length).toBeGreaterThan(0);
    });
  });
});
