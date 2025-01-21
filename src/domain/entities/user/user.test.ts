import { User } from './user';

describe('User Entity', () => {
  it('should be create a valid User', () => {
    const name = 'user';
    const email = 'email';
    const password = 'password';

    const user = new User(name, email, password);

    expect(user.toGetName()).toEqual(name);
    expect(user.toGetEmail()).toEqual(email);
    expect(user.toGetPassword()).toEqual(password);
  });

  it('should throw an error if any field is empty', () => {
    expect(() => new User('', 'password', 'email')).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', '', 'email')).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', 'password', '')).toThrow(
      'All fields are required to create a user',
    );
    expect(() => new User('name', 'password', null)).toThrow(
      'All fields are required to create a user',
    );
  });

  it('should throw an error if password is less than 6 characters', () => {
    expect(() => new User('name', 'email', 'pass')).toThrow(
      'Password must be at least 6 characters',
    );
  });
});
