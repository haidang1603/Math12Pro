import { ExamData, MilestoneType } from "@/types/exam";

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
  <!-- Hidden lines (dashed) -->
  <line x1="70" y1="165" x2="70" y2="55" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="70" y1="165" x2="200" y2="165" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="70" y1="165" x2="110" y2="195" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
  <!-- Visible lines (solid) -->
  <line x1="70" y1="55" x2="200" y2="55" stroke="#0f172a" stroke-width="1.5" />
  <line x1="200" y1="55" x2="240" y2="85" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="85" x2="110" y2="85" stroke="#0f172a" stroke-width="1.5" />
  <line x1="110" y1="85" x2="70" y2="55" stroke="#0f172a" stroke-width="1.5" />
  <line x1="110" y1="85" x2="110" y2="195" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="85" x2="240" y2="195" stroke="#0f172a" stroke-width="1.5" />
  <line x1="200" y1="55" x2="200" y2="165" stroke="#0f172a" stroke-width="1.5" />
  <line x1="240" y1="195" x2="200" y2="165" stroke="#0f172a" stroke-width="1.5" />
  <!-- Vector AB with bold arrow -->
  <line x1="110" y1="195" x2="234" y2="195" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow-ab)" />
  <!-- Vertex Labels -->
  <text x="50" y="52" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">D'</text>
  <text x="204" y="50" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">C'</text>
  <text x="100" y="78" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">A'</text>
  <text x="246" y="85" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">B'</text>
  <text x="50" y="172" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">D</text>
  <text x="206" y="170" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">C</text>
  <text x="96" y="212" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">A</text>
  <text x="246" y="208" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="16" fill="#0f172a">B</text>
</svg>`,
      options: [
        { key: "A", text: "$\\vec{AA'}$" },
        { key: "B", text: "$\\vec{D'C'}$" },
        { key: "C", text: "$\\vec{CD}$" },
        { key: "D", text: "$\\vec{AD}$" }
      ],
      correctAnswer: "B",
      explanation: "Dựa vào hình vẽ hình lập phương $ABCD.A'B'C'D'$, các vectơ bằng với vectơ $\\vec{AB}$ là các vectơ cùng hướng và cùng độ dài với nó, bao gồm: $\\vec{DC}$, $\\vec{A'B'}$, và $\\vec{D'C'}$. Do đó ta chọn $\\vec{D'C'}$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đại số & Giải tích",
      topic: "Hệ bất phương trình bậc nhất hai ẩn",
      content: "Cặp số nào sau đây là nghiệm của hệ bất phương trình $\\begin{cases} x + y - 3 < 0 \\\\ x - y + 1 > 0 \\end{cases}$ ?",
      options: [
        { key: "A", text: "$(1; 0)$" },
        { key: "B", text: "$(0; 2)$" },
        { key: "C", text: "$(-1; 1)$" },
        { key: "D", text: "$(1; 2)$" }
      ],
      correctAnswer: "A",
      explanation: "Thay tọa độ các điểm vào hệ bất phương trình $\\begin{cases} x + y - 3 < 0 \\\\ x - y + 1 > 0 \\end{cases}$:\nVới cặp số $(1; 0)$: $\\begin{cases} 1 + 0 - 3 = -2 < 0 \\\\ 1 - 0 + 1 = 2 > 0 \\end{cases}$ (Thỏa mãn)."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Định nghĩa nguyên hàm",
      content: "Hàm số $F(x) = 4x^3$ là một nguyên hàm của hàm số nào sau đây?",
      options: [
        { key: "A", text: "$f_2(x) = 3x^2$" },
        { key: "B", text: "$f_3(x) = 12x^2$" },
        { key: "C", text: "$f_1(x) = x^4$" },
        { key: "D", text: "$f_4(x) = 4x^4$" }
      ],
      correctAnswer: "B",
      explanation: "Hàm số $F(x) = 4x^3$ là một nguyên hàm của hàm số $f(x)$ nếu $F'(x) = f(x)$. Ta có:\n$$F'(x) = (4x^3)' = 12x^2$$\nDo đó $F(x)$ là một nguyên hàm của hàm số $f_3(x) = 12x^2$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận của đồ thị hàm số",
      content: "Cho hàm số $y = \\dfrac{ax + b}{cx + d}$ ($c \\neq 0, ad - bc \\neq 0$) có bảng biến thiên như hình dưới đây:\n\nĐường tiệm cận ngang của đồ thị hàm số đã cho có phương trình là",
      svgContent: `<svg width="420" height="150" viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="bbt-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <!-- Table Border & Grid -->
  <rect x="10" y="10" width="400" height="130" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
  <line x1="10" y1="40" x2="410" y2="40" stroke="#0f172a" stroke-width="1.2" />
  <line x1="10" y1="70" x2="410" y2="70" stroke="#0f172a" stroke-width="1.2" />
  <line x1="55" y1="10" x2="55" y2="140" stroke="#0f172a" stroke-width="1.2" />
  <!-- Double line at x = 1 (from row y' through row y) -->
  <line x1="230" y1="40" x2="230" y2="140" stroke="#0f172a" stroke-width="1.2" />
  <line x1="234" y1="40" x2="234" y2="140" stroke="#0f172a" stroke-width="1.2" />
  <!-- Row 1: x -->
  <text x="32" y="30" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="15" text-anchor="middle" fill="#0f172a">x</text>
  <text x="75" y="30" font-family="Times New Roman, serif" font-size="14" text-anchor="middle" fill="#0f172a">-∞</text>
  <text x="232" y="30" font-family="Times New Roman, serif" font-weight="bold" font-size="14" text-anchor="middle" fill="#0f172a">1</text>
  <text x="385" y="30" font-family="Times New Roman, serif" font-size="14" text-anchor="middle" fill="#0f172a">+∞</text>
  <!-- Row 2: y' -->
  <text x="32" y="60" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="15" text-anchor="middle" fill="#0f172a">y'</text>
  <text x="145" y="60" font-family="Times New Roman, serif" font-weight="bold" font-size="16" text-anchor="middle" fill="#0f172a">+</text>
  <text x="320" y="60" font-family="Times New Roman, serif" font-weight="bold" font-size="16" text-anchor="middle" fill="#0f172a">+</text>
  <!-- Row 3: y -->
  <text x="32" y="110" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="15" text-anchor="middle" fill="#0f172a">y</text>
  <!-- Left branch: from -2 up to +∞ -->
  <text x="75" y="132" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-2</text>
  <line x1="88" y1="126" x2="218" y2="88" stroke="#0f172a" stroke-width="1.5" marker-end="url(#bbt-arrow)" />
  <text x="212" y="84" font-family="Times New Roman, serif" font-size="13" text-anchor="end" fill="#0f172a">+∞</text>
  <!-- Right branch: from -∞ up to -2 -->
  <text x="245" y="134" font-family="Times New Roman, serif" font-size="13" fill="#0f172a">-∞</text>
  <line x1="258" y1="128" x2="380" y2="90" stroke="#0f172a" stroke-width="1.5" marker-end="url(#bbt-arrow)" />
  <text x="390" y="86" font-family="Times New Roman, serif" font-size="13" text-anchor="middle" fill="#0f172a">-2</text>
</svg>`,
      options: [
        { key: "A", text: "$y = -2$" },
        { key: "B", text: "$x = -2$" },
        { key: "C", text: "$x = 1$" },
        { key: "D", text: "$y = 1$" }
      ],
      correctAnswer: "A",
      explanation: "Dựa vào bảng biến thiên, ta thấy khi $x \\to -\\infty$ hoặc $x \\to +\\infty$ thì $y \\to -2$. Do đó, đường tiệm cận ngang của đồ thị hàm số có phương trình là $y = -2$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đại số & Giải tích",
      topic: "Cấp số nhân",
      content: "Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1$ và công bội $q$ với $u_1 \\neq 0, q > 1$. Số hạng $u_4$ là",
      options: [
        { key: "A", text: "$u_4 = u_1 \\cdot q^3$" },
        { key: "B", text: "$u_4 = u_1 \\cdot q^4$" },
        { key: "C", text: "$u_4 = u_1 + 3q$" },
        { key: "D", text: "$u_4 = u_1 + 4q$" }
      ],
      correctAnswer: "A",
      explanation: "Công thức tổng quát của cấp số nhân là $u_n = u_1 \\cdot q^{n-1}$. Với $n = 4$, ta có số hạng $u_4 = u_1 \\cdot q^3$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 3,
      chapterName: "Số đặc trưng mẫu ghép nhóm",
      topic: "Trung vị của mẫu số liệu ghép nhóm",
      content: "Khảo sát thời gian (đơn vị: phút) học trực tuyến trong một ngày của 42 học sinh, người ta thu được mẫu số liệu ghép nhóm như sau:\n\n$$\\begin{array}{|c|c|c|c|c|c|c|}\\hline \\textbf{Thời gian học trực tuyến} & [10; 20) & [20; 30) & [30; 40) & [40; 50) & [50; 60) & [60; 70) \\\\ \\hline \\textbf{Số học sinh} & 4 & 8 & 14 & 7 & 4 & 5 \\\\ \\hline \\end{array}$$\n\nTrung vị của mẫu số liệu thuộc nhóm nào sau đây?",
      options: [
        { key: "A", text: "$[30; 40)$" },
        { key: "B", text: "$[40; 50)$" },
        { key: "C", text: "$[60; 70)$" },
        { key: "D", text: "$[50; 60)$" }
      ],
      correctAnswer: "A",
      explanation: "Tổng số học sinh là $n = 42$. Vị trí của trung vị là giá trị trung bình của số hạng thứ 21 và thứ 22 trong mẫu số liệu đã sắp xếp.\nTần số tích lũy:\n- Nhóm $[10; 20)$ là: 4\n- Nhóm $[20; 30)$ là: $4 + 8 = 12$\n- Nhóm $[30; 40)$ là: $12 + 14 = 26$\nVì $12 < 21 \\le 26$ và $12 < 22 \\le 26$ nên cả hai số hạng này đều thuộc vào nhóm $[30; 40)$. Vậy trung vị của mẫu số liệu thuộc nhóm $[30; 40)$."
    }
  ],
  part2: [
    {
      id: 101,
      part: 2,
      number: 1,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất có điều kiện trong y tế",
      context: "Nhằm đưa ra cảnh báo sớm về tình trạng sức khỏe của cư dân, người ta sử dụng một ứng dụng trí tuệ nhân tạo để sàng lọc nguy cơ mắc bệnh dựa trên hồ sơ y tế được lưu trữ. Khi phát hiện nguy cơ mắc bệnh, ứng dụng này sẽ gửi cảnh báo để giúp người dân đi khám bệnh kịp thời. Người ta dùng ứng dụng này để tầm soát nguy cơ mắc một loại bệnh.\n\nKết quả thu được khi quét thử nghiệm hồ sơ y tế của 10000 người như sau: Có 1000 người nhận được cảnh báo và 9000 người còn lại không nhận được cảnh báo từ ứng dụng. Trong số 1000 người nhận được cảnh báo thì có 700 người có bệnh và 300 người không có bệnh. Trong số 9000 người không nhận được cảnh báo thì có 100 người có bệnh và 8900 người không có bệnh.\n\n$$\\begin{array}{|c|c|c|c|}\\hline & \\textbf{Nhận cảnh báo (W)} & \\textbf{Không nhận cảnh báo (}\\overline{W}\\textbf{)} & \\textbf{Tổng số} \\\\ \\hline \\textbf{Có bệnh (D)} & 700 & 100 & 800 \\\\ \\hline \\textbf{Không bệnh (}\\overline{D}\\textbf{)} & 300 & 8900 & 9200 \\\\ \\hline \\textbf{Tổng số} & 1000 & 9000 & 10000 \\\\ \\hline \\end{array}$$\n\nChọn ngẫu nhiên một người trong số 10000 người nói trên. Xét tính Đúng/Sai của các mệnh đề sau:",
      statements: [
        {
          key: "a",
          text: "Xác suất để người đó không nhận được cảnh báo từ ứng dụng bằng $0{,}9$.",
          correct: true,
          explanation: "Xác suất người đó không nhận được cảnh báo là: $P(\\overline{W}) = \\dfrac{9000}{10000} = 0{,}9$. Mệnh đề ĐÚNG."
        },
        {
          key: "b",
          text: "Xác suất để người đó không có bệnh, biết rằng người đó không nhận được cảnh báo từ ứng dụng, lớn hơn $0{,}98$.",
          correct: true,
          explanation: "Xác suất người đó không có bệnh, biết rằng họ không nhận được cảnh báo là: $P(\\overline{D}|\\overline{W}) = \\dfrac{8900}{9000} = \\dfrac{89}{90} \\approx 0{,}9889 > 0{,}98$. Mệnh đề ĐÚNG."
        },
        {
          key: "c",
          text: "Xác suất để người đó không có bệnh bằng $0{,}9$.",
          correct: false,
          explanation: "Tổng số người không có bệnh là $300 + 8900 = 9200$. Do đó xác suất người đó không có bệnh là: $P(\\overline{D}) = \\dfrac{9200}{10000} = 0{,}92 \\neq 0{,}9$. Mệnh đề SAI."
        },
        {
          key: "d",
          text: "Xác suất để người đó không nhận được cảnh báo từ ứng dụng, biết rằng người đó không có bệnh, nhỏ hơn $0{,}95$.",
          correct: false,
          explanation: "Xác suất không nhận cảnh báo, biết rằng người đó không có bệnh là: $P(\\overline{W}|\\overline{D}) = \\dfrac{8900}{9200} = \\dfrac{89}{92} \\approx 0{,}9674 > 0{,}95$ (không nhỏ hơn $0{,}95$). Mệnh đề SAI."
        }
      ]
    },
    {
      id: 102,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát và tính chất hàm số bậc ba",
      context: "Cho hàm số $f(x) = \\dfrac{1}{3}x^3 - 5x^2 + 9x + 8$. Xét tính Đúng/Sai của các mệnh đề sau:",
      statements: [
        {
          key: "a",
          text: "Hàm số đã cho có đạo hàm là $f'(x) = x^2 - 10x + 9$.",
          correct: true,
          explanation: "Đạo hàm của hàm số là: $f'(x) = 3 \\cdot \\dfrac{1}{3}x^2 - 10x + 9 = x^2 - 10x + 9$. Mệnh đề ĐÚNG."
        },
        {
          key: "b",
          text: "Phương trình $f'(x) = 0$ có tập nghiệm là $S = \\{1; 9\\}$.",
          correct: true,
          explanation: "Giải phương trình $f'(x) = 0 \\iff x^2 - 10x + 9 = 0 \\iff x = 1$ hoặc $x = 9$. Vậy tập nghiệm $S = \\{1; 9\\}$. Mệnh đề ĐÚNG."
        },
        {
          key: "c",
          text: "Hàm số đã cho nghịch biến trên khoảng $(1; 9)$.",
          correct: true,
          explanation: "Trong khoảng $(1; 9)$, ta có $f'(x) < 0$ nên hàm số nghịch biến trên khoảng $(1; 9)$. Mệnh đề ĐÚNG."
        },
        {
          key: "d",
          text: "Giá trị cực tiểu của hàm số đã cho bằng $\\dfrac{37}{3}$.",
          correct: false,
          explanation: "Điểm cực tiểu của hàm số đạt tại $x = 9$. Giá trị cực tiểu tương ứng là: $f(9) = \\dfrac{1}{3}(9^3) - 5(9^2) + 9(9) + 8 = 243 - 405 + 81 + 8 = -73$. Còn giá trị $f(1) = \\dfrac{37}{3}$ chính là giá trị cực đại của hàm số. Mệnh đề SAI."
        }
      ]
    },
    {
      id: 103,
      part: 2,
      number: 3,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Mô hình tích phân trong lưu trữ năng lượng",
      context: "Một hệ thống pin năng lượng mặt trời gồm các tấm pin được kết nối với một bộ lưu trữ điện. Trong thời gian mặt trời chiếu sáng của một ngày, năng lượng điện thu được từ các tấm pin được lưu trong bộ lưu trữ điện. Gọi $F(t)$ là năng lượng điện (kWh) lưu trữ được kể từ thời điểm hệ thống bắt đầu hoạt động đến thời điểm $t$, trong đó $t$ là thời gian tính theo giờ ($0 \\le t \\le 12$) và thời điểm hệ thống bắt đầu hoạt động ứng với $t = 0$. Biết rằng $F(0) = 0$.\n\nTốc độ lưu trữ năng lượng điện (kW) của hệ thống này là hàm số $f(t) = F'(t)$ với $0 \\le t \\le 12$. Số liệu ghi nhận được ở một ngày cụ thể trong năm cho thấy $f(t) = -0{,}3t^2 + 3{,}6t$ với $0 \\le t \\le 12$. Xét tính Đúng/Sai của các mệnh đề sau:",
      statements: [
        {
          key: "a",
          text: "$F(t) = -0{,}1t^3 + 1{,}8t^2$ với $0 \\le t \\le 12$.",
          correct: true,
          explanation: "Hàm số năng lượng tích lũy là: $F(t) = \\int (-0{,}3t^2 + 3{,}6t)\\,dt = -0{,}1t^3 + 1{,}8t^2 + C$. Vì $F(0) = 0 \\implies C = 0 \\implies F(t) = -0{,}1t^3 + 1{,}8t^2$. Mệnh đề ĐÚNG."
        },
        {
          key: "b",
          text: "Năng lượng điện (kWh) lưu trữ được kể từ thời điểm $t = a$ đến thời điểm $t = b$ ($0 \\le a < b \\le 12$) là $\\int_a^b f(t)\\,dt$.",
          correct: true,
          explanation: "Theo ý nghĩa hình học và định lý cơ bản của tích phân, năng lượng điện lưu trữ được từ thời điểm $t = a$ đến thời điểm $t = b$ bằng $\\int_a^b f(t)\\,dt$. Mệnh đề ĐÚNG."
        },
        {
          key: "c",
          text: "Năng lượng điện lưu trữ được kể từ thời điểm $t = 1$ đến thời điểm $t = 4$ nhỏ hơn $20{,}6\\text{ kWh}$.",
          correct: false,
          explanation: "Năng lượng điện tích lũy từ $t = 1$ đến $t = 4$ là: $\\Delta F = F(4) - F(1) = [-0{,}1(4^3) + 1{,}8(4^2)] - [-0{,}1(1^3) + 1{,}8(1^2)] = 22{,}4 - 1{,}7 = 20{,}7\\text{ kWh} > 20{,}6\\text{ kWh}$. Mệnh đề SAI."
        },
        {
          key: "d",
          text: "Năng lượng điện lưu trữ được kể từ thời điểm $t = 1$ đến thời điểm $t = 7$ gấp hai lần năng lượng điện lưu trữ được kể từ thời điểm $t = 1$ đến thời điểm $t = 4$.",
          correct: false,
          explanation: "Năng lượng điện tích lũy từ $t = 1$ đến $t = 7$ là: $F(7) - F(1) = [-0{,}1(7^3) + 1{,}8(7^2)] - 1{,}7 = 53{,}9 - 1{,}7 = 52{,}2\\text{ kWh}$. Ta thấy $\\dfrac{52{,}2}{20{,}7} \\approx 2{,}52 \\neq 2$ (không gấp hai lần). Mệnh đề SAI."
        }
      ]
    },
    {
      id: 104,
      part: 2,
      number: 4,
      chapterId: 5,
      chapterName: "Phương trình trong không gian",
      topic: "Đường thẳng và khoảng cách trong không gian Oxyz",
      context: "Trong không gian xét hệ tọa độ $Oxyz$ có một đơn vị dài trên các trục tương ứng với 10 mét trên thực tế. Một mục tiêu cần được bảo vệ có vị trí ở gốc tọa độ $O$. Người ta thiết lập một vành đai bảo vệ quanh mục tiêu theo một đường tròn tâm $O$ bán kính bằng 7 đơn vị (tương ứng 70 mét trên thực tế) nằm trong mặt phẳng $(Oxy)$ ($z = 0$). Một máy bay không người lái (được coi như một hạt) bay theo một đường thẳng từ vị trí $M(5; 10; 4)$ đến vị trí $N(14; -2; 4)$. Tại mỗi vị trí của máy bay, khoảng cách từ máy bay đến vành đai bảo vệ là độ dài ngắn nhất của các đoạn thẳng nối từ vị trí đó đến một điểm bất kì trên vành đai. Xét tính Đúng/Sai của các mệnh đề sau:",
      statements: [
        {
          key: "a",
          text: "$\\vec{MN} = (9; -12; 0)$.",
          correct: true,
          explanation: "$\\vec{MN} = (14 - 5; -2 - 10; 4 - 4) = (9; -12; 0)$. Mệnh đề ĐÚNG."
        },
        {
          key: "b",
          text: "Phương trình tham số của đường thẳng $MN$ là $\\begin{cases} x = 5 + 3t \\\\ y = 10 - 4t \\\\ z = 0 \\end{cases}$ với $t \\in \\mathbb{R}$.",
          correct: false,
          explanation: "Đường thẳng $MN$ đi qua $M(5; 10; 4)$ và có vectơ chỉ phương $\\vec{u} = \\dfrac{1}{3}\\vec{MN} = (3; -4; 0)$. Phương trình tham số đúng phải là: $\\begin{cases} x = 5 + 3t \\\\ y = 10 - 4t \\\\ z = 4 \\end{cases}$. Đề bài viết thành $z = 0$ là sai. Mệnh đề SAI."
        },
        {
          key: "c",
          text: "Trong quá trình bay từ $M$ đến $N$, khoảng cách ngắn nhất từ máy bay đến vành đai bảo vệ là 50 mét.",
          correct: true,
          explanation: "Gọi $Q(x; y; 4)$ là một điểm bất kỳ trên đường thẳng $MN$. Khoảng cách từ $Q$ đến một điểm $P(x_P; y_P; 0)$ trên đường tròn vành đai là: $QP = \\sqrt{(x - x_P)^2 + (y - y_P)^2 + 4^2}$. Để khoảng cách này ngắn nhất, hình chiếu $Q'(x; y; 0)$ của $Q$ xuống mặt phẳng $(Oxy)$ phải có khoảng cách đến đường tròn ngắn nhất. Tọa độ của $Q'$ thỏa mãn: $x = 5 + 3t, y = 10 - 4t$. Khoảng cách từ $Q'$ đến gốc tọa độ $O$ là: $OQ' = \\sqrt{(5 + 3t)^2 + (10 - 4t)^2} = \\sqrt{25t^2 - 50t + 125} = \\sqrt{25(t - 1)^2 + 100}$. Giá trị nhỏ nhất của $OQ'$ đạt được tại $t = 1 \\implies OQ'_{\\min} = 10$. Khoảng cách ngắn nhất từ $Q'$ tới đường tròn bán kính $R = 7$ là: $10 - 7 = 3$ đơn vị. Vậy khoảng cách ngắn nhất từ máy bay đến vành đai là: $d_{\\min} = \\sqrt{3^2 + 4^2} = 5$ đơn vị dài. Đổi ra thực tế: $5 \\times 10 = 50\\text{ m}$. Mệnh đề ĐÚNG."
        },
        {
          key: "d",
          text: "Trong quá trình bay từ $M$ đến $N$, khoảng cách từ máy bay đến vành đai bảo vệ là ngắn nhất khi máy bay ở vị trí có tọa độ là $(8; 6; 4)$.",
          correct: true,
          explanation: "Khoảng cách đạt giá trị nhỏ nhất tại $t = 1$. Thay $t = 1$ vào phương trình đường thẳng ta được tọa độ máy bay lúc này là: $x = 5 + 3(1) = 8; y = 10 - 4(1) = 6; z = 4$. Vậy vị trí đó là $(8; 6; 4)$. Mệnh đề ĐÚNG."
        }
      ]
    }
  ],
  part3: [
    {
      id: 201,
      part: 3,
      number: 1,
      chapterId: 5,
      chapterName: "Phương trình trong không gian",
      topic: "Khoảng cách từ một điểm đến mặt phẳng",
      content: "Cho hình lập phương $ABCD.MNPQ$ có cạnh bằng 6. Gọi $E$ là trung điểm của đoạn thẳng $AB$. Khoảng cách từ điểm $P$ đến mặt phẳng $(MED)$ bằng bao nhiêu (không làm tròn kết quả các phép tính trung gian, chỉ làm tròn kết quả cuối cùng đến hàng phần trăm)?",
      correctAnswer: "7,35",
      acceptableAnswers: ["7,35", "7.35"],
      explanation: "Cho hệ trục tọa độ $Oxyz$ có gốc trùng với đỉnh $D(0; 0; 0)$. Tia $Dx$ trùng với $DA$, tia $Dy$ trùng với $DC$, tia $Dz$ trùng với $DQ$.\nKhi đó tọa độ các điểm là: $D(0; 0; 0)$, $A(6; 0; 0)$, $B(6; 6; 0)$, $C(0; 6; 0)$, $M(6; 0; 6)$, $P(0; 6; 6)$.\nVì $E$ là trung điểm của $AB$ nên $E(6; 3; 0)$.\nTa tìm phương trình mặt phẳng $(MED)$:\n$$\\vec{DM} = (6; 0; 6), \\quad \\vec{DE} = (6; 3; 0)$$\nVectơ pháp tuyến của mặt phẳng $(MED)$ là:\n$$\\vec{n} = \\dfrac{1}{18}(\\vec{DM} \\times \\vec{DE}) = (-1; 2; 1) \\parallel (1; -2; -1)$$\nPhương trình mặt phẳng $(MED)$ đi qua $D(0; 0; 0)$ là: $x - 2y - z = 0$.\nKhoảng cách từ điểm $P(0; 6; 6)$ đến mặt phẳng $(MED)$ là:\n$$d(P, (MED)) = \\dfrac{|0 - 2(6) - 6|}{\\sqrt{1^2 + (-2)^2 + (-1)^2}} = \\dfrac{18}{\\sqrt{6}} = 3\\sqrt{6} \\approx 7{,}35$$"
    },
    {
      id: 202,
      part: 3,
      number: 2,
      chapterId: 6,
      chapterName: "Xác suất & Tổ hợp",
      topic: "Bài toán đếm và số dư",
      content: "Trong một trò chơi bạn Bình cần vượt qua một thử thách. Theo yêu cầu của thử thách, Bình cần điền tất cả 15 số thuộc tập hợp $\\{0; 1; 2; 3; 4; 5; 6; 7; 8; 10; 11; 12; 15; 16; 20\\}$ vào 15 ô vuông trong hình dưới đây thỏa mãn đồng thời ba điều kiện sau:\n- Mỗi ô điền đúng một số và mỗi số chỉ được sử dụng một lần;\n- Hiệu hai số ở hai ô bất kì khác nhau trên cùng một hàng không chia hết cho 5;\n- Hiệu hai số ở hai ô bất kì khác nhau trên cùng một cột không chia hết cho 5.\nHai cách điền gọi là giống nhau nếu số điền ở mỗi ô tương ứng trong 15 ô là giống nhau (không tính đến thứ tự điền các số vào 15 ô vuông). Gọi $H$ là số cách điền khác nhau để bạn Bình vượt qua được thử thách. Giá trị của $\\dfrac{H}{30}$ bằng bao nhiêu?",
      svgContent: `<svg width="340" height="245" viewBox="0 0 340 245" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <!-- Grid of 15 squares in stair structure -->
  <!-- Row 5 (1 cell at col 1) -->
  <rect x="80" y="20" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <!-- Row 4 (2 cells at col 1, 2) -->
  <rect x="80" y="55" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="125" y="55" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <!-- Row 3 (3 cells at col 1, 2, 3) -->
  <rect x="80" y="90" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="125" y="90" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="170" y="90" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <!-- Row 2 (4 cells at col 1, 2, 3, 4) -->
  <rect x="80" y="125" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="125" y="125" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="170" y="125" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="215" y="125" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <!-- Row 1 (5 cells at col 1, 2, 3, 4, 5) -->
  <rect x="80" y="160" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="125" y="160" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="170" y="160" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="215" y="160" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <rect x="260" y="160" width="45" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <!-- Row Labels on Left -->
  <text x="68" y="42" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="end" fill="#334155">Hàng 5</text>
  <text x="68" y="77" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="end" fill="#334155">Hàng 4</text>
  <text x="68" y="112" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="end" fill="#334155">Hàng 3</text>
  <text x="68" y="147" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="end" fill="#334155">Hàng 2</text>
  <text x="68" y="182" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="end" fill="#334155">Hàng 1</text>
  <!-- Column Labels Below -->
  <text x="102" y="215" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle" fill="#334155">Cột 1</text>
  <text x="147" y="215" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle" fill="#334155">Cột 2</text>
  <text x="192" y="215" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle" fill="#334155">Cột 3</text>
  <text x="237" y="215" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle" fill="#334155">Cột 4</text>
  <text x="282" y="215" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle" fill="#334155">Cột 5</text>
</svg>`,
      correctAnswer: "1152",
      acceptableAnswers: ["1152"],
      explanation: "Tập hợp gồm 15 số phân loại theo số dư khi chia cho 5:\n- Dư 0: $\\{0, 5, 10, 15, 20\\}$ (5 số)\n- Dư 1: $\\{1, 6, 11, 16\\}$ (4 số)\n- Dư 2: $\\{2, 7, 12\\}$ (3 số)\n- Dư 3: $\\{3, 8\\}$ (2 số)\n- Dư 4: $\\{4\\}$ (1 số)\nĐiều kiện bài toán yêu cầu các ô cùng hàng hoặc cùng cột phải có số dư khác nhau khi chia cho 5.\nDo cấu trúc của bảng có dạng hình bậc thang giảm dần (Hàng 1 có 5 ô, Hàng 2 có 4 ô, ..., Hàng 5 có 1 ô; và tương tự với các cột), cách sắp xếp các nhóm số dư vào cấu trúc này là duy nhất (mỗi hàng/cột kích thước $k$ chứa đúng các số dư có tần suất xuất hiện tương ứng).\nSố cách xếp các số thực tế vào các vị trí cố định của nhóm số dư tương ứng là:\n$$H = 5! \\cdot 4! \\cdot 3! \\cdot 2! \\cdot 1! = 120 \\cdot 24 \\cdot 6 \\cdot 2 \\cdot 1 = 34560\\text{ cách}$$\nGiá trị cần tìm là: $\\dfrac{H}{30} = \\dfrac{34560}{30} = 1152$."
    },
    {
      id: 203,
      part: 3,
      number: 3,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân tính thể tích khối tròn xoay",
      content: "Để chế tác một hạt cườm, người ta lấy một khối vật thể có dạng một khối tròn xoay được tạo thành khi quay hình phẳng giới hạn bởi trục $Ox$ và nửa trên của elip $\\dfrac{x^2}{1{,}5^2} + \\dfrac{y^2}{1^2} = 1$ (một đơn vị dài trên mỗi trục tọa độ tương ứng với một xăng-ti-mét trong thực tế) quanh trục $Ox$; sau đó khoan dọc theo trục xoay (xem hình dưới). Lỗ khoan có dạng hình trụ với bán kính $0{,}2\\text{ cm}$ và có trục nằm trên trục xoay. Phần còn lại sau khi khoan là hạt cườm, có dạng một khối tròn xoay. Thể tích của hạt cườm đó bằng bao nhiêu xăng-ti-mét khối (không làm tròn kết quả các phép tính trung gian, chỉ làm tròn kết quả cuối cùng đến hàng phần trăm)?",
      svgContent: `<svg width="600" height="230" viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <defs>
    <marker id="drill-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>
  <!-- LEFT PANEL: 2D Ellipse Cross Section with Drill Bit -->
  <g transform="translate(10, 10)">
    <!-- Axis lines -->
    <line x1="20" y1="90" x2="270" y2="90" stroke="#64748b" stroke-width="1" stroke-dasharray="6,3" />
    <line x1="180" y1="15" x2="180" y2="165" stroke="#64748b" stroke-width="1" stroke-dasharray="6,3" />
    <text x="185" y="25" font-family="Times New Roman, serif" font-style="italic" font-size="12" fill="#0f172a">y</text>
    <text x="260" y="85" font-family="Times New Roman, serif" font-style="italic" font-size="12" fill="#0f172a">x</text>
    <!-- Ellipse outline -->
    <ellipse cx="180" cy="90" rx="80" ry="55" fill="none" stroke="#0f172a" stroke-width="1.8" />
    <!-- Ellipse formula -->
    <text x="180" y="16" font-family="Times New Roman, serif" font-size="12" text-anchor="middle" fill="#0f172a">x²/1,5² + y²/1² = 1</text>
    <!-- Drill Bit coming from left -->
    <rect x="25" y="80" width="70" height="20" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
    <polygon points="95,80 125,90 95,100" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5" />
    <text x="40" y="65" font-family="sans-serif" font-size="11" font-weight="600" fill="#0f172a">Mũi khoan</text>
    <line x1="60" y1="68" x2="80" y2="78" stroke="#0f172a" stroke-width="1" marker-end="url(#drill-arr)" />
    <!-- Cylindrical hole dashed lines inside ellipse -->
    <line x1="102" y1="80" x2="258" y2="80" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" />
    <line x1="102" y1="100" x2="258" y2="100" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" />
    <!-- Dimension: r = 0.2 -->
    <line x1="120" y1="45" x2="120" y2="80" stroke="#0f172a" stroke-width="1" marker-end="url(#drill-arr)" />
    <text x="120" y="38" font-family="sans-serif" font-size="10" font-weight="600" text-anchor="middle" fill="#0f172a">Bán kính lỗ khoan 0,2</text>
    <!-- Trục xoay annotation -->
    <text x="45" y="115" font-family="sans-serif" font-size="10" font-weight="600" fill="#0f172a">Trục xoay</text>
  </g>
  <!-- RIGHT PANEL: 3D Ellipsoid Bead Perspective -->
  <g transform="translate(320, 10)">
    <!-- Axis lines -->
    <line x1="20" y1="90" x2="250" y2="90" stroke="#64748b" stroke-width="1" stroke-dasharray="6,3" />
    <line x1="150" y1="15" x2="150" y2="165" stroke="#64748b" stroke-width="1" stroke-dasharray="6,3" />
    <text x="155" y="25" font-family="Times New Roman, serif" font-style="italic" font-size="12" fill="#0f172a">y</text>
    <text x="245" y="85" font-family="Times New Roman, serif" font-style="italic" font-size="12" fill="#0f172a">x</text>
    <text x="155" y="100" font-family="Times New Roman, serif" font-size="11" fill="#0f172a">O</text>
    <!-- Ellipsoid 3D Body -->
    <ellipse cx="150" cy="90" rx="80" ry="55" fill="none" stroke="#0f172a" stroke-width="1.8" />
    <!-- 3D equator ellipse rings -->
    <ellipse cx="150" cy="90" rx="80" ry="16" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="4,3" />
    <!-- Cylindrical borehole openings -->
    <ellipse cx="70" cy="90" rx="5" ry="12" fill="#f1f5f9" stroke="#dc2626" stroke-width="1.5" />
    <ellipse cx="230" cy="90" rx="5" ry="12" fill="#f1f5f9" stroke="#dc2626" stroke-width="1.5" />
    <line x1="70" y1="78" x2="230" y2="78" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4,3" />
    <line x1="70" y1="102" x2="230" y2="102" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4,3" />
    <!-- Annotations -->
    <text x="150" y="16" font-family="Times New Roman, serif" font-size="12" text-anchor="middle" fill="#0f172a">x²/1,5² + y²/1² = 1</text>
    <text x="235" y="75" font-family="Times New Roman, serif" font-size="11" font-style="italic" fill="#dc2626">y = 0,2</text>
  </g>
  <!-- Caption Footer -->
  <text x="300" y="210" font-family="sans-serif" font-style="italic" font-size="11" text-anchor="middle" fill="#64748b">Lưu ý: Các kích thước trong hình minh họa có thể không đúng tỉ lệ thực tế.</text>
</svg>`,
      correctAnswer: "5,91",
      acceptableAnswers: ["5,91", "5.91"],
      unit: "cm³",
      explanation: "Phương trình nửa trên elip là $y = \\sqrt{1 - \\dfrac{x^2}{1{,}5^2}} = \\sqrt{1 - \\dfrac{x^2}{2{,}25}}$.\nĐường giới hạn của lỗ khoan là đường thẳng $y = 0{,}2$.\nGiao điểm của lỗ khoan và elip được xác định bởi phương trình:\n$$0{,}2 = \\sqrt{1 - \\dfrac{x^2}{2{,}25}} \\iff 0{,}04 = 1 - \\dfrac{x^2}{2{,}25} \\iff x^2 = 2{,}25 \\cdot 0{,}96 = 2{,}16 \\iff x = \\pm\\sqrt{2{,}16}$$\nThể tích khối tròn xoay còn lại của hạt cườm tính theo công thức tích phân:\n$$V = \\pi \\int_{-\\sqrt{2{,}16}}^{\\sqrt{2{,}16}} \\left(1 - \\dfrac{x^2}{2{,}25} - 0{,}04\\right)dx = \\pi \\int_{-\\sqrt{2{,}16}}^{\\sqrt{2{,}16}} \\left(0{,}96 - \\dfrac{x^2}{2{,}25}\\right)dx$$\n$$V = \\pi \\left[0{,}96x - \\dfrac{x^3}{6{,}75}\\right]_{-\\sqrt{2{,}16}}^{\\sqrt{2{,}16}} = 2\\pi \\sqrt{2{,}16} \\left(0{,}96 - \\dfrac{2{,}16}{6{,}75}\\right) = 2\\pi \\sqrt{2{,}16} \\cdot 0{,}64 = 1{,}28\\pi\\sqrt{2{,}16} \\approx 5{,}91\\text{ cm}^3$$"
    },
    {
      id: 204,
      part: 3,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất & Tổ hợp",
      topic: "Xác suất cổ điển và tổ hợp",
      content: "Một khung hình trang trí có dạng một đa giác đều 12 cạnh $A_1A_2\\dots A_{12}$ (xem hình dưới) được gắn cố định trên một trần nhà. Bạn Dũng có 12 bóng đèn gồm bốn bóng màu đỏ và tám bóng màu xanh, có công suất đôi một khác nhau. Bạn Dũng lắp ngẫu nhiên 12 bóng đèn trên vào 12 đỉnh $A_1, A_2, \\dots, A_{12}$ sao cho mỗi đỉnh có đúng một bóng đèn. Gọi $P$ là xác suất để mỗi hình vuông (có bốn đỉnh là các đỉnh của đa giác đã cho) đều có ít nhất một bóng đèn màu đỏ. Giá trị của $3190P$ bằng bao nhiêu?",
      svgContent: `<svg width="280" height="280" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
  <!-- Regular 12-gon polygon -->
  <polygon points="140,40 190,53.4 226.6,90 240,140 226.6,190 190,226.6 140,240 90,226.6 53.4,190 40,140 53.4,90 90,53.4" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
  <!-- Vertices (dots) and Labels -->
  <!-- A1 (top) -->
  <circle cx="140" cy="40" r="3.5" fill="#0f172a" />
  <text x="140" y="28" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="middle" fill="#0f172a">A₁</text>
  <!-- A2 -->
  <circle cx="190" cy="53.4" r="3.5" fill="#0f172a" />
  <text x="202" y="46" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" fill="#0f172a">A₂</text>
  <!-- A3 -->
  <circle cx="226.6" cy="90" r="3.5" fill="#0f172a" />
  <text x="238" y="88" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" fill="#0f172a">A₃</text>
  <!-- A4 -->
  <circle cx="240" cy="140" r="3.5" fill="#0f172a" />
  <text x="252" y="145" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" fill="#0f172a">A₄</text>
  <!-- A5 -->
  <circle cx="226.6" cy="190" r="3.5" fill="#0f172a" />
  <text x="238" y="200" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" fill="#0f172a">A₅</text>
  <!-- A6 -->
  <circle cx="190" cy="226.6" r="3.5" fill="#0f172a" />
  <text x="200" y="242" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" fill="#0f172a">A₆</text>
  <!-- A7 (bottom) -->
  <circle cx="140" cy="240" r="3.5" fill="#0f172a" />
  <text x="140" y="258" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="middle" fill="#0f172a">A₇</text>
  <!-- A8 -->
  <circle cx="90" cy="226.6" r="3.5" fill="#0f172a" />
  <text x="76" y="242" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="end" fill="#0f172a">A₈</text>
  <!-- A9 -->
  <circle cx="53.4" cy="190" r="3.5" fill="#0f172a" />
  <text x="40" y="200" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="end" fill="#0f172a">A₉</text>
  <!-- A10 -->
  <circle cx="40" cy="140" r="3.5" fill="#0f172a" />
  <text x="28" y="145" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="end" fill="#0f172a">A₁₀</text>
  <!-- A11 -->
  <circle cx="53.4" cy="90" r="3.5" fill="#0f172a" />
  <text x="40" y="88" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="end" fill="#0f172a">A₁₁</text>
  <!-- A12 -->
  <circle cx="90" cy="53.4" r="3.5" fill="#0f172a" />
  <text x="78" y="46" font-family="Times New Roman, serif" font-style="italic" font-weight="bold" font-size="14" text-anchor="end" fill="#0f172a">A₁₂</text>
</svg>`,
      correctAnswer: "1856",
      acceptableAnswers: ["1856"],
      explanation: "Đa giác đều 12 đỉnh tạo ra đúng 3 hình vuông phân biệt và không giao nhau về đỉnh, mỗi hình vuông chứa đúng 4 đỉnh:\n- Hình vuông 1: $\\{A_1, A_4, A_7, A_{10}\\}$\n- Hình vuông 2: $\\{A_2, A_5, A_8, A_{11}\\}$\n- Hình vuông 3: $\\{A_3, A_6, A_9, A_{12}\\}$\nĐể mỗi hình vuông đều chứa ít nhất một bóng màu đỏ trong tổng số 4 bóng đỏ, theo nguyên lý Dirichlet, số lượng bóng đỏ phân bố vào 3 hình vuông phải là một hoán vị của bộ số $(2, 1, 1)$:\n- Số cách chọn một hình vuông có 2 bóng đỏ: $C_3^1 = 3$ cách.\n- Số cách chọn vị trí cho 2 bóng đỏ trong hình vuông đó: $C_4^2 = 6$ cách.\n- Số cách chọn vị trí cho 1 bóng đỏ ở hình vuông thứ hai: $C_4^1 = 4$ cách.\n- Số cách chọn vị trí cho 1 bóng đỏ ở hình vuông thứ ba: $C_4^1 = 4$ cách.\nTổng số cách xếp thuận lợi cho biến cố là: $N_A = 3 \\cdot 6 \\cdot 4 \\cdot 4 = 288$ cách.\nTổng số cách chọn 4 vị trí ngẫu nhiên bất kỳ từ 12 đỉnh để đặt bóng đỏ là: $N_\\Omega = C_{12}^4 = 495$ cách.\nXác suất biến cố là: $P = \\dfrac{288}{495} = \\dfrac{32}{55}$.\nGiá trị cần tìm: $3190P = 3190 \\cdot \\dfrac{32}{55} = 1856$."
    },
    {
      id: 205,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đại số & Giải tích",
      topic: "Ứng dụng hệ phương trình bậc nhất ba ẩn",
      content: "Một nông trại cung cấp rau quả cho siêu thị A với số liệu bán hàng của bốn ngày trong tuần được ghi lại trong bảng sau:\n\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\textbf{Ngày} & \\textbf{Rau muống (kg)} & \\textbf{Bí xanh (kg)} & \\textbf{Cà chua (kg)} & \\textbf{Tổng số tiền (nghìn đồng)} \\\\ \\hline \\text{Thứ Tư} & 19 & 14 & 10 & 600 \\\\ \\hline \\text{Thứ Năm} & 20 & 12 & 8 & 540 \\\\ \\hline \\text{Thứ Sáu} & 25 & 12 & 7 & 570 \\\\ \\hline \\text{Thứ Bảy} & 50 & 25 & 20 & ? \\\\ \\hline \\end{array}$$\n\nBiết rằng đơn giá theo ki-lô-gam của mỗi loại rau quả trong bảng trên là không đổi. Tổng số tiền nông trại thu được ở ngày thứ Bảy từ ba loại rau quả trên khi cung cấp cho siêu thị A là bao nhiêu nghìn đồng?",
      correctAnswer: "1275",
      acceptableAnswers: ["1275"],
      unit: "nghìn đồng",
      explanation: "Gọi $x, y, z$ lần lượt là đơn giá một kg của rau muống, bí xanh và cà chua (đơn vị: nghìn đồng/kg).\nDựa vào bảng số liệu, ta có hệ phương trình tuyến tính:\n$$\\begin{cases} 19x + 14y + 10z = 600 \\\\ 20x + 12y + 8z = 540 \\\\ 25x + 12y + 7z = 570 \\end{cases}$$\nGiải hệ phương trình trên bằng phương pháp bấm máy tính hoặc Gauss, ta thu được đơn giá các loại quả:\n$x = 10, y = 15, z = 20$.\nSố tiền thu được của ngày Thứ Bảy là:\n$$T = 50x + 25y + 20z = 50(10) + 25(15) + 20(20) = 500 + 375 + 400 = 1275\\text{ nghìn đồng}$$"
    },
    {
      id: 206,
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

// Backwards compatibility alias
export const MOCK_EXAM_2025: ExamData = MOCK_EXAM_2026;

// Exam for Giữa Học Kì 1 (Focus Chapters 1, 2)
export const MOCK_EXAM_GIUA_KI_1: ExamData = {
  ...MOCK_EXAM_2026,
  id: "gk1-2026",
  title: "Đề Thi Thử Giữa Học Kì 1 (Trọng tâm Chương 1: Đạo hàm & Chương 2: Vectơ Oxyz)",
  milestone: "GIUA_KI_1",
};

// Exam for Cuối Học Kì 1 (Chapters 1, 2, 3)
export const MOCK_EXAM_CUOI_KI_1: ExamData = {
  ...MOCK_EXAM_2026,
  id: "ck1-2026",
  title: "Đề Thi Thử Cuối Học Kì 1 (Toàn diện Chương 1, 2, 3: Thống kê số liệu ghép nhóm)",
  milestone: "CUOI_KI_1",
};

// Exam for Giữa & Cuối Học Kì 2 (Chapters 4, 5, 6)
export const MOCK_EXAM_GIUA_CUOI_KI_2: ExamData = {
  ...MOCK_EXAM_2026,
  id: "hk2-2026",
  title: "Đề Thi Thử Học Kì 2 (Trọng tâm Chương 4: Tích phân, 5: Tọa độ không gian, 6: Xác suất điều kiện)",
  milestone: "GIUA_CUOI_KI_2",
};

export const EXAMS_BY_MILESTONE: Record<MilestoneType, ExamData> = {
  GIUA_KI_1: MOCK_EXAM_GIUA_KI_1,
  CUOI_KI_1: MOCK_EXAM_CUOI_KI_1,
  GIUA_CUOI_KI_2: MOCK_EXAM_GIUA_CUOI_KI_2,
  TOT_NGHIEP_THPT: MOCK_EXAM_2026,
};
