import { Injectable } from '@nestjs/common';
import { UserClassProgressRepository } from '../../../domain/repositories/user_class_progress_repository';
import { Repository } from 'typeorm';
import { UserClassProgressEntity } from '../../persistence/entities/user_class_progress_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserClassProgress } from '../../../domain/entities/user_class_progress/user_class_progress';
import { UserClassProgressMapper } from '../../persistence/mappers/user_class_progress_mapper';

@Injectable()
export class TypeOrmUserClassProgressRepository
  implements UserClassProgressRepository
{
  private readonly repository: Repository<UserClassProgressEntity>;

  constructor(
    @InjectRepository(UserClassProgressEntity)
    repository: Repository<UserClassProgressEntity>,
  ) {
    this.repository = repository;
  }

  async save(
    userClassProgress: UserClassProgress,
  ): Promise<UserClassProgress | null> {
    const entity = UserClassProgressMapper.toPersistence(userClassProgress);
    const savedEntity = await this.repository.save(entity);
    return UserClassProgressMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<UserClassProgressEntity | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'class'],
    });
    return entity;
  }

  async update(userClassProgress: UserClassProgress): Promise<void> {
    const entity = UserClassProgressMapper.toPersistence(userClassProgress);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async findAll(): Promise<UserClassProgressEntity[] | null> {
    const entities = await this.repository.find({
      relations: ['user', 'class'],
    });
    return entities;
  }
}
