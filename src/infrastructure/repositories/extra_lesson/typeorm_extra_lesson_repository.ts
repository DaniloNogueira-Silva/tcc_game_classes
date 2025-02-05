import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExtraLessonRepository } from '../../../domain/repositories/extra_lesson_repository';
import { ExtraLessonEntity } from '../../persistence/entities/extra_lesson_entity';
import { ExtraLesson } from '../../../domain/entities/extra_lesson/extra_lesson';
import { ExtraLessonMapper } from '../../persistence/mappers/extra_lesson_mapper';

@Injectable()
export class TypeOrmExtraLessonRepository implements ExtraLessonRepository {
  private readonly repository: Repository<ExtraLessonEntity>;

  constructor(
    @InjectRepository(ExtraLessonEntity)
    repository: Repository<ExtraLessonEntity>,
  ) {
    this.repository = repository;
  }

  async save(extralesson: ExtraLesson): Promise<ExtraLesson | null> {
    const entity = ExtraLessonMapper.toPersistence(extralesson);
    const savedEntity = await this.repository.save(entity);
    return ExtraLessonMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<ExtraLessonEntity | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['questions'],
    });

    return entity;
  }

  async findAll(): Promise<ExtraLessonEntity[] | null> {
    const entities = await this.repository.find({ relations: ['questions']});
    return entities;
  }

  async update(extralesson: ExtraLesson): Promise<void> {
    const entity = ExtraLessonMapper.toPersistence(extralesson);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}
