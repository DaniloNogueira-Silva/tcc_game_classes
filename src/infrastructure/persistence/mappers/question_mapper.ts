import { ExtraLessonEntity } from '../entities/extra_lesson_entity';
import { Question } from '../../../domain/entities/question/question';
import { QuestionsEntity } from '../entities/questions_entity';

export class QuestionMapper {
  static toDomain(entity: QuestionsEntity): Question {
    return new Question(
      entity.extra_lesson.id,
      entity.question,
      entity.answer,
      entity.id,
    );
  }

  static toPersistence(domain: Question): QuestionsEntity {
    const entity = new QuestionsEntity();
    entity.question = domain.toGetQuestion();
    entity.answer = domain.toGetAnswer();
    entity.extra_lesson = {
      id: domain.toGetExtraLessonId(),
    } as ExtraLessonEntity;
    return entity;
  }
}
