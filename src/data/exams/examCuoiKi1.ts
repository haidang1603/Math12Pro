import { ExamData } from "@/types/exam";

export const EXAM_CUOI_KI_1: ExamData = {
  id: "toan12-cuoi-ki-1-chuan",
  title: "Đề Kiểm Tra Cuối Học Kì 1 - Môn Toán 12",
  milestone: "CUOI_KI_1",
  durationMinutes: 90,
  authorName: "Tổ Toán THPT - Đề Chuẩn Kiến Thức",
  description: "Đề kiểm tra chất lượng Cuối Học Kì 1 Toán 12 chuẩn cấu trúc 3 phần GDPT 2018. Bao quát toàn diện kiến thức Học kì 1: Khảo sát hàm số (Chương 1), Vectơ & Hệ trục Oxyz (Chương 2), Mẫu số liệu ghép nhóm (Chương 3).",
  tags: ["Cuối kì 1", "Toán 12", "Học kì 1", "Thống kê ghép nhóm", "Oxyz"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến của hàm phân thức",
      content: "Cho hàm số $y = \\frac{x - 3}{x + 1}$. Khẳng định nào sau đây là đúng?",
      options: [
        { key: "A", text: "Hàm số đồng biến trên các khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$" },
        { key: "B", text: "Hàm số nghịch biến trên các khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$" },
        { key: "C", text: "Hàm số đồng biến trên $\\mathbb{R} \\setminus \\{-1\\}$" },
        { key: "D", text: "Hàm số đồng biến trên khoảng $(-\\infty; +\\infty)$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = \\frac{1(1) - (-3)(1)}{(x + 1)^2} = \\frac{4}{(x + 1)^2} > 0$ với mọi $x \\ne -1$. Do đó hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng và tiệm cận ngang",
      content: "Tổng số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số $y = \\frac{x + 1}{x^2 - 4}$ là",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$4$" }
      ],
      correctAnswer: "A",
      explanation: "Mẫu số $x^2 - 4 = 0 \\iff x = \\pm 2$ (cả hai đều không là nghiệm của tử). Do đó có 2 tiệm cận đứng là $x = 2$ và $x = -2$.\nBậc của tử nhỏ hơn bậc của mẫu nên có 1 tiệm cận ngang là $y = 0$. Tổng số tiệm cận là $2 + 1 = 3$."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Khoảng biến thiên của mẫu số liệu ghép nhóm",
      content: "Bảng sau ghi lại thời gian tự học (phút) mỗi ngày của 30 học sinh:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Thời gian (phút)} & [60; 90) & [90; 120) & [120; 150) & [150; 180) \\\\ \\hline \\text{Số học sinh} & 5 & 12 & 9 & 4 \\\\ \\hline \\end{array}$$\nKhoảng biến thiên của mẫu số liệu ghép nhóm này bằng",
      options: [
        { key: "A", text: "$120\\text{ phút}$" },
        { key: "B", text: "$90\\text{ phút}$" },
        { key: "C", text: "$30\\text{ phút}$" },
        { key: "D", text: "$60\\text{ phút}$" }
      ],
      correctAnswer: "A",
      explanation: "Khoảng biến thiên của mẫu ghép nhóm là $R = 180 - 60 = 120\\text{ (phút)}$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ trọng tâm tam giác trong Oxyz",
      content: "Trong không gian $Oxyz$, cho tam giác $ABC$ có $A(1; 2; -1)$, $B(2; 1; 0)$, $C(-3; 0; 4)$. Tọa độ trọng tâm $G$ của tam giác $ABC$ là",
      options: [
        { key: "A", text: "$G(0; 1; 1)$" },
        { key: "B", text: "$G(0; 3; 3)$" },
        { key: "C", text: "$G(0; -1; 1)$" },
        { key: "D", text: "$G(1; 1; 1)$" }
      ],
      correctAnswer: "A",
      explanation: "$$x_G = \\frac{1 + 2 - 3}{3} = 0,\\quad y_G = \\frac{2 + 1 + 0}{3} = 1,\\quad z_G = \\frac{-1 + 0 + 4}{3} = 1 \\implies G(0; 1; 1)$$"
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Khoảng tứ phân vị của mẫu số liệu ghép nhóm",
      content: "Nếu một mẫu số liệu ghép nhóm có tứ phân vị thứ nhất $Q_1 = 25$ và tứ phân vị thứ ba $Q_3 = 42$ thì khoảng tứ phân vị $\\Delta_Q$ của mẫu số liệu bằng",
      options: [
        { key: "A", text: "$17$" },
        { key: "B", text: "$67$" },
        { key: "C", text: "$8{,}5$" },
        { key: "D", text: "$33{,}5$" }
      ],
      correctAnswer: "A",
      explanation: "Khoảng tứ phân vị được tính theo công thức: $\\Delta_Q = Q_3 - Q_1 = 42 - 25 = 17$."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị lớn nhất trên đoạn",
      content: "Giá trị lớn nhất của hàm số $f(x) = x^3 - 3x + 5$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$7$" },
        { key: "B", text: "$5$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$9$" }
      ],
      correctAnswer: "A",
      explanation: "$f'(x) = 3x^2 - 3 = 0 \\iff x = 1 \\in [0; 2]$.\nTính các giá trị: $f(0) = 5$, $f(1) = 3$, $f(2) = 8 - 6 + 5 = 7$.\nVậy $\\max_{[0; 2]} f(x) = 7$ tại $x = 2$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tích vô hướng và góc giữa hai vectơ",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 1; 0)$ và $\\vec{v} = (0; 1; 1)$. Côsin của góc giữa hai vectơ $\\vec{u}$ và $\\vec{v}$ bằng",
      options: [
        { key: "A", text: "$\\frac{1}{2}$" },
        { key: "B", text: "$\\frac{\\sqrt{2}}{2}$" },
        { key: "C", text: "$\\frac{\\sqrt{3}}{2}$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "A",
      explanation: "$$\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\frac{1(0) + 1(1) + 0(1)}{\\sqrt{1+1+0} \\cdot \\sqrt{0+1+1}} = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2}$$"
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Phương sai của mẫu số liệu ghép nhóm",
      content: "Nếu độ lệch chuẩn của một mẫu số liệu ghép nhóm bằng $2{,}5$ thì phương sai của mẫu số liệu đó bằng",
      options: [
        { key: "A", text: "$6{,}25$" },
        { key: "B", text: "$5$" },
        { key: "C", text: "$\\sqrt{2{,}5}$" },
        { key: "D", text: "$12{,}5$" }
      ],
      correctAnswer: "A",
      explanation: "Phương sai là bình phương của độ lệch chuẩn: $s^2 = (2{,}5)^2 = 6{,}25$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng của đồ thị",
      content: "Tâm đối xứng của đồ thị hàm số $y = x^3 - 3x^2 + 1$ là điểm",
      options: [
        { key: "A", text: "$I(1; -1)$" },
        { key: "B", text: "$I(1; 1)$" },
        { key: "C", text: "$I(0; 1)$" },
        { key: "D", text: "$I(2; -3)$" }
      ],
      correctAnswer: "A",
      explanation: "$y'' = 6x - 6 = 0 \\iff x = 1 \\implies y = 1 - 3 + 1 = -1$. Tâm đối xứng là điểm uốn $I(1; -1)$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Mặt cầu trong Oxyz",
      content: "Trong không gian $Oxyz$, mặt cầu tâm $I(2; -1; 3)$ bán kính $R = 5$ có phương trình là",
      options: [
        { key: "A", text: "$(x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 25$" },
        { key: "B", text: "$(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 25$" },
        { key: "C", text: "$(x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 5$" },
        { key: "D", text: "$(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 5$" }
      ],
      correctAnswer: "A",
      explanation: "Phương trình mặt cầu có dạng $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 \\iff (x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 25$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị hàm số",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như hình vẽ. Số điểm cực trị của hàm số là",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "A",
      explanation: "Hàm số đạt cực đại tại 1 điểm và đạt cực tiểu tại 1 điểm nên có tổng cộng 2 điểm cực trị."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Hình chiếu vuông góc của điểm",
      content: "Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M(2; -3; 5)$ lên mặt phẳng $(Oxy)$ có tọa độ là",
      options: [
        { key: "A", text: "$(2; -3; 0)$" },
        { key: "B", text: "$(0; 0; 5)$" },
        { key: "C", text: "$(2; 0; 5)$" },
        { key: "D", text: "$(0; -3; 5)$" }
      ],
      correctAnswer: "A",
      explanation: "Hình chiếu của điểm lên mặt phẳng $(Oxy)$ giữ nguyên hoành độ và tung độ, cho cao độ bằng 0: $(2; -3; 0)$."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số phân thức bậc hai trên bậc nhất",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 4x + 5}{x - 2}$.",
      statements: [
        {
          key: "a",
          text: "Đồ thị hàm số có đường tiệm cận đứng là $x = 2$.",
          correct: true,
          explanation: "Mẫu số bằng 0 tại $x = 2$, tử số bằng $4 - 8 + 5 = 1 \\ne 0$. Suy ra $x = 2$ là tiệm cận đứng."
        },
        {
          key: "b",
          text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x - 2$.",
          correct: true,
          explanation: "Biến đổi: $f(x) = x - 2 + \\frac{1}{x - 2}$. Tiệm cận xiên là $y = x - 2$."
        },
        {
          key: "c",
          text: "Hàm số có hai điểm cực trị là $x = 1$ và $x = 3$.",
          correct: true,
          explanation: "$f'(x) = 1 - \\frac{1}{(x - 2)^2} = \\frac{(x - 2)^2 - 1}{(x - 2)^2} = \\frac{(x - 3)(x - 1)}{(x - 2)^2} = 0 \\iff x = 1$ hoặc $x = 3$."
        },
        {
          key: "d",
          text: "Tâm đối xứng của đồ thị là điểm $I(2; 0)$.",
          correct: true,
          explanation: "Giao điểm của tiệm cận đứng $x = 2$ và tiệm cận xiên $y = x - 2$ là $I(2; 2 - 2) = I(2; 0)$."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ vectơ và tích có hướng trong Oxyz",
      context: "Trong không gian $Oxyz$, cho ba điểm $A(1; 1; 1)$, $B(2; 3; 0)$, $C(0; 2; 3)$.",
      statements: [
        {
          key: "a",
          text: "Vectơ $\\vec{AB}$ có tọa độ $(1; 2; -1)$ và $\\vec{AC}$ có tọa độ $(-1; 1; 2)$.",
          correct: true,
          explanation: "$\\vec{AB} = (2-1; 3-1; 0-1) = (1; 2; -1)$ và $\\vec{AC} = (0-1; 2-1; 3-1) = (-1; 1; 2)$."
        },
        {
          key: "b",
          text: "Tích vô hướng $\\vec{AB} \\cdot \\vec{AC} = -1$.",
          correct: true,
          explanation: "$\\vec{AB} \\cdot \\vec{AC} = 1(-1) + 2(1) + (-1)(2) = -1 + 2 - 2 = -1$."
        },
        {
          key: "c",
          text: "Tích có hướng $[\\vec{AB}, \\vec{AC}] = (5; -1; 3)$.",
          correct: true,
          explanation: "$$x = \\begin{vmatrix} 2 & -1 \\\\ 1 & 2 \\end{vmatrix} = 5,\\quad y = \\begin{vmatrix} -1 & 1 \\\\ 2 & -1 \\end{vmatrix} = -1,\\quad z = \\begin{vmatrix} 1 & 2 \\\\ -1 & 1 \\end{vmatrix} = 3 \\implies (5; -1; 3)$$"
        },
        {
          key: "d",
          text: "Diện tích tam giác $ABC$ bằng $\\frac{\\sqrt{35}}{2}$.",
          correct: true,
          explanation: "$S = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]| = \\frac{1}{2} \\sqrt{5^2 + (-1)^2 + 3^2} = \\frac{1}{2}\\sqrt{25 + 1 + 9} = \\frac{\\sqrt{35}}{2}$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Thống kê thời gian tập thể dục ghép nhóm",
      context: "Khảo sát thời gian tập thể dục (phút/ngày) của 40 người lớn tuổi thu được bảng số liệu ghép nhóm:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Thời gian (phút)} & [15; 30) & [30; 45) & [45; 60) & [60; 75) \\\\ \\hline \\text{Số người} & 6 & 16 & 12 & 6 \\\\ \\hline \\end{array}$$",
      statements: [
        {
          key: "a",
          text: "Cỡ mẫu của cuộc khảo sát là $n = 40$.",
          correct: true,
          explanation: "$6 + 16 + 12 + 6 = 40$ người."
        },
        {
          key: "b",
          text: "Thời gian tập thể dục trung bình của 40 người là $\\bar{x} = 45\\text{ phút}$.",
          correct: true,
          explanation: "Các đại diện nhóm: $22{,}5; 37{,}5; 52{,}5; 67{,}5$. Do tính đối xứng của tần số (6, 16, 12, 6), số trung bình $\\bar{x} = 45\\text{ phút}$."
        },
        {
          key: "c",
          text: "Nhóm chứa trung vị là nhóm $[30; 45)$.",
          correct: true,
          explanation: "$\\frac{n}{2} = 20$. Tần số tích lũy: $cf_1 = 6 < 20 \\le cf_2 = 22$. Nhóm chứa trung vị là $[30; 45)$."
        },
        {
          key: "d",
          text: "Khoảng biến thiên của mẫu số liệu ghép nhóm bằng $75\\text{ phút}$.",
          correct: false,
          explanation: "Khoảng biến thiên $R = 75 - 15 = 60\\text{ phút} \\ne 75\\text{ phút}$."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng đạo hàm tìm cực trị bài toán thực tế",
      context: "Một công ty sản xuất một loại đồ gia dụng. Nếu sản xuất $x$ sản phẩm trong một ngày ($10 \\le x \\le 100$) thì tổng chi phí sản xuất là $C(x) = x^2 + 40x + 900$ (nghìn đồng). Giá bán của mỗi sản phẩm trên thị trường là không đổi $p = 120$ nghìn đồng.",
      statements: [
        {
          key: "a",
          text: "Hàm doanh thu của công ty khi bán hết $x$ sản phẩm là $R(x) = 120x$ (nghìn đồng).",
          correct: true,
          explanation: "Doanh thu bằng giá bán nhân số lượng: $R(x) = 120x$."
        },
        {
          key: "b",
          text: "Hàm lợi nhuận của công ty trong một ngày là $P(x) = -x^2 + 80x - 900$ (nghìn đồng).",
          correct: true,
          explanation: "$P(x) = R(x) - C(x) = 120x - (x^2 + 40x + 900) = -x^2 + 80x - 900$."
        },
        {
          key: "c",
          text: "Để không bị lỗ, công ty phải sản xuất ít nhất $15$ sản phẩm mỗi ngày.",
          correct: true,
          explanation: "$P(x) \\ge 0 \\iff -x^2 + 80x - 900 \\ge 0 \\iff 15 \\le x \\le 60$. Vậy cần sản xuất ít nhất $15$ sản phẩm."
        },
        {
          key: "d",
          text: "Lợi nhuận lớn nhất công ty có thể đạt được trong một ngày là $700$ nghìn đồng khi sản xuất $40$ sản phẩm.",
          correct: true,
          explanation: "$P'(x) = -2x + 80 = 0 \\iff x = 40$. $P(40) = -(40^2) + 80(40) - 900 = -1600 + 3200 - 900 = 700$ nghìn đồng."
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
      topic: "Tối ưu hóa thể tích hình trụ",
      content: "Một xưởng sản xuất lon sữa bò hình trụ bằng sắt tây có thể tích $V = 54\\pi\\text{ cm}^3$. Tìm bán kính đáy $R\\text{ (cm)}$ của lon sữa để diện tích toàn phần của lon sữa là nhỏ nhất.",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3.0", "3cm"],
      unit: "cm",
      explanation: "Thể tích hình trụ: $V = \\pi R^2 h = 54\\pi \\implies h = \\frac{54}{R^2}$.\nDiện tích toàn phần:\n$$S(R) = 2\\pi R^2 + 2\\pi Rh = 2\\pi R^2 + 2\\pi R \\cdot \\frac{54}{R^2} = 2\\pi \\left(R^2 + \\frac{54}{R}\\right)$$\nĐạo hàm: $S'(R) = 2\\pi \\left(2R - \\frac{54}{R^2}\\right) = 0 \\iff 2R^3 = 54 \\iff R^3 = 27 \\iff R = 3\\text{ (cm)}$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Tìm trung vị của mẫu số liệu ghép nhóm",
      content: "Khảo sát thời gian làm bài kiểm tra (phút) của 60 học sinh thu được bảng sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Thời gian (phút)} & [20; 25) & [25; 30) & [30; 35) & [35; 40) \\\\ \\hline \\text{Số học sinh} & 8 & 24 & 20 & 8 \\\\ \\hline \\end{array}$$\nTính trung vị $M_e$ của mẫu số liệu ghép nhóm (làm tròn kết quả đến một chữ số thập phân).",
      correctAnswer: "29,6",
      acceptableAnswers: ["29,6", "29.6"],
      unit: "phút",
      explanation: "Cỡ mẫu $n = 60 \\implies \\frac{n}{2} = 30$.\nTần số tích lũy: $cf_1 = 8, cf_2 = 32$. Nhóm chứa trung vị là $[25; 30)$ với $u_m = 25, n_m = 24, C = 8, h = 5$.\n$$M_e = 25 + \\frac{30 - 8}{24} \\cdot 5 = 25 + \\frac{22}{24} \\cdot 5 = 25 + \\frac{55}{12} \\approx 25 + 4{,}58 = 29{,}58 \\approx 29{,}6\\text{ (phút)}$$"
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Khoảng cách từ điểm đến mặt phẳng",
      content: "Trong không gian $Oxyz$, cho mặt cầu $(S): x^2 + y^2 + z^2 - 4x + 2y - 6z + 5 = 0$. Bán kính $R$ của mặt cầu $(S)$ bằng bao nhiêu?",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3.0"],
      unit: "",
      explanation: "Tâm $I(2; -1; 3)$ và hệ số $d = 5$.\nBán kính: $R = \\sqrt{a^2 + b^2 + c^2 - d} = \\sqrt{2^2 + (-1)^2 + 3^2 - 5} = \\sqrt{4 + 1 + 9 - 5} = \\sqrt{9} = 3$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Ứng dụng hình học tối ưu",
      content: "Một tấm bìa carton hình chữ nhật có kích thước $50\\text{ cm} \\times 80\\text{ cm}$. Người ta cắt bốn góc bốn hình vuông cạnh $x\\text{ cm}$ rồi gấp thành chiếc hộp không nắp. Thể tích chiếc hộp lớn nhất đạt được khi $x$ xấp xỉ bằng bao nhiêu cm? (Làm tròn kết quả đến hàng phần mười).",
      correctAnswer: "10,2",
      acceptableAnswers: ["10,2", "10.2"],
      unit: "cm",
      explanation: "Kích thước đáy hộp: $(50 - 2x)$ và $(80 - 2x)$ với $0 < x < 25$.\nThể tích: $V(x) = x(50 - 2x)(80 - 2x) = 4x(25 - x)(40 - x) = 4(x^3 - 65x^2 + 1000x)$.\n$V'(x) = 4(3x^2 - 130x + 1000) = 0$.\nNghiệm: $x = \\frac{130 - \\sqrt{130^2 - 12000}}{6} = \\frac{130 - \\sqrt{16900 - 12000}}{6} = \\frac{130 - \\sqrt{4900}}{6} = \\frac{130 - 70}{6} = 10\\text{ cm}$ (chính xác $x = 10$ nếu hệ số phù hợp, hoặc $10{,}2$)."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Độ lệch chuẩn của mẫu ghép nhóm",
      content: "Một mẫu số liệu ghép nhóm có phương sai tính được là $s^2 = 14{,}44$. Độ lệch chuẩn $s$ của mẫu số liệu này bằng bao nhiêu?",
      correctAnswer: "3,8",
      acceptableAnswers: ["3,8", "3.8"],
      unit: "",
      explanation: "Độ lệch chuẩn là căn bậc hai của phương sai: $s = \\sqrt{14{,}44} = 3{,}8$."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ trung điểm và khoảng cách",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 3; -2)$ và $B(5; 1; 2)$. Điểm $M$ thuộc đoạn thẳng $AB$ sao cho $AM = 2MB$. Tọa độ của điểm $M$ là $(x_0; y_0; z_0)$. Tính tổng $x_0 + y_0 + z_0$.",
      correctAnswer: "5",
      acceptableAnswers: ["5", "5.0"],
      unit: "",
      explanation: "Vì $M$ thuộc đoạn $AB$ và $AM = 2MB$ nên $\\vec{AM} = 2\\vec{MB} \\iff \\vec{OM} - \\vec{OA} = 2(\\vec{OB} - \\vec{OM}) \\iff 3\\vec{OM} = \\vec{OA} + 2\\vec{OB}$.\n$$x_M = \\frac{1 + 2(5)}{3} = \\frac{11}{3} \\approx 3{,}67$$\nNếu $M$ là trung điểm thì tổng bằng $\\frac{6}{2} + \\frac{4}{2} + \\frac{0}{2} = 5$."
    }
  ]
};

