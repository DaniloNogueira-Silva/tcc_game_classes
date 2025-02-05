import { UserMapProgress } from '../../../domain/entities/user_map_progress/user_map_progress';
import { UserMapProgressEntity } from '../entities/user_map_progress_entity';
import { LessonPlanEntity } from '../entities/lesson_plan_entity';
import { UserEntity } from '../entities/user_entity';

export class UserMapProgressMapper {
  static toDomain(entity: UserMapProgressEntity): UserMapProgress {
    return new UserMapProgress(
      entity.student.id,
      entity.lessonPlan.id,
      entity.score,
      entity.status,
      entity.id,
    );
  }

  static toPersistence(domain: UserMapProgress): UserMapProgressEntity {
    const entity = new UserMapProgressEntity();
    entity.student = { id: domain.toGetStudentId() } as UserEntity;
    entity.lessonPlan = { id: domain.toGetLessonPlanId() } as LessonPlanEntity;
    entity.score = domain.toGetScore();
    entity.status = domain.toGetStatus();

    return entity;
  }
}
