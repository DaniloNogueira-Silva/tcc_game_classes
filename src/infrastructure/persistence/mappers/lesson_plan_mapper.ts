import { LessonPlan } from '../../../domain/entities/lesson_plan/lesson_plan';
import { LessonPlanEntity } from '../entities/lesson_plan_entity';
import { UserEntity } from '../entities/user_entity';

export class LessonPlanMapper {
  static toDomain(entity: LessonPlanEntity): LessonPlan {
    return new LessonPlan(
      entity.teacher.id,
      entity.name,
      entity.theme,
      entity.id,
    );
  }

  static toPersistence(domain: LessonPlan): LessonPlanEntity {
    const entity = new LessonPlanEntity();
    entity.teacher = { id: domain.toGetTeacherId() } as UserEntity;
    entity.name = domain.toGetName();
    entity.theme = domain.toGetTheme();

    return entity;
  }
}
