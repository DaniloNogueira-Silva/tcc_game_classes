import { Inject, Injectable } from '@nestjs/common';
import {
  LESSON_PLAN_REPOSITORY,
  LessonPlanRepository,
} from '../../../domain/repositories/lesson_plan_repository';
import { CreateLessonPlanDto } from '../dto/create.lesson_plan.dto';
import { LessonPlan } from '../../../domain/entities/lesson_plan/lesson_plan';
import { UpdateLessonPlanDto } from '../dto/update.lesson_plan.dto';
import { LessonPlanEntity } from '../../../infrastructure/persistence/entities/lesson_plan_entity';
import { IDecorator } from '../../auth/decorator.interface';

@Injectable()
export class LessonPlanService {
  constructor(
    @Inject(LESSON_PLAN_REPOSITORY)
    private readonly lessonPlanRepository: LessonPlanRepository,
  ) {}

  async save(dto: CreateLessonPlanDto): Promise<LessonPlan | null> {
    const lessonPLan = new LessonPlan(dto.teacher_id, dto.name, dto.theme);
    return this.lessonPlanRepository.save(lessonPLan);
  }

  async findAll(user: IDecorator): Promise<LessonPlanEntity[] | null> {
    return this.lessonPlanRepository.findAll(user.id);
  }

  async findById(id: string): Promise<LessonPlanEntity | null> {
    return this.lessonPlanRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.lessonPlanRepository.delete(id);
  }

  async update(dto: UpdateLessonPlanDto): Promise<void> {
    const found = await this.lessonPlanRepository.findById(dto.id);

    if (!found) {
      throw new Error('Plano de aula não encontrado');
    }

    const lessonPLan = new LessonPlan(
      dto.id,
      dto.name ?? found.name,
      found.teacher.id,
      dto.theme ?? found.theme,
    );
    await this.lessonPlanRepository.update(lessonPLan);
  }
}
