import { AuthModule } from './application/auth/auth.module';
import { ClassEntity } from './infrastructure/persistence/entities/class_entity';
import { ClassModule } from './application/class/class.module';
import { LessonPlanEntity } from './infrastructure/persistence/entities/lesson_plan_entity';
import { LessonPlanModule } from './application/lesson_plan/lesson_plan.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user_entity';
import { UserModule } from './application/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'neondb',
      host: 'ep-late-truth-a4mt8vu9-pooler.us-east-1.aws.neon.tech',
      username: 'neondb_owner',
      password: 'npg_iOmurBf3UyL0',
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
