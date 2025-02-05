import { UserMapProgress } from '../entities/user_map_progress/user_map_progress';
import { UserMapProgressEntity } from '../../infrastructure/persistence/entities/user_map_progress_entity';

export const USER_MAP_PROGRESS_REPOSITORY = Symbol(
  'USER_MAP_PROGRESS_REPOSITORY',
);

export interface UserMapProgressRepository {
  save(userMapProgress: UserMapProgress): Promise<UserMapProgress | null>;
  findById(id: string): Promise<UserMapProgressEntity | null>;
  update(userMapProgress: UserMapProgress): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserMapProgressEntity[] | null>;
}
