const FAVORITES_KEY = 'favorites';

export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites: string[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (uid: string): void => {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav === uid)) {
    favorites.push(uid);
    saveFavorites(favorites);
  }
};

export const removeFavorite = (uid: string): void => {
  const favorites = getFavorites().filter((fav) => fav !== uid);
  saveFavorites(favorites);
};
