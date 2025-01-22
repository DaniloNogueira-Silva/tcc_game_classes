import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user/user';
import { UserEntity } from '../../persistence/entities/user_entity';
import { UserMapper } from '../../persistence/mappers/user_mapper';
import { UserRepository } from '../../../domain/repositories/user_repository';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    this.repository = repository;
  }

  async save(user: User): Promise<User | null> {
    const entity = UserMapper.toPersistence(user);
    const savedEntity = await this.repository.save(entity);
    return UserMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    const user = entity ? UserMapper.toDomain(entity) : null;
    return user;
  }

  async findAll(): Promise<User[] | null> {
    const entities = await this.repository.find();
    const users = entities.map((entity) => UserMapper.toDomain(entity));
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    const user = entity ? UserMapper.toDomain(entity) : null;
    return user;
  }

  async update(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}
