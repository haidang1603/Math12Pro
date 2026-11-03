import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import {
  GetPracticeQuestionsDto,
  CheckSingleQuestionDto,
  CheckSingleQuestionResponseDto,
} from "../dto/practice.dto";
import { PracticeService } from "../services/practice.service";
import { PrismaService } from "../prisma/prisma.service";

@Controller("api/v1/practice")
export class PracticeController {
  constructor(
    private readonly practiceService: PracticeService,
    private readonly prisma: PrismaService
  ) {}

  /**
   * 1. On-Demand Practice: Get filtered questions for a chapter
   * GET /api/v1/practice/questions?chapterId=1&difficulty=THONG_HIEU&format=SINGLE_CHOICE
   */
  @Get("questions")
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getPracticeQuestions(@Query() query: GetPracticeQuestionsDto) {
    return this.practiceService.getPracticeQuestions(query, this.prisma);
  }

  /**
   * 2. Study Mode: Check single question instantly with step-by-step LaTeX solution
   * and update student's ChapterMastery
   * POST /api/v1/practice/check-single
   */
  @Post("check-single")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async checkSingleQuestion(
    @Body() dto: CheckSingleQuestionDto,
    @Req() req: any
  ): Promise<CheckSingleQuestionResponseDto> {
    const userId = req?.user?.id || "student-demo-id";
    return this.practiceService.checkSingleQuestion(userId, dto, this.prisma);
  }
}
