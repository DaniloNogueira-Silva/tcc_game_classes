import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/user/typeorm_user_repository';
import { USER_REPOSITORY } from '../../domain/repositories/user_repository';
import { UserController } from './user.controller';
import { UserEntity } from '../../infrastructure/persistence/entities/user_entity';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
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
