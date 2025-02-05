import { UserClassProgress } from '../entities/user_class_progress/user_class_progress';
import { UserClassProgressEntity } from '../../infrastructure/persistence/entities/user_class_progress_entity';

export const USER_CLASS_PROGRESS_REPOSITORY = Symbol(
  'USER_CLASS_PROGRESS_REPOSITORY',
);

export interface UserClassProgressRepository {
  save(UserClassProgress: UserClassProgress): Promise<UserClassProgress | null>;
  findById(id: string): Promise<UserClassProgressEntity | null>;
  update(UserClassProgress: UserClassProgress): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserClassProgressEntity[] | null>;
}
