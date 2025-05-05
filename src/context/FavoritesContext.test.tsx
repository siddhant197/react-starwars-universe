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
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_FAVORITE',
            uid: '14',
            updates: {
              name: 'Leina',
            },
          })
        }
      >
        Update Leina
      </button>
      <button onClick={() => dispatch({ type: 'NOT_VALID', uid: '12' })}>not valid</button>
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

  test('handles default case action type', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Luke'));
    fireEvent.click(screen.getByText('not valid'));
    expect(screen.getByText('Luke')).toBeInTheDocument();
  });

  test('return character as it is during update if not found', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Luke'));
    fireEvent.click(screen.getByText('Update Leina'));
    expect(screen.getByText('Luke')).toBeInTheDocument();
  });

  test('throws error when useFavorites is used outside of provider', () => {
    const ErrorComponent = () => {
      useFavorites();
      return <div />;
    };

    expect(() => render(<ErrorComponent />)).toThrow(
      'useFavorites must be used within a FavoritesProvider'
    );
  });
});
