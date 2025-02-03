import { LessonPlan } from '../entities/lesson_plan/lesson_plan';

export const LESSON_PLAN_REPOSITORY = Symbol('LESSON_PLAN_REPOSITORY');

export interface LessonPlanRepository {
  save(lessonPlan: LessonPlan): Promise<LessonPlan | null>;
  findById(id: string): Promise<LessonPlan | null>;
  update(lessonPlan: LessonPlan): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<LessonPlan[] | null>;
}
