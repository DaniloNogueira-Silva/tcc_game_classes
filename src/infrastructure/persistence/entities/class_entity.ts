import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user_entity';
import { LessonPlanEntity } from './lesson_plan_entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.classes, { eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;

  @ManyToOne(() => LessonPlanEntity, (lessonPlan) => lessonPlan.classes, {
    nullable: false,
  })
  @JoinColumn({ name: 'lesson_plan_id' })
  lessonPlan: LessonPlanEntity;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  due_date: Date;

  @Column()
  url: string;

  @Column()
  points: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  extra_lesson_id: string;
}
