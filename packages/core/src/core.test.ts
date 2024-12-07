import { Context } from './context';
import { createInstance, isValidInstanceName } from './core';
import { InvalidName } from './errors';

jest.mock('./fetch');

describe('Core functionalities', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('validate instance name', () => {
    expect(isValidInstanceName('myinstance')).toEqual(true);
    expect(isValidInstanceName('my-instance')).toEqual(false);
  });

  test('an instance with an invalid name cannot be created', async () => {
    await expect(
      createInstance(
        new Context({ personalAccessToken: 'dummy' }),
        'eyevinn-test-adserver',
        'my-token',
        {
          name: 'my-instance'
        }
      )
    ).rejects.toThrow(new InvalidName('my-instance'));
  });
});
