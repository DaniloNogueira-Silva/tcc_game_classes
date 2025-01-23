import * as bcrypt from 'bcrypt';

import { FakeUserRepository } from '../../../infrastructure/repositories/user/fake_user_repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let fakeUserRepository: FakeUserRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    jwtService = {
      sign: jest
        .fn()
        .mockImplementation((payload) => `mockToken-${payload.id}`),
    } as unknown as JwtService;

    userService = new UserService(fakeUserRepository, jwtService);
  });

  it('should create a valid user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };

    const savedUser = await userService.save(newUser);

    const user = await userService.findById(savedUser.toGetId());
    expect(user?.toGetId()).toEqual(savedUser.toGetId());
    expect(user?.toGetName()).toBe(savedUser.toGetName());
    expect(user?.toGetEmail()).toBe(savedUser.toGetEmail());
    expect(user?.toGetIsTeacher()).toBe(savedUser.toGetIsTeacher());
  });

  it('should update and delete a user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };

    const savedUser = await userService.save(newUser);

    const updatedUser = {
      name: 'John Doe 2',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
      id: savedUser.toGetId(),
    };

    await userService.update(updatedUser);

    const user = await userService.findById(savedUser.toGetId());
    expect(user?.toGetName()).toEqual(updatedUser.name);

    await userService.delete(user.toGetId());
    const foundUser = await userService.findById(user.toGetId());
    expect(foundUser).toBeNull();
  });

  it('should hash the password correctly', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };

    const savedUser = await userService.save(newUser);

    const user = await userService.findById(savedUser.toGetId());
    const isPasswordMatching = await bcrypt.compare(
      newUser.password,
      user?.toGetPassword() ?? '',
    );

    expect(isPasswordMatching).toBe(true);
  });

  it('should return an error if email does not exist in login function', async () => {
    await expect(userService.findByEmail('john@email.com')).rejects.toThrow(
      'User not found',
    );
  });

  it('should return an error if password does not match', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };

    const savedUser = await userService.save(newUser);
    await expect(
      userService.login(savedUser.toGetEmail(), '1234567'),
    ).rejects.toThrow('Invalid password');
  });

  it('should return a token when login is successful', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };

    const savedUser = await userService.save(newUser);
    const token = await userService.login(savedUser.toGetEmail(), '123456');

    expect(token).toBeDefined();
  });
});
