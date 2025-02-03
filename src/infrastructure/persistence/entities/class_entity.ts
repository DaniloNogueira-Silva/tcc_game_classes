import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { UserEntity } from './user_entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.classes, { eager: true }) // Corrigido
  @JoinColumn({ name: 'teacher_id' }) // Define explicitamente a FK no banco
  teacher: UserEntity; // Deve ser um objeto UserEntity, não string

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
