import { renderHook, act } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import * as api from '../api/fetchCharacters';
import { vi } from 'vitest';

const mockCharacters = [
  {
    properties: { name: 'Luke Skywalker', gender: 'male', homeworld: 'Tatooine', url: '' },
    uid: '1',
  },
  {
    properties: { name: 'Darth Vader', gender: 'male', homeworld: 'Tatooine', url: '' },
    uid: '2',
  },
];

const mockResponse = {
  results: mockCharacters,
  total_pages: 3,
  total_records: 2,
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
    const { result } = renderHook(() => useCharacters('', 1, 10));
    expect(result.current.isLoading).toBe(true);
  });

  test('fetches and sets characters on success', async () => {
    vi.spyOn(api, 'fetchCharacters').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters('', 1, 10));

    act(() => {
      vi.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(api.fetchCharacters).toHaveBeenCalledWith('', 1, 10);
    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.totalPages).toBe(3);
  });

  test('sets error on failure', async () => {
    vi.spyOn(api, 'fetchCharacters').mockRejectedValue(new Error('API failure'));

    const { result } = renderHook(() => useCharacters('vader', 1, 10));

    act(() => {
      vi.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch characters');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.totalPages).toBe(1);
  });

  test('fetch is debounced by 500ms', async () => {
    const fetchSpy = vi.spyOn(api, 'fetchCharacters').mockResolvedValue(mockResponse);

    renderHook(() => useCharacters('luke', 1, 10));

    expect(fetchSpy).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(fetchSpy).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchSpy).toHaveBeenCalled();
  });

  test('refetches when search term changes', async () => {
    const fetchSpy = vi.spyOn(api, 'fetchCharacters').mockResolvedValue(mockResponse);

    const { rerender } = renderHook(({ search }) => useCharacters(search, 1, 10), {
      initialProps: { search: 'luke' },
    });

    act(() => {
      vi.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchSpy).toHaveBeenCalledWith('luke', 1, 10);

    rerender({ search: 'vader' });

    act(() => {
      vi.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchSpy).toHaveBeenCalledWith('vader', 1, 10);
  });
});
