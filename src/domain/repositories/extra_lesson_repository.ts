import { ExtraLesson } from "../entities/extra_lesson/extra_lesson";
import { ExtraLessonEntity } from "../../infrastructure/persistence/entities/extra_lesson_entity";

export const EXTRA_LESSON_REPOSITORY = Symbol('EXTRA_LESSON_REPOSITORY');

export interface ExtraLessonRepository {
    save(extraLesson: ExtraLesson): Promise<ExtraLesson | null>;
    findById(id: string): Promise<ExtraLessonEntity | null>;
    update(extraLesson: ExtraLesson): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<ExtraLessonEntity[] | null>;
}