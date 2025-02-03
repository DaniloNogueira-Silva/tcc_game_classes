export class LessonPlan {
  private id: string;
  private readonly teacher_id: string;
  private readonly name: string;
  private readonly theme: string;

  constructor(teacher_id: string, name: string, theme: string, id?: string) {
    this.validateFields(teacher_id, name, theme);
    this.teacher_id = teacher_id;
    this.name = name;
    this.theme = theme;

    if (id) {
      this.id = id;
    }
  }

  validateFields(teacher_id: string, name: string, theme: string): void {
    if (!teacher_id || !name || !theme) {
      throw new Error(
        'Todos os campos são obrigatórios para criar um plano de aula',
      );
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

  toGetTheme(): string {
    return this.theme;
  }

  saveId(id: string) {
    this.id = id;
  }
}
