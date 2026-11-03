import { Chapter, Flashcard, MistakeItem, StudyQuestion, LeaderboardUser } from "@/types/learning";

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    number: 1,
    title: "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    shortTitle: "Đạo hàm & Khảo sát đồ thị",
    description: "Khảo sát tính đơn điệu, cực trị, giá trị lớn nhất - nhỏ nhất, đường tiệm cận và bài toán tối ưu thực tế.",
    iconName: "TrendingUp",
    masteryPercent: 0,
    studyTopics: [
      "Tính đơn điệu của hàm số",
      "Cực trị hàm số",
      "Giá trị lớn nhất và nhỏ nhất",
      "Đường tiệm cận (đứng, ngang, xiên)",
      "Khảo sát và vẽ đồ thị hàm số",
      "Ứng dụng tối ưu hóa thực tế"
    ],
    specialFeature: {
      type: "desmos",
      label: "Mô phỏng Đồ thị Desmos",
      badge: "Tương tác Đồ thị"
    },
    theorySummary: `### 1. Tính đơn điệu của hàm số
Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$:
- Nếu $f'(x) > 0$ với mọi $x \\in K$ thì hàm số đồng biến trên $K$.
- Nếu $f'(x) < 0$ với mọi $x \\in K$ thì hàm số nghịch biến trên $K$.
- Định lý mở rộng: $f'(x) \\ge 0$ (hoặc $\\le 0$) với mọi $x \\in K$ và dấu bằng chỉ xảy ra tại một số hữu hạn điểm thì hàm số đồng biến (nghịch biến) trên $K$.

### 2. Cực trị của hàm số
- Nếu $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0$ thì $x_0$ là điểm cực đại.
- Nếu $f'(x)$ đổi dấu từ âm sang dương khi qua $x_0$ thì $x_0$ là điểm cực tiểu.
- Quy tắc đạo hàm cấp hai: Giả sử $f'(x_0) = 0$.
  + Nếu $f''(x_0) < 0$ thì $x_0$ là điểm cực đại.
  + Nếu $f''(x_0) > 0$ thì $x_0$ là điểm cực tiểu.

### 3. Đường tiệm cận của đồ thị hàm số
- **Tiệm cận đứng:** Đường thẳng $x = x_0$ là TCĐ nếu ít nhất một trong các điều kiện sau thỏa mãn:
  $$\\lim_{x \\to x_0^+} f(x) = \\pm\\infty \\quad \\text{hoặc} \\quad \\lim_{x \\to x_0^-} f(x) = \\pm\\infty$$
- **Tiệm cận ngang:** Đường thẳng $y = y_0$ là TCN nếu:
  $$\\lim_{x \\to +\\infty} f(x) = y_0 \\quad \\text{hoặc} \\quad \\lim_{x \\to -\\infty} f(x) = y_0$$
- **Tiệm cận xiên:** Đường thẳng $y = ax + b$ ($a \\neq 0$) là TCX nếu $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$.
  Công thức tìm hệ số: $a = \\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x}, \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.`,
    keyFormulas: [
      "f'(x) > 0 \\implies \\text{Đồng biến}",
      "f'(x_0) = 0, f''(x_0) > 0 \\implies x_0 \\text{ là điểm cực tiểu}",
      "\\lim_{x \\to x_0} f(x) = \\infty \\implies x = x_0 \\text{ (TCĐ)}",
      "y = ax + b \\text{ với } a = \\lim \\frac{f(x)}{x}, b = \\lim [f(x)-ax] \\text{ (TCX)}"
    ],
    textbookNotes: {
      kntt: "Chú trọng các bài toán thực tế về mô hình hóa chi phí sản xuất và tiệm cận xiên của phân thức bậc hai trên bậc nhất $y = \\dfrac{ax^2+bx+c}{px+q}$.",
      canhDieu: "Nhấn mạnh ứng dụng đồ thị trong kinh tế học vi mô: doanh thu cận biên, lợi nhuận tối đa và điểm hòa vốn.",
      chanTroi: "Khai thác sâu ý nghĩa hình học của đạo hàm, tiếp tuyến và sự lồi lõm của đồ thị hàm số."
    }
  },
  {
    id: 2,
    number: 2,
    title: "Vectơ và Hệ trục tọa độ trong không gian (Oxyz)",
    shortTitle: "Vectơ & Hệ trục Oxyz",
    description: "Tổng hợp các phép toán vectơ không gian, tích vô hướng, hệ tọa độ $Oxyz$ và ứng dụng biểu diễn lực, vận tốc.",
    iconName: "Compass",
    masteryPercent: 0,
    studyTopics: [
      "Vectơ trong không gian & Quy tắc hình hộp",
      "Tích vô hướng của hai vectơ",
      "Hệ trục tọa độ Oxyz",
      "Tọa độ của điểm và vectơ",
      "Góc giữa hai vectơ",
      "Ứng dụng vật lý: Phân tích lực và vận tốc"
    ],
    specialFeature: {
      type: "vector3d",
      label: "Mô phỏng Vectơ 3D Oxyz",
      badge: "Không gian 3D"
    },
    theorySummary: `### 1. Phép toán vectơ trong không gian
- **Quy tắc hình hộp:** Với hình hộp $ABCD.A'B'C'$, ta có:
  $$\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$$
- **Tích vô hướng:** $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cos(\\vec{u}, \\vec{v})$.
- **Điều kiện vuông góc:** $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.

### 2. Tọa độ điểm và vectơ trong Oxyz
Cho $\\vec{a} = (a_1; a_2; a_3)$, $\\vec{b} = (b_1; b_2; b_3)$:
- $\\vec{a} \\pm \\vec{b} = (a_1 \\pm b_1; a_2 \\pm b_2; a_3 \\pm b_3)$.
- $k\\vec{a} = (ka_1; ka_2; ka_3)$.
- $\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$.
- Độ dài: $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$.
- Cosin góc giữa 2 vectơ:
  $$\\cos(\\vec{a}, \\vec{b}) = \\dfrac{a_1 b_1 + a_2 b_2 + a_3 b_3}{\\sqrt{a_1^2 + a_2^2 + a_3^2} \\cdot \\sqrt{b_1^2 + b_2^2 + b_3^2}}$$`,
    keyFormulas: [
      "\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)",
      "|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}",
      "\\vec{a} \\cdot \\vec{b} = x_1 x_2 + y_1 y_2 + z_1 z_2",
      "G = \\frac{A+B+C+D}{4} \\text{ (Trọng tâm tứ diện)}"
    ],
    textbookNotes: {
      kntt: "Ứng dụng phân tích lực đa hướng tác dụng lên dây cáp treo và giàn không gian.",
      canhDieu: "Nhấn mạnh định vị vệ tinh GPS và tọa độ vị trí máy bay trong đài kiểm soát không lưu.",
      chanTroi: "Rèn luyện bài tập chứng minh tính đồng phẳng và điều kiện 3 vectơ không đồng phẳng."
    }
  },
  {
    id: 3,
    number: 3,
    title: "Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm",
    shortTitle: "Số đặc trưng mẫu ghép nhóm",
    description: "Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của bảng số liệu ghép nhóm.",
    iconName: "BarChart3",
    masteryPercent: 0,
    studyTopics: [
      "Khoảng biến thiên của mẫu ghép nhóm",
      "Khoảng tứ phân vị ghép nhóm",
      "Số trung bình của mẫu ghép nhóm",
      "Phương sai và Độ lệch chuẩn mẫu ghép nhóm",
      "Ý nghĩa thực tiễn của độ phân tán"
    ],
    specialFeature: {
      type: "statistics",
      label: "Bảng Thống kê & Tính Phương sai",
      badge: "Thống kê Tự động"
    },
    theorySummary: `### 1. Khoảng biến thiên và Khoảng tứ phân vị
- **Khoảng biến thiên:** $R = a_{k+1} - a_1$ (đầu mút phải nhóm cuối trừ đầu mút trái nhóm đầu tiên).
- **Khoảng tứ phân vị:** $\\Delta_Q = Q_3 - Q_1$.

### 2. Phương sai và Độ lệch chuẩn
Cho mẫu số liệu ghép nhóm gồm $k$ nhóm $[a_i; a_{i+1})$ với giá trị đại diện $c_i = \\dfrac{a_i + a_{i+1}}{2}$ và tần số $n_i$. Cỡ mẫu $n = \\sum n_i$.
- **Số trung bình:**
  $$\\bar{x} = \\dfrac{1}{n} \\sum_{i=1}^k n_i c_i$$
- **Phương sai:**
  $$s^2 = \\dfrac{1}{n} \\sum_{i=1}^k n_i (c_i - \\bar{x})^2 = \\dfrac{1}{n} \\left(\\sum_{i=1}^k n_i c_i^2\\right) - \\bar{x}^2$$
- **Độ lệch chuẩn:** $s = \\sqrt{s^2}$.`,
    keyFormulas: [
      "c_i = \\frac{a_i + a_{i+1}}{2} \\text{ (Giá trị đại diện)}",
      "R = a_{k+1} - a_1",
      "\\Delta_Q = Q_3 - Q_1",
      "s = \\sqrt{s^2} \\text{ (Độ lệch chuẩn)}"
    ],
    textbookNotes: {
      kntt: "Chú ý công thức tính tứ phân vị ghép nhóm $Q_1, Q_3$ thông qua tỷ lệ tích lũy tần số.",
      canhDieu: "Ứng dụng so sánh độ ổn định năng suất và chất lượng sản phẩm trong dây chuyền.",
      chanTroi: "Luyện kỹ năng lập bảng phụ tính $n_i c_i$ và $n_i c_i^2$ nhanh chóng trên máy tính cầm tay."
    }
  },
  {
    id: 4,
    number: 4,
    title: "Nguyên hàm và Tích phân",
    shortTitle: "Nguyên hàm & Tích phân",
    description: "Bảng nguyên hàm cơ bản, đổi biến số, từng phần, diện tích hình phẳng và thể tích khối tròn xoay.",
    iconName: "Layers",
    masteryPercent: 0,
    studyTopics: [
      "Nguyên hàm và các tính chất cơ bản",
      "Phương pháp đổi biến số tìm nguyên hàm",
      "Phương pháp tích phân từng phần",
      "Ứng dụng tính diện tích hình phẳng",
      "Ứng dụng tính thể tích khối tròn xoay",
      "Bài toán vận tốc và quãng đường trong vật lý"
    ],
    specialFeature: {
      type: "flashcard",
      label: "Flashcard Công thức Tích phân",
      badge: "Ghi nhớ Siêu tốc"
    },
    theorySummary: `### 1. Bảng nguyên hàm chuẩn
- $\\int x^\\alpha\\,dx = \\dfrac{x^{\\alpha+1}}{\\alpha + 1} + C$ ($\\alpha \\neq -1$).
- $\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$.
- $\\int e^x\\,dx = e^x + C$; $\\quad \\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C$.
- $\\int \\sin x\\,dx = -\\cos x + C$; $\\quad \\int \\cos x\\,dx = \\sin x + C$.
- $\\int \\dfrac{1}{\\cos^2 x}\\,dx = \\tan x + C$; $\\quad \\int \\dfrac{1}{\\sin^2 x}\\,dx = -\\cot x + C$.

### 2. Hai phương pháp tìm nguyên hàm
- **Đổi biến số:** $\\int f(u(x)) u'(x)\\,dx = \\int f(u)\\,du$.
- **Từng phần:** $\\int u\\,dv = uv - \\int v\\,du$.
  Thứ tự ưu tiên đặt $u$: "Nhất Lô, nhì Đa, tam Lượng, tứ Mũ".

### 3. Ứng dụng hình học của tích phân
- **Diện tích hình phẳng:** $S = \\int_a^b |f(x) - g(x)|\\,dx$.
- **Thể tích tròn xoay quanh $Ox$:** $V = \\pi \\int_a^b [f(x)]^2\\,dx$.`,
    keyFormulas: [
      "\\int u\\,dv = uv - \\int v\\,du",
      "S = \\int_a^b |f(x) - g(x)|\\,dx",
      "V = \\pi \\int_a^b [f(x)]^2\\,dx",
      "s(t) = \\int v(t)\\,dt, \\quad v(t) = \\int a(t)\\,dt"
    ],
    textbookNotes: {
      kntt: "Chú trọng các bài toán cơ học chuyển động: vận tốc, gia tốc, quãng đường di chuyển của tên lửa, tàu điện.",
      canhDieu: "Bài tập mô hình hóa tính thể tích kiến trúc mái vòm, thùng chứa chất lỏng paraboloid.",
      chanTroi: "Rèn luyện bài toán đổi biến số dạng $x = a\\sin t$ hoặc $x = a\\tan t$."
    }
  },
  {
    id: 5,
    number: 5,
    title: "Phương pháp tọa độ trong không gian",
    shortTitle: "Phương pháp tọa độ Oxyz",
    description: "Phương trình mặt cầu, mặt phẳng, đường thẳng và vị trí tương đối, góc và khoảng cách trong không gian Oxyz.",
    iconName: "Box",
    masteryPercent: 0,
    studyTopics: [
      "Phương trình mặt cầu",
      "Phương trình mặt phẳng",
      "Phương trình đường thẳng trong không gian",
      "Vị trí tương đối giữa mặt phẳng, đường thẳng, mặt cầu",
      "Khoảng cách từ điểm đến mặt phẳng, đường thẳng",
      "Góc trong không gian Oxyz"
    ],
    specialFeature: {
      type: "mindmap",
      label: "Sơ đồ Mindmap Công thức Oxyz",
      badge: "Sơ đồ Tư duy"
    },
    theorySummary: `### 1. Phương trình mặt cầu $(S)$
Tâm $I(a; b; c)$, bán kính $R$:
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$
Dạng tổng quát: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với điều kiện $a^2 + b^2 + c^2 - d > 0$.

### 2. Phương trình mặt phẳng $(P)$
Đi qua điểm $M_0(x_0; y_0; z_0)$ có vectơ pháp tuyến $\\vec{n} = (A; B; C)$:
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\iff Ax + By + Cz + D = 0$$
Khoảng cách từ điểm $M(x_M; y_M; z_M)$ đến mặt phẳng $(P)$:
$$d(M, P) = \\dfrac{|A x_M + B y_M + C z_M + D|}{\\sqrt{A^2 + B^2 + C^2}}$$

### 3. Phương trình đường thẳng $d$
Đi qua điểm $M_0$ có vectơ chỉ phương $\\vec{u} = (a; b; c)$:
- Tham số: $\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}$
- Chính tắc: $\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$ ($a, b, c \\neq 0$).`,
    keyFormulas: [
      "(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2",
      "Ax + By + Cz + D = 0",
      "d(M, P) = \\frac{|Ax_M + By_M + Cz_M + D|}{\\sqrt{A^2 + B^2 + C^2}}",
      "d \\perp (P) \\implies \\vec{u}_d = k \\vec{n}_P"
    ],
    textbookNotes: {
      kntt: "Chú ý mô hình định vị trạm radar quét mặt cầu và giao tuyến mặt phẳng che chắn.",
      canhDieu: "Phương pháp giải toán hình không gian cổ điển bằng cách gắn hệ trục tọa độ $Oxyz$.",
      chanTroi: "Ứng dụng hình chiếu vuông góc và khoảng cách chéo nhau giữa 2 đường thẳng."
    }
  },
  {
    id: 6,
    number: 6,
    title: "Xác suất có điều kiện",
    shortTitle: "Xác suất có điều kiện",
    description: "Xác suất có điều kiện, quy tắc nhân xác suất, sơ đồ hình cây, công thức xác suất toàn phần và công thức Bayes.",
    iconName: "GitFork",
    masteryPercent: 0,
    studyTopics: [
      "Định nghĩa xác suất có điều kiện P(A|B)",
      "Quy tắc nhân xác suất",
      "Sơ đồ hình cây (Tree Diagram)",
      "Công thức xác suất toàn phần",
      "Công thức Bayes",
      "Ứng dụng y học, bảo hiểm và trí tuệ nhân tạo"
    ],
    specialFeature: {
      type: "probabilityTree",
      label: "Sơ đồ Cây Bayes Tương tác",
      badge: "Xác suất Điều kiện"
    },
    theorySummary: `### 1. Định nghĩa xác suất có điều kiện
Xác suất của biến cố $A$ khi biết biến cố $B$ đã xảy ra (với $P(B) > 0$):
$$P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}$$
Quy tắc nhân xác suất: $P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$.

### 2. Sơ đồ hình cây (Tree Diagram)
Trực quan hóa chuỗi các phép thử ngẫu nhiên theo từng giai đoạn.
- Mỗi nhánh xuất phát từ một nút biểu diễn một biến cố.
- Xác suất ghi trên mỗi nhánh là xác suất có điều kiện.
- Xác suất của một kết quả bằng tích các xác suất dọc theo nhánh đi tới kết quả đó.

### 3. Công thức xác suất toàn phần và Bayes
Cho hệ đầy đủ các biến cố $B_1, B_2, \\dots, B_n$:
- **Xác suất toàn phần:** $P(A) = \\sum_{i=1}^n P(B_i) \\cdot P(A|B_i)$.
  Đặc biệt với $B$ và $\\bar{B}$: $P(A) = P(B)P(A|B) + P(\\bar{B})P(A|\\bar{B})$.
- **Công thức Bayes:**
  $$P(B_k|A) = \\dfrac{P(B_k) \\cdot P(A|B_k)}{P(A)} = \\dfrac{P(B_k) \\cdot P(A|B_k)}{\\sum_{i=1}^n P(B_i) \\cdot P(A|B_i)}$$`,
    keyFormulas: [
      "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
      "P(A \\cap B) = P(B) \\cdot P(A|B)",
      "P(A) = P(B)P(A|B) + P(\\bar{B})P(A|\\bar{B})",
      "P(B|A) = \\frac{P(B)P(A|B)}{P(A)} \\text{ (Công thức Bayes)}"
    ],
    textbookNotes: {
      kntt: "Đặc biệt khai thác sơ đồ hình cây để giải các bài toán y học (dương tính thật / giả).",
      canhDieu: "Ứng dụng trong phân loại thư rác (Spam Filter Bayes) và thuật toán học máy cơ bản.",
      chanTroi: "Rèn luyện bài tập phân biệt biến cố độc lập: $A, B$ độc lập $\\iff P(A|B) = P(A)$."
    }
  }
];

export const STUDY_QUESTIONS: StudyQuestion[] = [
  // Chapter 1 Questions
  {
    id: "ch1-q1",
    chapterId: 1,
    topic: "Tính đơn điệu của hàm số",
    difficulty: "Nhận biết",
    format: "MULTIPLE_CHOICE",
    content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x-2)^2(x+1)$ với mọi $x \\in \\mathbb{R}$. Hàm số $y = f(x)$ nghịch biến trên khoảng nào dưới đây?",
    options: [
      { key: "A", text: "$(-1; 0)$" },
      { key: "B", text: "$(0; 2)$" },
      { key: "C", text: "$(2; +\\infty)$" },
      { key: "D", text: "$(-\\infty; -1)$" }
    ],
    correctAnswer: "A",
    explanation: "Ta xét dấu $f'(x) = x(x-2)^2(x+1)$. Vì $(x-2)^2 \\ge 0$ với mọi $x$, dấu của $f'(x)$ phụ thuộc vào tích $x(x+1)$. Do đó $f'(x) < 0 \\iff -1 < x < 0$. Hàm số nghịch biến trên $(-1; 0)$."
  },
  {
    id: "ch1-q2",
    chapterId: 1,
    topic: "Đường tiệm cận (đứng, ngang, xiên)",
    difficulty: "Thông hiểu",
    format: "MULTIPLE_CHOICE",
    content: "Đường tiệm cận xiên của đồ thị hàm số $y = \\dfrac{2x^2 - 3x + 5}{x - 1}$ có phương trình là:",
    options: [
      { key: "A", text: "$y = 2x - 1$" },
      { key: "B", text: "$y = 2x + 1$" },
      { key: "C", text: "$y = 2x - 5$" },
      { key: "D", text: "$y = x - 1$" }
    ],
    correctAnswer: "A",
    explanation: "Chia tử cho mẫu: $\\dfrac{2x^2 - 3x + 5}{x - 1} = 2x - 1 + \\dfrac{4}{x - 1}$. Vì $\\lim_{x \\to \\pm\\infty} \\dfrac{4}{x - 1} = 0$ nên tiệm cận xiên là $y = 2x - 1$."
  },
  {
    id: "ch1-q3",
    chapterId: 1,
    topic: "Cực trị hàm số",
    difficulty: "Thông hiểu",
    format: "TRUE_FALSE",
    content: "Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 4$. Xét tính Đúng/Sai của các mệnh đề sau:",
    statements: [
      {
        key: "a",
        text: "Hàm số đạt cực đại tại điểm $x = 0$ và đạt cực tiểu tại điểm $x = 2$.",
        correct: true,
        explanation: "$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$. Qua $x = 0$ đạo hàm đổi dấu từ dương sang âm nên $x = 0$ là cực đại. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Giá trị cực tiểu của hàm số bằng $4$.",
        correct: false,
        explanation: "Giá trị cực tiểu là $y_{CT} = f(2) = 2^3 - 3(2^2) + 4 = 0 \\neq 4$. Mệnh đề SAI."
      },
      {
        key: "c",
        text: "Điểm uốn của đồ thị hàm số là $U(1; 2)$.",
        correct: true,
        explanation: "$f''(x) = 6x - 6 = 0 \\iff x = 1 \\implies y = f(1) = 2$. Điểm uốn là $U(1; 2)$. Mệnh đề ĐÚNG."
      },
      {
        key: "d",
        text: "Đồ thị hàm số tiếp xúc với trục hoành tại điểm cực tiểu.",
        correct: true,
        explanation: "Tại $x = 2$, ta có $y_{CT} = 0$ và $f'(2) = 0$ nên đồ thị tiếp xúc với trục hoành tại $(2; 0)$. Mệnh đề ĐÚNG."
      }
    ],
    explanation: "Khảo sát hàm bậc ba: $f'(x) = 3x^2 - 6x$, cực đại tại $(0; 4)$ và cực tiểu tại $(2; 0)$."
  },
  {
    id: "ch1-q4",
    chapterId: 1,
    topic: "Ứng dụng tối ưu hóa thực tế",
    difficulty: "Vận dụng",
    format: "SHORT_ANSWER",
    content: "Một người thợ gò làm một thùng hình trụ không nắp từ một tấm tôn có diện tích toàn phần không đổi $S = 3\\pi\\text{ m}^2$. Thể tích lớn nhất của chiếc thùng đó bằng $V_{\\max} = k\\pi\\text{ m}^3$. Giá trị của $k$ là:",
    correctAnswer: "1",
    unit: "m³",
    explanation: "Diện tích không nắp: $S = \\pi r^2 + 2\\pi r h = 3\\pi \\implies h = \\dfrac{3 - r^2}{2r}$. Thể tích $V(r) = \\pi r^2 h = \\dfrac{\\pi}{2}(3r - r^3)$. $V'(r) = \\dfrac{\\pi}{2}(3 - 3r^2) = 0 \\iff r = 1$. Khi đó $V_{\\max} = \\dfrac{\\pi}{2}(3 - 1) = \\pi \\implies k = 1$."
  },

  // Chapter 2 Questions
  {
    id: "ch2-q1",
    chapterId: 2,
    topic: "Tọa độ của điểm và vectơ",
    difficulty: "Nhận biết",
    format: "MULTIPLE_CHOICE",
    content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 2; -3)$ và $B(3; 0; 1)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là:",
    options: [
      { key: "A", text: "$(2; 1; -1)$" },
      { key: "B", text: "$(4; 2; -2)$" },
      { key: "C", text: "$(1; -1; 2)$" },
      { key: "D", text: "$(2; -1; 1)$" }
    ],
    correctAnswer: "A",
    explanation: "Tọa độ trung điểm $M = \\left(\\dfrac{1+3}{2}; \\dfrac{2+0}{2}; \\dfrac{-3+1}{2}\\right) = (2; 1; -1)$."
  },
  {
    id: "ch2-q2",
    chapterId: 2,
    topic: "Góc giữa hai vectơ",
    difficulty: "Thông hiểu",
    format: "SHORT_ANSWER",
    content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 1; 0)$ và $\\vec{v} = (0; 1; 1)$. Số đo góc giữa hai vectơ $\\vec{u}$ và $\\vec{v}$ bằng bao nhiêu độ?",
    correctAnswer: "60",
    unit: "độ",
    explanation: "$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}||\\vec{v}|} = \\dfrac{1\\cdot 0 + 1\\cdot 1 + 0\\cdot 1}{\\sqrt{2}\\cdot\\sqrt{2}} = \\dfrac{1}{2} \\implies (\\vec{u}, \\vec{v}) = 60^\\circ$."
  },
  {
    id: "ch2-q3",
    chapterId: 2,
    topic: "Tích vô hướng của hai vectơ",
    difficulty: "Vận dụng",
    format: "TRUE_FALSE",
    content: "Trong không gian $Oxyz$, cho ba điểm $A(1; 0; 0)$, $B(0; 2; 0)$ và $C(0; 0; 3)$. Xét tính Đúng/Sai của các mệnh đề sau:",
    statements: [
      {
        key: "a",
        text: "Tọa độ vectơ $\\vec{AB} = (-1; 2; 0)$.",
        correct: true,
        explanation: "$\\vec{AB} = (0-1; 2-0; 0-0) = (-1; 2; 0)$. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Độ dài đoạn thẳng $AB$ bằng $\\sqrt{5}$.",
        correct: true,
        explanation: "$AB = \\sqrt{(-1)^2 + 2^2 + 0^2} = \\sqrt{5}$. Mệnh đề ĐÚNG."
      },
      {
        key: "c",
        text: "Tam giác $ABC$ là tam giác vuông tại $A$.",
        correct: false,
        explanation: "$\\vec{AB} = (-1; 2; 0)$, $\\vec{AC} = (-1; 0; 3) \\implies \\vec{AB} \\cdot \\vec{AC} = 1 \\neq 0$, góc $A$ không vuông. Mệnh đề SAI."
      },
      {
        key: "d",
        text: "Điểm $D$ để $ABCD$ là hình bình hành có tọa độ là $(-1; -2; 3)$.",
        correct: false,
        explanation: "Để $ABCD$ là hình bình hành thì $\\vec{AD} = \\vec{BC} \\iff (x_D-1; y_D; z_D) = (0; -2; 3) \\implies D(1; -2; 3)$. Mệnh đề SAI."
      }
    ],
    explanation: "Khảo sát hệ tọa độ $Oxyz$ với 3 điểm trên các trục tọa độ: $\\vec{AB} = (-1; 2; 0)$, $\\vec{AC} = (-1; 0; 3)$."
  },

  // Chapter 3 Questions
  {
    id: "ch3-q1",
    chapterId: 3,
    topic: "Số trung bình của mẫu ghép nhóm",
    difficulty: "Nhận biết",
    format: "MULTIPLE_CHOICE",
    content: "Cho mẫu số liệu ghép nhóm có một nhóm là $[a_i; a_{i+1})$. Giá trị đại diện $c_i$ của nhóm này được xác định bởi công thức:",
    options: [
      { key: "A", text: "$c_i = \\dfrac{a_i + a_{i+1}}{2}$" },
      { key: "B", text: "$c_i = a_{i+1} - a_i$" },
      { key: "C", text: "$c_i = \\dfrac{a_{i+1} - a_i}{2}$" },
      { key: "D", text: "$c_i = \\sqrt{a_i \\cdot a_{i+1}}$" }
    ],
    correctAnswer: "A",
    explanation: "Giá trị đại diện của nhóm $[a_i; a_{i+1})$ là trung bình cộng hai đầu mút: $c_i = \\dfrac{a_i + a_{i+1}}{2}$."
  },
  {
    id: "ch3-q2",
    chapterId: 3,
    topic: "Khoảng biến thiên của mẫu ghép nhóm",
    difficulty: "Thông hiểu",
    format: "SHORT_ANSWER",
    content: "Khảo sát thời gian tự học (phút/ngày) của một nhóm học sinh cho kết quả: $[30; 60)$ có 5 học sinh, $[60; 90)$ có 12 học sinh, $[90; 120)$ có 8 học sinh. Khoảng biến thiên $R$ của mẫu số liệu ghép nhóm này bằng bao nhiêu phút?",
    correctAnswer: "90",
    unit: "phút",
    explanation: "Khoảng biến thiên của mẫu ghép nhóm: $R = 120 - 30 = 90$ phút."
  },
  {
    id: "ch3-q3",
    chapterId: 3,
    topic: "Phương sai và Độ lệch chuẩn mẫu ghép nhóm",
    difficulty: "Vận dụng",
    format: "TRUE_FALSE",
    content: "Một cửa hàng thống kê doanh thu 20 ngày (triệu đồng) thành 3 nhóm: $[10; 20)$ có 4 ngày, $[20; 30)$ có 10 ngày, $[30; 40)$ có 6 ngày. Xét tính Đúng/Sai:",
    statements: [
      {
        key: "a",
        text: "Giá trị đại diện của 3 nhóm lần lượt là 15, 25 và 35 triệu đồng.",
        correct: true,
        explanation: "$c_1 = (10+20)/2 = 15$, $c_2 = 25$, $c_3 = 35$. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Doanh thu trung bình mỗi ngày $\\bar{x} = 26$ triệu đồng.",
        correct: true,
        explanation: "$\\bar{x} = (4\\times 15 + 10\\times 25 + 6\\times 35)/20 = (60 + 250 + 210)/20 = 520/20 = 26$. Mệnh đề ĐÚNG."
      },
      {
        key: "c",
        text: "Phương sai của mẫu số liệu ghép nhóm nhỏ hơn 40.",
        correct: false,
        explanation: "$s^2 = [4(15-26)^2 + 10(25-26)^2 + 6(35-26)^2]/20 = [4(121) + 10(1) + 6(81)]/20 = (484 + 10 + 486)/20 = 980/20 = 49 > 40$. Mệnh đề SAI."
      },
      {
        key: "d",
        text: "Độ lệch chuẩn $s = 7$ triệu đồng.",
        correct: true,
        explanation: "$s = \\sqrt{s^2} = \\sqrt{49} = 7$. Mệnh đề ĐÚNG."
      }
    ],
    explanation: "Doanh thu trung bình $\\bar{x} = 26$, phương sai $s^2 = 49$, độ lệch chuẩn $s = 7$ triệu đồng."
  },

  // Chapter 4 Questions
  {
    id: "ch4-q1",
    chapterId: 4,
    topic: "Phương pháp tích phân từng phần",
    difficulty: "Thông hiểu",
    format: "MULTIPLE_CHOICE",
    content: "Tính tích phân $I = \\int_1^e x \\ln x\\,dx$:",
    options: [
      { key: "A", text: "$\\dfrac{e^2 + 1}{4}$" },
      { key: "B", text: "$\\dfrac{e^2 - 1}{4}$" },
      { key: "C", text: "$\\dfrac{e^2}{2}$" },
      { key: "D", text: "$\\dfrac{e^2 + 2}{4}$" }
    ],
    correctAnswer: "A",
    explanation: "Đặt $u = \\ln x \\implies du = \\dfrac{dx}{x}$; $dv = x\\,dx \\implies v = \\dfrac{x^2}{2}$. $I = \\left[\\dfrac{x^2 \\ln x}{2}\\right]_1^e - \\int_1^e \\dfrac{x}{2}\\,dx = \\dfrac{e^2}{2} - \\left[\\dfrac{x^2}{4}\\right]_1^e = \\dfrac{e^2}{2} - \\left(\\dfrac{e^2 - 1}{4}\\right) = \\dfrac{e^2 + 1}{4}$."
  },
  {
    id: "ch4-q2",
    chapterId: 4,
    topic: "Ứng dụng tính diện tích hình phẳng",
    difficulty: "Vận dụng",
    format: "SHORT_ANSWER",
    content: "Diện tích hình phẳng giới hạn bởi parabol $y = x^2$ và đường thẳng $y = 2x$ bằng bao nhiêu? (Nhập kết quả dưới dạng phân số tối giản $a/b$, nhập giá trị tử số $a$ nếu mẫu số bằng 3):",
    correctAnswer: "4",
    explanation: "Hoành độ giao điểm: $x^2 = 2x \\iff x = 0$ hoặc $x = 2$. $S = \\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$. Tử số $a = 4$."
  },
  {
    id: "ch4-q3",
    chapterId: 4,
    topic: "Nguyên hàm và các tính chất cơ bản",
    difficulty: "Thông hiểu",
    format: "TRUE_FALSE",
    content: "Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ và $\\int_0^2 f(x)\\,dx = 3$, $\\int_0^4 f(x)\\,dx = 7$. Xét tính Đúng/Sai của các mệnh đề sau:",
    statements: [
      {
        key: "a",
        text: "Tích phân $\\int_2^4 f(x)\\,dx = 4$.",
        correct: true,
        explanation: "$\\int_2^4 f(x)\\,dx = \\int_0^4 f(x)\\,dx - \\int_0^2 f(x)\\,dx = 7 - 3 = 4$. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Tích phân $\\int_0^2 2f(x)\\,dx = 6$.",
        correct: true,
        explanation: "$\\int_0^2 2f(x)\\,dx = 2 \\times 3 = 6$. Mệnh đề ĐÚNG."
      },
      {
        key: "c",
        text: "Tích phân $\\int_2^0 f(x)\\,dx = 3$.",
        correct: false,
        explanation: "$\\int_2^0 f(x)\\,dx = -\\int_0^2 f(x)\\,dx = -3$. Mệnh đề SAI."
      },
      {
        key: "d",
        text: "Nếu $f(x) \\ge 0$ với mọi $x$ thì diện tích giới hạn bởi $y=f(x)$, trục hoành từ $x=0$ đến $x=4$ bằng 7.",
        correct: true,
        explanation: "Khi $f(x) \\ge 0$, diện tích $S = \\int_0^4 f(x)\\,dx = 7$. Mệnh đề ĐÚNG."
      }
    ],
    explanation: "Áp dụng tính chất chèn cận của tích phân: $\\int_a^c = \\int_a^b + \\int_b^c$."
  },

  // Chapter 5 Questions
  {
    id: "ch5-q1",
    chapterId: 5,
    topic: "Phương trình mặt cầu",
    difficulty: "Nhận biết",
    format: "MULTIPLE_CHOICE",
    content: "Trong không gian $Oxyz$, mặt cầu $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$ có tâm $I$ và bán kính $R$ là:",
    options: [
      { key: "A", text: "$I(1; -2; 3), R = 4$" },
      { key: "B", text: "$I(-1; 2; -3), R = 4$" },
      { key: "C", text: "$I(1; -2; 3), R = 16$" },
      { key: "D", text: "$I(-1; 2; -3), R = 16$" }
    ],
    correctAnswer: "A",
    explanation: "Mặt cầu $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ có tâm $I(1; -2; 3)$ và bán kính $R = \\sqrt{16} = 4$."
  },
  {
    id: "ch5-q2",
    chapterId: 5,
    topic: "Khoảng cách từ điểm đến mặt phẳng, đường thẳng",
    difficulty: "Thông hiểu",
    format: "SHORT_ANSWER",
    content: "Trong không gian $Oxyz$, tính khoảng cách từ điểm $M(1; 2; 3)$ đến mặt phẳng $(P): 2x - 2y + z + 5 = 0$:",
    correctAnswer: "2",
    explanation: "$d(M, P) = \\dfrac{|2(1) - 2(2) + 1(3) + 5|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\dfrac{|2 - 4 + 3 + 5|}{3} = \\dfrac{6}{3} = 2$."
  },
  {
    id: "ch5-q3",
    chapterId: 5,
    topic: "Phương trình mặt phẳng",
    difficulty: "Vận dụng",
    format: "TRUE_FALSE",
    content: "Trong không gian $Oxyz$, cho mặt cầu $(S): x^2 + y^2 + z^2 - 2x + 4y - 6z - 11 = 0$ và mặt phẳng $(P): 2x + 2y - z + 17 = 0$. Xét tính Đúng/Sai:",
    statements: [
      {
        key: "a",
        text: "Mặt cầu $(S)$ có tâm $I(1; -2; 3)$.",
        correct: true,
        explanation: "$a = 1, b = -2, c = 3 \\implies I(1; -2; 3)$. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Bán kính của mặt cầu $(S)$ là $R = 5$.",
        correct: true,
        explanation: "$R = \\sqrt{1^2 + (-2)^2 + 3^2 - (-11)} = \\sqrt{1 + 4 + 9 + 11} = \\sqrt{25} = 5$. Mệnh đề ĐÚNG."
      },
      {
        key: "c",
        text: "Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$ bằng $4$.",
        correct: true,
        explanation: "$d(I, P) = \\dfrac{|2(1) + 2(-2) - 1(3) + 17|}{\\sqrt{2^2 + 2^2 + (-1)^2}} = \\dfrac{|2 - 4 - 3 + 17|}{3} = \\dfrac{12}{3} = 4$. Mệnh đề ĐÚNG."
      },
      {
        key: "d",
        text: "Mặt phẳng $(P)$ không cắt mặt cầu $(S)$.",
        correct: false,
        explanation: "Vì $d(I, P) = 4 < R = 5$ nên mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo một đường tròn giao tuyến có bán kính $r = \\sqrt{R^2 - d^2} = \\sqrt{25 - 16} = 3$. Mệnh đề SAI."
      }
    ],
    explanation: "Tâm $I(1; -2; 3)$, bán kính $R = 5$. Khoảng cách $d(I, P) = 4 < R$ nên $(P)$ cắt $(S)$ theo đường tròn bán kính $r = 3$."
  },

  // Chapter 6 Questions
  {
    id: "ch6-q1",
    chapterId: 6,
    topic: "Công thức Bayes",
    difficulty: "Vận dụng",
    format: "SHORT_ANSWER",
    content: "Một xưởng có 2 máy sản xuất linh kiện. Máy I sản xuất $60\\%$ sản phẩm với tỉ lệ phế phẩm $2\\%$. Máy II sản xuất $40\\%$ sản phẩm với tỉ lệ phế phẩm $3\\%$. Lấy ngẫu nhiên một sản phẩm thì thấy là phế phẩm. Tính xác suất sản phẩm đó do Máy I sản xuất (viết dưới dạng phân số tối giản $a/b$, nhập giá trị tử số $a$):",
    correctAnswer: "1",
    explanation: "Gọi $A$: \"Sản phẩm là phế phẩm\". $B_1$: Máy I, $B_2$: Máy II. $P(A) = 0,6 \\times 0,02 + 0,4 \\times 0,03 = 0,012 + 0,012 = 0,024$. $P(B_1|A) = \\dfrac{0,012}{0,024} = \\dfrac{1}{2}$. Tử số $a = 1$."
  },
  {
    id: "ch6-q2",
    chapterId: 6,
    topic: "Định nghĩa xác suất có điều kiện P(A|B)",
    difficulty: "Nhận biết",
    format: "MULTIPLE_CHOICE",
    content: "Cho hai biến cố $A$ và $B$ với $P(B) > 0$. Công thức tính xác suất có điều kiện của $A$ khi biết $B$ đã xảy ra là:",
    options: [
      { key: "A", text: "$P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}$" },
      { key: "B", text: "$P(A|B) = \\dfrac{P(A \\cap B)}{P(A)}$" },
      { key: "C", text: "$P(A|B) = P(A) \\cdot P(B)$" },
      { key: "D", text: "$P(A|B) = P(A) + P(B)$" }
    ],
    correctAnswer: "A",
    explanation: "Theo định nghĩa xác suất có điều kiện: $P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}$."
  },
  {
    id: "ch6-q3",
    chapterId: 6,
    topic: "Sơ đồ hình cây (Tree Diagram)",
    difficulty: "Thông hiểu",
    format: "TRUE_FALSE",
    content: "Một xạ thủ bắn 2 phát đạn độc lập vào bia. Xác suất bắn trúng phát thứ nhất là $0,8$. Nếu phát thứ nhất trúng thì xác suất trúng phát thứ hai là $0,7$. Nếu phát thứ nhất trượt thì xác suất trúng phát thứ hai là $0,4$. Xét tính Đúng/Sai:",
    statements: [
      {
        key: "a",
        text: "Xác suất để xạ thủ trúng cả 2 phát là $0,56$.",
        correct: true,
        explanation: "$P(T_1 \\cap T_2) = P(T_1) \\cdot P(T_2|T_1) = 0,8 \\times 0,7 = 0,56$. Mệnh đề ĐÚNG."
      },
      {
        key: "b",
        text: "Xác suất để xạ thủ trượt phát thứ nhất nhưng trúng phát thứ hai là $0,08$.",
        correct: true,
        explanation: "$P(\\bar{T}_1 \\cap T_2) = P(\\bar{T}_1) \\cdot P(T_2|\\bar{T}_1) = (1 - 0,8) \\times 0,4 = 0,2 \\times 0,4 = 0,08$. Mệnh đề ĐÚNG."
      },
      {
        key: "c",
        text: "Xác suất xạ thủ bắn trúng phát thứ hai là $0,64$.",
        correct: true,
        explanation: "Theo công thức xác suất toàn phần: $P(T_2) = 0,56 + 0,08 = 0,64$. Mệnh đề ĐÚNG."
      },
      {
        key: "d",
        text: "Biết phát thứ hai trúng, xác suất phát thứ nhất cũng trúng nhỏ hơn $0,8$.",
        correct: false,
        explanation: "$P(T_1|T_2) = \\dfrac{0,56}{0,64} = \\dfrac{7}{8} = 0,875 > 0,8$. Mệnh đề SAI."
      }
    ],
    explanation: "Áp dụng công thức nhân xác suất và Bayes: $P(T_2) = 0,64$, $P(T_1|T_2) = 0,875$."
  }
];

export const LIVE_LEADERBOARD_DATA: LeaderboardUser[] = [];

export const FORMULA_FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    category: "Nguyên hàm cơ bản",
    front: "\\int x^\\alpha\\,dx \\quad (\\alpha \\neq -1)",
    back: "\\dfrac{x^{\\alpha+1}}{\\alpha + 1} + C",
    note: "Trường hợp đặc biệt: khi $\\alpha = -1$ thì $\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$."
  },
  {
    id: 2,
    category: "Nguyên hàm mũ",
    front: "\\int a^x\\,dx \\quad (0 < a \\neq 1)",
    back: "\\dfrac{a^x}{\\ln a} + C",
    note: "Đừng nhầm với đạo hàm: $(a^x)' = a^x \\ln a$."
  },
  {
    id: 3,
    category: "Nguyên hàm lượng giác",
    front: "\\int \\dfrac{1}{\\cos^2 x}\\,dx",
    back: "\\tan x + C",
    note: "Tương tự: $\\int \\dfrac{1}{\\sin^2 x}\\,dx = -\\cot x + C$ (có dấu trừ)."
  },
  {
    id: 4,
    category: "Tích phân từng phần",
    front: "\\int u\\,dv",
    back: "uv - \\int v\\,du",
    note: "Thứ tự ưu tiên đặt $u$: Lôgarit $\\to$ Đa thức $\\to$ Lượng giác $\\to$ Mũ."
  },
  {
    id: 5,
    category: "Ứng dụng hình học",
    front: "Thể tích tròn xoay quanh $Ox$ của $y = f(x)$",
    back: "V = \\pi \\int_a^b [f(x)]^2\\,dx",
    note: "Đặc biệt chú ý: Nhất định phải có nhân tố $\\pi$ phía trước tích phân!"
  },
  {
    id: 6,
    category: "Diện tích hình phẳng",
    front: "Diện tích giới hạn bởi $y=f(x), y=g(x)$",
    back: "S = \\int_a^b |f(x) - g(x)|\\,dx",
    note: "Luôn có dấu giá trị tuyệt đối để diện tích luôn dương."
  }
];

export const MISTAKE_NOTEBOOK_ITEMS: MistakeItem[] = [];
