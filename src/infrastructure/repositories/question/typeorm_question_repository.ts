import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../../../domain/entities/question/question';
import { QuestionMapper } from '../../persistence/mappers/question_mapper';
import { QuestionsEntity } from '../../persistence/entities/questions_entity';
import { QuestionRepository } from '../../../domain/repositories/questions_repository';

@Injectable()
export class TypeOrmQuestionRepository implements QuestionRepository {
  private readonly repository: Repository<QuestionsEntity>;

  constructor(
    @InjectRepository(QuestionsEntity)
    repository: Repository<QuestionsEntity>,
  ) {
    this.repository = repository;
  }

  async save(question: Question): Promise<Question | null> {
    const entity = QuestionMapper.toPersistence(question);
    const savedEntity = await this.repository.save(entity);
    return QuestionMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Question | null> {
    const entity = await this.repository.findOne({ where: { id } });
    const question = entity ? QuestionMapper.toDomain(entity) : null;
    return question;
  }

  async findAll(): Promise<Question[] | null> {
    const entities = await this.repository.find();
    const questions = entities.map((entity) => QuestionMapper.toDomain(entity));
    return questions;
  }

  async update(question: Question): Promise<void> {
    const entity = QuestionMapper.toPersistence(question);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}
