import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE1_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de1-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 1 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 1) do GV Lê Thị Hồng Yến biên soạn. Khảo sát hàm số, tính đơn điệu, cực trị, tiệm cận và bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 1"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đơn điệu của hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 2 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 3 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -2 & & \\end{array}$$\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -1)$" },
        { key: "B", text: "$(-1; 2)$" },
        { key: "C", text: "$(2; +\\infty)$" },
        { key: "D", text: "$(-2; 3)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên, trên khoảng $(-1; 2)$ thì $f'(x) < 0$ và mũi tên đi xuống, do đó hàm số nghịch biến trên khoảng $(-1; 2)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực đại của hàm số",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -2 & & 1 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\end{array}$$\n\nĐiểm cực đại của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$y = -2$" },
        { key: "D", text: "$y = 1$" }
      ],
      correctAnswer: "A",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ dương sang âm khi đi qua $x = -2$, do đó $x = -2$ là điểm cực đại của hàm số."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồ thị hàm số bậc ba",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ có đồ thị như hình vẽ bên. Giá trị cực tiểu của hàm số bằng",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs><marker id="arrD1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" /></marker></defs>
  <line x1="20" y1="130" x2="220" y2="130" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD1)" />
  <line x1="120" y1="210" x2="120" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrD1)" />
  <text x="215" y="146" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="26" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="108" y="146" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <line x1="80" y1="130" x2="80" y2="70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="80" y1="70" x2="120" y2="70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="160" y1="130" x2="160" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="120" y1="180" x2="160" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <text x="70" y="146" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="156" y="122" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="126" y="74" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="100" y="186" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <path d="M 40,210 C 65,110 70,70 80,70 C 95,70 105,95 120,130 C 135,165 145,180 160,180 C 170,180 175,145 200,45" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="80" cy="70" r="3" fill="#2563eb" />
  <circle cx="160" cy="180" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$-2$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$2$" },
        { key: "D", text: "$-1$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị đạt điểm cực tiểu tại $(1; -2)$. Do đó giá trị cực tiểu của hàm số là $y_{CT} = -2$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến hàm bậc ba",
      content: "Hàm số $y = x^3 - 3x + 4$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-1; 1)$" },
        { key: "B", text: "$(1; +\\infty)$" },
        { key: "C", text: "$(-\\infty; 1)$" },
        { key: "D", text: "$(-1; +\\infty)$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 3x^2 - 3 = 3(x - 1)(x + 1) > 0 \\iff x \\in (-\\infty; -1) \\cup (1; +\\infty)$. Do đó hàm số đồng biến trên $(1; +\\infty)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực tiểu của hàm bậc ba",
      content: "Điểm cực tiểu của hàm số $y = x^3 - 3x^2 + 2$ là",
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = -2$" },
        { key: "D", text: "$y = 2$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$. $y'' = 6x - 6 \\implies y''(2) = 6 > 0$, do đó điểm cực tiểu là $x = 2$."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 3]$ có BBT: tại $x = -2$ thì $y = 1$, tăng lên $y = 4$ tại $x = 0$, giảm xuống $y = -3$ tại $x = 2$, tăng lên $y = 2$ tại $x = 3$. Giá trị lớn nhất của hàm số trên $[-2; 3]$ bằng",
      options: [
        { key: "A", text: "$4$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$-3$" }
      ],
      correctAnswer: "A",
      explanation: "So sánh các giá trị $f(-2)=1, f(0)=4, f(2)=-3, f(3)=2$, ta thấy giá trị lớn nhất là $4$ tại $x = 0$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN hàm bậc bốn trên đoạn",
      content: "Giá trị nhỏ nhất của hàm số $y = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$3$" },
        { key: "C", text: "$11$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 4x(x^2 - 1) = 0 \\iff x = 0$ hoặc $x = 1 \\in [0; 2]$. Ta có $y(0) = 3, y(1) = 2, y(2) = 11$. Vậy $\\min_{[0; 2]} y = 2$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng",
      content: "Đường tiệm cận đứng của đồ thị hàm số $y = \\frac{2x - 3}{x + 1}$ là đường thẳng",
      options: [
        { key: "A", text: "$x = -1$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$y = 2$" },
        { key: "D", text: "$y = -1$" }
      ],
      correctAnswer: "A",
      explanation: "Nghiệm của mẫu số là $x = -1$ (không là nghiệm của tử), nên $x = -1$ là đường tiệm cận đứng."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 3x + 5}{x - 2}$ là",
      options: [
        { key: "A", text: "$y = x - 1$" },
        { key: "B", text: "$y = x + 1$" },
        { key: "C", text: "$y = x - 2$" },
        { key: "D", text: "$y = 2x - 1$" }
      ],
      correctAnswer: "A",
      explanation: "Chia tử cho mẫu: $\\frac{x^2 - 3x + 5}{x - 2} = x - 1 + \\frac{3}{x - 2}$. Tiệm cận xiên là đường thẳng $y = x - 1$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị",
      content: "Đồ thị hàm số $y = \\frac{x - 2}{x + 1}$ có tiệm cận đứng và tiệm cận ngang lần lượt là",
      options: [
        { key: "A", text: "$x = -1$ và $y = 1$" },
        { key: "B", text: "$x = 1$ và $y = -1$" },
        { key: "C", text: "$x = 2$ và $y = 1$" },
        { key: "D", text: "$x = -1$ và $y = -2$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận đứng là $x = -1$, tiệm cận ngang là $y = \\frac{1}{1} = 1$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{3x + 2}{x - 1}$ là điểm",
      options: [
        { key: "A", text: "$I(1; 3)$" },
        { key: "B", text: "$I(-1; 3)$" },
        { key: "C", text: "$I(1; 2)$" },
        { key: "D", text: "$I(3; 1)$" }
      ],
      correctAnswer: "A",
      explanation: "Giao điểm của tiệm cận đứng $x = 1$ và tiệm cận ngang $y = 3$ là $I(1; 3)$, chính là tâm đối xứng."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm với trục hoành",
      content: "Đồ thị hàm số $y = \\frac{2x - 4}{x + 3}$ cắt trục hoành tại điểm có tọa độ là",
      options: [
        { key: "A", text: "$(2; 0)$" },
        { key: "B", text: "$(-2; 0)$" },
        { key: "C", text: "$(0; -4/3)$" },
        { key: "D", text: "$(4; 0)$" }
      ],
      correctAnswer: "A",
      explanation: "Cho $y = 0 \\iff 2x - 4 = 0 \\iff x = 2$. Giao điểm là $(2; 0)$."
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
      context: "Cho hàm số $y = f(x) = x^3 - 3x^2 - 9x + 2$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số là $f'(x) = 3x^2 - 6x - 9$.", correct: true, explanation: "$f'(x) = 3x^2 - 6x - 9$." },
        { key: "b", text: "Hàm số đồng biến trên khoảng $(-1; 3)$.", correct: false, explanation: "Trên $(-1; 3)$, $f'(x) < 0$ nên hàm số nghịch biến." },
        { key: "c", text: "Hàm số đạt cực đại tại $x = -1$ và đạt cực tiểu tại $x = 3$.", correct: true, explanation: "$f'(x)$ đổi dấu từ dương sang âm tại $x = -1$ và từ âm sang dương tại $x = 3$." },
        { key: "d", text: "Giá trị cực đại của hàm số bằng $7$.", correct: true, explanation: "$f(-1) = -1 - 3 + 9 + 2 = 7$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số dạng $x + a/(x-b)$",
      context: "Cho hàm số $f(x) = x + \\frac{9}{x - 1}$ trên khoảng $(1; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số là $f'(x) = 1 - \\frac{9}{(x - 1)^2}$.", correct: true, explanation: "$f'(x) = 1 - \\frac{9}{(x-1)^2}$." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc $(1; +\\infty)$ là $x = 4$.", correct: true, explanation: "$(x - 1)^2 = 9 \\iff x - 1 = 3 \\iff x = 4$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên $(1; +\\infty)$ bằng $7$.", correct: true, explanation: "$f(4) = 4 + \\frac{9}{3} = 7$." },
        { key: "d", text: "Hàm số đồng biến trên khoảng $(1; 4)$.", correct: false, explanation: "Trên $(1; 4)$, $f'(x) < 0$ nên hàm số nghịch biến." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm nhất biến",
      context: "Cho hàm số $y = \\frac{2x - 1}{x + 2}$.",
      statements: [
        { key: "a", text: "Đồ thị hàm số có tiệm cận đứng là $x = -2$.", correct: true, explanation: "Mẫu bằng 0 tại $x = -2$." },
        { key: "b", text: "Đồ thị hàm số có tiệm cận ngang là $y = 2$.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 2$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định.", correct: true, explanation: "$y' = \\frac{2(2) - (-1)(1)}{(x+2)^2} = \\frac{5}{(x+2)^2} > 0$." },
        { key: "d", text: "Tâm đối xứng của đồ thị là $I(2; -2)$.", correct: false, explanation: "Tâm đối xứng là giao điểm hai tiệm cận $I(-2; 2)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm phân thức bậc 2 trên bậc 1",
      context: "Cho hàm số $y = \\frac{x^2 - 3x + 3}{x - 1}$.",
      statements: [
        { key: "a", text: "Đồ thị hàm số có tiệm cận đứng là $x = 1$.", correct: true, explanation: "Mẫu bằng 0 tại $x = 1$, tử bằng 1 khác 0." },
        { key: "b", text: "Đồ thị hàm số có tiệm cận xiên là $y = x - 2$.", correct: true, explanation: "$\\frac{x^2 - 3x + 3}{x - 1} = x - 2 + \\frac{1}{x - 1}$." },
        { key: "c", text: "Tọa độ tâm đối xứng của đồ thị là $I(1; -1)$.", correct: true, explanation: "Giao điểm tiệm cận: $x = 1 \\implies y = 1 - 2 = -1$." },
        { key: "d", text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.", correct: false, explanation: "$x^2 - 3x + 3 = 0$ có $\\Delta = 9 - 12 = -3 < 0$, vô nghiệm." }
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
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 2}{x + m}$ đồng biến trên khoảng $(2; +\\infty)$?",
      correctAnswer: "8",
      acceptableAnswers: ["8"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 2}{(x + m)^2} > 0 \\iff m > 2$. Điểm gián đoạn $-m \\le 2 \\iff m \\ge -2$. Suy ra $m > 2$. Với $m \\in [-10; 10], m \\in \\mathbb{Z} \\implies m \\in \\{3, 4, 5, 6, 7, 8, 9, 10\\}$ (8 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa bồn nước",
      content: "Người ta muốn chế tạo một bồn nước hình trụ có nắp thể tích $V = 128\\pi\\text{ dm}^3$. Tìm bán kính đáy $R\\text{ (dm)}$ để diện tích toàn phần là nhỏ nhất.",
      correctAnswer: "4",
      acceptableAnswers: ["4", "4dm"],
      unit: "dm",
      explanation: "$V = \\pi R^2 h = 128\\pi \\implies h = \\frac{128}{R^2}$. $S_{tp} = 2\\pi(R^2 + \\frac{128}{R})$. Đạo hàm $2R - \\frac{128}{R^2} = 0 \\iff R^3 = 64 \\iff R = 4\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một xưởng sản xuất có hàm chi phí $C(x) = x^2 + 20x + 800$ và giá bán $p(x) = 220 - x$ (nghìn đồng). Để lợi nhuận lớn nhất thì xưởng cần sản xuất bao nhiêu sản phẩm?",
      correctAnswer: "50",
      acceptableAnswers: ["50", "50 sản phẩm"],
      unit: "sản phẩm",
      explanation: "$P(x) = x(220 - x) - (x^2 + 20x + 800) = -2x^2 + 200x - 800$. Đỉnh parabol tại $x = -\\frac{200}{2(-2)} = 50$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Mô hình nồng độ thuốc",
      content: "Nồng độ thuốc trong máu sau $t$ giờ là $C(t) = \\frac{8t}{t^2 + 16}$ (mg/L). Sau bao nhiêu giờ kể từ khi tiêm thì nồng độ thuốc đạt cực đại?",
      correctAnswer: "4",
      acceptableAnswers: ["4", "4 giờ"],
      unit: "giờ",
      explanation: "$C'(t) = \\frac{8(16 - t^2)}{(t^2 + 16)^2} = 0 \\iff t = 4$ giờ (với $t \\ge 0$)."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = -x^3 + 3x^2 + 9x - 1$. Tìm các khoảng đơn điệu và xác định cực trị của hàm số.",
      correctAnswer: "x=-1, x=3",
      acceptableAnswers: ["x=-1, x=3", "-1 và 3"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "$y' = -3x^2 + 6x + 9 = -3(x + 1)(x - 3) = 0 \\iff x = -1$ hoặc $x = 3$.\nHàm số đồng biến trên $(-1; 3)$, nghịch biến trên $(-\\infty; -1)$ và $(3; +\\infty)$.\nCực tiểu tại $x = -1$ ($y_{CT} = -6$), cực đại tại $x = 3$ ($y_{CĐ} = 26$)."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Tối ưu hộp chữ nhật",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nTừ một tấm tôn hình chữ nhật kích thước $60\\text{ cm} \\times 40\\text{ cm}$, người ta cắt bốn góc bốn hình vuông cạnh $x\\text{ cm}$ rồi gập thành chiếc hộp không nắp. Tìm $x$ để thể tích hộp là lớn nhất.",
      svgContent: `<svg width="280" height="190" viewBox="0 0 280 190" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <rect x="40" y="30" width="200" height="130" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
  <rect x="40" y="30" width="30" height="30" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5" />
  <rect x="210" y="30" width="30" height="30" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5" />
  <rect x="40" y="130" width="30" height="30" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5" />
  <rect x="210" y="130" width="30" height="30" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5" />
  <line x1="70" y1="30" x2="70" y2="160" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="210" y1="30" x2="210" y2="160" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="40" y1="60" x2="240" y2="60" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="40" y1="130" x2="240" y2="130" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
  <text x="55" y="50" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#ffffff" text-anchor="middle">x</text>
  <text x="225" y="50" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#ffffff" text-anchor="middle">x</text>
  <text x="55" y="150" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#ffffff" text-anchor="middle">x</text>
  <text x="225" y="150" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#ffffff" text-anchor="middle">x</text>
  <text x="140" y="180" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">60 cm</text>
  <text x="20" y="100" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">40 cm</text>
</svg>`,
      correctAnswer: "7,85",
      acceptableAnswers: ["7,85", "7.85"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "$V(x) = x(60 - 2x)(40 - 2x) = 4(x^3 - 50x^2 + 600x)$ với $0 < x < 20$.\n$V'(x) = 4(3x^2 - 100x + 600) = 0 \\implies x = \\frac{50 - 10\\sqrt{7}}{3} \\approx 7{,}85\\text{ cm}$."
    }
  ]
};

