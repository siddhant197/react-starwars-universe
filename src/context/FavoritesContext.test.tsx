import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

const TestComponent = () => {
  const { state, dispatch } = useFavorites();

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_FAVORITE', uid: '12' })}>Add Luke</button>
      <button onClick={() => dispatch({ type: 'REMOVE_FAVORITE', uid: '12' })}>Remove Luke</button>
      <ul>
        {state.favorites.map((fav: string) => (
          <li key={fav}>{fav}</li>
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
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('removes a character from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Remove Luke'));
    expect(screen.queryByText('12')).not.toBeInTheDocument();
  });
});
