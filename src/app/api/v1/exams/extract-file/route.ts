import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy tệp được tải lên." },
        { status: 400 }
      );
    }

    const fileName = file.name;
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";
    const extractedImages: { id: string; dataUrl: string }[] = [];
    let imageCounter = 1;

    // 1. XỬ LÝ TỆP MICROSOFT WORD (.DOCX, .DOC) - CÓ BÓC TÁCH HÌNH ẢNH EMBEDDED
    if (extension === "docx" || extension === "doc") {
      try {
        // Convert DOCX to HTML with embedded images preserved as base64 data URLs
        const htmlResult = await mammoth.convertToHtml(
          { buffer },
          {
            convertImage: mammoth.images.imgElement((image) => {
              return image.read("base64").then((imageBuffer) => {
                const mimeType = image.contentType || "image/png";
                const dataUrl = `data:${mimeType};base64,${imageBuffer}`;
                const imgId = `[HINH_ANH_${imageCounter}]`;
                extractedImages.push({ id: imgId, dataUrl });
                imageCounter++;
                return {
                  src: dataUrl,
                  alt: imgId,
                };
              });
            }),
          }
        );

        const html = htmlResult.value || "";

        // Transform HTML to readable text format while preserving <img src="..." />
        extractedText = html
          .replace(/<\/p>/gi, "\n\n")
          .replace(/<\/h[1-6]>/gi, "\n\n")
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<\/tr>/gi, "\n")
          .replace(/<\/td>/gi, "  ")
          .replace(/<td[^>]*>/gi, "")
          .replace(/<tr[^>]*>/gi, "")
          .replace(/<table[^>]*>/gi, "\n")
          .replace(/<\/table>/gi, "\n")
          // Strip out all tags except <img>
          .replace(/<(?!img\b)[^>]+>/gi, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"');
      } catch (err) {
        console.warn("Lỗi đọc bằng mammoth convertToHtml, thử trích xuất thô:", err);
        try {
          const rawResult = await mammoth.extractRawText({ buffer });
          extractedText = rawResult.value || "";
        } catch {
          extractedText = buffer
            .toString("utf-8")
            .replace(/[^\x20-\x7E\u00A0-\u024F\u1EA0-\u1EF9\n\r]/g, " ");
        }
      }
    }
    // 2. XỬ LÝ TỆP HÌNH ẢNH TRỰC TIẾP (.PNG, .JPG, .JPEG, .WEBP)
    else if (["png", "jpg", "jpeg", "webp", "bmp"].includes(extension)) {
      const mimeType =
        extension === "png"
          ? "image/png"
          : extension === "webp"
          ? "image/webp"
          : "image/jpeg";
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64Data}`;
      extractedImages.push({ id: "[HINH_ANH_1]", dataUrl });

      const resolvedApiKey = (process.env.GEMINI_API_KEY || "").trim();
      let ocrSuccess = false;

      // Nếu có Gemini API Key, sử dụng AI OCR nhận diện câu hỏi từ ảnh đề thi (ưu tiên Gemini 3.5 Flash)
      if (resolvedApiKey) {
        const ocrModels = [
          "gemini-3.5-flash",
          "gemini-3.5-flash-lite",
          "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
        ];

        for (const model of ocrModels) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${resolvedApiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [
                        {
                          inlineData: {
                            mimeType,
                            data: base64Data,
                          },
                        },
                        {
                          text: `Hãy trích xuất và bóc tách toàn bộ đề thi toán học từ bức ảnh này thành định dạng văn bản chuẩn Azota.
YÊU CẦU:
1. Mỗi câu hỏi bắt đầu bằng 'Câu 1:', 'Câu 2:',...
2. Nếu là trắc nghiệm 4 lựa chọn: Có các dòng 'A. ...', 'B. ...', 'C. ...', 'D. ...' và dòng 'Đáp án: [A/B/C/D]'.
3. Nếu là trắc nghiệm Đúng/Sai: Có các ý 'a) ...', 'b) ...', 'c) ...', 'd) ...' và dòng 'Đáp án: a-Đ, b-S, c-Đ, d-S'.
4. Nếu là trả lời ngắn: Có câu hỏi và dòng 'Đáp án: [số]'.
5. Công thức toán định dạng KaTeX: dùng $...$ cho công thức nội dòng và $$...$$ cho công thức khối.
6. Chèn thẻ <img src="${dataUrl}" alt="Hình minh họa" /> vào ngay sau nội dung câu hỏi có hình vẽ tương ứng trong bức ảnh.
Chỉ trả về nội dung đề thi, không thêm lời giải thích ngoài lề.`,
                        },
                      ],
                    },
                  ],
                }),
              }
            );

            if (geminiRes.ok) {
              const geminiJson = await geminiRes.json();
              const candidateText =
                geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidateText) {
                extractedText = candidateText;
                ocrSuccess = true;
                break;
              }
            }
          } catch (ocrErr) {
            console.warn(`Lỗi OCR Gemini (${model}) từ ảnh:`, ocrErr);
          }
        }
      }

      if (!ocrSuccess) {
        // Mẫu đề thi chứa hình ảnh đã bóc tách sẵn để người dùng chỉnh sửa
        extractedText = `Câu 1: Cho bài toán như trong hình ảnh đính kèm bên dưới:\n<img src="${dataUrl}" alt="Hình câu 1" />\nA. Phương án A\nB. Phương án B\nC. Phương án C\nD. Phương án D\nĐáp án: A\nLời giải: Xem hình minh họa để đối chiếu bài giải chi tiết.`;
      }
    }
    // 3. XỬ LÝ TỆP PDF (.PDF) - HỖ TRỢ ĐỀ THI DẠNG VĂN BẢN VÀ SCAN HÌNH ẢNH
    else if (extension === "pdf") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PDFParse } = require("pdf-parse");
        const uint8 = new Uint8Array(buffer);

        // A. Trích xuất nhị phân các trang scan JPEG (đặc biệt hiệu quả cho đề thi scan của Bộ GD / Trường học)
        let pos = 0;
        const soi = Buffer.from([0xff, 0xd8, 0xff]);
        const eoi = Buffer.from([0xff, 0xd9]);
        let jpegCount = 1;

        while ((pos = buffer.indexOf(soi, pos)) !== -1) {
          const end = buffer.indexOf(eoi, pos + 3);
          if (end !== -1) {
            const imgBuf = buffer.subarray(pos, end + 2);
            // Lọc bỏ icon nhỏ (< 5KB), giữ lại các trang scan và hình vẽ toán học
            if (imgBuf.length > 5000) {
              const dataUrl = `data:image/jpeg;base64,${imgBuf.toString("base64")}`;
              extractedImages.push({
                id: `[HINH_ANH_SCAN_${jpegCount}]`,
                dataUrl,
              });
              jpegCount++;
            }
            pos = end + 2;
          } else {
            break;
          }
        }

        // B. Trích xuất lớp văn bản (text layer) từ PDF
        let textResult = "";
        try {
          const parser1 = new PDFParse(uint8);
          const pdfData = await parser1.getText();
          textResult = pdfData?.text || "";
        } catch (textErr) {
          console.warn("Lỗi khi đọc lớp văn bản PDF bằng PDFParse:", textErr);
        }

        // C. Nếu chưa tìm thấy ảnh JPEG trực tiếp, thử bóc tách qua PDFParse.getImage()
        if (extractedImages.length === 0) {
          try {
            const parser2 = new PDFParse(uint8);
            const imgData = await parser2.getImage();
            if (imgData?.pages) {
              imgData.pages.forEach(
                (p: { pageNumber: number; images?: Array<{ dataUrl?: string }> }) => {
                  if (p.images) {
                    p.images.forEach((img) => {
                      if (img.dataUrl) {
                        extractedImages.push({
                          id: `[HINH_ANH_SCAN_${extractedImages.length + 1}]`,
                          dataUrl: img.dataUrl,
                        });
                      }
                    });
                  }
                }
              );
            }
          } catch (imgErr) {
            console.warn("Lỗi bóc tách ảnh bằng parser2.getImage():", imgErr);
          }
        }

        // Chuẩn hóa văn bản trích xuất
        textResult = textResult
          .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
          .replace(/\r\n/g, "\n");

        const resolvedApiKey = (process.env.GEMINI_API_KEY || "").trim();
        let aiOcrSucceeded = false;

        // D. NẾU LÀ PDF SCAN (lớp văn bản < 300 ký tự hoặc có hình ảnh scan) VÀ CÓ GEMINI API KEY:
        // Chạy multimodal OCR nhận diện toàn diện văn bản toán và công thức KaTeX
        if (resolvedApiKey && (textResult.trim().length < 300 || extractedImages.length > 0)) {
          const ocrModels = [
            "gemini-3.5-flash",
            "gemini-3.5-flash-lite",
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
          ];

          const base64Pdf = buffer.toString("base64");

          for (const model of ocrModels) {
            try {
              const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${resolvedApiKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [
                      {
                        role: "user",
                        parts: [
                          {
                            inlineData: {
                              mimeType: "application/pdf",
                              data: base64Pdf,
                            },
                          },
                          {
                            text: `Bạn là trợ lý AI chuyên nghiệp phân tích đề thi toán THPT từ tệp PDF scan.
Hãy chuyển đổi toàn bộ câu hỏi và nội dung từ file PDF scan này sang định dạng văn bản chuẩn Azota.
YÊU CẦU:
1. Nhận diện chuẩn xác mọi câu hỏi từ bản scan (kể cả các trang scan hình ảnh).
2. Chuẩn hóa công thức toán học sang KaTeX: dùng $...$ cho công thức nội dòng và $$...$$ cho công thức khối.
3. Cấu trúc câu hỏi:
   - Trắc nghiệm 4 lựa chọn: 'Câu 1:', 'A. ...', 'B. ...', 'C. ...', 'D. ...' và dòng 'Đáp án: [A/B/C/D]', 'Lời giải: ...'.
   - Trắc nghiệm Đúng/Sai: 'Câu ...:', 'a) ...', 'b) ...', 'c) ...', 'd) ...' và dòng 'Đáp án: a-Đ, b-S, c-Đ, d-Đ', 'Lời giải: ...'.
   - Trả lời ngắn / Tự luận: 'Câu ...:' hoặc 'Bài ...:', kèm dòng 'Đáp án: ...', 'Lời giải: ...'.
4. Trả về toàn bộ câu hỏi của đề thi, không cắt bớt và không thêm lời bình luận ngoài lề.`,
                          },
                        ],
                      },
                    ],
                  }),
                }
              );

              if (geminiRes.ok) {
                const geminiJson = await geminiRes.json();
                const aiText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiText && aiText.trim().length > 100) {
                  extractedText = aiText.trim();
                  aiOcrSucceeded = true;
                  break;
                }
              }
            } catch (aiErr) {
              console.warn(`Lỗi Gemini OCR PDF (${model}):`, aiErr);
            }
          }
        }

        // E. PHƯƠNG ÁN XỬ LÝ KHI CHƯA QUA AI OCR:
        if (!aiOcrSucceeded) {
          if (textResult.trim().length > 150) {
            extractedText = textResult;
            // Nếu có các trang scan hoặc hình vẽ, chèn ảnh tương ứng vào văn bản
            if (extractedImages.length > 0 && !extractedText.includes("<img")) {
              const imageBlocks = extractedImages
                .slice(0, 4)
                .map((img, i) => `<img src="${img.dataUrl}" alt="Hình minh họa trang scan ${i + 1}" />`)
                .join("\n\n");
              extractedText = `${extractedText}\n\n// Các hình vẽ / trang scan đính kèm:\n${imageBlocks}`;
            }
          } else if (extractedImages.length > 0) {
            // PDF thuần scan hình ảnh: tự động tạo câu hỏi đính kèm các trang scan
            const pageChunks = extractedImages.map((img, idx) => {
              return `[TRANG SCAN ${idx + 1} - ĐỀ THI PDF]\nCâu ${idx + 1}: Quan sát nội dung câu hỏi và hình vẽ trong trang scan ${idx + 1} đính kèm bên dưới:\n<img src="${img.dataUrl}" alt="Đề thi scan trang ${idx + 1}" />\nA. Phương án A\nB. Phương án B\nC. Phương án C\nD. Phương án D\nĐáp án: A\nLời giải: Xem đối chiếu chi tiết trong bản scan trang ${idx + 1}.`;
            });
            extractedText = pageChunks.join("\n\n");
          } else {
            extractedText = textResult || "Không tìm thấy nội dung văn bản trong tệp PDF.";
          }
        }
      } catch (pdfErr) {
        console.error("Lỗi khi giải mã PDF:", pdfErr);
        // Fallback khẩn cấp nếu thư viện lỗi: trích xuất JPEG scan trực tiếp
        let pos = 0;
        const soi = Buffer.from([0xff, 0xd8, 0xff]);
        const eoi = Buffer.from([0xff, 0xd9]);
        const fallbackImgs: { id: string; dataUrl: string }[] = [];
        let count = 1;

        while ((pos = buffer.indexOf(soi, pos)) !== -1) {
          const end = buffer.indexOf(eoi, pos + 3);
          if (end !== -1) {
            const imgBuf = buffer.subarray(pos, end + 2);
            if (imgBuf.length > 5000) {
              fallbackImgs.push({
                id: `[HINH_ANH_SCAN_${count}]`,
                dataUrl: `data:image/jpeg;base64,${imgBuf.toString("base64")}`,
              });
              count++;
            }
            pos = end + 2;
          } else {
            break;
          }
        }

        if (fallbackImgs.length > 0) {
          fallbackImgs.forEach((img) => extractedImages.push(img));
          const pageChunks = fallbackImgs.map((img, idx) => {
            return `[TRANG SCAN ${idx + 1} - ĐỀ THI PDF]\nCâu ${idx + 1}: Quan sát đề bài trong bản scan trang ${idx + 1} bên dưới:\n<img src="${img.dataUrl}" alt="Đề thi scan trang ${idx + 1}" />\nA. Phương án A\nB. Phương án B\nC. Phương án C\nD. Phương án D\nĐáp án: A\nLời giải: Đối chiếu chi tiết với bản scan trang ${idx + 1}.`;
          });
          extractedText = pageChunks.join("\n\n");
        } else {
          return NextResponse.json(
            {
              success: false,
              message:
                "Không thể trích xuất văn bản hoặc hình ảnh từ tệp PDF này. Tệp có thể bị hỏng hoặc có mật khẩu bảo vệ.",
            },
            { status: 422 }
          );
        }
      }
    }
    // 4. XỬ LÝ TỆP VĂN BẢN (TXT, JSON, MD, CSV)
    else {
      extractedText = buffer.toString("utf-8");
    }

    // Clean up excessive empty lines
    extractedText = extractedText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!extractedText) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tệp tải lên không chứa nội dung văn bản hợp lệ hoặc không thể bóc tách được.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName,
      fileSize: file.size,
      text: extractedText,
      images: extractedImages,
      imagesCount: extractedImages.length,
    });
  } catch (err: unknown) {
    console.error("Lỗi trích xuất tệp đề thi:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error ? err.message : "Đã có lỗi xảy ra khi xử lý tệp.",
      },
      { status: 500 }
    );
  }
}
