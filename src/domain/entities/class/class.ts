export class Class {
  private id: string;
  private readonly teacher_id: string;
  private readonly lesson_plan_id: string;
  private readonly name: string;
  private readonly due_date: Date;
  private readonly url: string;
  private readonly points: number;
  private readonly type: string;

  constructor(
    teacher_id: string,
    lesson_plan_id: string,
    name: string,
    due_date: Date,
    url: string,
    points: number,
    type: string,
    id?: string,
  ) {
    this.validateFields(
      teacher_id,
      lesson_plan_id,
      name,
      due_date,
      url,
      points,
      type,
    );
    this.teacher_id = teacher_id;
    this.lesson_plan_id = lesson_plan_id;
    this.name = name;
    this.due_date = due_date;
    this.url = url;
    this.points = points;
    this.type = type;

    if (id) {
      this.id = id;
    }
  }

  validateFields(
    teacher_id: string,
    lesson_plan_id: string,
    name: string,
    due_date: Date,
    url: string,
    points: number,
    type: string,
  ): void {
    if (
      !teacher_id ||
      !lesson_plan_id ||
      !name ||
      !due_date ||
      !url ||
      !points ||
      !type
    ) {
      throw new Error('Todos os campos são obrigatórios para criar um aula');
    }

    if (points < 0) {
      throw new Error('Pontuação não pode ser negativa');
    }
  }

  toGetId(): string {
    return this.id;
  }

  toGetName(): string {
    return this.name;
  }

  toGetTeacherId(): string {
    return this.teacher_id;
  }

  toGetLessonPlanId(): string {
    return this.lesson_plan_id;
  }

  toGetDueDate(): Date {
    return this.due_date;
  }

  toGetUrl(): string {
    return this.url;
  }

  toGetPoints(): number {
    return this.points;
  }

  toGetType(): string {
    return this.type;
  }

  saveId(id: string) {
    this.id = id;
  }
}
