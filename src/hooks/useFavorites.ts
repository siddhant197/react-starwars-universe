import { useFavorites } from '../context/FavoritesContext';

export const useAddFavorite = () => {
  const { dispatch } = useFavorites();
  return (uid?: string) => dispatch({ type: 'ADD_FAVORITE', uid });
};

export const useRemoveFavorite = () => {
  const { dispatch } = useFavorites();
  return (uid?: string) => dispatch({ type: 'REMOVE_FAVORITE', uid });
};
