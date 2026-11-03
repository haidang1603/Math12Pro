import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE6_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de6-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 6 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 6) do GV Lê Thị Hồng Yến biên soạn. Chuyên đề Khảo sát hàm số, tính đơn điệu, cực trị, tiệm cận và các bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 6"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đơn điệu của hàm số",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -2 & & 0 & & 3 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & 0 & - & \\end{array}$$\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -2)$" },
        { key: "B", text: "$(-2; 0)$" },
        { key: "C", text: "$(0; 3)$" },
        { key: "D", text: "$(-\\infty; 0)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng xét dấu, đạo hàm $f'(x) < 0$ trên các khoảng $(-2; 0)$ và $(3; +\\infty)$. Do đó hàm số nghịch biến trên khoảng $(-2; 0)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & 0 & & 2 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & +\\infty & & & & 5 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -3 & & & & -\\infty \\end{array}$$\n\nĐiểm cực đại của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = -3$" },
        { key: "C", text: "$x = 2$" },
        { key: "D", text: "$x = 5$" }
      ],
      correctAnswer: "C",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ dương sang âm khi đi qua $x = 2$, do đó hàm số đạt cực đại tại điểm $x = 2$."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tọa độ điểm cực đại của đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Tọa độ điểm cực đại của đồ thị hàm số đã cho là",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD6Q3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD6Q3)" />
  <line x1="80" y1="210" x2="80" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD6Q3)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="68" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="68" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="160" y1="130" x2="160" y2="190" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="80" y1="190" x2="160" y2="190" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="86" y="74" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="156" y="122" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="56" y="194" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <path d="M 50,150 C 65,90 70,70 80,70 C 95,70 120,130 140,175 C 150,190 155,190 160,190 C 170,190 180,160 195,115" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="80" cy="70" r="3" fill="#2563eb" />
  <circle cx="160" cy="190" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$(2; -2)$" },
        { key: "B", text: "$(0; 2)$" },
        { key: "C", text: "$(1; 0)$" },
        { key: "D", text: "$(0; 0)$" }
      ],
      correctAnswer: "B",
      explanation: "Đồ thị hàm số đạt đỉnh nhô cao nhất tại điểm có tọa độ $(0; 2)$, do đó tọa độ điểm cực đại của đồ thị hàm số là $(0; 2)$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến hàm bậc ba",
      content: "Hàm số $y = -x^3 + 3x - 5$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -1)$" },
        { key: "B", text: "$(1; +\\infty)$" },
        { key: "C", text: "$(-1; 1)$" },
        { key: "D", text: "$(0; 3)$" }
      ],
      correctAnswer: "C",
      explanation: "Ta có $y' = -3x^2 + 3 = -3(x^2 - 1)$. $y' > 0 \\iff -1 < x < 1$. Do đó hàm số đồng biến trên khoảng $(-1; 1)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực tiểu",
      content: "Điểm cực tiểu của hàm số $y = x^3 - 6x^2 + 9x - 1$ là",
      options: [
        { key: "A", text: "$x = 1$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = -1$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm $y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3) = 0 \\iff x = 1$ hoặc $x = 3$. Qua $x = 3$, đạo hàm đổi dấu từ âm sang dương nên $x = 3$ là điểm cực tiểu của hàm số."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 4]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -2 & & 0 & & 3 & & 4 \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & 1 & & & & 7 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -5 & & & & 2 \\end{array}$$\n\nGiá trị nhỏ nhất của hàm số trên đoạn $[-2; 4]$ bằng",
      options: [
        { key: "A", text: "$1$" },
        { key: "B", text: "$-5$" },
        { key: "C", text: "$7$" },
        { key: "D", text: "$2$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên trên $[-2; 4]$, giá trị nhỏ nhất của hàm số là $\\min_{[-2; 4]} f(x) = f(0) = -5$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN của hàm số",
      content: "Giá trị lớn nhất của hàm số $y = x^3 - 3x^2 + 3$ trên đoạn $[0; 3]$ bằng",
      options: [
        { key: "A", text: "$-1$" },
        { key: "B", text: "$3$" },
        { key: "C", text: "$5$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$. Ta có $y(0) = 3, y(2) = -1, y(3) = 3$. Vậy $\\max_{[0; 3]} y = 3$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng từ bảng biến thiên",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{-1\\}$ có bảng biến thiên:\n\n$$\\begin{array}{c|c||c} x & -\\infty \\quad -1 & -1 \\quad +\\infty \\\\ \\hline f'(x) & - & - \\\\ \\hline f(x) & 2 \\searrow -\\infty & +\\infty \\searrow 2 \\end{array}$$\n\nTiệm cận đứng của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$y = 2$" },
        { key: "B", text: "$x = -1$" },
        { key: "C", text: "$y = -1$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "B",
      explanation: "Do $\\lim_{x \\to -1^-} f(x) = -\\infty$ và $\\lim_{x \\to -1^+} f(x) = +\\infty$ nên đường tiệm cận đứng là $x = -1$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - x + 3}{x + 2}$ là",
      options: [
        { key: "A", text: "$y = x + 3$" },
        { key: "B", text: "$y = x - 1$" },
        { key: "C", text: "$y = x - 3$" },
        { key: "D", text: "$y = -x + 3$" }
      ],
      correctAnswer: "C",
      explanation: "Chia tử cho mẫu: $\\frac{x^2 - x + 3}{x + 2} = x - 3 + \\frac{9}{x + 2}$. Vì $\\lim_{x \\to \\pm\\infty} \\frac{9}{x + 2} = 0$ nên tiệm cận xiên là $y = x - 3$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm phân thức",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD6Q10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD6Q10)" />
  <line x1="120" y1="210" x2="120" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD6Q10)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="108" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="150" y1="20" x2="150" y2="210" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <line x1="20" y1="100" x2="220" y2="100" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,4" />
  <text x="154" y="146" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">1</text>
  <text x="104" y="96" font-family="Times New Roman, serif" font-size="13" fill="#ef4444">1</text>
  <text x="60" y="146" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <text x="96" y="176" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <path d="M 25,124 Q 90,130 115,145 Q 130,165 135,210" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <path d="M 165,20 Q 170,65 185,85 Q 200,95 215,97" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="60" cy="130" r="2.5" fill="#0f172a" />
  <circle cx="120" cy="170" r="2.5" fill="#0f172a" />
</svg>`,
      options: [
        { key: "A", text: "$y = \\frac{x + 2}{x - 1}$" },
        { key: "B", text: "$y = \\frac{x - 2}{x + 1}$" },
        { key: "C", text: "$y = \\frac{2x + 1}{x - 1}$" },
        { key: "D", text: "$y = \\frac{-x + 2}{x - 1}$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị có tiệm cận đứng $x = 1$, tiệm cận ngang $y = 1$, cắt trục hoành tại $(-2; 0)$ và cắt trục tung tại $(0; -2)$. Do đó hàm số tương ứng là $y = \\frac{x + 2}{x - 1}$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{2x - 3}{x + 3}$ là điểm",
      options: [
        { key: "A", text: "$I(3; 2)$" },
        { key: "B", text: "$I(-3; 2)$" },
        { key: "C", text: "$I(-3; -3)$" },
        { key: "D", text: "$I(2; -3)$" }
      ],
      correctAnswer: "B",
      explanation: "Tiệm cận đứng $x = -3$, tiệm cận ngang $y = 2$. Tâm đối xứng là giao điểm của hai đường tiệm cận: $I(-3; 2)$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm với trục hoành",
      content: "Đồ thị hàm số $y = \\frac{2x + 6}{x - 2}$ cắt trục hoành tại điểm có tọa độ là",
      options: [
        { key: "A", text: "$(0; -3)$" },
        { key: "B", text: "$(3; 0)$" },
        { key: "C", text: "$(-3; 0)$" },
        { key: "D", text: "$(2; 0)$" }
      ],
      correctAnswer: "C",
      explanation: "Giao điểm với trục hoành có $y = 0 \\iff 2x + 6 = 0 \\iff x = -3$. Tọa độ giao điểm là $(-3; 0)$."
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
      context: "Cho hàm số $y = f(x) = \\frac{1}{3}x^3 - x^2 - 8x + 1$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = x^2 - 2x - 8$.", correct: true, explanation: "$f'(x) = 3 \\cdot \\frac{1}{3}x^2 - 2x - 8 = x^2 - 2x - 8$." },
        { key: "b", text: "Hàm số nghịch biến trên khoảng $(4; +\\infty)$.", correct: false, explanation: "Trên $(4; +\\infty)$ có $f'(x) > 0$ nên hàm số đồng biến." },
        { key: "c", text: "Hàm số đạt cực đại tại điểm $x = -2$ và đạt cực tiểu tại điểm $x = 4$.", correct: true, explanation: "$f'(x) = 0 \\iff x = -2$ hoặc $x = 4$. Dấu của $f'(x)$ đổi từ dương sang âm tại $-2$ và từ âm sang dương tại $4$." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $6\\sqrt{37}$.", correct: true, explanation: "$y(-2) = \\frac{31}{3}$, $y(4) = -\\frac{77}{3}$. Vector $\\vec{AB} = (6; -36) \\implies AB = \\sqrt{6^2 + (-36)^2} = \\sqrt{36(1 + 36)} = 6\\sqrt{37}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số trên đoạn",
      context: "Cho hàm số $f(x) = x + \\frac{36}{x}$ xác định trên đoạn $[2; 10]$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $[2; 10]$ là $f'(x) = 1 - \\frac{36}{x^2}$.", correct: true, explanation: "Đúng theo công thức đạo hàm." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(2; 10)$ là $x = 6$.", correct: true, explanation: "$1 - 36/x^2 = 0 \\iff x = 6 \\in (2; 10)$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên đoạn $[2; 10]$ bằng $12$.", correct: true, explanation: "Tại $x = 6$, $f(6) = 6 + 6 = 12$. So sánh $f(2) = 20, f(10) = 13{,}6 \\implies \\min = 12$." },
        { key: "d", text: "Giá trị lớn nhất của hàm số trên đoạn $[2; 10]$ bằng $13{,}6$.", correct: false, explanation: "Giá trị lớn nhất là $f(2) = 20 > 13{,}6$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{4x - 3}{x + 1}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = -1$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu số triệt tiêu tại $x = -1$." },
        { key: "b", text: "Đường thẳng $y = 4$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} \\frac{4x - 3}{x + 1} = 4$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$.", correct: true, explanation: "$y' = \\frac{4(1) - (-3)(1)}{(x + 1)^2} = \\frac{7}{(x + 1)^2} > 0$." },
        { key: "d", text: "Giao điểm của hai đường tiệm cận là điểm $I(1; 4)$.", correct: false, explanation: "Giao điểm là $I(-1; 4)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 + 3x + 3}{x + 2}$.",
      statements: [
        { key: "a", text: "Đồ thị hàm số có đường tiệm cận đứng là $x = -2$.", correct: true, explanation: "Mẫu số triệt tiêu tại $x = -2$." },
        { key: "b", text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x + 1$.", correct: true, explanation: "$\\frac{x^2 + 3x + 3}{x + 2} = x + 1 + \\frac{1}{x + 2}$." },
        { key: "c", text: "Tọa độ tâm đối xứng của đồ thị hàm số là $I(-2; -1)$.", correct: true, explanation: "Giao điểm của tiệm cận đứng $x = -2$ và xiên $y = x + 1$ là $I(-2; -1)$." },
        { key: "d", text: "Đồ thị hàm số không có điểm cực trị nào.", correct: false, explanation: "$y' = 1 - \\frac{1}{(x + 2)^2} = 0 \\iff (x + 2)^2 = 1 \\iff x = -1$ hoặc $x = -3$, hàm số có 2 điểm cực trị." }
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
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x - 2}{x - m}$ đồng biến trên khoảng $(4; +\\infty)$?",
      correctAnswer: "12",
      acceptableAnswers: ["12"],
      unit: "giá trị",
      explanation: "Ta có $y' = \\frac{-m + 2}{(x - m)^2}$. Hàm số đồng biến trên $(4; +\\infty) \\iff \\begin{cases} -m + 2 > 0 \\\\ m \\le 4 \\end{cases} \\iff m < 2$. Kết hợp $m \\in [-10; 10]$ và $m \\in \\mathbb{Z} \\implies m \\in \\{-10, -9, \\dots, 0, 1\\}$. Số giá trị nguyên là $1 - (-10) + 1 = 12$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lon nước ngọt",
      content: "Một công ty sản xuất lon nước ngọt bằng nhôm hình trụ có nắp với thể tích bằng $54\\pi\\text{ cm}^3$. Bán kính đáy $R$ của lon bằng bao nhiêu xentimét để diện tích toàn phần của lon nhôm (bao gồm hai đáy và mặt xung quanh) là nhỏ nhất giúp tiết kiệm chi phí vật liệu?",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3cm"],
      unit: "cm",
      explanation: "Thể tích $V = \\pi R^2 h = 54\\pi \\implies h = \\frac{54}{R^2}$. Diện tích toàn phần: $S(R) = 2\\pi R^2 + 2\\pi Rh = 2\\pi \\left(R^2 + \\frac{54}{R}\\right) = 2\\pi \\left(R^2 + \\frac{27}{R} + \\frac{27}{R}\\right) \\ge 2\\pi \\cdot 3\\sqrt[3]{R^2 \\cdot \\frac{27}{R} \\cdot \\frac{27}{R}} = 54\\pi$. Dấu bằng xảy ra khi $R^2 = \\frac{27}{R} \\iff R^3 = 27 \\iff R = 3\\text{ cm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một xưởng may sản xuất áo sơ mi. Chi phí sản xuất $x$ chiếc áo sơ mi ($x > 0$) được cho bởi hàm số $C(x) = x^2 + 50x + 1800$ (nghìn đồng). Giá bán mỗi chiếc áo sơ mi phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 350 - x$ (nghìn đồng). Hỏi xưởng may cần sản xuất và bán ra bao nhiêu chiếc áo sơ mi để lợi nhuận thu được là lớn nhất?",
      correctAnswer: "75",
      acceptableAnswers: ["75", "75 chiếc"],
      unit: "chiếc",
      explanation: "Doanh thu $R(x) = x \\cdot p(x) = 350x - x^2$. Lợi nhuận $P(x) = R(x) - C(x) = (350x - x^2) - (x^2 + 50x + 1800) = -2x^2 + 300x - 1800$. Hàm bậc hai có $a = -2 < 0$, đạt giá trị lớn nhất tại $x = -\\frac{300}{2(-2)} = 75$ chiếc."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Bài toán chuyển động cực trị",
      content: "Một quả bóng được đá thẳng đứng lên từ mặt đất với phương trình chuyển động $h(t) = -5t^2 + 30t$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và độ cao $h(t)$ tính bằng mét so với mặt đất. Độ cao lớn nhất mà quả bóng đạt được là bao nhiêu mét?",
      correctAnswer: "45",
      acceptableAnswers: ["45", "45m"],
      unit: "m",
      explanation: "Phương trình độ cao $h(t) = -5(t - 3)^2 + 45 \\le 45\\text{ m}$. Đẳng thức xảy ra khi $t = 3\\text{ s}$. Vậy độ cao lớn nhất đạt được là $45\\text{ m}$."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số bậc ba",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = 2x^3 - 9x^2 + 12x - 3$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=1, x=2",
      acceptableAnswers: ["x=1, x=2"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "1) Tập xác định: $D = \\mathbb{R}$.\n2) Đạo hàm: $y' = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)$.\n$y' = 0 \\iff x = 1$ hoặc $x = 2$.\n3) Bảng xét dấu đạo hàm:\n- $y' > 0$ trên $(-\\infty; 1)$ và $(2; +\\infty) \\implies$ hàm số đồng biến trên $(-\\infty; 1)$ và $(2; +\\infty)$.\n- $y' < 0$ trên $(1; 2) \\implies$ hàm số nghịch biến trên $(1; 2)$.\n4) Cực trị:\n- Điểm cực đại của hàm số là $x = 1$, giá trị cực đại $y(1) = 2$.\n- Điểm cực tiểu của hàm số là $x = 2$, giá trị cực tiểu $y(2) = 1$."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Bài toán máng thoát nước mưa",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nNgười ta muốn làm một chiếc máng thoát nước mưa từ một tấm tôn dài có bề rộng $60\\text{ cm}$. Người ta uốn tấm tôn thành một chiếc máng có mặt cắt ngang là hình chữ nhật hở ở phía trên bằng cách gấp hai mép bên vuông góc với đáy sao cho mỗi mép có cùng chiều cao là $x\\text{ (cm)}$. Tìm chiều cao $x$ để diện tích mặt cắt ngang của chiếc máng đạt giá trị lớn nhất (giúp máng dẫn được lưu lượng nước tối đa).",
      correctAnswer: "15cm",
      acceptableAnswers: ["15cm", "15", "x=15"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "Khi gấp hai mép cao $x\\text{ cm}$ ($0 < x < 30$), chiều rộng của đáy máng là $60 - 2x\\text{ (cm)}$.\nDiện tích mặt cắt ngang hình chữ nhật của máng nước là:\n$$S(x) = x(60 - 2x) = -2x^2 + 60x = -2(x^2 - 30x) = -2(x - 15)^2 + 450 \\le 450\\text{ (cm}^2\\text{)}$$\nDấu đẳng thức xảy ra khi $x = 15\\text{ cm}$ (thỏa mãn $0 < x < 30$).\nVậy chiều cao mỗi mép máng cần gấp là $x = 15\\text{ cm}$ để diện tích mặt cắt ngang lớn nhất."
    }
  ]
};
