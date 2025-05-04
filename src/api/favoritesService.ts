import { Character, CharacterProperties } from '../types/characters';

const FAVORITES_KEY = 'favorites';

export const getFavorites = (): Partial<Character>[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites: Partial<Character>[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (character: Partial<Character>): void => {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.uid === character.uid)) {
    favorites.push(character);
    saveFavorites(favorites);
  }
};

export const removeFavorite = (uid: string): void => {
  const favorites = getFavorites().filter((fav) => fav.uid !== uid);
  saveFavorites(favorites);
};

export const updateFavorite = (uid: string, updates: Partial<CharacterProperties>): void => {
  const favorites = getFavorites().map((fav) =>
    fav.uid === uid ? { uid, properties: { ...fav.properties, ...updates } } : fav
  );
  saveFavorites(favorites);
};
