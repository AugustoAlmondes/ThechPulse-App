import { api } from '../services/api';
import { getLatestNews } from '../services/news';

jest.mock('../services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockedGet = api.get as jest.Mock;

describe('getLatestNews', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  test('Teste 1: carregamento normal não envia refresh=true', async () => {
    mockedGet.mockResolvedValue({
      data: { status: 'ok', news: [], page: 1, hasMore: false, count: 0, cached: false },
    });
    await getLatestNews({ page: 1 });
    expect(mockedGet).toHaveBeenCalledWith('/news', { params: { page: 1 } });
    expect(mockedGet).not.toHaveBeenCalledWith('/news', expect.objectContaining({ params: expect.objectContaining({ refresh: true }) }));
  });

  test('Teste 2: refresh envia refresh=true', async () => {
    mockedGet.mockResolvedValue({
      data: { status: 'ok', news: [], page: 1, hasMore: true, count: 10, cached: false },
    });
    await getLatestNews({ page: 1, refresh: true });
    expect(mockedGet).toHaveBeenCalledWith('/news', { params: { page: 1, refresh: true } });
  });

  test('Teste 3: paginação page 2 não envia refresh', async () => {
    mockedGet.mockResolvedValue({
      data: { status: 'ok', news: [], page: 2, hasMore: true, count: 10, cached: false },
    });
    await getLatestNews({ page: 2 });
    expect(mockedGet).toHaveBeenCalledWith('/news', { params: { page: 2 } });
    const calls = mockedGet.mock.calls;
    const hasRefresh = calls.some((c: any) => c[1]?.params?.refresh === true);
    expect(hasRefresh).toBe(false);
  });

  test('image normalização: "None" vira null', async () => {
    mockedGet.mockResolvedValue({
      data: {
        status: 'ok',
        page: 1,
        hasMore: false,
        count: 1,
        cached: false,
        news: [{ id: '1', title: 't', description: 'd', url: 'u', author: 'a', image: 'None', language: 'pt', category: ['tech'], source_category: [], published: '2026-01-01' }],
      },
    });
    const res = await getLatestNews({ page: 1 });
    expect(res.news[0].image).toBeNull();
  });
});
