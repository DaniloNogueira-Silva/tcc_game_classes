import { Inject, Injectable } from '@nestjs/common';
import {
  QuestionRepository,
  QUESTIONS_REPOSITORY,
} from '../../../domain/repositories/questions_repository';
import { CreateQuestionDto } from '../dto/create.question.dto';
import { Question } from '../../../domain/entities/question/question';
import { UpdateQuestionDto } from '../dto/update.question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    private readonly classRepository: QuestionRepository,
  ) {}

  async save(dto: CreateQuestionDto): Promise<Question | null> {
    const question = new Question(
      dto.extra_lesson_id,
      dto.question,
      dto.answer,
    );
    return this.classRepository.save(question);
  }

  async findAll(): Promise<Question[] | null> {
    return this.classRepository.findAll();
  }

  async findById(id: string): Promise<Question | null> {
    return this.classRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.classRepository.delete(id);
  }

  async update(dto: UpdateQuestionDto): Promise<void> {
    const question = new Question(
      dto.extra_lesson_id,
      dto.question,
      dto.answer,
      dto.id,
    );
    await this.classRepository.update(question);
  }
}
