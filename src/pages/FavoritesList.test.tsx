import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../context/FavoritesContext';
import { vi } from 'vitest';
import FavoritesList from './FavoritesList';
import * as hook from '../hooks/useFavoriteCharacters';

vi.mock('../../hooks/useFavoriteCharacters');

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
});
