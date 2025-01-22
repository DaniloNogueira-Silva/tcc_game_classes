import { CreateUserDto } from '../dto/create.user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update.user.dto';
import { User } from '../../../domain/entities/user/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user_repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async save(dto: CreateUserDto): Promise<User | null> {
    const userExist = await this.userRepository.findByEmail(dto.email);
    if (userExist) {
      throw new Error('User already exists');
    }

    const user = new User(
      dto.name,
      dto.email,
      dto.password,
      dto.is_teacher,
      uuidv4(),
    );

    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async update(dto: UpdateUserDto): Promise<void> {
    const userExist = await this.userRepository.findById(dto.id);
    if (!userExist) {
      throw new Error('User not found');
    }

    const user = new User(
      dto.name,
      dto.email,
      dto.password,
      dto.is_teacher,
      dto.id,
    );

    await this.userRepository.update(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[] | null> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
