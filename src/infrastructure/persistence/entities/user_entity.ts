import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ClassEntity } from './class_entity';
import { LessonPlanEntity } from './lesson_plan_entity';
import { UserClassProgressEntity } from './user_class_progress_entity';
import { UserMapProgressEntity } from './user_map_progress_entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  is_teacher!: boolean;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.teacher)
  classes: ClassEntity[];

  @OneToMany(
    () => LessonPlanEntity,
    (lessonPlanEntity) => lessonPlanEntity.teacher,
  )
  lessonPlans: LessonPlanEntity[];

  @OneToMany(
    () => UserMapProgressEntity,
    (UserMapProgressEntity) => UserMapProgressEntity.student,
  )
  progress: UserMapProgressEntity[];

  @OneToMany(
    () => UserClassProgressEntity,
    (UserClassProgressEntity) => UserClassProgressEntity.user,
  )
  classProgress: UserClassProgressEntity[];
}
