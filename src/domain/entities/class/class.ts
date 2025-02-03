export class Class {
  private id: string;
  private readonly teacher_id: string;
  private readonly name: string;
  private readonly due_date: Date;
  private readonly url: string;
  private readonly points: number;
  private readonly type: string;
  private readonly extra_lesson_id?: string;

  constructor(
    teacher_id: string,
    name: string,
    due_date: Date,
    url: string,
    points: number,
    type: string,
    extra_lesson_id?: string | null,
    id?: string,
  ) {
    this.validateFields(
      teacher_id,
      name,
      due_date,
      url,
      points,
      type,
    );
    this.teacher_id = teacher_id;
    this.name = name;
    this.due_date = due_date;
    this.url = url;
    this.points = points;
    this.type = type;
    this.extra_lesson_id = extra_lesson_id;

    if (id) {
      this.id = id;
    }
  }

  validateFields(
    teacher_id: string,
    name: string,
    due_date: Date,
    url: string,
    points: number,
    type: string,
  ): void {
    if (
      !teacher_id ||
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

  toGetExtraLessonId(): string | null {
    return this.extra_lesson_id;
  }
  saveId(id: string) {
    this.id = id;
  }
}
