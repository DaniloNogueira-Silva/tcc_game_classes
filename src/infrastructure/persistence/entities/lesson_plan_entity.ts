import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user_entity';
import { ClassEntity } from './class_entity';

@Entity('lesson_plans')
export class LessonPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.lessonPlans, { eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;

  @Column()
  name: string;

  @Column()
  theme: string;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.lessonPlan, {
    cascade: true,
  })
  classes: ClassEntity[];
}
