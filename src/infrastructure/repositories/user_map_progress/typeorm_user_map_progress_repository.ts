import { Injectable } from '@nestjs/common';
import { UserMapProgressRepository } from '../../../domain/repositories/user_map_progress_repository';
import { Repository } from 'typeorm';
import {
  ProgressStatus,
  UserMapProgressEntity,
} from '../../persistence/entities/user_map_progress_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapProgress } from '../../../domain/entities/user_map_progress/user_map_progress';
import { UserMapProgressMapper } from '../../persistence/mappers/user_map_progress_mapper';

@Injectable()
export class TypeOrmUserMapProgressRepository implements UserMapProgressRepository {
  private readonly repository: Repository<UserMapProgressEntity>;

  constructor(
    @InjectRepository(UserMapProgressEntity)
    repository: Repository<UserMapProgressEntity>,
  ) {
    this.repository = repository;
  }

  async save(userMapProgress: UserMapProgress): Promise<UserMapProgress | null> {
    const entity = UserMapProgressMapper.toPersistence(userMapProgress);
    const savedEntity = await this.repository.save(entity);
    return UserMapProgressMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<UserMapProgressEntity | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });
    return entity;
  }

  async update(userMapProgress: UserMapProgress): Promise<void> {
    const entity = UserMapProgressMapper.toPersistence(userMapProgress);
    if (entity) {
      entity.status = ProgressStatus.COMPLETED;
    }
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async findAll(): Promise<UserMapProgressEntity[] | null> {
    const entities = await this.repository.find({
      relations: ['student', 'lessonPlan'],
    });
    return entities;
  }
}
