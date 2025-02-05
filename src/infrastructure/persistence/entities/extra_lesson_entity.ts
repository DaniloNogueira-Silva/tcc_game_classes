import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
