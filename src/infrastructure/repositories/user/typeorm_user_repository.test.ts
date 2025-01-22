import { DataSource, Repository } from 'typeorm';

import { TypeOrmUserRepository } from './typeorm_user_repository';
import { User } from '../../../domain/entities/user/user';
import { UserEntity } from '../../persistence/entities/user_entity';

describe('TypeOrmUserRepository', () => {
  let dataSource: DataSource;
  let userRepository: TypeOrmUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeOrmUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be create a valid User', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    const savedUser = await userRepository.save(user);

    expect(savedUser.toGetId()).toEqual(savedUser.toGetId());
    expect(savedUser.toGetName()).toBe('John Doe');
    expect(savedUser.toGetEmail()).toBe('john@email.com');
    expect(savedUser.toGetPassword()).toBe('123456');
    expect(savedUser.toGetIsTeacher()).toBe(true);
  });

  it('should be return a valid User', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    const savedUser = await userRepository.save(user);

    const foundUser = await userRepository.findById(savedUser.toGetId());
    expect(foundUser?.toGetId()).toEqual(savedUser.toGetId());
    expect(foundUser?.toGetName()).toBe('John Doe');
  });

  it('should be return null if user not found', async () => {
    const user = await userRepository.findById('999');
    expect(user).toBeNull();
  });

  it('should be retorn all users', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    await userRepository.save(user);

    const user2 = new User(
      'John Doe 2',
      'john2@email.com',
      '1234562',
      false,
      '2',
    );
    await userRepository.save(user2);

    const users = await userRepository.findAll();
    expect(users.length).toBe(2);
  });

  it('should be find user by email', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    await userRepository.save(user);

    const foundUser = await userRepository.findByEmail('john@email.com');
    expect(foundUser?.toGetId()).toEqual(user.toGetId());
    expect(foundUser?.toGetName()).toBe('John Doe');
  });

  it('should be update user', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    await userRepository.save(user);

    const updatedUser = new User(
      'John Doe 2',
      'john2@email.com',
      '1234562',
      false,
      '1',
    );
    await userRepository.update(updatedUser);

    const foundUser = await userRepository.findById('1');
    expect(foundUser.toGetName()).toBe('John Doe 2');
  });

  it('should be delete user', async () => {
    const user = new User('John Doe', 'john@email.com', '123456', true, '1');
    await userRepository.save(user);

    await userRepository.delete('1');
    const foundUser = await userRepository.findById('1');

    expect(foundUser).toBeNull();
  });
});
