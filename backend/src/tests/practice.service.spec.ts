jest.mock("@nestjs/common", () => ({
  Injectable: () => (target: any) => target,
  NotFoundException: class NotFoundException extends Error {},
  BadRequestException: class BadRequestException extends Error {},
}));

import { PracticeService, IPracticePrismaService } from "../services/practice.service";
import { CheckSingleQuestionDto } from "../dto/practice.dto";

describe("PracticeService (Ôn Luyện Tự Do & Mastery Tracking)", () => {
  let service: PracticeService;

  beforeEach(() => {
    service = new PracticeService();
  });

  describe("checkSingleQuestion - Single Choice (Phần I)", () => {
    it("should grant 0.25 points and update mastery on correct answer", async () => {
      const mockQuestion = {
        id: "q-1",
        chapterId: 1,
        format: "SINGLE_CHOICE",
        maxPoints: 0.25,
        correctAnswer: "B",
        generalExplanation: "Lời giải chi tiết câu 1",
      };

      const mockPrisma: IPracticePrismaService = {
        question: {
          findMany: jest.fn(),
          findUnique: jest.fn().mockResolvedValue(mockQuestion),
        },
        chapterMastery: {
          findUnique: jest.fn().mockResolvedValue({ totalAttempted: 3, totalCorrect: 2 }),
          upsert: jest.fn().mockImplementation(({ create, update }) => ({
            masteryScore: 75.0, // (2+1) / (3+1) = 75%
          })),
        },
        mistakeNotebook: {
          findUnique: jest.fn(),
          upsert: jest.fn(),
          update: jest.fn(),
        },
      };

      const dto: CheckSingleQuestionDto = {
        questionId: "q-1",
        userAnswer: "B",
      };

      const result = await service.checkSingleQuestion("user-123", dto, mockPrisma);

      expect(result.isCorrect).toBe(true);
      expect(result.isFullPoints).toBe(true);
      expect(result.pointsEarned).toBe(0.25);
      expect(result.currentChapterMastery).toBe(75.0);
    });

    it("should upsert into MistakeNotebook on wrong answer", async () => {
      const mockQuestion = {
        id: "q-1",
        chapterId: 1,
        problemTypeId: "type-monotonicity",
        format: "SINGLE_CHOICE",
        maxPoints: 0.25,
        correctAnswer: "B",
        generalExplanation: "Lời giải chi tiết câu 1",
      };

      const mockUpsertMistake = jest.fn();
      const mockPrisma: IPracticePrismaService = {
        question: {
          findMany: jest.fn(),
          findUnique: jest.fn().mockResolvedValue(mockQuestion),
        },
        chapterMastery: {
          findUnique: jest.fn().mockResolvedValue(null),
          upsert: jest.fn().mockResolvedValue({ masteryScore: 0.0 }),
        },
        mistakeNotebook: {
          findUnique: jest.fn(),
          upsert: mockUpsertMistake,
          update: jest.fn(),
        },
      };

      const dto: CheckSingleQuestionDto = {
        questionId: "q-1",
        userAnswer: "A", // wrong answer
      };

      const result = await service.checkSingleQuestion("user-123", dto, mockPrisma);

      expect(result.isCorrect).toBe(false);
      expect(result.isFullPoints).toBe(false);
      expect(result.pointsEarned).toBe(0);
      expect(mockUpsertMistake).toHaveBeenCalled();
    });
  });

  describe("checkSingleQuestion - True/False (Phần II Lũy tiến)", () => {
    it("should compute progressive points (0.50 pt for 3 correct) and upsert mistake because not full points", async () => {
      const mockQuestion = {
        id: "q-tf-1",
        chapterId: 4,
        format: "TRUE_FALSE",
        maxPoints: 1.0,
        statements: [
          { key: "a", correct: true, explanation: "Giải a" },
          { key: "b", correct: false, explanation: "Giải b" },
          { key: "c", correct: true, explanation: "Giải c" },
          { key: "d", correct: false, explanation: "Giải d" },
        ],
        generalExplanation: "Lời giải chung",
      };

      const mockUpsertMistake = jest.fn();
      const mockPrisma: IPracticePrismaService = {
        question: {
          findMany: jest.fn(),
          findUnique: jest.fn().mockResolvedValue(mockQuestion),
        },
        chapterMastery: {
          findUnique: jest.fn().mockResolvedValue(null),
          upsert: jest.fn().mockResolvedValue({ masteryScore: 0.0 }),
        },
        mistakeNotebook: {
          findUnique: jest.fn(),
          upsert: mockUpsertMistake,
          update: jest.fn(),
        },
      };

      // 3 correct statements: a, b, c correct; d wrong
      const dto: CheckSingleQuestionDto = {
        questionId: "q-tf-1",
        userAnswer: { a: true, b: false, c: true, d: true },
      };

      const result = await service.checkSingleQuestion("user-123", dto, mockPrisma);

      expect(result.pointsEarned).toBe(0.5);
      expect(result.isFullPoints).toBe(false);
      expect(mockUpsertMistake).toHaveBeenCalled();
    });
  });

  describe("checkSingleQuestion - Short Answer (Phần III Chuẩn hóa)", () => {
    it("should accept alternative string formats like '2.5' when correct is '2,5'", async () => {
      const mockQuestion = {
        id: "q-sa-1",
        chapterId: 3,
        format: "SHORT_ANSWER",
        maxPoints: 0.5,
        correctAnswer: "2,5",
        acceptableAnswers: ["2.5"],
        generalExplanation: "Độ lệch chuẩn s = 2,5",
      };

      const mockPrisma: IPracticePrismaService = {
        question: {
          findMany: jest.fn(),
          findUnique: jest.fn().mockResolvedValue(mockQuestion),
        },
        chapterMastery: {
          findUnique: jest.fn().mockResolvedValue(null),
          upsert: jest.fn().mockResolvedValue({ masteryScore: 100.0 }),
        },
        mistakeNotebook: {
          findUnique: jest.fn(),
          upsert: jest.fn(),
          update: jest.fn(),
        },
      };

      const dto: CheckSingleQuestionDto = {
        questionId: "q-sa-1",
        userAnswer: "  2.5  ", // spaces and period
      };

      const result = await service.checkSingleQuestion("user-123", dto, mockPrisma);

      expect(result.isCorrect).toBe(true);
      expect(result.isFullPoints).toBe(true);
      expect(result.pointsEarned).toBe(0.5);
    });
  });
});
