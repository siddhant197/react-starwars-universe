import { useQueries } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/fetchCharacterById';
import { useFavorites } from '../context/FavoritesContext';
import { Character } from '../types/characters';

export const useFavoriteCharacters = () => {
  const { state } = useFavorites();
  const { favorites } = state;

  const queries = useQueries({
    queries: favorites.map((id: string) => ({
      queryKey: ['character', id],
      queryFn: () => fetchCharacterById(id),
      staleTime: Infinity,
      enabled: !!id,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error;
  const characters: Character[] = queries
    .map((query) => query.data)
    .filter((data): data is Character => !!data);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  };

  return { characters, isLoading, error: error ? getErrorMessage(error) : null };
};
