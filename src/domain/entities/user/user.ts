export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly is_teacher: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean,
    id: string,
  ) {
    this.validateFields(name, email, password, is_teacher, id);
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.is_teacher = is_teacher;
  }

  validateFields(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean,
    id: string,
  ): void {
    if (
      !name ||
      !email ||
      !password ||
      is_teacher === null ||
      is_teacher === undefined ||
      !id
    ) {
      throw new Error('All fields are required to create a user');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
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
}
