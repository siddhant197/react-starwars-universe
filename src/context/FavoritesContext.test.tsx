import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';
import { Character } from '../types/characters';

const TestComponent = () => {
  const { state, dispatch } = useFavorites();

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_FAVORITE',
            character: {
              uid: '12',
              properties: {
                name: 'Luke',
                gender: '',
                homeworld: '',
                url: '',
              },
            },
          })
        }
      >
        Add Luke
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_FAVORITE', uid: '12' })}>Remove Luke</button>
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_FAVORITE',
            uid: '12',
            updates: {
              name: 'Luke Skywalker',
            },
          })
        }
      >
        Update Luke
      </button>
      <ul>
        {state.favorites.map((fav: Partial<Character>) => (
          <li key={fav.uid}>{fav.properties?.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe('FavoritesContext', () => {
  test('adds a character to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Luke'));
    expect(screen.getByText('Luke')).toBeInTheDocument();
  });

  test('removes a character from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Remove Luke'));
    expect(screen.queryByText('Luke')).not.toBeInTheDocument();
  });

  test('updates a character in favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Luke'));
    fireEvent.click(screen.getByText('Update Luke'));
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });
});
