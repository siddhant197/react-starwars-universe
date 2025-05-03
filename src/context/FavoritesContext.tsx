import React, { createContext, useReducer, ReactNode } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../api/favoritesService';

const initialState = {
  favorites: getFavorites(),
};

type Action = { type: 'ADD_FAVORITE'; uid: string } | { type: 'REMOVE_FAVORITE'; uid: string };

const favoritesReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      addFavorite(action.uid);
      return { ...state, favorites: getFavorites() };
    case 'REMOVE_FAVORITE':
      removeFavorite(action.uid);
      return { ...state, favorites: getFavorites() };
    default:
      return state;
  }
};

const FavoritesContext = createContext<any | undefined>(undefined);

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
