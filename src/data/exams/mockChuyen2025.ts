import { ExamData } from "@/types/exam";

export const MOCK_EXAM_2025_CHUYEN_SP: ExamData = {
  id: "thpt-2025-chuyen-su-pham",
  title: "Đề Thi Thử Tốt Nghiệp THPT 2025 - THPT Chuyên ĐH Sư Phạm Hà Nội",
  milestone: "TOT_NGHIEP_THPT",
  durationMinutes: 90,
  authorName: "Trường THPT Chuyên Đại Học Sư Phạm Hà Nội",
  description: "Đề thi thử Tốt nghiệp THPT 2025 môn Toán lần 1 của Trường THPT Chuyên Sư Phạm Hà Nội, cấu trúc 3 phần chuẩn GDPT 2018 với độ phân hóa cao và nhiều bài toán thực tế sinh động.",
  tags: ["Đề thi thử 2025", "Chuyên Sư Phạm", "Phân hóa cao", "Toán 12"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến của hàm số",
      content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x - 2)^2(x + 1)$. Hàm số đã cho đồng biến trên khoảng nào sau đây?",
      options: [
        { key: "A", text: "$(-1; 0)$" },
        { key: "B", text: "$(0; 2)$" },
        { key: "C", text: "$(-\\infty; -1)$" },
        { key: "D", text: "$(-1; 2)$" }
      ],
      correctAnswer: "B",
      explanation: "Dấu của $f'(x)$ phụ thuộc vào tích $x(x + 1)$ (do $(x - 2)^2 \\ge 0$).\nTa có $f'(x) > 0 \\iff x \\in (-\\infty; -1) \\cup (0; +\\infty) \\setminus \\{2\\}$.\nDo đó trên khoảng $(0; 2)$, $f'(x) > 0$ nên hàm số đồng biến trên $(0; 2)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị lớn nhất và nhỏ nhất",
      content: "Giá trị lớn nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$11$" },
        { key: "D", text: "$8$" }
      ],
      correctAnswer: "C",
      explanation: "Đạo hàm: $f'(x) = 4x^3 - 4x = 4x(x^2 - 1)$.\nTrên $[0; 2]$, $f'(x) = 0 \\iff x = 0$ hoặc $x = 1$.\nTính các giá trị: $f(0) = 3$, $f(1) = 2$, $f(2) = 16 - 8 + 3 = 11$.\nVậy $\\max_{[0; 2]} f(x) = 11$ khi $x = 2$."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Tích có hướng của hai vectơ",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 2; -1)$ và $\\vec{v} = (2; 0; 1)$. Tích có hướng $[\\vec{u}, \\vec{v}]$ có tọa độ là",
      options: [
        { key: "A", text: "$(2; -3; -4)$" },
        { key: "B", text: "$(2; 3; -4)$" },
        { key: "C", text: "(-2; -3; 4)$" },
        { key: "D", text: "$(2; -3; 4)$" }
      ],
      correctAnswer: "A",
      explanation: "Tọa độ tích có hướng $[\\vec{u}, \\vec{v}]$:\n$$x = \\begin{vmatrix} 2 & -1 \\\\ 0 & 1 \\end{vmatrix} = 2,\\quad y = \\begin{vmatrix} -1 & 1 \\\\ 1 & 2 \\end{vmatrix} = -3,\\quad z = \\begin{vmatrix} 1 & 2 \\\\ 2 & 0 \\end{vmatrix} = -4 \\implies [\\vec{u}, \\vec{v}] = (2; -3; -4)$$"
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Nguyên hàm từng phần",
      content: "Họ nguyên hàm $\\int x \\cos x \\,dx$ là",
      options: [
        { key: "A", text: "$x \\sin x + \\cos x + C$" },
        { key: "B", text: "$x \\sin x - \\cos x + C$" },
        { key: "C", text: "$-x \\sin x + \\cos x + C$" },
        { key: "D", text: "$x \\cos x + \\sin x + C$" }
      ],
      correctAnswer: "A",
      explanation: "Đặt $u = x \\implies du = dx$, $dv = \\cos x \\,dx \\implies v = \\sin x$.\nTheo công thức nguyên hàm từng phần:\n$$\\int x \\cos x \\,dx = x \\sin x - \\int \\sin x \\,dx = x \\sin x - (-\\cos x) + C = x \\sin x + \\cos x + C$$"
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Vị trí tương đối của hai mặt phẳng",
      content: "Trong không gian $Oxyz$, cho hai mặt phẳng $(\\alpha): 2x - y + 2z - 3 = 0$ và $(\\beta): 4x - 2y + 4z + 1 = 0$. Vị trí tương đối của $(\\alpha)$ và $(\\beta)$ là",
      options: [
        { key: "A", text: "Song song với nhau" },
        { key: "B", text: "Trùng nhau" },
        { key: "C", text: "Cắt nhau nhưng không vuông góc" },
        { key: "D", text: "Vuông góc với nhau" }
      ],
      correctAnswer: "A",
      explanation: "Ta có tỉ số các hệ số:\n$$\\frac{2}{4} = \\frac{-1}{-2} = \\frac{2}{4} = \\frac{1}{2} \\ne \\frac{-3}{1}$$\nDo đó hai mặt phẳng $(\\alpha)$ và $(\\beta)$ song song với nhau."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Mốt của mẫu số liệu ghép nhóm",
      content: "Khảo sát tiền tip (nghìn đồng) của 30 nhân viên phục vụ tại một nhà hàng thu được bảng sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Tiền tip} & [50; 100) & [100; 150) & [150; 200) & [200; 250) \\\\ \\hline \\text{Số nhân viên} & 4 & 12 & 10 & 4 \\\\ \\hline \\end{array}$$\nNhóm chứa mốt của mẫu số liệu ghép nhóm là",
      options: [
        { key: "A", text: "$[100; 150)$" },
        { key: "B", text: "$[150; 200)$" },
        { key: "C", text: "$[50; 100)$" },
        { key: "D", text: "$[200; 250)$" }
      ],
      correctAnswer: "A",
      explanation: "Nhóm chứa mốt là nhóm có tần số lớn nhất. Trong bảng trên, tần số lớn nhất là $12$ ứng với nhóm $[100; 150)$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồ thị hàm số bậc bốn trùng phương",
      content: "Đường cong hình bên là đồ thị của hàm số nào trong các hàm số sau đây? (Cho biết đồ thị đi qua gốc tọa độ $(0; 0)$ và có điểm cực đại là $(-1; 1)$ và $(1; 1)$)",
      options: [
        { key: "A", text: "$y = -x^4 + 2x^2$" },
        { key: "B", text: "$y = x^4 - 2x^2$" },
        { key: "C", text: "$y = -x^4 + x^2$" },
        { key: "D", text: "$y = -x^3 + 3x$" }
      ],
      correctAnswer: "A",
      explanation: "Đồ thị có bề lõm quay xuống khi $|x| \\to \\infty \\implies a < 0$. Có 3 điểm cực trị với 2 điểm cực đại tại $x = \\pm 1$ có tung độ $y = 1$ và điểm cực tiểu tại $(0; 0)$.\nHàm số $y = -x^4 + 2x^2$ thỏa mãn: $y(0) = 0, y(\\pm 1) = -1 + 2 = 1$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Biến cố độc lập",
      content: "Xác suất bắn trúng bia của hai xạ thủ độc lập lần lượt là $0{,}7$ và $0{,}8$. Xác suất để có ít nhất một xạ thủ bắn trúng bia là",
      options: [
        { key: "A", text: "$0{,}94$" },
        { key: "B", text: "$0{,}56$" },
        { key: "C", text: "$0{,}06$" },
        { key: "D", text: "$0{,}86$" }
      ],
      correctAnswer: "A",
      explanation: "Xác suất cả hai xạ thủ đều bắn trượt là: $P = (1 - 0{,}7) \\cdot (1 - 0{,}8) = 0{,}3 \\cdot 0{,}2 = 0{,}06$.\nXác suất để có ít nhất một người bắn trúng: $1 - 0{,}06 = 0{,}94$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân đổi biến số",
      content: "Cho tích phân $I = \\int_0^1 x e^{x^2} \\,dx$. Nếu đặt $t = x^2$ thì tích phân $I$ bằng",
      options: [
        { key: "A", text: "$\\frac{1}{2} \\int_0^1 e^t \\,dt$" },
        { key: "B", text: "$\\int_0^1 e^t \\,dt$" },
        { key: "C", text: "$2 \\int_0^1 e^t \\,dt$" },
        { key: "D", text: "$\\frac{1}{2} \\int_0^1 t e^t \\,dt$" }
      ],
      correctAnswer: "A",
      explanation: "Đặt $t = x^2 \\implies dt = 2x \\,dx \\implies x \\,dx = \\frac{1}{2} dt$.\nĐổi cận: $x = 0 \\implies t = 0$; $x = 1 \\implies t = 1$.\nDo đó $I = \\frac{1}{2} \\int_0^1 e^t \\,dt$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách giữa hai mặt phẳng song song",
      content: "Trong không gian $Oxyz$, khoảng cách giữa hai mặt phẳng song song $(P): x + 2y - 2z - 1 = 0$ và $(Q): x + 2y - 2z + 8 = 0$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$7$" },
        { key: "C", text: "$\\frac{7}{3}$" },
        { key: "D", text: "$9$" }
      ],
      correctAnswer: "A",
      explanation: "Công thức khoảng cách giữa hai mặt phẳng song song $Ax + By + Cz + D_1 = 0$ và $Ax + By + Cz + D_2 = 0$:\n$$d((P), (Q)) = \\frac{|D_1 - D_2|}{\\sqrt{A^2 + B^2 + C^2}} = \\frac{|-1 - 8|}{\\sqrt{1^2 + 2^2 + (-2)^2}} = \\frac{9}{\\sqrt{9}} = 3$$"
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm của hai đồ thị",
      content: "Số giao điểm của đồ thị hàm số $y = x^3 - 3x + 1$ và đường thẳng $y = 1$ là",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$2$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "A",
      explanation: "Phương trình hoành độ giao điểm: $x^3 - 3x + 1 = 1 \\iff x^3 - 3x = 0 \\iff x(x^2 - 3) = 0 \\iff x = 0$ hoặc $x = \\pm \\sqrt{3}$.\nPhương trình có 3 nghiệm phân biệt, nên có 3 giao điểm."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 2,
      chapterName: "Vectơ & Hệ trục Oxyz",
      topic: "Góc giữa hai vectơ",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{a} = (1; 0; 1)$ và $\\vec{b} = (-1; 1; 0)$. Góc giữa hai vectơ $\\vec{a}$ và $\\vec{b}$ bằng",
      options: [
        { key: "A", text: "$120^\\circ$" },
        { key: "B", text: "$60^\\circ$" },
        { key: "C", text: "$45^\\circ$" },
        { key: "D", text: "$135^\\circ$" }
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|} = \\frac{1(-1) + 0(1) + 1(0)}{\\sqrt{1^2 + 0^2 + 1^2} \\cdot \\sqrt{(-1)^2 + 1^2 + 0^2}} = \\frac{-1}{\\sqrt{2} \\cdot \\sqrt{2}} = -\\frac{1}{2}$.\nDo đó góc giữa hai vectơ là $120^\\circ$."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số bậc ba chứa tham số",
      context: "Cho hàm số $y = f(x) = x^3 - 3x^2 + 4$.",
      statements: [
        {
          key: "a",
          text: "Hàm số đạt cực đại tại điểm $x = 0$ và đạt cực tiểu tại điểm $x = 2$.",
          correct: true,
          explanation: "$f'(x) = 3x^2 - 6x = 3x(x - 2)$. Bảng xét dấu $f'(x)$ đổi dấu từ dương sang âm qua $x = 0$ (cực đại), từ âm sang dương qua $x = 2$ (cực tiểu)."
        },
        {
          key: "b",
          text: "Đồ thị hàm số đi qua điểm uốn $I(1; 2)$.",
          correct: true,
          explanation: "$f''(x) = 6x - 6 = 0 \\iff x = 1$. Khi đó $f(1) = 1 - 3 + 4 = 2$. Điểm uốn là $I(1; 2)$."
        },
        {
          key: "c",
          text: "Phương trình tiếp tuyến của đồ thị hàm số tại điểm uốn $I(1; 2)$ có hệ số góc bằng $3$.",
          correct: false,
          explanation: "Hệ số góc của tiếp tuyến tại điểm uốn là $k = f'(1) = 3(1^2) - 6(1) = -3 \\ne 3$."
        },
        {
          key: "d",
          text: "Đường thẳng $y = m$ cắt đồ thị hàm số tại 3 điểm phân biệt khi và chỉ khi $0 < m < 4$.",
          correct: true,
          explanation: "Giá trị cực tiểu là $f(2) = 0$, giá trị cực đại là $f(0) = 4$. Để đường thẳng $y = m$ cắt đồ thị tại 3 điểm phân biệt thì $y_{CT} < m < y_{CĐ} \\iff 0 < m < 4$."
        }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Mặt phẳng và vị trí tương đối với mặt cầu",
      context: "Trong không gian $Oxyz$, cho mặt cầu $(S): x^2 + y^2 + z^2 - 2x - 4y + 6z - 2 = 0$ và mặt phẳng $(P): 2x - y + 2z + 1 = 0$.",
      statements: [
        {
          key: "a",
          text: "Mặt cầu $(S)$ có tâm $I(1; 2; -3)$ và bán kính $R = 4$.",
          correct: true,
          explanation: "$a = 1, b = 2, c = -3, d = -2 \\implies R = \\sqrt{1^2 + 2^2 + (-3)^2 - (-2)} = \\sqrt{1 + 4 + 9 + 2} = \\sqrt{16} = 4$."
        },
        {
          key: "b",
          text: "Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$ bằng $2$.",
          correct: false,
          explanation: "$d(I, (P)) = \\frac{|2(1) - 1(2) + 2(-3) + 1|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{|2 - 2 - 6 + 1|}{3} = \\frac{|-5|}{3} = \\frac{5}{3} \\ne 2$."
        },
        {
          key: "c",
          text: "Mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo giao tuyến là một đường tròn.",
          correct: true,
          explanation: "Vì $d(I, (P)) = \\frac{5}{3} < R = 4$ nên mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo một đường tròn."
        },
        {
          key: "d",
          text: "Bán kính của đường tròn giao tuyến bằng $r = \\frac{\\sqrt{119}}{3}$.",
          correct: true,
          explanation: "$r = \\sqrt{R^2 - d^2} = \\sqrt{16 - \\frac{25}{9}} = \\sqrt{\\frac{144 - 25}{9}} = \\sqrt{\\frac{119}{9}} = \\frac{\\sqrt{119}}{3}$."
        }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Phương sai và độ lệch chuẩn",
      context: "Đo chiều cao (cm) của 20 cây giống 3 tháng tuổi thu được số liệu sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Chiều cao (cm)} & [20; 25) & [25; 30) & [30; 35) & [35; 40) \\\\ \\hline \\text{Số cây} & 4 & 8 & 6 & 2 \\\\ \\hline \\end{array}$$",
      statements: [
        {
          key: "a",
          text: "Cỡ mẫu khảo sát $n = 20$.",
          correct: true,
          explanation: "$n = 4 + 8 + 6 + 2 = 20$ cây."
        },
        {
          key: "b",
          text: "Giá trị đại diện của nhóm $[25; 30)$ là $27{,}5$.",
          correct: true,
          explanation: "$c_2 = \\frac{25 + 30}{2} = 27{,}5\\text{ cm}$."
        },
        {
          key: "c",
          text: "Chiều cao trung bình của 20 cây giống là $\\bar{x} = 29\\text{ cm}$.",
          correct: true,
          explanation: "$\\bar{x} = \\frac{4(22{,}5) + 8(27{,}5) + 6(32{,}5) + 2(37{,}5)}{20} = \\frac{90 + 220 + 195 + 75}{20} = \\frac{580}{20} = 29\\text{ cm}$."
        },
        {
          key: "d",
          text: "Khoảng biến thiên của mẫu số liệu là $15\\text{ cm}$.",
          correct: false,
          explanation: "Khoảng biến thiên $R = 40 - 20 = 20\\text{ cm} \\ne 15\\text{ cm}$."
        }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất có điều kiện trong dây chuyền sản xuất",
      context: "Một công ty lắp ráp máy tính có hai dây chuyền đóng gói A và B. Dây chuyền A đóng gói $70\\%$ tổng sản phẩm, tỉ lệ sản phẩm bị hỏng bao bì là $2\\%$. Dây chuyền B đóng gói $30\\%$ tổng sản phẩm, tỉ lệ sản phẩm bị hỏng bao bì là $4\\%$. Kiểm tra ngẫu nhiên một sản phẩm trong kho.",
      statements: [
        {
          key: "a",
          text: "Xác suất sản phẩm được đóng gói bởi dây chuyền A là $0{,}7$.",
          correct: true,
          explanation: "Theo giả thiết dây chuyền A đóng gói $70\\%$ tổng sản phẩm nên xác suất là $0{,}7$."
        },
        {
          key: "b",
          text: "Xác suất một sản phẩm ngẫu nhiên bị hỏng bao bì là $0{,}026$.",
          correct: true,
          explanation: "Xác suất toàn phần: $P(H) = 0{,}7 \\cdot 0{,}02 + 0{,}3 \\cdot 0{,}04 = 0{,}014 + 0{,}012 = 0{,}026$."
        },
        {
          key: "c",
          text: "Nếu lấy ngẫu nhiên một sản phẩm thấy bao bì không bị hỏng, xác suất sản phẩm đó do dây chuyền B đóng gói xấp xỉ bằng $29{,}6\\%$.",
          correct: true,
          explanation: "Xác suất không hỏng của B: $0{,}3 \\cdot (1 - 0{,}04) = 0{,}3 \\cdot 0{,}96 = 0{,}288$. Xác suất không hỏng chung: $1 - 0{,}026 = 0{,}974$. Tỉ lệ: $\\frac{0{,}288}{0{,}974} \\approx 0{,}2957 = 29{,}57\\% \\approx 29{,}6\\%$."
        },
        {
          key: "d",
          text: "Biết rằng sản phẩm bị hỏng bao bì, xác suất sản phẩm đó do dây chuyền A đóng gói nhỏ hơn xác suất do dây chuyền B đóng gói.",
          correct: false,
          explanation: "Do dây chuyền A đóng góp $0{,}014$ lỗi, dây chuyền B đóng góp $0{,}012$ lỗi. Vì $0{,}014 > 0{,}012$ nên xác suất do A đóng gói lớn hơn xác suất do B đóng gói."
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
      topic: "Bài toán thực tế tối ưu hóa chi phí đường ống dẫn dầu",
      content: "Một trạm phát điện đặt trên bờ biển tại điểm $A$, một hòn đảo tại điểm $C$ cách bờ biển một khoảng $CD = 6\\text{ km}$ ($D$ nằm trên đường bờ biển thẳng). Khoảng cách $AD = 8\\text{ km}$. Người ta kéo dây cáp điện từ $A$ đến một điểm $M$ trên bờ ($M$ nằm giữa $A$ và $D$) theo đường trên cạn, rồi từ $M$ kéo cáp ngầm dưới biển đến $C$. Chi phí kéo cáp trên cạn là $30$ triệu đồng/km, chi phí ngầm dưới biển là $50$ triệu đồng/km. Khoảng cách $MD$ bằng bao nhiêu km để tổng chi phí kéo cáp là thấp nhất?",
      correctAnswer: "4,5",
      acceptableAnswers: ["4,5", "4.5", "9/2"],
      unit: "km",
      explanation: "Đặt $MD = x\\text{ (km)}$ với $0 \\le x \\le 8$. Khi đó $AM = 8 - x$.\nĐoạn cáp dưới biển: $MC = \\sqrt{x^2 + CD^2} = \\sqrt{x^2 + 36}$.\nTổng chi phí:\n$$f(x) = 30(8 - x) + 50\\sqrt{x^2 + 36} = 240 - 30x + 50\\sqrt{x^2 + 36}$$\nĐạo hàm: $f'(x) = -30 + 50 \\cdot \\frac{x}{\\sqrt{x^2 + 36}}$.\nCho $f'(x) = 0 \\iff 50x = 30\\sqrt{x^2 + 36} \\iff 5x = 3\\sqrt{x^2 + 36} \\iff 25x^2 = 9(x^2 + 36) \\iff 16x^2 = 324 \\iff x^2 = 20{,}25 \\iff x = 4{,}5\\text{ (km)}$."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 4,
      chapterName: "Nguyên hàm & Tích phân",
      topic: "Tích phân ứng dụng tính thể tích bồn nước elip tròn xoay",
      content: "Một bồn chứa nước có mặt cắt đứng là hình phẳng giới hạn bởi đường parabol $y = 4 - x^2$ và trục hoành $y = 0$ (đơn vị trên các trục là mét). Khi quay hình phẳng này quanh trục $Ox$, ta được khối tròn xoay có thể tích $V = \\frac{a\\pi}{b}$ (với $\\frac{a}{b}$ là phân số tối giản). Tính giá trị của $a + b$.",
      correctAnswer: "527",
      acceptableAnswers: ["527"],
      unit: "",
      explanation: "Hình phẳng giới hạn bởi $y = 4 - x^2$ và $y = 0$. Giao điểm trục hoành là $x = \\pm 2$.\nThể tích khi quay quanh $Ox$:\n$$V = \\pi \\int_{-2}^2 (4 - x^2)^2 \\,dx = \\pi \\int_{-2}^2 (16 - 8x^2 + x^4) \\,dx = 2\\pi \\left[16x - \\frac{8}{3}x^3 + \\frac{x^5}{5}\\right]_0^2$$\n$$= 2\\pi \\left(32 - \\frac{64}{3} + \\frac{32}{5}\\right) = 64\\pi \\left(1 - \\frac{2}{3} + \\frac{1}{5}\\right) = 64\\pi \\cdot \\frac{8}{15} = \\frac{512\\pi}{15}$$\nPhân số tối giản $\\frac{a}{b} = \\frac{512}{15} \\implies a = 512, b = 15 \\implies a + b = 527$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 5,
      chapterName: "Phương trình mặt phẳng Oxyz",
      topic: "Khoảng cách từ điểm đến đường thẳng trong Oxyz",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 2; -1)$ và $B(3; 0; 1)$. Mặt cầu đường kính $AB$ có phương trình là $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$. Tính tổng $a + b + c + R^2$.",
      correctAnswer: "6",
      acceptableAnswers: ["6", "6.0"],
      unit: "",
      explanation: "Tâm $I$ của mặt cầu là trung điểm của $AB$:\n$$a = \\frac{1 + 3}{2} = 2,\\quad b = \\frac{2 + 0}{2} = 1,\\quad c = \\frac{-1 + 1}{2} = 0 \\implies I(2; 1; 0)$$\nBán kính: $R = IA = \\sqrt{(1 - 2)^2 + (2 - 1)^2 + (-1 - 0)^2} = \\sqrt{1 + 1 + 1} = \\sqrt{3} \\implies R^2 = 3$.\nTổng $a + b + c + R^2 = 2 + 1 + 0 + 3 = 6$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 6,
      chapterName: "Xác suất có điều kiện",
      topic: "Xác suất công thức Bayes",
      content: "Một thiết bị có hai động cơ độc lập I và II. Xác suất động cơ I hoạt động tốt là $0{,}9$, xác suất động cơ II hoạt động tốt là $0{,}85$. Thiết bị hoạt động được nếu ít nhất một trong hai động cơ hoạt động tốt. Tính xác suất thiết bị hoạt động được.",
      correctAnswer: "0,985",
      acceptableAnswers: ["0,985", "0.985", "98,5%"],
      unit: "",
      explanation: "Xác suất cả hai động cơ cùng hỏng là:\n$$P(\\text{cả 2 hỏng}) = (1 - 0{,}9) \\cdot (1 - 0{,}85) = 0{,}1 \\cdot 0{,}15 = 0{,}015$$\nXác suất thiết bị hoạt động được (ít nhất 1 động cơ tốt) là:\n$$P = 1 - 0{,}015 = 0{,}985$$"
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 3,
      chapterName: "Thống kê số liệu ghép nhóm",
      topic: "Tứ phân vị thứ ba của mẫu số liệu ghép nhóm",
      content: "Số tiền điện (nghìn đồng) phải trả tháng vừa rồi của 40 hộ gia đình được thống kê như sau:\n$$\\begin{array}{|c|c|c|c|c|}\\hline \\text{Số tiền (nghìn đồng)} & [200; 400) & [400; 600) & [600; 800) & [800; 1000) \\\\ \\hline \\text{Số hộ} & 6 & 14 & 16 & 4 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm (làm tròn kết quả đến hàng đơn vị).",
      correctAnswer: "725",
      acceptableAnswers: ["725", "725.0"],
      unit: "nghìn đồng",
      explanation: "Cỡ mẫu $n = 40$. Vị trí tứ phân vị thứ ba là $\\frac{3n}{4} = 30$.\nTần số tích lũy: $cf_1 = 6, cf_2 = 20, cf_3 = 36$. Nhóm chứa $Q_3$ là nhóm $[600; 800)$ với $u_m = 600, n_m = 16, C = 20$, độ rộng $h = 200$.\n$$Q_3 = 600 + \\frac{30 - 20}{16} \\cdot 200 = 600 + \\frac{10}{16} \\cdot 200 = 600 + 125 = 725\\text{ (nghìn đồng)}$$"
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Bài toán thực tế tăng trưởng dân số / tối ưu",
      content: "Một người làm vườn muốn rào một khu đất hình chữ nhật giáp bờ một con sông thẳng để trồng rau (không cần rào phía bờ sông). Người đó có tổng cộng $120\\text{ m}$ lưới rào. Hỏi diện tích lớn nhất của khu đất có thể rào được là bao nhiêu mét vuông?",
      correctAnswer: "1800",
      acceptableAnswers: ["1800", "1800m2"],
      unit: "m²",
      explanation: "Gọi $x$ (mét) là chiều rộng của khu đất vuông góc với bờ sông ($0 < x < 60$).\nVì không cần rào phía bờ sông nên chiều dài rào song song với sông là $120 - 2x$ (mét).\nDiện tích khu đất là:\n$$S(x) = x(120 - 2x) = 120x - 2x^2 = -2(x^2 - 60x) = -2(x - 30)^2 + 1800$$\nDiện tích đạt giá trị lớn nhất bằng $1800\\text{ m}^2$ khi $x = 30\\text{ m}$ (chiều rộng $30\\text{ m}$, chiều dài $60\\text{ m}$)."
    }
  ]
};
