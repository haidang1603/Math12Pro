"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  Edit3,
  UploadCloud,
  FileText,
  FileCode,
  RotateCcw,
  Play,
  Image as ImageIcon,
  Upload,
  Trash2,
} from "lucide-react";
import {
  ExamData,
  MilestoneType,
  SingleChoiceQuestionData,
  TrueFalseQuestionData,
  ShortAnswerQuestionData,
  ExamFormatType,
} from "@/types/exam";
import { saveCustomExam } from "@/services/storageService";
import { getExamScoreStructure } from "@/utils/scoring";
import MathRenderer from "@/components/MathRenderer";

interface AzotaExamCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExamCreated: (newExam: ExamData, startImmediately?: boolean) => void;
  initialMode?: "upload" | "editor";
}

interface ExamPresetConfig {
  id: ExamFormatType;
  title: string;
  badge: string;
  duration: number;
  description: string;
  sampleText: string;
}

const EXAM_PRESETS: ExamPresetConfig[] = [
  {
    id: "THPT_2026",
    title: "Đề chuẩn GDPT 2026 (12 TN + 4 Đ/S + 6 TLN)",
    badge: "Chuẩn Bộ GD 2026",
    duration: 90,
    description: "Cấu trúc 3 phần chuẩn: 12 Trắc nghiệm (3.0đ) + 4 Đúng/Sai (4.0đ) + 6 Trả lời ngắn (3.0đ)",
    sampleText: `[PHẦN I - TRẮC NGHIỆM 4 LỰA CHỌN (12 CÂU)]
Câu 1: Cho hàm số $y = \\frac{2x - 1}{x + 1}$. Đường tiệm cận đứng của đồ thị hàm số đã cho là đường thẳng:
A. $x = 1$
B. $x = -1$
C. $y = 2$
D. $y = -2$
Đáp án: B
Lời giải: Tiệm cận đứng là nghiệm của mẫu số $x + 1 = 0 \\iff x = -1$.

Câu 2: Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 2; -1)$ và $\\vec{v} = (2; -1; 3)$. Tích vô hướng $\\vec{u} \\cdot \\vec{v}$ bằng:
A. 3
B. -3
C. 7
D. -1
Đáp án: B
Lời giải: Ta có $\\vec{u} \\cdot \\vec{v} = 1 \\cdot 2 + 2 \\cdot (-1) + (-1) \\cdot 3 = 2 - 2 - 3 = -3$.

[PHẦN II - TRẮC NGHIỆM ĐÚNG SAI (4 CÂU)]
Câu 3: Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 2$.
a) Đạo hàm của hàm số là $f'(x) = 3x^2 - 6x$.
b) Hàm số đồng biến trên khoảng $(0; 2)$.
c) Điểm cực đại của đồ thị hàm số là $A(0; 2)$.
d) Giá trị nhỏ nhất của hàm số trên đoạn $[0; 3]$ bằng $-2$.
Đáp án: a-Đ, b-S, c-Đ, d-Đ
Lời giải: $f'(x) = 3x^2 - 6x = 0 \\iff x = 0$ hoặc $x = 2$. Trong khoảng $(0; 2)$, $f'(x) < 0$ nên hàm số nghịch biến. Tại $x = 2$, $y = 2^3 - 3(4) + 2 = -2$.

[PHẦN III - TRẢ LỜI NGẮN (6 CÂU)]
Câu 4: Một chiếc hộp không nắp được gập từ một tấm tôn hình vuông cạnh 60 cm bằng cách cắt bỏ 4 hình vuông bằng nhau ở 4 góc cạnh $x$ (cm). Tìm $x$ để thể tích khối hộp thu được đạt giá trị lớn nhất.
Đáp án: 10
Lời giải: Thể tích hộp $V(x) = x(60 - 2x)^2 = 4x(30 - x)^2$ với $0 < x < 30$. Bằng đạo hàm ta có $V'(x) = 4(30 - x)(30 - 3x) = 0 \\iff x = 10$.`,
  },
  {
    id: "MULTIPLE_CHOICE_50",
    title: "Đề 50 câu Trắc nghiệm 4 lựa chọn (90 phút)",
    badge: "50 câu • 0.20đ",
    duration: 90,
    description: "Đề 50 câu trắc nghiệm truyền thống, mỗi câu 0.20 điểm = 10.0 điểm toàn bài",
    sampleText: `[50 CÂU TRẮC NGHIỆM 4 LỰA CHỌN - 90 PHÚT (0.20 ĐIỂM / CÂU)]
Câu 1: Cho hàm số $y = \\frac{2x - 1}{x + 1}$. Đường tiệm cận đứng của đồ thị hàm số là:
A. $x = 1$
B. $x = -1$
C. $y = 2$
D. $y = -2$
Đáp án: B
Lời giải: Nghiệm của mẫu số là $x + 1 = 0 \\iff x = -1$.

Câu 2: Trong không gian $Oxyz$, cho điểm $A(1; 2; 3)$ và mặt phẳng $(P): 2x - y + 2z - 1 = 0$. Khoảng cách từ $A$ đến $(P)$ bằng:
A. 2
B. 3
C. 1
D. $\\frac{7}{3}$
Đáp án: B
Lời giải: Áp dụng công thức khoảng cách: $d(A, (P)) = \\frac{|2(1) - 2 + 2(3) - 1|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{6}{3} = 2$.

Câu 3: Nguyên hàm $\\int (3x^2 + 2x) dx$ bằng:
A. $x^3 + x^2 + C$
B. $6x + 2 + C$
C. $x^3 + 2x^2 + C$
D. $3x^3 + x^2 + C$
Đáp án: A
Lời giải: Ta có $\\int (3x^2 + 2x) dx = x^3 + x^2 + C$.

Câu 4: Cho khối lăng trụ có diện tích đáy $B = 6$ và chiều cao $h = 4$. Thể tích của khối lăng trụ đã cho bằng:
A. 8
B. 12
C. 24
D. 72
Đáp án: C
Lời giải: Thể tích lăng trụ $V = B \\cdot h = 6 \\cdot 4 = 24$.

Câu 5: Tập nghiệm của bất phương trình $\\log_2(x - 1) < 3$ là:
A. $(-\\infty; 9)$
B. $(1; 9)$
C. $(1; 8)$
D. $(1; 7)$
Đáp án: B
Lời giải: Điều kiện $x > 1$. Bất phương trình tương đương $x - 1 < 2^3 = 8 \\iff x < 9$. Kết hợp điều kiện ta được $1 < x < 9$.

// Dán tiếp các câu tiếp theo từ Câu 6 đến Câu 50 vào đây. Hệ thống tự nhận diện đầy đủ 50 câu!`,
  },
  {
    id: "MULTIPLE_CHOICE_40",
    title: "Đề 40 câu Trắc nghiệm 4 lựa chọn (50 phút)",
    badge: "40 câu • 0.25đ",
    duration: 50,
    description: "Đề 40 câu kiểm tra định kỳ / giữa kỳ, mỗi câu 0.25 điểm = 10.0 điểm toàn bài",
    sampleText: `[40 CÂU TRẮC NGHIỆM 4 LỰA CHỌN - 50 PHÚT (0.25 ĐIỂM / CÂU)]
Câu 1: Hàm số $y = x^4 - 2x^2 + 3$ có bao nhiêu điểm cực trị?
A. 1
B. 2
C. 3
D. 0
Đáp án: C
Lời giải: $y' = 4x^3 - 4x = 4x(x^2 - 1) = 0$ có 3 nghiệm phân biệt $x = 0, x = \\pm 1$ và đổi dấu qua các nghiệm này nên hàm số có 3 điểm cực trị.

Câu 2: Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 3$ và công bội $q = 2$. Giá trị của $u_4$ bằng:
A. 24
B. 48
C. 18
D. 12
Đáp án: A
Lời giải: Áp dụng công thức $u_4 = u_1 \\cdot q^3 = 3 \\cdot 2^3 = 24$.

Câu 3: Đồ thị hàm số nào sau đây có đường tiệm cận ngang?
A. $y = \\frac{x^2 + 1}{x - 1}$
B. $y = \\frac{2x - 3}{x + 1}$
C. $y = x^3 - 3x$
D. $y = \\sqrt{x^2 + 1}$
Đáp án: B
Lời giải: Bậc của tử số bằng bậc mẫu số nên hàm phân thức $y = \\frac{2x - 3}{x + 1}$ có tiệm cận ngang là $y = 2$.

Câu 4: Trong không gian $Oxyz$, mặt cầu $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$ có bán kính bằng:
A. 16
B. 8
C. 4
D. 2
Đáp án: C
Lời giải: Bán kính mặt cầu là $R = \\sqrt{16} = 4$.

// Dán tiếp các câu tiếp theo từ Câu 5 đến Câu 40 vào đây. Hệ thống tự nhận diện đầy đủ 40 câu!`,
  },
  {
    id: "HYBRID_30_3",
    title: "Đề 30 câu Trắc nghiệm + 3 câu Tự luận (90 phút)",
    badge: "30 TN + 3 Tự luận",
    duration: 90,
    description: "Đề kết hợp truyền thống: 30 câu Trắc nghiệm (7.0đ) + 3 câu Tự luận trình bày chi tiết (3.0đ)",
    sampleText: `[PHẦN I - TRẮC NGHIỆM 30 CÂU (7.0 ĐIỂM)]
Câu 1: Cho hàm số $y = f(x)$ có bảng biến thiên và $f'(x)$ đổi dấu từ âm sang dương khi qua $x = 1$. Điểm cực tiểu của hàm số là:
A. $x = 1$
B. $x = 0$
C. $x = -1$
D. $x = 2$
Đáp án: A
Lời giải: Đạo hàm đổi dấu từ âm sang dương nên hàm số đạt cực tiểu tại $x = 1$.

Câu 2: Cho khối chóp có đáy là hình vuông cạnh $a$ và chiều cao $h = 3a$. Thể tích khối chóp đã cho bằng:
A. $a^3$
B. $3a^3$
C. $2a^3$
D. $\\frac{a^3}{3}$
Đáp án: A
Lời giải: $V = \\frac{1}{3} S_{day} \\cdot h = \\frac{1}{3} a^2 \\cdot 3a = a^3$.

Câu 3: Biết $\\int_0^2 f(x) dx = 3$ và $\\int_0^2 g(x) dx = -2$. Khi đó $\\int_0^2 [2f(x) - g(x)] dx$ bằng:
A. 4
B. 8
C. 7
D. 5
Đáp án: B
Lời giải: Ta có $\\int_0^2 [2f(x) - g(x)] dx = 2(3) - (-2) = 6 + 2 = 8$.

[PHẦN II - TỰ LUẬN 3 BÀI (3.0 ĐIỂM)]
Bài 1 (Tự luận - 1.0 điểm): Một người gửi 100 triệu đồng vào ngân hàng với lãi suất 6%/năm theo thể thức lãi kép. Hỏi sau ít nhất bao nhiêu năm thì người đó nhận được số tiền cả gốc lẫn lãi vượt quá 180 triệu đồng? (Giả thiết lãi suất không đổi trong suốt thời gian gửi).
Đáp án: 11 năm
Lời giải:
Gọi số năm gửi là $n$ ($n \\in \\mathbb{N}^*$).
Số tiền nhận được sau $n$ năm là: $T_n = 100 \\cdot (1 + 0,06)^n$ (triệu đồng).
Theo đề bài: $100 \\cdot (1,06)^n > 180 \\iff 1,06^n > 1,8$.
Lấy logarit tự nhiên hai vế: $n > \\frac{\\ln 1,8}{\\ln 1,06} \\approx 10,07$.
Vì $n$ là số nguyên nên sau ít nhất 11 năm thì số tiền vượt quá 180 triệu đồng.

Bài 2 (Tự luận - 1.0 điểm): Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$. Cạnh bên $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Tính góc giữa đường thẳng $SC$ và mặt phẳng đáy $(ABCD)$.
Đáp án: 50.77 độ
Lời giải:
Vì $SA \\perp (ABCD)$ nên $AC$ là hình chiếu vuông góc của $SC$ lên mặt phẳng $(ABCD)$.
Do đó góc giữa $SC$ và $(ABCD)$ là góc $\\widehat{SCA}$.
Tam giác $ABC$ vuông cân tại $B$ nên $AC = \\sqrt{AB^2 + BC^2} = a\\sqrt{2}$.
Trong tam giác vuông $SAC$ tại $A$:
$\\tan \\widehat{SCA} = \\frac{SA}{AC} = \\frac{a\\sqrt{3}}{a\\sqrt{2}} = \\frac{\\sqrt{6}}{2} \\approx 1,2247$.
Vậy $\\widehat{SCA} = \\arctan\\left(\\frac{\\sqrt{6}}{2}\\right) \\approx 50^\\circ 46'$.

Bài 3 (Tự luận - 1.0 điểm): Trong không gian $Oxyz$, cho hai điểm $A(1; 2; -1)$ và $B(3; 0; 1)$. Viết phương trình mặt cầu $(S)$ có đường kính là đoạn thẳng $AB$.
Đáp án: $(x - 2)^2 + (y - 1)^2 + z^2 = 3$
Lời giải:
Tâm $I$ của mặt cầu là trung điểm của đoạn thẳng $AB$:
$x_I = \\frac{1 + 3}{2} = 2$, $y_I = \\frac{2 + 0}{2} = 1$, $z_I = \\frac{-1 + 1}{2} = 0 \\implies I(2; 1; 0)$.
Độ dài vectơ $\\vec{AB} = (2; -2; 2) \\implies AB = \\sqrt{2^2 + (-2)^2 + 2^2} = \\sqrt{12} = 2\\sqrt{3}$.
Bán kính mặt cầu: $R = \\frac{AB}{2} = \\sqrt{3}$.
Phương trình mặt cầu $(S)$ là: $(x - 2)^2 + (y - 1)^2 + z^2 = 3$.`,
  },
];

export default function AzotaExamCreatorModal({
  isOpen,
  onClose,
  onExamCreated,
  initialMode = "upload",
}: AzotaExamCreatorModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExamFormatType>("THPT_2026");
  const [examTitle, setExamTitle] = useState(EXAM_PRESETS[0].title);
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [milestone, setMilestone] = useState<MilestoneType>("TOT_NGHIEP_THPT");
  const [rawText, setRawText] = useState(EXAM_PRESETS[0].sampleText);
  const [activeTab, setActiveTab] = useState<"upload" | "editor" | "preview">(initialMode);

  // File upload state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [, setUploadedFileSize] = useState<number | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [extractSuccessMsg, setExtractSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertImageInputRef = useRef<HTMLInputElement>(null);

  // Parsing result status
  const [parsedExam, setParsedExam] = useState<{
    part1: SingleChoiceQuestionData[];
    part2: TrueFalseQuestionData[];
    part3: ShortAnswerQuestionData[];
  } | null>(null);

  const [parseError, setParseError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApplyPreset = (preset: ExamPresetConfig) => {
    setSelectedFormat(preset.id);
    setExamTitle(preset.title);
    setDurationMinutes(preset.duration);
    setRawText(preset.sampleText);
    const parsed = parseAzotaText(preset.sampleText);
    if (parsed) {
      setParsedExam(parsed);
    }
  };

  // Smart Parser like Azota supporting text and extracted images
  const parseAzotaText = (text: string) => {
    try {
      setParseError("");
      const part1: SingleChoiceQuestionData[] = [];
      const part2: TrueFalseQuestionData[] = [];
      const part3: ShortAnswerQuestionData[] = [];

      let currentSection: "PART_1" | "PART_2" | "PART_3" = "PART_1";

      // Split text by questions (e.g. "Câu 1:", "Câu 2:", "Bài 1:", "Câu 1.")
      const rawQuestions = text.split(/(?=(?:Câu|Bài)\s+\d+[:.\s/])/gi);

      rawQuestions.forEach((qChunk) => {
        const trimmed = qChunk.trim();
        if (!trimmed) return;

        // Check if chunk introduces a new section
        if (/(?:PHẦN\s+(?:I|1)\b|TRẮC\s+NGHIỆM\s+4|4\s+LỰA\s+CHỌN)/i.test(trimmed)) currentSection = "PART_1";
        if (/(?:PHẦN\s+(?:II|2)\b|ĐÚNG\s+SAI)/i.test(trimmed)) currentSection = "PART_2";
        if (/(?:PHẦN\s+(?:III|3)\b|TRẢ\s+LỜI\s+NGẮN|TỰ\s+LUẬN|PHẦN\s+(?:II|2)\s*-\s*TỰ\s+LUẬN)/i.test(trimmed)) currentSection = "PART_3";

        // Check for attached or embedded image
        let imageUrl: string | undefined = undefined;
        const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        } else {
          const mdImgMatch = trimmed.match(
            /!\[.*?\]\((data:image\/[^;]+;base64,[^)]+|https?:\/\/[^)]+)\)/i
          );
          if (mdImgMatch) {
            imageUrl = mdImgMatch[1];
          }
        }

        // Extract explanation if present
        let explanation = "";
        const explMatch = trimmed.match(
          /(?:Lời giải|Hướng dẫn giải|Giải chi tiết|HDG)[:.]\s*([\s\S]*?)(?=(?:Câu|Bài)\s+\d+|$)/i
        );
        if (explMatch) {
          explanation = explMatch[1].trim();
        }

        // Test options A, B, C, D
        const optA = trimmed.match(/[AА]\.\s*([\s\S]*?)(?=[BВ]\.\s*|$)/i);
        const optB = trimmed.match(/[BВ]\.\s*([\s\S]*?)(?=[CС]\.\s*|$)/i);
        const optC = trimmed.match(/[CС]\.\s*([\s\S]*?)(?=[D]\.\s*|$)/i);
        const optD = trimmed.match(/[D]\.\s*([\s\S]*?)(?=(?:Đáp án|Đ\/A|Lời giải|Key|HDG)|$)/i);
        const hasOptions = !!(optA && optB);

        // Test statements a), b), c), d)
        const stmtA = trimmed.match(/a\)\s*([\s\S]*?)(?=b\)\s*|$)/i);
        const stmtB = trimmed.match(/b\)\s*([\s\S]*?)(?=c\)\s*|$)/i);
        const stmtC = trimmed.match(/c\)\s*([\s\S]*?)(?=d\)\s*|$)/i);
        const stmtD = trimmed.match(/d\)\s*([\s\S]*?)(?=(?:Đáp án|Lời giải|HDG)|$)/i);
        const hasStatements = !!(stmtA && stmtB);

        if (hasOptions || (currentSection === "PART_1" && hasOptions)) {
          // Part 1: Single Choice
          let content = "";
          const options: { key: "A" | "B" | "C" | "D"; text: string }[] = [];
          let correctAnswer: "A" | "B" | "C" | "D" = "A";

          if (optA) options.push({ key: "A", text: optA[1].trim() });
          if (optB) options.push({ key: "B", text: optB[1].trim() });
          if (optC) options.push({ key: "C", text: optC[1].trim() });
          if (optD) options.push({ key: "D", text: optD[1].trim() });

          const contentMatch = trimmed.match(/(?:(?:Câu|Bài)\s+\d+[:.]\s*)?([\s\S]*?)(?=[AА]\.\s*)/i);
          content = contentMatch ? contentMatch[1].trim() : "Câu hỏi trắc nghiệm";

          if (imageUrl) {
            content = content
              .replace(/<img[^>]+src=["'][^"']+["'][^>]*>/gi, "")
              .replace(/!\[.*?\]\([^)]+\)/gi, "")
              .trim();
          }

          const ansMatch = trimmed.match(/(?:Đáp án|Đ\/A|Key|DA|Chọn)\s*[:.]?\s*([A-D])/i);
          if (ansMatch) {
            const rawKey = ansMatch[1].toUpperCase();
            if (rawKey === "A" || rawKey === "B" || rawKey === "C" || rawKey === "D") {
              correctAnswer = rawKey;
            }
          }

          const normalizedOptions: { key: "A" | "B" | "C" | "D"; text: string }[] =
            options.length >= 2
              ? options.length === 4
                ? options
                : [
                    ...options,
                    { key: "C" as const, text: "Phương án bổ sung C" },
                    { key: "D" as const, text: "Phương án bổ sung D" },
                  ].slice(0, 4)
              : [
                  { key: "A" as const, text: "Phương án A" },
                  { key: "B" as const, text: "Phương án B" },
                  { key: "C" as const, text: "Phương án C" },
                  { key: "D" as const, text: "Phương án D" },
                ];

          part1.push({
            id: 100 + part1.length + 1,
            part: 1,
            number: part1.length + 1,
            chapterId: 1,
            chapterName: "Đề tạo tự do",
            topic: "Trắc nghiệm 4 lựa chọn",
            content,
            imageUrl,
            options: normalizedOptions,
            correctAnswer,
            explanation: explanation || "Xem lời giải chi tiết trong phần hướng dẫn.",
          });
        } else if (hasStatements || (currentSection === "PART_2" && hasStatements)) {
          // Part 2: True/False
          const contentMatch = trimmed.match(/(?:(?:Câu|Bài)\s+\d+[:.]\s*)?([\s\S]*?)(?=a\)\s*)/i);
          let context = contentMatch ? contentMatch[1].trim() : "Cho hàm số và các mệnh đề sau:";

          if (imageUrl) {
            context = context
              .replace(/<img[^>]+src=["'][^"']+["'][^>]*>/gi, "")
              .replace(/!\[.*?\]\([^)]+\)/gi, "")
              .trim();
          }

          const ansKeyMatch = trimmed.match(/(?:Đáp án|Đ\/A)[:.]\s*([^\n]+)/i);
          const ansKeyStr = ansKeyMatch ? ansKeyMatch[1].toLowerCase() : "";

          const isCorrect = (key: string) => {
            if (ansKeyStr.includes(`${key}-đ`) || ansKeyStr.includes(`${key}:đ`) || ansKeyStr.includes(`${key} đúng`))
              return true;
            if (ansKeyStr.includes(`${key}-s`) || ansKeyStr.includes(`${key}:s`) || ansKeyStr.includes(`${key} sai`))
              return false;
            return key === "a" || key === "c";
          };

          part2.push({
            id: 200 + part2.length + 1,
            part: 2,
            number: part2.length + 1,
            chapterId: 1,
            chapterName: "Đề tạo tự do",
            topic: "Trắc nghiệm Đúng/Sai",
            context,
            imageUrl,
            statements: [
              {
                key: "a",
                text: stmtA ? stmtA[1].trim() : "Mệnh đề a",
                correct: isCorrect("a"),
                explanation: "Giải thích ý a",
              },
              {
                key: "b",
                text: stmtB ? stmtB[1].trim() : "Mệnh đề b",
                correct: isCorrect("b"),
                explanation: "Giải thích ý b",
              },
              {
                key: "c",
                text: stmtC ? stmtC[1].trim() : "Mệnh đề c",
                correct: isCorrect("c"),
                explanation: "Giải thích ý c",
              },
              {
                key: "d",
                text: stmtD ? stmtD[1].trim() : "Mệnh đề d",
                correct: isCorrect("d"),
                explanation: "Giải thích ý d",
              },
            ],
          });
        } else {
          // Part 3: Short Answer or Essay
          let content = trimmed;
          let correctAnswer = "0";

          const isEssay =
            /tự\s*luận|bài\s+toán|chứng\s+minh|trình\s+bày|bài\s+\d+/i.test(trimmed) ||
            /PHẦN\s+(?:II|2)\s*-\s*TỰ\s+LUẬN/i.test(text) ||
            trimmed.length > 200;

          const ansMatch = trimmed.match(/(?:Đáp án|Đ\/A|Key|Kết quả)[:.]\s*([^\n]+)/i);
          if (ansMatch) {
            correctAnswer = ansMatch[1].trim();
            content = content.replace(ansMatch[0], "").trim();
          }

          if (explMatch) {
            content = content.replace(explMatch[0], "").trim();
          }

          if (imageUrl) {
            content = content
              .replace(/<img[^>]+src=["'][^"']+["'][^>]*>/gi, "")
              .replace(/!\[.*?\]\([^)]+\)/gi, "")
              .trim();
          }

          part3.push({
            id: 300 + part3.length + 1,
            part: 3,
            number: part3.length + 1,
            chapterId: 1,
            chapterName: "Đề tạo tự do",
            topic: isEssay ? "Tự luận" : "Trả lời ngắn",
            content,
            imageUrl,
            correctAnswer,
            explanation:
              explanation ||
              (isEssay
                ? "Trình bày các bước lập luận, biến đổi và kết quả theo hướng dẫn."
                : "Điền đáp số vào ô trả lời."),
            isEssay,
          });
        }
      });

      const totalFound = part1.length + part2.length + part3.length;
      if (totalFound === 0) {
        setParseError("Chưa nhận diện được câu hỏi nào. Vui lòng kiểm tra định dạng 'Câu 1:', 'A. B. C. D.'");
        return null;
      }

      const result = { part1, part2, part3 };
      setParsedExam(result);
      return result;
    } catch (e: unknown) {
      setParseError(e instanceof Error ? e.message : "Lỗi không xác định khi phân tích cấu trúc đề.");
      return null;
    }
  };

  // Change image of a specific question in Preview mode
  const handleQuestionImageChange = (
    qId: number,
    part: 1 | 2 | 3,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !parsedExam) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (!dataUrl) return;

      if (part === 1) {
        setParsedExam({
          ...parsedExam,
          part1: parsedExam.part1.map((q) => (q.id === qId ? { ...q, imageUrl: dataUrl } : q)),
        });
      } else if (part === 2) {
        setParsedExam({
          ...parsedExam,
          part2: parsedExam.part2.map((q) => (q.id === qId ? { ...q, imageUrl: dataUrl } : q)),
        });
      } else if (part === 3) {
        setParsedExam({
          ...parsedExam,
          part3: parsedExam.part3.map((q) => (q.id === qId ? { ...q, imageUrl: dataUrl } : q)),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove image of a specific question in Preview mode
  const handleRemoveQuestionImage = (qId: number, part: 1 | 2 | 3) => {
    if (!parsedExam) return;
    if (part === 1) {
      setParsedExam({
        ...parsedExam,
        part1: parsedExam.part1.map((q) => (q.id === qId ? { ...q, imageUrl: undefined } : q)),
      });
    } else if (part === 2) {
      setParsedExam({
        ...parsedExam,
        part2: parsedExam.part2.map((q) => (q.id === qId ? { ...q, imageUrl: undefined } : q)),
      });
    } else if (part === 3) {
      setParsedExam({
        ...parsedExam,
        part3: parsedExam.part3.map((q) => (q.id === qId ? { ...q, imageUrl: undefined } : q)),
      });
    }
  };

  // Insert image directly to editor text
  const handleInsertImageToEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (!dataUrl) return;

      const imgTag = `\n<img src="${dataUrl}" alt="Hình minh họa" />\n`;
      setRawText((prev) => prev + imgTag);
    };
    reader.readAsDataURL(file);
  };

  // Paste image handler directly in editor textarea
  const handleEditorPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            const dataUrl = loadEvent.target?.result as string;
            if (dataUrl) {
              const imgTag = `\n<img src="${dataUrl}" alt="Hình minh họa" />\n`;
              const target = e.target as HTMLTextAreaElement;
              const start = target.selectionStart || 0;
              const end = target.selectionEnd || 0;
              const newText = rawText.substring(0, start) + imgTag + rawText.substring(end);
              setRawText(newText);
            }
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    }
  };

  // Process file upload (supports .docx, .doc, .pdf, .txt, .json, .png, .jpg, .webp)
  const processUploadedFile = async (file: File) => {
    setExtractError("");
    setExtractSuccessMsg("");
    setUploadedFileName(file.name);
    setUploadedFileSize(file.size);
    setIsExtracting(true);

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    setExamTitle(`Đề thi: ${cleanName}`);

    // Plain text reading
    if (["txt", "json", "md"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || "";
        setIsExtracting(false);
        if (text) {
          setRawText(text);
          parseAzotaText(text);
          setActiveTab("preview");
        }
      };
      reader.onerror = () => {
        setIsExtracting(false);
        setExtractError("Không thể đọc tệp văn bản này.");
      };
      reader.readAsText(file);
      return;
    }

    // Word, PDF, Images sent to backend for extraction
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/v1/exams/extract-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setIsExtracting(false);

      if (data.success && data.text) {
        setRawText(data.text);
        if (data.imagesCount > 0) {
          setExtractSuccessMsg(
            `Đã tự động bóc tách thành công ${data.imagesCount} hình ảnh minh họa từ tệp đề thi!`
          );
        }
        const parsed = parseAzotaText(data.text);
        if (parsed) {
          setActiveTab("preview");
        } else {
          setActiveTab("editor");
        }
      } else {
        setExtractError(data.message || "Không thể trích xuất nội dung từ tệp Word/PDF/Ảnh này.");
      }
    } catch (err: unknown) {
      setIsExtracting(false);
      setExtractError(err instanceof Error ? err.message : "Lỗi kết nối khi trích xuất tệp.");
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handlePreview = () => {
    const parsed = parseAzotaText(rawText);
    if (parsed) {
      setActiveTab("preview");
    }
  };

  const handleSaveExam = (startImmediately: boolean = false) => {
    const examData = parsedExam || parseAzotaText(rawText);
    if (!examData) {
      setActiveTab("editor");
      return;
    }

    let detectedFormat: ExamFormatType = selectedFormat;
    if (examData.part1.length === 12 && examData.part2.length === 4 && examData.part3.length === 6) {
      detectedFormat = "THPT_2026";
    } else if (examData.part1.length === 50 && examData.part2.length === 0 && examData.part3.length === 0) {
      detectedFormat = "MULTIPLE_CHOICE_50";
    } else if (examData.part1.length === 40 && examData.part2.length === 0 && examData.part3.length === 0) {
      detectedFormat = "MULTIPLE_CHOICE_40";
    } else if (examData.part1.length > 0 && examData.part2.length === 0 && examData.part3.length > 0) {
      detectedFormat = "HYBRID_30_3";
    } else if (!detectedFormat) {
      detectedFormat = "CUSTOM";
    }

    const newExam: ExamData = {
      id: `exam-custom-${Date.now()}`,
      title: examTitle.trim() || "Đề thi tự luyện Toán 12",
      milestone,
      durationMinutes,
      examFormat: detectedFormat,
      part1: examData.part1,
      part2: examData.part2,
      part3: examData.part3,
      isCustom: true,
      authorName: "Học sinh / Giáo viên tải lên",
      createdAt: new Date().toISOString(),
      tags: ["Tự tải lên", "Chuẩn Azota", "Có hình ảnh", "Word/PDF/Ảnh", detectedFormat],
    };

    saveCustomExam(newExam);
    setIsSuccess(true);

    setTimeout(() => {
      onExamCreated(newExam, startImmediately);
      onClose();
    }, 600);
  };

  const totalQuestions =
    (parsedExam?.part1.length || 0) + (parsedExam?.part2.length || 0) + (parsedExam?.part3.length || 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <UploadCloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                <span>Tạo & Tải Đề Thi Thông Minh</span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Bóc tách hình ảnh & Đề thi Word / PDF / Ảnh
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tải file (.docx, .pdf, .png, .jpg) để tự động trích xuất đề thi kèm toàn bộ hình ảnh minh họa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Navigation Bar */}
        <div className="px-4 sm:px-6 pt-3 pb-2 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "upload"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>1. Tải Tệp Lên</span>
            </button>

            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>2. Soạn & Chèn Ảnh</span>
            </button>

            <button
              onClick={handlePreview}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3. Xem Trước ({totalQuestions} câu)</span>
            </button>
          </div>

          {uploadedFileName && (
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="text-slate-500">Tệp đã nạp:</span>
              <span className="font-semibold text-blue-400 truncate max-w-[200px]">{uploadedFileName}</span>
            </div>
          )}
        </div>

        {/* Global Exam Metadata Settings */}
        <div className="p-4 sm:px-6 bg-slate-900/60 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tên đề thi:</label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="VD: Đề thi Khảo sát Toán 12 - THPT Chuyên"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Thời gian làm bài:</label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value={15}>15 phút (Luyện phản xạ nhanh)</option>
              <option value={45}>45 phút (Kiểm tra 1 tiết)</option>
              <option value={60}>60 phút (Kiểm tra định kì)</option>
              <option value={90}>90 phút (Thi chuẩn Bộ GD&ĐT)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Kỳ thi mục tiêu:</label>
            <select
              value={milestone}
              onChange={(e) => setMilestone(e.target.value as MilestoneType)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="GIUA_KI_1">Giữa Học kì 1</option>
              <option value="CUOI_KI_1">Cuối Học kì 1</option>
              <option value="GIUA_CUOI_KI_2">Học kì 2</option>
              <option value="TOT_NGHIEP_THPT">Tốt nghiệp THPT 2026</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Status Notifications */}
          {extractError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{extractError}</span>
            </div>
          )}

          {extractSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{extractSuccessMsg}</span>
            </div>
          )}

          {parseError && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* TAB 1: FILE UPLOAD (DOC, DOCX, PDF, PNG, JPG, TXT) */}
          {activeTab === "upload" && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx,.pdf,.txt,.json,.md,.png,.jpg,.jpeg,.webp"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Drag and drop zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 sm:p-12 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
                    : "border-slate-700 hover:border-blue-500/70 bg-slate-950/40 hover:bg-slate-950/70"
                }`}
              >
                {isExtracting ? (
                  <div className="py-6 space-y-3">
                    <div className="w-10 h-10 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-semibold text-blue-400">
                      Đang bóc tách văn bản, hình vẽ và cấu trúc đề thi...
                    </p>
                    <p className="text-xs text-slate-500">
                      Tự động trích xuất các sơ đồ, hình học và công thức toán học KaTeX
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <UploadCloud className="w-8 h-8" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">
                      Kéo thả tệp đề thi vào đây, hoặc bấm để chọn tệp từ máy
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                      Hỗ trợ bóc tách hình ảnh tự động từ Word (<strong>.docx, .doc</strong>), Tệp PDF scan hình ảnh (
                      <strong>.pdf</strong>), và Ảnh chụp đề thi (<strong>.png, .jpg, .webp</strong>)
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Word (.docx có ảnh)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-semibold flex items-center gap-1">
                        <FileCode className="w-3.5 h-3.5" /> Adobe PDF & PDF Scan hình ảnh (.pdf)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" /> Ảnh chụp đề thi (.png, .jpg)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Văn bản (.txt, .json)
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Guide tips */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Cơ chế bóc tách tệp PDF scan & hình ảnh thông minh:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li>
                    <strong>Tệp PDF scan hình ảnh (.pdf):</strong> Tự động bóc tách từng trang scan hình ảnh và đồ thị, bảng biến thiên, hình học không gian Oxyz đính kèm trực tiếp vào từng câu hỏi.
                  </li>
                  <li>
                    <strong>Tệp Word (.docx):</strong> Mọi hình vẽ đồ thị, bảng biến thiên nằm dưới mỗi câu hỏi sẽ được tự động bóc tách và gán trực tiếp vào câu tương ứng.
                  </li>
                  <li>
                    <strong>Ảnh chụp đề thi:</strong> Tự động nhận dạng văn bản toán học và đính kèm hình ảnh vào bài thi.
                  </li>
                  <li>
                    <strong>Dán ảnh trực tiếp:</strong> Bạn có thể chụp màn hình ảnh đề rồi ấn <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Ctrl + V</kbd> trong tab Soạn thảo.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: EDITOR (AZOTA TEXT & CHÈN ẢNH) */}
          {activeTab === "editor" && (
            <div className="space-y-3">
              <input
                ref={insertImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleInsertImageToEditor}
                className="hidden"
              />

              {/* Fast Preset Selector Bar */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Chọn định dạng đề thi nhanh:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Hệ thống tự động điều chỉnh thang điểm 10.0đ & chia phần
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EXAM_PRESETS.map((preset) => {
                    const isSelected = selectedFormat === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "bg-blue-600/20 border-blue-500 text-white shadow-xs"
                            : "bg-slate-900 hover:bg-slate-850 border-slate-700/80 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {preset.badge}
                          </span>
                          <span className="text-[10px] text-slate-400">{preset.duration}p</span>
                        </div>
                        <div className="text-xs font-semibold leading-tight line-clamp-1">
                          {preset.title.split("(")[0].trim()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="text-slate-400 font-medium">Nội dung đề thi (Soạn hoặc dán trực tiếp):</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => insertImageInputRef.current?.click()}
                    className="text-xs text-blue-300 hover:text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                    title="Chọn một file hình ảnh từ máy tính để chèn vào đề thi"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Chèn ảnh từ máy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const defaultPreset = EXAM_PRESETS.find((p) => p.id === selectedFormat) || EXAM_PRESETS[0];
                      handleApplyPreset(defaultPreset);
                    }}
                    className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Nạp đề mẫu
                  </button>
                </div>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                onPaste={handleEditorPaste}
                placeholder="Dán nội dung đề thi vào đây. Bạn có thể nhấn Ctrl+V để dán trực tiếp ảnh chụp từ clipboard!"
                rows={16}
                className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-700 font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed resize-y"
              />

              <div className="flex items-center justify-between pt-1 text-slate-500 text-[11px] flex-wrap gap-2">
                <span>
                  {rawText.length} ký tự • Hỗ trợ thẻ ảnh <code>&lt;img src="..." /&gt;</code> và paste ảnh trực tiếp từ Clipboard
                </span>

                <button
                  type="button"
                  onClick={handlePreview}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Kiểm tra & Xem trước cấu trúc đề</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PREVIEW */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              {parsedExam && totalQuestions > 0 ? (
                <>
                  {/* Summary & Dynamic Scoring Structure Banner */}
                  {(() => {
                    const mockExam: ExamData = {
                      id: "preview-scoring",
                      title: examTitle,
                      milestone,
                      durationMinutes,
                      part1: parsedExam.part1,
                      part2: parsedExam.part2,
                      part3: parsedExam.part3,
                    };
                    const scoreStructure = getExamScoreStructure(mockExam);
                    return (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-blue-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white flex items-center gap-1.5 text-sm">
                              📊 Cấu trúc điểm:
                            </span>
                            <span className="font-semibold text-blue-300 bg-blue-950/90 px-2.5 py-1 rounded-lg border border-blue-800">
                              {scoreStructure.formatLabel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              Thang điểm: 10.0đ
                            </span>
                            <button
                              onClick={() => setActiveTab("editor")}
                              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700"
                            >
                              <Edit3 className="w-3.5 h-3.5" /> Sửa nội dung
                            </button>
                          </div>
                        </div>

                        {/* Counts per section */}
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center gap-3 text-xs">
                          <span className="font-bold text-white">Tổng cộng: {totalQuestions} câu hỏi</span>
                          {parsedExam.part1.length > 0 && (
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                              Phần I (Trắc nghiệm): {parsedExam.part1.length} câu ({scoreStructure.perP1 > 0 ? `${scoreStructure.perP1.toFixed(2)}đ/câu` : ""})
                            </span>
                          )}
                          {parsedExam.part2.length > 0 && (
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                              Phần II (Đúng/Sai): {parsedExam.part2.length} câu ({scoreStructure.perP2Max.toFixed(2)}đ max/câu)
                            </span>
                          )}
                          {parsedExam.part3.length > 0 && (
                            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-semibold">
                              Phần III ({parsedExam.part3.some((q) => q.isEssay) ? "Tự luận / Điền số" : "Trả lời ngắn"}): {parsedExam.part3.length} câu ({scoreStructure.perP3 > 0 ? `${scoreStructure.perP3.toFixed(2)}đ/câu` : ""})
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Part 1 preview */}
                  {parsedExam.part1.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        Phần I: Câu trắc nghiệm 4 lựa chọn ({parsedExam.part1.length} câu)
                      </h4>
                      {parsedExam.part1.map((q, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-sm space-y-2.5">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-blue-700 shrink-0">Câu {q.number}:</span>
                            <div className="flex-1">
                              <MathRenderer text={q.content} className="text-slate-900 font-medium text-xs leading-relaxed" />
                            </div>
                          </div>

                          {/* Image preview & image action controls */}
                          {q.imageUrl && (
                            <div className="my-2.5 flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                              <img
                                src={q.imageUrl}
                                alt={`Hình minh họa câu ${q.number}`}
                                className="max-h-48 rounded-lg object-contain border border-slate-200 shadow-2xs bg-white p-1"
                              />
                              <div className="flex items-center gap-2 mt-2">
                                <label className="text-[10px] text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 cursor-pointer font-semibold flex items-center gap-1">
                                  <Upload className="w-3 h-3" /> Đổi ảnh
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleQuestionImageChange(q.id, 1, e)}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuestionImage(q.id, 1)}
                                  className="text-[10px] text-rose-600 hover:text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-200 cursor-pointer font-semibold flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" /> Xóa ảnh
                                </button>
                              </div>
                            </div>
                          )}

                          {!q.imageUrl && (
                            <div className="pt-0.5">
                              <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-200 cursor-pointer transition-colors">
                                <ImageIcon className="w-3 h-3" /> + Thêm ảnh minh họa cho câu này
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleQuestionImageChange(q.id, 1, e)}
                                />
                              </label>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {q.options.map((opt) => (
                              <div
                                key={opt.key}
                                className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${
                                  opt.key === q.correctAnswer
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                                    : "bg-slate-50 border-slate-200 text-slate-800"
                                }`}
                              >
                                <span className="font-bold text-slate-700">{opt.key}.</span>
                                <MathRenderer text={opt.text} />
                                {opt.key === q.correctAnswer && (
                                  <span className="ml-auto text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                                    Đáp án đúng
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Part 2 preview */}
                  {parsedExam.part2.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Phần II: Câu trắc nghiệm Đúng / Sai ({parsedExam.part2.length} câu)
                      </h4>
                      {parsedExam.part2.map((q, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-sm space-y-2.5">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-indigo-700 shrink-0">Câu {q.number}:</span>
                            <div className="flex-1">
                              <MathRenderer text={q.context} className="text-slate-900 font-medium text-xs leading-relaxed" />
                            </div>
                          </div>

                          {/* Image preview & image action controls */}
                          {q.imageUrl && (
                            <div className="my-2.5 flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                              <img
                                src={q.imageUrl}
                                alt={`Hình minh họa câu ${q.number}`}
                                className="max-h-48 rounded-lg object-contain border border-slate-200 shadow-2xs bg-white p-1"
                              />
                              <div className="flex items-center gap-2 mt-2">
                                <label className="text-[10px] text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 cursor-pointer font-semibold flex items-center gap-1">
                                  <Upload className="w-3 h-3" /> Đổi ảnh
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleQuestionImageChange(q.id, 2, e)}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuestionImage(q.id, 2)}
                                  className="text-[10px] text-rose-600 hover:text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-200 cursor-pointer font-semibold flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" /> Xóa ảnh
                                </button>
                              </div>
                            </div>
                          )}

                          {!q.imageUrl && (
                            <div className="pt-0.5">
                              <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-200 cursor-pointer transition-colors">
                                <ImageIcon className="w-3 h-3" /> + Thêm ảnh minh họa cho câu này
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleQuestionImageChange(q.id, 2, e)}
                                />
                              </label>
                            </div>
                          )}

                          <div className="space-y-1.5 mt-2">
                            {q.statements.map((stmt) => (
                              <div
                                key={stmt.key}
                                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-800"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-700">{stmt.key})</span>
                                  <MathRenderer text={stmt.text} />
                                </div>
                                <span
                                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                    stmt.correct
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                      : "bg-rose-100 text-rose-800 border border-rose-300"
                                  }`}
                                >
                                  {stmt.correct ? "Đúng" : "Sai"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Part 3 preview */}
                  {parsedExam.part3.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                          <span>
                            Phần III:{" "}
                            {parsedExam.part3.some((q) => q.isEssay)
                              ? "Câu hỏi Tự luận & Trả lời ngắn"
                              : "Câu trắc nghiệm trả lời ngắn"}{" "}
                            ({parsedExam.part3.length} câu)
                          </span>
                        </h4>
                      </div>
                      {parsedExam.part3.map((q, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-sm space-y-2.5">
                          <div className="flex items-start gap-2">
                            <span className={`font-bold shrink-0 ${q.isEssay ? "text-indigo-700" : "text-orange-700"}`}>
                              {q.isEssay ? `Bài ${q.number}:` : `Câu ${q.number}:`}
                            </span>
                            <div className="flex-1">
                              <MathRenderer text={q.content} className="text-slate-900 font-medium text-xs leading-relaxed" />
                            </div>
                            {q.isEssay && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 uppercase shrink-0">
                                Tự luận
                              </span>
                            )}
                          </div>

                          {/* Image preview & image action controls */}
                          {q.imageUrl && (
                            <div className="my-2.5 flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                              <img
                                src={q.imageUrl}
                                alt={`Hình minh họa câu ${q.number}`}
                                className="max-h-48 rounded-lg object-contain border border-slate-200 shadow-2xs bg-white p-1"
                              />
                              <div className="flex items-center gap-2 mt-2">
                                <label className="text-[10px] text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 cursor-pointer font-semibold flex items-center gap-1">
                                  <Upload className="w-3 h-3" /> Đổi ảnh
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleQuestionImageChange(q.id, 3, e)}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuestionImage(q.id, 3)}
                                  className="text-[10px] text-rose-600 hover:text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-200 cursor-pointer font-semibold flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" /> Xóa ảnh
                                </button>
                              </div>
                            </div>
                          )}

                          {!q.imageUrl && (
                            <div className="pt-0.5">
                              <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-200 cursor-pointer transition-colors">
                                <ImageIcon className="w-3 h-3" /> + Thêm ảnh minh họa cho câu này
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleQuestionImageChange(q.id, 3, e)}
                                />
                              </label>
                            </div>
                          )}

                          {q.isEssay ? (
                            <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-indigo-900">Đáp số / Kết quả:</span>
                                <code className="font-mono font-bold bg-white border border-indigo-300 text-indigo-700 px-2 py-0.5 rounded shadow-2xs">
                                  {q.correctAnswer}
                                </code>
                              </div>
                              {q.explanation && (
                                <div className="pt-1 text-slate-700 border-t border-indigo-100">
                                  <div className="font-semibold text-[11px] text-indigo-900 mb-0.5">
                                    Hướng dẫn giải & Thang điểm chi tiết:
                                  </div>
                                  <MathRenderer text={q.explanation} className="text-xs leading-relaxed" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 text-xs flex items-center gap-2">
                              <span className="font-bold">Đáp án chuẩn (Điền số):</span>
                              <code className="font-mono font-bold bg-white border border-orange-300 text-orange-700 px-2 py-0.5 rounded shadow-xs">
                                {q.correctAnswer}
                              </code>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs space-y-3">
                  <UploadCloud className="w-8 h-8 text-slate-600 mx-auto" />
                  <div>Chưa có dữ liệu câu hỏi để xem trước.</div>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs cursor-pointer"
                  >
                    Tải file đề thi hoặc Soạn thảo ngay
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            {isSuccess ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Đã lưu đề thi vào kho luyện tập thành công!
              </span>
            ) : (
              <span>
                Đã nhận diện: <strong className="text-white">{totalQuestions} câu hỏi</strong> ({milestone})
              </span>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSaveExam(false)}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700 text-center"
            >
              Lưu vào kho đề
            </button>

            <button
              type="button"
              onClick={() => handleSaveExam(true)}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Lưu & Bắt đầu thi</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
