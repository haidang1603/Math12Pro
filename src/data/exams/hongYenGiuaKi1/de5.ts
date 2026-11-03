import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE5_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de5-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 5 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 5) do GV Lê Thị Hồng Yến biên soạn. Khảo sát hàm số, tính đơn điệu, cực trị, tiệm cận và các bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 5"],
  part1: [
    {
      imageUrl: "/exams/hongYen/de5_p1_c1.png",
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 2 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & \\\\ \\hline & & & 4 & & & & +\\infty \\\\ f(x) & & \\nearrow & & \\searrow & & \\nearrow & \\\\ & -\\infty & & & & -1 & & \\end{array}$$\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -1)$" },
        { key: "B", text: "$(-1; 2)$" },
        { key: "C", text: "$(2; +\\infty)$" },
        { key: "D", text: "$(-1; 4)$" }
      ],
      correctAnswer: "B",
      explanation: "Theo bảng biến thiên, trên khoảng $(-1; 2)$, đạo hàm $f'(x) < 0$ nên hàm số nghịch biến trên khoảng $(-1; 2)$."
    },
    {
      imageUrl: "/exams/hongYen/de5_p1_c2.png",
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\n$$\\begin{array}{c|ccccccccc} x & -\\infty & & -2 & & 1 & & 3 & & +\\infty \\\\ \\hline f'(x) & & + & 0 & - & 0 & + & 0 & + & \\end{array}$$\n\nĐiểm cực đại của hàm số đã cho là",
      options: [
        { key: "A", text: "$x = -2$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$x = 3$" },
        { key: "D", text: "$x = 0$" }
      ],
      correctAnswer: "A",
      explanation: "Đạo hàm $f'(x)$ đổi dấu từ dương sang âm khi qua điểm $x = -2$, do đó $x = -2$ là điểm cực đại của hàm số."
    },
    {
      imageUrl: "/exams/hongYen/de5_p1_c3.png",
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị cực đại từ đồ thị",
      content: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị như hình vẽ bên (đạt cực đại tại $(1; 2)$ và cực tiểu tại $(0; -2)$). Giá trị cực đại của hàm số đã cho bằng",
      options: [
        { key: "A", text: "$1$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$-1$" },
        { key: "D", text: "$-2$" }
      ],
      correctAnswer: "B",
      explanation: "Giá trị cực đại của hàm số là tung độ đỉnh cao nhất cục bộ trên đồ thị: $y_{CĐ} = 2$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến",
      content: "Hàm số $y = x^3 - 3x + 2$ nghịch biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(-\\infty; -1)$" },
        { key: "B", text: "$(1; +\\infty)$" },
        { key: "C", text: "$(-1; 1)$" },
        { key: "D", text: "$(0; 2)$" }
      ],
      correctAnswer: "C",
      explanation: "$y' = 3x^2 - 3 = 3(x^2 - 1) < 0 \\iff -1 < x < 1$. Do đó hàm số nghịch biến trên $(-1; 1)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm bậc ba",
      content: "Điểm cực tiểu của hàm số $y = \\frac{1}{3}x^3 - x^2 - 3x + 1$ là",
      options: [
        { key: "A", text: "$x = -1$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = -8$" },
        { key: "D", text: "$x = 0$" }
      ],
      correctAnswer: "B",
      explanation: "$y' = x^2 - 2x - 3 = (x + 1)(x - 3) = 0 \\iff x = -1$ (cực đại) hoặc $x = 3$ (cực tiểu)."
    },
    {
      imageUrl: "/exams/hongYen/de5_p1_c6.png",
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 3]$ có BBT: $f(-2) = -2, f(-1) = 6, f(1) = -3, f(3) = 4$. Giá trị lớn nhất của hàm số trên $[-2; 3]$ bằng",
      options: [
        { key: "A", text: "$4$" },
        { key: "B", text: "$6$" },
        { key: "C", text: "$-3$" },
        { key: "D", text: "$-2$" }
      ],
      correctAnswer: "B",
      explanation: "So sánh các giá trị trên đoạn, giá trị lớn nhất là $\\max_{[-2; 3]} f(x) = f(-1) = 6$."
    },
    {
      imageUrl: "/exams/hongYen/de5_p1_c7.png",
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN hàm bậc bốn",
      content: "Giá trị nhỏ nhất của hàm số $y = x^4 - 4x^2 + 3$ trên đoạn $[0; 3]$ bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$0$" },
        { key: "C", text: "$-1$" },
        { key: "D", text: "$-4$" }
      ],
      correctAnswer: "C",
      explanation: "$y' = 4x(x^2 - 2) = 0 \\iff x = 0$ hoặc $x = \\sqrt{2} \\in [0; 3]$. $y(0) = 3, y(\\sqrt{2}) = 4 - 8 + 3 = -1, y(3) = 81 - 36 + 3 = 48$. Vậy $\\min = -1$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận đứng",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{-2\\}$ có BBT: khi $x \\to -2^- \\implies y \\to -\\infty$ và $x \\to -2^+ \\implies y \\to +\\infty$. Tiệm cận đứng của đồ thị hàm số đã cho là đường thẳng",
      options: [
        { key: "A", text: "$y = 1$" },
        { key: "B", text: "$x = -2$" },
        { key: "C", text: "$x = 1$" },
        { key: "D", text: "$y = -2$" }
      ],
      correctAnswer: "B",
      explanation: "Vì $\\lim_{x \\to -2} f(x) = \\pm\\infty$ nên đường tiệm cận đứng là $x = -2$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + 2x - 1}{x + 1}$ là",
      options: [
        { key: "A", text: "$y = x - 1$" },
        { key: "B", text: "$y = x + 1$" },
        { key: "C", text: "$y = x$" },
        { key: "D", text: "$y = 2x + 1$" }
      ],
      correctAnswer: "B",
      explanation: "Chia tử cho mẫu: $\\frac{x^2 + 2x - 1}{x + 1} = x + 1 - \\frac{2}{x + 1}$. Do đó tiệm cận xiên là $y = x + 1$."
    },
    {
      imageUrl: "/exams/hongYen/de5_p1_c10.png",
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng đồ thị",
      content: "Đường cong trong hình vẽ bên (cắt trục tung tại $(0; 2)$, cực tiểu tại $(2; -2)$) là đồ thị của hàm số nào dưới đây?",
      options: [
        { key: "A", text: "$y = x^3 - 3x^2 + 2$" },
        { key: "B", text: "$y = -x^3 + 3x^2 + 2$" },
        { key: "C", text: "$y = x^3 - 3x + 2$" },
        { key: "D", text: "$y = x^4 - 2x^2 + 2$" }
      ],
      correctAnswer: "A",
      explanation: "Hàm số $y = x^3 - 3x^2 + 2$ có $y' = 3x(x - 2) = 0 \\iff x = 0$ (cực đại $y = 2$), $x = 2$ (cực tiểu $y = -2$)."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang",
      content: "Đồ thị hàm số $y = \\frac{2x - 5}{x - 3}$ có đường tiệm cận ngang là",
      options: [
        { key: "A", text: "$x = 3$" },
        { key: "B", text: "$y = 2$" },
        { key: "C", text: "$y = 3$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "B",
      explanation: "Tiệm cận ngang: $y = 2$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{3x - 1}{x + 1}$ là điểm",
      options: [
        { key: "A", text: "$I(1; 3)$" },
        { key: "B", text: "$I(3; -1)$" },
        { key: "C", text: "$I(-1; 3)$" },
        { key: "D", text: "$I(-1; -1)$" }
      ],
      correctAnswer: "C",
      explanation: "Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 3 \\implies I(-1; 3)$."
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
      context: "Cho hàm số $y = f(x) = x^3 - 3x^2 - 9x + 5$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số đã cho là $f'(x) = 3x^2 - 6x - 9$.", correct: true, explanation: "$f'(x) = 3x^2 - 6x - 9$." },
        { key: "b", text: "Hàm số đồng biến trên khoảng $(-1; 3)$.", correct: false, explanation: "Trên $(-1; 3)$, $f'(x) < 0$ nên hàm số nghịch biến." },
        { key: "c", text: "Hàm số đạt cực đại tại điểm $x = -1$ và đạt cực tiểu tại điểm $x = 3$.", correct: true, explanation: "Đạo hàm đổi dấu $+ \\to -$ qua $x = -1$ và $- \\to +$ qua $x = 3$." },
        { key: "d", text: "Đường thẳng đi qua hai điểm cực trị của đồ thị hàm số có phương trình là $y = -8x + 2$.", correct: true, explanation: "Chia $y$ cho $y'$: $x^3 - 3x^2 - 9x + 5 = (3x^2 - 6x - 9)(\\frac{1}{3}x - \\frac{1}{3}) + (-8x + 2)$. Phần dư là $-8x + 2$ chính là phương trình đường thẳng qua 2 cực trị." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Khảo sát hàm số dạng $x + a/(x-1)$",
      context: "Cho hàm số $f(x) = x + \\frac{25}{x - 1}$ xác định trên khoảng $(1; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số trên $(1; +\\infty)$ là $f'(x) = 1 - \\frac{25}{(x - 1)^2}$.", correct: true, explanation: "$f'(x) = 1 - 25/(x-1)^2$." },
        { key: "b", text: "Phương trình $f'(x) = 0$ có nghiệm duy nhất thuộc khoảng $(1; +\\infty)$ là $x = 6$.", correct: true, explanation: "$(x - 1)^2 = 25 \\iff x - 1 = 5 \\iff x = 6$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên khoảng $(1; +\\infty)$ bằng $11$.", correct: true, explanation: "$f(6) = 6 + 5 = 11$." },
        { key: "d", text: "Hàm số đồng biến trên khoảng $(1; 6)$.", correct: false, explanation: "Nghịch biến trên $(1; 6)$ và đồng biến trên $(6; +\\infty)$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm nhất biến",
      context: "Cho hàm số $y = f(x) = \\frac{3x + 1}{x - 1}$.",
      statements: [
        { key: "a", text: "Đường thẳng $x = 1$ là đường tiệm cận đứng của đồ thị hàm số.", correct: true, explanation: "Mẫu bằng 0 tại $x = 1$." },
        { key: "b", text: "Đường thẳng $y = 3$ là đường tiệm cận ngang của đồ thị hàm số.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 3$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định.", correct: false, explanation: "$y' = \\frac{-4}{(x-1)^2} < 0$, hàm số nghịch biến trên từng khoảng xác định." },
        { key: "d", text: "Điểm $I(1; 3)$ là tâm đối xứng của đồ thị hàm số.", correct: true, explanation: "Giao điểm của 2 tiệm cận là $I(1; 3)$." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức bậc 2 trên bậc 1",
      context: "Cho hàm số $y = f(x) = \\frac{x^2 - x + 2}{x - 1}$.",
      statements: [
        { key: "a", text: "Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.", correct: true, explanation: "Mẫu khác 0 $\\iff x \\ne 1$." },
        { key: "b", text: "Đường thẳng $y = x$ là đường tiệm cận xiên của đồ thị hàm số.", correct: true, explanation: "$\\frac{x^2 - x + 2}{x - 1} = x + \\frac{2}{x - 1} \\implies$ tiệm cận xiên $y = x$." },
        { key: "c", text: "Tọa độ giao điểm của hai đường tiệm cận là điểm $I(1; 1)$.", correct: true, explanation: "Tại $x = 1 \\implies y = 1$." },
        { key: "d", text: "Đồ thị hàm số cắt trục hoành tại hai điểm phân biệt.", correct: false, explanation: "$x^2 - x + 2 = 0$ có $\\Delta = 1 - 8 = -7 < 0$, vô nghiệm." }
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
      topic: "Tham số m",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 3}{x + m}$ nghịch biến trên khoảng $(2; +\\infty)$?",
      correctAnswer: "5",
      acceptableAnswers: ["5"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 3}{(x + m)^2} < 0 \\iff m < 3$. Điểm gián đoạn $-m \\le 2 \\iff m \\ge -2$. Do đó $-2 \\le m < 3$. Các giá trị nguyên thỏa mãn: $m \\in \\{-2, -1, 0, 1, 2\\}$ (5 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa bể cá",
      content: "Người ta muốn làm một chiếc bể cá cảnh bằng kính dạng hình hộp chữ nhật không có nắp đậy với thể tích bằng $500\\text{ dm}^3$, đáy bể là hình vuông có cạnh bằng $x\\text{ (dm)}$. Hỏi cạnh đáy $x$ bằng bao nhiêu đêximét để diện tích kính dùng làm bể (gồm một mặt đáy và bốn mặt xung quanh) là nhỏ nhất?",
      correctAnswer: "10",
      acceptableAnswers: ["10", "10dm"],
      unit: "dm",
      explanation: "Chiều cao bể: $h = \\frac{500}{x^2}$. Diện tích kính: $S(x) = x^2 + 4xh = x^2 + \\frac{2000}{x} = x^2 + \\frac{1000}{x} + \\frac{1000}{x} \\ge 3\\sqrt[3]{10^6} = 300$. Dấu bằng khi $x^2 = \\frac{1000}{x} \\iff x^3 = 1000 \\iff x = 10\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Một công ty sản xuất đồ gia dụng sản xuất nồi cơm điện. Chi phí sản xuất $x$ chiếc nồi cơm điện mỗi ngày ($x > 0$) được xác định bởi hàm số $C(x) = x^2 + 80x + 2500$ (nghìn đồng). Giá bán mỗi chiếc nồi cơm điện trên thị trường phụ thuộc vào số lượng sản xuất theo công thức $p(x) = 400 - x$ (nghìn đồng). Hỏi công ty cần sản xuất bao nhiêu chiếc nồi cơm điện mỗi ngày để lợi nhuận thu được là lớn nhất?",
      correctAnswer: "80",
      acceptableAnswers: ["80", "80 chiếc"],
      unit: "chiếc",
      explanation: "$P(x) = x(400 - x) - (x^2 + 80x + 2500) = -2x^2 + 320x - 2500$. Đỉnh parabol tại $x = -\\frac{320}{2(-2)} = 80$ chiếc."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Vận tốc cực đại",
      content: "Một vật chuyển động thẳng với phương trình quãng đường $s(t) = -t^3 + 9t^2 + 12t$, trong đó thời gian $t$ tính bằng giây ($t \\ge 0$) và quãng đường $s(t)$ tính bằng mét. Vận tốc của vật đạt giá trị lớn nhất bằng bao nhiêu mét trên giây?",
      correctAnswer: "39",
      acceptableAnswers: ["39", "39m/s"],
      unit: "m/s",
      explanation: "Vận tốc là đạo hàm của quãng đường: $v(t) = s'(t) = -3t^2 + 18t + 12 = -3(t - 3)^2 + 39 \\le 39\\text{ m/s}$. Giá trị lớn nhất là $39\\text{ m/s}$ tại $t = 3$ giây."
    },
  ],
  part4: [
    {
      id: 1,
      part: 4,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = f(x) = -x^3 + 3x^2 + 9x - 2$. Tìm các khoảng đơn điệu và xác định các điểm cực trị của hàm số đã cho.",
      correctAnswer: "x=-1, x=3",
      acceptableAnswers: ["x=-1, x=3", "-1, 3", "-1 và 3", "A(-1;-7), B(3;25)", "(-1;-7), (3;25)", "A(-1; -7), B(3; 25)", "(-1; -7), (3; 25)"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "$y' = -3x^2 + 6x + 9 = -3(x + 1)(x - 3) = 0 \\iff x = -1$ hoặc $x = 3$.\nHàm số đồng biến trên khoảng $(-1; 3)$, nghịch biến trên các khoảng $(-\\infty; -1)$ và $(3; +\\infty)$.\nĐiểm cực tiểu $x = -1$ ($y_{CT} = -7$), điểm cực đại $x = 3$ ($y_{CĐ} = 25$)."
    },
    {
      id: 2,
      part: 4,
      number: 2,
      imageUrl: "/exams/hongYen/de5_p3_c2.png",
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Bài toán rào vườn chia ngăn",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nMột người nông dân muốn xây dựng một khu vườn hình chữ nhật để trồng rau có diện tích bằng $600\\text{ m}^2$. Khu vườn được chia làm hai ngăn bằng nhau bởi một hàng rào song song với chiều rộng của khu vườn. Chi phí làm hàng rào bao quanh và hàng rào ngăn đôi được tính theo mét chiều dài rào. Tìm kích thước chiều dài và chiều rộng của khu vườn sao cho tổng chiều dài hàng rào lưới thép cần sử dụng là ngắn nhất.",
      correctAnswer: "20m, 30m",
      acceptableAnswers: ["20m, 30m", "x=20, y=30", "20 và 30", "30, 20", "30m, 20m", "20, 30", "30 và 20", "20", "30"],
      isEssay: true,
      pointWeight: 0.5,
      explanation: "Gọi $x$ là chiều rộng (song song với rào ngăn) và $y$ là chiều dài khu vườn ($x > 0, y > 0$).\nDiện tích: $xy = 600 \\implies y = \\frac{600}{x}$.\nTổng chiều dài hàng rào gồm 3 đoạn chiều rộng $x$ (2 cạnh bao + 1 ngăn) và 2 đoạn chiều dài $y$:\n$$L(x) = 3x + 2y = 3x + \\frac{1200}{x} \\ge 2\\sqrt{3x \\cdot \\frac{1200}{x}} = 2\\sqrt{3600} = 120\\text{ (m)}$$\nDấu đẳng thức xảy ra khi $3x = \\frac{1200}{x} \\iff x^2 = 400 \\iff x = 20\\text{ m}$.\nKhi đó chiều dài $y = \\frac{600}{20} = 30\\text{ m}$.\nVậy chiều rộng là $20\\text{ m}$ và chiều dài là $30\\text{ m}$."
    }
  ]
};

