import { Inject, Injectable } from '@nestjs/common';
import { CLASS_REPOSITORY } from '../../../domain/repositories/class_repository';
import { CreateExtraLessonDto } from '../dto/create.extra_lesson.dto';
import { UpdateExtraLessonDto } from '../dto/update.extra_lesson.dto';
import { EXTRA_LESSON_REPOSITORY, ExtraLessonRepository } from '../../../domain/repositories/extra_lesson_repository';
import { ExtraLesson } from '../../../domain/entities/extra_lesson/extra_lesson';
import { ExtraLessonEntity } from '../../../infrastructure/persistence/entities/extra_lesson_entity';

@Injectable()
export class ExtraLessonService {
  constructor(
    @Inject(EXTRA_LESSON_REPOSITORY)
    private readonly extraLessonRepository: ExtraLessonRepository,
  ) {}

  async save(dto: CreateExtraLessonDto): Promise<ExtraLesson | null> {
    const extraLesson = new ExtraLesson(dto.class_id, dto.link, dto.additional_text);
    return this.extraLessonRepository.save(extraLesson);
  }

  async findAll(): Promise<ExtraLessonEntity[] | null> {
    return this.extraLessonRepository.findAll();
  }

  async findById(id: string): Promise<ExtraLessonEntity | null> {
    return this.extraLessonRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.extraLessonRepository.delete(id);
  }

  async update(dto: UpdateExtraLessonDto): Promise<void> {
    const extraLesson = new ExtraLesson(dto.class_id, dto.link, dto.additional_text, dto.id);
    await this.extraLessonRepository.update(extraLesson);
  }
}
