import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LessonPlanService } from './service/lesson_plan.service';
import { CreateLessonPlanDto } from './dto/create.lesson_plan.dto';
import { UpdateLessonPlanDto } from './dto/update.lesson_plan.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('lessonPlan')
export class LessonPlanController {
  constructor(private readonly lessonPlanService: LessonPlanService) {}

  @Get('/')
  async findAll() {
    return this.lessonPlanService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.lessonPlanService.findById(id);
  }

  @Post('/')
  async save(@Body() lessonPlan: CreateLessonPlanDto) {
    return this.lessonPlanService.save(lessonPlan);
  }

  @Patch('/:id')
  async update(
    @Body() lessonPlan: UpdateLessonPlanDto,
    @Param('id') id: string,
  ) {
    return this.lessonPlanService.update({ ...lessonPlan, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.lessonPlanService.delete(id);
  }
}
