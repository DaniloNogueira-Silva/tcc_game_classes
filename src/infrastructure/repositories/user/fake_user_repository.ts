import { User } from '../../../domain/entities/user/user';
import { UserRepository } from '../../../domain/repositories/user_repository';

export class FakeUserRepository implements UserRepository {
  private users: User[] = [
    new User('John Doe', 'john@email.com', '123456', true, '1'),
    new User('John Doe 2', 'john2@email.com', '1234562', false, '2'),
  ];

  async save(user: User): Promise<User | null> {
    this.users.push(user);
    return this.users.find((user) => user.toGetId());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.toGetId() === id) || null;
  }

  async findAll(): Promise<User[] | null> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.toGetEmail() === email) || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.toGetId() === user.toGetId());
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.toGetId() !== id);
  }
}
