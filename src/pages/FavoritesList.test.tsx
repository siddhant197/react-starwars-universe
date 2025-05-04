import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../context/FavoritesContext';
import * as favoritesHook from '../context/FavoritesContext';
import { vi } from 'vitest';
import FavoritesList from './FavoritesList';

const mockData = [
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
];

const addFavoriteMock = vi.fn();
const removeFavoriteMock = vi.fn();

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

  test('renders empty message if no favorites', () => {
    vi.spyOn(favoritesHook, 'useFavorites').mockReturnValue({
      state: { favorites: [] },
      dispatch: vi.fn(),
    });

    renderWithProviders();
    expect(screen.getByText(/No favorites added yet/i)).toBeInTheDocument();
  });

  test('renders favorite characters', () => {
    vi.spyOn(favoritesHook, 'useFavorites').mockReturnValue({
      state: { favorites: mockData },
      dispatch: vi.fn(),
    });

    renderWithProviders();
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    expect(screen.getAllByText(/male/i).length).toBeGreaterThan(0);
  });

  test('clicking "remove" calls useRemoveFavorite', () => {
    vi.spyOn(favoritesHook, 'useFavorites').mockReturnValue({
      state: { favorites: [mockData[0]] },
      dispatch: vi.fn(),
    });

    renderWithProviders();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(removeFavoriteMock).toHaveBeenCalled();
  });

  test('if editable then show input', () => {
    vi.spyOn(favoritesHook, 'useFavorites').mockReturnValue({
      state: { favorites: [mockData[0]] },
      dispatch: vi.fn(),
    });

    renderWithProviders();
    expect(screen.getByDisplayValue(/Luke Skywalker/i)).toBeInTheDocument();
  });
});
