import { AuthModule } from '../auth/auth.module';
import { EXTRA_LESSON_REPOSITORY } from '../../domain/repositories/extra_lesson_repository';
import { ExtraLessonController } from './extra_lesson.controller';
import { ExtraLessonEntity } from '../../infrastructure/persistence/entities/extra_lesson_entity';
import { ExtraLessonService } from './service/extra_lesson.service';
import { Module } from '@nestjs/common';
import { TypeOrmExtraLessonRepository } from '../../infrastructure/repositories/extra_lesson/typeorm_extra_lesson_repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExtraLessonEntity]), AuthModule],
  controllers: [ExtraLessonController],
  providers: [
    ExtraLessonService,
    {
      provide: EXTRA_LESSON_REPOSITORY,
      useClass: TypeOrmExtraLessonRepository,
    },
  ],
  exports: [ExtraLessonService],
})
export class ExtraLessonModule {}
