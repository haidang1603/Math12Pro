import { ExamData } from "@/types/exam";

export const EXAM_GIUA_KI_1_DE3_HONG_YEN: ExamData = {
  id: "toan12-giua-ki-1-de3-hong-yen",
  title: "Đề Ôn Kiểm Tra Giữa Kì 1 - Môn Toán 12 (Đề 3 - GV Lê Thị Hồng Yến)",
  milestone: "GIUA_KI_1",
  durationMinutes: 90,
  authorName: "Giáo viên: Lê Thị Hồng Yến (Lớp 12B)",
  description: "Đề ôn kiểm tra Giữa Kì 1 môn Toán lớp 12B năm học 2026 - 2027 (Đề số 3) do GV Lê Thị Hồng Yến biên soạn. Khảo sát hàm số, tính đơn điệu, cực trị, tiệm cận và bài toán tối ưu thực tế.",
  tags: ["Giữa kì 1", "Toán 12B", "GV Lê Thị Hồng Yến", "Đề 3"],
  part1: [
    {
      id: 1,
      part: 1,
      number: 1,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đồng biến nghịch biến",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên: $f'(x) > 0$ trên $(-2; 1)$ và $f'(x) < 0$ trên $(-\\infty; -2)$ và $(1; +\\infty)$. Hàm số đã cho đồng biến trên khoảng nào?",
      options: [
        { key: "A", text: "$(-2; 1)$" },
        { key: "B", text: "$(-\\infty; -2)$" },
        { key: "C", text: "$(1; +\\infty)$" },
        { key: "D", text: "$(-1; 3)$" }
      ],
      correctAnswer: "A",
      explanation: "Hàm số đồng biến trên khoảng $(-2; 1)$ vì tại đó $f'(x) > 0$."
    },
    {
      id: 2,
      part: 1,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực trị",
      content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x - 2)^2(x + 3)$. Số điểm cực trị của hàm số là",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$3$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$4$" }
      ],
      correctAnswer: "A",
      explanation: "$f'(x)$ đổi dấu khi đi qua 2 nghiệm đơn $x = 0$ và $x = -3$, không đổi dấu qua nghiệm bội hai $x = 2$. Do đó hàm số có 2 điểm cực trị."
    },
    {
      id: 3,
      part: 1,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Điểm cực trị",
      content: "Cho hàm số $y = x^3 - 3x^2 - 1$. Điểm cực đại của hàm số là",
      options: [
        { key: "A", text: "$x = 0$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = -1$" },
        { key: "D", text: "$y = -5$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 3x(x - 2) = 0 \\iff x = 0$ (cực đại) hoặc $x = 2$ (cực tiểu)."
    },
    {
      id: 4,
      part: 1,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Đơn điệu",
      content: "Hàm số $y = -x^3 + 3x$ đồng biến trên khoảng nào?",
      options: [
        { key: "A", text: "$(-1; 1)$" },
        { key: "B", text: "$(1; +\\infty)$" },
        { key: "C", text: "$(-\\infty; -1)$" },
        { key: "D", text: "$(-1; 2)$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = -3x^2 + 3 > 0 \\iff -1 < x < 1$."
    },
    {
      id: 5,
      part: 1,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cực tiểu",
      content: "Điểm cực tiểu của hàm số $y = \\frac{1}{3}x^3 - 2x^2 + 3x + 1$ là",
      options: [
        { key: "A", text: "$x = 3$" },
        { key: "B", text: "$x = 1$" },
        { key: "C", text: "$x = -1$" },
        { key: "D", text: "$y = 1$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = x^2 - 4x + 3 = 0 \\iff x = 1$ (cực đại) hoặc $x = 3$ (cực tiểu)."
    },
    {
      id: 6,
      part: 1,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTNN trên đoạn",
      content: "Giá trị nhỏ nhất của hàm số $y = x^3 - 3x + 2$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$0$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$4$" },
        { key: "D", text: "$-1$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 3x^2 - 3 = 0 \\iff x = 1 \\in [0; 2]$. Ta có $y(0) = 2, y(1) = 0, y(2) = 4$. Vậy $\\min = 0$."
    },
    {
      id: 7,
      part: 1,
      number: 7,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "GTLN trên đoạn",
      content: "Giá trị lớn nhất của hàm số $y = x^4 - 4x^2 + 5$ trên đoạn $[0; 2]$ bằng",
      options: [
        { key: "A", text: "$5$" },
        { key: "B", text: "$1$" },
        { key: "C", text: "$3$" },
        { key: "D", text: "$2$" }
      ],
      correctAnswer: "A",
      explanation: "$y' = 4x(x^2 - 2) = 0 \\implies x = 0$ hoặc $x = \\sqrt{2}$. $y(0) = 5, y(\\sqrt{2}) = 1, y(2) = 5$. Vậy $\\max = 5$."
    },
    {
      id: 8,
      part: 1,
      number: 8,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận ngang",
      content: "Đường tiệm cận ngang của đồ thị hàm số $y = \\frac{3x + 1}{x - 2}$ là",
      options: [
        { key: "A", text: "$y = 3$" },
        { key: "B", text: "$x = 2$" },
        { key: "C", text: "$y = -1/2$" },
        { key: "D", text: "$x = 3$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận ngang: $y = 3$."
    },
    {
      id: 9,
      part: 1,
      number: 9,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tiệm cận xiên",
      content: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + x - 2}{x + 2}$... nếu rút gọn $y = x - 1$. Với $y = \\frac{x^2 + 2x - 3}{x - 1} = x + 3$, tiệm cận xiên của $y = \\frac{x^2 - x + 2}{x + 1}$ là",
      options: [
        { key: "A", text: "$y = x - 2$" },
        { key: "B", text: "$y = x + 2$" },
        { key: "C", text: "$y = x$" },
        { key: "D", text: "$y = 2x - 1$" }
      ],
      correctAnswer: "A",
      explanation: "$\\frac{x^2 - x + 2}{x + 1} = x - 2 + \\frac{4}{x + 1} \\implies$ tiệm cận xiên $y = x - 2$."
    },
    {
      id: 10,
      part: 1,
      number: 10,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tâm đối xứng",
      content: "Tâm đối xứng của đồ thị hàm số $y = \\frac{2x - 3}{x + 1}$ là điểm",
      options: [
        { key: "A", text: "$I(-1; 2)$" },
        { key: "B", text: "$I(1; 2)$" },
        { key: "C", text: "$I(-1; -3)$" },
        { key: "D", text: "$I(2; -1)$" }
      ],
      correctAnswer: "A",
      explanation: "Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2 \\implies I(-1; 2)$."
    },
    {
      id: 11,
      part: 1,
      number: 11,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Cắt trục tung",
      content: "Đồ thị hàm số $y = \\frac{4x - 6}{x + 2}$ cắt trục tung tại điểm có tọa độ",
      options: [
        { key: "A", text: "$(0; -3)$" },
        { key: "B", text: "$(3/2; 0)$" },
        { key: "C", text: "$(0; 3)$" },
        { key: "D", text: "(-2; 0)$" }
      ],
      correctAnswer: "A",
      explanation: "Tại $x = 0 \\implies y = \\frac{-6}{2} = -3$. Điểm $(0; -3)$."
    },
    {
      id: 12,
      part: 1,
      number: 12,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Giao điểm trục hoành",
      content: "Đồ thị hàm số $y = x^3 - 3x$ cắt trục hoành tại bao nhiêu điểm phân biệt?",
      options: [
        { key: "A", text: "$3$" },
        { key: "B", text: "$2$" },
        { key: "C", text: "$1$" },
        { key: "D", text: "$0$" }
      ],
      correctAnswer: "A",
      explanation: "$x^3 - 3x = 0 \\iff x(x^2 - 3) = 0 \\iff x = 0$ hoặc $x = \\pm \\sqrt{3}$ (3 giao điểm)."
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
      context: "Cho hàm số $y = x^3 - 3x + 1$.",
      statements: [
        { key: "a", text: "Đạo hàm của hàm số là $y' = 3x^2 - 3$.", correct: true, explanation: "$y' = 3x^2 - 3$." },
        { key: "b", text: "Hàm số đồng biến trên $(-1; 1)$.", correct: false, explanation: "Trên $(-1; 1)$, $y' < 0$ nên nghịch biến." },
        { key: "c", text: "Hàm số đạt cực đại tại $x = -1$ với giá trị cực đại bằng $3$.", correct: true, explanation: "$y(-1) = -1 + 3 + 1 = 3$." },
        { key: "d", text: "Điểm uốn của đồ thị là $I(0; 1)$.", correct: true, explanation: "$y'' = 6x = 0 \\iff x = 0 \\implies y = 1$." }
      ]
    },
    {
      id: 2,
      part: 2,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm số dạng $x + a/x$",
      context: "Cho hàm số $f(x) = x + \\frac{16}{x}$ trên khoảng $(0; +\\infty)$.",
      statements: [
        { key: "a", text: "Đạo hàm $f'(x) = 1 - \\frac{16}{x^2}$.", correct: true, explanation: "$f'(x) = 1 - 16/x^2$." },
        { key: "b", text: "Nghiệm dương của $f'(x) = 0$ là $x = 4$.", correct: true, explanation: "$x^2 = 16 \\implies x = 4$." },
        { key: "c", text: "Giá trị nhỏ nhất của hàm số trên $(0; +\\infty)$ bằng $8$.", correct: true, explanation: "$f(4) = 4 + 4 = 8$." },
        { key: "d", text: "Hàm số nghịch biến trên $(4; +\\infty)$.", correct: false, explanation: "Đồng biến trên $(4; +\\infty)$." }
      ]
    },
    {
      id: 3,
      part: 2,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm nhất biến",
      context: "Cho hàm số $y = \\frac{x - 3}{x + 1}$.",
      statements: [
        { key: "a", text: "Tiệm cận đứng là $x = -1$.", correct: true, explanation: "Mẫu bằng 0 tại $x = -1$." },
        { key: "b", text: "Tiệm cận ngang là $y = 1$.", correct: true, explanation: "$\\lim_{x \\to \\pm\\infty} y = 1$." },
        { key: "c", text: "Hàm số nghịch biến trên từng khoảng xác định.", correct: false, explanation: "$y' = 4/(x+1)^2 > 0$ nên đồng biến." },
        { key: "d", text: "Tâm đối xứng là $I(-1; 1)$.", correct: true, explanation: "Giao điểm hai tiệm cận." }
      ]
    },
    {
      id: 4,
      part: 2,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Hàm phân thức bậc 2 trên bậc 1",
      context: "Cho hàm số $y = \\frac{x^2 - x + 1}{x - 1}$.",
      statements: [
        { key: "a", text: "Tiệm cận đứng là $x = 1$.", correct: true, explanation: "Mẫu bằng 0 tại $x = 1$." },
        { key: "b", text: "Tiệm cận xiên là $y = x$.", correct: true, explanation: "$\\frac{x^2 - x + 1}{x - 1} = x + \\frac{1}{x - 1}$." },
        { key: "c", text: "Tọa độ tâm đối xứng là $I(1; 1)$.", correct: true, explanation: "Thay $x = 1$ vào $y = x \\implies y = 1$." },
        { key: "d", text: "Đồ thị cắt trục hoành tại 2 điểm.", correct: false, explanation: "$x^2 - x + 1 = 0$ vô nghiệm." }
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
      content: "Có bao nhiêu giá trị nguyên của $m \\in [-10; 10]$ để hàm số $y = \\frac{x + 1}{x + m}$ nghịch biến trên khoảng $(3; +\\infty)$?",
      correctAnswer: "4",
      acceptableAnswers: ["4"],
      unit: "giá trị",
      explanation: "$y' = \\frac{m - 1}{(x + m)^2} < 0 \\iff m < 1$. $-m \\le 3 \\iff m \\ge -3$. Vậy $-3 \\le m < 1 \\implies m \\in \\{-3, -2, -1, 0\\}$ (4 giá trị)."
    },
    {
      id: 2,
      part: 3,
      number: 2,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa thể tích bồn",
      content: "Một chiếc bồn hình trụ không nắp bằng tôn có thể tích $V = 16\\pi\\text{ m}^3$. Tìm bán kính đáy $R\\text{ (m)}$ để diện tích tôn là nhỏ nhất.",
      correctAnswer: "2",
      acceptableAnswers: ["2", "2m"],
      unit: "m",
      explanation: "$S = \\pi R^2 + \\frac{32\\pi}{R}$. $S' = \\pi(2R - \\frac{32}{R^2}) = 0 \\iff R^3 = 16/2 = 8 \\iff R = 2\\text{ m}$."
    },
    {
      id: 3,
      part: 3,
      number: 3,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tối ưu hóa lợi nhuận",
      content: "Chi phí sản xuất $x$ sản phẩm là $C(x) = x^2 + 50x + 1500$, giá bán $p(x) = 350 - x$ (nghìn đồng). Tìm $x$ để lợi nhuận lớn nhất.",
      correctAnswer: "75",
      acceptableAnswers: ["75"],
      unit: "sản phẩm",
      explanation: "$P(x) = x(350 - x) - (x^2 + 50x + 1500) = -2x^2 + 300x - 1500$. Đỉnh tại $x = 75$."
    },
    {
      id: 4,
      part: 3,
      number: 4,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Nồng độ thuốc",
      content: "Nồng độ thuốc sau $t$ giờ là $C(t) = \\frac{20t}{t^2 + 25}$. Sau bao nhiêu giờ thì nồng độ đạt cực đại?",
      correctAnswer: "5",
      acceptableAnswers: ["5", "5 giờ"],
      unit: "giờ",
      explanation: "$C'(t) = 0 \\iff t^2 = 25 \\iff t = 5$ giờ."
    },
    {
      id: 5,
      part: 3,
      number: 5,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Khảo sát hàm số",
      content: "PHẦN IV - CÂU 1 (TỰ LUẬN):\nCho hàm số $y = 2x^3 - 6x^2 + 1$. Tìm khoảng đơn điệu và cực trị của hàm số.",
      correctAnswer: "x=0, x=2",
      acceptableAnswers: ["x=0, x=2"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "$y' = 6x(x - 2) = 0 \\iff x = 0$ (cực đại $y = 1$) hoặc $x = 2$ (cực tiểu $y = -7$). Đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$, nghịch biến trên $(0; 2)$."
    },
    {
      id: 6,
      part: 3,
      number: 6,
      chapterId: 1,
      chapterName: "Đạo hàm & Khảo sát đồ thị",
      topic: "Tự luận: Hàng rào",
      content: "PHẦN IV - CÂU 2 (TỰ LUẬN):\nMột khu đất hình chữ nhật giáp bờ sông thẳng có diện tích $800\\text{ m}^2$. Người ta rào 3 cạnh không giáp bờ sông. Tìm kích thước chiều rộng vuông góc với bờ sông để tổng chiều dài rào là ngắn nhất.",
      correctAnswer: "20",
      acceptableAnswers: ["20", "20m"],
      isEssay: true,
      pointWeight: 1.0,
      explanation: "Tổng chiều dài rào $L = 2x + y = 2x + \\frac{800}{x} \\ge 2\\sqrt{1600} = 80$. Dấu bằng khi $2x = \\frac{800}{x} \\iff x^2 = 400 \\iff x = 20\\text{ m}$."
    }
  ]
};

