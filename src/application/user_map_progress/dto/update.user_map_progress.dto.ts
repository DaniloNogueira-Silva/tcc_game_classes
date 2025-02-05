import { ProgressStatus } from '../../../infrastructure/persistence/entities/user_map_progress_entity';

export interface UpdateUserMapProgressDto {
  score?: number;
  status?: ProgressStatus;
  student_id?: string;
  lesson_plan_id?: string;
  id: string;
}
