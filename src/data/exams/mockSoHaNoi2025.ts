import { ExamData } from "@/types/exam";

export const MOCK_EXAM_2025_SO_HN: ExamData = {
  id: "thpt-2025-khao-sat-so-hanoi",
  title: "Đề Khảo Sát Chất Lượng Học Sinh Lớp 12 Năm 2025 - Sở GD&ĐT Hà Nội",
  milestone: "TOT_NGHIEP_THPT",
  durationMinutes: 90,
  authorName: "Sở Giáo Dục và Đào Tạo Hà Nội",
  description: "Đề thi khảo sát chất lượng ôn thi Tốt nghiệp THPT 2025 môn Toán toàn thành phố Hà Nội, thiết kế chuẩn định dạng 3 phần GDPT 2018 với các câu hỏi kiểm tra tư duy và giải quyết vấn đề thực tế.",
  tags: ["Đề khảo sát 2025", "Sở GD Hà Nội", "Chuẩn Bộ GD&ĐT", "Toán 12"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận ngang",
      content: "Đường tiệm cận ngang của đồ thị hàm số $y = \\frac{3x - 1}{x + 1}$ là đường thẳng",
      options: [
        { key: "A", text: "$y = 3$" },
        { key: "B", text: "$y = -1$" },
        { key: "C", text: "$x = 3$" },
        { key: "D", text: "$x = -1$" }
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\lim_{x \\to \\pm\\infty} \\frac{3x - 1}{x + 1} = 3$. Do đó đường tiệm cận ngang là $y = 3$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Nguyên hàm hàm lượng giác",
      content: "Họ nguyên hàm của hàm số $f(x) = \\cos 2x$ là",
      options: [
        { key: "A", text: "$\\frac{1}{2} \\sin 2x + C$" },
        { key: "B", text: "$-\\frac{1}{2} \\sin 2x + C$" },
        { key: "C", text: "$2 \\sin 2x + C$" },
        { key: "D", text: "$-2 \\sin 2x + C$" }
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\int \\cos 2x \\,dx = \\frac{1}{2} \\sin 2x + C$."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ vectơ trong Oxyz",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (2; -1; 3)$ và $\\vec{v} = (1; 3; -2)$. Vectơ $2\\vec{u} + \\vec{v}$ có tọa độ là",
      options: [
        { key: "A", text: "$(5; 1; 4)$" },
        { key: "B", text: "$(5; -1; 4)$" },
        { key: "C", text: "$(3; 2; 1)$" },
        { key: "D", text: "$(5; 5; 4)$" }
      ],
      correctAnswer: "A",
      explanation: "$2\\vec{u} + \\vec{v} = 2(2; -1; 3) + (1; 3; -2) = (4; -2; 6) + (1; 3; -2) = (5; 1; 4)$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Phương trình mặt phẳng đi qua một điểm",
      content: "Trong không gian $Oxyz$, mặt phẳng đi qua điểm $M(1; -2; 4)$ và nhận vectơ $\\vec{n} = (2; 1; -3)$ làm vectơ pháp tuyến có phương trình là",
      options: [
        { key: "A", text: "$2x + y - 3z + 12 = 0$" },
        { key: "B", text: "$2x + y - 3z - 12 = 0$" },
        { key: "C", text: "$x - 2y + 4z - 12 = 0$" },
        { key: "D", text: "$2x + y - 3z + 10 = 0$" }
      ],
      correctAnswer: "A",
      explanation: "Phương trình mặt phẳng:\n$$2(x - 1) + 1(y + 2) - 3(z - 4) = 0 \\iff 2x + y - 3z - 2 + 2 + 12 = 0 \\iff 2x + y - 3z + 12 = 0$$"
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị hàm số",
      content: "Cho hàm số $y = x^3 - 3x^2 + 1$. Điểm cực đại của hàm số là",
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = 1$" },
        { key: "D", text: "$y = -3$" }
      ],
      correctAnswer: "A",
      explanation: "Đạo hàm: $y' = 3x^2 - 6x = 3x(x - 2)$. $y' = 0 \\iff x = 0$ hoặc $x = 2$.\n$y'' = 6x - 6 \\implies y''(0) = -6 < 0$ nên điểm cực đại của hàm số là $x = 0$."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Số trung bình mẫu ghép nhóm",
      content: "Bảng tần số ghép nhóm sau cho biết cân nặng (kg) của 20 học sinh:\n$$\\begin{array}{|c|c|c|c|}\\hline \\text{Cân nặng (kg)} & [40; 45) & [45; 50) & [50; 55) \\\\ \\hline \\text{Số học sinh} & 5 & 10 & 5 \\\\ \\hline \\end{array}$$\nCân nặng trung bình của 20 học sinh này bằng",
      options: [
        { key: "A", text: "$47{,}5\\text{ kg}$" },
        { key: "B", text: "$45\\text{ kg}$" },
        { key: "C", text: "$46\\text{ kg}$" },
        { key: "D", text: "$48\\text{ kg}$" }
      ],
      correctAnswer: "A",
      explanation: "Giá trị đại diện các nhóm: $c_1 = 42{,}5; c_2 = 47{,}5; c_3 = 52{,}5$.\nDo tính đối xứng của tần số (5, 10, 5), cân nặng trung bình là $\\bar{x} = 47{,}5\\text{ kg}$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Biến cố hợp và giao",
      content: "Cho hai biến cố $A$ và $B$ xung khắc với nhau có $P(A) = 0{,}3$ và $P(B) = 0{,}4$. Xác suất của biến cố hợp $A \\cup B$ bằng",
      options: [
        { key: "A", text: "$0{,}7$" },
        { key: "B", text: "$0{,}12$" },
        { key: "C", text: "$0{,}1$" },
        { key: "D", text: "$0{,}58$" }
      ],
      correctAnswer: "A",
      explanation: "Vì hai biến cố $A$ và $B$ xung khắc nên $P(A \\cup B) = P(A) + P(B) = 0{,}3 + 0{,}4 = 0{,}7$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân cơ bản",
      content: "Biết $\\int_0^2 f(x)\\,dx = 3$ và $\\int_0^2 g(x)\\,dx = -2$. Khi đó $\\int_0^2 [f(x) - 2g(x)]\\,dx$ bằng",
      options: [
        { key: "A", text: "$7$" },
        { key: "B", text: "$-1$" },
        { key: "C", text: "$5$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\int_0^2 [f(x) - 2g(x)]\\,dx = \\int_0^2 f(x)\\,dx - 2\\int_0^2 g(x)\\,dx = 3 - 2(-2) = 3 + 4 = 7$$"
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách từ gốc tọa độ đến mặt phẳng",
      content: "Trong không gian $Oxyz$, khoảng cách từ gốc tọa độ $O(0; 0; 0)$ đến mặt phẳng $(P): 2x - y + 2z - 6 = 0$ bằng",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$6$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$\\frac{2}{3}$" }
      ],
      correctAnswer: "A",
      explanation: "$$d(O, (P)) = \\frac{|-6|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{6}{\\sqrt{9}} = 2$$"
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng đồ thị hàm số",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{x + 3}{x - 1}$ là điểm",
      options: [
        { key: "A", text: "$I(1; 1)$" },
        { key: "B", text: "$I(-1; 1)$" },
        { key: "C", text: "$I(1; 3)$" },
        { key: "D", text: "$I(-3; 1)$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận đứng là $x = 1$, tiệm cận ngang là $y = 1$. Giao điểm của hai tiệm cận là $I(1; 1)$, chính là tâm đối xứng của đồ thị."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Công thức nhân xác suất",
      content: "Gieo đồng thời hai con xúc xắc cân đối đồng chất. Xác suất để tổng số chấm xuất hiện trên hai mặt bằng $7$ là",
      options: [
        { key: "A", text: "$\\frac{1}{6}$" },
        { key: "B", text: "$\\frac{7}{36}$" },
        { key: "C", text: "$\\frac{5}{36}$" },
        { key: "D", text: "$\\frac{1}{12}$" }
      ],
      correctAnswer: "A",
      explanation: "Không gian mẫu có $n(\\Omega) = 6 \\times 6 = 36$. Các cặp có tổng bằng 7: $(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)$ gồm 6 khả năng.\nXác suất là $\\frac{6}{36} = \\frac{1}{6}$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tích vô hướng",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{a} = (2; 1; -2)$ và $\\vec{b} = (1; 0; 3)$. Tích vô hướng $\\vec{a} \\cdot \\vec{b}$ bằng",
      options: [
        { key: "A", text: "$-4$" },
        { key: "B", text: "$8$" },
        { key: "C", text: "$2$" },
        { key: "D", text: "$-1$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\vec{a} \\cdot \\vec{b} = 2(1) + 1(0) + (-2)(3) = 2 + 0 - 6 = -4$$"
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát tính đơn điệu và bảng biến thiên",
      context: "Cho hàm số $y = f(x) = \\frac{2x - 1}{x - 1}$.",
      statements: [
        {
          key: "a",
          text: "Hàm số đã cho có tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$.",
          correct: true,
          explanation: "Điều kiện mẫu khác 0: $x - 1 \\ne 0 \\iff x \\ne 1$."
        },
        {
          key: "b",
          text: "Đạo hàm của hàm số là $f'(x) = \\frac{-1}{(x - 1)^2}$.",
          correct: true,
          explanation: "$$f'(x) = \\frac{2(x - 1) - 1(2x - 1)}{(x - 1)^2} = \\frac{2x - 2 - 2x + 1}{(x - 1)^2} = \\frac{-1}{(x - 1)^2}$$"
        },
        {
          key: "c",
          text: "Hàm số đồng biến trên từng khoảng xác định $(-\\infty; 1)$ và $(1; +\\infty)$.",
          correct: false,
          explanation: "Vì $f'(x) = \\frac{-1}{(x - 1)^2} < 0$ với mọi $x \\ne 1$, nên hàm số nghịch biến trên từng khoảng xác định."
        },
        {
          key: "d",
          text: "Đồ thị hàm số có tiệm cận đứng $x = 1$ và tiệm cận ngang $y = 2$.",
          correct: true,
          explanation: "$\\lim_{x \\to 1} f(x) = \\infty \\implies x = 1$ là tiệm cận đứng. $\\lim_{x \\to \\pm\\infty} f(x) = 2 \\implies y = 2$ là tiệm cận ngang."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt cầu và tiếp diện",
      context: "Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 2)^2 + (y + 1)^2 + (z - 1)^2 = 9$ và điểm $A(2; -1; 4)$.",
      statements: [
        {
          key: "a",
          text: "Mặt cầu $(S)$ có tâm $I(2; -1; 1)$ và bán kính $R = 3$.",
          correct: true,
          explanation: "Tâm $I(2; -1; 1)$, bán kính $R = \\sqrt{9} = 3$."
        },
        {
          key: "b",
          text: "Điểm $A(2; -1; 4)$ nằm trên mặt cầu $(S)$.",
          correct: true,
          explanation: "Thay tọa độ $A$ vào $(S)$: $(2 - 2)^2 + (-1 + 1)^2 + (4 - 1)^2 = 0 + 0 + 9 = 9$ (thỏa mãn)."
        },
        {
          key: "c",
          text: "Mặt phẳng tiếp xúc với mặt cầu $(S)$ tại điểm $A$ có phương trình là $z - 4 = 0$.",
          correct: true,
          explanation: "Vectơ pháp tuyến của tiếp diện là $\\vec{IA} = (2 - 2; -1 - (-1); 4 - 1) = (0; 0; 3) = 3(0; 0; 1)$. Phương trình tiếp diện qua $A$: $0(x - 2) + 0(y + 1) + 1(z - 4) = 0 \\iff z - 4 = 0$."
        },
        {
          key: "d",
          text: "Mặt phẳng $(Oxy)$ cắt mặt cầu $(S)$ theo một đường tròn có chu vi bằng $6\\pi$.",
          correct: false,
          explanation: "Khoảng cách từ tâm $I$ đến $(Oxy)$ là $d = |z_I| = 1 < R = 3$. Bán kính đường tròn giao tuyến: $r = \\sqrt{R^2 - d^2} = \\sqrt{9 - 1} = \\sqrt{8} = 2\\sqrt{2}$. Chu vi đường tròn là $2\\pi r = 4\\sqrt{2}\\pi \\ne 6\\pi$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Đặc trưng phân tán thống kê ghép nhóm",
      context: "Điểm kiểm tra giữa kì môn Toán của một khối 12 được thống kê trong bảng sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Điểm} & [0; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 10 & 30 & 45 & 15 \\\\ \\hline \\end{array}$$",
      statements: [
        {
          key: "a",
          text: "Tổng số học sinh tham gia kiểm tra là $100$ em.",
          correct: true,
          explanation: "$10 + 30 + 45 + 15 = 100$ học sinh."
        },
        {
          key: "b",
          text: "Số học sinh đạt từ điểm $6$ trở lên chiếm $60\\%$.",
          correct: true,
          explanation: "Số học sinh đạt từ 6 trở lên là $45 + 15 = 60$ em. Tỉ lệ: $\\frac{60}{100} = 60\\%$."
        },
        {
          key: "c",
          text: "Nhóm chứa trung vị là nhóm $[6; 8)$.",
          correct: true,
          explanation: "$\\frac{n}{2} = 50$. Tần số tích lũy: $cf_1 = 10, cf_2 = 40 < 50 \\le cf_3 = 85$. Nhóm chứa trung vị là $[6; 8)$."
        },
        {
          key: "d",
          text: "Khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q = 3{,}5$.",
          correct: false,
          explanation: "Tứ phân vị $Q_1$ thuộc nhóm $[4; 6)$ và $Q_3$ thuộc nhóm $[6; 8)$. Tính toán chi tiết cho ra $\\Delta_Q \\approx 2{,}33 \\ne 3{,}5$."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Công thức xác suất điều kiện và Bayes",
      context: "Trong một kì thi tuyển sinh, có $60\\%$ thí sinh là nữ và $40\\%$ thí sinh là nam. Tỉ lệ thí sinh nữ trúng tuyển là $20\\%$, tỉ lệ thí sinh nam trúng tuyển là $25\\%$. Chọn ngẫu nhiên một thí sinh tham gia kì thi.",
      statements: [
        {
          key: "a",
          text: "Xác suất chọn được một thí sinh nữ trúng tuyển là $0{,}12$.",
          correct: true,
          explanation: "$P(\\text{Nữ} \\cap \\text{Đỗ}) = 0{,}6 \\cdot 0{,}20 = 0{,}12$."
        },
        {
          key: "b",
          text: "Tỉ lệ trúng tuyển chung của toàn bộ kì thi là $22\\%$.",
          correct: true,
          explanation: "$P(\\text{Đỗ}) = 0{,}6 \\cdot 0{,}20 + 0{,}4 \\cdot 0{,}25 = 0{,}12 + 0{,}10 = 0{,}22 = 22\\%$."
        },
        {
          key: "c",
          text: "Biết thí sinh đó trúng tuyển, xác suất thí sinh đó là nam bằng $\\frac{5}{11}$.",
          correct: true,
          explanation: "Áp dụng Bayes: $P(\\text{Nam}|\\text{Đỗ}) = \\frac{0{,}10}{0{,}22} = \\frac{10}{22} = \\frac{5}{11}$."
        },
        {
          key: "d",
          text: "Biết thí sinh đó không trúng tuyển, xác suất thí sinh đó là nữ nhỏ hơn $50\\%$.",
          correct: false,
          explanation: "Số thí sinh nữ trượt: $0{,}6 \\cdot 0{,}8 = 0{,}48$. Tổng thí sinh trượt: $1 - 0{,}22 = 0{,}78$. Xác suất nữ khi biết trượt: $\\frac{0{,}48}{0{,}78} = \\frac{48}{78} \\approx 61{,}5\\% > 50\\%$."
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
      topic: "Tối ưu hóa kinh tế thực tế",
      content: "Một công ty du lịch dự định tổ chức một tour tham quan với chi phí mỗi khách là $2$ triệu đồng nếu nhóm có đúng $30$ người. Cứ thêm một khách thì công ty giảm giá cho mỗi người $40$ nghìn đồng ($0{,}04$ triệu đồng). Biết chi phí cố định của chuyến đi là $15$ triệu đồng và mỗi khách công ty phải chi thêm $0{,}5$ triệu đồng tiền ăn ở. Hỏi công ty cần nhận nhóm có bao nhiêu khách để đạt lợi nhuận lớn nhất?",
      correctAnswer: "34",
      acceptableAnswers: ["34", "34 người", "34 khách"],
      unit: "người",
      explanation: "Gọi $x$ là số khách tăng thêm so với 30 ($x \\ge 0$). Tổng số khách là $30 + x$.\nGiá vé mỗi khách: $2 - 0{,}04x$ (triệu đồng).\nDoanh thu: $R(x) = (30 + x)(2 - 0{,}04x) = 60 + 2x - 1{,}2x - 0{,}04x^2 = 60 + 0{,}8x - 0{,}04x^2$.\nTổng chi phí: $C(x) = 15 + 0{,}5(30 + x) = 30 + 0{,}5x$.\nLợi nhuận: $P(x) = R(x) - C(x) = (60 + 0{,}8x - 0{,}04x^2) - (30 + 0{,}5x) = -0{,}04x^2 + 0{,}3x + 30$.\nĐỉnh parabol tại $x = -\\frac{0{,}3}{2(-0{,}04)} = \\frac{0{,}3}{0{,}08} = 3{,}75$.\nVì số khách nguyên, xét $x = 3$ và $x = 4$:\n- $P(3) = -0{,}04(9) + 0{,}9 + 30 = 30{,}54$\n- $P(4) = -0{,}04(16) + 1{,}2 + 30 = 30{,}56$\nLợi nhuận lớn nhất đạt tại $x = 4$. Vậy tổng số khách là $30 + 4 = 34$ khách."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Diện tích hình phẳng",
      content: "Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số $y = x^3 - 3x$ và trục hoành trên đoạn $[0; 2]$.",
      correctAnswer: "2,5",
      acceptableAnswers: ["2,5", "2.5", "5/2"],
      unit: "đvdt",
      explanation: "Phương trình hoành độ giao điểm trên $[0; 2]$:\n$$x^3 - 3x = 0 \\iff x = 0 \\text{ hoặc } x = \\sqrt{3}$$\nDiện tích:\n$$S = \\int_0^{\\sqrt{3}} -(x^3 - 3x)\\,dx + \\int_{\\sqrt{3}}^2 (x^3 - 3x)\\,dx$$\n$$= \\left[-\\frac{x^4}{4} + \\frac{3x^2}{2}\\right]_0^{\\sqrt{3}} + \\left[\\frac{x^4}{4} - \\frac{3x^2}{2}\\right]_{\\sqrt{3}}^2$$\n$$= \\left(-\\frac{9}{4} + \\frac{9}{2}\\right) + \\left(4 - 6 - \\left(\\frac{9}{4} - \\frac{9}{2}\\right)\\right) = \\frac{9}{4} + \\left(-2 + \\frac{9}{4}\\right) = \\frac{9}{4} + \\frac{1}{4} = \\frac{10}{4} = 2{,}5$$"
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Vị trí thực tế tọa độ không gian",
      content: "Một trạm rada quân sự đặt tại gốc tọa độ $O(0; 0; 0)$. Một máy bay trinh sát đang bay thẳng đều theo đường thẳng đi qua điểm $A(2; 1; 2)$ với vectơ chỉ phương $\\vec{u} = (1; 2; -2)$ (đơn vị tọa độ là km). Khoảng cách ngắn nhất từ trạm rada $O$ đến đường bay của máy bay bằng bao nhiêu km?",
      correctAnswer: "2",
      acceptableAnswers: ["2", "2.0", "2km"],
      unit: "km",
      explanation: "Khoảng cách từ điểm $O$ đến đường thẳng $\\Delta$ đi qua $A$ có VTCP $\\vec{u}$:\n$$[\\vec{OA}, \\vec{u}] = \\left(\\begin{vmatrix} 1 & 2 \\\\ 2 & -2 \\end{vmatrix}; \\begin{vmatrix} 2 & 2 \\\\ -2 & 1 \\end{vmatrix}; \\begin{vmatrix} 2 & 1 \\\\ 1 & 2 \\end{vmatrix}\\right) = (-6; 6; 3)$$\n$$|[\\vec{OA}, \\vec{u}]| = \\sqrt{(-6)^2 + 6^2 + 3^2} = \\sqrt{36 + 36 + 9} = \\sqrt{81} = 9$$\n$$|\\vec{u}| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{9} = 3$$\nKhoảng cách ngắn nhất là $d = \\frac{|[\\vec{OA}, \\vec{u}]|}{|\\vec{u}|} = \\frac{9}{3} = 3\\text{ km}$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất thực nghiệm kiểm tra chất lượng",
      content: "Một kiện hàng gồm 100 sản phẩm, trong đó có 5 sản phẩm hỏng. Người kiểm tra lấy ngẫu nhiên liên tiếp 2 sản phẩm (không hoàn lại). Xác suất để cả hai sản phẩm lấy ra đều là sản phẩm tốt bằng bao nhiêu? (Làm tròn kết quả đến hàng phần nghìn: dạng 0,xxx).",
      correctAnswer: "0,902",
      acceptableAnswers: ["0,902", "0.902"],
      unit: "",
      explanation: "Số sản phẩm tốt là $100 - 5 = 95$ sản phẩm.\nXác suất lấy lần 1 được sản phẩm tốt là $\\frac{95}{100}$.\nXác suất lấy lần 2 được sản phẩm tốt là $\\frac{94}{99}$.\nXác suất cả 2 lần đều tốt là:\n$$P = \\frac{95}{100} \\times \\frac{94}{99} = \\frac{8930}{9900} \\approx 0{,}90202 \\approx 0{,}902$$"
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Mốt của số liệu ghép nhóm",
      content: "Cho mẫu số liệu ghép nhóm về cự ly nhảy xa (mét) của 40 học sinh như sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Cự ly (m)} & [3{,}0; 3{,}5) & [3{,}5; 4{,}0) & [4{,}0; 4{,}5) & [4{,}5; 5{,}0) \\\\ \\hline \\text{Tần số} & 6 & 16 & 12 & 6 \\\\ \\hline \\end{array}$$\nTính mốt $M_o$ của mẫu số liệu ghép nhóm này (làm tròn kết quả đến hai chữ số thập phân).",
      correctAnswer: "3,86",
      acceptableAnswers: ["3,86", "3.86"],
      unit: "m",
      explanation: "Nhóm chứa mốt là $[3{,}5; 4{,}0)$ vì có tần số $n_m = 16$ lớn nhất.\nĐộ dài nhóm $h = 4{,}0 - 3{,}5 = 0{,}5$.\nTần số nhóm trước $n_{m-1} = 6$, tần số nhóm sau $n_{m+1} = 12$.\nCông thức mốt:\n$$M_o = 3{,}5 + \\frac{16 - 6}{(16 - 6) + (16 - 12)} \\cdot 0{,}5 = 3{,}5 + \\frac{10}{10 + 4} \\cdot 0{,}5 = 3{,}5 + \\frac{5}{14} \\approx 3{,}5 + 0{,}357 = 3{,}857 \\approx 3{,}86\\text{ (m)}$$"
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng hình học tối ưu",
      content: "Một bể bơi hình chữ nhật có diện tích mặt nước là $50\\text{ m}^2$. Người ta muốn làm một lối đi dạo lát gạch xung quanh bể bơi: hai cạnh dài của bể bơi lối đi rộng $1\\text{ m}$, hai cạnh ngắn của bể bơi lối đi rộng $2\\text{ m}$. Hỏi chiều rộng của bể bơi bằng bao nhiêu mét để diện tích toàn bộ khu vực (gồm cả bể bơi và lối đi dạo) là nhỏ nhất?",
      correctAnswer: "5",
      acceptableAnswers: ["5", "5.0", "5m"],
      unit: "m",
      explanation: "Gọi $x$ là chiều rộng và $y$ là chiều dài của bể bơi ($x > 0, y > 0$).\nDiện tích bể bơi: $x \\cdot y = 50 \\implies y = \\frac{50}{x}$.\nLối đi dạo phía hai cạnh ngắn rộng $2\\text{ m}$, hai cạnh dài rộng $1\\text{ m}$.\nChiều rộng tổng thể khu vực: $x + 2(1) = x + 2$ (m).\nChiều dài tổng thể khu vực: $y + 2(2) = y + 4 = \\frac{50}{x} + 4$ (m).\nDiện tích toàn bộ khu đất:\n$$S(x) = (x + 2)\\left(\\frac{50}{x} + 4\\right) = 50 + 4x + \\frac{100}{x} + 8 = 4x + \\frac{100}{x} + 58$$\nÁp dụng bất đẳng thức Cauchy hoặc đạo hàm $S'(x) = 4 - \\frac{100}{x^2} = 0 \\iff x^2 = 25 \\iff x = 5\\text{ (m)}$.\nVậy chiều rộng bể bơi bằng $5\\text{ m}$ thì diện tích toàn khu vực là nhỏ nhất."
    }
  ]
};
