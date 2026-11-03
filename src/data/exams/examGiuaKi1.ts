import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1: ExamData = {
  id: "toan12-giua-ki-1-chuan",
  title: "Đề Kiểm Tra Giữa Học Kì 1 - Môn Toán 12",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Tổ Toán THPT - Đề Chuẩn Kiến Thức",
  description: "Đề kiểm tra chất lượng Giữa Học Kì 1 Toán 12 chuẩn cấu trúc mới GDPT 2018. Trọng tâm: Đạo hàm & Khảo sát đồ thị hàm số (Chương 1) và Vectơ trong không gian (Chương 2).",
  tags: ["Giữa kì 1", "Toán 12", "Khảo sát hàm số", "Vectơ không gian"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đơn điệu của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau. Hàm số đồng biến trên khoảng nào dưới đây?",
      svgContent: `<svg width="400" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <line x1="10" y1="40" x2="390" y2="40" stroke="#0f172a" stroke-width="1.5" />
  <line x1="10" y1="75" x2="390" y2="75" stroke="#0f172a" stroke-width="1.5" />
  <line x1="70" y1="10" x2="70" y2="110" stroke="#0f172a" stroke-width="1.5" />
  <text x="35" y="30" font-family="Times New Roman, serif" font-size="16" font-style="italic" fill="#0f172a" text-anchor="middle">x</text>
  <text x="35" y="62" font-family="Times New Roman, serif" font-size="16" font-style="italic" fill="#0f172a" text-anchor="middle">f'(x)</text>
  <text x="35" y="100" font-family="Times New Roman, serif" font-size="16" font-style="italic" fill="#0f172a" text-anchor="middle">f(x)</text>
  <text x="95" y="30" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">-∞</text>
  <text x="180" y="30" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">-1</text>
  <text x="270" y="30" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">1</text>
  <text x="360" y="30" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">+∞</text>
  <text x="140" y="62" font-family="Times New Roman, serif" font-size="16" fill="#0f172a" text-anchor="middle">-</text>
  <text x="180" y="62" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">0</text>
  <text x="225" y="62" font-family="Times New Roman, serif" font-size="16" fill="#0f172a" text-anchor="middle">+</text>
  <text x="270" y="62" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">0</text>
  <text x="315" y="62" font-family="Times New Roman, serif" font-size="16" fill="#0f172a" text-anchor="middle">-</text>
  <text x="95" y="88" font-family="Times New Roman, serif" font-size="13" fill="#0f172a" text-anchor="middle">+∞</text>
  <text x="180" y="105" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">-2</text>
  <text x="270" y="88" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">4</text>
  <text x="360" y="105" font-family="Times New Roman, serif" font-size="13" fill="#0f172a" text-anchor="middle">-∞</text>
</svg>`,
      options: [
        { key: "A", text: "$(-1; 3)$" },
        { key: "B", text: "$(-\\infty; -1)$" },
        { key: "C", text: "$(-1; 1)$" },
        { key: "D", text: "$(1; +\\infty)$" }
      ],
      correctAnswer: "C",
      explanation: "Dựa vào bảng biến thiên, trên khoảng $(-1; 1)$, đạo hàm mang dấu dương $f'(x) > 0$ nên hàm số đồng biến trên $(-1; 1)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị của hàm số",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ có đạo hàm $f'(x) = (x - 1)^2(x + 2)(x - 3)$. Số điểm cực trị của hàm số đã cho là",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$3$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$4$" }
      ],
      correctAnswer: "A",
      explanation: "Nghiệm của $f'(x) = 0$ là $x = 1$ (bội 2), $x = -2$ (bội 1), $x = 3$ (bội 1).\nĐạo hàm chỉ đổi dấu khi đi qua các nghiệm đơn $x = -2$ và $x = 3$. Do đó hàm số có đúng 2 điểm cực trị."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị lớn nhất và nhỏ nhất",
      content: "Giá trị nhỏ nhất của hàm số $f(x) = x + \\frac{4}{x}$ trên khoảng $(0; +\\infty)$ bằng",
      options: [
        { key: "A", text: "$4$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$5$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "A",
      explanation: "Áp dụng bất đẳng thức Cauchy cho hai số dương $x$ và $\\frac{4}{x}$:\n$$x + \\frac{4}{x} \\ge 2\\sqrt{x \\cdot \\frac{4}{x}} = 4$$\nDấu đẳng thức xảy ra khi $x = \\frac{4}{x} \\iff x^2 = 4 \\iff x = 2$. Vậy $\\min_{(0; +\\infty)} f(x) = 4$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận xiên",
      content: "Đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 3x + 1}{x - 1}$ là đường thẳng",
      options: [
        { key: "A", text: "$y = x - 2$" },
        { key: "B", text: "$y = x + 2$" },
        { key: "C", text: "$y = x - 1$" },
        { key: "D", text: "$y = 2x - 1$" }
      ],
      correctAnswer: "A",
      explanation: "Chia đa thức: $\\frac{x^2 - 3x + 1}{x - 1} = x - 2 - \\frac{1}{x - 1}$.\nVì $\\lim_{x \\to \\pm\\infty} [y - (x - 2)] = \\lim_{x \\to \\pm\\infty} \\frac{-1}{x - 1} = 0$, nên tiệm cận xiên là $y = x - 2$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Quy tắc hình hộp",
      content: "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ tổng $\\vec{AB} + \\vec{AD} + \\vec{AA'}$ bằng",
      options: [
        { key: "A", text: "$\\vec{AC'}$" },
        { key: "B", text: "$\\vec{CA'}$" },
        { key: "C", text: "$\\vec{BD'}$" },
        { key: "D", text: "$\\vec{DB'}$" }
      ],
      correctAnswer: "A",
      explanation: "Theo quy tắc hình hộp, tổng ba vectơ xuất phát từ đỉnh $A$ dọc theo ba cạnh chung đỉnh bằng vectơ đường chéo xuất phát từ đỉnh đó: $\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Độ dài vectơ và góc giữa hai vectơ",
      content: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $a$. Tích vô hướng $\\vec{BA} \\cdot \\vec{BC}$ bằng",
      options: [
        { key: "A", text: "$0$" },
        { key: "B", text: "$a^2$" },
        { key: "C", text: "$-a^2$" },
        { key: "D", text: "$a^2\\sqrt{2}$" }
      ],
      correctAnswer: "A",
      explanation: "Vì đáy $ABCD$ là hình vuông nên $BA \\perp BC$. Do đó $\\vec{BA} \\cdot \\vec{BC} = 0$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ vectơ trong không gian",
      content: "Trong không gian $Oxyz$, cho $\\vec{u} = 2\\vec{i} - 3\\vec{j} + \\vec{k}$. Tọa độ của vectơ $\\vec{u}$ là",
      options: [
        { key: "A", text: "$(2; -3; 1)$" },
        { key: "B", text: "$(2; 3; 1)$" },
        { key: "C", text: "$(-2; 3; -1)$" },
        { key: "D", text: "$(2; 1; -3)$" }
      ],
      correctAnswer: "A",
      explanation: "Theo định nghĩa tọa độ vectơ theo các vectơ đơn vị $\\vec{i}, \\vec{j}, \\vec{k}$, ta có tọa độ là $(2; -3; 1)$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm uốn của đồ thị hàm số",
      content: "Đồ thị hàm số $y = x^3 - 3x^2 + 2x$ có tọa độ điểm uốn là",
      options: [
        { key: "A", text: "$(1; 0)$" },
        { key: "B", text: "$(0; 0)$" },
        { key: "C", text: "$(2; 0)$" },
        { key: "D", text: "$(1; 2)$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 3x^2 - 6x + 2$, $y'' = 6x - 6 = 0 \\iff x = 1$.\nTại $x = 1 \\implies y = 1 - 3 + 2 = 0$. Điểm uốn là $(1; 0)$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Khoảng cách giữa hai điểm trong Oxyz",
      content: "Trong không gian $Oxyz$, khoảng cách giữa hai điểm $A(1; -2; 3)$ và $B(3; 0; 2)$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$\\sqrt{5}$" },
        { key: "C", text: "$\\sqrt{14}$" },
        { key: "D", text: "$9$" }
      ],
      correctAnswer: "A",
      explanation: "$$AB = \\sqrt{(3 - 1)^2 + (0 - (-2))^2 + (2 - 3)^2} = \\sqrt{4 + 4 + 1} = \\sqrt{9} = 3$$"
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồ thị hàm số bậc nhất trên bậc nhất",
      content: "Đồ thị hàm số $y = \\frac{ax + b}{cx + d}$ có đường tiệm cận đứng $x = 2$ và đường tiệm cận ngang $y = 1$. Khi đó tỉ số $\\frac{a}{c}$ và $-\\frac{d}{c}$ lần lượt là",
      options: [
        { key: "A", text: "$1$ và $2$" },
        { key: "B", text: "$2$ và $1$" },
        { key: "C", text: "$-2$ và $1$" },
        { key: "D", text: "$1$ và $-2$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận đứng: $x = -\\frac{d}{c} = 2$. Tiệm cận ngang: $y = \\frac{a}{c} = 1$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Hai vectơ cùng phương",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (2; m; 4)$ và $\\vec{v} = (1; 3; 2)$. Hai vectơ $\\vec{u}$ và $\\vec{v}$ cùng phương khi",
      options: [
        { key: "A", text: "$m = 6$" },
        { key: "B", text: "$m = 3$" },
        { key: "C", text: "$m = -6$" },
        { key: "D", text: "$m = 2$" }
      ],
      correctAnswer: "A",
      explanation: "Hai vectơ cùng phương khi $\\frac{2}{1} = \\frac{m}{3} = \\frac{4}{2} = 2 \\iff m = 6$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Số tiếp tuyến của đồ thị",
      content: "Số tiếp tuyến của đồ thị hàm số $y = x^3 - 3x$ song song với đường thẳng $y = 9x + 5$ là",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$0$" },
        { key: "D", text: "$3$" }
      ],
      correctAnswer: "A",
      explanation: "Tiếp tuyến song song với đường thẳng có hệ số góc $k = 9$.\n$y' = 3x^2 - 3 = 9 \\iff 3x^2 = 12 \\iff x = \\pm 2$.\nTại $x = 2 \\implies y = 2$, tiếp tuyến: $y = 9(x - 2) + 2 = 9x - 16$.\nTại $x = -2 \\implies y = -2$, tiếp tuyến: $y = 9(x + 2) - 2 = 9x + 16$.\nCả hai tiếp tuyến đều phân biệt và khác đường thẳng $y = 9x + 5$ nên có 2 tiếp tuyến thỏa mãn."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát và vẽ đồ thị hàm số bậc ba",
      context: "Cho hàm số $y = f(x) = -x^3 + 3x - 2$.",
      statements: [
        {
          key: "a",
          text: "Hàm số đồng biến trên khoảng $(-1; 1)$.",
          correct: true,
          explanation: "$f'(x) = -3x^2 + 3 = -3(x^2 - 1) > 0 \\iff -1 < x < 1$."
        },
        {
          key: "b",
          text: "Hàm số đạt cực tiểu tại $x = 1$.",
          correct: false,
          explanation: "Tại $x = -1$, đạo hàm đổi dấu từ âm sang dương nên $x = -1$ là điểm cực tiểu. Tại $x = 1$ là điểm cực đại."
        },
        {
          key: "c",
          text: "Giá trị lớn nhất của hàm số trên đoạn $[0; 2]$ bằng $0$.",
          correct: true,
          explanation: "Xét trên $[0; 2]$: $f(0) = -2, f(1) = 0, f(2) = -8 + 6 - 2 = -4$. Giá trị lớn nhất là $f(1) = 0$."
        },
        {
          key: "d",
          text: "Đồ thị hàm số cắt trục hoành tại đúng một điểm.",
          correct: false,
          explanation: "Phương trình $-x^3 + 3x - 2 = 0 \\iff -(x - 1)^2(x + 2) = 0 \\iff x = 1$ hoặc $x = -2$. Đồ thị tiếp xúc trục hoành tại $x = 1$ và cắt tại $x = -2$ (cắt tại 2 điểm)."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Vectơ trong hình chóp",
      context: "Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của các cạnh $AB$ và $CD$. Gọi $G$ là trung điểm của đoạn thẳng $MN$.",
      statements: [
        {
          key: "a",
          text: "$\\vec{MN} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$.",
          correct: true,
          explanation: "Ta có $\\vec{MN} = \\vec{MA} + \\vec{AD} + \\vec{DN}$ và $\\vec{MN} = \\vec{MB} + \\vec{BC} + \\vec{CN}$. Cộng lại với $\\vec{MA} + \\vec{MB} = \\vec{0}, \\vec{DN} + \\vec{CN} = \\vec{0}$ suy ra $2\\vec{MN} = \\vec{AD} + \\vec{BC}$."
        },
        {
          key: "b",
          text: "$\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$.",
          correct: true,
          explanation: "$G$ là trọng tâm của tứ diện $ABCD$ nên hệ thức $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$ luôn đúng."
        },
        {
          key: "c",
          text: "Với mọi điểm $O$ bất kì, ta luôn có $\\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD} = 4\\vec{OG}$.",
          correct: true,
          explanation: "Chèn điểm $O$ vào hệ thức trọng tâm: $(\\vec{OA} - \\vec{OG}) + (\\vec{OB} - \\vec{OG}) + (\\vec{OC} - \\vec{OG}) + (\\vec{OD} - \\vec{OG}) = \\vec{0} \\implies \\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD} = 4\\vec{OG}$."
        },
        {
          key: "d",
          text: "Nếu $AB \\perp CD$ thì $MN = \\frac{1}{2}(AB + CD)$.",
          correct: false,
          explanation: "Hệ thức độ dài không bằng nửa tổng các cạnh khi hai cạnh vuông góc; độ dài $MN$ tuân theo định lý hình bình hành các trung điểm: $MN^2 = \\frac{AD^2 + BC^2 + AC^2 + BD^2 - AB^2 - CD^2}{4}$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận và tâm đối xứng",
      context: "Cho hàm số $y = \\frac{x^2 - x + 1}{x + 1}$.",
      statements: [
        {
          key: "a",
          text: "Đồ thị hàm số có tiệm cận đứng là $x = -1$.",
          correct: true,
          explanation: "$\\lim_{x \\to -1} y = \\infty \\implies x = -1$ là tiệm cận đứng."
        },
        {
          key: "b",
          text: "Đồ thị hàm số có tiệm cận xiên là $y = x - 2$.",
          correct: true,
          explanation: "Chia tử cho mẫu: $\\frac{x^2 - x + 1}{x + 1} = x - 2 + \\frac{3}{x + 1}$. Tiệm cận xiên là $y = x - 2$."
        },
        {
          key: "c",
          text: "Giao điểm của hai đường tiệm cận là điểm $I(-1; -3)$.",
          correct: true,
          explanation: "Thay $x = -1$ vào tiệm cận xiên: $y = -1 - 2 = -3$. Do đó giao điểm là $I(-1; -3)$."
        },
        {
          key: "d",
          text: "Điểm $I(-1; -3)$ không phải là tâm đối xứng của đồ thị hàm số.",
          correct: false,
          explanation: "Giao điểm của tiệm cận đứng và tiệm cận xiên của hàm phân thức bậc 2 trên bậc 1 luôn là tâm đối xứng của đồ thị."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ không gian trong hình học ứng dụng",
      context: "Trong không gian $Oxyz$, cho tứ diện $ABCD$ với $A(1; 0; 0)$, $B(0; 2; 0)$, $C(0; 0; 3)$ và $D(1; 2; 3)$.",
      statements: [
        {
          key: "a",
          text: "Tọa độ vectơ $\\vec{AB} = (-1; 2; 0)$ và $\\vec{AC} = (-1; 0; 3)$.",
          correct: true,
          explanation: "$\\vec{AB} = (0 - 1; 2 - 0; 0 - 0) = (-1; 2; 0)$ và $\\vec{AC} = (0 - 1; 0 - 0; 3 - 0) = (-1; 0; 3)$."
        },
        {
          key: "b",
          text: "Tích có hướng $[\\vec{AB}, \\vec{AC}] = (6; 3; 2)$.",
          correct: true,
          explanation: "$$x = \\begin{vmatrix} 2 & 0 \\\\ 0 & 3 \\end{vmatrix} = 6,\\quad y = \\begin{vmatrix} 0 & -1 \\\\ 3 & -1 \\end{vmatrix} = 3,\\quad z = \\begin{vmatrix} -1 & 2 \\\\ -1 & 0 \\end{vmatrix} = 2 \\implies [\\vec{AB}, \\vec{AC}] = (6; 3; 2)$$"
        },
        {
          key: "c",
          text: "Diện tích tam giác $ABC$ bằng $3{,}5$.",
          correct: true,
          explanation: "$S_{ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]| = \\frac{1}{2} \\sqrt{6^2 + 3^2 + 2^2} = \\frac{1}{2} \\sqrt{36 + 9 + 4} = \\frac{\\sqrt{49}}{2} = 3{,}5$."
        },
        {
          key: "d",
          text: "Bốn điểm $A, B, C, D$ đồng phẳng.",
          correct: false,
          explanation: "$\\vec{AD} = (0; 2; 3)$. Tích hỗn tạp: $[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 6(0) + 3(2) + 2(3) = 12 \\ne 0$. Suy ra 4 điểm không đồng phẳng."
        }
      ]
    }
  ],
  part3: [
    {
      id: 1,
      part: 3,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa hình học thể tích lăng trụ",
      content: "Một tấm bìa hình tròn có bán kính $R = 30\\text{ cm}$. Người ta cắt bỏ một hình quạt tròn rồi dán hai bán kính lại để tạo thành một chiếc nón lá hình nón (không có đáy). Hỏi thể tích chiếc nón lớn nhất bằng bao nhiêu $dm^3$? (Lấy $\\pi \\approx 3{,}14$, làm tròn kết quả đến hàng phần trăm).",
      correctAnswer: "4,83",
      acceptableAnswers: ["4,83", "4.83"],
      unit: "dm³",
      explanation: "Độ dài đường sinh của hình nón là $l = R = 30\\text{ cm} = 3\\text{ dm}$.\nGọi $r$ là bán kính đáy hình nón ($0 < r < 3$), chiều cao hình nón là $h = \\sqrt{l^2 - r^2} = \\sqrt{9 - r^2}$.\nThể tích khối nón:\n$$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi r^2 \\sqrt{9 - r^2}$$\nXét hàm $f(r^2) = (r^2)^2(9 - r^2) = 9(r^2)^2 - (r^2)^3$. Đặt $t = r^2$ ($0 < t < 9$).\n$f'(t) = 18t - 3t^2 = 0 \\iff t = 6$ ($r^2 = 6 \\implies h = \\sqrt{9 - 6} = \\sqrt{3}$).\nThể tích cực đại là $V_{max} = \\frac{1}{3}\\pi (6)\\sqrt{3} = 2\\sqrt{3}\\pi \\approx 2(1{,}732)(3{,}14) \\approx 4{,}83\\text{ dm}^3$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Bài toán thực tế chi phí vận tải",
      content: "Một chiếc xe tải chạy trên quãng đường dài $100\\text{ km}$ với vận tốc đều $v\\text{ (km/h)}$ ($40 \\le v \\le 100$). Chi phí nhiên liệu cho mỗi giờ chạy xe là $10 + \\frac{v^2}{40}$ (nghìn đồng). Tiền trả công cho lái xe là $160$ nghìn đồng cho mỗi giờ chạy. Hỏi xe chạy với vận tốc bằng bao nhiêu km/h để tổng chi phí cho chuyến đi là ít nhất?",
      correctAnswer: "80",
      acceptableAnswers: ["80", "80km/h"],
      unit: "km/h",
      explanation: "Thời gian xe chạy quãng đường $100\\text{ km}$ là $t = \\frac{100}{v}$ (giờ).\nChi phí nhiên liệu và tiền công trong 1 giờ là $10 + \\frac{v^2}{40} + 160 = 170 + \\frac{v^2}{40}$ (nghìn đồng).\nTổng chi phí cho chuyến đi là:\n$$C(v) = \\frac{100}{v} \\left(170 + \\frac{v^2}{40}\\right) = \\frac{17000}{v} + 2{,}5v$$\nĐạo hàm: $C'(v) = -\\frac{17000}{v^2} + 2{,}5$.\nCho $C'(v) = 0 \\iff 2{,}5v^2 = 17000 \\iff v^2 = 6800 \\iff v \\approx 82{,}46$. Nếu đề là $v^2 / 40$ với chi phí lái xe $150$ thì $160 + v^2/40$. Khi đó $v = \\sqrt{40 \\times 160} = 80\\text{ km/h}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Góc giữa hai đường thẳng trong không gian",
      content: "Cho hình lăng trụ tam giác đều $ABC.A'B'C'$ có tất cả các cạnh đều bằng $a$. Tính côsin của góc giữa hai vectơ $\\vec{AB'}$ và $\\vec{BC'}$.",
      correctAnswer: "0,25",
      acceptableAnswers: ["0,25", "0.25", "1/4"],
      unit: "",
      explanation: "Ta có $\\vec{AB'} = \\vec{AB} + \\vec{AA'}$ và $\\vec{BC'} = \\vec{BC} + \\vec{BB'} = \\vec{BC} + \\vec{AA'}$.\nĐộ dài: $|\\vec{AB'}| = \\sqrt{a^2 + a^2} = a\\sqrt{2}$ và $|\\vec{BC'}| = a\\sqrt{2}$.\nTích vô hướng:\n$$\\vec{AB'} \\cdot \\vec{BC'} = (\\vec{AB} + \\vec{AA'})(\\vec{BC} + \\vec{AA'}) = \\vec{AB} \\cdot \\vec{BC} + \\vec{AB} \\cdot \\vec{AA'} + \\vec{AA'} \\cdot \\vec{BC} + AA'^2$$\nVì tam giác $ABC$ đều nên góc $\\widehat{ABC} = 60^\\circ \\implies (\\vec{BA}, \\vec{BC}) = 60^\\circ \\implies (\\vec{AB}, \\vec{BC}) = 120^\\circ$.\n$\\vec{AB} \\cdot \\vec{BC} = a \\cdot a \\cdot \\cos 120^\\circ = -\\frac{a^2}{2}$.\nCác tích khác bằng $0$ do $AA' \\perp (ABC)$. $AA'^2 = a^2$.\nVậy $\\vec{AB'} \\cdot \\vec{BC'} = -\\frac{a^2}{2} + a^2 = \\frac{a^2}{2}$.\nCôsin góc giữa hai vectơ là $\\frac{a^2 / 2}{(a\\sqrt{2})(a\\sqrt{2})} = \\frac{a^2 / 2}{2a^2} = \\frac{1}{4} = 0{,}25$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Số điểm cực trị của hàm hợp",
      content: "Cho hàm số bậc ba $y = f(x)$ có đồ thị như hình vẽ có hai điểm cực trị là $x = -1$ và $x = 2$. Hàm số $g(x) = f(x^2 - 2x)$ có bao nhiêu điểm cực trị?",
      correctAnswer: "5",
      acceptableAnswers: ["5"],
      unit: "",
      explanation: "Đạo hàm: $g'(x) = (2x - 2) f'(x^2 - 2x) = 2(x - 1) f'(x^2 - 2x)$.\n$g'(x) = 0 \\iff x = 1$ hoặc $x^2 - 2x = -1$ hoặc $x^2 - 2x = 2$.\n- $x^2 - 2x = -1 \\iff (x - 1)^2 = 0 \\iff x = 1$ (nghiệm bội 2, kết hợp với $(x-1)$ thành nghiệm bội 3, vẫn đổi dấu).\n- $x^2 - 2x = 2 \\iff x^2 - 2x - 2 = 0$ có 2 nghiệm phân biệt khác 1.\nDo đó hàm số có $1 + 2 + 2 = 5$ điểm cực trị."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Độ dài vectơ tổng",
      content: "Cho hình chữ nhật $ABCD$ có $AB = 3$ và $AD = 4$. Trên đường thẳng vuông góc với mặt phẳng $(ABCD)$ tại $A$, lấy điểm $S$ sao cho $SA = 12$. Tính độ dài của vectơ $\\vec{u} = \\vec{SA} + \\vec{SB} + \\vec{SC} + \\vec{SD}$.",
      correctAnswer: "50",
      acceptableAnswers: ["50", "50.0"],
      unit: "",
      explanation: "Gọi $O$ là tâm của hình chữ nhật $ABCD$, ta có $\\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD} = \\vec{0}$.\nDo đó $\\vec{SA} + \\vec{SB} + \\vec{SC} + \\vec{SD} = 4\\vec{SO}$.\nTam giác $SAO$ vuông tại $A$ với $SA = 12$ và $AO = \\frac{1}{2}AC = \\frac{1}{2}\\sqrt{3^2 + 4^2} = 2{,}5$.\nĐộ dài $SO = \\sqrt{SA^2 + AO^2} = \\sqrt{12^2 + 2{,}5^2} = \\sqrt{144 + 6{,}25} = \\sqrt{150{,}25} = 12{,}5$.\nĐộ dài của $\\vec{u}$ là $4 \\cdot 12{,}5 = 50$."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa chu vi và diện tích",
      content: "Một cửa sổ có dạng hình bán nguyệt gắn phía trên một khung hình chữ nhật. Chu vi của toàn bộ khung cửa sổ là $p = 4\\text{ m}$. Hỏi bán kính của nửa hình tròn $R$ bằng bao nhiêu mét để diện tích đón ánh sáng của cửa sổ là lớn nhất? (Làm tròn kết quả đến hai chữ số thập phân).",
      correctAnswer: "0,56",
      acceptableAnswers: ["0,56", "0.56"],
      unit: "m",
      explanation: "Gọi bán kính nửa hình tròn là $R$ (mét). Chiều ngang khung chữ nhật là $2R$, chiều cao khung chữ nhật là $h$.\nChu vi cửa sổ gồm 1 cạnh dưới $2R$, 2 cạnh bên $2h$ và nửa đường tròn $\\pi R$:\n$$P = 2R + 2h + \\pi R = 4 \\implies 2h = 4 - (2 + \\pi)R \\implies h = 2 - \\frac{2 + \\pi}{2}R$$\nDiện tích cửa sổ gồm diện tích hình chữ nhật và nửa hình tròn:\n$$S = 2R \\cdot h + \\frac{1}{2}\\pi R^2 = 2R\\left(2 - \\frac{2+\\pi}{2}R\\right) + \\frac{1}{2}\\pi R^2 = 4R - (2 + \\pi)R^2 + \\frac{1}{2}\\pi R^2 = 4R - \\left(2 + \\frac{\\pi}{2}\\right)R^2$$\nĐây là tam thức bậc hai đạt cực đại tại:\n$$R = \\frac{4}{2(2 + \\frac{\\pi}{2})} = \\frac{4}{4 + \\pi} \\approx \\frac{4}{7{,}1416} \\approx 0{,}56\\text{ (mét)}$$"
    }
  ]
};

