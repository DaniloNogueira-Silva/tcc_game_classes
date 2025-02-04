import { Class } from '../../../domain/entities/class/class';
import { ClassEntity } from '../entities/class_entity';
import { LessonPlanEntity } from '../entities/lesson_plan_entity';
import { UserEntity } from '../entities/user_entity';

export class ClassMapper {
  static toDomain(entity: ClassEntity): Class {
    return new Class(
      entity.teacher.id,
      entity.lessonPlan.id,
      entity.name,
      entity.due_date,
      entity.url,
      entity.points,
      entity.type,
      entity.extra_lesson_id,
      entity.id,
    );
  }

  static toPersistence(domain: Class): ClassEntity {
    const entity = new ClassEntity();
    entity.teacher = { id: domain.toGetTeacherId() } as UserEntity;
    entity.lessonPlan = { id: domain.toGetLessonPlanId() } as LessonPlanEntity;
    entity.name = domain.toGetName();
    entity.due_date = domain.toGetDueDate();
    entity.url = domain.toGetUrl();
    entity.points = domain.toGetPoints();
    entity.type = domain.toGetType();
    entity.extra_lesson_id = domain.toGetExtraLessonId();

    return entity;
  }
}
