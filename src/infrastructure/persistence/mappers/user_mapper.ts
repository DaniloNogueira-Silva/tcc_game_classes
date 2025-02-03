import { User } from '../../../domain/entities/user/user';
import { UserEntity } from '../entities/user_entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.name,
      entity.email,
      entity.password,
      entity.is_teacher,
      entity.id,
    );
  }

  static toPersistence(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.name = domain.toGetName();
    entity.email = domain.toGetEmail();
    entity.password = domain.toGetPassword();
    entity.is_teacher = domain.toGetIsTeacher();
    return entity;
  }
}
