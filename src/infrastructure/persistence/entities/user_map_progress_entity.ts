import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user_entity';
import { LessonPlanEntity } from './lesson_plan_entity';

export enum ProgressStatus {
  INCOMPLETE = 'INCOMPLETO',
  IN_PROGRESS = 'FAZENDO',
  COMPLETED = 'CONCLUÍDO',
}

@Entity('user_progress')
export class UserMapProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.progress)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @ManyToOne(() => LessonPlanEntity, (lesson) => lesson.id)
  @JoinColumn({ name: 'lesson_plan_id' })
  lessonPlan: LessonPlanEntity;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.INCOMPLETE,
  })
  status: ProgressStatus;
}
