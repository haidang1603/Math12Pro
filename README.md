# 📐 Math12Pro - Nền Tảng Ôn Luyện & Thi Thử Toán 12 Chuẩn Bộ GD&ĐT (2025–2026)

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-Backend-ea2845?logo=nestjs)](https://nestjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma)](https://www.prisma.io/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math%20Rendering-green)](https://katex.org/)
[![Tests](https://img.shields.io/badge/Jest%20Tests-43%20Passed-brightgreen)](https://jestjs.io/)
[![MathLab](https://img.shields.io/badge/MathLab-Interactive%20Studio-orange)](https://localhost:3000)

> **Math12Pro** là giải pháp EdTech toàn diện dành cho học sinh lớp 12 và giáo viên, tích hợp kiến thức của cả **3 bộ sách giáo khoa mới (Kết nối tri thức, Cánh diều, Chân trời sáng tạo)**, mô phỏng 100% cấu trúc đề thi Tốt nghiệp THPT mới nhất từ Bộ Giáo dục & Đào tạo, và cung cấp **Phòng Thí Nghiệm Toán Học Tùy Chỉnh (MathLab Studio)** tương tác đa chiều.

---

## 📑 Mục lục
1. [Điểm khác biệt cốt lõi (USP)](#-điểm-khác-biệt-cốt-lõi-usp)
2. [Các màn hình & Tính năng chính](#-các-màn-hình--tính-năng-chính)
3. [Phòng Thí Nghiệm Toán Học Tương Tác Tùy Chỉnh (MathLab Studio)](#-phòng-thí-nghiệm-toán-học-tương-tác-tùy-chỉnh-mathlab-studio)
4. [Thuật toán chấm điểm chuẩn 2025–2026](#-thuật-toán-chấm-điểm-chuẩn-20252026)
5. [Kiến trúc công nghệ & Cấu trúc thư mục](#-kiến-trúc-công-nghệ--cấu-trúc-thư-mục)
6. [Cơ sở dữ liệu (Prisma Schema) & API DTOs](#-cơ-sở-dữ-liệu-prisma-schema--api-dtos)
7. [Bộ kiểm thử tự động (Unit Tests)](#-bộ-kiểm-thử-tự-động-unit-tests)
8. [Hướng dẫn cài đặt & Khởi chạy](#-hướng-dẫn-cài-đặt--khởi-chạy)

---

## 🌟 Điểm khác biệt cốt lõi (USP)

1. **Tích hợp liên bộ sách:** Chuẩn hóa toàn bộ lý thuyết trọng tâm, dạng bài và công thức toán học dùng chung cho cả 3 bộ sách mới.
2. **Ôn luyện tự do 6 Chương (Không khóa lộ trình):** Học sinh toàn quyền truy cập cả 6 chương toán 12 ngay từ đầu, tự thiết lập bộ lọc theo chuyên đề, dạng toán, mức độ nhận thức và làm bài với lời giải chi tiết tức thì.
3. **Phòng Thí Nghiệm Toán Học Tùy Chỉnh (MathLab Studio):** Bộ công cụ trực quan hóa toán học tương tác không cần sửa code (vẽ hàm đa thức, lượng giác, phân thức có tiệm cận, bảng số liệu thực nghiệm, hình học 2D/3D và tải ảnh đề bài).
4. **Phòng thi thử chuẩn cấu trúc 2025–2026:**
   - 90 phút – 22 câu hỏi chia làm 3 phần đặc thù.
   - Chấm điểm lũy tiến thông minh cho dạng trắc nghiệm Đúng/Sai 4 ý (Phần II).
   - Bộ chuẩn hóa ký tự đầu vào tự động cho phần Điền đáp án ngắn (Phần III).
5. **Phân tích năng lực chuyên sâu (Radar Analytics):** Vẽ biểu đồ mạng nhện thể hiện độ thành thạo 6 chương, tự động nhận diện và cảnh báo các chuyên đề yếu kèm đường dẫn tắt vào phòng ôn luyện.
6. **Sổ tay lỗi sai thông minh (Mistake Notebook):** Tự động gom mọi câu làm sai hoặc chưa đạt điểm tối đa ở cả chế độ Luyện tập và Thi thử, hỗ trợ luyện lại cho đến khi giải quyết triệt để (`isResolved = true`).

---

## 🖥️ Các màn hình & Tính năng chính

### 1. Trung tâm Ôn luyện 6 Chương (`ChapterPracticeHub`)
- **Tổng quan 6 Chương Toán 12:**
  - **Chương 1:** Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số *(Tích hợp đồ thị hàm số tương tác & liên kết MathLab)*.
  - **Chương 2:** Tọa độ vectơ trong không gian *(Mô phỏng hệ trục tọa độ 3D Oxyz)*.
  - **Chương 3:** Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm *(Máy tính phương sai & độ lệch chuẩn)*.
  - **Chương 4:** Nguyên hàm, tích phân và ứng dụng *(Flashcard công thức & Mindmap)*.
  - **Chương 5:** Phương pháp tọa độ trong không gian *(Hình học giải tích không gian)*.
  - **Chương 6:** Xác suất có điều kiện và công thức Bayes *(Sơ đồ cây xác suất trực quan)*.
- **Chế độ Luyện tập tức thì (Study Mode):** Học sinh làm từng câu, ấn "Kiểm tra đáp án" để xem Đúng/Sai và lời giải KaTeX từng bước, hệ thống tự động tính điểm và cập nhật `% Mastery` của chương.
- **Bài kiểm tra chương:** Mô phỏng bài kiểm tra 45 phút đánh giá toàn diện mức độ hoàn thành chương.

### 2. Phòng Thi Thử Ảo Chuẩn Cấu Trúc Mới (`Mock Exam Room`)
- **4 Cột mốc thi:** Giữa Học kì 1, Cuối Học kì 1, Học kì 2, và Thi Tốt nghiệp THPT Quốc gia.
- **Layout chuyên nghiệp 2 cột:**
  - **75% Khung làm bài:** Hiển thị mượt mà các công thức toán học phức tạp bằng KaTeX (tương thích cả hiển thị inline `$x$` và block `$$\int f(x)dx$$`).
  - **25% Bảng điều hướng (Question Palette) & Đồng hồ:** Bộ 22 nút trạng thái (Chưa làm, Đang làm, Đã hoàn thành) + Đồng hồ đếm ngược 90 phút có cảnh báo màu (Xanh lá -> Vàng cam -> Đỏ khi còn dưới 10 phút).
- **Hỗ trợ làm thử nhanh (Auto-fill):** Nút tự động điền bài mẫu giúp kiểm tra ngay tính năng chấm điểm và phân tích.

### 3. Phân tích Năng lực & Sổ tay Lỗi sai
- **Radar Analytics:** Biểu đồ Radar 6 cạnh từ thư viện Recharts hiển thị trực quan tỷ lệ % làm đúng theo từng chương. Cảnh báo những chương đạt dưới 70% kèm nút "Luyện ngay".
- **Mistake Notebook Modal:** Liệt kê các câu hỏi bị mất điểm kèm dạng toán, số lần sai (`wrongCount`), trạng thái xử lý và cho phép học sinh làm lại trực tiếp.
- **Quick Quiz 15 Phút:** 5 câu hỏi ngẫu nhiên tổng hợp để khởi động nhanh mỗi ngày, tích hợp hiệu ứng pháo hoa khi hoàn thành điểm cao.
- **Đấu trường Live Arena:** Đấu trường thi trực tiếp định kỳ tối Chủ Nhật 20h00 với Bảng xếp hạng Top học sinh toàn quốc.

---

## 🧪 Phòng Thí Nghiệm Toán Học Tương Tác Tùy Chỉnh (MathLab Studio)

Module `MathLabStudio` là không gian toán học tương tác mạnh mẽ và an toàn, phục vụ khám phá chuyên sâu:

1. **Bộ Parse biểu thức Toán học An Toàn (Safe AST Parser):**
   - **Tuyệt đối không sử dụng `eval` hoặc `new Function`**.
   - Trình phân tích cú pháp đệ quy xuống (Recursive Descent Parser) xây dựng Cây cú pháp trừu tượng (AST) độc lập.
   - Hỗ trợ nhân ngầm (`2x`, `3(x-1)`), đa thức, phân thức, hàm lượng giác (`sin`, `cos`, `tan`), hàm mũ (`exp`), căn thức (`sqrt`), giá trị tuyệt đối (`abs`), và lôgarit tự nhiên (`ln`).
   - Xử lý miền xác định: chia cho 0, căn số âm, gián đoạn tiệm cận đứng, và ngắt đường vẽ SVG mượt mà không tạo đường rác nối $-\infty \to +\infty$.
2. **Khảo sát nhiều hàm số & Tham số động $m$:**
   - Vẽ nhiều đường cong trên cùng một hệ trục với màu sắc và tên nhãn tùy chỉnh.
   - Thanh trượt tham số động $m \in [-10, 10]$ để khảo sát họ đường cong $y = f(x, m)$.
   - Rê chuột trên hệ trục hiển thị tọa độ tức thì $(x, y)$.
3. **Bảng số liệu thực nghiệm (Data Table):**
   - Nhập, sửa, xóa các điểm thực nghiệm $(x_i, y_i)$.
   - Dán dữ liệu trực tiếp từ bảng tính Excel / CSV / Tab-separated.
   - Biểu diễn phân tán (scatter plot) và đường nối thực nghiệm.
4. **Khảo sát điểm & Hình học:**
   - Nhập tọa độ các điểm $A(x_A, y_A)$, $B(x_B, y_B)$.
   - Tự động tính khoảng cách $d(A, B) = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.
   - Tự động tính tọa độ trung điểm $M\left(\frac{x_A+x_B}{2}, \frac{y_A+y_B}{2}\right)$.
   - Tự động lập phương trình đường thẳng $AB$ dạng $y = ax + b$ hoặc $x = c$.
5. **Khu vực tải ảnh đề bài (Image Lab):**
   - Hỗ trợ tải các định dạng ảnh phổ biến (PNG, JPG, WebP).
   - Công cụ thu phóng (Zoom 50% – 250%), xoay hình $90^\circ$, và xóa ảnh.
6. **Lưu trữ phiên làm việc (Session Persistence):**
   - Lưu trữ toàn bộ danh sách hàm, tham số, bảng số liệu và khung nhìn vào `localStorage`.
   - Xem danh sách phiên đã lưu và khôi phục trạng thái làm việc với 1 click.

---

## 🧮 Thuật toán chấm điểm chuẩn 2025–2026

Hệ thống tuân thủ chính xác 100% barem chấm điểm mới của Bộ GD&ĐT:

| Phần | Tên định dạng | Số câu | Quy tắc chấm điểm | Điểm tối đa |
| :--- | :--- | :---: | :--- | :---: |
| **Phần I** | Trắc nghiệm 4 lựa chọn (`SINGLE_CHOICE`) | **12 câu** | Mỗi câu đúng được **+0.25** điểm. Sai được **0** điểm. | **3.0 điểm** |
| **Phần II** | Trắc nghiệm Đúng/Sai 4 ý (`TRUE_FALSE`) | **04 câu** | So khớp 4 ý $a, b, c, d$. Chấm điểm lũy tiến:<br>• Đúng 1 ý: **+0.10** điểm<br>• Đúng 2 ý: **+0.25** điểm<br>• Đúng 3 ý: **+0.50** điểm<br>• Đúng cả 4 ý: **+1.00** điểm<br>• Không đúng ý nào: **0** điểm | **4.0 điểm** |
| **Phần III** | Trả lời ngắn (`SHORT_ANSWER`) | **06 câu** | Chuẩn hóa chuỗi người dùng nhập (xóa khoảng trắng, thay `.` thành `,`, giới hạn 4 ký tự). Khớp đáp án chuẩn: **+0.50** điểm/câu. | **3.0 điểm** |
| **TỔNG CỘNG** | | **22 câu** | | **10.0 điểm** |

---

## 🏗️ Kiến trúc công nghệ & Cấu trúc thư mục

```
Math12Pro/
├── src/                               # Frontend Next.js (App Router)
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, tích hợp KaTeX CSS & fonts
│   │   ├── page.tsx                   # Trang chủ tích hợp 3 màn hình & State Hub
│   │   ├── globals.css                # TailwindCSS v4 setup & animations
│   │   └── api/v1/                    # Next.js Fullstack API Route Handlers
│   │       ├── exams/submit/route.ts  # API Chấm bài 3 phần, radar, lỗi sai
│   │       ├── practice/
│   │       │   ├── questions/route.ts # API Lọc câu hỏi ôn luyện 6 chương
│   │       │   └── check-single/route.ts # API Chấm câu lẻ tức thì (Study Mode)
│   │       └── analytics/radar/route.ts # API Phân tích radar năng lực 6 chương
│   ├── components/
│   │   ├── MathRenderer.tsx           # Bộ parse & render KaTeX thông minh (chống lỗi JSX)
│   │   ├── ChapterPracticeHub.tsx     # Hub 6 chương, Study Mode & bộ lọc linh hoạt
│   │   ├── ChapterInteractiveModal.tsx# Modal công cụ tương tác (3D, Desmos, Stats)
│   │   ├── ExamTimer.tsx              # Đồng hồ đếm ngược 90:00 & cảnh báo
│   │   ├── QuestionPalette.tsx        # Bảng 22 câu hỏi & trạng thái hoàn thành
│   │   ├── SingleChoiceQuestion.tsx   # Giao diện câu hỏi Phần I
│   │   ├── TrueFalseQuestion.tsx      # Giao diện câu hỏi Phần II (4 mệnh đề a,b,c,d)
│   │   ├── ShortAnswerQuestion.tsx    # Giao diện câu hỏi Phần III (Input 4 ký tự)
│   │   ├── RadarAnalytics.tsx         # Biểu đồ năng lực 6 chương Recharts
│   │   ├── MistakeNotebookModal.tsx   # Modal Sổ tay lỗi sai & Luyện lại
│   │   ├── ExamHistoryModal.tsx       # Modal Lịch sử thi & Xem lại bài làm
│   │   ├── QuickQuizModal.tsx         # Modal Quiz 15 phút & Pháo hoa
│   │   ├── LiveArenaModal.tsx         # Modal Đấu trường trực tiếp & Bảng xếp hạng
│   │   └── Navbar.tsx                 # Thanh điều hướng với bộ đếm Streak & Lịch sử thi
│   ├── services/
│   │   ├── apiClient.ts               # Client gọi API Backend với fallback offline
│   │   └── storageService.ts          # Lưu trữ lịch sử thi, lỗi sai, độ thành thạo
│   └── data/
│       ├── chaptersData.ts            # Dữ liệu 6 chương chuẩn 3 bộ SGK & câu hỏi luyện tập
│       └── mockExamData.ts            # Bộ đề thi thử 22 câu chuẩn cấu trúc Bộ GD&ĐT
│
├── backend/                           # Backend NestJS & PostgreSQL (Prisma ORM)
│   ├── prisma/
│   │   ├── schema.prisma              # Database Schema PostgreSQL đầy đủ
│   │   └── seed.ts                    # Dữ liệu mẫu khởi tạo DB 6 chương & 1 đề thi
│   └── src/
│       ├── main.ts                    # Entrypoint máy chủ NestJS (CORS, ValidationPipe)
│       ├── app.module.ts              # Root AppModule tích hợp PrismaModule
│       ├── prisma/                    # PrismaModule & PrismaService toàn cục
│       ├── dto/                       # DTOs xác thực dữ liệu đầu vào
│       ├── services/                  # Business logic (chấm điểm, mastery gate, practice)
│       ├── controllers/               # REST API Endpoints NestJS
│       └── tests/                     # 36 Unit Tests Jest
│
├── package.json
└── README.md
```

---

## 🗄️ Cơ sở dữ liệu (Prisma Schema) & API DTOs

### 1. Các bảng cơ sở dữ liệu cốt lõi (`schema.prisma`)
- `Chapter`: 6 chương chuẩn kiến thức THPT lớp 12.
- `Topic`: Các chuyên đề thuộc từng chương.
- `ProblemType`: Các dạng toán cụ thể trong chuyên đề.
- `Question`: Bảng câu hỏi hỗ trợ 3 định dạng (`SINGLE_CHOICE`, `TRUE_FALSE`, `SHORT_ANSWER`) và 4 mức độ (`NHAN_BIET`, `THONG_HIEU`, `VAN_DUNG`, `VAN_DUNG_CAO`).
- `ChapterMastery`: Lưu lịch sử ôn luyện, số câu làm/đúng và tính `% masteryScore` theo từng học sinh.
- `Exam` & `ExamAttempt` & `AttemptAnswer`: Lưu trữ đề thi, lượt làm bài của học sinh và chi tiết đáp án từng câu kèm số điểm đạt được.
- `MistakeNotebook`: Tự động ghi nhận các câu hỏi chưa đạt điểm tối đa, lưu số lần sai (`wrongCount`) và cờ đã khắc phục (`isResolved`).

### 2. DTOs & Validation
- Sử dụng `class-validator` và `class-transformer` để kiểm tra dữ liệu đầu vào chặt chẽ.
- Hỗ trợ payload lọc ôn tập: `chapterId`, `topicId`, `format`, `level`, `limit`.
- Hỗ trợ payload nộp bài thi gồm mảng các câu trả lời thuộc 3 định dạng tương ứng.

---

## 🧪 Bộ kiểm thử tự động (Unit Tests)

Dự án tích hợp bộ kiểm thử toàn diện với **43/43 tests passed (5 test suites)** kiểm tra nghiêm ngặt:
1. **Bộ Parse & Tính Biểu thức Toán Học An Toàn (Safe AST Math Parser):**
   - Đa thức bậc 1, 2, 3 và phân thức có tiệm cận.
   - Nhân ngầm (`2x`, `3(x-1)`, `(x+1)(x-1)`).
   - Hàm lượng giác (`sin`, `cos`, `tan`), mũ (`exp`), căn thức (`sqrt`), giá trị tuyệt đối (`abs`), và lôgarit (`ln`).
   - Xử lý chia cho 0 và vi phạm miền xác định trả về `NaN` an toàn, không làm crash ứng dụng.
   - Phát hiện lỗi cú pháp và chặn biểu thức nguy hiểm.
2. **Thuật toán điểm lũy tiến Phần II:**
   - 0 ý đúng $\rightarrow$ `0.00` điểm
   - 1 ý đúng $\rightarrow$ `0.10` điểm
   - 2 ý đúng $\rightarrow$ `0.25` điểm
   - 3 ý đúng $\rightarrow$ `0.50` điểm
   - 4 ý đúng $\rightarrow$ `1.00` điểm
3. **Bộ chuẩn hóa chuỗi Phần III:**
   - Cắt bỏ khoảng trắng thừa ở hai đầu (`"  12,5 "` $\rightarrow$ `"12,5"`).
   - Tự động chuyển dấu chấm thành dấu phẩy (`"12.5"` $\rightarrow$ `"12,5"`).
   - Giới hạn tối đa 4 ký tự theo quy chế thi trên giấy của Bộ GD&ĐT.
4. **Mastery Gate & Ghi nhận Sổ tay lỗi sai:**
   - Kiểm tra tính đúng đắn khi tự động upsert câu sai vào `MistakeNotebook`.
   - Kiểm tra đánh dấu `isResolved = true` khi học sinh luyện lại câu hỏi đó và đạt điểm tối đa.

Chạy kiểm thử bằng lệnh:
```bash
npm test
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### Yêu cầu tiên quyết
- **Node.js**: Phiên bản `>= 18.x` (Khuyến nghị Node.js 20 hoặc 24 LTS)
- **Trình quản lý gói**: `npm` hoặc `pnpm`
- **PostgreSQL**: Nếu chạy đầy đủ kết nối Database backend

### 1. Khởi chạy Giao diện Frontend (Next.js)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy dev server
npm run dev
```

Truy cập trình duyệt tại: `http://localhost:3000`

### 2. Kết nối với Supabase (PostgreSQL & Prisma ORM)

Math12Pro hỗ trợ kết nối trực tiếp với **Supabase PostgreSQL** thông qua cơ chế Dual Connection (Connection Pooling cho API/Serverless và Direct Connection cho Prisma Migration):

1. **Lấy chuỗi kết nối từ Supabase Dashboard:**
   * Vào **Project Settings** $\rightarrow$ **Database** $\rightarrow$ **Connection string**:
     * Chọn thẻ **Transaction (Port 6543)** để lấy `DATABASE_URL` (hỗ trợ pgbouncer).
     * Chọn thẻ **Session / Direct (Port 5432)** để lấy `DIRECT_URL`.
   * Vào **Project Settings** $\rightarrow$ **API** để lấy `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

2. **Cấu hình file `.env`:**
   ```bash
   # Connection Pooling (Port 6543) cho API/Query
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Direct Connection (Port 5432) cho Migration & Db Push
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

   # Supabase Client API
   NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
   ```

3. **Đẩy Schema lên cơ sở dữ liệu Supabase:**
   ```bash
   # Đồng bộ trực tiếp toàn bộ 7 bảng lên Supabase
   npx prisma db push --schema=backend/prisma/schema.prisma

   # Khởi tạo dữ liệu mẫu (6 chương, chuyên đề, đề thi mẫu)
   npx ts-node backend/prisma/seed.ts
   ```

4. **Chạy bộ kiểm thử tự động:**
   ```bash
   npm test
   ```

---

## 👨‍💻 Tác giả & Bản quyền
Phát triển bởi đội ngũ Kỹ sư Công nghệ Giáo dục **Math12Pro**.  
*Bản quyền nội dung câu hỏi và cấu trúc thi thuộc chương trình GDPT 2018 - Bộ Giáo dục và Đào tạo Việt Nam.*
