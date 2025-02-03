import { Injectable } from '@nestjs/common';
import { ClassRepository } from '../../../domain/repositories/class_repository';
import { Repository } from 'typeorm';
import { ClassEntity } from '../../persistence/entities/class_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../../../domain/entities/class/class';
import { ClassMapper } from '../../persistence/mappers/class_mapper';

@Injectable()
export class TypeOrmClassRepository implements ClassRepository {
  private readonly repository: Repository<ClassEntity>;

  constructor(
    @InjectRepository(ClassEntity) repository: Repository<ClassEntity>,
  ) {
    this.repository = repository;
  }

  async save(classRoom: Class): Promise<Class | null> {
    const entity = ClassMapper.toPersistence(classRoom);
    const savedEntity = await this.repository.save(entity);
    return ClassMapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Class | null> {
    const entity = await this.repository.findOne({ where: { id } });
    const classRoom = entity ? ClassMapper.toDomain(entity) : null;
    return classRoom;
  }

  async update(classRoom: Class): Promise<void> {
    const entity = ClassMapper.toPersistence(classRoom);
    await this.repository.update(entity.id, entity);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async findAll(): Promise<Class[] | null> {
    const entities = await this.repository.find();
    const classRooms = entities.map((entity) => ClassMapper.toDomain(entity));
    return classRooms;
  }
}
