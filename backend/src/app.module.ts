import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { PracticeController } from "./controllers/practice.controller";
import { ExamController } from "./controllers/exam.controller";
import { PracticeService } from "./services/practice.service";
import { ExamService } from "./services/exam.service";
import { ExamScoringService } from "./services/exam-scoring.service";
import { ExamGradingService } from "./services/exam-grading.service";
import { MasteryGateService } from "./services/mastery-gate.service";

@Module({
  imports: [PrismaModule],
  controllers: [PracticeController, ExamController],
  providers: [
    PracticeService,
    ExamService,
    ExamScoringService,
    ExamGradingService,
    MasteryGateService,
  ],
})
export class AppModule {}
