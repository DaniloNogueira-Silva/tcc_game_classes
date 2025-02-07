import { Injectable } from '@nestjs/common';
import { LessonPlanRepository } from '../../../domain/repositories/lesson_plan_repository';
import { Repository } from 'typeorm';
import { LessonPlanEntity } from '../../persistence/entities/lesson_plan_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonPlan } from '../../../domain/entities/lesson_plan/lesson_plan';
import { LessonPlanMapper } from '../../persistence/mappers/lesson_plan_mapper';

@Injectable()
export class TypeOrmLessonPlanRepository implements LessonPlanRepository {
  private readonly repository: Repository<LessonPlanEntity>;

  constructor(
    @InjectRepository(LessonPlanEntity)
    repository: Repository<LessonPlanEntity>,
  ) {
    this.repository = repository;
  }

  async save(lessonPlans: LessonPlan): Promise<LessonPlan | null> {
    const entity = LessonPlanMapper.toPersistence(lessonPlans);
    const savedEntity = await this.repository.save(entity);
    return LessonPlanMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<LessonPlanEntity | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['classes'],
    });
    return entity;
  }

  async update(lessonPlans: LessonPlan): Promise<void> {
    const entity = LessonPlanMapper.toPersistence(lessonPlans);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async findAll(userId: string): Promise<LessonPlanEntity[] | null> {
    const entities = await this.repository.find({
      relations: ['classes'],
      where: { teacher: { id: userId } },
    });
    return entities;
  }
}
