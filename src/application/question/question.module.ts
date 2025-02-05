import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { QUESTIONS_REPOSITORY } from '../../domain/repositories/questions_repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './service/question.service';
import { QuestionsEntity } from '../../infrastructure/persistence/entities/questions_entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmQuestionRepository } from '../../infrastructure/repositories/question/typeorm_question_repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity]), AuthModule],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: QUESTIONS_REPOSITORY,
      useClass: TypeOrmQuestionRepository,
    },
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
