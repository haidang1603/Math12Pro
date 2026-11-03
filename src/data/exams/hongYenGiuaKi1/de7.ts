import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE7_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de7-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 7 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 7) do GV Lê Thị Hồng Yến biên soạn. Khảo sát đồ thị hàm số, cực trị, tiệm cận, vận tốc gia tốc và bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 7"],
  part1: [
    {
      imageUrl: "/exams/hongYen/de7_p1_c1.png",
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đồng biến của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -2 & & 1 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & +\\infty & & & & 3 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -1 & & & & -\\infty \\end{array}$$\n\nHàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -2)$" },
        { key: "B", text: "$(-2; 1)$" },
        { key: "C", text: "$(1; +\\infty)$" },
        { key: "D", text: "$(-1; 3)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, trên khoảng $(-2; 1)$ thì $f'(x) > 0$ và mũi tên đi lên, do đó hàm số đồng biến trên $(-2; 1)$."
    },
    {
      imageUrl: "/exams/hongYen/de7_p1_c2.png",
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực tiểu",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -1 & & 2 & & 4 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & 0 & + & \\end{array}$$\n\nĐiểm cực tiểu của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = 2$" },
        { key: "B", text: "$x = -1$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = 3$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ âm sang dương khi đi qua $x = -1$ và $x = 4$. Trong các phương án đưa ra, $x = -1$ là điểm cực tiểu của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de7_p1_c3.png",
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị cực tiểu từ đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Giá trị cực tiểu của hàm số đã cho bằng",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD7Q3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="90" x2="220" y2="90" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD7Q3)" />
  <line x1="80" y1="210" x2="80" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD7Q3)" />
  <text x="215" y="106" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="68" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="66" y="106" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="160" y1="90" x2="160" y2="175" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="80" y1="175" x2="160" y2="175" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="156" y="82" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="54" y="179" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-4</text>
  <path d="M 50,165 C 65,115 70,90 80,90 C 100,90 120,135 140,165 C 150,175 155,175 160,175 C 170,175 185,130 200,45" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="80" cy="90" r="3" fill="#2563eb" />
  <circle cx="160" cy="175" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$0$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$-4$" },
        { key: "D", text: "$-2$" }
      ],
      correctAnswer: "C",
      explanation: "Đồ thị đạt điểm cực tiểu tại $(2; -4)$. Do đó giá trị cực tiểu của hàm số là $y_{CT} = -4$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khoảng đồng biến của hàm bậc ba",
      content: "Hàm số $y = x^3 - 6x^2 + 9x + 2$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(1; 3)$" },
        { key: "B", text: "$(3; +\\infty)$" },
        { key: "C", text: "$(0; 2)$" },
        { key: "D", text: "$(1; +\\infty)$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm $y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3) > 0 \\iff x \\in (-\\infty; 1) \\cup (3; +\\infty)$. Do đó hàm số đồng biến trên khoảng $(3; +\\infty)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại",
      content: "Điểm cực đại của hàm số $y = -x^3 + 3x^2 - 4$ là",
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$x = -4$" },
        { key: "D", text: "$x = 4$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = -3x^2 + 6x = -3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$. Đạo hàm đổi dấu từ dương sang âm tại $x = 2$, nên $x = 2$ là điểm cực đại."
    },
    {
      imageUrl: "/exams/hongYen/de7_p1_c6.png",
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-3; 1]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -3 & & -2 & & 0 & & 1 \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & 4 & & & & 5 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -2 & & & & 1 \\end{array}$$\n\nGiá trị lớn nhất của hàm số trên đoạn $[-3; 1]$ bằng",
      options: [
        { key: "A", text: "$4$" },
        { key: "B", text: "$5$" },
        { key: "C", text: "$-2$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "A",
      explanation: "Dựa vào bảng biến thiên, giá trị cao nhất trên đoạn $[-3; 1]$ là $f(0) = 5$."
    },
    {
      imageUrl: "/exams/hongYen/de7_p1_c7.png",
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Giá trị nhỏ nhất của hàm số $y = -x^3 + 3x + 5$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$5$" },
        { key: "B", text: "$3$" },
        { key: "C", text: "$7$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = -3x^2 + 3 = 0 \\iff x = 1 \\in [0; 2]$. Ta có $y(0) = 5, y(1) = 7, y(2) = -8 + 6 + 5 = 3$. Vậy $\\min_{[0; 2]} y = 3$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{2\\}$ có bảng biến thiên:\n\n$$\\begin{array}{c|c||c} x & -\\infty \\quad 2 & 2 \\quad +\\infty \\\\ \\hline f'(x) & - & - \\\\ \\hline f(x) & -1 \\searrow -\\infty & +\\infty \\searrow -1 \\end{array}$$\n\nTiệm cận ngang của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$x = 2$" },
        { key: "B", text: "$y = 2$" },
        { key: "C", text: "$y = -1$" },
        { key: "D", text: "$x = -1$" }
      ],
      correctAnswer: "C",
      explanation: "Vì $\\lim_{x \\to \\pm\\infty} f(x) = -1$ nên đường thẳng $y = -1$ là đường tiệm cận ngang của đồ thị hàm số."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 3x + 1}{x - 2}$ là",
      options: [
        { key: "A", text: "$y = x + 1$" },
        { key: "B", text: "$y = x - 1$" },
        { key: "C", text: "$y = x - 3$" },
        { key: "D", text: "$y = 2x - 1$" }
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\frac{x^2 - 3x + 1}{x - 2} = x - 1 - \\frac{1}{x - 2}$. Khi $x \\to \\pm\\infty$, phần dư $-\\frac{1}{x - 2} \\to 0$. Vậy tiệm cận xiên là đường thẳng $y = x - 1$."
    },
    {
      imageUrl: "/exams/hongYen/de7_p1_c10.png",
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm bậc ba",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD7Q10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD7Q10)" />
  <line x1="80" y1="210" x2="80" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD7Q10)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="68" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="68" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="160" y1="130" x2="160" y2="70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="80" y1="70" x2="160" y2="70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="156" y="146" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="68" y="74" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="56" y="194" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <path d="M 50,110 C 65,160 70,190 80,190 C 100,190 120,130 140,85 C 150,70 155,70 160,70 C 170,70 180,100 195,145" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="80" cy="190" r="3" fill="#2563eb" />
  <circle cx="160" cy="70" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$y = -x^3 + 3x^2 - 2$" },
        { key: "B", text: "$y = x^3 - 3x^2 - 2$" },
        { key: "C", text: "$y = -x^3 + 3x - 2$" },
        { key: "D", text: "$y = -x^4 + 2x^2 - 2$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị hàm bậc ba có nhánh phải đi xuống nên hệ số $a < 0$. Đồ thị đạt cực tiểu tại $(0; -2)$ và cực đại tại $(2; 2)$. Kiểm tra hàm $y = -x^3 + 3x^2 - 2$ thỏa mãn toàn bộ các đặc trưng."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng",
      content: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{5x + 2}{x - 4}$ là đường thẳng",
      options: [
        { key: "A", text: "$y = 5$" },
        { key: "B", text: "$x = 4$" },
        { key: "C", text: "$x = -4$" },
        { key: "D", text: "$y = 4$" }
      ],
      correctAnswer: "B",
      explanation: "Nghiệm của mẫu số là $x = 4$ (không làm tử bằng 0) nên $x = 4$ là đường tiệm cận đứng."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{x - 3}{x + 2}$ là điểm",
      options: [
        { key: "A", text: "$I(2; 1)$" },
        { key: "B", text: "$I(-2; 1)$" },
        { key: "C", text: "$I(-2; -3)$" },
        { key: "D", text: "$I(1; -2)$" }
      ],
      correctAnswer: "B",
      explanation: "Tiệm cận đứng $x = -2$, tiệm cận ngang $y = 1$. Giao điểm của hai đường tiệm cận là tâm đối xứng $I(-2; 1)$."
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
      context: "Cho hàm số $y = f(x) = \\frac{1}{3}x^3 - 3x^2 + 8x - 1$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = x^2 - 6x + 8$.", correct: true, explanation: "$f'(x) = 3 \\cdot \\frac{1}{3}x^2 - 6x + 8 = x^2 - 6x + 8$." },
        { key: "b", text: "Hàm số nghịch biến trên khoảng $(4; +\\infty)$.", correct: false, explanation: "Trên $(4; +\\infty)$ có $f'(x) > 0$ nên hàm số đồng biến." },
        { key: "c", text: "Hàm số đạt cực đại tại điểm $x = 2$ và đạt cực tiểu tại điểm $x = 4$.", correct: true, explanation: "$f'(x) = 0 \\iff x = 2$ (đổi dấu từ dương sang âm) hoặc $x = 4$ (đổi dấu từ âm sang dương)." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $\\frac{2\\sqrt{13}}{3}$.", correct: true, explanation: "$y(2) = \\frac{17}{3}, y(4) = \\frac{13}{3}$. Vector $\\vec{AB} = (2; -\\frac{4}{3}) \\implies AB = \\sqrt{4 + \\frac{16}{9}} = \\frac{\\sqrt{52}}{3} = \\frac{2\\sqrt{13}}{3}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm phân thức trên khoảng",
      context: "Cho hàm số $f(x) = x + \\frac{49}{x - 3}$ xác định trên khoảng $(3; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $(3; +\\infty)$ là $f'(x) = 1 - \\frac{49}{(x - 3)^2}$.", correct: true, explanation: "Đúng theo công thức đạo hàm." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(3; +\\infty)$ là $x = 10$.", correct: true, explanation: "$(x - 3)^2 = 49 \\iff x - 3 = 7 \\iff x = 10$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên khoảng $(3; +\\infty)$ bằng $17$.", correct: true, explanation: "$f(10) = 10 + \\frac{49}{7} = 17$." },
        { key: "d", text: "Hàm số đồng biến trên khoảng $(3; 10)$.", correct: false, explanation: "Trên $(3; 10)$ có $f'(x) < 0$ nên hàm số nghịch biến." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{2x - 1}{x + 3}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = -3$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu số triệt tiêu tại $x = -3$." },
        { key: "b", text: "Đường thẳng $y = 2$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 2$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định $(-\\infty; -3)$ và $(-3; +\\infty)$.", correct: true, explanation: "$y' = \\frac{2(3) - (-1)(1)}{(x + 3)^2} = \\frac{7}{(x + 3)^2} > 0$." },
        { key: "d", text: "Tâm đối xứng của đồ thị hàm số là điểm $I(3; 2)$.", correct: false, explanation: "Tâm đối xứng là $I(-3; 2)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm phân thức bậc 2 trên bậc 1",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 + x + 1}{x + 1}$.",
      statements: [
        { key: "a", text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{-1\\}$.", correct: true, explanation: "Mẫu số khác 0 khi $x \\ne -1$." },
        { key: "b", text: "Đường thẳng $y = x$ là đường tiệm cận xiên của đồ thị hàm số.", correct: true, explanation: "$\\frac{x^2 + x + 1}{x + 1} = x + \\frac{1}{x + 1}$." },
        { key: "c", text: "Giao điểm của hai đường tiệm cận là điểm $I(-1; -1)$.", correct: true, explanation: "Giao của $x = -1$ và $y = x$ là $(-1; -1)$." },
        { key: "d", text: "Đồ thị hàm số cắt trục tung tại điểm có tung độ âm.", correct: false, explanation: "Tại $x = 0 \\implies y = 1 > 0$ (tung độ dương)." }
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
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 6}{x + m}$ đồng biến trên khoảng $(3; +\\infty)$?",
      correctAnswer: "4",
      acceptableAnswers: ["4"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 6}{(x + m)^2} > 0 \\iff m > 6$. Điều kiện xác định trên $(3; +\\infty)$ là $-m \\le 3 \\iff m \\ge -3$. Kết hợp $m > 6$ và $m \\in [-10; 10], m \\in \\mathbb{Z} \\implies m \\in \\{7, 8, 9, 10\\}$ (4 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa bồn nước không nắp",
      content: "Người ta muốn thiết kế một chiếc bồn chứa nước hình trụ không có nắp đậy bằng tôn với thể tích bằng $64\\pi\\text{ dm}^3$. Hỏi bán kính đáy $R$ của bồn chứa bằng bao nhiêu đêximét để diện tích tôn cần sử dụng (bao gồm diện tích xung quanh và diện tích một mặt đáy) là nhỏ nhất?",
      correctAnswer: "4",
      acceptableAnswers: ["4", "4dm"],
      unit: "dm",
      explanation: "Thể tích $V = \\pi R^2 h = 64\\pi \\implies h = \\frac{64}{R^2}$. Diện tích tôn một đáy và xung quanh: $S(R) = \\pi R^2 + 2\\pi Rh = \\pi \\left(R^2 + \\frac{128}{R}\\right) = \\pi \\left(R^2 + \\frac{64}{R} + \\frac{64}{R}\\right) \\ge 3\\pi \\sqrt[3]{R^2 \\cdot \\frac{64}{R} \\cdot \\frac{64}{R}} = 48\\pi$. Dấu bằng xảy ra khi $R^2 = \\frac{64}{R} \\iff R^3 = 64 \\iff R = 4\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một công ty sản xuất một loại quạt điện. Chi phí sản xuất cho $x$ chiếc quạt ($x > 0$) mỗi tuần được cho bởi hàm số $C(x) = x^2 + 40x + 2000$ (nghìn đồng). Giá bán mỗi chiếc quạt trên thị trường phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 360 - x$ (nghìn đồng). Hỏi công ty cần sản xuất và bán ra bao nhiêu chiếc quạt mỗi tuần để lợi nhuận thu được là lớn nhất?",
      correctAnswer: "80",
      acceptableAnswers: ["80", "80 chiếc"],
      unit: "chiếc",
      explanation: "Lợi nhuận $P(x) = x(360 - x) - (x^2 + 40x + 2000) = -2x^2 + 320x - 2000$. Hàm số đạt giá trị lớn nhất tại đỉnh parabol: $x = -\\frac{320}{2(-2)} = 80$ chiếc."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Vận tốc tức thời khi gia tốc triệt tiêu",
      content: "Một chất điểm chuyển động theo phương trình quãng đường $s(t) = -t^3 + 6t^2 + 24t$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và quãng đường $s(t)$ tính bằng mét. Vận tốc tức thời của chất điểm tại thời điểm gia tốc bằng $0$ là bao nhiêu mét trên giây?",
      correctAnswer: "36",
      acceptableAnswers: ["36", "36m/s"],
      unit: "m/s",
      explanation: "Vận tốc $v(t) = s'(t) = -3t^2 + 12t + 24$. Gia tốc $a(t) = v'(t) = -6t + 12$. Gia tốc bằng $0 \\iff -6t + 12 = 0 \\iff t = 2\\text{ s}$. Vận tốc tức thời khi đó: $v(2) = -3(2^2) + 12(2) + 24 = -12 + 24 + 24 = 36\\text{ m/s}$."
    },
  ],
  part4: [
    {
      id: 1,
      part: 4,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = x^3 - 6x^2 + 9x - 1$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=1, x=3",
      acceptableAnswers: ["x=1, x=3", "1, 3", "1 và 3", "(1;3), (3;-1)", "(1; 3), (3; -1)"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "1) Tập xác định: $D = \\mathbb{R}$.\n2) Đạo hàm: $y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$.\n$y' = 0 \\iff x = 1$ hoặc $x = 3$.\n3) Bảng xét dấu đạo hàm:\n- $y' > 0$ trên $(-\\infty; 1)$ và $(3; +\\infty) \\implies$ hàm số đồng biến trên $(-\\infty; 1)$ và $(3; +\\infty)$.\n- $y' < 0$ trên $(1; 3) \\implies$ hàm số nghịch biến trên khoảng $(1; 3)$.\n4) Cực trị:\n- Hàm số đạt cực đại tại $x = 1$, giá trị cực đại $y(1) = 3$.\n- Hàm số đạt cực tiểu tại $x = 3$, giá trị cực tiểu $y(3) = -1$."
    },
    {
      id: 2,
      part: 4,
      number: 2,
      imageUrl: "/exams/hongYen/de7_p3_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Bài toán rào đất hình chữ nhật giáp bờ sông",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nMột bác nông dân dự định làm một hàng rào bằng lưới thép dài $160\\text{ m}$ để rào quanh một khu đất hình chữ nhật giáp với bờ sông thẳng (phía bờ sông không cần rào). Hỏi diện tích lớn nhất của khu đất mà bác nông dân có thể rào được là bao nhiêu mét vuông?",
      correctAnswer: "3200m2",
      acceptableAnswers: ["3200", "3200m2", "3200 m2"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "Gọi $x$ là chiều rộng của khu đất (độ dài 2 cạnh vuông góc với bờ sông, $0 < x < 80$).\nVì bờ sông không cần rào nên cạnh chiều dài song song với bờ sông có độ dài là $160 - 2x\\text{ (m)}$.\nDiện tích khu đất rào được là:\n$$S(x) = x(160 - 2x) = -2x^2 + 160x = -2(x - 40)^2 + 3200 \\le 3200\\text{ (m}^2\\text{)}$$\nDấu đẳng thức xảy ra khi $x = 40\\text{ m}$.\nKhi đó chiều dài khu đất là $160 - 2(40) = 80\\text{ m}$.\nVậy diện tích lớn nhất mà bác nông dân có thể rào được là $3200\\text{ m}^2$."
    }
  ]
};

