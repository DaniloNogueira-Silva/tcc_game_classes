import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user_entity';

@Entity('lesson_plans')
export class LessonPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.lessonPlans, { eager: true }) // Corrigido
  @JoinColumn({ name: 'teacher_id' }) // Define explicitamente a FK no banco
  teacher: UserEntity; // Deve ser um objeto UserEntity, não string

  @Column()
  name: string;

  @Column()
  theme: string;
}
