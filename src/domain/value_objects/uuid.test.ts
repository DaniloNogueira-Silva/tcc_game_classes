import { Uuid } from './uuid';

describe('UUID', () => {
  it('should be create a valid UUID', () => {
    const uuid = new Uuid();

    expect(uuid.toGetValue()).toBeDefined();
  });
});
