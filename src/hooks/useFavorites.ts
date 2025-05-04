import { useFavorites } from '../context/FavoritesContext';

export const useAddFavorite = (uid?: string) => {
  const { dispatch } = useFavorites();
  return () => dispatch({ type: 'ADD_FAVORITE', uid });
};

export const useRemoveFavorite = (uid?: string) => {
  const { dispatch } = useFavorites();
  return () => dispatch({ type: 'REMOVE_FAVORITE', uid });
};
