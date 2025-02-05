import { AuthModule } from '../auth/auth.module';
import { USER_MAP_PROGRESS_REPOSITORY } from '../../domain/repositories/user_map_progress_repository';
import { UserMapProgressController } from './user_map_progress.controller';
import { UserMapProgressEntity } from '../../infrastructure/persistence/entities/user_map_progress_entity';
import { UserMapProgressService } from './service/user_map_progress.service';
import { Module } from '@nestjs/common';
import { TypeOrmUserMapProgressRepository } from '../../infrastructure/repositories/user_map_progress/typeorm_user_map_progress_repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserMapProgressEntity]), AuthModule],
  controllers: [UserMapProgressController],
  providers: [
    UserMapProgressService,
    {
      provide: USER_MAP_PROGRESS_REPOSITORY,
      useClass: TypeOrmUserMapProgressRepository,
    },
  ],
  exports: [UserMapProgressService],
})
export class UserMapProgressModule {}
