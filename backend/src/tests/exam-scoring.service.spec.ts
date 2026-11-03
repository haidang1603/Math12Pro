jest.mock("@nestjs/common", () => ({
  Injectable: () => (target: any) => target,
  NotFoundException: class NotFoundException extends Error {},
  BadRequestException: class BadRequestException extends Error {},
}));

import { ExamScoringService, QuestionEntity } from "../services/exam-scoring.service";
import { SubmitExamDto } from "../dto/submit-exam.dto";

describe("ExamScoringService (Thuật toán chấm điểm chuẩn 2025-2026)", () => {
  let service: ExamScoringService;

  beforeEach(() => {
    service = new ExamScoringService();
  });

  describe("Short Answer Normalization (Chuẩn hóa trả lời ngắn)", () => {
    it("should trim whitespace around the answer", () => {
      expect(service.normalizeShortAnswer("  18  ")).toBe("18");
    });

    it("should convert period '.' to comma ','", () => {
      expect(service.normalizeShortAnswer("2.5")).toBe("2,5");
      expect(service.normalizeShortAnswer("-0.75")).toBe("-0,7"); // Limited to 4 chars
    });

    it("should restrict length to at most 4 characters", () => {
      expect(service.normalizeShortAnswer("123456")).toBe("1234");
      expect(service.normalizeShortAnswer("-2,5")).toBe("-2,5");
    });

    it("should handle null or undefined gracefully", () => {
      expect(service.normalizeShortAnswer(null)).toBe("");
      expect(service.normalizeShortAnswer(undefined)).toBe("");
    });
  });

  describe("Part II Progressive Scoring Rule (Quy tắc lũy tiến Đúng/Sai)", () => {
    it("should return 0.00 for 0 correct statements", () => {
      expect(service.calculatePart2Points(0)).toBe(0.0);
    });

    it("should return 0.10 for 1 correct statement", () => {
      expect(service.calculatePart2Points(1)).toBe(0.1);
    });

    it("should return 0.25 for 2 correct statements", () => {
      expect(service.calculatePart2Points(2)).toBe(0.25);
    });

    it("should return 0.50 for 3 correct statements", () => {
      expect(service.calculatePart2Points(3)).toBe(0.5);
    });

    it("should return 1.00 for all 4 correct statements", () => {
      expect(service.calculatePart2Points(4)).toBe(1.0);
    });
  });

  describe("Full 22-Question Exam Grading Simulation", () => {
    const mockQuestions: QuestionEntity[] = [
      // Part I: 12 questions (0.25 pt each)
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `q-p1-${i + 1}`,
        chapterId: (i % 6) + 1,
        section: "PART_1_SINGLE_CHOICE" as const,
        questionNumber: i + 1,
        topic: `Chủ đề P1-${i + 1}`,
        maxPoints: 0.25,
        correctAnswer: "A",
        explanation: "Lời giải P1",
      })),

      // Part II: 4 questions (1.0 pt each)
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `q-p2-${i + 1}`,
        chapterId: i + 1,
        section: "PART_2_TRUE_FALSE" as const,
        questionNumber: i + 1,
        topic: `Chủ đề P2-${i + 1}`,
        maxPoints: 1.0,
        statements: [
          { key: "a" as const, text: "Ý a", correct: true, explanation: "Giải a" },
          { key: "b" as const, text: "Ý b", correct: false, explanation: "Giải b" },
          { key: "c" as const, text: "Ý c", correct: true, explanation: "Giải c" },
          { key: "d" as const, text: "Ý d", correct: false, explanation: "Giải d" },
        ],
        explanation: "Lời giải P2",
      })),

      // Part III: 6 questions (0.50 pt each)
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `q-p3-${i + 1}`,
        chapterId: i + 1,
        section: "PART_3_SHORT_ANSWER" as const,
        questionNumber: i + 1,
        topic: `Chủ đề P3-${i + 1}`,
        maxPoints: 0.5,
        correctAnswer: i === 0 ? "2,5" : `${(i + 1) * 2}`,
        acceptableAnswers: i === 0 ? ["2.5"] : [],
        explanation: "Lời giải P3",
      })),
    ];

    it("should score a perfect exam with 10.00 points", () => {
      const perfectSubmission: SubmitExamDto = {
        examId: "exam-test-1",
        timeSpentSeconds: 4500,
        // All Part I answers correct
        part1: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`q-p1-${i + 1}`, "A"])),
        // All Part II answers correct
        part2: Object.fromEntries(
          Array.from({ length: 4 }, (_, i) => [
            `q-p2-${i + 1}`,
            { a: true, b: false, c: true, d: false },
          ])
        ),
        // All Part III answers correct
        part3: {
          "q-p3-1": "2.5", // tests period conversion
          "q-p3-2": "4",
          "q-p3-3": "6",
          "q-p3-4": "8",
          "q-p3-5": "10",
          "q-p3-6": "12",
        },
      };

      const result = service.gradeExam(mockQuestions, perfectSubmission);

      expect(result.scorePart1).toBe(3.0);
      expect(result.scorePart2).toBe(4.0);
      expect(result.scorePart3).toBe(3.0);
      expect(result.totalScore).toBe(10.0);
      expect(result.weakChapters.length).toBe(0);
    });

    it("should correctly apply progressive scoring on Part II when only 3 statements are correct", () => {
      const submission: SubmitExamDto = {
        examId: "exam-test-1",
        timeSpentSeconds: 3600,
        part1: {},
        part2: {
          // Question 1: 3 statements correct (a, b, c correct; d wrong) -> +0.50 pt
          "q-p2-1": { a: true, b: false, c: true, d: true },
          // Question 2: 2 statements correct (a, b correct) -> +0.25 pt
          "q-p2-2": { a: true, b: false, c: false, d: true },
          // Question 3: 1 statement correct (a correct) -> +0.10 pt
          "q-p2-3": { a: true, b: true, c: false, d: true },
          // Question 4: 0 statement correct -> 0.00 pt
          "q-p2-4": { a: false, b: true, c: false, d: true },
        },
        part3: {},
      };

      const result = service.gradeExam(mockQuestions, submission);

      // Expected Part II = 0.50 + 0.25 + 0.10 + 0 = 0.85 pt
      expect(result.scorePart2).toBe(0.85);
      expect(result.totalScore).toBe(0.85);
    });

    it("should identify weak chapters with mastery percentage < 75%", () => {
      const partialSubmission: SubmitExamDto = {
        examId: "exam-test-1",
        timeSpentSeconds: 3000,
        // Only answer questions of Chapter 1 and 2
        part1: { "q-p1-1": "A", "q-p1-2": "A" },
        part2: { "q-p2-1": { a: true, b: false, c: true, d: false } },
        part3: { "q-p3-1": "2,5" },
      };

      const result = service.gradeExam(mockQuestions, partialSubmission);

      // Chapters 3, 4, 5, 6 should be identified as weak
      const weakChapterIds = result.weakChapters.map((c) => c.chapterId);
      expect(weakChapterIds).toContain(3);
      expect(weakChapterIds).toContain(4);
      expect(weakChapterIds).toContain(5);
      expect(weakChapterIds).toContain(6);
    });
  });
});
