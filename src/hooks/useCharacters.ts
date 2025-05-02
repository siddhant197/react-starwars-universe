import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/fetchCharacters';
import { Character, CharactersResponse } from '../types/characters';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const charactersData: CharactersResponse = await fetchCharacters();
        setCharacters(charactersData.results);
      } catch {
        setError('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    };

    getCharacters();
  }, []);

  return { characters, isLoading, error };
};
