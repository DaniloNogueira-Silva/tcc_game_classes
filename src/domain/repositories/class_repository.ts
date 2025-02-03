import { Class } from '../entities/class/class';

export const CLASS_REPOSITORY = Symbol('CLASS_REPOSITORY');

export interface ClassRepository {
  save(classRoom: Class): Promise<Class | null>;
  findById(id: string): Promise<Class | null>;
  update(classRoom: Class): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Class[] | null>;
}
