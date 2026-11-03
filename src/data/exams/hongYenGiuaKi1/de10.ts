import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE10_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de10-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 10 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 10) do GV Lê Thị Hồng Yến biên soạn. Bộ đề tổng kết chuẩn kiến thức khảo sát hàm số, đồ thị, tiệm cận, vận tốc và các bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 10"],
  part1: [
    {
      imageUrl: "/exams/hongYen/de10_p1_c1.png",
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính nghịch biến của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -2 & & 2 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 3 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -1 & & \\end{array}$$\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -2)$" },
        { key: "B", text: "$(-2; 2)$" },
        { key: "C", text: "$(2; +\\infty)$" },
        { key: "D", text: "$(-1; 3)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, trên khoảng $(-2; 2)$ đạo hàm $f'(x) < 0$ và mũi tên đi xuống, do đó hàm số nghịch biến trên khoảng $(-2; 2)$."
    },
    {
      imageUrl: "/exams/hongYen/de10_p1_c2.png",
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực tiểu",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -2 & & 1 & & 3 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & 0 & - & \\end{array}$$\n\nĐiểm cực tiểu của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$x = 3$" },
        { key: "D", text: "$x = 0$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ âm sang dương khi đi qua $x = 1$, do đó $x = 1$ là điểm cực tiểu của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de10_p1_c3.png",
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị cực đại từ đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Giá trị cực đại của hàm số đã cho bằng",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD10Q3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="170" x2="220" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD10Q3)" />
  <line x1="110" y1="210" x2="110" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD10Q3)" />
  <text x="215" y="186" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="98" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="96" y="186" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="150" y1="170" x2="150" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="110" y1="60" x2="150" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="146" y="186" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="60" y="186" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="96" y="64" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">4</text>
  <text x="116" y="120" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <path d="M 30,30 C 50,140 60,170 70,170 C 90,170 100,120 110,115 C 120,110 135,60 150,60 C 165,60 180,115 195,200" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="70" cy="170" r="3" fill="#2563eb" />
  <circle cx="150" cy="60" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$1$" },
        { key: "B", text: "$4$" },
        { key: "C", text: "$-1$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "B",
      explanation: "Đồ thị đạt điểm cực đại tại $(1; 4)$. Do đó giá trị cực đại của hàm số là $y_{CĐ} = 4$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến của hàm số",
      content: "Hàm số $y = x^3 - 3x^2 + 5$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(0; 2)$" },
        { key: "B", text: "$(2; +\\infty)$" },
        { key: "C", text: "$(-\\infty; 2)$" },
        { key: "D", text: "$(0; 3)$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 3x^2 - 6x = 3x(x - 2) > 0 \\iff x \\in (-\\infty; 0) \\cup (2; +\\infty)$. Do đó hàm số đồng biến trên khoảng $(2; +\\infty)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại",
      content: "Điểm cực đại của hàm số $y = -x^3 + 3x^2 + 9x - 2$ là",
      options: [
        { key: "A", text: "$x = -1$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = -3x^2 + 6x + 9 = -3(x + 1)(x - 3) = 0 \\iff x = -1$ hoặc $x = 3$. Đạo hàm đổi dấu từ dương sang âm tại $x = 3$ nên $x = 3$ là điểm cực đại."
    },
    {
      imageUrl: "/exams/hongYen/de10_p1_c6.png",
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 3]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -2 & & 0 & & 2 & & 3 \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & 2 & & & & 6 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -4 & & & & 1 \\end{array}$$\n\nGiá trị nhỏ nhất của hàm số trên đoạn $[-2; 3]$ bằng",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$-4$" },
        { key: "C", text: "$6$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên trên đoạn $[-2; 3]$, giá trị nhỏ nhất của hàm số là $f(0) = -4$."
    },
    {
      imageUrl: "/exams/hongYen/de10_p1_c7.png",
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Giá trị lớn nhất của hàm số $y = x^3 - 3x^2 - 9x + 10$ trên đoạn $[0; 4]$ bằng",
      options: [
        { key: "A", text: "$-17$" },
        { key: "B", text: "$-10$" },
        { key: "C", text: "$10$" },
        { key: "D", text: "$27$" }
      ],
      correctAnswer: "C",
      explanation: "$y' = 3x^2 - 6x - 9 = 3(x + 1)(x - 3) = 0 \\iff x = 3 \\in [0; 4]$. Ta có $y(0) = 10, y(3) = -17, y(4) = -10$. Vậy $\\max_{[0; 4]} y = 10$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{1\\}$ có bảng biến thiên:\n\n$$\\begin{array}{c|c||c} x & -\\infty \\quad 1 & 1 \\quad +\\infty \\\\ \\hline f'(x) & - & - \\\\ \\hline f(x) & -2 \\searrow -\\infty & +\\infty \\searrow -2 \\end{array}$$\n\nTiệm cận đứng của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$y = -2$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$x = -2$" },
        { key: "D", text: "$y = 1$" }
      ],
      correctAnswer: "B",
      explanation: "Do $\\lim_{x \\to 1^-} f(x) = -\\infty$ và $\\lim_{x \\to 1^+} f(x) = +\\infty$ nên đường thẳng $x = 1$ là tiệm cận đứng."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + x - 3}{x - 2}$ là",
      options: [
        { key: "A", text: "$y = x - 3$" },
        { key: "B", text: "$y = x + 3$" },
        { key: "C", text: "$y = x + 1$" },
        { key: "D", text: "$y = 2x + 3$" }
      ],
      correctAnswer: "B",
      explanation: "Thực hiện phép chia tử cho mẫu: $\\frac{x^2 + x - 3}{x - 2} = x + 3 + \\frac{3}{x - 2}$. Khi $x \\to \\pm\\infty$, $\\frac{3}{x - 2} \\to 0$. Vậy tiệm cận xiên là đường thẳng $y = x + 3$."
    },
    {
      imageUrl: "/exams/hongYen/de10_p1_c10.png",
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm bậc ba",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD10Q10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="120" x2="220" y2="120" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD10Q10)" />
  <line x1="120" y1="210" x2="120" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD10Q10)" />
  <text x="215" y="136" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="106" y="136" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="75" y1="120" x2="75" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="75" y1="60" x2="120" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="165" y1="120" x2="165" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="120" y1="180" x2="165" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="60" y="136" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="160" y="112" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="126" y="64" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="96" y="184" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <path d="M 40,210 C 55,100 65,60 75,60 C 95,60 105,105 120,120 C 135,135 145,180 165,180 C 175,180 185,140 205,30" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="75" cy="60" r="3" fill="#2563eb" />
  <circle cx="165" cy="180" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$y = x^3 - 3x$" },
        { key: "B", text: "$y = -x^3 + 3x$" },
        { key: "C", text: "$y = x^3 - 3x^2$" },
        { key: "D", text: "$y = x^4 - 2x^2$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị hàm bậc ba đi qua gốc tọa độ $O(0; 0)$, đạt cực đại tại $(-1; 2)$ và cực tiểu tại $(1; -2)$. Hàm số tương ứng là $y = x^3 - 3x$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang",
      content: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{4x - 5}{x + 2}$ là đường thẳng",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$y = 4$" },
        { key: "C", text: "$y = -2$" },
        { key: "D", text: "$x = 4$" }
      ],
      correctAnswer: "B",
      explanation: "Ta có $\\lim_{x \\to \\pm\\infty} \\frac{4x - 5}{x + 2} = 4$. Do đó tiệm cận ngang là đường thẳng $y = 4$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{2x + 3}{x - 1}$ là điểm",
      options: [
        { key: "A", text: "$I(-1; 2)$" },
        { key: "B", text: "$I(1; 2)$" },
        { key: "C", text: "$I(2; 1)$" },
        { key: "D", text: "$I(1; -3)$" }
      ],
      correctAnswer: "B",
      explanation: "Tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$. Tâm đối xứng là giao điểm của hai tiệm cận $I(1; 2)$."
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
      context: "Cho hàm số $y = f(x) = \\frac{1}{3}x^3 - x^2 - 3x + 4$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = x^2 - 2x - 3$.", correct: true, explanation: "$f'(x) = 3 \\cdot \\frac{1}{3}x^2 - 2x - 3 = x^2 - 2x - 3$." },
        { key: "b", text: "Hàm số đồng biến trên khoảng $(-1; 3)$.", correct: false, explanation: "Trên $(-1; 3)$ có $f'(x) < 0$ nên hàm số nghịch biến." },
        { key: "c", text: "Hàm số đạt cực đại tại điểm $x = -1$ và đạt cực tiểu tại điểm $x = 3$.", correct: true, explanation: "$f'(x) = (x + 1)(x - 3) = 0 \\iff x = -1$ (đổi dấu từ dương sang âm) hoặc $x = 3$ (đổi dấu từ âm sang dương)." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $\\frac{4\\sqrt{73}}{3}$.", correct: true, explanation: "$y(-1) = \\frac{17}{3}, y(3) = -5$. Vector $\\vec{AB} = (4; -\\frac{32}{3}) \\implies AB = \\sqrt{16 + \\frac{1024}{9}} = \\frac{\\sqrt{1168}}{3} = \\frac{4\\sqrt{73}}{3}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm phân thức trên đoạn",
      context: "Cho hàm số $f(x) = x + \\frac{4}{x}$ xác định trên đoạn $[1; 4]$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $[1; 4]$ là $f'(x) = 1 - \\frac{4}{x^2}$.", correct: true, explanation: "Đúng theo công thức đạo hàm." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm thuộc khoảng $(1; 4)$ là $x = 2$.", correct: true, explanation: "$x^2 = 4 \\iff x = 2 \\in (1; 4)$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên đoạn $[1; 4]$ bằng $4$.", correct: true, explanation: "$f(2) = 2 + 2 = 4$. So sánh $f(1) = 5, f(4) = 5 \\implies \\min = 4$." },
        { key: "d", text: "Giá trị lớn nhất của hàm số trên đoạn $[1; 4]$ bằng $4$.", correct: false, explanation: "Giá trị lớn nhất là $f(1) = f(4) = 5 > 4$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{2x + 5}{x - 3}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = 3$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu số triệt tiêu tại $x = 3$." },
        { key: "b", text: "Đường thẳng $y = 2$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 2$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định.", correct: false, explanation: "$y' = \\frac{2(-3) - 5(1)}{(x - 3)^2} = \\frac{-11}{(x - 3)^2} < 0$, nghịch biến trên từng khoảng xác định." },
        { key: "d", text: "Giao điểm của hai đường tiệm cận là điểm $I(3; 2)$.", correct: true, explanation: "Giao điểm là $I(3; 2)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - x + 4}{x - 1}$.",
      statements: [
        { key: "a", text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.", correct: true, explanation: "Mẫu số khác 0 khi $x \\ne 1$." },
        { key: "b", text: "Đường thẳng $y = x$ là đường tiệm cận xiên của đồ thị hàm số.", correct: true, explanation: "$\\frac{x^2 - x + 4}{x - 1} = x + \\frac{4}{x - 1}$." },
        { key: "c", text: "Tọa độ tâm đối xứng của đồ thị hàm số là $I(1; 1)$.", correct: true, explanation: "Giao điểm của $x = 1$ và $y = x$ là $I(1; 1)$." },
        { key: "d", text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.", correct: false, explanation: "$x^2 - x + 4 = 0$ có $\\Delta = 1 - 16 = -15 < 0$, vô nghiệm nên không cắt trục hoành." }
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
      topic: "Tham số m đồng biến",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 7}{x + m}$ đồng biến trên khoảng $(2; +\\infty)$?",
      correctAnswer: "3",
      acceptableAnswers: ["3"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 7}{(x + m)^2} > 0 \\iff m > 7$. Điều kiện xác định trên $(2; +\\infty)$ là $-m \\le 2 \\iff m \\ge -2$. Do đó $m > 7$. Vì $m \\in [-10; 10], m \\in \\mathbb{Z} \\implies m \\in \\{8, 9, 10\\}$ (3 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa hàng rào vườn sát tường",
      content: "Người ta muốn rào một khu vườn hình chữ nhật có diện tích bằng $800\\text{ m}^2$ nằm sát một bờ tường thẳng có sẵn (không cần làm hàng rào ở phía bờ tường). Hỏi cần ít nhất bao nhiêu mét lưới thép để rào ba cạnh còn lại của khu vườn?",
      correctAnswer: "80",
      acceptableAnswers: ["80", "80m"],
      unit: "m",
      explanation: "Gọi $x$ là chiều rộng (độ dài 2 cạnh vuông góc với bờ tường, $x > 0$). Cạnh dài song song với tường là $\\frac{800}{x}$. Chiều dài hàng rào là: $L(x) = 2x + \\frac{800}{x} \\ge 2\\sqrt{2x \\cdot \\frac{800}{x}} = 2\\sqrt{1600} = 80\\text{ (m)}$. Dấu đẳng thức xảy ra khi $2x = \\frac{800}{x} \\iff x^2 = 400 \\iff x = 20\\text{ m}$. Vậy cần ít nhất $80\\text{ m}$ lưới thép."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một xưởng thủ công sản xuất túi xách. Chi phí sản xuất cho $x$ chiếc túi mỗi tuần ($x > 0$) được cho bởi hàm số $C(x) = x^2 + 100x + 4000$ (nghìn đồng). Giá bán mỗi chiếc túi phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 600 - x$ (nghìn đồng). Hỏi xưởng cần sản xuất và bán ra bao nhiêu chiếc túi mỗi tuần để lợi nhuận thu được là lớn nhất?",
      correctAnswer: "125",
      acceptableAnswers: ["125", "125 chiếc"],
      unit: "chiếc",
      explanation: "Doanh thu $R(x) = x(600 - x) = 600x - x^2$. Lợi nhuận $P(x) = R(x) - C(x) = -2x^2 + 500x - 4000$. Đạt cực đại tại đỉnh parabol: $x = -\\frac{500}{2(-2)} = 125$ chiếc túi."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Độ cao lớn nhất của tên lửa",
      content: "Một quả tên lửa đồ chơi được phóng thẳng đứng từ mặt đất lên không trung với phương trình độ cao $h(t) = -5t^2 + 50t + 5$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và độ cao $h(t)$ tính bằng mét so với mặt đất. Độ cao lớn nhất mà quả tên lửa đạt được là bao nhiêu mét?",
      correctAnswer: "130",
      acceptableAnswers: ["130", "130m"],
      unit: "m",
      explanation: "Phương trình độ cao: $h(t) = -5(t^2 - 10t + 25) + 130 = -5(t - 5)^2 + 130 \\le 130\\text{ m}$. Đẳng thức xảy ra khi $t = 5\\text{ s}$. Độ cao lớn nhất quả tên lửa đạt được là $130\\text{ m}$."
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
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = -x^3 + 6x^2 - 9x + 4$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=1, x=3",
      acceptableAnswers: ["x=1, x=3"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "1) Tập xác định: $D = \\mathbb{R}$.\n2) Đạo hàm: $y' = -3x^2 + 12x - 9 = -3(x - 1)(x - 3)$.\n$y' = 0 \\iff x = 1$ hoặc $x = 3$.\n3) Bảng biến thiên:\n- $y' > 0$ trên $(1; 3) \\implies$ hàm số đồng biến trên khoảng $(1; 3)$.\n- $y' < 0$ trên $(-\\infty; 1)$ và $(3; +\\infty) \\implies$ hàm số nghịch biến trên $(-\\infty; 1)$ và $(3; +\\infty)$.\n4) Cực trị:\n- Hàm số đạt cực tiểu tại $x = 1$, giá trị cực tiểu $y(1) = 0$.\n- Hàm số đạt cực đại tại $x = 3$, giá trị cực đại $y(3) = 4$."
    },
    {
      id: 2,
      part: 4,
      number: 2,
      imageUrl: "/exams/hongYen/de10_p3_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Bài toán uốn máng dẫn nước",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nNgười ta muốn làm một chiếc máng dẫn nước bằng cách uốn một tấm tôn phẳng dài có bề rộng bằng $48\\text{ cm}$. Mặt cắt ngang của chiếc máng là hình chữ nhật hở mép trên, được tạo thành bằng cách gấp hai bên mép vuông góc với đáy sao cho mỗi mép có cùng chiều cao là $x\\text{ (cm)}$. Tìm chiều cao $x$ để diện tích mặt cắt ngang của chiếc máng đạt giá trị lớn nhất (giúp máng dẫn được lưu lượng nước tối đa).",
      correctAnswer: "12cm",
      acceptableAnswers: ["12", "12cm", "x=12"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "Khi gấp hai mép cao $x\\text{ cm}$ ($0 < x < 24$), đáy máng có bề rộng là $48 - 2x\\text{ (cm)}$.\nDiện tích mặt cắt ngang của chiếc máng là:\n$$S(x) = x(48 - 2x) = -2x^2 + 48x = -2(x - 12)^2 + 288 \\le 288\\text{ (cm}^2\\text{)}$$\nDấu đẳng thức xảy ra khi $x = 12\\text{ cm}$ (thỏa mãn $0 < x < 24$).\nVậy chiều cao mỗi mép cần gấp là $x = 12\\text{ cm}$ để máng đạt lưu lượng nước tối đa."
    }
  ]
};

