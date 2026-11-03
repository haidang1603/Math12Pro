import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE9_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de9-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 9 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 9) do GV Lê Thị Hồng Yến biên soạn. Luyện giải toàn diện khảo sát đồ thị, tiệm cận, vận tốc gia tốc và bài toán tối ưu hình học, kinh tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 9"],
  part1: [
    {
      imageUrl: "/exams/hongYen/de9_p1_c1.png",
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đồng biến của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 3 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 2 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -3 & & \\end{array}$$\n\nHàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-1; 3)$" },
        { key: "B", text: "$(3; +\\infty)$" },
        { key: "C", text: "$(-\\infty; 3)$" },
        { key: "D", text: "$(-3; 2)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, trên các khoảng $(-\\infty; -1)$ và $(3; +\\infty)$ đạo hàm mang dấu dương ($f'(x) > 0$). Do đó hàm số đồng biến trên khoảng $(3; +\\infty)$."
    },
    {
      imageUrl: "/exams/hongYen/de9_p1_c2.png",
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -3 & & 0 & & 2 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & 0 & - & \\end{array}$$\n\nĐiểm cực đại của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = -3$" },
        { key: "B", text: "$x = 0$" },
        { key: "C", text: "$x = 2$" },
        { key: "D", text: "$x = -1$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ dương sang âm khi đi qua điểm $x = 0$, do đó $x = 0$ là điểm cực đại của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de9_p1_c3.png",
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực tiểu từ đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Điểm cực tiểu của hàm số đã cho là",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD9Q3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD9Q3)" />
  <line x1="120" y1="210" x2="120" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD9Q3)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="106" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="70" y1="130" x2="70" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="70" y1="60" x2="120" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="170" y1="130" x2="170" y2="175" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="120" y1="175" x2="170" y2="175" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="56" y="146" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="166" y="122" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="126" y="64" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">3</text>
  <text x="126" y="112" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="96" y="180" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <path d="M 40,210 C 55,100 60,60 70,60 C 90,60 100,105 120,115 C 140,125 155,175 170,175 C 185,175 195,120 205,35" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="70" cy="60" r="3" fill="#2563eb" />
  <circle cx="170" cy="175" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$x = -1$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$y = -1$" },
        { key: "D", text: "$y = 3$" }
      ],
      correctAnswer: "B",
      explanation: "Đồ thị hàm số đạt điểm cực tiểu tại $(1; -1)$. Do đó điểm cực tiểu của hàm số là $x = 1$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến hàm bậc ba",
      content: "Hàm số $y = -x^3 + 6x^2 - 9x + 1$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; 1)$" },
        { key: "B", text: "$(3; +\\infty)$" },
        { key: "C", text: "$(1; 3)$" },
        { key: "D", text: "$(0; 4)$" }
      ],
      correctAnswer: "C",
      explanation: "$y' = -3x^2 + 12x - 9 = -3(x - 1)(x - 3) > 0 \\iff 1 < x < 3$. Vậy hàm số đồng biến trên khoảng $(1; 3)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực tiểu",
      content: "Điểm cực tiểu của hàm số $y = x^3 - 3x^2 - 24x + 5$ là",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$x = 4$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 3x^2 - 6x - 24 = 3(x + 2)(x - 4) = 0 \\iff x = -2$ hoặc $x = 4$. Đạo hàm đổi dấu từ âm sang dương khi qua $x = 4$ nên $x = 4$ là điểm cực tiểu của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de9_p1_c6.png",
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 2]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -2 & & -1 & & 1 & & 2 \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 4 & & & & 3 \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -1 & & & & -2 & & \\end{array}$$\n\nGiá trị lớn nhất của hàm số trên đoạn $[-2; 2]$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$4$" },
        { key: "C", text: "$-2$" },
        { key: "D", text: "$-1$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, giá trị lớn nhất trên $[-2; 2]$ là $f(-1) = 4$."
    },
    {
      imageUrl: "/exams/hongYen/de9_p1_c7.png",
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN hàm bậc bốn trùng phương",
      content: "Giá trị nhỏ nhất của hàm số $y = x^4 - 2x^2 + 5$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$5$" },
        { key: "B", text: "$4$" },
        { key: "C", text: "$13$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 4x(x^2 - 1) = 0 \\iff x = 0$ hoặc $x = 1 \\in [0; 2]$. Ta có $y(0) = 5, y(1) = 4, y(2) = 13$. Vậy $\\min_{[0; 2]} y = 4$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{2\\}$ có bảng biến thiên:\n\n$$\\begin{array}{c|c||c} x & -\\infty \\quad 2 & 2 \\quad +\\infty \\\\ \\hline f'(x) & - & - \\\\ \\hline f(x) & 5 \\searrow -\\infty & +\\infty \\searrow 5 \\end{array}$$\n\nTiệm cận ngang của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$x = 2$" },
        { key: "B", text: "$y = 5$" },
        { key: "C", text: "$y = 2$" },
        { key: "D", text: "$x = 5$" }
      ],
      correctAnswer: "B",
      explanation: "Do $\\lim_{x \\to \\pm\\infty} f(x) = 5$ nên đường thẳng $y = 5$ là tiệm cận ngang của đồ thị hàm số."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + 3x + 5}{x + 1}$ là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$y = x - 2$" },
        { key: "B", text: "$y = x + 2$" },
        { key: "C", text: "$y = x + 1$" },
        { key: "D", text: "$y = 2x + 1$" }
      ],
      correctAnswer: "B",
      explanation: "Thực hiện phép chia tử cho mẫu: $\\frac{x^2 + 3x + 5}{x + 1} = x + 2 + \\frac{3}{x + 1}$. Khi $x \\to \\pm\\infty$, $\\frac{3}{x + 1} \\to 0$. Vậy tiệm cận xiên là $y = x + 2$."
    },
    {
      imageUrl: "/exams/hongYen/de9_p1_c10.png",
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm nhất biến",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD9Q10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD9Q10)" />
  <line x1="120" y1="210" x2="120" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD9Q10)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="108" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="90" y1="20" x2="90" y2="210" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <line x1="20" y1="100" x2="220" y2="100" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <text x="64" y="146" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">-1</text>
  <text x="124" y="96" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">1</text>
  <text x="150" y="146" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="124" y="160" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <path d="M 25,93 Q 65,92 78,75 Q 85,55 88,20" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <path d="M 105,210 Q 110,165 120,150 Q 145,130 215,115" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="120" cy="150" r="2.5" fill="#0f172a" />
  <circle cx="150" cy="130" r="2.5" fill="#0f172a" />
</svg>`,
      options: [
        { key: "A", text: "$y = \\frac{x - 1}{x + 1}$" },
        { key: "B", text: "$y = \\frac{x + 1}{x - 1}$" },
        { key: "C", text: "$y = \\frac{-x + 1}{x + 1}$" },
        { key: "D", text: "$y = \\frac{2x - 1}{x + 1}$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị có tiệm cận đứng $x = -1$, tiệm cận ngang $y = 1$, đi qua gốc tọa độ cắt trục hoành tại $(1; 0)$ và cắt trục tung tại $(0; -1)$. Hàm số tương ứng là $y = \\frac{x - 1}{x + 1}$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{3x + 5}{x - 2}$ là điểm",
      options: [
        { key: "A", text: "$I(-2; 3)$" },
        { key: "B", text: "$I(2; 3)$" },
        { key: "C", text: "$I(3; 2)$" },
        { key: "D", text: "$I(2; -5)$" }
      ],
      correctAnswer: "B",
      explanation: "Tiệm cận đứng $x = 2$, tiệm cận ngang $y = 3$. Tâm đối xứng là giao điểm của hai tiệm cận $I(2; 3)$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm với trục hoành",
      content: "Đồ thị hàm số $y = \\frac{2x - 8}{x + 3}$ cắt trục hoành tại điểm có tọa độ là",
      options: [
        { key: "A", text: "$(0; 4)$" },
        { key: "B", text: "$(-3; 0)$" },
        { key: "C", text: "$(4; 0)$" },
        { key: "D", text: "$(0; -\\frac{8}{3})$" }
      ],
      correctAnswer: "C",
      explanation: "Cho $y = 0 \\iff 2x - 8 = 0 \\iff x = 4$. Giao điểm là $(4; 0)$."
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
      context: "Cho hàm số $y = f(x) = x^3 - 6x^2 + 9x - 3$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = 3x^2 - 12x + 9$.", correct: true, explanation: "$f'(x) = 3x^2 - 12x + 9$." },
        { key: "b", text: "Hàm số đồng biến trên khoảng $(1; 3)$.", correct: false, explanation: "Trên $(1; 3)$ có $f'(x) < 0$ nên hàm số nghịch biến." },
        { key: "c", text: "Hàm số đạt cực đại tại điểm $x = 1$ và đạt cực tiểu tại điểm $x = 3$.", correct: true, explanation: "$f'(x) = 3(x - 1)(x - 3) = 0 \\iff x = 1$ (cực đại) hoặc $x = 3$ (cực tiểu)." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$.", correct: true, explanation: "$y(1) = 1, y(3) = -3$. Vector $\\vec{AB} = (2; -4) \\implies AB = \\sqrt{2^2 + (-4)^2} = \\sqrt{20} = 2\\sqrt{5}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm phân thức trên khoảng",
      context: "Cho hàm số $f(x) = x + \\frac{64}{x - 1}$ xác định trên khoảng $(1; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $(1; +\\infty)$ là $f'(x) = 1 - \\frac{64}{(x - 1)^2}$.", correct: true, explanation: "Đúng theo công thức đạo hàm." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(1; +\\infty)$ là $x = 9$.", correct: true, explanation: "$(x - 1)^2 = 64 \\iff x - 1 = 8 \\iff x = 9$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên khoảng $(1; +\\infty)$ bằng $17$.", correct: true, explanation: "$f(9) = 9 + \\frac{64}{8} = 17$." },
        { key: "d", text: "Hàm số đồng biến trên khoảng $(1; 9)$.", correct: false, explanation: "Trên $(1; 9)$ có $f'(x) < 0$ nên hàm số nghịch biến." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{5x - 2}{x + 1}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = -1$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu số triệt tiêu tại $x = -1$." },
        { key: "b", text: "Đường thẳng $y = 5$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 5$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định $(-\\infty; -1)$ và $(-1; +\\infty)$.", correct: true, explanation: "$y' = \\frac{5(1) - (-2)(1)}{(x + 1)^2} = \\frac{7}{(x + 1)^2} > 0$." },
        { key: "d", text: "Tọa độ tâm đối xứng của đồ thị hàm số là $I(1; 5)$.", correct: false, explanation: "Tâm đối xứng là $I(-1; 5)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 2x + 3}{x - 1}$.",
      statements: [
        { key: "a", text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.", correct: true, explanation: "Mẫu số khác 0 khi $x \\ne 1$." },
        { key: "b", text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x - 1$.", correct: true, explanation: "$\\frac{x^2 - 2x + 3}{x - 1} = x - 1 + \\frac{2}{x - 1}$." },
        { key: "c", text: "Tọa độ giao điểm của hai đường tiệm cận là điểm $I(1; 0)$.", correct: true, explanation: "Giao điểm của $x = 1$ và $y = x - 1$ là $I(1; 0)$." },
        { key: "d", text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.", correct: false, explanation: "$x^2 - 2x + 3 = 0$ có $\\Delta = 4 - 12 = -8 < 0$, vô nghiệm nên không cắt trục hoành." }
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
      topic: "Tham số m nghịch biến",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 2}{x + m}$ nghịch biến trên khoảng $(3; +\\infty)$?",
      correctAnswer: "5",
      acceptableAnswers: ["5"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 2}{(x + m)^2} < 0 \\iff m < 2$. Điều kiện hàm số xác định trên $(3; +\\infty)$ là $-m \\le 3 \\iff m \\ge -3$. Do đó $-3 \\le m < 2$. Vì $m \\in \\mathbb{Z} \\implies m \\in \\{-3, -2, -1, 0, 1\\}$ (5 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa bồn nước có nắp",
      content: "Người ta muốn chế tạo một bồn chứa nước hình trụ có nắp đậy bằng tôn với thể tích bằng $432\\pi\\text{ dm}^3$. Hỏi bán kính đáy $R$ của bồn bằng bao nhiêu đêximét để diện tích tôn cần sử dụng (diện tích toàn phần) là nhỏ nhất?",
      correctAnswer: "6",
      acceptableAnswers: ["6", "6dm"],
      unit: "dm",
      explanation: "Chiều cao $h = \\frac{432}{R^2}$. Diện tích toàn phần: $S(R) = 2\\pi R^2 + 2\\pi Rh = 2\\pi \\left(R^2 + \\frac{432}{R}\\right) = 2\\pi \\left(R^2 + \\frac{216}{R} + \\frac{216}{R}\\right) \\ge 2\\pi \\cdot 3\\sqrt[3]{R^2 \\cdot \\frac{216}{R} \\cdot \\frac{216}{R}} = 216\\pi$. Dấu bằng xảy ra khi $R^2 = \\frac{216}{R} \\iff R^3 = 216 \\iff R = 6\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một xưởng sản xuất giày thể thao có chi phí sản xuất $x$ đôi giày mỗi ngày ($x > 0$) được cho bởi hàm số $C(x) = x^2 + 60x + 3000$ (nghìn đồng). Giá bán mỗi đôi giày trên thị trường phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 500 - x$ (nghìn đồng). Hỏi xưởng cần sản xuất bao nhiêu đôi giày mỗi ngày để lợi nhuận thu được là lớn nhất?",
      correctAnswer: "110",
      acceptableAnswers: ["110", "110 đôi"],
      unit: "đôi",
      explanation: "Doanh thu: $R(x) = x(500 - x) = 500x - x^2$. Lợi nhuận: $P(x) = R(x) - C(x) = (500x - x^2) - (x^2 + 60x + 3000) = -2x^2 + 440x - 3000$. Đạt cực đại tại đỉnh parabol: $x = -\\frac{440}{2(-2)} = 110$ đôi giày."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Vận tốc tức thời khi gia tốc bằng 0",
      content: "Một chất điểm chuyển động theo phương trình quãng đường $s(t) = -t^3 + 15t^2 + 36t$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và quãng đường $s(t)$ tính bằng mét. Vận tốc tức thời của chất điểm tại thời điểm gia tốc bằng $0$ là bao nhiêu mét trên giây?",
      correctAnswer: "111",
      acceptableAnswers: ["111", "111m/s"],
      unit: "m/s",
      explanation: "Vận tốc: $v(t) = s'(t) = -3t^2 + 30t + 36$. Gia tốc: $a(t) = v'(t) = -6t + 30$. Gia tốc bằng $0 \\iff -6t + 30 = 0 \\iff t = 5\\text{ s}$. Vận tốc khi đó là: $v(5) = -3(5^2) + 30(5) + 36 = -75 + 150 + 36 = 111\\text{ m/s}$."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số bậc ba",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = 2x^3 - 3x^2 - 12x + 5$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=-1, x=2",
      acceptableAnswers: ["x=-1, x=2"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "1) Tập xác định: $D = \\mathbb{R}$.\n2) Đạo hàm: $y' = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x + 1)(x - 2)$.\n$y' = 0 \\iff x = -1$ hoặc $x = 2$.\n3) Bảng biến thiên:\n- $y' > 0$ trên $(-\\infty; -1)$ và $(2; +\\infty) \\implies$ hàm số đồng biến trên $(-\\infty; -1)$ và $(2; +\\infty)$.\n- $y' < 0$ trên $(-1; 2) \\implies$ hàm số nghịch biến trên khoảng $(-1; 2)$.\n4) Cực trị:\n- Hàm số đạt cực đại tại $x = -1$, giá trị cực đại $y(-1) = 12$.\n- Hàm số đạt cực tiểu tại $x = 2$, giá trị cực tiểu $y(2) = -15$."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      imageUrl: "/exams/hongYen/de9_p3_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Gập hộp tôn chữ nhật không nắp",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nMột tấm tôn hình chữ nhật có kích thước chiều dài bằng $90\\text{ cm}$ và chiều rộng bằng $48\\text{ cm}$. Người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh bằng $x\\text{ (cm)}$ rồi gập các mép lại để tạo thành một chiếc hộp không nắp có dạng hình hộp chữ nhật. Tìm độ dài cạnh $x$ để thể tích của chiếc hộp thu được là lớn nhất.",
      correctAnswer: "10cm",
      acceptableAnswers: ["10", "10cm", "x=10"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "Sau khi cắt bỏ 4 hình vuông cạnh $x$ ($0 < x < 24$), đáy hộp là hình chữ nhật có kích thước $(90 - 2x)\\text{ cm}$ và $(48 - 2x)\\text{ cm}$, chiều cao hộp là $x\\text{ cm}$.\nThể tích hộp: $V(x) = x(90 - 2x)(48 - 2x) = 4x(45 - x)(24 - x) = 4(x^3 - 69x^2 + 1080x)$.\nĐạo hàm: $V'(x) = 4(3x^2 - 138x + 1080) = 12(x^2 - 46x + 360) = 12(x - 10)(x - 36)$.\nVới điều kiện $0 < x < 24$, phương trình $V'(x) = 0$ có nghiệm duy nhất $x = 10\\text{ cm}$.\nKhi qua $x = 10$, $V'(x)$ đổi dấu từ dương sang âm nên $V(x)$ đạt giá trị lớn nhất tại $x = 10\\text{ cm}$.\nVậy độ dài cạnh hình vuông cắt bỏ là $x = 10\\text{ cm}$."
    }
  ]
};

