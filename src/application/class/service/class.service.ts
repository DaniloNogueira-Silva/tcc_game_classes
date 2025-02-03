import { Inject, Injectable } from '@nestjs/common';
import {
  CLASS_REPOSITORY,
  ClassRepository,
} from '../../../domain/repositories/class_repository';
import { CreateClassDto } from '../dto/create.class.dto';
import { Class } from '../../../domain/entities/class/class';
import { UpdateClassDto } from '../dto/update.class.dto';

@Injectable()
export class ClassService {
  constructor(
    @Inject(CLASS_REPOSITORY)
    private readonly classRepository: ClassRepository,
  ) {}

  async save(dto: CreateClassDto): Promise<Class | null> {
    const date = new Date(dto.due_date);
    const classRoom = new Class(
      dto.teacher_id,
      dto.name,
      date,
      dto.url,
      dto.points,
      dto.type,
      dto?.extra_lesson_id,
    );
    return this.classRepository.save(classRoom);
  }

  async findAll(): Promise<Class[] | null> {
    return this.classRepository.findAll();
  }

  async findById(id: string): Promise<Class | null> {
    return this.classRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.classRepository.delete(id);
  }

  async update(dto: UpdateClassDto): Promise<void> {
    const classRoom = new Class(
      dto.teacher_id,
      dto.name,
      dto.due_date,
      dto.url,
      dto.points,
      dto.type,
      dto.extra_lesson_id,
      dto.id
    );
    await this.classRepository.update(classRoom);
  }
}
