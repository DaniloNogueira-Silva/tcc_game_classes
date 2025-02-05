import { User } from '../entities/user/user';
import { UserEntity } from '../../infrastructure/persistence/entities/user_entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  save(user: User): Promise<User | null>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserEntity[] | null>;
}
