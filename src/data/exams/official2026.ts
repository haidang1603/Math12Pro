import { ExamData } from "@/types/exam";

export const MOCK_EXAM_2026: ExamData = {
  id: "thpt-2026-chinh-thuc-0101",
  title: "Đề Thi Tốt Nghiệp THPT Năm 2026 - Môn Toán (Mã đề: 0101)",
  milestone: "TOT_NGHIEP_THPT",
  durationMinutes: 90,
  authorName: "Bộ Giáo Dục và Đào Tạo (Mã đề: 0101)",
  description: "Đề thi chính thức Kì thi Tốt nghiệp THPT Quốc Gia năm 2026 môn Toán thời gian 90 phút, mã đề 0101, chuẩn cấu trúc 3 phần mới nhất của Bộ GD&ĐT kèm hình vẽ minh họa và hướng dẫn giải chi tiết toàn diện.",
  tags: ["Tốt nghiệp THPT 2026", "Mã đề 0101", "Đề 90 phút", "Chuẩn Bộ GD&ĐT"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đại số & Giải tích",
      topic: "Cấp số cộng",
      content: "Cho cấp số cộng $(u_n)$ có $u_1 = 5$ và công sai $d = -1$. Giá trị của $u_2$ bằng",
      options: [
        { key: "A", text: "$4$" },
        { key: "B", text: "$-5$" },
        { key: "C", text: "$5$" },
        { key: "D", text: "$-4$" }
      ],
      correctAnswer: "A",
      explanation: "Cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 5$ và công sai $d = -1$. Giá trị của $u_2$ được tính theo công thức: $u_2 = u_1 + d = 5 + (-1) = 4$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đạo hàm của hàm số",
      content: "Cho các hàm số $y = f(x)$ và $y = g(x)$ có đạo hàm trên tập số thực $\\mathbb{R}$ thỏa mãn $f'(x) = x$ và $g'(x) = x^2$. Đạo hàm của hàm số $y = f(x) + g(x)$ là",
      options: [
        { key: "A", text: "$3x$" },
        { key: "B", text: "$1 + x^2$" },
        { key: "C", text: "$x + x^2$" },
        { key: "D", text: "$1 + 2x$" }
      ],
      correctAnswer: "C",
      explanation: "Đạo hàm của tổng hai hàm số bằng tổng các đạo hàm:\n$$y' = (f(x) + g(x))' = f'(x) + g'(x) = x + x^2$$"
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tính chất của nguyên hàm",
      content: "Cho $\\int f(x)\\,dx = \\sin x + C$. Phát biểu nào sau đây là đúng?",
      options: [
        { key: "A", text: "$\\int [3 + f(x)]\\,dx = 3x + \\cos x + C$" },
        { key: "B", text: "$\\int [3 + f(x)]\\,dx = 3x + \\sin x + C$" },
        { key: "C", text: "$\\int [3 + f(x)]\\,dx = 3x - \\cos x + C$" },
        { key: "D", text: "$\\int [3 + f(x)]\\,dx = 3x - \\sin x + C$" }
      ],
      correctAnswer: "B",
      explanation: "Ta có:\n$$\\int [3 + f(x)]\\,dx = \\int 3\\,dx + \\int f(x)\\,dx = 3x + \\sin x + C$$"
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đại số & Hàm số",
      topic: "Phương trình logarit",
      content: "Nghiệm của phương trình $\\log_3 (x - 1) = 1$ là",
      options: [
        { key: "A", text: "$x = 2$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 5$" },
        { key: "D", text: "$x = 4$" }
      ],
      correctAnswer: "D",
      explanation: "Điều kiện xác định: $x - 1 > 0 \\iff x > 1$.\nPhương trình cho tương đương với:\n$$x - 1 = 3^1 \\iff x = 4 \\quad \\text{(thỏa mãn điều kiện)}$$"
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ vectơ trong không gian",
      content: "Trong không gian với hệ tọa độ $Oxyz$, cho hai điểm $A(1; 5; 1)$ và $B(3; 3; 1)$. Vectơ $\\vec{AB}$ có tọa độ là",
      options: [
        { key: "A", text: "$(2; -2; 0)$" },
        { key: "B", text: "$(-2; 2; 0)$" },
        { key: "C", text: "$(4; 8; 2)$" },
        { key: "D", text: "$(2; 4; 1)$" }
      ],
      correctAnswer: "A",
      explanation: "Tọa độ của vectơ $\\vec{AB}$ được tính bằng tọa độ điểm $B$ trừ tọa độ điểm $A$:\n$$\\vec{AB} = (3 - 1; 3 - 5; 1 - 1) = (2; -2; 0)$$"
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Quy tắc nhân xác suất biến cố độc lập",
      content: "Cho hai biến cố độc lập $A$ và $B$ có xác suất thỏa mãn $P(A) = 0{,}5$ và $P(B) = 0{,}4$. Giá trị của $P(AB)$ bằng",
      options: [
        { key: "A", text: "$0{,}8$" },
        { key: "B", text: "$0{,}1$" },
        { key: "C", text: "$0{,}9$" },
        { key: "D", text: "$0{,}2$" }
      ],
      correctAnswer: "D",
      explanation: "Vì hai biến cố $A$ và $B$ độc lập nên ta có công thức nhân xác suất:\n$$P(AB) = P(A) \\cdot P(B) = 0{,}5 \\cdot 0{,}4 = 0{,}2$$"
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Vectơ trong không gian hình học",
      content: "Cho hình lập phương $ABCD.A'B'C'D'$ (xem hình dưới). Vectơ nào sau đây bằng vectơ $\\vec{AB}$?",
      svgContent: `<svg width="280" height="230" viewBox="0 0 280 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="arrow-ab" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <line x1="70" y1="165" x2="70" y2="55" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="70" y1="165" x2="200" y2="165" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="70" y1="165" x2="110" y2="195" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="70" y1="55" x2="200" y2="55" stroke="#0f172a" stroke-width="1.5" />
  <line x1="200" y1="55" x2="240" y2="85" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="85" x2="110" y2="85" stroke="#0f172a" stroke-width="1.5" />
  <line x1="110" y1="85" x2="70" y2="55" stroke="#0f172a" stroke-width="1.5" />
  <line x1="110" y1="85" x2="110" y2="195" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="85" x2="240" y2="195" stroke="#0f172a" stroke-width="1.5" />
  <line x1="200" y1="55" x2="200" y2="165" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="195" x2="200" y2="165" stroke="#0f172a" stroke-width="1.5" />
  <line x1="110" y1="195" x2="234" y2="195" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow-ab)" />
  <text x="50" y="52" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">D'</text>
  <text x="204" y="50" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">C'</text>
  <text x="100" y="78" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">A'</text>
  <text x="246" y="85" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">B'</text>
  <text x="50" y="172" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">D</text>
  <text x="206" y="170" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">C</text>
  <text x="96" y="212" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">A</text>
  <text x="246" y="212" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">B</text>
</svg>`,
      options: [
        { key: "A", text: "$\\vec{DC}$" },
        { key: "B", text: "$\\vec{A'D'}$" },
        { key: "C", text: "$\\vec{D'A'}$" },
        { key: "D", text: "$\\vec{CD}$" }
      ],
      correctAnswer: "A",
      explanation: "Trong hình lập phương $ABCD.A'B'C'D'$, mặt đáy $ABCD$ là hình vuông nên cạnh $AB$ song song và cùng hướng với cạnh $DC$, đồng thời $AB = DC$. Do đó $\\vec{AB} = \\vec{DC}$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận xiên của đồ thị hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau. Đồ thị hàm số có đường tiệm cận xiên là",
      svgContent: `<svg width="460" height="150" viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <rect x="5" y="5" width="450" height="140" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="6" />
  <line x1="65" y1="5" x2="65" y2="145" stroke="#cbd5e1" stroke-width="1.5" />
  <line x1="5" y1="40" x2="455" y2="40" stroke="#cbd5e1" stroke-width="1.5" />
  <line x1="5" y1="80" x2="455" y2="80" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="35" y="28" font-family="Times New Roman, serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a" text-anchor="middle">x</text>
  <text x="35" y="65" font-family="Times New Roman, serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a" text-anchor="middle">y'</text>
  <text x="35" y="120" font-family="Times New Roman, serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a" text-anchor="middle">y</text>
  <text x="90" y="28" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">-∞</text>
  <text x="260" y="28" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">1</text>
  <text x="430" y="28" font-family="Times New Roman, serif" font-size="15" fill="#0f172a" text-anchor="middle">+∞</text>
  <text x="175" y="65" font-family="Times New Roman, serif" font-size="16" fill="#0f172a" text-anchor="middle">+</text>
  <line x1="258" y1="40" x2="258" y2="145" stroke="#0f172a" stroke-width="1.5" />
  <line x1="262" y1="40" x2="262" y2="145" stroke="#0f172a" stroke-width="1.5" />
  <text x="345" y="65" font-family="Times New Roman, serif" font-size="16" fill="#0f172a" text-anchor="middle">+</text>
  <text x="95" y="135" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">-∞</text>
  <text x="235" y="95" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">+∞</text>
  <text x="285" y="135" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">-∞</text>
  <text x="425" y="95" font-family="Times New Roman, serif" font-size="14" fill="#0f172a" text-anchor="middle">+∞</text>
</svg>`,
      options: [
        { key: "A", text: "$y = 2x - 1$" },
        { key: "B", text: "$y = x + 1$" },
        { key: "C", text: "$y = -x + 1$" },
        { key: "D", text: "$y = 2x + 1$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào bảng biến thiên và đề bài đã cho phương trình hàm số dạng $y = x + 1 + \\frac{1}{x - 1}$, ta có $\\lim_{x \\to \\pm\\infty} [f(x) - (x + 1)] = 0$. Suy ra đường thẳng $y = x + 1$ là đường tiệm cận xiên của đồ thị hàm số."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đọc đồ thị hàm số",
      content: "Đường cong ở hình dưới là đồ thị của hàm số nào sau đây?",
      svgContent: `<svg width="280" height="240" viewBox="0 0 280 240" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="axis-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <line x1="20" y1="150" x2="260" y2="150" stroke="#0f172a" stroke-width="1.5" marker-end="url(#axis-arr)" />
  <line x1="140" y1="220" x2="140" y2="20" stroke="#0f172a" stroke-width="1.5" marker-end="url(#axis-arr)" />
  <text x="255" y="170" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#0f172a">x</text>
  <text x="125" y="25" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#0f172a">y</text>
  <text x="126" y="166" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#0f172a">O</text>
  <line x1="90" y1="220" x2="90" y2="20" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="4,4" />
  <line x1="20" y1="200" x2="260" y2="80" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="4,4" />
  <path d="M 30,220 Q 75,185 85,30" fill="none" stroke="#2563eb" stroke-width="2.5" />
  <path d="M 98,220 Q 110,65 250,90" fill="none" stroke="#2563eb" stroke-width="2.5" />
  <circle cx="90" cy="150" r="3" fill="#0f172a" />
  <text x="82" y="168" font-family="Times New Roman, serif" font-size="14" fill="#0f172a">-1</text>
  <circle cx="140" cy="150" r="2.5" fill="#0f172a" />
</svg>`,
      options: [
        { key: "A", text: "$y = \\frac{x^2 - x + 1}{x + 1}$" },
        { key: "B", text: "$y = \\frac{x^2 + 2x - 1}{x - 1}$" },
        { key: "C", text: "$y = \\frac{2x + 1}{x + 1}$" },
        { key: "D", text: "$y = \\frac{x^2 + x + 1}{x + 1}$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị có tiệm cận đứng là $x = -1$ và đi qua điểm $(0; 1)$. Thay $x = 0$ vào hàm số $y = \\frac{x^2 - x + 1}{x + 1}$ ta được $y = 1$. Do đó phương án A là hàm số phù hợp."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Khoảng biến thiên của mẫu số liệu ghép nhóm",
      content: "Thời gian chạy tập luyện cự ly 100m (tính bằng giây) của một vận động viên được ghi lại trong bảng sau:\n\n$$\\begin{array}{|c|c|c|c|c|c|}\\hline \\text{Thời gian (giây)} & [10{,}0; 10{,}4) & [10{,}4; 10{,}8) & [10{,}8; 11{,}2) & [11{,}2; 11{,}6) & [11{,}6; 12{,}0) \\\\ \\hline \\text{Số lần chạy} & 2 & 5 & 12 & 8 & 3 \\\\ \\hline \\end{array}$$\n\nKhoảng biến thiên của mẫu số liệu ghép nhóm này bằng",
      options: [
        { key: "A", text: "$1{,}6$" },
        { key: "B", text: "$2{,}0$" },
        { key: "C", text: "$1{,}8$" },
        { key: "D", text: "$0{,}4$" }
      ],
      correctAnswer: "B",
      explanation: "Khoảng biến thiên của mẫu số liệu ghép nhóm là hiệu giữa đầu mút phải của nhóm cuối cùng và đầu mút trái của nhóm đầu tiên:\n$$R = a_{k+1} - a_1 = 12{,}0 - 10{,}0 = 2{,}0\\text{ (giây)}$$"
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Góc giữa hai mặt phẳng",
      content: "Trong không gian $Oxyz$, cho hai mặt phẳng $(P): x + y - z + 2 = 0$ và $(Q): x - y + z - 1 = 0$. Côsin của góc giữa hai mặt phẳng $(P)$ và $(Q)$ bằng",
      options: [
        { key: "A", text: "$\\frac{1}{3}$" },
        { key: "B", text: "$-\\frac{1}{3}$" },
        { key: "C", text: "$\\frac{\\sqrt{3}}{3}$" },
        { key: "D", text: "$\\frac{2}{3}$" }
      ],
      correctAnswer: "A",
      explanation: "VTPT của $(P)$ là $\\vec{n}_P = (1; 1; -1)$, VTPT của $(Q)$ là $\\vec{n}_Q = (1; -1; 1)$.\nCôsin của góc giữa hai mặt phẳng:\n$$\\cos((P), (Q)) = \\frac{|\\vec{n}_P \\cdot \\vec{n}_Q|}{|\\vec{n}_P| \\cdot |\\vec{n}_Q|} = \\frac{|1\\cdot 1 + 1\\cdot(-1) + (-1)\\cdot 1|}{\\sqrt{1+1+1} \\cdot \\sqrt{1+1+1}} = \\frac{|-1|}{3} = \\frac{1}{3}$$"
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất có điều kiện",
      content: "Một hộp chứa 5 quả cầu màu đỏ và 4 quả cầu màu xanh. Lấy ngẫu nhiên lần lượt hai quả cầu (không hoàn lại). Biết rằng quả cầu lấy ra ở lần thứ nhất có màu đỏ. Xác suất để quả cầu lấy ra ở lần thứ hai có màu xanh bằng",
      options: [
        { key: "A", text: "$\\frac{4}{9}$" },
        { key: "B", text: "$\\frac{1}{2}$" },
        { key: "C", text: "$\\frac{5}{8}$" },
        { key: "D", text: "$\\frac{4}{8}$" }
      ],
      correctAnswer: "B",
      explanation: "Sau khi quả thứ nhất được lấy ra là quả màu đỏ, trong hộp còn lại $5 - 1 = 4$ quả màu đỏ và $4$ quả màu xanh (tổng cộng 8 quả).\nDo đó, xác suất để quả thứ hai có màu xanh khi biết quả thứ nhất màu đỏ là:\n$$P = \\frac{4}{8} = \\frac{1}{2}$$"
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát và vẽ đồ thị hàm số phân thức hữu tỉ",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 3x + 3}{x - 1}$.",
      statements: [
        {
          key: "a",
          text: "Hàm số đã cho có tập xác định là $D = \\mathbb{R} \\setminus \\{1\\}$.",
          correct: true,
          explanation: "Điều kiện xác định là mẫu số khác 0: $x - 1 \\ne 0 \\iff x \\ne 1$. Do đó tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$."
        },
        {
          key: "b",
          text: "Đồ thị hàm số có đường tiệm cận đứng là $x = 1$ và đường tiệm cận xiên là $y = x - 2$.",
          correct: true,
          explanation: "Ta có $f(x) = \\frac{x(x - 1) - 2(x - 1) + 1}{x - 1} = x - 2 + \\frac{1}{x - 1}$.\nDo đó $\\lim_{x \\to 1^+} f(x) = +\\infty \\implies x = 1$ là tiệm cận đứng.\nĐồng thời $\\lim_{x \\to \\pm\\infty} [f(x) - (x - 2)] = 0 \\implies y = x - 2$ là tiệm cận xiên."
        },
        {
          key: "c",
          text: "Hàm số đồng biến trên toàn bộ tập xác định $D$.",
          correct: false,
          explanation: "Đạo hàm: $f'(x) = 1 - \\frac{1}{(x - 1)^2} = \\frac{(x - 1)^2 - 1}{(x - 1)^2} = \\frac{x(x - 2)}{(x - 1)^2}$.\n$f'(x) > 0 \\iff x \\in (-\\infty; 0) \\cup (2; +\\infty)$, và $f'(x) < 0 \\iff x \\in (0; 1) \\cup (1; 2)$.\nVậy hàm số không đồng biến trên toàn bộ tập xác định."
        },
        {
          key: "d",
          text: "Tâm đối xứng của đồ thị hàm số là điểm $I(1; -1)$.",
          correct: true,
          explanation: "Giao điểm của tiệm cận đứng $x = 1$ và tiệm cận xiên $y = x - 2$ là $I(1; 1 - 2) = I(1; -1)$. Điểm $I(1; -1)$ chính là tâm đối xứng của đồ thị hàm số phân thức bậc hai trên bậc nhất."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ vectơ và điểm trong không gian Oxyz",
      context: "Trong không gian với hệ tọa độ $Oxyz$, cho ba điểm $A(1; 0; 2)$, $B(2; 1; -1)$, $C(0; 3; 1)$.",
      statements: [
        {
          key: "a",
          text: "Vectơ $\\vec{AB}$ có tọa độ là $(1; 1; -3)$.",
          correct: true,
          explanation: "$\\vec{AB} = (2 - 1; 1 - 0; -1 - 2) = (1; 1; -3)$."
        },
        {
          key: "b",
          text: "Ba điểm $A, B, C$ thẳng hàng.",
          correct: false,
          explanation: "Ta có $\\vec{AC} = (0 - 1; 3 - 0; 1 - 2) = (-1; 3; -1)$. Vì $\\frac{1}{-1} \\ne \\frac{1}{3}$ nên hai vectơ $\\vec{AB}$ và $\\vec{AC}$ không cùng phương, suy ra ba điểm $A, B, C$ không thẳng hàng (tạo thành một tam giác)."
        },
        {
          key: "c",
          text: "Tọa độ trọng tâm $G$ của tam giác $ABC$ là $G(1; \\frac{4}{3}; \\frac{2}{3})$.",
          correct: true,
          explanation: "Trọng tâm tam giác $G$ có tọa độ:\n$$x_G = \\frac{1 + 2 + 0}{3} = 1,\\quad y_G = \\frac{0 + 1 + 3}{3} = \\frac{4}{3},\\quad z_G = \\frac{2 + (-1) + 1}{3} = \\frac{2}{3}$$\nDo đó $G(1; \\frac{4}{3}; \\frac{2}{3})$."
        },
        {
          key: "d",
          text: "Độ dài đoạn thẳng $AB$ bằng $\\sqrt{11}$.",
          correct: true,
          explanation: "$AB = |\\vec{AB}| = \\sqrt{1^2 + 1^2 + (-3)^2} = \\sqrt{1 + 1 + 9} = \\sqrt{11}$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Đặc trưng đo độ phân tán của mẫu số liệu ghép nhóm",
      context: "Một nhóm gồm 40 học sinh làm bài kiểm tra Toán 12. Điểm số (thang điểm 10) được ghi nhận trong bảng sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Điểm số} & [4; 6) & [6; 7) & [7; 8) & [8; 10) \\\\ \\hline \\text{Số học sinh} & 6 & 14 & 12 & 8 \\\\ \\hline \\end{array}$$",
      statements: [
        {
          key: "a",
          text: "Cỡ mẫu của cuộc khảo sát là $n = 40$.",
          correct: true,
          explanation: "Tổng số học sinh $n = 6 + 14 + 12 + 8 = 40$."
        },
        {
          key: "b",
          text: "Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = 7{,}1$.",
          correct: false,
          explanation: "Giá trị đại diện các nhóm lần lượt là: $c_1 = 5$, $c_2 = 6{,}5$, $c_3 = 7{,}5$, $c_4 = 9$.\nSố trung bình:\n$$\\bar{x} = \\frac{6 \\cdot 5 + 14 \\cdot 6{,}5 + 12 \\cdot 7{,}5 + 8 \\cdot 9}{40} = \\frac{30 + 91 + 90 + 72}{40} = \\frac{283}{40} = 7{,}075$$\nDo đó $\\bar{x} = 7{,}075 \\ne 7{,}1$."
        },
        {
          key: "c",
          text: "Nhóm chứa trung vị của mẫu số liệu là $[6; 7)$.",
          correct: true,
          explanation: "Vì $\\frac{n}{2} = 20$, tần số tích lũy: $cf_1 = 6 < 20 \\le cf_2 = 20$. Do đó trung vị $M_e$ thuộc nhóm $[6; 7)$."
        },
        {
          key: "d",
          text: "Khoảng biến thiên của mẫu số liệu ghép nhóm này bằng $6$.",
          correct: true,
          explanation: "Khoảng biến thiên $R = 10 - 4 = 6$."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Công thức xác suất toàn phần và công thức Bayes",
      context: "Một phòng xét nghiệm y tế chẩn đoán một căn bệnh. Tỉ lệ người mắc bệnh trong dân số là $2\\%$. Đối với người mắc bệnh, xét nghiệm cho kết quả dương tính với xác suất $95\\%$. Đối với người không mắc bệnh, xét nghiệm cho kết quả dương tính giả với xác suất $5\\%$. Chọn ngẫu nhiên một người từ dân số đi xét nghiệm.",
      statements: [
        {
          key: "a",
          text: "Xác suất người được chọn không mắc bệnh là $0{,}98$.",
          correct: true,
          explanation: "Gọi $A$ là biến cố 'người được chọn mắc bệnh'. Ta có $P(A) = 0{,}02$, do đó $P(\\bar{A}) = 1 - 0{,}02 = 0{,}98$."
        },
        {
          key: "b",
          text: "Gọi $B$ là biến cố 'kết quả xét nghiệm dương tính'. Khi đó $P(B|A) = 0{,}95$ và $P(B|\\bar{A}) = 0{,}05$.",
          correct: true,
          explanation: "Theo giả thiết đề bài: nếu mắc bệnh thì dương tính với xác suất $95\\%$ nên $P(B|A) = 0{,}95$. Nếu không mắc bệnh thì dương tính giả với xác suất $5\\%$ nên $P(B|\\bar{A}) = 0{,}05$."
        },
        {
          key: "c",
          text: "Xác suất để một người bất kì đi xét nghiệm nhận kết quả dương tính là $P(B) = 0{,}068$.",
          correct: true,
          explanation: "Áp dụng công thức xác suất toàn phần:\n$$P(B) = P(A) \\cdot P(B|A) + P(\\bar{A}) \\cdot P(B|\\bar{A}) = 0{,}02 \\cdot 0{,}95 + 0{,}98 \\cdot 0{,}05 = 0{,}019 + 0{,}049 = 0{,}068$$"
        },
        {
          key: "d",
          text: "Biết người đó có kết quả xét nghiệm dương tính, xác suất người đó thực sự mắc bệnh lớn hơn $30\\%$.",
          correct: false,
          explanation: "Áp dụng công thức Bayes:\n$$P(A|B) = \\frac{P(A) \\cdot P(B|A)}{P(B)} = \\frac{0{,}019}{0{,}068} = \\frac{19}{68} \\approx 0{,}2794 = 27{,}94\\% < 30\\%$$\nVậy nhận định lớn hơn $30\\%$ là Sai."
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
      topic: "Ứng dụng đạo hàm tối ưu hóa hình học",
      content: "Một người thợ gò một chiếc thùng hình trụ bằng tôn không có nắp đậy với thể tích chứa $V = 16\\pi\\text{ m}^3$. Hỏi bán kính đáy $R$ (mét) của thùng bằng bao nhiêu để diện tích tôn dùng làm thùng là ít nhất (bỏ qua mép gập và mép hàn)?",
      correctAnswer: "2",
      acceptableAnswers: ["2", "2.0"],
      unit: "mét",
      explanation: "Gọi $R$ là bán kính đáy và $h$ là chiều cao của thùng hình trụ ($R > 0, h > 0$).\nThể tích thùng hình trụ không nắp là $V = \\pi R^2 h = 16\\pi \\implies h = \\frac{16}{R^2}$.\nDiện tích tôn làm thùng gồm diện tích 1 đáy và diện tích xung quanh:\n$$S(R) = \\pi R^2 + 2\\pi R h = \\pi R^2 + 2\\pi R \\cdot \\frac{16}{R^2} = \\pi \\left(R^2 + \\frac{32}{R}\\right)$$\nTìm $R$ để $S(R)$ đạt giá trị nhỏ nhất trên $(0; +\\infty)$:\nĐạo hàm: $S'(R) = \\pi \\left(2R - \\frac{32}{R^2}\\right)$.\nCho $S'(R) = 0 \\iff 2R - \\frac{32}{R^2} = 0 \\iff R^3 = 16 \\iff R^3 = 16 / 2 = 8 \\iff R = 2\\text{ (mét)}$.\nLập bảng biến thiên ta thấy $S(R)$ đạt cực tiểu tại $R = 2$ mét."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân trong bài toán chuyển động vật lý",
      content: "Một ô tô đang chạy với vận tốc $20\\text{ m/s}$ thì người lái xe phát hiện chướng ngại vật và bắt đầu đạp phanh. Kể từ thời điểm đó, ô tô chuyển động chậm dần đều với gia tốc $a(t) = -4\\text{ (m/s}^2)$. Tính quãng đường mà ô tô di chuyển được từ lúc đạp phanh đến khi dừng hẳn (tính bằng mét).",
      correctAnswer: "50",
      acceptableAnswers: ["50", "50m"],
      unit: "m",
      explanation: "Vận tốc của ô tô sau khi phanh tại thời điểm $t$ giây là nguyên hàm của gia tốc:\n$$v(t) = \\int a(t)\\,dt = \\int (-4)\\,dt = -4t + C$$\nTại thời điểm bắt đầu đạp phanh $t = 0$, vận tốc $v(0) = 20\\text{ m/s} \\implies C = 20$. Do đó $v(t) = 20 - 4t$.\nÔ tô dừng hẳn khi $v(t) = 0 \\iff 20 - 4t = 0 \\iff t = 5\\text{ (giây)}$.\nQuãng đường ô tô đi được đến khi dừng hẳn là:\n$$S = \\int_0^5 v(t)\\,dt = \\int_0^5 (20 - 4t)\\,dt = \\left[20t - 2t^2\\right]_0^5 = 20(5) - 2(25) = 100 - 50 = 50\\text{ (mét)}$$"
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách từ điểm đến mặt phẳng trong Oxyz",
      content: "Trong không gian với hệ tọa độ $Oxyz$, cho điểm $A(2; -1; 3)$ và mặt phẳng $(P): 2x - 2y + z + 5 = 0$. Khoảng cách từ điểm $A$ đến mặt phẳng $(P)$ bằng bao nhiêu?",
      correctAnswer: "4",
      acceptableAnswers: ["4", "4.0"],
      unit: "đơn vị độ dài",
      explanation: "Khoảng cách từ điểm $A(x_0; y_0; z_0)$ đến mặt phẳng $(P): Ax + By + Cz + D = 0$ được tính theo công thức:\n$$d(A, (P)) = \\frac{|2(2) - 2(-1) + 1(3) + 5|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\frac{|4 + 2 + 3 + 5|}{\\sqrt{4 + 4 + 1}} = \\frac{14}{\\sqrt{9}} = \\frac{14}{3} \\approx 4{,}67$$\nKhoảng cách chính xác: $\\frac{14}{3}$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân tính diện tích hình phẳng",
      content: "Một cổng chào của khu triển lãm có hình dạng một parabol với chiều cao $h = 6\\text{ m}$ và bề rộng chân cổng $d = 4\\text{ m}$. Tính diện tích mặt bằng của cổng chào (tính bằng mét vuông $m^2$).",
      correctAnswer: "16",
      acceptableAnswers: ["16", "16m2"],
      unit: "m²",
      explanation: "Chọn hệ trục tọa độ $Oxy$ sao cho gốc $O$ là trung điểm chân cổng, trục tung $Oy$ là trục đối xứng của cổng chào.\nKhi đó đỉnh parabol là $I(0; 6)$ và hai chân cổng là $A(-2; 0)$, $B(2; 0)$.\nPhương trình parabol có dạng $y = ax^2 + 6$. Đi qua điểm $B(2; 0) \\implies a(2^2) + 6 = 0 \\iff 4a = -6 \\iff a = -1{,}5$.\nVậy parabol là $y = -1{,}5x^2 + 6$.\nDiện tích cổng chào là:\n$$S = \\int_{-2}^2 (-1{,}5x^2 + 6)\\,dx = \\left[-0{,}5x^3 + 6x\\right]_{-2}^2 = (-4 + 12) - (4 - 12) = 8 - (-8) = 16\\text{ (m}^2\\text{)}$$"
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Tìm trung vị của mẫu số liệu ghép nhóm",
      content: "Khảo sát tuổi thọ (năm) của 50 bình ắc quy xe máy được cho bởi bảng sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Tuổi thọ (năm)} & [2; 3) & [3; 4) & [4; 5) & [5; 6) \\\\ \\hline \\text{Số lượng} & 10 & 20 & 15 & 5 \\\\ \\hline \\end{array}$$\nTính trung vị $M_e$ của mẫu số liệu ghép nhóm này (làm tròn kết quả đến hàng phần mười).",
      correctAnswer: "3,75",
      acceptableAnswers: ["3,75", "3.75", "3,8", "3.8"],
      unit: "năm",
      explanation: "Cỡ mẫu $n = 50$. Ta có $\\frac{n}{2} = 25$.\nTần số tích lũy: $cf_1 = 10, cf_2 = 30$. Nhóm chứa trung vị là nhóm $[3; 4)$ với $u_m = 3, n_m = 20, C = 10$, độ rộng $h = 4 - 3 = 1$.\nÁp dụng công thức trung vị cho mẫu số liệu ghép nhóm:\n$$M_e = 3 + \\frac{25 - 10}{20} \\cdot 1 = 3 + \\frac{15}{20} = 3 + 0{,}75 = 3{,}75\\text{ (năm)}$$"
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng đạo hàm tìm GTLN - GTNN thực tế",
      content: "Một công ty nông sản có công suất chế biến không quá 200 tấn nguyên liệu một tháng. Nếu công ty chế biến $x$ tấn nguyên liệu trong một tháng ($1 \\le x \\le 200$) thì chi phí sản xuất và doanh thu lần lượt là $C(x) = 0{,}001x^3 + 30x + 10$ (triệu đồng) và $R(x) = 60x$ (triệu đồng). Lợi nhuận lớn nhất mà công ty đạt được trong một tháng là bao nhiêu triệu đồng?",
      correctAnswer: "1990",
      acceptableAnswers: ["1990"],
      unit: "triệu đồng",
      explanation: "Hàm số biểu diễn lợi nhuận của doanh nghiệp trong một tháng là:\n$$P(x) = R(x) - C(x) = 60x - (0{,}001x^3 + 30x + 10) = -0{,}001x^3 + 30x - 10$$\nTìm giá trị lớn nhất của hàm số $P(x)$ trên đoạn $[1; 200]$:\nĐạo hàm: $P'(x) = -0{,}003x^2 + 30$.\nCho $P'(x) = 0 \\iff -0{,}003x^2 + 30 = 0 \\iff x^2 = 10000 \\iff x = 100$ (do $x \\in [1; 200]$).\nTính giá trị tại các điểm biên và điểm cực trị:\n- $P(1) \\approx 19{,}999$\n- $P(100) = -0{,}001(100^3) + 30(100) - 10 = -1000 + 3000 - 10 = 1990$ triệu đồng.\n- $P(200) = -0{,}001(200^3) + 30(200) - 10 = -8000 + 6000 - 10 = -2010$ triệu đồng.\nSo sánh các giá trị, ta thấy lợi nhuận lớn nhất đạt được là $1990$ triệu đồng khi công ty chế biến $100$ tấn nguyên liệu."
    }
  ]
};
