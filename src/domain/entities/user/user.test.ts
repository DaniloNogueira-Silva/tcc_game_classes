import { User } from './user';

describe('User Entity', () => {
  it('should be create a valid User', () => {
    const name = 'user';
    const email = 'email';
    const password = 'password';

    const user = new User(name, email, password, true);

    expect(user.toGetName()).toEqual(name);
    expect(user.toGetEmail()).toEqual(email);
    expect(user.toGetPassword()).toEqual(password);
  });

  it('should throw an error if any field is empty', () => {
    expect(() => new User('', 'password', 'email', false)).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', '', 'email', false)).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', 'password', '', false)).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', 'password', null, false)).toThrow(
      'All fields are required to create a user',
    );
  });

  it('should throw an error if password is less than 6 characters', () => {
    expect(() => new User('name', 'email', 'pass', false)).toThrow(
      'Password must be at least 6 characters',
    );
  });

  it('should be create a valid user_id', () => {
    const user = new User('name', 'email', 'password', true);

    expect(user.toGetUserId()).toBeDefined();
  });
});
