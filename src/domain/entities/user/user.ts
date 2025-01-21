export class User {
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.validateFields(name, email, password);
    this.name = name;
    this.email = email;
    this.password = password;
  }

  validateFields(name: string, email: string, password: string): void {
    if (!name || !email || !password) {
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
}
