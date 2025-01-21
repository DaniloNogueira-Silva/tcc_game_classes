import { Uuid } from '../../value_objects/uuid';

export class User {
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly is_teacher: boolean;
  private readonly user_id: string;

  constructor(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean,
  ) {
    this.validateFields(name, email, password, is_teacher);
    this.user_id = new Uuid().toGetValue();
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
  ): void {
    if (
      !name ||
      !email ||
      !password ||
      is_teacher === null ||
      is_teacher === undefined
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

  toGetUserId(): string {
    return this.user_id;
  }
}
