export class User {
  private id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly is_teacher: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean,
    id?: string,
  ) {
    this.validateFields(name, email, password, is_teacher);
    this.name = name;
    this.email = email;
    this.password = password;
    this.is_teacher = is_teacher;

    if (id) {
      this.id = id;
    }
  }

  validateFields(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean,
  ): void {
    if (
      !name ||
      !email ||
      !password ||
      is_teacher === null ||
      is_teacher === undefined
    ) {
      throw new Error('Todos os campos são obrigatórios para criar um usuário');
    }

    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }
  }

  toGetName(): string {
    return this.name;
  }

  toGetEmail(): string {
    return this.email;
  }

  toGetPassword(): string {
    return this.password;
  }

  toGetIsTeacher(): boolean {
    return this.is_teacher;
  }

  toGetId(): string {
    return this.id;
  }

  saveId(id: string) {
    this.id = id;
  }
}
