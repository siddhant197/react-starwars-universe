import { useFavorites } from '../context/FavoritesContext';
import { Character, CharacterProperties } from '../types/characters';

export const useAddFavorite = () => {
  const { dispatch } = useFavorites();
  return (character: Partial<Character>) => dispatch({ type: 'ADD_FAVORITE', character });
};

export const useRemoveFavorite = () => {
  const { dispatch } = useFavorites();
  return (uid: string) => dispatch({ type: 'REMOVE_FAVORITE', uid });
};

export const useUpdateFavorite = () => {
  const { dispatch } = useFavorites();
  return (uid: string, updates: Partial<CharacterProperties>) =>
    dispatch({ type: 'UPDATE_FAVORITE', uid, updates });
};
