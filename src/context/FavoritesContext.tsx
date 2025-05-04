import { createContext, ReactNode, useReducer } from 'react';
import { addFavorite, getFavorites, removeFavorite, updateFavorite } from '../api/favoritesService';
import { Character, CharacterProperties } from '../types/characters';
import React from 'react';

type State = {
  favorites: Partial<Character>[];
};

type Action =
  | { type: 'ADD_FAVORITE'; character: Partial<Character> }
  | { type: 'REMOVE_FAVORITE'; uid: string }
  | { type: 'UPDATE_FAVORITE'; uid: string; updates: Partial<CharacterProperties> };

const initialState: State = {
  favorites: getFavorites(),
};

const favoritesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      addFavorite(action.character);
      return { ...state, favorites: [...state.favorites, action.character] };
    case 'REMOVE_FAVORITE':
      removeFavorite(action.uid);
      return { ...state, favorites: state.favorites.filter((char) => char.uid !== action.uid) };
    case 'UPDATE_FAVORITE':
      updateFavorite(action.uid, action.updates);
      return {
        ...state,
        favorites: state.favorites.map((char) =>
          char.uid === action.uid
            ? { uid: char.uid, properties: { ...char.properties, ...action.updates } }
            : char
        ),
      };
    default:
      return state;
  }
};

type FavoritesContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = React.useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
