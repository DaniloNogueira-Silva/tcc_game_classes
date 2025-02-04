import * as dotenv from 'dotenv';

import { AuthModule } from './application/auth/auth.module';
import { ClassEntity } from './infrastructure/persistence/entities/class_entity';
import { ClassModule } from './application/class/class.module';
import { ConfigModule } from '@nestjs/config';
import { LessonPlanEntity } from './infrastructure/persistence/entities/lesson_plan_entity';
import { LessonPlanModule } from './application/lesson_plan/lesson_plan.module';
import { Module } from '@nestjs/common';
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
      entities: [UserEntity, ClassEntity, LessonPlanEntity],
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
  ],
})
export class AppModule {}
