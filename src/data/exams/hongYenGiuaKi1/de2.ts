import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE2_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de2-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 2 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 2) do GV Lê Thị Hồng Yến biên soạn. Khảo sát hàm số, tính đơn điệu, cực trị, tiệm cận và bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 2"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên với $f'(x) > 0$ trên $(-\\infty; 0)$ và $(2; +\\infty)$, $f'(x) < 0$ trên $(0; 2)$. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: [
        { key: "A", text: "$(0; 2)$" },
        { key: "B", text: "$(2; +\\infty)$" },
        { key: "C", text: "$(-\\infty; 2)$" },
        { key: "D", text: "$(0; +\\infty)$" }
      ],
      correctAnswer: "B",
      explanation: "$f'(x) > 0$ trên $(2; +\\infty)$ nên hàm số đồng biến trên $(2; +\\infty)$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị từ bảng xét dấu",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ có bảng xét dấu $f'(x)$ đổi dấu từ dương sang âm tại $x = 1$, từ âm sang dương tại $x = 3$. Điểm cực đại của hàm số là",
      options: [
        { key: "A", text: "$x = 1$" },
        { key: "B", text: "$x = 3$" },
        { key: "C", text: "$x = 0$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "A",
      explanation: "Đạo hàm đổi dấu từ dương sang âm tại $x = 1$ nên $x = 1$ là điểm cực đại."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giá trị cực đại từ đồ thị",
      content: "Cho hàm số bậc ba $y = f(x)$ có đồ thị đạt đỉnh cực đại tại điểm $(0; 3)$ và cực tiểu tại $(2; -1)$. Giá trị cực đại của hàm số bằng",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$0$" },
        { key: "C", text: "$2$" },
        { key: "D", text: "$-1$" }
      ],
      correctAnswer: "A",
      explanation: "Giá trị cực đại là tung độ của điểm cực đại: $y_{CĐ} = 3$."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đơn điệu hàm phân thức",
      content: "Hàm số $y = \\frac{x + 1}{x - 2}$ nghịch biến trên khoảng nào sau đây?",
      options: [
        { key: "A", text: "$(2; +\\infty)$" },
        { key: "B", text: "$\\mathbb{R}$" },
        { key: "C", text: "$\\mathbb{R} \\setminus \\{2\\}$" },
        { key: "D", text: "$(-\\infty; +\\infty)$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = \\frac{1(-2) - 1(1)}{(x-2)^2} = \\frac{-3}{(x-2)^2} < 0$. Hàm số nghịch biến trên từng khoảng $(-\\infty; 2)$ và $(2; +\\infty)$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm số",
      content: "Điểm cực tiểu của hàm số $y = x^3 - 6x^2 + 9x - 2$ là",
      options: [
        { key: "A", text: "$x = 3$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$x = -2$" },
        { key: "D", text: "$x = 2$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3) = 0 \\iff x = 1$ (cực đại) hoặc $x = 3$ (cực tiểu)."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Giá trị nhỏ nhất của hàm số $y = x^3 - 3x^2 + 1$ trên đoạn $[0; 3]$ bằng",
      options: [
        { key: "A", text: "$-3$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$0$" },
        { key: "D", text: "$-2$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 3x(x - 2) = 0 \\implies x = 0$ hoặc $x = 2$. $y(0) = 1, y(2) = -3, y(3) = 1$. Vậy $\\min = -3$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Giá trị lớn nhất của hàm số $y = \\frac{x - 1}{x + 1}$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$\\frac{1}{3}$" },
        { key: "B", text: "$-1$" },
        { key: "C", text: "$0$" },
        { key: "D", text: "$1$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = \\frac{2}{(x+1)^2} > 0 \\implies$ hàm số đồng biến. GTLN đạt tại $x = 2$: $y(2) = \\frac{1}{3}$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang",
      content: "Đường tiệm cận ngang của đồ thị hàm số $y = \\frac{4x - 3}{2x + 1}$ là",
      options: [
        { key: "A", text: "$y = 2$" },
        { key: "B", text: "$y = -3$" },
        { key: "C", text: "$x = -1/2$" },
        { key: "D", text: "$y = 4$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận ngang: $y = \\frac{4}{2} = 2$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 2x + 3}{x + 1}$ là đường thẳng",
      options: [
        { key: "A", text: "$y = x - 3$" },
        { key: "B", text: "$y = x + 3$" },
        { key: "C", text: "$y = x - 1$" },
        { key: "D", text: "$y = 2x - 3$" }
      ],
      correctAnswer: "A",
      explanation: "$\\frac{x^2 - 2x + 3}{x + 1} = x - 3 + \\frac{6}{x + 1} \\implies$ tiệm cận xiên $y = x - 3$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nhận dạng hàm số",
      content: "Đồ thị hàm số $y = \\frac{ax + b}{cx + d}$ có tiệm cận đứng $x = 1$, tiệm cận ngang $y = 3$ và đi qua $(0; -2)$. Hàm số đó là",
      options: [
        { key: "A", text: "$y = \\frac{3x - 2}{x - 1}$" },
        { key: "B", text: "$y = \\frac{3x + 2}{x - 1}$" },
        { key: "C", text: "$y = \\frac{3x - 2}{x + 1}$" },
        { key: "D", text: "$y = \\frac{x - 2}{x - 1}$" }
      ],
      correctAnswer: "B",
      explanation: "Hàm số $y = \\frac{3x + 2}{x - 1}$ có TCĐ $x = 1$, TCN $y = 3$, tại $x = 0 \\implies y = -2$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{2x + 5}{x - 3}$ là",
      options: [
        { key: "A", text: "$I(3; 2)$" },
        { key: "B", text: "$I(-3; 2)$" },
        { key: "C", text: "$I(3; -2)$" },
        { key: "D", text: "$I(2; 3)$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận đứng $x = 3$, tiệm cận ngang $y = 2 \\implies I(3; 2)$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cắt trục tung",
      content: "Đồ thị hàm số $y = \\frac{2x - 8}{x - 2}$ cắt trục tung tại điểm có tọa độ",
      options: [
        { key: "A", text: "$(0; 4)$" },
        { key: "B", text: "$(4; 0)$" },
        { key: "C", text: "$(0; -8)$" },
        { key: "D", text: "$(2; 0)$" }
      ],
      correctAnswer: "A",
      explanation: "Tại $x = 0 \\implies y = \\frac{-8}{-2} = 4$. Tọa độ $(0; 4)$."
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
      context: "Cho hàm số $y = f(x) = x^3 - 6x^2 + 9x - 1$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số là $f'(x) = 3x^2 - 12x + 9$.", correct: true, explanation: "$f'(x) = 3x^2 - 12x + 9$." },
        { key: "b", text: "Hàm số đồng biến trên khoảng $(1; 3)$.", correct: false, explanation: "Trên $(1; 3)$, $f'(x) < 0$ nên nghịch biến." },
        { key: "c", text: "Điểm cực đại của hàm số là $x = 1$.", correct: true, explanation: "Đạo hàm đổi dấu $+ \\to -$ tại $x = 1$." },
        { key: "d", text: "Khoảng cách giữa hai điểm cực trị bằng $2\\sqrt{5}$.", correct: true, explanation: "$A(1; 3), B(3; -1) \\implies AB = \\sqrt{2^2 + (-4)^2} = \\sqrt{20} = 2\\sqrt{5}$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị hàm số",
      context: "Cho hàm số $f(x) = x + \\frac{4}{x}$ trên $(0; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm $f'(x) = 1 - \\frac{4}{x^2}$.", correct: true, explanation: "$f'(x) = 1 - \\frac{4}{x^2}$." },
        { key: "b", text: "Nghiệm của $f'(x) = 0$ trên $(0; +\\infty)$ là $x = 2$.", correct: true, explanation: "$x^2 = 4 \\implies x = 2$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên $(0; +\\infty)$ bằng $4$.", correct: true, explanation: "$f(2) = 2 + 2 = 4$." },
        { key: "d", text: "Hàm số đồng biến trên khoảng $(0; 2)$.", correct: false, explanation: "Nghịch biến trên $(0; 2)$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận và tính chất",
      context: "Cho hàm số $y = \\frac{3x - 1}{x + 1}$.",
      statements: [
        { key: "a", text: "Tiệm cận đứng là $x = -1$.", correct: true, explanation: "Mẫu bằng 0 tại $x = -1$." },
        { key: "b", text: "Tiệm cận ngang là $y = 3$.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 3$." },
        { key: "c", text: "Hàm số đồng biến trên từng khoảng xác định.", correct: true, explanation: "$y' = \\frac{4}{(x+1)^2} > 0$." },
        { key: "d", text: "Tâm đối xứng là $I(-1; 3)$.", correct: true, explanation: "Giao điểm hai tiệm cận." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức bậc 2 trên bậc 1",
      context: "Cho hàm số $y = \\frac{x^2 - 4x + 5}{x - 2}$.",
      statements: [
        { key: "a", text: "Tiệm cận đứng là $x = 2$.", correct: true, explanation: "Mẫu bằng 0 tại $x = 2$." },
        { key: "b", text: "Tiệm cận xiên là $y = x - 2$.", correct: true, explanation: "$\\frac{x^2 - 4x + 5}{x - 2} = x - 2 + \\frac{1}{x - 2}$." },
        { key: "c", text: "Giao điểm hai tiệm cận là $I(2; 0)$.", correct: true, explanation: "Tại $x = 2 \\implies y = 0$." },
        { key: "d", text: "Đồ thị cắt trục hoành tại 2 điểm.", correct: false, explanation: "$x^2 - 4x + 5 = 0$ có $\\Delta' = -1 < 0$ vô nghiệm." }
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
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 5}{x + m}$ đồng biến trên khoảng $(2; +\\infty)$?",
      correctAnswer: "6",
      acceptableAnswers: ["6"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 5}{(x + m)^2} > 0 \\iff m > 5$. $-m \\le 2 \\iff m \\ge -2$. Suy ra $m > 5 \\implies m \\in \\{6, 7, 8, 9, 10\\}$ (5 giá trị nếu $m > 5$, từ 6 đến 10 có 5 giá trị; nếu tính cả thì 5 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa thể tích",
      content: "Một chiếc bồn hình trụ có nắp thể tích $V = 54\\pi\\text{ dm}^3$. Tìm bán kính đáy $R\\text{ (dm)}$ để diện tích toàn phần là nhỏ nhất.",
      correctAnswer: "3",
      acceptableAnswers: ["3", "3dm"],
      unit: "dm",
      explanation: "$R^3 = \\frac{V}{2\\pi} = \\frac{54\\pi}{2\\pi} = 27 \\implies R = 3\\text{ dm}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Chi phí sản xuất $x$ sản phẩm là $C(x) = x^2 + 40x + 1000$ (nghìn đồng), giá bán $p(x) = 280 - x$. Tìm $x$ để lợi nhuận lớn nhất.",
      correctAnswer: "60",
      acceptableAnswers: ["60"],
      unit: "sản phẩm",
      explanation: "$P(x) = x(280 - x) - (x^2 + 40x + 1000) = -2x^2 + 240x - 1000$. Đỉnh tại $x = 60$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nồng độ thuốc",
      content: "Nồng độ thuốc sau $t$ giờ là $C(t) = \\frac{12t}{t^2 + 4}$. Sau bao nhiêu giờ thì nồng độ đạt cực đại?",
      correctAnswer: "2",
      acceptableAnswers: ["2", "2h", "2 giờ"],
      unit: "giờ",
      explanation: "$C'(t) = 0 \\iff t^2 = 4 \\iff t = 2$ giờ."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = x^3 - 3x^2 - 9x + 2$. Tìm các khoảng đơn điệu và cực trị của hàm số.",
      correctAnswer: "x=-1, x=3",
      acceptableAnswers: ["x=-1, x=3"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "Đồng biến trên $(-\\infty; -1)$ và $(3; +\\infty)$, nghịch biến trên $(-1; 3)$. Cực đại tại $x = -1$ ($y = 7$), cực tiểu tại $x = 3$ ($y = -25$)."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Máng nước",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nMột tấm tôn dài có bề rộng $60\\text{ cm}$ uốn thành chiếc máng mặt cắt ngang hình chữ nhật hở trên, chiều cao mép gấp là $x\\text{ cm}$. Tìm $x$ để diện tích mặt cắt ngang lớn nhất.",
      correctAnswer: "15",
      acceptableAnswers: ["15", "15cm"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "Mặt cắt hình chữ nhật có đáy $60 - 2x$ và chiều cao $x$. Diện tích $S(x) = x(60 - 2x) = 60x - 2x^2$. Đỉnh parabol tại $x = -\\frac{60}{2(-2)} = 15\\text{ cm}$."
    }
  ]
};
