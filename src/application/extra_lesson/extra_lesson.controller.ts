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
import { ExtraLessonService } from './service/extra_lesson.service';
import { CreateExtraLessonDto } from './dto/create.extra_lesson.dto';
import { UpdateExtraLessonDto } from './dto/update.extra_lesson.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('extra-lesson')
export class ExtraLessonController {
  constructor(private readonly extraLessonService: ExtraLessonService) {}

  @Get('/')
  async findAll() {
    return this.extraLessonService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.extraLessonService.findById(id);
  }

  @Post('/')
  async save(@Body() extra: CreateExtraLessonDto) {
    return this.extraLessonService.save(extra);
  }

  @Patch('/:id')
  async update(
    @Body() extra: UpdateExtraLessonDto,
    @Param('id') id: string,
  ) {
    return this.extraLessonService.update({ ...extra, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.extraLessonService.delete(id);
  }
}
