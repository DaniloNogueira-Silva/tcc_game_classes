import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClassEntity } from './class_entity';
import { UserEntity } from './user_entity';

@Entity('user_progress')
export class UserClassProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.classProgress)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ClassEntity, (lesson) => lesson.classProgress)
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({ type: 'boolean', default: false })
  is_finish: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completion_date: Date;
}
