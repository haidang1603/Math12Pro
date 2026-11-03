import { PrismaClient, QuestionFormat, DifficultyLevel, MilestoneType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu nạp dữ liệu câu hỏi và chương mục cho Math12Pro...");

  // 1. Seed 6 Chapters
  const chaptersData = [
    {
      id: 1,
      number: 1,
      title: "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
      shortTitle: "Đạo hàm & Khảo sát",
      description: "Tính đơn điệu, cực trị, GTLN - GTNN, tiệm cận và khảo sát hàm số",
      iconName: "TrendingUp",
    },
    {
      id: 2,
      number: 2,
      title: "Tọa độ vectơ trong không gian",
      shortTitle: "Vectơ Oxyz",
      description: "Vectơ trong không gian, hệ tọa độ Oxyz và các phép toán tích vô hướng",
      iconName: "Compass",
    },
    {
      id: 3,
      number: 3,
      title: "Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm",
      shortTitle: "Số đặc trưng ghép nhóm",
      description: "Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn",
      iconName: "BarChart3",
    },
    {
      id: 4,
      number: 4,
      title: "Nguyên hàm, tích phân và ứng dụng",
      shortTitle: "Nguyên hàm & Tích phân",
      description: "Bảng nguyên hàm cơ bản, tích phân từng phần, tính diện tích và thể tích",
      iconName: "Layers",
    },
    {
      id: 5,
      number: 5,
      title: "Phương pháp tọa độ trong không gian",
      shortTitle: "Tọa độ không gian",
      description: "Phương trình mặt phẳng, phương trình đường thẳng và phương trình mặt cầu",
      iconName: "Box",
    },
    {
      id: 6,
      number: 6,
      title: "Xác suất có điều kiện và các quy tắc tính xác suất",
      shortTitle: "Xác suất & Bayes",
      description: "Xác suất có điều kiện, quy tắc nhân, công thức xác suất toàn phần và công thức Bayes",
      iconName: "GitFork",
    },
  ];

  for (const ch of chaptersData) {
    await prisma.chapter.upsert({
      where: { id: ch.id },
      update: ch,
      create: ch,
    });
  }
  console.log("✅ Đã nạp 6 Chương học.");

  // 2. Seed Mock Exam
  const exam = await prisma.exam.upsert({
    where: { id: "mock-exam-tot-nghiep-2025" },
    update: {},
    create: {
      id: "mock-exam-tot-nghiep-2025",
      title: "Đề thi thử Tốt nghiệp THPT 2025 - Đề chuẩn số 01",
      milestone: MilestoneType.GRADUATION_THPT,
      durationMinutes: 90,
      totalPoints: 10.0,
      isActive: true,
    },
  });
  console.log(`✅ Đã tạo đề thi: ${exam.title}`);

  // 3. Seed demo student user
  const student = await prisma.user.upsert({
    where: { email: "hocsinh@math12pro.edu.vn" },
    update: {},
    create: {
      id: "student-demo-id",
      email: "hocsinh@math12pro.edu.vn",
      fullName: "Nguyễn Văn An",
      streakDays: 7,
    },
  });
  console.log(`✅ Đã tạo học sinh mẫu: ${student.fullName}`);

  console.log("🎉 Hoàn tất nạp dữ liệu Math12Pro!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi nạp dữ liệu seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
