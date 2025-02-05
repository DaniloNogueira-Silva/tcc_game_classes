import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/')
  async findAll() {
    return this.questionService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.questionService.findById(id);
  }

  @Post('/')
  async save(@Body() question: CreateQuestionDto) {
    return this.questionService.save(question);
  }

  @Patch('/:id')


  async update(@Body() question: UpdateQuestionDto, @Param('id') id: string) {
    return this.questionService.update({ ...question, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
