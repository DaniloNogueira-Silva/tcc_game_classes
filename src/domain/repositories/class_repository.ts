import { Class } from '../entities/class/class';
import { ClassEntity } from '../../infrastructure/persistence/entities/class_entity';

export const CLASS_REPOSITORY = Symbol('CLASS_REPOSITORY');

export interface ClassRepository {
  save(classRoom: Class): Promise<Class | null>;
  findById(id: string): Promise<ClassEntity | null>;
  update(classRoom: Class): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ClassEntity[] | null>;
}
