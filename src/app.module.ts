import * as dotenv from 'dotenv';

import { AuthModule } from './application/auth/auth.module';
import { ClassEntity } from './infrastructure/persistence/entities/class_entity';
import { ClassModule } from './application/class/class.module';
import { ConfigModule } from '@nestjs/config';
import { ExtraLessonEntity } from './infrastructure/persistence/entities/extra_lesson_entity';
import { ExtraLessonModule } from './application/extra_lesson/extra_lesson.module';
import { LessonPlanEntity } from './infrastructure/persistence/entities/lesson_plan_entity';
import { LessonPlanModule } from './application/lesson_plan/lesson_plan.module';
import { Module } from '@nestjs/common';
import { QuestionModule } from './application/question/question.module';
import { QuestionsEntity } from './infrastructure/persistence/entities/questions_entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user_entity';
import { UserModule } from './application/user/user.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 5432,
      entities: [UserEntity, ClassEntity, LessonPlanEntity, ExtraLessonEntity, QuestionsEntity],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ClassModule,
    LessonPlanModule,
    ExtraLessonModule,
    QuestionModule,
  ],
})
export class AppModule {}
