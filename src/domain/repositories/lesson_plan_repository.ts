import { LessonPlan } from '../entities/lesson_plan/lesson_plan';
import { LessonPlanEntity } from '../../infrastructure/persistence/entities/lesson_plan_entity';

export const LESSON_PLAN_REPOSITORY = Symbol('LESSON_PLAN_REPOSITORY');

export interface LessonPlanRepository {
  save(lessonPlan: LessonPlan): Promise<LessonPlan | null>;
  findById(id: string): Promise<LessonPlanEntity | null>;
  update(lessonPlan: LessonPlan): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<LessonPlanEntity[] | null>;
}
