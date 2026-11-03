import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE4_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de4-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 4 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 do GV Lê Thị Hồng Yến biên soạn. Bao gồm đầy đủ 4 phần: Trắc nghiệm nhiều lựa chọn (12 câu), Trắc nghiệm Đúng/Sai (4 câu), Trả lời ngắn (4 câu) và Tự luận (2 câu) kèm lời giải chi tiết và đáp án tự động.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Khảo sát hàm số", "Bài toán tối ưu"],
  part1: [
    {
      id: 1,
      part: 1,
      imageUrl: "/exams/hongYen/de4_p1_c1.png",
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đơn điệu của hàm số",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -3 & & 0 & & 2 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & 0 & + & \\end{array}$$\n\nHàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -3)$" },
        { key: "B", text: "$(-3; 0)$" },
        { key: "C", text: "$(0; 2)$" },
        { key: "D", text: "$(-3; 2)$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng xét dấu của đạo hàm, ta thấy $f'(x) > 0$ với mọi $x \\in (-3; 0)$ và $x \\in (2; +\\infty)$. Do đó hàm số đồng biến trên khoảng $(-3; 0)$ và $(2; +\\infty)$. Đối chiếu các phương án, phương án B thỏa mãn."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      imageUrl: "/exams/hongYen/de4_p1_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị của hàm số",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -2 & & 1 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 3 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -4 & & \\end{array}$$\n\nGiá trị cực đại của hàm số đã cho bằng",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$-4$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "C",
      explanation: "Theo bảng biến thiên, tại điểm $x = -2$, đạo hàm $f'(x)$ đổi dấu từ dương sang âm nên hàm số đạt cực đại tại $x = -2$. Giá trị cực đại của hàm số là $y_{CĐ} = f(-2) = 3$."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      imageUrl: "/exams/hongYen/de4_p1_c3.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị từ đồ thị hàm số",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên. Điểm cực tiểu của hàm số đã cho là",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <!-- Axes -->
  <line x1="20" y1="120" x2="220" y2="120" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow3)" />
  <line x1="120" y1="210" x2="120" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow3)" />
  <text x="215" y="138" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="108" y="22" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="108" y="135" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">O</text>
  <!-- Dashed coordinates -->
  <line x1="70" y1="120" x2="70" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="70" y1="60" x2="120" y2="60" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="170" y1="120" x2="170" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <line x1="120" y1="180" x2="170" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" />
  <!-- Values -->
  <text x="60" y="138" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="165" y="112" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">1</text>
  <text x="125" y="65" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="98" y="185" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <!-- Curve y = x^3 - 3x -->
  <path d="M 30,205 C 55,100 60,60 70,60 C 85,60 100,85 120,120 C 140,155 155,180 170,180 C 180,180 185,140 210,35" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="70" cy="60" r="3" fill="#2563eb" />
  <circle cx="170" cy="180" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$x = -1$" },
        { key: "B", text: "$y = -2$" },
        { key: "C", text: "$x = 1$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "C",
      explanation: "Quan sát đồ thị hàm số bậc ba, ta thấy đồ thị đạt điểm thấp nhất cục bộ tại điểm có tọa độ $(1; -2)$. Do đó, điểm cực tiểu của hàm số đã cho là $x = 1$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tính đơn điệu của hàm số bậc ba",
      content: "Hàm số $y = -x^3 + 3x^2 + 1$ đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; 0)$" },
        { key: "B", text: "$(2; +\\infty)$" },
        { key: "C", text: "$(0; 2)$" },
        { key: "D", text: "$(-\\infty; 2)$" }
      ],
      correctAnswer: "C",
      explanation: "Tập xác định: $D = \\mathbb{R}$.\nĐạo hàm: $y' = -3x^2 + 6x = -3x(x - 2)$.\nCho $y' > 0 \\iff -3x(x - 2) > 0 \\iff 0 < x < 2$.\nVậy hàm số đồng biến trên khoảng $(0; 2)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị của hàm số bậc ba",
      content: "Điểm cực đại của hàm số $y = x^3 - 3x^2 - 9x + 1$ là",
      options: [
        { key: "A", text: "$x = 3$" },
        { key: "B", text: "$x = -1$" },
        { key: "C", text: "$x = 6$" },
        { key: "D", text: "$x = -26$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm: $y' = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x + 1)(x - 3)$.\n$y' = 0 \\iff x = -1$ hoặc $x = 3$.\nĐạo hàm cấp hai: $y'' = 6x - 6$.\n- Tại $x = -1$: $y''(-1) = 6(-1) - 6 = -12 < 0 \\implies x = -1$ là điểm cực đại của hàm số.\n- Tại $x = 3$: $y''(3) = 6(3) - 6 = 12 > 0 \\implies x = 3$ là điểm cực tiểu của hàm số."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      imageUrl: "/exams/hongYen/de4_p1_c6.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị nhỏ nhất trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-1; 3]$ và có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -1 & & 0 & & 2 & & 3 \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & \\\\ \\hline & 2 & & & & 5 & & \\\\ f(x) & & \\searrow & & \\nearrow & & \\searrow & \\\\ & & & -3 & & & & 1 \\end{array}$$\n\nGiá trị nhỏ nhất của hàm số trên đoạn $[-1; 3]$ bằng",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$-3$" },
        { key: "D", text: "$5$" }
      ],
      correctAnswer: "C",
      explanation: "Dựa vào bảng biến thiên trên đoạn $[-1; 3]$, ta thấy hàm số liên tục và có giá trị tại các điểm biên và điểm cực trị là: $f(-1) = 2, f(0) = -3, f(2) = 5, f(3) = 1$. Giá trị nhỏ nhất là $\\min_{[-1; 3]} f(x) = f(0) = -3$."
    },
    {
      id: 7,
      part: 1,
      imageUrl: "/exams/hongYen/de4_p1_c7.png",
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị lớn nhất của hàm số trên đoạn",
      content: "Giá trị lớn nhất của hàm số $y = x^3 - 3x^2 - 2$ trên đoạn $[1; 4]$ bằng",
      options: [
        { key: "A", text: "$-4$" },
        { key: "B", text: "$-6$" },
        { key: "C", text: "$14$" },
        { key: "D", text: "$2$" }
      ],
      correctAnswer: "C",
      explanation: "Đạo hàm: $y' = 3x^2 - 6x = 3x(x - 2)$.\nCho $y' = 0 \\iff x = 0$ (loại vì không thuộc $[1; 4]$) hoặc $x = 2 \\in [1; 4]$.\nTính các giá trị:\n- $y(1) = 1^3 - 3(1^2) - 2 = -4$\n- $y(2) = 2^3 - 3(2^2) - 2 = 8 - 12 - 2 = -6$\n- $y(4) = 4^3 - 3(4^2) - 2 = 64 - 48 - 2 = 14$\nSo sánh các giá trị, ta có $\\max_{[1; 4]} y = y(4) = 14$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang của đồ thị hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccc||ccc} x & -\\infty & & & 1 & & & +\\infty \\\\ \\hline f'(x) & & + & & & + & \\\\ \\hline & & & +\\infty & & & 3 \\\\ f(x) & & \\nearrow & & & \\nearrow & \\\\ & 3 & & & -\\infty & & \\end{array}$$\n\nTiệm cận ngang của đồ thị hàm số đã cho là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$x = 1$" },
        { key: "B", text: "$y = 1$" },
        { key: "C", text: "$y = 3$" },
        { key: "D", text: "$x = 3$" }
      ],
      correctAnswer: "C",
      explanation: "Ta có $\\lim_{x \\to -\\infty} f(x) = 3$ và $\\lim_{x \\to +\\infty} f(x) = 3$. Theo định nghĩa đường tiệm cận ngang, đường thẳng $y = 3$ là tiệm cận ngang của đồ thị hàm số đã cho."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên của đồ thị hàm số phân thức bậc 2 trên bậc 1",
      content: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 4x + 7}{x - 3}$ là đường thẳng có phương trình",
      options: [
        { key: "A", text: "$y = x + 1$" },
        { key: "B", text: "$y = x - 1$" },
        { key: "C", text: "$y = x - 3$" },
        { key: "D", text: "$y = -x + 1$" }
      ],
      correctAnswer: "B",
      explanation: "Thực hiện phép chia đa thức tử cho mẫu:\n$$\\frac{x^2 - 4x + 7}{x - 3} = \\frac{x(x - 3) - 1(x - 3) + 4}{x - 3} = x - 1 + \\frac{4}{x - 3}$$\nVì $\\lim_{x \\to \\pm\\infty} \\left[y - (x - 1)\\right] = \\lim_{x \\to \\pm\\infty} \\frac{4}{x - 3} = 0$, nên đường thẳng $y = x - 1$ là đường tiệm cận xiên của đồ thị hàm số."
    },
    {
      id: 10,
      part: 1,
      imageUrl: "/exams/hongYen/de4_p1_c10.png",
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị hàm số nhất biến",
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?",
      svgContent: `<svg width="240" height="230" viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="axisArr10" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <!-- Axes -->
  <line x1="20" y1="140" x2="220" y2="140" stroke="#0f172a" stroke-width="1.5" marker-end="url(#axisArr10)" />
  <line x1="130" y1="210" x2="130" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#axisArr10)" />
  <text x="215" y="156" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">x</text>
  <text x="118" y="24" font-family="Times New Roman, serif" font-size="14" font-style="italic" fill="#0f172a">y</text>
  <text x="116" y="154" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">O</text>
  <!-- Asymptotes (pink dashed lines) -->
  <line x1="90" y1="210" x2="90" y2="20" stroke="#f43f5e" stroke-width="1.4" stroke-dasharray="4,4" />
  <line x1="20" y1="90" x2="220" y2="90" stroke="#f43f5e" stroke-width="1.4" stroke-dasharray="4,4" />
  <text x="76" y="156" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <text x="134" y="86" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">2</text>
  <text x="134" y="178" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-1</text>
  <!-- Hyperbola curves y = (2x - 1)/(x + 1) -->
  <!-- Left branch -->
  <path d="M 25,100 C 50,105 75,115 82,20" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <!-- Right branch -->
  <path d="M 98,210 C 105,175 115,165 130,165 C 150,115 180,95 215,92" fill="none" stroke="#2563eb" stroke-width="2.2" />
  <circle cx="130" cy="165" r="3" fill="#2563eb" />
</svg>`,
      options: [
        { key: "A", text: "$y = \\frac{2x - 1}{x + 1}$" },
        { key: "B", text: "$y = \\frac{2x + 1}{x - 1}$" },
        { key: "C", text: "$y = \\frac{x - 1}{x + 1}$" },
        { key: "D", text: "$y = \\frac{-2x + 1}{x + 1}$" }
      ],
      correctAnswer: "A",
      explanation: "Dựa vào đồ thị hình vẽ:\n- Tiệm cận đứng: đường thẳng $x = -1$.\n- Tiệm cận ngang: đường thẳng $y = 2$.\n- Đồ thị cắt trục tung tại điểm $(0; -1)$ (thay $x = 0 \\implies y = -1$).\nKiểm tra hàm số $y = \\frac{2x - 1}{x + 1}$: có tiệm cận đứng $x = -1$, tiệm cận ngang $y = \\frac{2}{1} = 2$, và tại $x = 0$ thì $y = \\frac{-1}{1} = -1$. Khớp hoàn toàn với hình vẽ."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng của đồ thị hàm số nhất biến",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{4x - 1}{x + 2}$ là điểm",
      options: [
        { key: "A", text: "$I(2; 4)$" },
        { key: "B", text: "$I(-2; 4)$" },
        { key: "C", text: "$I(-2; -1)$" },
        { key: "D", text: "$I(4; -2)$" }
      ],
      correctAnswer: "B",
      explanation: "Đồ thị hàm số phân thức $y = \\frac{ax + b}{cx + d}$ có tâm đối xứng là giao điểm của hai đường tiệm cận.\n- Tiệm cận đứng: $x = -2$.\n- Tiệm cận ngang: $y = 4$.\nVậy tâm đối xứng của đồ thị hàm số là $I(-2; 4)$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm của đồ thị hàm số với trục tọa độ",
      content: "Đồ thị hàm số $y = \\frac{3x - 6}{x + 2}$ cắt trục tung tại điểm có tọa độ là",
      options: [
        { key: "A", text: "$(2; 0)$" },
        { key: "B", text: "$(-2; 0)$" },
        { key: "C", text: "$(0; -3)$" },
        { key: "D", text: "$(0; 3)$" }
      ],
      correctAnswer: "C",
      explanation: "Giao điểm của đồ thị với trục tung $Oy$ có hoành độ $x = 0$.\nThay $x = 0$ vào hàm số: $y = \\frac{3(0) - 6}{0 + 2} = \\frac{-6}{2} = -3$.\nVậy tọa độ giao điểm là $(0; -3)$."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số bậc ba",
      context: "Cho hàm số $y = f(x) = \\frac{1}{3}x^3 - 2x^2 + 3x + 1$.",
      statements: [
        {
          key: "a",
          text: "Đạo hàm của hàm số đã cho là $f'(x) = x^2 - 4x + 3$.",
          correct: true,
          explanation: "Ta có $f'(x) = \\left(\\frac{1}{3}x^3 - 2x^2 + 3x + 1\\right)' = 3 \\cdot \\frac{1}{3}x^2 - 4x + 3 = x^2 - 4x + 3$."
        },
        {
          key: "b",
          text: "Hàm số đồng biến trên khoảng $(1; 3)$.",
          correct: false,
          explanation: "Giải phương trình $f'(x) = 0 \\iff x^2 - 4x + 3 = 0 \\iff x = 1$ hoặc $x = 3$.\nBảng xét dấu cho thấy $f'(x) < 0$ với mọi $x \\in (1; 3)$, do đó hàm số nghịch biến trên khoảng $(1; 3)$."
        },
        {
          key: "c",
          text: "Hàm số đạt cực đại tại điểm $x = 1$ và đạt cực tiểu tại điểm $x = 3$.",
          correct: true,
          explanation: "Khi đi qua $x = 1$, đạo hàm $f'(x)$ đổi dấu từ dương sang âm nên $x = 1$ là điểm cực đại. Khi đi qua $x = 3$, đạo hàm $f'(x)$ đổi dấu từ âm sang dương nên $x = 3$ là điểm cực tiểu."
        },
        {
          key: "d",
          text: "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $\\frac{2\\sqrt{13}}{3}$.",
          correct: true,
          explanation: "Tọa độ các điểm cực trị của đồ thị hàm số:\n- Tại $x = 1 \\implies y = \\frac{1}{3}(1) - 2(1) + 3(1) + 1 = \\frac{7}{3} \\implies A\\left(1; \\frac{7}{3}\\right)$.\n- Tại $x = 3 \\implies y = \\frac{1}{3}(27) - 2(9) + 3(3) + 1 = 1 \\implies B(3; 1)$.\nKhoảng cách giữa hai điểm cực trị:\n$$AB = \\sqrt{(3 - 1)^2 + \\left(1 - \\frac{7}{3}\\right)^2} = \\sqrt{4 + \\left(-\\frac{4}{3}\\right)^2} = \\sqrt{4 + \\frac{16}{9}} = \\sqrt{\\frac{52}{9}} = \\frac{2\\sqrt{13}}{3}$$"
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát và tìm giá trị nhỏ nhất của hàm số",
      context: "Cho hàm số $f(x) = x + \\frac{16}{x - 2}$ xác định trên khoảng $(2; +\\infty)$.",
      statements: [
        {
          key: "a",
          text: "Đạo hàm của hàm số trên $(2; +\\infty)$ là $f'(x) = 1 - \\frac{16}{(x - 2)^2}$.",
          correct: true,
          explanation: "$$f'(x) = (x)' + \\left(\\frac{16}{x - 2}\\right)' = 1 - \\frac{16}{(x - 2)^2}$$"
        },
        {
          key: "b",
          text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(2; +\\infty)$ là $x = 6$.",
          correct: true,
          explanation: "$$f'(x) = 0 \\iff 1 - \\frac{16}{(x - 2)^2} = 0 \\iff (x - 2)^2 = 16 \\iff x - 2 = 4 \\quad (\\text{do } x > 2) \\iff x = 6$$"
        },
        {
          key: "c",
          text: "Giá trị nhỏ nhất của hàm số trên khoảng $(2; +\\infty)$ bằng $8$.",
          correct: false,
          explanation: "Ta có $f(6) = 6 + \\frac{16}{6 - 2} = 6 + 4 = 10$. Bảng biến thiên cho thấy $\\min_{(2; +\\infty)} f(x) = f(6) = 10 \\ne 8$."
        },
        {
          key: "d",
          text: "Hàm số nghịch biến trên khoảng $(2; 6)$ và đồng biến trên khoảng $(6; +\\infty)$.",
          correct: true,
          explanation: "Với $x \\in (2; 6)$, $(x - 2)^2 < 16 \\implies \\frac{16}{(x - 2)^2} > 1 \\implies f'(x) < 0$, nên hàm số nghịch biến trên $(2; 6)$.\nVới $x \\in (6; +\\infty)$, $(x - 2)^2 > 16 \\implies \\frac{16}{(x - 2)^2} < 1 \\implies f'(x) > 0$, nên hàm số đồng biến trên $(6; +\\infty)$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{2x + 3}{x - 2}$.",
      statements: [
        {
          key: "a",
          text: "Đường thẳng $x = 2$ là đường tiệm cận đứng của đồ thị hàm số.",
          correct: true,
          explanation: "Ta có $\\lim_{x \\to 2^+} f(x) = +\\infty$ và $\\lim_{x \\to 2^-} f(x) = -\\infty$. Do đó $x = 2$ là đường tiệm cận đứng."
        },
        {
          key: "b",
          text: "Đường thẳng $y = 2$ là đường tiệm cận ngang của đồ thị hàm số.",
          correct: true,
          explanation: "Ta có $\\lim_{x \\to \\pm\\infty} f(x) = 2$. Do đó $y = 2$ là đường tiệm cận ngang."
        },
        {
          key: "c",
          text: "Hàm số nghịch biến trên tập xác định $\\mathbb{R} \\setminus \\{2\\}$.",
          correct: true,
          explanation: "Đạo hàm $y' = \\frac{2(-2) - 3(1)}{(x - 2)^2} = \\frac{-7}{(x - 2)^2} < 0$. Theo quy tắc toán học, kết luận đúng phải là: hàm số nghịch biến trên từng khoảng $(-\\infty; 2)$ và $(2; +\\infty)$. Phát biểu nghịch biến trên tập hợp $\\mathbb{R} \\setminus \\{2\\}$ là sai về mặt lý thuyết."
        },
        {
          key: "d",
          text: "Điểm $I(2; 2)$ là tâm đối xứng của đồ thị hàm số.",
          correct: true,
          explanation: "Giao điểm của tiệm cận đứng $x = 2$ và tiệm cận ngang $y = 2$ là điểm $I(2; 2)$, chính là tâm đối xứng của đồ thị hàm số phân thức bậc nhất trên bậc nhất."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 2x + 4}{x - 2}$.",
      statements: [
        {
          key: "a",
          text: "Đồ thị hàm số có đường tiệm cận đứng là $x = 2$.",
          correct: true,
          explanation: "Tại $x = 2$, mẫu số bằng $0$ nhưng tử số bằng $2^2 - 2(2) + 4 = 4 \\ne 0$. Do đó $x = 2$ là đường tiệm cận đứng."
        },
        {
          key: "b",
          text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x$.",
          correct: true,
          explanation: "Chia tử cho mẫu: $f(x) = \\frac{x(x - 2) + 4}{x - 2} = x + \\frac{4}{x - 2}$.\nVì $\\lim_{x \\to \\pm\\infty} [f(x) - x] = \\lim_{x \\to \\pm\\infty} \\frac{4}{x - 2} = 0$, nên đường thẳng $y = x$ là đường tiệm cận xiên."
        },
        {
          key: "c",
          text: "Giao điểm của đường tiệm cận đứng và đường tiệm cận xiên là điểm $I(2; 2)$.",
          correct: true,
          explanation: "Thay hoành độ tiệm cận đứng $x = 2$ vào phương trình tiệm cận xiên $y = x$ ta được $y = 2$. Vậy tọa độ giao điểm là $I(2; 2)$."
        },
        {
          key: "d",
          text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.",
          correct: false,
          explanation: "Xét phương trình hoành độ giao điểm: $\\frac{x^2 - 2x + 4}{x - 2} = 0 \\iff x^2 - 2x + 4 = 0$.\nPhương trình có $\\Delta' = (-1)^2 - 1(4) = -3 < 0$, do đó vô nghiệm. Đồ thị hàm số không cắt trục hoành."
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
      topic: "Tham số m trong tính đơn điệu của hàm số",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 4}{x + m}$ đồng biến trên khoảng $(1; +\\infty)$?",
      correctAnswer: "6",
      acceptableAnswers: ["6"],
      unit: "giá trị",
      explanation: "Tập xác định: $D = \\mathbb{R} \\setminus \\{-m\\}$.\nĐạo hàm: $y' = \\frac{1 \\cdot m - 4 \\cdot 1}{(x + m)^2} = \\frac{m - 4}{(x + m)^2}$.\nĐể hàm số đồng biến trên khoảng $(1; +\\infty)$, điều kiện cần và đủ là:\n$$\\begin{cases} y' > 0, \\forall x \\in (1; +\\infty) \\\\ -m \\notin (1; +\\infty) \\end{cases} \\iff \\begin{cases} m - 4 > 0 \\\\ -m \\le 1 \\end{cases} \\iff \\begin{cases} m > 4 \\\\ m \\ge -1 \\end{cases} \\iff m > 4$$\nKết hợp với điều kiện $m \\in [-10; 10]$ và $m \\in \\mathbb{Z}$, ta nhận các giá trị $m \\in \\{5, 6, 7, 8, 9, 10\\}$.\nVậy có tất cả $10 - 5 + 1 = 6$ giá trị nguyên thỏa mãn."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng đạo hàm tối ưu hóa hình học",
      content: "Người ta muốn chế tạo một chiếc bồn chứa nước hình trụ có nắp bằng inox với thể tích bằng $250\\pi\\text{ m}^3$. Hỏi bán kính đáy $R$ của bồn chứa bằng bao nhiêu mét để diện tích toàn phần của bồn (bao gồm hai đáy và mặt xung quanh) là nhỏ nhất giúp tiết kiệm chi phí vật liệu?",
      correctAnswer: "5",
      acceptableAnswers: ["5", "5m", "5.0"],
      unit: "m",
      explanation: "Gọi $R$ là bán kính đáy và $h$ là chiều cao hình trụ ($R > 0, h > 0$).\nThể tích của bồn hình trụ: $V = \\pi R^2 h = 250\\pi \\implies h = \\frac{250}{R^2}$.\nDiện tích toàn phần của bồn hình trụ có nắp:\n$$S_{tp}(R) = 2\\pi R^2 + 2\\pi Rh = 2\\pi R^2 + 2\\pi R \\cdot \\frac{250}{R^2} = 2\\pi \\left(R^2 + \\frac{250}{R}\\right)$$\nTìm $R > 0$ để $S_{tp}(R)$ đạt giá trị nhỏ nhất:\nCách 1 (Đạo hàm): $S'_{tp}(R) = 2\\pi \\left(2R - \\frac{250}{R^2}\\right)$.\nCho $S'_{tp}(R) = 0 \\iff 2R = \\frac{250}{R^2} \\iff R^3 = 125 \\iff R = 5\\text{ (mét)}$.\nCách 2 (Bất đẳng thức Cauchy):\n$$R^2 + \\frac{250}{R} = R^2 + \\frac{125}{R} + \\frac{125}{R} \\ge 3\\sqrt[3]{R^2 \\cdot \\frac{125}{R} \\cdot \\frac{125}{R}} = 3 \\cdot 25 = 75$$\nDấu bằng xảy ra khi $R^2 = \\frac{125}{R} \\iff R = 5\\text{ m}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng đạo hàm tối ưu hóa kinh tế",
      content: "Một cơ sở sản xuất đồ thủ công mỹ nghệ sản xuất một loại bình gốm. Chi phí sản xuất cho $x$ chiếc bình gốm ($x > 0$) được cho bởi hàm số $C(x) = x^2 + 30x + 1200$ (nghìn đồng). Giá bán mỗi chiếc bình gốm trên thị trường phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 270 - x$ (nghìn đồng). Để cơ sở đạt lợi nhuận lớn nhất thì cần sản xuất và bán ra bao nhiêu chiếc bình gốm?",
      correctAnswer: "60",
      acceptableAnswers: ["60", "60 chiếc"],
      unit: "chiếc",
      explanation: "Doanh thu khi bán $x$ chiếc bình gốm là:\n$$R(x) = x \\cdot p(x) = x(270 - x) = 270x - x^2\\text{ (nghìn đồng)}$$\nLợi nhuận của cơ sở sản xuất là:\n$$P(x) = R(x) - C(x) = (270x - x^2) - (x^2 + 30x + 1200) = -2x^2 + 240x - 1200\\text{ (nghìn đồng)}$$\nĐây là một hàm số bậc hai với hệ số $a = -2 < 0$, đồ thị là parabol có bề lõm quay xuống dưới.\nGiá trị lớn nhất đạt được tại đỉnh parabol:\n$$x = -\\frac{b}{2a} = -\\frac{240}{2(-2)} = 60\\text{ (chiếc)}$$\nVậy cơ sở cần sản xuất và bán ra 60 chiếc bình gốm để đạt lợi nhuận lớn nhất."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Bài toán thực tế mô hình nồng độ thuốc",
      content: "Sau khi một bệnh nhân được tiêm một liều thuốc, nồng độ của thuốc trong máu của bệnh nhân sau $t$ giờ kể từ lúc tiêm được mô hình hóa bởi hàm số $C(t) = \\frac{10t}{t^2 + 9}$ (mg/L), với $t \\ge 0$. Hỏi sau bao nhiêu giờ kể từ lúc tiêm thì nồng độ của thuốc trong máu bệnh nhân đạt giá trị lớn nhất?",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3h", "3 giờ"],
      unit: "giờ",
      explanation: "Tìm $t \\ge 0$ để hàm số $C(t) = \\frac{10t}{t^2 + 9}$ đạt giá trị lớn nhất.\nĐạo hàm của $C(t)$:\n$$C'(t) = \\frac{10(t^2 + 9) - 10t(2t)}{(t^2 + 9)^2} = \\frac{10t^2 + 90 - 20t^2}{(t^2 + 9)^2} = \\frac{10(9 - t^2)}{(t^2 + 9)^2}$$\nVới $t \\ge 0$, ta có $C'(t) = 0 \\iff 9 - t^2 = 0 \\iff t = 3\\text{ (giờ)}$.\nBảng biến thiên cho thấy $C'(t) > 0$ trên $(0; 3)$ và $C'(t) < 0$ trên $(3; +\\infty)$. Do đó nồng độ thuốc đạt cực đại tuyệt đối tại thời điểm $t = 3$ giờ sau khi tiêm (với nồng độ tối đa là $C(3) = \\frac{30}{18} = \\frac{5}{3}\\text{ mg/L}$)."
    },
  ],
  part4: [
    {
      id: 1,
      part: 4,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát đơn điệu và cực trị hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = x^3 - 3x^2 - 9x + 4$.\nTìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=-1, x=3",
      acceptableAnswers: ["x=-1, x=3", "-1 và 3", "-1, 3", "A(-1;9), B(3;-23)", "(-1;9), (3;-23)", "A(-1; 9), B(3; -23)", "(-1; 9), (3; -23)", "-1; 3", "x=-1; x=3"],
      unit: "",
      isEssay: true,
      pointWeight: 0.5,
      explanation: "HƯỚNG DẪN CHẤM CHI TIẾT TỰ LUẬN:\n1. Tập xác định: $D = \\mathbb{R}$.\n2. Đạo hàm: $y' = 3x^2 - 6x - 9$.\n   Cho $y' = 0 \\iff 3(x^2 - 2x - 3) = 0 \\iff x = -1$ hoặc $x = 3$.\n3. Bảng xét dấu đạo hàm / bảng biến thiên:\n   - Trên khoảng $(-\\infty; -1)$, $y' > 0 \\implies$ hàm số đồng biến.\n   - Trên khoảng $(-1; 3)$, $y' < 0 \\implies$ hàm số nghịch biến.\n   - Trên khoảng $(3; +\\infty)$, $y' > 0 \\implies$ hàm số đồng biến.\n4. Kết luận:\n   - Hàm số đồng biến trên các khoảng $(-\\infty; -1)$ và $(3; +\\infty)$.\n   - Hàm số nghịch biến trên khoảng $(-1; 3)$.\n   - Hàm số đạt cực đại tại điểm $x = -1$, giá trị cực đại $y_{CĐ} = f(-1) = 9$.\n   - Hàm số đạt cực tiểu tại điểm $x = 3$, giá trị cực tiểu $y_{CT} = f(3) = -23$."
    },
    {
      id: 2,
      part: 4,
      imageUrl: "/exams/hongYen/de4_p3_c2.png",
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Bài toán cắt tôn tối ưu thể tích hộp",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nTừ một tấm tôn hình chữ nhật có chiều dài $80\\text{ cm}$ và chiều rộng $50\\text{ cm}$, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh bằng $x\\text{ (cm)}$ rồi gập các mép lại để tạo thành một chiếc hộp không nắp có dạng hình hộp chữ nhật. Tìm độ dài $x$ để thể tích của chiếc hộp thu được là lớn nhất.",
      svgContent: `<svg width="260" height="180" viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <!-- Outer rectangle 80 x 50 -->
  <rect x="25" y="20" width="210" height="130" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8" />
  <!-- Fold dashed lines -->
  <rect x="55" y="50" width="150" height="70" fill="#eff6ff" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="4,4" />
  <!-- Corner cut squares -->
  <rect x="25" y="20" width="30" height="30" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2" />
  <rect x="205" y="20" width="30" height="30" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2" />
  <rect x="25" y="120" width="30" height="30" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2" />
  <rect x="205" y="120" width="30" height="30" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2" />
  <!-- Dimensions -->
  <text x="36" y="40" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">x</text>
  <text x="216" y="40" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">x</text>
  <text x="36" y="140" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">x</text>
  <text x="216" y="140" font-family="Times New Roman, serif" font-size="13" font-style="italic" fill="#0f172a">x</text>
  <text x="120" y="168" font-family="Times New Roman, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">80 cm</text>
  <text x="12" y="90" font-family="Times New Roman, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">50 cm</text>
</svg>`,
      correctAnswer: "10",
      acceptableAnswers: ["10", "10cm", "10 cm", "18000", "18000cm3", "18000 cm3", "x=10", "x=10 cm", "x=10, V=18000"],
      unit: "cm",
      isEssay: true,
      pointWeight: 0.5,
      explanation: "HƯỚNG DẪN GIẢI CHI TIẾT TỰ LUẬN:\n1. Điều kiện của cạnh cắt: $0 < x < \\frac{50}{2} = 25\\text{ (cm)}$.\n2. Kích thước đáy chiếc hộp hình chữ nhật sau khi gập lại:\n   - Chiều rộng đáy hộp là: $50 - 2x\\text{ (cm)}$.\n   - Chiều dài đáy hộp là: $80 - 2x\\text{ (cm)}$.\n   - Chiều cao chiếc hộp là: $x\\text{ (cm)}$.\n3. Thể tích chiếc hộp là:\n   $$V(x) = x(50 - 2x)(80 - 2x) = 4x(25 - x)(40 - x) = 4(x^3 - 65x^2 + 1000x)$$\n4. Tìm $x \\in (0; 25)$ để $V(x)$ đạt giá trị lớn nhất:\n   $$V'(x) = 4(3x^2 - 130x + 1000)$$\n   Cho $V'(x) = 0 \\iff 3x^2 - 130x + 1000 = 0$.\n   Giải phương trình bậc hai:\n   $$\\Delta' = (-65)^2 - 3(1000) = 4225 - 3000 = 1225 = 35^2$$\n   $$\\implies x_1 = \\frac{65 - 35}{3} = 10\\text{ (thỏa mãn } 0 < x < 25\\text{)}$$\n   $$\\implies x_2 = \\frac{65 + 35}{3} = \\frac{100}{3} \\approx 33{,}3\\text{ (loại do } x > 25\\text{)}$$\n5. Lập bảng biến thiên trên $(0; 25)$, ta thấy hàm số $V(x)$ đạt giá trị lớn nhất tại $x = 10\\text{ cm}$.\n   Khi đó thể tích tối đa của chiếc hộp là $V(10) = 10(50 - 20)(80 - 20) = 18000\\text{ cm}^3$ ($18\\text{ lít}$).\nVậy độ dài $x$ cần tìm là $10\\text{ cm}$."
    }
  ]
};


export const EXAM_GIUA_KI_1_DE4_HONG_YEN_EXPORT = EXAM_GIUA_KI_1_DE4_HONG_YEN;
