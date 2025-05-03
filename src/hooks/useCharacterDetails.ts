import { useEffect, useState } from 'react';
import { Character, CharacterDetails } from '../types/characters';
import { fetchCharacterDetails } from '../api/fetchCharacterDetails';

export const useCharacterDetails = (id?: string) => {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Missing character ID');
      setIsLoading(false);
      return;
    }

    const fetchData = async (id: string) => {
      try {
        setIsLoading(true);
        const data: CharacterDetails = await fetchCharacterDetails(id);
        setCharacter(data.result);
        setError(null);
      } catch {
        setError('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  return { character, isLoading, error };
};
