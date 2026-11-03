export interface FormulaItem {
  id: string;
  chapterId: number;
  chapterTitle: string;
  topic: string;
  title: string;
  formulaLatex: string;
  description: string;
  notes?: string;
  examples?: string;
}

export interface QuickTipItem {
  id: string;
  chapterId?: number;
  title: string;
  category: "NHAN_DIEN_DO_THI" | "LOAI_TRU_DAP_AN" | "TOI_UU_THUC_TE" | "HINH_KHONG_GIAN" | "XAC_SUAT";
  categoryLabel: string;
  summary: string;
  detailedSteps: string[];
  shortcutRule: string;
  sampleQuestion?: string;
}

export interface CasioHackItem {
  id: string;
  title: string;
  model: "FX_580_AND_880" | "FX_580VNX" | "FX_880BTG";
  targetProblem: string;
  keySequence580: string;
  keySequence880: string;
  explanation: string;
  proTip: string;
}

export const CHAPTER_FORMULAS: FormulaItem[] = [
  // CHƯƠNG 1
  {
    id: "f-ch1-1",
    chapterId: 1,
    chapterTitle: "Chương 1: Ứng dụng đạo hàm & Khảo sát hàm số",
    topic: "Tính đơn điệu",
    title: "Điều kiện cần và đủ của tính đơn điệu",
    formulaLatex: "f'(x) \\ge 0, \\forall x \\in K \\text{ và } f'(x)=0 \\text{ tại hữu hạn điểm} \\iff f(x) \\text{ đồng biến trên } K",
    description: "Đạo hàm mang dấu dương thì hàm số đồng biến. Dấu bằng xảy ra tại hữu hạn điểm vẫn kết luận hàm đơn điệu.",
    notes: "Hàm phân thức $y = \\frac{ax+b}{cx+d}$ thì đạo hàm $y' = \\frac{ad-bc}{(cx+d)^2}$ KHÔNG được có dấu bằng (luôn lớn hơn 0 hoặc nhỏ hơn 0)."
  },
  {
    id: "f-ch1-2",
    chapterId: 1,
    chapterTitle: "Chương 1: Ứng dụng đạo hàm & Khảo sát hàm số",
    topic: "Cực trị hàm số",
    title: "Quy tắc đạo hàm cấp hai tìm cực trị",
    formulaLatex: "\\begin{cases} f'(x_0) = 0 \\\\ f''(x_0) < 0 \\end{cases} \\implies x_0 \\text{ là điểm cực đại}; \\quad \\begin{cases} f'(x_0) = 0 \\\\ f''(x_0) > 0 \\end{cases} \\implies x_0 \\text{ là điểm cực tiểu}",
    description: "Áp dụng hiệu quả khi tính đạo hàm cấp hai thuận tiện (như hàm đa thức, hàm lượng giác).",
    notes: "Nếu $f''(x_0) = 0$, quy tắc này không kết luận được, phải lập bảng biến thiên dùng đạo hàm cấp 1."
  },
  {
    id: "f-ch1-3",
    chapterId: 1,
    chapterTitle: "Chương 1: Ứng dụng đạo hàm & Khảo sát hàm số",
    topic: "Đường tiệm cận",
    title: "Công thức tìm tiệm cận xiên y = ax + b",
    formulaLatex: "a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}, \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]",
    description: "Với hàm phân thức $y = \\frac{ax^2+bx+c}{px+q}$ ($a, p \\neq 0$), thực hiện chia đa thức: $y = (mx+n) + \\frac{r}{px+q} \\implies y = mx+n$ là tiệm cận xiên.",
    notes: "Tiệm cận đứng nghiệm mẫu không là nghiệm tử; Tiệm cận ngang $\\lim_{x \\to \\pm\\infty} f(x) = y_0$."
  },
  {
    id: "f-ch1-4",
    chapterId: 1,
    chapterTitle: "Chương 1: Ứng dụng đạo hàm & Khảo sát hàm số",
    topic: "Đạo hàm phân thức",
    title: "Công thức đạo hàm nhanh phân thức hữu tỉ",
    formulaLatex: "\\left( \\frac{ax+b}{cx+d} \\right)' = \\frac{ad - bc}{(cx+d)^2}; \\quad \\left( \\frac{ax^2+bx+c}{dx+e} \\right)' = \\frac{ad x^2 + 2ae x + (be - cd)}{(dx+e)^2}",
    description: "Công thức tính nhanh đạo hàm giúp tiết kiệm thời gian làm trắc nghiệm, tránh nhầm dấu.",
  },

  // CHƯƠNG 2
  {
    id: "f-ch2-1",
    chapterId: 2,
    chapterTitle: "Chương 2: Vectơ và Hệ trục toạ độ Oxyz",
    topic: "Tích vô hướng và góc",
    title: "Tích vô hướng và côsin góc giữa 2 vectơ",
    formulaLatex: "\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 + z_1 z_2; \\quad \\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\frac{x_1 x_2 + y_1 y_2 + z_1 z_2}{\\sqrt{x_1^2 + y_1^2 + z_1^2} \\cdot \\sqrt{x_2^2 + y_2^2 + z_2^2}}",
    description: "Điều kiện vuông góc: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.",
  },
  {
    id: "f-ch2-2",
    chapterId: 2,
    chapterTitle: "Chương 2: Vectơ và Hệ trục toạ độ Oxyz",
    topic: "Tích có hướng",
    title: "Tích có hướng của 2 vectơ trong không gian",
    formulaLatex: "[\\vec{u}, \\vec{v}] = \\left( y_1 z_2 - z_1 y_2; \\; z_1 x_2 - x_1 z_2; \\; x_1 y_2 - y_1 x_2 \\right)",
    description: "Vectơ $[\\vec{u}, \\vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$. $\\vec{u}$ cùng phương $\\vec{v} \\iff [\\vec{u}, \\vec{v}] = \\vec{0}$.",
    notes: "Diện tích tam giác: $S_{ABC} = \\frac{1}{2}|[\\vec{AB}, \\vec{AC}]|$. Thể tích tứ diện: $V_{ABCD} = \\frac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$."
  },

  // CHƯƠNG 3
  {
    id: "f-ch3-1",
    chapterId: 3,
    chapterTitle: "Chương 3: Số đặc trưng đo mức độ phân tán số liệu ghép nhóm",
    topic: "Tứ phân vị ghép nhóm",
    title: "Công thức xác định Trung vị Me và Tứ phân vị Q1, Q3",
    formulaLatex: "M_e = Q_2 = a_p + \\frac{\\frac{n}{2} - C}{n_p} \\cdot h; \\quad Q_1 = a_p + \\frac{\\frac{n}{4} - C}{n_p} \\cdot h; \\quad Q_3 = a_p + \\frac{\\frac{3n}{4} - C}{n_p} \\cdot h",
    description: "Trong đó: $a_p$ là đầu mút trái của nhóm chứa tứ phân vị; $h = a_{p+1} - a_p$ là độ dài nhóm; $n$ là cỡ mẫu; $C$ là tần số tích lũy của nhóm trước đó; $n_p$ là tần số của nhóm chứa tứ phân vị.",
  },
  {
    id: "f-ch3-2",
    chapterId: 3,
    chapterTitle: "Chương 3: Số đặc trưng đo mức độ phân tán số liệu ghép nhóm",
    topic: "Phương sai và Độ lệch chuẩn",
    title: "Phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm",
    formulaLatex: "s^2 = \\frac{1}{n} \\sum_{i=1}^k n_i (c_i - \\bar{x})^2 = \\frac{1}{n} \\sum_{i=1}^k n_i c_i^2 - \\bar{x}^2; \\quad s = \\sqrt{s^2}",
    description: "Trong đó $c_i = \\frac{a_i + a_{i+1}}{2}$ là giá trị đại diện (tâm) của nhóm $[a_i; a_{i+1})$.",
  },

  // CHƯƠNG 4
  {
    id: "f-ch4-1",
    chapterId: 4,
    chapterTitle: "Chương 4: Nguyên hàm và Tích phân",
    topic: "Tích phân từng phần",
    title: "Công thức tích phân từng phần và thứ tự đặt u",
    formulaLatex: "\\int_a^b u \\, dv = \\left. (uv) \\right|_a^b - \\int_a^b v \\, du",
    description: "Thứ tự ưu tiên chọn $u$: 'Nhất log - Nhì đa - Tam lượng - Tứ mũ'. Phần còn lại gán bằng $dv$.",
    notes: "Khi gặp đa thức nhân lượng giác hoặc đa thức nhân mũ, có thể dùng phương pháp 'Múa cột' (D-I method) để tính siêu tốc trong 15 giây."
  },
  {
    id: "f-ch4-2",
    chapterId: 4,
    chapterTitle: "Chương 4: Nguyên hàm và Tích phân",
    topic: "Ứng dụng hình học",
    title: "Diện tích hình phẳng và Thể tích khối tròn xoay",
    formulaLatex: "S = \\int_a^b |f(x) - g(x)| dx; \\quad V_x = \\pi \\int_a^b f^2(x) dx",
    description: "Thể tích vật thể tròn xoay khi quay hình thang cong quanh trục Ox giới hạn bởi $y=f(x), y=0, x=a, x=b$ là $V = \\pi \\int_a^b f^2(x) dx$.",
  },

  // CHƯƠNG 5
  {
    id: "f-ch5-1",
    chapterId: 5,
    chapterTitle: "Chương 5: Phương trình mặt phẳng, đường thẳng, mặt cầu",
    topic: "Khoảng cách và Góc",
    title: "Khoảng cách từ điểm đến mặt phẳng & Mặt cầu",
    formulaLatex: "d(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}; \\quad (S): (x-a)^2 + (y-b)^2 + (z-c)^2 = R^2",
    description: "Mặt cầu tâm $I(a,b,c)$, bán kính $R$. Điều kiện tiếp xúc giữa mặt phẳng $(P)$ và mặt cầu $(S)$: $d(I, (P)) = R$. Cắt theo đường tròn: $r = \\sqrt{R^2 - d^2}$.",
  },
  {
    id: "f-ch5-2",
    chapterId: 5,
    chapterTitle: "Chương 5: Phương trình mặt phẳng, đường thẳng, mặt cầu",
    topic: "Phương trình đường thẳng",
    title: "Phương trình tham số và chính tắc của đường thẳng",
    formulaLatex: "\\begin{cases} x = x_0 + a t \\\\ y = y_0 + b t \\\\ z = z_0 + c t \\end{cases} \\iff \\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c} \\quad (a, b, c \\neq 0)",
    description: "Đường thẳng đi qua $M_0(x_0, y_0, z_0)$ có vectơ chỉ phương $\\vec{u} = (a, b, c)$.",
  },

  // CHƯƠNG 6
  {
    id: "f-ch6-1",
    chapterId: 6,
    chapterTitle: "Chương 6: Xác suất có điều kiện và Công thức Bayes",
    topic: "Xác suất có điều kiện & Nhân xác suất",
    title: "Định nghĩa xác suất có điều kiện",
    formulaLatex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\implies P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)",
    description: "Xác suất của biến cố A khi biết biến cố B đã xảy ra. Nếu A và B độc lập: $P(A|B) = P(A)$ và $P(AB) = P(A) \\cdot P(B)$.",
  },
  {
    id: "f-ch6-2",
    chapterId: 6,
    chapterTitle: "Chương 6: Xác suất có điều kiện và Công thức Bayes",
    topic: "Công thức toàn phần & Bayes",
    title: "Công thức xác suất toàn phần và Công thức Bayes",
    formulaLatex: "P(A) = \\sum_{i=1}^n P(B_i) P(A|B_i); \\quad P(B_k|A) = \\frac{P(B_k) P(A|B_k)}{\\sum_{i=1}^n P(B_i) P(A|B_i)}",
    description: "Bộ $B_1, B_2, \\dots, B_n$ là một nhóm biến cố đầy đủ ($B_i \\cap B_j = \\emptyset$ và $\\bigcup B_i = \\Omega$).",
    notes: "Rất hay gặp trong các bài toán y tế (xét nghiệm bệnh, tỉ lệ dương tính giả), sản xuất kiểm tra phế phẩm từ 2 hoặc 3 phân xưởng."
  }
];

export const QUICK_TIPS: QuickTipItem[] = [
  {
    id: "tip-1",
    chapterId: 1,
    title: "Mẹo nhận diện đồ thị hàm bậc ba y = ax³ + bx² + cx + d trong 5 giây",
    category: "NHAN_DIEN_DO_THI",
    categoryLabel: "Đồ thị hàm số",
    summary: "Nhìn 3 chi tiết then chốt: Nhánh cuối bên phải, Điểm cắt trục Oy, và Số điểm cực trị.",
    detailedSteps: [
      "Bước 1: Nhánh ngoài cùng bên phải đi lên -> a > 0; Nhánh đi xuống -> a < 0.",
      "Bước 2: Giao với trục tung Oy tại điểm (0, d) -> Xem d nằm phía trên hay dưới gốc toạ độ O.",
      "Bước 3: Nếu đồ thị có 2 cực trị cùng phía so với Oy (cùng dấu x1, x2) thì tích x1.x2 = c/(3a) > 0. Nếu 2 cực trị trái dấu thì a.c < 0.",
      "Bước 4: Điểm uốn u = -b/(3a) là tâm đối xứng của đồ thị."
    ],
    shortcutRule: "Dấu 'a' từ nhánh phải -> Giao Oy ra 'd' -> 2 cực trị trái dấu ra a.c < 0 -> Điểm uốn xác định 'b'.",
    sampleQuestion: "Nhận dạng bảng biến thiên hoặc hình vẽ: Nếu nhánh phải đi xuống (a < 0), cắt Oy tại điểm âm (d < 0) -> Gạch ngay 2 phương án a > 0."
  },
  {
    id: "tip-2",
    chapterId: 1,
    title: "Mẹo đồ thị phân thức y = (ax+b)/(cx+d)",
    category: "NHAN_DIEN_DO_THI",
    categoryLabel: "Đồ thị hàm số",
    summary: "Xác định nhanh cặp đường tiệm cận Đứng - Ngang và dấu của đạo hàm ad - bc.",
    detailedSteps: [
      "Bước 1: Tiệm cận đứng: x = -d/c (đường thẳng đứng ngắt đồ thị).",
      "Bước 2: Tiệm cận ngang: y = a/c (đường nằm ngang khi x ra vô cùng).",
      "Bước 3: Giao Ox tại x = -b/a, Giao Oy tại y = b/d.",
      "Bước 4: Nhánh đồ thị đi xuống từ trái sang phải -> ad - bc < 0; Đi lên -> ad - bc > 0."
    ],
    shortcutRule: "Đứng x = -d/c -> Ngang y = a/c -> Chiều nhánh đồ thị quyết định dấu ad - bc.",
    sampleQuestion: "Đồ thị có TCĐ x = 2, TCN y = 1. Mẫu số phải có nghiệm x = 2 -> Dạng (x-2), tỉ số hệ số bậc 1 là 1."
  },
  {
    id: "tip-3",
    chapterId: 1,
    title: "Mẹo tối ưu hoá thực tế: Chi phí làm bể / Hộp tôn chữ nhật",
    category: "TOI_UU_THUC_TE",
    categoryLabel: "Bài toán thực tế",
    summary: "Dùng bất đẳng thức Cauchy hoặc quy tắc tỉ lệ kích thước chuẩn để chọn nhanh phương án.",
    detailedSteps: [
      "Bài toán 1: Hộp chữ nhật thể tích V cố định, KHÔNG nắp, đáy hình vuông cạnh x, chiều cao h. Chi phí nhỏ nhất khi đáy có diện tích bằng 2 lần diện tích một mặt bên, tức chiều cao h = x/2.",
      "Bài toán 2: Hộp chữ nhật CÓ nắp, đáy vuông thể tích V. Chi phí nhỏ nhất khi nó là hình lập phương (x = h).",
      "Bài toán 3: Cắt 4 góc miếng tôn hình vuông cạnh a gấp thành hộp không nắp có thể tích lớn nhất: Cắt mỗi góc hình vuông cạnh x = a/6."
    ],
    shortcutRule: "Cắt góc miếng tôn: x = a/6; Bể không nắp đáy vuông: h = x/2; Bể có nắp: h = x.",
    sampleQuestion: "Tấm tôn hình vuông cạnh 60 cm cắt 4 góc gấp thành hộp. Thể tích max khi cạnh cắt x = 60/6 = 10 cm."
  },
  {
    id: "tip-4",
    chapterId: 2,
    title: "Kỹ thuật gắn hệ trục toạ độ Oxyz vào hình không gian cổ điển",
    category: "HINH_KHONG_GIAN",
    categoryLabel: "Hình học không gian",
    summary: "Chuyển bài toán góc và khoảng cách khó của hình không gian lớp 11 thành bài toán toạ độ cơ bắp không cần tư duy kẻ thêm đường phụ.",
    detailedSteps: [
      "Bước 1: Chọn gốc toạ độ O tại đỉnh có 3 đường đôi một vuông góc (Ví dụ: Chân đường cao hình chóp, góc hình hộp chữ nhật).",
      "Bước 2: Đặt 3 trục Ox, Oy, Oz theo 3 hướng vuông góc đó.",
      "Bước 3: Viết toạ độ tất cả các đỉnh liên quan.",
      "Bước 4: Áp dụng công thức toạ độ tính khoảng cách giữa 2 đường chéo nhau: d(a, b) = |[u1, u2] . M1M2| / |[u1, u2]|."
    ],
    shortcutRule: "Tìm điểm 3 góc vuông làm gốc O -> Viết toạ độ các đỉnh -> Tính góc, khoảng cách qua công thức vectơ.",
  },
  {
    id: "tip-5",
    chapterId: 6,
    title: "Mẹo giải bài toán Xác suất có điều kiện và Bayes bằng Sơ đồ cây (Tree Diagram)",
    category: "XAC_SUAT",
    categoryLabel: "Xác suất 12",
    summary: "Vẽ sơ đồ cây 2 tầng giúp giải quyết 100% bài toán xác suất toàn phần và Bayes mà không sợ nhầm lẫn công thức.",
    detailedSteps: [
      "Tầng 1: Phân nhánh theo các tiền đề (Ví dụ: Người mắc bệnh B vs Không mắc bệnh B'). Điền xác suất P(B) và P(B') vào nhánh.",
      "Tầng 2: Từ mỗi nhánh tiền đề, rẽ tiếp theo kết quả xét nghiệm (Dương tính T vs Âm tính T'). Điền xác suất có điều kiện P(T|B), P(T|B').",
      "Quy tắc nhân: Nhân các xác suất trên cùng một nhánh từ gốc đến ngọn.",
      "Quy tắc cộng: Cộng các nhánh dẫn đến cùng kết quả T -> Cho ra mẫu số P(T).",
      "Bayes: Lấy nhánh thoả mãn đề bài chia cho tổng P(T)."
    ],
    shortcutRule: "Nhánh cần tìm / Tổng các nhánh dẫn tới kết quả đã xảy ra.",
    sampleQuestion: "Tỉ lệ mắc bệnh 2%. Test đúng 95%. Một người xét nghiệm dương tính, xác suất thật sự mắc bệnh = (0.02 * 0.95) / (0.02 * 0.95 + 0.98 * 0.05) ≈ 27.9%."
  }
];

export const CASIO_HACKS: CasioHackItem[] = [
  {
    id: "casio-1",
    title: "Quét GTLN - GTNN và đếm số nghiệm bằng Bảng giá trị (TABLE)",
    model: "FX_580_AND_880",
    targetProblem: "Tìm Max/Min hàm số trên đoạn [a; b], tìm số nghiệm phương trình f(x) = m.",
    keySequence580: "[MENU] -> [8] (Table) -> Nhập f(x) -> [=] -> Bỏ qua g(x) [=] -> Start: a, End: b, Step: (b - a)/29 -> [=]",
    keySequence880: "[HOME] -> Chọn [Bảng giá trị] -> [OK] -> [TOOLS] -> Nhập hàm f(x) -> Cài đặt Phạm vi bảng (Bắt đầu: a, Kết thúc: b, Bước: (b - a)/29) -> [Thực hiện]",
    explanation: "Máy sẽ tính 30 giá trị liên tiếp. Cột f(x) cho thấy rõ ràng xu hướng tăng giảm, giá trị lớn nhất, giá trị nhỏ nhất và các vị trí đổi dấu (nghiệm của phương trình).",
    proTip: "Với đoạn có độ dài lớn, nên quét sơ bộ một lượt với Step lớn để khoanh vùng điểm cực trị, sau đó thu hẹp đoạn [a; b] và quét lại với Step nhỏ hơn để lấy độ chính xác tối đa."
  },
  {
    id: "casio-2",
    title: "Tính tích có hướng & góc giữa 2 vectơ Oxyz",
    model: "FX_580_AND_880",
    targetProblem: "Tìm vectơ pháp tuyến mặt phẳng qua 3 điểm A, B, C; Tính diện tích tam giác, thể tích tứ diện.",
    keySequence580: "[MENU] -> [5] (Vector) -> [1] (VctA) -> Kích thước [3] -> Nhập toạ độ AB -> [OPTN] -> [1] -> [2] (VctB) -> Nhập toạ độ AC -> [AC] -> Bấm [OPTN] [3] x [OPTN] [4] [=] để tính tích có hướng.",
    keySequence880: "[HOME] -> [Vectơ] -> [OK] -> [TOOLS] -> [Định nghĩa VctA] (Kích thước 3) -> Nhập toạ độ -> [TOOLS] -> [Định nghĩa VctB] -> Ra màn hình bấm [CATALOG] -> [Vectơ] -> [VctA] x [VctB].",
    explanation: "Cho kết quả tích có hướng [AB, AC] chính là vectơ pháp tuyến mặt phẳng (ABC). Để tính tích vô hướng, dùng hàm Dot Product trong menu OPTN.",
    proTip: "Muốn tính góc giữa 2 vectơ: Bấm [OPTN] -> Cuộn xuống -> [Góc giữa 2 vectơ] -> Nhập VctA, VctB -> Máy trả về trực tiếp số đo góc (độ hoặc radian)."
  },
  {
    id: "casio-3",
    title: "Kiểm tra nguyên hàm và đáp án tích phân trắc nghiệm bằng d/dx",
    model: "FX_580_AND_880",
    targetProblem: "Hỏi 'Họ nguyên hàm của hàm số f(x) là...' hoặc kiểm tra giá trị tham số trong tích phân.",
    keySequence580: "Bấm [SHIFT] -> [∫] (d/dx) -> Nhập hàm số F(x) ở phương án A -> X = X0 (chọn số bất kỳ như 1.345) -> Trừ đi f(X0) -> Bấm [=].",
    keySequence880: "[CATALOG] -> [Phân tích số / Giải tích] -> [Đạo hàm d/dx] -> Nhập F(x) tại x = X0 -> Trừ f(X0) -> Bấm [EXE].",
    explanation: "Theo định nghĩa, nếu F(x) là nguyên hàm của f(x) thì F'(x) = f(x). Do đó hiệu F'(X0) - f(X0) phải bằng đúng 0 (hoặc sai số dạng 10^-12 do làm tròn máy tính).",
    proTip: "Không chọn X0 bằng các giá trị đặc biệt như 0, 1, -1 hoặc giá trị làm triệt tiêu nghiệm để tránh trường hợp nghiệm trùng ngẫu nhiên giữa các phương án nhiễu."
  },
  {
    id: "casio-4",
    title: "Thống kê mẫu số liệu ghép nhóm: Tính trung vị, tứ phân vị, phương sai, độ lệch chuẩn",
    model: "FX_580_AND_880",
    targetProblem: "Tính nhanh các số đặc trưng của bảng số liệu ghép nhóm Chương 3.",
    keySequence580: "Bật tần số: [SHIFT] [MENU] -> Cuộn xuống [3: Thống kê] -> [1: Bật]. Vào [MENU] [6: Thống kê] -> [1: 1-Biến]. Nhập tâm nhóm vào cột x, tần số vào cột Tần số (Freq). Xong bấm [OPTN] [3: Tính 1-Biến].",
    keySequence880: "[HOME] -> [Thống kê] -> [1-Biến]. Cài đặt tần số qua [TOOLS] -> [Tần số] -> [Bật]. Nhập giá trị tâm khoảng và tần số. Bấm [EXE] -> [Thực hiện 1-Biến].",
    explanation: "Màn hình hiển thị toàn bộ: Trung bình x̄, Tổng bình phương, Phương sai mẫu s²x, Độ lệch chuẩn mẫu sx, Tứ phân vị Q1, Med, Q3, Min, Max.",
    proTip: "Lưu ý giá trị nhập vào cột x PHẢI LÀ TÂM KHOẢNG ci = (ai + ai+1)/2 của từng nhóm ghép, không nhập đầu mút!"
  },
  {
    id: "casio-5",
    title: "Dò nghiệm xấp xỉ phương trình mũ - logarit - đa thức bằng SHIFT SOLVE",
    model: "FX_580_AND_880",
    targetProblem: "Tìm nghiệm phương trình, tìm giao điểm hai đồ thị f(x) = g(x).",
    keySequence580: "Nhập phương trình: f(x) - g(x) = 0 (dấu '=' bấm [ALPHA] [CALC]) -> Bấm [SHIFT] [CALC] (SOLVE) -> Nhập giá trị dò x ban đầu -> Bấm [=].",
    keySequence880: "Nhập phương trình -> Bấm [TOOLS] -> Chọn [Giải phương trình / SOLVE] hoặc dùng ứng dụng Phương trình -> [EXE].",
    explanation: "Máy tính dùng phương pháp lặp Newton-Raphson để tìm nghiệm gần nhất với giá trị x ban đầu người dùng cung cấp.",
    proTip: "Nếu phương trình có nhiều nghiệm (ví dụ bậc 2 hoặc bậc 3), hãy thử các giá trị khởi tạo khác nhau (ví dụ: -5, 0, 5) để quét được tất cả các nghiệm."
  }
];
