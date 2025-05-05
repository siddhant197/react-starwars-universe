import { fetchCharacters } from '../api/fetchCharacters';
import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useHomeplanets } from '../api/queries';
import { HomeplanetResponse } from '../types/homeplanets';

export const useCharacters = (search: string, page: number, limit: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const debounced = debounce((value: string) => {
      setDebouncedSearch(value);
    }, 500);

    debounced(search);

    return () => {
      debounced.cancel();
    };
  }, [search]);

  const {
    data: characters,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['characters', debouncedSearch, page],
    queryFn: () => fetchCharacters(debouncedSearch, page, limit),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const characterList = characters?.results ?? characters?.result ?? [];

  const {
    data: homeplanets,
    isLoading: loadingHomeplanets,
    isFetching: fetchingHomeplanets,
    error: errorHomeplanets,
  } = useHomeplanets();

  const withHomeworldNames = characterList.map((character) => {
    const homeworldData = homeplanets?.find(
      (homeplanet: HomeplanetResponse) => homeplanet.url === character.properties.homeworld
    );

    return {
      uid: character.uid,
      properties: {
        ...character.properties,
        homeworldName: homeworldData?.name ?? 'Unknown',
      },
    };
  });

  return {
    characters: withHomeworldNames,
    isLoading: isLoading || loadingHomeplanets,
    isFetching: isFetching || fetchingHomeplanets,
    error: getErrorMessage(error) || getErrorMessage(errorHomeplanets),
    totalPages: characters?.total_pages ?? 1,
  };
};
