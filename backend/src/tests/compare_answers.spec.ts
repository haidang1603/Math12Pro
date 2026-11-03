import {
  EXAM_GIUA_KI_1_DE4_HONG_YEN,
  EXAM_GIUA_KI_1_DE5_HONG_YEN,
  EXAM_GIUA_KI_1_DE6_HONG_YEN,
  EXAM_GIUA_KI_1_DE7_HONG_YEN,
  EXAM_GIUA_KI_1_DE8_HONG_YEN,
  EXAM_GIUA_KI_1_DE9_HONG_YEN,
  EXAM_GIUA_KI_1_DE10_HONG_YEN,
} from '../../../src/data/exams/hongYenGiuaKi1';

const userKeys: Record<string, { p1: string[]; p2: string[]; p3: string[] }> = {
  de4: {
    p1: ['B', 'C', 'C', 'C', 'B', 'C', 'C', 'C', 'B', 'A', 'B', 'C'],
    p2: ['ĐSĐĐ', 'ĐĐSĐ', 'ĐĐĐĐ', 'ĐĐĐS'],
    p3: ['6', '5', '60', '3'],
  },
  de5: {
    p1: ['B', 'A', 'B', 'C', 'B', 'B', 'C', 'B', 'B', 'A', 'B', 'C'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐSĐ', 'ĐĐĐS'],
    p3: ['5', '10', '80', '39'],
  },
  de6: {
    p1: ['B', 'C', 'B', 'C', 'B', 'B', 'B', 'B', 'C', 'A', 'B', 'C'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐĐS', 'ĐĐĐS'],
    p3: ['12', '3', '75', '45'],
  },
  de7: {
    p1: ['B', 'B', 'C', 'B', 'B', 'A', 'B', 'C', 'A', 'A', 'B', 'B'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐĐS', 'ĐĐĐS'],
    p3: ['4', '4', '80', '36'],
  },
  de8: {
    p1: ['B', 'C', 'B', 'C', 'A', 'C', 'B', 'B', 'B', 'A', 'C', 'B'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐSĐ', 'ĐĐĐS'],
    p3: ['13', '6', '1700', '75'],
  },
  de9: {
    p1: ['B', 'B', 'B', 'C', 'B', 'B', 'B', 'B', 'B', 'A', 'B', 'C'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐĐS', 'ĐĐĐS'],
    p3: ['5', '6', '110', '111'],
  },
  de10: {
    p1: ['B', 'B', 'B', 'B', 'A', 'B', 'C', 'B', 'B', 'A', 'B', 'B'],
    p2: ['ĐSĐĐ', 'ĐĐĐS', 'ĐĐSĐ', 'ĐĐSĐ'],
    p3: ['3', '80', '125', '130'],
  },
};

describe('Official Answer Key Alignment (Đề 4 - Đề 10 Cô Lê Thị Hồng Yến)', () => {
  const exams = [
    { key: 'de4', exam: EXAM_GIUA_KI_1_DE4_HONG_YEN },
    { key: 'de5', exam: EXAM_GIUA_KI_1_DE5_HONG_YEN },
    { key: 'de6', exam: EXAM_GIUA_KI_1_DE6_HONG_YEN },
    { key: 'de7', exam: EXAM_GIUA_KI_1_DE7_HONG_YEN },
    { key: 'de8', exam: EXAM_GIUA_KI_1_DE8_HONG_YEN },
    { key: 'de9', exam: EXAM_GIUA_KI_1_DE9_HONG_YEN },
    { key: 'de10', exam: EXAM_GIUA_KI_1_DE10_HONG_YEN },
  ];

  for (const { key, exam } of exams) {
    it(`should strictly match official answer key for ${key.toUpperCase()}`, () => {
      const p1 = (exam.part1 || []).map((q: any) => q.correctAnswer);
      const p2 = (exam.part2 || []).map((q: any) =>
        (q.statements || []).map((s: any) => (s.correct ? 'Đ' : 'S')).join('')
      );
      const p3 = (exam.part3 || []).map((q: any) => q.correctAnswer);

      expect(p1).toEqual(userKeys[key].p1);
      expect(p2).toEqual(userKeys[key].p2);
      expect(p3).toEqual(userKeys[key].p3);
    });
  }
});
