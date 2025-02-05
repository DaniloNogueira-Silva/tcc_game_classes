import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserClassProgressRepository } from '../../infrastructure/repositories/user_class_progress/typeorm_user_class_progress_repository';
import { USER_CLASS_PROGRESS_REPOSITORY } from '../../domain/repositories/user_class_progress_repository';
import { UserClassProgressController } from './user_class_progress.controller';
import { UserClassProgressEntity } from '../../infrastructure/persistence/entities/user_class_progress_entity';
import { UserClassProgressService } from './service/user_class_progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserClassProgressEntity]), AuthModule],
  controllers: [UserClassProgressController],
  providers: [
    UserClassProgressService,
    {
      provide: USER_CLASS_PROGRESS_REPOSITORY,
      useClass: TypeOrmUserClassProgressRepository,
    },
  ],
  exports: [UserClassProgressService],
})
export class UserClassProgressModule {}
