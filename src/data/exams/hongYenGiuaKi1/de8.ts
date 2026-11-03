import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE8_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de8-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 8 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 8) do GV Lê Thị Hồng Yến biên soạn. Bồi dưỡng kĩ năng khảo sát hàm số, điểm cực trị, tiệm cận và các bài toán thực tế tối ưu kinh tế, thể tích.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 8"],
  part1: [
    {
      imageUrl: "/exams/hongYen/de8_p1_c1.png",
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính nghịch biến của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & 0 & & 3 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 5 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -2 & & \\end{array}$$\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; 0)$" },
        { key: "B", text: "$(0; 3)$" },
        { key: "C", text: "$(3; +\\infty)$" },
        { key: "D", text: "$(-2; 5)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, trên khoảng $(0; 3)$ thì $f'(x) < 0$ và mũi tên đi xuống, do đó hàm số nghịch biến trên $(0; 3)$."
    },
    {
      imageUrl: "/exams/hongYen/de8_p1_c2.png",
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Số điểm cực trị",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -1 & & 1 & & 2 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & 0 & - & \\end{array}$$\n\nHàm số đã cho có bao nhiêu điểm cực trị?",
      options: [
        { key: "A", text: "$1$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$4$" }
      ],
      correctAnswer: "C",
      explanation: "Đạo hàm $f'(x)$ đổi dấu 3 lần khi đi qua các nghiệm bội lẻ $x = -1, x = 1, x = 2$. Do đó hàm số có 3 điểm cực trị."
    },
    {
      imageUrl: "/exams/hongYen/de8_p1_c3.png",
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại từ đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Điểm cực đại của hàm số đã cho là",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD8Q3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="150" x2="220" y2="150" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD8Q3)" />
  <line x1="80" y1="210" x2="80" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD8Q3)" />
  <text x="215" y="166" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="68" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="68" y="166" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="160" y1="150" x2="160" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="80" y1="60" x2="160" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="156" y="166" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="68" y="64" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">3</text>
  <text x="56" y="184" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <path d="M 50,110 C 65,160 70,180 80,180 C 100,180 120,120 140,75 C 150,60 155,60 160,60 C 170,60 180,95 195,145" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="80" cy="180" r="3" fill="#2563eb" />
  <circle cx="160" cy="60" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = 3$" },
        { key: "D", text: "$y = -1$" }
      ],
      correctAnswer: "B",
      explanation: "Đồ thị đạt cực đại tại điểm $(2; 3)$. Do đó điểm cực đại của hàm số là $x = 2$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nghịch biến hàm bậc ba",
      content: "Hàm số $y = x^3 - 3x^2 - 9x + 1$ nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -1)$" },
        { key: "B", text: "$(3; +\\infty)$" },
        { key: "C", text: "$(-1; 3)$" },
        { key: "D", text: "$(0; 4)$" }
      ],
      correctAnswer: "C",
      explanation: "$y' = 3x^2 - 6x - 9 = 3(x + 1)(x - 3) < 0 \\iff -1 < x < 3$. Vậy hàm số nghịch biến trên $(-1; 3)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại",
      content: "Điểm cực đại của hàm số $y = \\frac{1}{3}x^3 - 2x^2 + 3x - 1$ là",
      options: [
        { key: "A", text: "$x = 1$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = -1$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = x^2 - 4x + 3 = (x - 1)(x - 3) = 0 \\iff x = 1$ hoặc $x = 3$. Đạo hàm đổi dấu từ dương sang âm tại $x = 1$, nên $x = 1$ là điểm cực đại của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de8_p1_c6.png",
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-1; 4]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -1 & & 1 & & 3 & & 4 \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 7 & & & & 2 \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & 3 & & & & -4 & & \\end{array}$$\n\nGiá trị nhỏ nhất của hàm số trên đoạn $[-1; 4]$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$-4$" },
        { key: "D", text: "$7$" }
      ],
      correctAnswer: "C",
      explanation: "Dựa vào bảng biến thiên, giá trị nhỏ nhất của hàm số trên đoạn $[-1; 4]$ là $f(3) = -4$."
    },
    {
      imageUrl: "/exams/hongYen/de8_p1_c7.png",
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Giá trị lớn nhất của hàm số $y = \\frac{x + 2}{x - 1}$ trên đoạn $[2; 4]$ bằng",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$4$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = \\frac{-3}{(x - 1)^2} < 0, \\forall x \\in [2; 4]$. Hàm số nghịch biến trên $[2; 4]$ nên $\\max_{[2; 4]} y = y(2) = \\frac{2 + 2}{2 - 1} = 4$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{3\\}$ có bảng biến thiên:\n\n$$\\begin{array}{c|c||c} x & -\\infty \\quad 3 & 3 \\quad +\\infty \\\\ \\hline f'(x) & + & + \\\\ \\hline f(x) & 4 \\nearrow +\\infty & -\\infty \\nearrow 4 \\end{array}$$\n\nTiệm cận đứng của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$y = 4$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 4$" },
        { key: "D", text: "$y = 3$" }
      ],
      correctAnswer: "B",
      explanation: "Vì $\\lim_{x \\to 3^-} f(x) = +\\infty$ và $\\lim_{x \\to 3^+} f(x) = -\\infty$ nên đường thẳng $x = 3$ là tiệm cận đứng."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{2x^2 + x - 2}{x - 1}$ là",
      options: [
        { key: "A", text: "$y = 2x - 1$" },
        { key: "B", text: "$y = 2x + 3$" },
        { key: "C", text: "$y = 2x + 1$" },
        { key: "D", text: "$y = x + 3$" }
      ],
      correctAnswer: "B",
      explanation: "Thực hiện phép chia tử cho mẫu: $\\frac{2x^2 + x - 2}{x - 1} = 2x + 3 + \\frac{1}{x - 1}$. Khi $x \\to \\pm\\infty$, $\\frac{1}{x - 1} \\to 0$. Tiệm cận xiên là đường thẳng $y = 2x + 3$."
    },
    {
      imageUrl: "/exams/hongYen/de8_p1_c10.png",
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm nhất biến",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD8Q10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="140" x2="220" y2="140" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD8Q10)" />
  <line x1="100" y1="210" x2="100" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD8Q10)" />
  <text x="215" y="156" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="88" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="88" y="156" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="140" y1="20" x2="140" y2="210" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <line x1="20" y1="80" x2="220" y2="80" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <text x="144" y="156" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">1</text>
  <text x="84" y="76" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">2</text>
  <text x="76" y="174" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <path d="M 25,120 Q 70,126 90,140 Q 100,150 125,210" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <path d="M 155,20 Q 160,60 175,72 Q 195,78 215,79" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="100" cy="165" r="2.5" fill="#0f172a" />
</svg>`,
      options: [
        { key: "A", text: "$y = \\frac{2x + 1}{x - 1}$" },
        { key: "B", text: "$y = \\frac{2x - 1}{x + 1}$" },
        { key: "C", text: "$y = \\frac{x + 1}{x - 1}$" },
        { key: "D", text: "$y = \\frac{-2x + 1}{x - 1}$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị có tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$, cắt trục tung tại điểm $(0; -1)$. Hàm số thỏa mãn là $y = \\frac{2x + 1}{x - 1}$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang",
      content: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{3x - 4}{2x + 1}$ là đường thẳng",
      options: [
        { key: "A", text: "$y = 3$" },
        { key: "B", text: "$x = -\\frac{1}{2}$" },
        { key: "C", text: "$y = \\frac{3}{2}$" },
        { key: "D", text: "$y = -4$" }
      ],
      correctAnswer: "C",
      explanation: "Ta có $\\lim_{x \\to \\pm\\infty} \\frac{3x - 4}{2x + 1} = \\frac{3}{2}$, do đó tiệm cận ngang là $y = \\frac{3}{2}$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{x^2 - x + 1}{x - 1}$ là điểm",
      options: [
        { key: "A", text: "$I(1; 0)$" },
        { key: "B", text: "$I(1; 1)$" },
        { key: "C", text: "$I(-1; 1)$" },
        { key: "D", text: "$I(1; -1)$" }
      ],
      correctAnswer: "B",
      explanation: "Ta có $\\frac{x^2 - x + 1}{x - 1} = x + \\frac{1}{x - 1}$. Tiệm cận đứng $x = 1$, tiệm cận xiên $y = x$. Giao điểm của hai đường tiệm cận là tâm đối xứng $I(1; 1)$."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm bậc ba",
      context: "Cho hàm số $y = f(x) = -x^3 + 6x^2 - 9x + 2$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = -3x^2 + 12x - 9$.", correct: true, explanation: "$f'(x) = -3x^2 + 12x - 9$." },
        { key: "b", text: "Hàm số nghịch biến trên khoảng $(1; 3)$.", correct: false, explanation: "Trên $(1; 3)$ có $f'(x) > 0$ nên hàm số đồng biến." },
        { key: "c", text: "Hàm số đạt cực tiểu tại điểm $x = 1$ và đạt cực đại tại điểm $x = 3$.", correct: true, explanation: "$f'(x) = 0 \\iff x = 1$ (đổi dấu từ âm sang dương) hoặc $x = 3$ (đổi dấu từ dương sang âm)." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$.", correct: true, explanation: "$y(1) = -2, y(3) = 2$. Vector $\\vec{AB} = (2; 4) \\implies AB = \\sqrt{2^2 + 4^2} = \\sqrt{20} = 2\\sqrt{5}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm số trên đoạn",
      context: "Cho hàm số $f(x) = x + \\frac{100}{x}$ xác định trên đoạn $[4; 25]$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $[4; 25]$ là $f'(x) = 1 - \\frac{100}{x^2}$.", correct: true, explanation: "Đúng theo công thức đạo hàm." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(4; 25)$ là $x = 10$.", correct: true, explanation: "$x^2 = 100 \\iff x = 10 \\in (4; 25)$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên đoạn $[4; 25]$ bằng $20$.", correct: true, explanation: "$f(10) = 10 + 10 = 20$. So sánh $f(4) = 29, f(25) = 29 \\implies \\min = 20$." },
        { key: "d", text: "Giá trị lớn nhất của hàm số trên đoạn $[4; 25]$ bằng $20$.", correct: false, explanation: "Giá trị lớn nhất là $f(4) = f(25) = 29 > 20$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{3x - 2}{x - 2}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = 2$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu triệt tiêu tại $x = 2$." },
        { key: "b", text: "Đường thẳng $y = 3$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 3$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định.", correct: false, explanation: "$y' = \\frac{3(-2) - (-2)(1)}{(x - 2)^2} = \\frac{-4}{(x - 2)^2} < 0$, nghịch biến trên từng khoảng xác định." },
        { key: "d", text: "Tọa độ tâm đối xứng của đồ thị hàm số là $I(2; 3)$.", correct: true, explanation: "Giao điểm của hai đường tiệm cận là $I(2; 3)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 3x + 6}{x - 2}$.",
      statements: [
        { key: "a", text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{2\\}$.", correct: true, explanation: "Mẫu số khác 0 $\\iff x \\ne 2$." },
        { key: "b", text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x - 1$.", correct: true, explanation: "$\\frac{x^2 - 3x + 6}{x - 2} = x - 1 + \\frac{4}{x - 2}$." },
        { key: "c", text: "Tọa độ giao điểm của hai đường tiệm cận là điểm $I(2; 1)$.", correct: true, explanation: "Giao điểm của $x = 2$ và $y = x - 1$ là $I(2; 1)$." },
        { key: "d", text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.", correct: false, explanation: "$x^2 - 3x + 6 = 0$ có $\\Delta = 9 - 24 = -15 < 0$, phương trình vô nghiệm nên không cắt trục hoành." }
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
      topic: "Tham số m đơn điệu",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x - 5}{x - m}$ đồng biến trên khoảng $(2; +\\infty)$?",
      correctAnswer: "13",
      acceptableAnswers: ["13"],
      unit: "giá trị",
      explanation: "$y' = \\frac{-m + 5}{(x - m)^2} > 0 \\iff m < 5$. Điều kiện hàm số xác định trên $(2; +\\infty)$ là $m \\le 2$. Kết hợp lại ta được $m \\le 2$. Với $m \\in [-10; 10]$ và $m \\in \\mathbb{Z} \\implies m \\in \\{-10, -9, \\dots, 1, 2\\}$. Số giá trị nguyên là $2 - (-10) + 1 = 13$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa hộp tôn đáy vuông có nắp",
      content: "Người ta muốn chế tạo một chiếc hộp hình chữ nhật có nắp đậy bằng tôn với đáy là hình vuông, có thể tích bằng $216\\text{ dm}^3$. Hỏi độ dài cạnh đáy $x$ của chiếc hộp bằng bao nhiêu đêximét để diện tích tôn sử dụng (diện tích toàn phần) là nhỏ nhất?",
      correctAnswer: "6",
      acceptableAnswers: ["6", "6dm"],
      unit: "dm",
      explanation: "Chiều cao hộp: $h = \\frac{216}{x^2}$. Diện tích toàn phần: $S(x) = 2x^2 + 4xh = 2x^2 + \\frac{864}{x} = 2x^2 + \\frac{432}{x} + \\frac{432}{x} \\ge 3\\sqrt[3]{2x^2 \\cdot \\frac{432}{x} \\cdot \\frac{432}{x}} = 216\\text{ dm}^2$. Dấu bằng xảy ra khi $2x^2 = \\frac{432}{x} \\iff x^3 = 216 \\iff x = 6\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa giá vé tour du lịch",
      content: "Một công ty du lịch tổ chức tour tham quan. Với giá vé là 1 triệu đồng cho mỗi du khách thì có 400 khách tham gia. Cứ mỗi lần công ty tăng giá vé thêm 100000 đồng (tức 0,1 triệu đồng) thì lượng khách tham gia sẽ giảm đi 20 người. Biết chi phí dịch vụ cố định cho mỗi du khách là 400000 đồng (tức 0,4 triệu). Hỏi công ty nên định giá vé là bao nhiêu nghìn đồng để tổng lợi nhuận thu được là lớn nhất?",
      correctAnswer: "1700",
      acceptableAnswers: ["1700", "1700000"],
      unit: "nghìn đồng",
      explanation: "Gọi số lần tăng giá thêm 100 nghìn đồng là $x$ ($x \\ge 0$).\nGiá vé mới: $1000 + 100x$ (nghìn đồng).\nSố khách tham gia: $400 - 20x$ (khách).\nLợi nhuận thu được từ mỗi du khách là: $(1000 + 100x) - 400 = 600 + 100x$ (nghìn đồng).\nTổng lợi nhuận: $P(x) = (400 - 20x)(600 + 100x) = 2000(20 - x)(6 + x) = 2000(-x^2 + 14x + 120)$.\nParabol đạt giá trị lớn nhất tại $x = -\\frac{14}{2(-1)} = 7$.\nKhi đó giá vé tối ưu là: $1000 + 100(7) = 1700$ nghìn đồng (tức 1,7 triệu đồng)."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Vận tốc cực đại",
      content: "Một chất điểm chuyển động theo phương trình quãng đường $s(t) = -t^3 + 12t^2 + 27t$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và quãng đường $s(t)$ tính bằng mét. Vận tốc của chất điểm đạt giá trị lớn nhất bằng bao nhiêu mét trên giây?",
      correctAnswer: "75",
      acceptableAnswers: ["75", "75m/s"],
      unit: "m/s",
      explanation: "Vận tốc của chất điểm là: $v(t) = s'(t) = -3t^2 + 24t + 27 = -3(t^2 - 8t + 16) + 75 = -3(t - 4)^2 + 75 \\le 75\\text{ m/s}$. Giá trị lớn nhất đạt được là $75\\text{ m/s}$ tại thời điểm $t = 4\\text{ s}$."
    },
  ],
  part4: [
    {
      id: 1,
      part: 4,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số bậc ba",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = x^3 - 3x^2 - 24x + 10$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=-2, x=4",
      acceptableAnswers: ["x=-2, x=4", "-2, 4", "-2 và 4", "(-2;38), (4;-70)", "(-2; 38), (4; -70)"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "1) Tập xác định: $D = \\mathbb{R}$.\n2) Đạo hàm: $y' = 3x^2 - 6x - 24 = 3(x^2 - 2x - 8) = 3(x + 2)(x - 4)$.\n$y' = 0 \\iff x = -2$ hoặc $x = 4$.\n3) Bảng xét dấu đạo hàm:\n- $y' > 0$ trên $(-\\infty; -2)$ và $(4; +\\infty) \\implies$ hàm số đồng biến trên $(-\\infty; -2)$ và $(4; +\\infty)$.\n- $y' < 0$ trên $(-2; 4) \\implies$ hàm số nghịch biến trên khoảng $(-2; 4)$.\n4) Cực trị:\n- Hàm số đạt cực đại tại $x = -2$, giá trị cực đại $y(-2) = 38$.\n- Hàm số đạt cực tiểu tại $x = 4$, giá trị cực tiểu $y(4) = -70$."
    },
    {
      id: 2,
      part: 4,
      number: 2,
      imageUrl: "/exams/hongYen/de8_p3_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Gập hộp nhôm vuông không nắp",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nTừ một tấm nhôm hình vuông có cạnh bằng $90\\text{ cm}$, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh bằng $x\\text{ (cm)}$ rồi gập các mép lại để tạo thành một chiếc hộp không nắp có dạng hình hộp chữ nhật. Tìm độ dài cạnh $x$ để thể tích của chiếc hộp thu được là lớn nhất.",
      correctAnswer: "15cm",
      acceptableAnswers: ["15", "15cm", "x=15", "15 cm"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "Sau khi cắt bỏ 4 góc hình vuông cạnh $x$ ($0 < x < 45$), đáy chiếc hộp là hình vuông có cạnh bằng $90 - 2x\\text{ (cm)}$ và chiều cao của hộp là $x\\text{ (cm)}$.\nThể tích của chiếc hộp là:\n$$V(x) = x(90 - 2x)^2 = 4x(45 - x)^2$$\nÁp dụng bất đẳng thức AM-GM cho ba số dương $2x, 45 - x, 45 - x$:\n$$2x \\cdot (45 - x) \\cdot (45 - x) \\le \\left(\\frac{2x + 45 - x + 45 - x}{3}\\right)^3 = 30^3 = 27000$$\nDo đó $V(x) = 2 \\cdot [2x(45 - x)^2] \\le 2 \\cdot 27000 = 54000\\text{ (cm}^3\\text{)}$.\nDấu bằng xảy ra khi $2x = 45 - x \\iff 3x = 45 \\iff x = 15\\text{ cm}$.\nVậy để thể tích hộp lớn nhất thì độ dài cạnh cắt bỏ là $x = 15\\text{ cm}$."
    }
  ]
};

