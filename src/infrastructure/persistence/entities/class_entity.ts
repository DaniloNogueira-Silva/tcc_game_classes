import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user_entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.classes, { eager: true })
  @JoinColumn({ name: 'teacher_id' }) 
  teacher: UserEntity;

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
