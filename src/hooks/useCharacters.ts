import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/fetchCharacters';

type Character = {
  name: string;
  uid: string;
  url: string;
};

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const charactersData = await fetchCharacters();
        setCharacters(charactersData.results);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    };

    getCharacters();
  }, []);

  return { characters, isLoading, error };
};
