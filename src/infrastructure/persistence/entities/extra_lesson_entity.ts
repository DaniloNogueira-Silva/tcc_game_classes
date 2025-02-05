import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClassEntity } from './class_entity';
import { QuestionsEntity } from './questions_entity';

@Entity('extra_lesson')
export class ExtraLessonEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  additional_text: string;

  @OneToMany(() => QuestionsEntity, (classEntity) => classEntity.extra_lesson)
  questions: QuestionsEntity[];

  @ManyToOne(() => ClassEntity, (class_entity) => class_entity.extraLessons, {
    eager: false,
  })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;
}
