import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { SubmitExamDto, ExamAttemptResponseDto } from "../dto/exam.dto";
import { ExamGradingService } from "../services/exam-grading.service";
import { PrismaService } from "../prisma/prisma.service";

@Controller("api/v1/exams")
export class ExamController {
  constructor(
    private readonly gradingService: ExamGradingService,
    private readonly prisma: PrismaService
  ) {}

  /**
   * Submit exam answers, compute scores, record mistakes, and return Radar analysis
   * POST /api/v1/exams/submit
   */
  @Post("submit")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async submitExam(
    @Body() submitDto: SubmitExamDto,
    @Req() req: any
  ): Promise<ExamAttemptResponseDto> {
    const userId = req?.user?.id || "student-demo-id";
    return this.gradingService.submitExamService(userId, submitDto, this.prisma);
  }
}
