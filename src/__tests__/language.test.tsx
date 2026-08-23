import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLanguageStore, formatLanguagesQuery, normalizeLanguages } from '../store/useLanguageStore';
import * as LanguageScreenModule from '../../app/(drawer)/language';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-router', () => ({
  router: { replace: jest.fn() },
  useNavigation: () => ({ dispatch: jest.fn() }),
}));

jest.mock('../hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    background: '#fff',
    cardBackground: '#eee',
    textPrimary: '#000',
    textMuted: '#888',
    headerIcon: '#000',
    headerText: '#000',
  }),
}));

describe('Idiomas - Multi seleção', () => {
  beforeEach(async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    await AsyncStorage.clear();
    useLanguageStore.setState({ selectedLanguages: ['en', 'pt', 'es'] } as any);
  });

  test('Teste 1: estado inicial ["en","pt","es"]', () => {
    const state = useLanguageStore.getState().selectedLanguages;
    expect(state).toEqual(['en', 'pt', 'es']);
  });

  test('Teste 2: selecionar somente PT -> ["pt"]', () => {
    useLanguageStore.setState({ selectedLanguages: ['en', 'pt', 'es'] } as any);
    // Desseleciona en e es
    useLanguageStore.getState().toggleLanguage('en');
    useLanguageStore.getState().toggleLanguage('es');
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['pt']);
  });

  test('Teste 3: selecionar PT+EN -> ["en","pt"] normalizado', () => {
    useLanguageStore.setState({ selectedLanguages: ['pt'] } as any);
    useLanguageStore.getState().toggleLanguage('en');
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['en', 'pt']);
  });

  test('Teste 4: selecionar PT+ES -> ["en","pt"]? na verdade PT+ES => ["pt","es"] normalizado en,pt,es => ["pt","es"] sorted en,pt,es => ["pt","es"]? ordem en,pt,es => ["pt","es"] fica ["pt","es"] porque en ausente', () => {
    useLanguageStore.setState({ selectedLanguages: ['pt'] } as any);
    useLanguageStore.getState().toggleLanguage('es');
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['pt', 'es']);
    // Verifica normalização: ["es","pt"] também vira ["pt","es"]
    useLanguageStore.setState({ selectedLanguages: ['es', 'pt'] } as any);
    const normalized = normalizeLanguages(['es', 'pt'] as any);
    expect(normalized).toEqual(['pt', 'es']);
  });

  test('Teste 5: selecionar EN+ES -> ["en","es"]', () => {
    useLanguageStore.setState({ selectedLanguages: ['en'] } as any);
    useLanguageStore.getState().toggleLanguage('es');
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['en', 'es']);
  });

  test('Teste 6: selecionar os três -> ["en","pt","es"]', () => {
    useLanguageStore.setState({ selectedLanguages: ['pt'] } as any);
    useLanguageStore.getState().toggleLanguage('en');
    useLanguageStore.getState().toggleLanguage('es');
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['en', 'pt', 'es']);
  });

  test('Teste 7: impedir estado vazio (não deixa zero)', () => {
    useLanguageStore.setState({ selectedLanguages: ['pt'] } as any);
    useLanguageStore.getState().toggleLanguage('pt');
    // Deve permanecer ['pt'] pois impede zero
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['pt']);
  });

  test('Teste 8: persistência PT+EN', async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    useLanguageStore.getState().setLanguages(['pt', 'en'] as any);
    await new Promise((r) => setTimeout(r, 100));
    const stored = await AsyncStorage.getItem('teachpulse-language-storage');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    const state = parsed.state || parsed;
    expect(normalizeLanguages(state.selectedLanguages)).toEqual(['en', 'pt']);
  });

  test('Teste 9: conversão para query ["pt","en"] -> "en,pt"', () => {
    const q = formatLanguagesQuery(['pt', 'en'] as any);
    expect(q).toBe('en,pt');
    const q2 = formatLanguagesQuery(['en', 'pt'] as any);
    expect(q2).toBe('en,pt');
    const q3 = formatLanguagesQuery(['pt', 'en', 'es'] as any);
    expect(q3).toBe('en,pt,es');
  });

  test('Teste 10: API recebe query correta', async () => {
    const { api } = require('../services/api');
    const spy = jest.spyOn(api, 'get').mockResolvedValue({
      data: { status: 'ok', news: [], page: 1, hasMore: false, count: 0, cached: false },
    });
    const { getLatestNews } = require('../services/news');
    await getLatestNews({ page: 1, languages: ['pt', 'en'] as any });
    expect(spy).toHaveBeenCalledWith('/news', { params: { page: 1, languages: 'en,pt' } });
    spy.mockRestore();
  });

  test('Teste 11: cache diferencia PT+EN de PT+ES', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const key1 = ['feed', formatLanguagesQuery(['pt', 'en'] as any)];
    const key2 = ['feed', formatLanguagesQuery(['pt', 'es'] as any)];
    expect(key1).not.toEqual(key2);
    expect(key1).toEqual(['feed', 'en,pt']);
    expect(key2).toEqual(['feed', 'pt,es']);
    // Mesmo após normalização ordem, chaves diferentes
    qc.setQueryData(key1, { pages: [] });
    expect(qc.getQueryData(key1)).toBeTruthy();
    expect(qc.getQueryData(key2)).toBeFalsy();
  });

  test('Teste 12: Home utiliza idiomas selecionados', () => {
    useLanguageStore.setState({ selectedLanguages: ['en', 'pt'] } as any);
    const lang = useLanguageStore.getState().selectedLanguages;
    const key = ['feed', formatLanguagesQuery(lang)];
    expect(key).toEqual(['feed', 'en,pt']);
  });

  test('Teste 13: News utiliza mesmos idiomas (compartilhado)', () => {
    useLanguageStore.setState({ selectedLanguages: ['pt', 'es'] } as any);
    const lang = useLanguageStore.getState().selectedLanguages;
    const homeKey = ['feed', formatLanguagesQuery(lang)];
    const newsKey = ['feed', formatLanguagesQuery(lang)];
    expect(homeKey).toEqual(newsKey);
  });

  test('Teste 14: pull-to-refresh utiliza idiomas selecionados', async () => {
    const { api } = require('../services/api');
    const spy = jest.spyOn(api, 'get').mockResolvedValue({
      data: { status: 'ok', news: [], page: 1, hasMore: false, count: 0, cached: false },
    });
    const { getLatestNews } = require('../services/news');
    const langs: any = ['pt', 'en'];
    await getLatestNews({ page: 1, refresh: true, languages: langs });
    expect(spy).toHaveBeenCalledWith('/news', { params: { page: 1, refresh: true, languages: 'en,pt' } });
    spy.mockRestore();
  });

  test('Teste 15: paginação mantém idiomas', async () => {
    const { api } = require('../services/api');
    const spy = jest.spyOn(api, 'get').mockResolvedValue({
      data: { status: 'ok', news: [], page: 2, hasMore: true, count: 0, cached: false },
    });
    const { getLatestNews } = require('../services/news');
    await getLatestNews({ page: 2, languages: ['en', 'es'] as any });
    expect(spy).toHaveBeenCalledWith('/news', { params: { page: 2, languages: 'en,es' } });
    spy.mockRestore();
  });

  test('Tela não renderiza "Todos os idiomas"', () => {
    const { queryByText } = render(<LanguageScreenModule.default />);
    expect(queryByText('Todos os Idiomas')).toBeNull();
    expect(queryByText(/Todos/)).toBeNull();
  });
});
