import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ExtraLessonEntity } from './extra_lesson_entity';

@Entity('questions')
export class QuestionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => ExtraLessonEntity,
    (extra_lesson) => extra_lesson.questions,
    { eager: true },
  )
  @JoinColumn({ name: 'extra_lesson_id' })
  extra_lesson: ExtraLessonEntity;

  @Column()
  question: string;

  @Column()
  answer: string;
}
