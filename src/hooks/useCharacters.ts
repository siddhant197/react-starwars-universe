import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchCharacters } from '../api/fetchCharacters';
import { Character, CharactersResponse } from '../types/characters';

export const useCharacters = (search: string, page: number, limit: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = useCallback(
    async (searchTerm: string, currentPage: number, pageSize: number) => {
      try {
        setIsLoading(true);
        const data: CharactersResponse = await fetchCharacters(searchTerm, currentPage, pageSize);
        setCharacters(data.results ?? data.result ?? []);
        setTotalPages(data.total_pages ?? 1);
        setError(null);
      } catch {
        setError('Failed to fetch characters');
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const debouncedFetch = debounce(() => fetchData(search, page, limit), 500);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchData, search, page, limit]);

  return { characters: characters ?? [], isLoading, error, totalPages };
};
