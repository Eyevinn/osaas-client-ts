import { FetchError, createFetch } from './fetch';

const fetchMockResponseJsonOk = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: {
      get: () => 'application/json'
    },
    json: async () => ({ data: 'test' })
  } as unknown as Response);

const fetchMockResponseTextOk = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: {
      get: () => 'text/plain'
    },
    text: async () => 'test'
  } as unknown as Response);

const fetchMockResponseTextError = () =>
  Promise.resolve({
    ok: false,
    status: 400,
    headers: {
      get: () => 'text/plain'
    },
    text: async () => 'unexpected error'
  } as unknown as Response);

describe('fetch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('can handle json response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMockResponseJsonOk);

    const data = await createFetch<{ data: string }>('https://mock.com/test');
    expect(data).toEqual({ data: 'test' });
  });

  test('can handle non-json response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMockResponseTextOk);

    const data = await createFetch<string>('https://mock.com/test');
    expect(data).toEqual('test');
  });

  test('can handle error response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMockResponseTextError);

    try {
      const data = await createFetch<string>('https://mock.com/test');
    } catch (error) {
      const fetchError = error as FetchError;
      expect(fetchError.message).toEqual('unexpected error');
      expect(fetchError.httpCode).toEqual(400);
    }
  });
});
