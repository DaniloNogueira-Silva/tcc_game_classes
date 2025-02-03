import { AuthModule } from '../auth/auth.module';
import { LESSON_PLAN_REPOSITORY } from '../../domain/repositories/lesson_plan_repository';
import { LessonPlanController } from './lesson_plan.controller';
import { LessonPlanEntity } from '../../infrastructure/persistence/entities/lesson_plan_entity';
import { LessonPlanService } from './service/lesson_plan.service';
import { Module } from '@nestjs/common';
import { TypeOrmLessonPlanRepository } from '../../infrastructure/repositories/lesson_plan/typeorm_lesson_plan_repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LessonPlanEntity]), AuthModule],
  controllers: [LessonPlanController],
  providers: [
    LessonPlanService,
    {
      provide: LESSON_PLAN_REPOSITORY,
      useClass: TypeOrmLessonPlanRepository,
    },
  ],
  exports: [LessonPlanService],
})
export class LessonPlanModule {}
