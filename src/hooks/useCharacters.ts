import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchCharacters } from '../api/fetchCharacters';
import { Character, CharactersResponse } from '../types/characters';

export const useCharacters = (search: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const data: CharactersResponse = await fetchCharacters(searchTerm);
      setCharacters(data.results ?? data.result ?? []);
      setError(null);
    } catch {
      setError('Failed to fetch characters');
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(() => fetchData(search), 500);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchData, search]);

  return { characters: characters ?? [], isLoading, error };
};
