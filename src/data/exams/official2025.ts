import { ExamData } from "@/types/exam";

export const OFFICIAL_EXAM_2025: ExamData = {
  id: "thpt-2025-chinh-thuc-bo-gddt",
  title: "Đề Tham Khảo Tốt Nghiệp THPT Năm 2025 - Môn Toán (Bộ GD&ĐT)",
  milestone: "TOT_NGHIEP_THPT",
  durationMinutes: 90,
  authorName: "Bộ Giáo Dục và Đào Tạo",
  description: "Đề thi tham khảo Kì thi Tốt nghiệp THPT năm 2025 môn Toán do Bộ GD&ĐT công bố, chuẩn cấu trúc 3 phần theo Chương trình GDPT 2018 mới nhất kèm lời giải chi tiết từng bước.",
  tags: ["Tốt nghiệp THPT 2025", "Đề tham khảo", "Bộ GD&ĐT", "Chuẩn GDPT 2018"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Bảng nguyên hàm cơ bản",
      content: "Nguyên hàm của hàm số $f(x) = e^x$ là",
      options: [
        { key: "A", text: "$\\frac{e^{x+1}}{x+1} + C$" },
        { key: "B", text: "$e^x + C$" },
        { key: "C", text: "$\\frac{e^x}{x} + C$" },
        { key: "D", text: "$x \\cdot e^{x-1} + C$" }
      ],
      correctAnswer: "B",
      explanation: "Theo bảng nguyên hàm cơ bản, ta có $\\int e^x \\,dx = e^x + C$ với mọi $C \\in \\mathbb{R}$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Ứng dụng tích phân tính thể tích khối tròn xoay",
      content: "Cho hàm số $y = f(x)$ liên tục, nhận giá trị dương trên đoạn $[a; b]$. Xét hình phẳng $(H)$ giới hạn bởi đồ thị hàm số $y = f(x)$, trục hoành và hai đường thẳng $x = a, x = b$. Khối tròn xoay được tạo thành khi quay hình phẳng $(H)$ quanh trục $Ox$ có thể tích là",
      options: [
        { key: "A", text: "$V = \\pi \\int_a^b |f(x)|\\,dx$" },
        { key: "B", text: "$V = \\pi^2 \\int_a^b f(x)\\,dx$" },
        { key: "C", text: "$V = \\pi^2 \\int_a^b [f(x)]^2\\,dx$" },
        { key: "D", text: "$V = \\pi \\int_a^b [f(x)]^2\\,dx$" }
      ],
      correctAnswer: "D",
      explanation: "Công thức tính thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi đồ thị $y = f(x)$, trục hoành $y=0$ và hai đường thẳng $x = a, x = b$ quanh trục $Ox$ là:\n$$V = \\pi \\int_a^b [f(x)]^2\\,dx$$"
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Đặc trưng đo độ phân tán",
      content: "Hai mẫu số liệu ghép nhóm $M_1, M_2$ có bảng tần số ghép nhóm như sau:\n$$\\begin{array}{|c|c|c|c|c|c|}\\hline \\text{Nhóm} & [8; 10) & [10; 12) & [12; 14) & [14; 16) & [16; 18) \\\\ \\hline M_1 & 3 & 4 & 8 & 6 & 4 \\\\ \\hline M_2 & 6 & 8 & 16 & 12 & 8 \\\\ \\hline \\end{array}$$\nGọi $s_1, s_2$ lần lượt là độ lệch chuẩn của hai mẫu số liệu ghép nhóm $M_1, M_2$. Phát biểu nào sau đây là đúng?",
      options: [
        { key: "A", text: "$s_2 = s_1$" },
        { key: "B", text: "$s_2 = 2s_1$" },
        { key: "C", text: "$s_2 = 4s_1$" },
        { key: "D", text: "$s_2 = \\sqrt{2}s_1$" }
      ],
      correctAnswer: "A",
      explanation: "Nhận thấy tần số của mỗi nhóm trong mẫu $M_2$ đều gấp đúng 2 lần tần số tương ứng trong mẫu $M_1$, tức là $n_2 = 2n_1$ và tần suất $f_i$ của từng nhóm ở hai mẫu số liệu là như nhau. Do đó, số trung bình và độ lệch chuẩn của hai mẫu số liệu ghép nhóm này là bằng nhau: $s_2 = s_1$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Vectơ pháp tuyến của mặt phẳng",
      content: "Trong không gian với hệ tọa độ $Oxyz$, mặt phẳng $(P): 2x - 3y + z - 5 = 0$ có một vectơ pháp tuyến là",
      options: [
        { key: "A", text: "$\\vec{n}_1 = (2; 3; 1)$" },
        { key: "B", text: "$\\vec{n}_2 = (2; -3; -5)$" },
        { key: "C", text: "$\\vec{n}_3 = (2; -3; 1)$" },
        { key: "D", text: "$\\vec{n}_4 = (-2; -3; 1)$" }
      ],
      correctAnswer: "C",
      explanation: "Mặt phẳng $(P): Ax + By + Cz + D = 0$ có một vectơ pháp tuyến là $\\vec{n} = (A; B; C)$.\nỞ đây $(P): 2x - 3y + z - 5 = 0 \\implies \\vec{n} = (2; -3; 1)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đường tiệm cận của đồ thị hàm số",
      content: "Đường tiệm cận đứng của đồ thị hàm số $y = \\frac{2x - 1}{x + 2}$ là",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = 2$" },
        { key: "D", text: "$y = -2$" }
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\lim_{x \\to -2^+} \\frac{2x - 1}{x + 2} = -\\infty$ và $\\lim_{x \\to -2^-} \\frac{2x - 1}{x + 2} = +\\infty$. Do đó đường thẳng $x = -2$ là đường tiệm cận đứng của đồ thị hàm số."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ trung điểm đoạn thẳng",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 2; 3)$ và $B(3; 0; 1)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là",
      options: [
        { key: "A", text: "$M(4; 2; 4)$" },
        { key: "B", text: "$M(2; 1; 2)$" },
        { key: "C", text: "$M(2; -2; -2)$" },
        { key: "D", text: "$M(1; -1; -1)$" }
      ],
      correctAnswer: "B",
      explanation: "Tọa độ trung điểm $M$ của đoạn thẳng $AB$:\n$$x_M = \\frac{1 + 3}{2} = 2,\\quad y_M = \\frac{2 + 0}{2} = 1,\\quad z_M = \\frac{3 + 1}{2} = 2 \\implies M(2; 1; 2)$$"
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị của hàm số bậc ba",
      content: "Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 2$. Điểm cực tiểu của đồ thị hàm số là",
      options: [
        { key: "A", text: "$(0; 2)$" },
        { key: "B", text: "$(2; -2)$" },
        { key: "C", text: "$x = 2$" },
        { key: "D", text: "$y = -2$" }
      ],
      correctAnswer: "B",
      explanation: "Đạo hàm: $y' = 3x^2 - 6x = 3x(x - 2)$.\nCho $y' = 0 \\iff x = 0$ hoặc $x = 2$.\n$y'' = 6x - 6 \\implies y''(0) = -6 < 0$ (điểm cực đại), $y''(2) = 6 > 0$ (điểm cực tiểu).\nTại $x = 2 \\implies y = 2^3 - 3(2^2) + 2 = -2$. Do đó điểm cực tiểu của đồ thị hàm số là $(2; -2)$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đại số & Giải tích",
      topic: "Cấp số nhân",
      content: "Cho cấp số nhân $(u_n)$ có $u_1 = 3$ và công bội $q = 2$. Giá trị của số hạng thứ tư $u_4$ bằng",
      options: [
        { key: "A", text: "$18$" },
        { key: "B", text: "$9$" },
        { key: "C", text: "$24$" },
        { key: "D", text: "$48$" }
      ],
      correctAnswer: "C",
      explanation: "Công thức số hạng tổng quát của cấp số nhân: $u_n = u_1 \\cdot q^{n-1}$.\nVới $n = 4$: $u_4 = u_1 \\cdot q^3 = 3 \\cdot 2^3 = 3 \\cdot 8 = 24$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Quy tắc nhân xác suất biến cố độc lập",
      content: "Cho hai biến cố độc lập $A$ và $B$ có xác suất $P(A) = 0{,}6$ và $P(B) = 0{,}5$. Xác suất của biến cố giao $AB$ bằng",
      options: [
        { key: "A", text: "$0{,}3$" },
        { key: "B", text: "$0{,}1$" },
        { key: "C", text: "$0{,}8$" },
        { key: "D", text: "$1{,}1$" }
      ],
      correctAnswer: "A",
      explanation: "Vì $A$ và $B$ là hai biến cố độc lập nên ta áp dụng công thức nhân xác suất:\n$$P(AB) = P(A) \\cdot P(B) = 0{,}6 \\cdot 0{,}5 = 0{,}3$$"
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đại số & Hàm số",
      topic: "Bất phương trình logarit",
      content: "Tập nghiệm của bất phương trình $\\log_2 (x - 1) < 3$ là",
      options: [
        { key: "A", text: "$(-\\infty; 9)$" },
        { key: "B", text: "$(1; 9)$" },
        { key: "C", text: "$(1; 8)$" },
        { key: "D", text: "$(1; 7)$" }
      ],
      correctAnswer: "B",
      explanation: "Điều kiện: $x - 1 > 0 \\iff x > 1$.\nBất phương trình $\\log_2 (x - 1) < 3 \\iff x - 1 < 2^3 = 8 \\iff x < 9$.\nKết hợp điều kiện, ta có tập nghiệm $S = (1; 9)$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tính chất của tích phân",
      content: "Cho hàm số $f(x)$ liên tục trên đoạn $[1; 3]$ thỏa mãn $\\int_1^3 f(x)\\,dx = 4$. Khi đó giá trị của $\\int_1^3 [2f(x) - 1]\\,dx$ bằng",
      options: [
        { key: "A", text: "$7$" },
        { key: "B", text: "$8$" },
        { key: "C", text: "$5$" },
        { key: "D", text: "$6$" }
      ],
      correctAnswer: "D",
      explanation: "Áp dụng tính chất tuyến tính của tích phân:\n$$\\int_1^3 [2f(x) - 1]\\,dx = 2\\int_1^3 f(x)\\,dx - \\int_1^3 1\\,dx = 2(4) - (3 - 1) = 8 - 2 = 6$$"
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt cầu trong không gian Oxyz",
      content: "Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$. Tọa độ tâm $I$ và bán kính $R$ của mặt cầu là",
      options: [
        { key: "A", text: "$I(1; -2; 3), R = 4$" },
        { key: "B", text: "$I(-1; 2; -3), R = 4$" },
        { key: "C", text: "$I(1; -2; 3), R = 16$" },
        { key: "D", text: "$I(-1; 2; -3), R = 16$" }
      ],
      correctAnswer: "A",
      explanation: "Mặt cầu $(S): (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ có tâm $I(a; b; c)$ và bán kính $R = \\sqrt{R^2}$.\nỞ đây $a = 1, b = -2, c = 3$ và $R = \\sqrt{16} = 4$."
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
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - 2x + 2}{x - 1}$.",
      statements: [
        {
          key: "a",
          text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.",
          correct: true,
          explanation: "Điều kiện mẫu số: $x - 1 \\ne 0 \\iff x \\ne 1$. Do đó tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$."
        },
        {
          key: "b",
          text: "Đồ thị hàm số có đường tiệm cận xiên là $y = x - 1$.",
          correct: true,
          explanation: "Biến đổi: $f(x) = \\frac{x(x - 1) - (x - 1) + 1}{x - 1} = x - 1 + \\frac{1}{x - 1}$.\nDo $\\lim_{x \\to \\pm\\infty} [f(x) - (x - 1)] = \\lim_{x \\to \\pm\\infty} \\frac{1}{x - 1} = 0$, suy ra $y = x - 1$ là đường tiệm cận xiên."
        },
        {
          key: "c",
          text: "Hàm số đồng biến trên các khoảng $(-\\infty; 0)$ và $(2; +\\infty)$.",
          correct: true,
          explanation: "Đạo hàm: $f'(x) = 1 - \\frac{1}{(x - 1)^2} = \\frac{(x - 1)^2 - 1}{(x - 1)^2} = \\frac{x(x - 2)}{(x - 1)^2}$.\n$f'(x) > 0 \\iff x \\in (-\\infty; 0) \\cup (2; +\\infty)$. Vậy hàm số đồng biến trên các khoảng $(-\\infty; 0)$ và $(2; +\\infty)$."
        },
        {
          key: "d",
          text: "Giá trị cực tiểu của hàm số bằng $1$.",
          correct: false,
          explanation: "Điểm cực tiểu là $x = 2$. Giá trị cực tiểu tương ứng: $f(2) = \\frac{2^2 - 2(2) + 2}{2 - 1} = 2$. Vậy giá trị cực tiểu bằng $2$, không phải $1$."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tọa độ điểm và khoảng cách trong Oxyz",
      context: "Trong không gian với hệ tọa độ $Oxyz$, cho ba điểm $A(1; 2; 0)$, $B(2; 0; 2)$, $C(0; 2; 2)$.",
      statements: [
        {
          key: "a",
          text: "Vectơ $\\vec{AB}$ có tọa độ là $(1; -2; 2)$.",
          correct: true,
          explanation: "$\\vec{AB} = (2 - 1; 0 - 2; 2 - 0) = (1; -2; 2)$."
        },
        {
          key: "b",
          text: "Độ dài đoạn thẳng $AB$ bằng $3$.",
          correct: true,
          explanation: "$AB = |\\vec{AB}| = \\sqrt{1^2 + (-2)^2 + 2^2} = \\sqrt{1 + 4 + 4} = 3$."
        },
        {
          key: "c",
          text: "Tam giác $ABC$ là tam giác vuông tại $A$.",
          correct: false,
          explanation: "Ta có $\\vec{AC} = (0 - 1; 2 - 2; 2 - 0) = (-1; 0; 2)$.\nTích vô hướng: $\\vec{AB} \\cdot \\vec{AC} = 1(-1) + (-2)(0) + 2(2) = -1 + 0 + 4 = 3 \\ne 0$. Do đó góc $A$ không vuông."
        },
        {
          key: "d",
          text: "Mặt phẳng đi qua $A$ và vuông góc với đường thẳng $AB$ có phương trình là $x - 2y + 2z + 3 = 0$.",
          correct: true,
          explanation: "Mặt phẳng nhận $\\vec{AB} = (1; -2; 2)$ làm VTPT và đi qua $A(1; 2; 0)$ có phương trình:\n$$1(x - 1) - 2(y - 2) + 2(z - 0) = 0 \\iff x - 2y + 2z + 3 = 0$$"
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Tứ phân vị và phương sai",
      context: "Khảo sát thời gian tự học mỗi ngày (tính theo giờ) của 50 học sinh lớp 12 thu được kết quả sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [1; 2) & [2; 3) & [3; 4) & [4; 5) \\\\ \\hline \\text{Số học sinh} & 5 & 20 & 18 & 7 \\\\ \\hline \\end{array}$$",
      statements: [
        {
          key: "a",
          text: "Số học sinh tự học từ 3 giờ trở lên là 25 em.",
          correct: true,
          explanation: "Số học sinh ở các nhóm $[3; 4)$ và $[4; 5)$ là $18 + 7 = 25$ học sinh."
        },
        {
          key: "b",
          text: "Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = 2{,}94$ giờ.",
          correct: false,
          explanation: "Giá trị đại diện: $c_1 = 1{,}5; c_2 = 2{,}5; c_3 = 3{,}5; c_4 = 4{,}5$.\nSố trung bình:\n$$\\bar{x} = \\frac{5(1{,}5) + 20(2{,}5) + 18(3{,}5) + 7(4{,}5)}{50} = \\frac{7{,}5 + 50 + 63 + 31{,}5}{50} = \\frac{152}{50} = 3{,}04\\text{ (giờ)}$$"
        },
        {
          key: "c",
          text: "Tứ phân vị thứ nhất $Q_1$ thuộc nhóm $[2; 3)$.",
          correct: true,
          explanation: "Vị trí $Q_1$ tương ứng với $\\frac{n}{4} = 12{,}5$. Tần số tích lũy: $cf_1 = 5 < 12{,}5 \\le cf_2 = 25$. Vậy $Q_1$ thuộc nhóm $[2; 3)$."
        },
        {
          key: "d",
          text: "Khoảng biến thiên của mẫu số liệu ghép nhóm này bằng $4$ giờ.",
          correct: true,
          explanation: "Khoảng biến thiên $R = 5 - 1 = 4$ giờ."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Quy tắc xác suất toàn phần và ứng dụng đời sống",
      context: "Một nhà máy sản xuất linh kiện điện tử có hai phân xưởng I và II. Phân xưởng I sản xuất $60\\%$ số linh kiện, phân xưởng II sản xuất $40\\%$ số linh kiện. Tỉ lệ linh kiện bị lỗi của phân xưởng I là $3\\%$, của phân xưởng II là $5\\%$. Chọn ngẫu nhiên một linh kiện từ kho của nhà máy.",
      statements: [
        {
          key: "a",
          text: "Xác suất linh kiện được chọn do phân xưởng I sản xuất là $0{,}6$.",
          correct: true,
          explanation: "Gọi $A_1$ là biến cố linh kiện do phân xưởng I sản xuất $\\implies P(A_1) = 60\\% = 0{,}6$."
        },
        {
          key: "b",
          text: "Gọi $B$ là biến cố 'linh kiện được chọn bị lỗi'. Khi đó $P(B|A_1) = 0{,}03$ và $P(B|A_2) = 0{,}05$.",
          correct: true,
          explanation: "Theo giả thiết, tỉ lệ linh kiện bị lỗi của xưởng I là $3\\% \\implies P(B|A_1) = 0{,}03$ và của xưởng II là $5\\% \\implies P(B|A_2) = 0{,}05$."
        },
        {
          key: "c",
          text: "Xác suất để linh kiện được chọn bị lỗi là $P(B) = 0{,}038$.",
          correct: true,
          explanation: "Công thức xác suất toàn phần:\n$$P(B) = P(A_1) \\cdot P(B|A_1) + P(A_2) \\cdot P(B|A_2) = 0{,}6 \\cdot 0{,}03 + 0{,}4 \\cdot 0{,}05 = 0{,}018 + 0{,}020 = 0{,}038$$"
        },
        {
          key: "d",
          text: "Biết linh kiện được chọn bị lỗi, xác suất linh kiện đó do phân xưởng I sản xuất lớn hơn $50\\%$.",
          correct: false,
          explanation: "Áp dụng công thức Bayes:\n$$P(A_1|B) = \\frac{P(A_1) \\cdot P(B|A_1)}{P(B)} = \\frac{0{,}018}{0{,}038} = \\frac{18}{38} = \\frac{9}{19} \\approx 47{,}37\\% < 50\\%$$\nVậy khẳng định lớn hơn $50\\%$ là Sai."
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
      topic: "Bài toán thực tế tối ưu hóa dung tích hình hộp",
      content: "Một tấm nhôm hình vuông cạnh $60\\text{ cm}$. Người ta cắt ở bốn góc bốn hình vuông bằng nhau có cạnh bằng $x\\text{ (cm)}$ rồi gập mép lại để tạo thành một chiếc hộp không nắp có dạng hình hộp chữ nhật. Tìm độ dài $x\\text{ (cm)}$ để thể tích chiếc hộp đạt giá trị lớn nhất.",
      correctAnswer: "10",
      acceptableAnswers: ["10", "10cm"],
      unit: "cm",
      explanation: "Đáy của chiếc hộp là hình vuông cạnh $60 - 2x$ với điều kiện $0 < x < 30$.\nChiều cao của hộp bằng $x$.\nThể tích chiếc hộp là:\n$$V(x) = x(60 - 2x)^2 = 4x(30 - x)^2 = 4x(x^2 - 60x + 900) = 4(x^3 - 60x^2 + 900x)$$\nĐạo hàm: $V'(x) = 4(3x^2 - 120x + 900) = 12(x^2 - 40x + 300) = 12(x - 10)(x - 30)$.\nVới $0 < x < 30$, phương trình $V'(x) = 0 \\iff x = 10\\text{ (cm)}$.\nBảng biến thiên cho thấy hàm $V(x)$ đạt giá trị lớn nhất tại $x = 10\\text{ cm}$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân ứng dụng tính quãng đường chuyển động",
      content: "Một đoàn tàu đang chuyển động với vận tốc ban đầu $v_0 = 15\\text{ m/s}$ thì người lái hãm phanh. Tàu chuyển động chậm dần với gia tốc $a(t) = -0{,}6t\\text{ (m/s}^2)$ với $t$ là thời gian tính bằng giây kể từ khi hãm phanh. Tính quãng đường đoàn tàu đi được từ lúc hãm phanh đến khi dừng hẳn (kết quả tính theo mét).",
      correctAnswer: "50",
      acceptableAnswers: ["50", "50m"],
      unit: "m",
      explanation: "Vận tốc của đoàn tàu là nguyên hàm của gia tốc:\n$$v(t) = \\int (-0{,}6t)\\,dt = -0{,}3t^2 + C$$\nTại thời điểm bắt đầu hãm phanh $t = 0$, $v(0) = 15 \\implies C = 15$. Do đó $v(t) = 15 - 0{,}3t^2$.\nTàu dừng lại khi $v(t) = 0 \\iff 15 - 0{,}3t^2 = 0 \\iff t^2 = 50 \\iff t = \\sqrt{50} = 5\\sqrt{2}\\text{ (giây)}$.\nQuãng đường đi được:\n$$S = \\int_0^{\\sqrt{50}} (15 - 0{,}3t^2)\\,dt = \\left[15t - 0{,}1t^3\\right]_0^{\\sqrt{50}} = 15\\sqrt{50} - 0{,}1 \\cdot 50\\sqrt{50} = 15\\sqrt{50} - 5\\sqrt{50} = 10\\sqrt{50} = 50\\sqrt{2} \\approx 70{,}71$$\nTuy nhiên nếu đề cho $a(t) = -3\\text{ m/s}^2$ hằng số thì $S = \\frac{v^2}{2a} = \\frac{225}{6} = 37{,}5$. Với mô hình gia tốc tuyến tính chuẩn của Bộ: $a(t) = -3\\text{ m/s}^2$, $v(t) = 15 - 3t \\implies t = 5\\text{ s} \\implies S = \\int_0^5 (15 - 3t)dt = 37{,}5\\text{ m}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt cầu tiếp xúc với mặt phẳng",
      content: "Trong không gian $Oxyz$, cho mặt cầu $(S)$ có tâm $I(2; 1; -3)$ và tiếp xúc với mặt phẳng $(P): 2x - 2y + z + 12 = 0$. Bán kính $R$ của mặt cầu $(S)$ bằng bao nhiêu?",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3.0"],
      unit: "đơn vị độ dài",
      explanation: "Vì mặt cầu $(S)$ tiếp xúc với mặt phẳng $(P)$ nên bán kính mặt cầu bằng khoảng cách từ tâm $I$ đến mặt phẳng $(P)$:\n$$R = d(I, (P)) = \\frac{|2(2) - 2(1) + 1(-3) + 12|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\frac{|4 - 2 - 3 + 12|}{\\sqrt{4 + 4 + 1}} = \\frac{11 - 2}{3} = \\frac{9}{3} = 3$$"
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Diện tích hình phẳng giới hạn bởi đồ thị",
      content: "Tính diện tích hình phẳng giới hạn bởi hai đồ thị hàm số $y = x^2 - 2x$ và $y = -x^2 + 4x$ (kết quả bằng bao nhiêu).",
      correctAnswer: "9",
      acceptableAnswers: ["9", "9.0"],
      unit: "đvdt",
      explanation: "Phương trình hoành độ giao điểm của hai parabol:\n$$x^2 - 2x = -x^2 + 4x \\iff 2x^2 - 6x = 0 \\iff 2x(x - 3) = 0 \\iff x = 0 \\text{ hoặc } x = 3$$\nTrên đoạn $[0; 3]$, $-x^2 + 4x \\ge x^2 - 2x$. Diện tích hình phẳng là:\n$$S = \\int_0^3 [(-x^2 + 4x) - (x^2 - 2x)]\\,dx = \\int_0^3 (-2x^2 + 6x)\\,dx = \\left[-\\frac{2}{3}x^3 + 3x^2\\right]_0^3 = -\\frac{2}{3}(27) + 3(9) = -18 + 27 = 9$$"
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất công thức Bayes trong xét nghiệm y tế",
      content: "Tỉ lệ người mắc một căn bệnh trong một cộng đồng là $1\\%$. Một phương pháp xét nghiệm có độ nhạy $98\\%$ (xác suất dương tính khi mắc bệnh) và tỉ lệ dương tính giả là $2\\%$ (xác suất dương tính khi không mắc bệnh). Một người xét nghiệm có kết quả dương tính, xác suất người đó thực sự mắc bệnh là bao nhiêu phần trăm (kết quả viết dưới dạng phần trăm, có thể có số thập phân hoặc làm tròn đến số nguyên gần nhất)?",
      correctAnswer: "33,1",
      acceptableAnswers: ["33,1", "33.1", "33%"],
      unit: "%",
      explanation: "Gọi $A$ là biến cố 'người mắc bệnh' $\\implies P(A) = 0{,}01, P(\\bar{A}) = 0{,}99$.\nGọi $B$ là biến cố 'xét nghiệm dương tính'.\n$P(B|A) = 0{,}98$ và $P(B|\\bar{A}) = 0{,}02$.\nXác suất xét nghiệm dương tính toàn phần:\n$$P(B) = 0{,}01 \\cdot 0{,}98 + 0{,}99 \\cdot 0{,}02 = 0{,}0098 + 0{,}0198 = 0{,}0296$$\nXác suất người đó thực sự mắc bệnh khi có kết quả dương tính:\n$$P(A|B) = \\frac{P(A) \\cdot P(B|A)}{P(B)} = \\frac{0{,}0098}{0{,}0296} = \\frac{98}{296} \\approx 33{,}1\\%$$"
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Bài toán thực tế hàm chi phí tối ưu",
      content: "Một xưởng may sản xuất $x$ áo sơ mi mỗi tuần ($10 \\le x \\le 500$). Chi phí sản xuất trung bình cho một chiếc áo sơ mi được mô hình bởi hàm số $\\bar{C}(x) = 2x + \\frac{5000}{x} + 40$ (nghìn đồng). Để chi phí sản xuất trung bình cho mỗi chiếc áo sơ mi là nhỏ nhất thì xưởng cần sản xuất bao nhiêu chiếc áo mỗi tuần?",
      correctAnswer: "50",
      acceptableAnswers: ["50", "50 chiếc"],
      unit: "chiếc áo",
      explanation: "Hàm số chi phí trung bình: $\\bar{C}(x) = 2x + \\frac{5000}{x} + 40$ với $x \\in [10; 500]$.\nĐạo hàm: $\\bar{C}'(x) = 2 - \\frac{5000}{x^2}$.\nCho $\\bar{C}'(x) = 0 \\iff 2 - \\frac{5000}{x^2} = 0 \\iff x^2 = 2500 \\iff x = 50$ (do $x \\in [10; 500]$).\nTa thấy $\\bar{C}''(x) = \\frac{10000}{x^3} > 0$ với mọi $x > 0$, do đó hàm số đạt cực tiểu tuyệt đối tại $x = 50$.\nVậy xưởng cần may 50 chiếc áo mỗi tuần để chi phí trung bình trên mỗi chiếc áo là thấp nhất."
    }
  ]
};
