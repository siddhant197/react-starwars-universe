import { renderHook, act } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import * as api from '../api/fetchCharacters';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockCharacters = [
  {
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      homeworld: 'Tatooine',
      url: '',
      homeworldName: 'Unknown',
    },
    uid: '1',
  },
  {
    properties: {
      name: 'Darth Vader',
      gender: 'male',
      homeworld: 'Tatooine',
      url: '',
      homeworldName: 'Unknown',
    },
    uid: '2',
  },
];

const mockResponse = {
  results: mockCharacters,
  total_pages: 3,
  total_records: 2,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCharacters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test('initially sets loading to true', () => {
    const { result } = renderHook(() => useCharacters('', 1, 10), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  test('fetches and sets characters on success', async () => {
    vi.spyOn(api, 'fetchCharacters').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters('', 1, 10), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(api.fetchCharacters).toHaveBeenCalledWith('', 1, 10);
    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.totalPages).toBe(3);
  });

  test('sets error on failure', async () => {
    vi.spyOn(api, 'fetchCharacters').mockRejectedValue(new Error('API failure'));

    const { result } = renderHook(() => useCharacters('vader', 1, 10), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe('API failure');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.totalPages).toBe(1);
  });

  test('refetches when search term changes', async () => {
    const fetchSpy = vi.spyOn(api, 'fetchCharacters').mockResolvedValue(mockResponse);

    const { rerender } = renderHook(({ search }) => useCharacters(search, 1, 10), {
      initialProps: { search: 'luke' },
      wrapper: createWrapper(),
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(fetchSpy).toHaveBeenCalledWith('luke', 1, 10);

    rerender({ search: 'vader' });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(fetchSpy).toHaveBeenCalledWith('vader', 1, 10);
  });
});
