import { CreateUserDto } from '../dto/create.user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update.user.dto';
import { User } from '../../../domain/entities/user/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user_repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async save(dto: CreateUserDto): Promise<User | null> {
    const userExist = await this.userRepository.findByEmail(dto.email);
    if (userExist) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    const user = new User(dto.name, dto.email, hash, dto.is_teacher);

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
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new Error('User not found');
    }

    return foundUser;
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.toGetPassword(),
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = {
      id: user.toGetId(),
      username: user.toGetName(),
      email: user.toGetEmail(),
      is_teacher: user.toGetIsTeacher(),
    };
    return this.jwtService.sign(payload);
  }
}
