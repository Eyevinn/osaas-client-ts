import { instanceOptsToPayload } from './util';

describe('util functions', () => {
  test('can parse instance options containing =', () => {
    const opts = [`cmdLineArgs=-i "hejhopp=tjohopp"`];
    const payload = instanceOptsToPayload(opts);
    expect(payload).toEqual({ cmdLineArgs: '-i "hejhopp=tjohopp"' });
  });
});
