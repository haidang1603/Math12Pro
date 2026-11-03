import { NextRequest, NextResponse } from "next/server";
import { STUDY_QUESTIONS } from "@/data/chaptersData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const format = searchParams.get("format");
    const limit = searchParams.get("limit");

    let filtered = [...STUDY_QUESTIONS];

    if (chapterId && chapterId !== "ALL") {
      const cId = parseInt(chapterId, 10);
      filtered = filtered.filter((q) => q.chapterId === cId);
    }

    if (topic && topic !== "ALL") {
      filtered = filtered.filter((q) => q.topic.toLowerCase() === topic.toLowerCase());
    }

    if (difficulty && difficulty !== "ALL") {
      filtered = filtered.filter((q) => q.difficulty === difficulty);
    }

    if (format && format !== "ALL") {
      filtered = filtered.filter((q) => q.format === format);
    }

    if (limit) {
      const l = parseInt(limit, 10);
      if (!isNaN(l) && l > 0) {
        filtered = filtered.slice(0, l);
      }
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      data: filtered,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi lấy danh sách câu hỏi ôn luyện",
        error: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
