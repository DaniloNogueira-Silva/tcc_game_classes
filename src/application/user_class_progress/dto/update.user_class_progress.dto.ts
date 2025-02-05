export interface UpdateUserClassProgressDto {
  score?: number;
  is_finish?: boolean;
  completion_date?: Date;
  user_id?: string;
  class_id?: string;
  id: string;
}
