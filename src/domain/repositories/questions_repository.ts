import { Question } from "../entities/question/question";

export const QUESTIONS_REPOSITORY = Symbol('QUESTIONS_REPOSITORY');

export interface QuestionRepository {
    save(question: Question): Promise<Question | null>;
    findById(id: string): Promise<Question | null>;
    update(question: Question): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Question[] | null>;
}