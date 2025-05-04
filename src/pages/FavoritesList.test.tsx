import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../context/FavoritesContext';
import { vi } from 'vitest';
import FavoritesList from './FavoritesList';
import * as hook from '../hooks/useFavoriteCharacters';

const addFavoriteMock = vi.fn();
const removeFavoriteMock = vi.fn();

vi.mock('../../hooks/useFavoriteCharacters');
vi.mock('../hooks/useFavorites', () => ({
  useAddFavorite: vi.fn(() => addFavoriteMock),
  useRemoveFavorite: vi.fn(() => removeFavoriteMock),
}));

const renderWithProviders = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <FavoritesList />
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

describe('FavoritesList', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('displays loading state', () => {
    vi.spyOn(hook, 'useFavoriteCharacters').mockReturnValue({
      characters: [],
      isLoading: true,
      error: null,
    });

    renderWithProviders();
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('displays error message', () => {
    vi.spyOn(hook, 'useFavoriteCharacters').mockReturnValue({
      characters: [],
      isLoading: false,
      error: 'Something went wrong',
    });

    renderWithProviders();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders empty message if no favorites', () => {
    vi.spyOn(hook, 'useFavoriteCharacters').mockReturnValue({
      characters: [],
      isLoading: false,
      error: null,
    });

    renderWithProviders();
    expect(screen.getByText(/No favorites added yet/i)).toBeInTheDocument();
  });

  test('renders favorite characters', () => {
    vi.spyOn(hook, 'useFavoriteCharacters').mockReturnValue({
      characters: [
        {
          uid: '1',
          properties: {
            name: 'Luke Skywalker',
            gender: 'male',
            homeworld: '',
            url: '',
          },
        },
        {
          uid: '2',
          properties: {
            name: 'Darth Vader',
            gender: 'male',
            homeworld: '',
            url: '',
          },
        },
      ],
      isLoading: false,
      error: null,
    });

    renderWithProviders();
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    expect(screen.getAllByText(/male/i).length).toBeGreaterThan(0);
  });

  test('clicking "remove" calls useRemoveFavorite', () => {
    vi.spyOn(hook, 'useFavoriteCharacters').mockReturnValue({
      characters: [
        {
          uid: '1',
          properties: {
            name: 'Luke Skywalker',
            gender: 'male',
            homeworld: '',
            url: '',
          },
        },
      ],
      isLoading: false,
      error: null,
    });

    renderWithProviders();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(removeFavoriteMock).toHaveBeenCalled();
  });
});
