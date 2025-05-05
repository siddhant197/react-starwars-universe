import { renderHook, act } from '@testing-library/react';
import { useAddFavorite, useRemoveFavorite, useUpdateFavorite } from './useFavorites';
import { useFavorites } from '../context/FavoritesContext';
import { vi } from 'vitest';

vi.mock('../context/FavoritesContext');

describe('Favorites hooks', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useFavorites).mockReturnValue({ dispatch, state: { favorites: [] } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch ADD_FAVORITE action', () => {
    const { result } = renderHook(() => useAddFavorite());

    act(() => {
      result.current({
        uid: '123',
        properties: {
          name: 'Yoda',
          gender: '',
          homeworld: '',
          url: '',
        },
      });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITE',
      character: { uid: '123', properties: { name: 'Yoda', gender: '', homeworld: '', url: '' } },
    });
  });

  it('should dispatch REMOVE_FAVORITE action', () => {
    const { result } = renderHook(() => useRemoveFavorite());

    act(() => {
      result.current('123');
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FAVORITE',
      uid: '123',
    });
  });

  it('should dispatch UPDATE_FAVORITE action', () => {
    const { result } = renderHook(() => useUpdateFavorite());

    act(() => {
      result.current('123', { height: '180' });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_FAVORITE',
      uid: '123',
      updates: { height: '180' },
    });
  });
});
