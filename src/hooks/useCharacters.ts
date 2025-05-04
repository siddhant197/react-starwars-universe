import { fetchCharacters } from '../api/fetchCharacters';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { fetchHomePlanet } from '../api/fetchHomePlanet';
import { useHomeworldQueries } from '../api/queries';

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
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const characterList = characters?.results ?? characters?.result ?? [];

  const homeworldQueries = useHomeworldQueries(characterList);

  const isHomeworldLoading = homeworldQueries.some((q) => q.isLoading);
  const isHomeworldFetching = homeworldQueries.some((q) => q.isFetching);

  const withHomeworldNames = characterList.map((character, idx) => {
    const homeworldData = homeworldQueries[idx]?.data;
    const homeworldName = homeworldData?.result?.properties?.name ?? 'Unknown';

    return {
      uid: character.uid,
      properties: {
        ...character.properties,
        homeworldName,
      },
    };
  });

  return {
    characters: withHomeworldNames,
    isLoading: isLoading || isHomeworldLoading,
    isFetching: isFetching || isHomeworldFetching,
    error: getErrorMessage(error),
    totalPages: characters?.total_pages ?? 1,
  };
};
