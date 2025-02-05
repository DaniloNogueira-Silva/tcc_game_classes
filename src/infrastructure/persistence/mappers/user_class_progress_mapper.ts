import { ClassEntity } from '../entities/class_entity';
import { LessonPlanEntity } from '../entities/lesson_plan_entity';
import { UserClassProgress } from '../../../domain/entities/user_class_progress/user_class_progress';
import { UserClassProgressEntity } from '../entities/user_class_progress_entity';
import { UserEntity } from '../entities/user_entity';
import { UserMapProgress } from '../../../domain/entities/user_map_progress/user_map_progress';

export class UserClassProgressMapper {
  static toDomain(entity: UserClassProgressEntity): UserClassProgress {
    return new UserClassProgress(
      entity.user.id,
      entity.class.id,
      entity.score,
      entity.is_finish,
      entity.completion_date,
      entity.id
    );
  }


  static toPersistence(domain: UserClassProgress): UserClassProgressEntity {
    const entity = new UserClassProgressEntity();
    entity.user = { id: domain.toGetUserId() } as UserEntity;
    entity.class = { id: domain.toGetClassId() } as ClassEntity;
    entity.score = domain.toGetScore();
    entity.is_finish = domain.toGetIsFinish();
    entity.completion_date = domain.toGetCompletionDate();

    return entity;
  }
}
