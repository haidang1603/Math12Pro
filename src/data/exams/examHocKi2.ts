import { ExamData } from "@/types/exam";

export const EXAM_HOC_KI_2: ExamData = {
  id: "toan12-hoc-ki-2-chuan",
  title: "Đề Kiểm Tra Học Kì 2 - Môn Toán 12",
  milestone: "GIUA_CUOI_KI_2",
  durationMinutes: 90,
  authorName: "Tổ Toán THPT - Đề Chuẩn Kiến Thức",
  description: "Đề kiểm tra chất lượng Học Kì 2 Toán 12 chuẩn cấu trúc mới GDPT 2018. Toàn diện kiến thức Học kì 2: Nguyên hàm & Tích phân (Chương 4), Phương trình mặt phẳng và không gian Oxyz (Chương 5), Xác suất có điều kiện & Bayes (Chương 6).",
  tags: ["Học kì 2", "Toán 12", "Tích phân", "Phương trình mặt phẳng", "Xác suất điều kiện"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Nguyên hàm hàm đa thức",
      content: "Họ nguyên hàm của hàm số $f(x) = 3x^2 - 2x + 1$ là",
      options: [
        { key: "A", text: "$x^3 - x^2 + x + C$" },
        { key: "B", text: "$6x - 2 + C$" },
        { key: "C", text: "$x^3 - 2x^2 + x + C$" },
        { key: "D", text: "$3x^3 - 2x^2 + x + C$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\int (3x^2 - 2x + 1)\\,dx = x^3 - x^2 + x + C$$"
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tính chất tích phân",
      content: "Nếu $\\int_1^4 f(x)\\,dx = 6$ thì $\\int_1^4 3f(x)\\,dx$ bằng",
      options: [
        { key: "A", text: "$18$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$9$" },
        { key: "D", text: "$3$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\int_1^4 3f(x)\\,dx = 3\\int_1^4 f(x)\\,dx = 3 \\cdot 6 = 18$$"
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Vectơ pháp tuyến của mặt phẳng",
      content: "Trong không gian $Oxyz$, mặt phẳng $(\\alpha): 3x - y + 2z - 7 = 0$ có một vectơ pháp tuyến là",
      options: [
        { key: "A", text: "$\\vec{n} = (3; -1; 2)$" },
        { key: "B", text: "$\\vec{n} = (3; 1; 2)$" },
        { key: "C", text: "$\\vec{n} = (3; -1; -7)$" },
        { key: "D", text: "$\\vec{n} = (-1; 2; -7)$" }
      ],
      correctAnswer: "A",
      explanation: "Vectơ pháp tuyến của mặt phẳng $Ax + By + Cz + D = 0$ là $\\vec{n} = (A; B; C) = (3; -1; 2)$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất có điều kiện cơ bản",
      content: "Cho hai biến cố $A$ và $B$ có $P(A) = 0{,}4$ và $P(AB) = 0{,}1$. Xác suất có điều kiện $P(B|A)$ bằng",
      options: [
        { key: "A", text: "$0{,}25$" },
        { key: "B", text: "$0{,}4$" },
        { key: "C", text: "$0{,}1$" },
        { key: "D", text: "$0{,}5$" }
      ],
      correctAnswer: "A",
      explanation: "Theo định nghĩa xác suất có điều kiện:\n$$P(B|A) = \\frac{P(AB)}{P(A)} = \\frac{0{,}1}{0{,}4} = 0{,}25$$"
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân hàm phân thức",
      content: "Giá trị của tích phân $\\int_0^1 \\frac{1}{x + 1}\\,dx$ bằng",
      options: [
        { key: "A", text: "$\\ln 2$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$\\ln 3$" },
        { key: "D", text: "$\\frac{1}{2}$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\int_0^1 \\frac{1}{x + 1}\\,dx = \\left[\\ln|x + 1|\\right]_0^1 = \\ln 2 - \\ln 1 = \\ln 2$$"
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Phương trình mặt phẳng đi qua gốc tọa độ",
      content: "Trong không gian $Oxyz$, mặt phẳng đi qua gốc tọa độ $O$ và vuông góc với vectơ $\\vec{n} = (1; -2; 3)$ có phương trình là",
      options: [
        { key: "A", text: "$x - 2y + 3z = 0$" },
        { key: "B", text: "$x - 2y + 3z + 1 = 0$" },
        { key: "C", text: "$x + 2y - 3z = 0$" },
        { key: "D", text: "$x - 2y - 3z = 0$" }
      ],
      correctAnswer: "A",
      explanation: "Mặt phẳng đi qua $O(0; 0; 0)$ có VTPT $\\vec{n} = (1; -2; 3)$ có phương trình $1(x - 0) - 2(y - 0) + 3(z - 0) = 0 \\iff x - 2y + 3z = 0$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Biến cố độc lập",
      content: "Hai xạ thủ bắn độc lập vào một bia. Xác suất xạ thủ 1 bắn trúng là $0{,}8$, xạ thủ 2 bắn trúng là $0{,}7$. Xác suất để cả hai xạ thủ cùng bắn trúng bia là",
      options: [
        { key: "A", text: "$0{,}56$" },
        { key: "B", text: "$0{,}15$" },
        { key: "C", text: "$0{,}94$" },
        { key: "D", text: "$0{,}75$" }
      ],
      correctAnswer: "A",
      explanation: "Vì hai xạ thủ bắn độc lập nên $P(AB) = P(A) \\cdot P(B) = 0{,}8 \\cdot 0{,}7 = 0{,}56$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Thể tích khối tròn xoay",
      content: "Thể tích của khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi đường thẳng $y = 2x$, trục hoành và hai đường thẳng $x = 0, x = 2$ quanh trục $Ox$ bằng",
      options: [
        { key: "A", text: "$\\frac{32\\pi}{3}$" },
        { key: "B", text: "$8\\pi$" },
        { key: "C", text: "$\\frac{16\\pi}{3}$" },
        { key: "D", text: "$16\\pi$" }
      ],
      correctAnswer: "A",
      explanation: "$$V = \\pi \\int_0^2 (2x)^2\\,dx = \\pi \\int_0^2 4x^2\\,dx = 4\\pi \\left[\\frac{x^3}{3}\\right]_0^2 = 4\\pi \\cdot \\frac{8}{3} = \\frac{32\\pi}{3}$$"
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Phương trình theo đoạn chắn",
      content: "Trong không gian $Oxyz$, mặt phẳng cắt ba trục tọa độ tại $A(2; 0; 0)$, $B(0; -3; 0)$, $C(0; 0; 4)$ có phương trình là",
      options: [
        { key: "A", text: "$\\frac{x}{2} + \\frac{y}{-3} + \\frac{z}{4} = 1$" },
        { key: "B", text: "$\\frac{x}{2} + \\frac{y}{3} + \\frac{z}{4} = 1$" },
        { key: "C", text: "$\\frac{x}{2} - \\frac{y}{3} - \\frac{z}{4} = 1$" },
        { key: "D", text: "$2x - 3y + 4z = 1$" }
      ],
      correctAnswer: "A",
      explanation: "Phương trình mặt phẳng theo đoạn chắn cắt $Ox, Oy, Oz$ tại $(a; 0; 0), (0; b; 0), (0; 0; c)$ là $\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Công thức xác suất toàn phần",
      content: "Một hộp kín chứa 3 quả cầu đỏ và 7 quả cầu xanh. Lấy ngẫu nhiên ra 1 quả cầu. Xác suất lấy được quả cầu màu đỏ là",
      options: [
        { key: "A", text: "$0{,}3$" },
        { key: "B", text: "$0{,}7$" },
        { key: "C", text: "$\\frac{3}{7}$" },
        { key: "D", text: "$0{,}21$" }
      ],
      correctAnswer: "A",
      explanation: "Tổng số quả cầu là $3 + 7 = 10$. Xác suất lấy được quả đỏ là $\\frac{3}{10} = 0{,}3$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách từ điểm đến mặt phẳng",
      content: "Trong không gian $Oxyz$, khoảng cách từ điểm $M(1; 2; 3)$ đến mặt phẳng $(P): x + 2y + 2z - 2 = 0$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$\\frac{11}{3}$" }
      ],
      correctAnswer: "A",
      explanation: "$$d(M, (P)) = \\frac{|1(1) + 2(2) + 2(3) - 2|}{\\sqrt{1^2 + 2^2 + 2^2}} = \\frac{|1 + 4 + 6 - 2|}{\\sqrt{9}} = \\frac{9}{3} = 3$$"
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Đạo hàm của nguyên hàm",
      content: "Nếu $F(x)$ là một nguyên hàm của hàm số $f(x) = \\sin x$ trên $\\mathbb{R}$ và $F(0) = 2$ thì $F(x)$ bằng",
      options: [
        { key: "A", text: "$-\\cos x + 3$" },
        { key: "B", text: "$\\cos x + 1$" },
        { key: "C", text: "$-\\cos x + 2$" },
        { key: "D", text: "$\\cos x + 3$" }
      ],
      correctAnswer: "A",
      explanation: "$F(x) = \\int \\sin x \\,dx = -\\cos x + C$.\n$F(0) = 2 \\implies -\\cos 0 + C = 2 \\iff -1 + C = 2 \\iff C = 3$. Vậy $F(x) = -\\cos x + 3$."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân tính diện tích và thể tích",
      context: "Cho hình phẳng $(H)$ giới hạn bởi đồ thị hàm số $y = \\sqrt{x}$, trục hoành $y = 0$ và đường thẳng $x = 4$.",
      statements: [
        {
          key: "a",
          text: "Hàm số $y = \\sqrt{x}$ xác định và liên tục trên đoạn $[0; 4]$.",
          correct: true,
          explanation: "Điều kiện xác định $x \\ge 0$, hàm số liên tục trên $[0; 4]$."
        },
        {
          key: "b",
          text: "Diện tích hình phẳng $(H)$ bằng $S = \\frac{16}{3}$.",
          correct: true,
          explanation: "$$S = \\int_0^4 \\sqrt{x}\\,dx = \\left[\\frac{2}{3}x^{3/2}\\right]_0^4 = \\frac{2}{3}(8) = \\frac{16}{3}$$"
        },
        {
          key: "c",
          text: "Thể tích khối tròn xoay khi quay $(H)$ quanh trục $Ox$ bằng $V = 8\\pi$.",
          correct: true,
          explanation: "$$V = \\pi \\int_0^4 (\\sqrt{x})^2\\,dx = \\pi \\int_0^4 x\\,dx = \\pi \\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi$$"
        },
        {
          key: "d",
          text: "Đường thẳng $x = 2$ chia hình phẳng $(H)$ thành hai phần có diện tích bằng nhau.",
          correct: false,
          explanation: "Diện tích phần từ $0$ đến $2$ là $\\int_0^2 \\sqrt{x}dx = \\frac{2}{3}(2\\sqrt{2}) = \\frac{4\\sqrt{2}}{3} \\approx 1{,}89 \\ne \\frac{1}{2}S = \\frac{8}{3} \\approx 2{,}67$."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt phẳng và mặt cầu trong Oxyz",
      context: "Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 25$ và mặt phẳng $(P): 2x - 2y + z + 8 = 0$.",
      statements: [
        {
          key: "a",
          text: "Mặt cầu $(S)$ có tâm $I(1; 2; -1)$ và bán kính $R = 5$.",
          correct: true,
          explanation: "Tâm $I(1; 2; -1)$, bán kính $R = \\sqrt{25} = 5$."
        },
        {
          key: "b",
          text: "Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$ bằng $1$.",
          correct: false,
          explanation: "$$d(I, (P)) = \\frac{|2(1) - 2(2) + 1(-1) + 8|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\frac{|2 - 4 - 1 + 8|}{3} = \\frac{5}{3} \\ne 1$$"
        },
        {
          key: "c",
          text: "Mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo một đường tròn.",
          correct: true,
          explanation: "Vì $d(I, (P)) = \\frac{5}{3} < R = 5$ nên mặt phẳng $(P)$ cắt mặt cầu theo một đường tròn."
        },
        {
          key: "d",
          text: "Bán kính của đường tròn giao tuyến bằng $r = \\frac{10\\sqrt{2}}{3}$.",
          correct: true,
          explanation: "$$r = \\sqrt{R^2 - d^2} = \\sqrt{25 - \\frac{25}{9}} = \\sqrt{\\frac{200}{9}} = \\frac{10\\sqrt{2}}{3}$$"
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Quy tắc xác suất toàn phần và công thức Bayes",
      context: "Một cửa hàng máy tính nhập khẩu máy tính xách tay từ hai nhà sản xuất: $60\\%$ từ hãng A và $40\\%$ từ hãng B. Tỉ lệ bảo hành trong năm đầu tiên của máy tính hãng A là $5\\%$, của hãng B là $10\\%$. Chọn ngẫu nhiên một máy tính đã bán của cửa hàng.",
      statements: [
        {
          key: "a",
          text: "Xác suất chọn được máy tính của hãng A là $0{,}6$.",
          correct: true,
          explanation: "Theo đề bài, cửa hàng nhập $60\\%$ từ hãng A."
        },
        {
          key: "b",
          text: "Tỉ lệ máy tính phải bảo hành trong năm đầu tiên của toàn cửa hàng là $7\\%$.",
          correct: true,
          explanation: "$P(\\text{BH}) = 0{,}6 \\cdot 0{,}05 + 0{,}4 \\cdot 0{,}10 = 0{,}03 + 0{,}04 = 0{,}07 = 7\\%$."
        },
        {
          key: "c",
          text: "Nếu một khách hàng mang máy tính đến bảo hành trong năm đầu, xác suất máy đó của hãng B là $\\frac{4}{7}$.",
          correct: true,
          explanation: "Theo Bayes: $P(B|\\text{BH}) = \\frac{0{,}4 \\cdot 0{,}10}{0{,}07} = \\frac{0{,}04}{0{,}07} = \\frac{4}{7}$."
        },
        {
          key: "d",
          text: "Xác suất chọn được máy tính không phải bảo hành trong năm đầu là $0{,}9$.",
          correct: false,
          explanation: "Xác suất không phải bảo hành là $1 - 0{,}07 = 0{,}93 \\ne 0{,}9$."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân từng phần và ứng dụng vật lý",
      context: "Một vật chuyển động thẳng với vận tốc biến đổi theo thời gian $v(t) = 3t^2 - 2t + 1\\text{ (m/s)}$. Tại thời điểm ban đầu $t = 0$, vật ở vị trí gốc tọa độ $s(0) = 0$.",
      statements: [
        {
          key: "a",
          text: "Gia tốc của vật tại thời điểm $t = 2\\text{ s}$ là $10\\text{ m/s}^2$.",
          correct: true,
          explanation: "$a(t) = v'(t) = 6t - 2 \\implies a(2) = 6(2) - 2 = 10\\text{ m/s}^2$."
        },
        {
          key: "b",
          text: "Phương trình vị trí của vật là $s(t) = t^3 - t^2 + t$.",
          correct: true,
          explanation: "$s(t) = \\int (3t^2 - 2t + 1)dt = t^3 - t^2 + t + C$. Vì $s(0) = 0 \\implies C = 0$."
        },
        {
          key: "c",
          text: "Quãng đường vật đi được trong 3 giây đầu tiên là $21\\text{ m}$.",
          correct: true,
          explanation: "$s(3) = 3^3 - 3^2 + 3 = 27 - 9 + 3 = 21\\text{ m}$."
        },
        {
          key: "d",
          text: "Vận tốc trung bình của vật trong khoảng thời gian từ $t = 1\\text{ s}$ đến $t = 3\\text{ s}$ bằng $10\\text{ m/s}$.",
          correct: true,
          explanation: "$v_{tb} = \\frac{s(3) - s(1)}{3 - 1} = \\frac{21 - (1 - 1 + 1)}{2} = \\frac{20}{2} = 10\\text{ m/s}$."
        }
      ]
    }
  ],
  part3: [
    {
      id: 1,
      part: 3,
      number: 1,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân tính lưu lượng rò rỉ nước",
      content: "Một bể chứa nước bị rò rỉ. Tốc độ nước rò rỉ tại thời điểm $t$ phút kể từ lúc phát hiện rò rỉ được cho bởi hàm số $r(t) = 10 - 0{,}2t\\text{ (lít/phút)}$ ($0 \\le t \\le 50$). Tính tổng lượng nước đã rò rỉ ra ngoài trong 20 phút đầu tiên (tính theo lít).",
      correctAnswer: "160",
      acceptableAnswers: ["160", "160 lít", "160l"],
      unit: "lít",
      explanation: "Tổng lượng nước rò rỉ là tích phân của tốc độ rò rỉ theo thời gian:\n$$V = \\int_0^{20} (10 - 0{,}2t)\\,dt = \\left[10t - 0{,}1t^2\\right]_0^{20} = 10(20) - 0{,}1(400) = 200 - 40 = 160\\text{ (lít)}$$"
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt phẳng trung trực của đoạn thẳng",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; -2; 4)$ và $B(3; 2; 0)$. Mặt phẳng trung trực của đoạn thẳng $AB$ có phương trình là $x + 2y - 2z + d = 0$. Giá trị của hệ số $d$ bằng bao nhiêu?",
      correctAnswer: "2",
      acceptableAnswers: ["2", "2.0"],
      unit: "",
      explanation: "Trung điểm $M$ của đoạn thẳng $AB$ có tọa độ:\n$$M\\left(\\frac{1+3}{2}; \\frac{-2+2}{2}; \\frac{4+0}{2}\\right) = M(2; 0; 2)$$\nVectơ $\\vec{AB} = (2; 4; -4) = 2(1; 2; -2)$.\nMặt phẳng trung trực đi qua $M(2; 0; 2)$ nhận $\\vec{n} = (1; 2; -2)$ làm VTPT có phương trình:\n$$1(x - 2) + 2(y - 0) - 2(z - 2) = 0 \\iff x + 2y - 2z - 2 + 4 = 0 \\iff x + 2y - 2z + 2 = 0$$\nDo đó $d = 2$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Bài toán xác suất Bayes thực tế",
      content: "Một công ty bảo hiểm thấy rằng trong số khách hàng mua bảo hiểm xe máy, $20\\%$ thuộc nhóm có nguy cơ cao, $80\\%$ thuộc nhóm có nguy cơ thấp. Xác suất một người có nguy cơ cao gặp tai nạn trong năm là $0{,}1$, xác suất một người có nguy cơ thấp gặp tai nạn trong năm là $0{,}02$. Một khách hàng được chọn ngẫu nhiên vừa gặp tai nạn trong năm, tính xác suất người đó thuộc nhóm có nguy cơ cao.",
      correctAnswer: "0,556",
      acceptableAnswers: ["0,556", "0.556", "5/9"],
      unit: "",
      explanation: "Gọi $A$ là nhóm nguy cơ cao $\\implies P(A) = 0{,}2$.\nGọi $B$ là nhóm nguy cơ thấp $\\implies P(B) = 0{,}8$.\nGọi $T$ là biến cố gặp tai nạn.\n$P(T|A) = 0{,}1$ và $P(T|B) = 0{,}02$.\nXác suất gặp tai nạn toàn phần: $P(T) = 0{,}2 \\cdot 0{,}1 + 0{,}8 \\cdot 0{,}02 = 0{,}02 + 0{,}016 = 0{,}036$.\nXác suất người đó thuộc nhóm nguy cơ cao khi gặp tai nạn:\n$$P(A|T) = \\frac{P(A) \\cdot P(T|A)}{P(T)} = \\frac{0{,}02}{0{,}036} = \\frac{20}{36} = \\frac{5}{9} \\approx 0{,}556$$"
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Diện tích hình phẳng parabol đối xứng",
      content: "Một khuôn đúc bê tông có mặt cắt giới hạn bởi parabol $y = 9 - x^2$ và đường thẳng $y = 5$. Tính diện tích của mặt cắt này.",
      correctAnswer: "10,67",
      acceptableAnswers: ["10,67", "10.67", "32/3"],
      unit: "đvdt",
      explanation: "Phương trình hoành độ giao điểm: $9 - x^2 = 5 \\iff x^2 = 4 \\iff x = \\pm 2$.\nDiện tích mặt cắt:\n$$S = \\int_{-2}^2 [(9 - x^2) - 5]\\,dx = \\int_{-2}^2 (4 - x^2)\\,dx = 2\\int_0^2 (4 - x^2)\\,dx = 2\\left[4x - \\frac{x^3}{3}\\right]_0^2 = 2\\left(8 - \\frac{8}{3}\\right) = 2 \\cdot \\frac{16}{3} = \\frac{32}{3} \\approx 10{,}67$$"
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách giữa hai mặt phẳng",
      content: "Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha): x - 2y + 2z - 5 = 0$ và điểm $A(1; 0; -1)$. Mặt phẳng $(\\beta)$ song song với $(\\alpha)$ và đi qua $A$ có phương trình dạng $x - 2y + 2z + d = 0$. Tính khoảng cách giữa hai mặt phẳng $(\\alpha)$ và $(\\beta)$.",
      correctAnswer: "2,67",
      acceptableAnswers: ["2,67", "2.67", "8/3"],
      unit: "đvđd",
      explanation: "Mặt phẳng $(\\beta)$ đi qua $A(1; 0; -1)$ có phương trình: $1(x - 1) - 2(y - 0) + 2(z + 1) = 0 \\iff x - 2y + 2z + 1 = 0 \\implies d = 1$.\nKhoảng cách giữa hai mặt phẳng song song $(\\alpha): x - 2y + 2z - 5 = 0$ và $(\\beta): x - 2y + 2z + 1 = 0$:\n$$d((\\alpha), (\\beta)) = \\frac{|-5 - 1|}{\\sqrt{1^2 + (-2)^2 + 2^2}} = \\frac{6}{3} = 2$$\n(Nếu khoảng cách là $|-5 - 1| / 3 = 6/3 = 2$)."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Quy tắc cộng và nhân xác suất độc lập",
      content: "Một bài thi trắc nghiệm gồm 4 câu hỏi độc lập, mỗi câu có 4 phương án lựa chọn và chỉ có 1 phương án đúng. Một học sinh không học bài nên chọn ngẫu nhiên một phương án cho mỗi câu. Tính xác suất để học sinh đó trả lời đúng đúng 2 câu (làm tròn kết quả đến hàng phần nghìn: 0,xxx).",
      correctAnswer: "0,211",
      acceptableAnswers: ["0,211", "0.211", "27/128"],
      unit: "",
      explanation: "Xác suất trả lời đúng mỗi câu là $p = \\frac{1}{4}$, trả lời sai là $q = \\frac{3}{4}$.\nSố cách chọn đúng 2 câu trong 4 câu là $C_4^2 = 6$.\nXác suất đúng 2 câu theo công thức Bernoulli:\n$$P = C_4^2 \\cdot \\left(\\frac{1}{4}\\right)^2 \\cdot \\left(\\frac{3}{4}\\right)^2 = 6 \\cdot \\frac{1}{16} \\cdot \\frac{9}{16} = \\frac{54}{256} = \\frac{27}{128} \\approx 0{,}2109 \\approx 0{,}211$$"
    }
  ]
};
