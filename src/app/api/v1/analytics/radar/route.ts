import { NextResponse } from "next/server";
import { CHAPTERS_DATA } from "@/data/chaptersData";

export async function GET() {
  try {
    const radarData = CHAPTERS_DATA.map((ch) => {
      let status = "Tốt";
      if (ch.masteryPercent < 50) status = "Cần ôn tập gấp";
      else if (ch.masteryPercent < 70) status = "Yếu";
      else if (ch.masteryPercent < 85) status = "Khá";

      return {
        chapterId: ch.id,
        chapterName: ch.shortTitle,
        fullTitle: ch.title,
        masteryPercent: ch.masteryPercent,
        status,
        weakTopics: ch.studyTopics.slice(0, 2),
      };
    });

    const weakChapters = radarData.filter((c) => c.masteryPercent < 75);

    return NextResponse.json({
      success: true,
      radarData,
      weakChapters,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi lấy dữ liệu phân tích Radar",
        error: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
