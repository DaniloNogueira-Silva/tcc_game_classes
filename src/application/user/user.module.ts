import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user_repository';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/user/typeorm_user_repository';
import { User } from '../../domain/entities/user/user';
import { UserController } from './user.controller';
import { UserEntity } from '../../infrastructure/persistence/entities/user_entity';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
