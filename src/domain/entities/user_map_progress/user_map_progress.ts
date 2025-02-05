import { ProgressStatus } from '../../../infrastructure/persistence/entities/user_map_progress_entity';

export class UserMapProgress {
  private id: string;
  private readonly student_id: string;
  private readonly lesson_plan_id: string;
  private readonly score: number;
  private readonly status: ProgressStatus;

  constructor(
    student_id: string,
    lesson_plan_id: string,
    score: number,
    status: ProgressStatus,
    id?: string,
  ) {
    this.validateFields(student_id, lesson_plan_id, score, status);
    this.student_id = student_id;
    this.lesson_plan_id = lesson_plan_id;
    this.score = score;
    this.status = status;

    if (id) {
      this.id = id;
    }
  }

  validateFields(
    student_id: string,
    lesson_plan_id: string,
    score: number,
    status: ProgressStatus,
  ): void {
    if (!student_id || !lesson_plan_id || !score || !status) {
      throw new Error(
        'Todos os campos são obrigatórios para o progresso do estudante',
      );
    }

    if (score < 0) {
      throw new Error('Pontuação não pode ser negativa');
    }
  }

  toGetId(): string {
    return this.id;
  }

  toGetScore(): number {
    return this.score;
  }

  toGetStudentId(): string {
    return this.student_id;
  }

  toGetLessonPlanId(): string {
    return this.lesson_plan_id;
  }

  toGetStatus(): ProgressStatus {
    return this.status;
  }

  saveId(id: string) {
    this.id = id;
  }
}
