import { ClassEntity } from '../entities/class_entity';
import { ExtraLesson } from '../../../domain/entities/extra_lesson/extra_lesson';
import { ExtraLessonEntity } from '../entities/extra_lesson_entity';

export class ExtraLessonMapper {
  static toDomain(entity: ExtraLessonEntity): ExtraLesson {
    return new ExtraLesson(entity.class.id, entity.link, entity.additional_text, entity.id);
  }

  static toPersistence(domain: ExtraLesson): ExtraLessonEntity {
    const entity = new ExtraLessonEntity();
    entity.link = domain.toGetLink();
    entity.additional_text = domain.toGetAdditionalText();
    entity.class = { id: domain.toGetClassId() } as ClassEntity;
  
    return entity;
  }
}
