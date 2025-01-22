import { FakeUserRepository } from '../../../infrastructure/repositories/user/fake_user_repository';
import { User } from '../../../domain/entities/user/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let fakerUserRepository: FakeUserRepository;

  beforeEach(() => {
    fakerUserRepository = new FakeUserRepository();
    userService = new UserService(fakerUserRepository);
  });

  it('shoud be create a valid user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      is_teacher: true,
    };
    const savedUser = await userService.save(newUser);

    const user = await userService.findById('1');
    expect(user?.toGetId()).toEqual(savedUser.toGetId());
    expect(user?.toGetName()).toBe(savedUser.toGetName());
    expect(user?.toGetEmail()).toBe(savedUser.toGetEmail());
    expect(user?.toGetPassword()).toBe(savedUser.toGetPassword());
    expect(user?.toGetIsTeacher()).toBe(savedUser.toGetIsTeacher());
  });

  it('shoud be update and delete user', async () => {
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

    const user = await userService.findById('1');
    expect(user?.toGetName()).toEqual(updatedUser.name);

    await userService.delete(user.toGetId());
    const foundUser = await userService.findById(user.toGetId());
    expect(foundUser).toBeNull();
  });
});
