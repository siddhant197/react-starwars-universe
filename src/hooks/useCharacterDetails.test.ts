import { renderHook } from '@testing-library/react';
import { useCharacterDetails } from './useCharacterDetails';
import * as queries from '../api/queries';
import { vi } from 'vitest';
import { getErrorMessage } from '../utils/getErrorMessage';

vi.mock('../utils/getErrorMessage', () => ({
  getErrorMessage: vi.fn((e) => (e ? e.message : '')),
}));

const characterMock = {
  uid: '1',
  properties: {
    url: 'stars.wars/api/people/1',
    name: 'Luke',
    homeworld: 'star.wars/api/planets/1',
  },
};

const filmsMock = [
  {
    title: 'A New Hope',
    characters: ['stars.wars/api/people/1'],
  },
  {
    title: 'The Empire Strikes Back',
    characters: ['stars.wars/api/people/2'],
  },
];

const starshipsMock = [
  {
    name: 'X-Wing',
    pilots: ['stars.wars/api/people/1'],
  },
  {
    name: 'TIE Fighter',
    pilots: [],
  },
];

const homeworldQueryMock = [
  {
    isLoading: false,
    isFetching: false,
    data: {
      result: {
        properties: {
          name: 'Tatooine',
        },
      },
    },
  },
];

describe('useCharacterDetails', () => {
  beforeEach(() => {
    vi.spyOn(queries, 'useCharacterProperties').mockReturnValue({
      data: characterMock,
      isLoading: false,
      isFetching: false,
      error: null,
    } as any);

    vi.spyOn(queries, 'useAllFilms').mockReturnValue({
      data: filmsMock,
      isLoading: false,
      isFetching: false,
      error: null,
    } as any);

    vi.spyOn(queries, 'useAllStarships').mockReturnValue({
      data: starshipsMock,
      isLoading: false,
      isFetching: false,
      error: null,
    } as any);

    vi.spyOn(queries, 'useHomeworldQueries').mockReturnValue(homeworldQueryMock as any);
  });

  test('character details with derived film and starship names', () => {
    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.details).toEqual({
      uid: '1',
      properties: {
        ...characterMock.properties,
        homeworldName: 'Tatooine',
      },
      films: ['A New Hope'],
      starships: ['X-Wing'],
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe('');
  });

  test('loading true if any sub-query is loading', () => {
    vi.spyOn(queries, 'useAllFilms').mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCharacterDetails('1'));
    expect(result.current.isLoading).toBe(true);
  });

  test('error message if query has error', () => {
    const error = new Error('Network failed');
    vi.spyOn(queries, 'useCharacterProperties').mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error,
    } as any);

    const { result } = renderHook(() => useCharacterDetails('1'));
    expect(getErrorMessage).toHaveBeenCalledWith(error);
    expect(result.current.error).toBe('Network failed');
  });
});
