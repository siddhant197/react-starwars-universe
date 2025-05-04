import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../context/FavoritesContext';
import * as favoritesHook from '../context/FavoritesContext';
import { vi } from 'vitest';
import FavoritesList from './FavoritesList';
import * as favoritesHooksModule from '../hooks/useFavorites';

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
const updateFavoriteMock = vi.fn();

vi.mock('../hooks/useFavorites', () => ({
  useAddFavorite: vi.fn(() => addFavoriteMock),
  useRemoveFavorite: vi.fn(() => removeFavoriteMock),
  useUpdateFavorite: vi.fn(() => updateFavoriteMock),
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
    const updateFavoriteMock = vi.fn();

    vi.spyOn(favoritesHook, 'useFavorites').mockReturnValue({
      state: { favorites: [mockData[0]] },
      dispatch: vi.fn(),
    });

    vi.mocked(favoritesHooksModule.useUpdateFavorite).mockReturnValue(updateFavoriteMock);

    renderWithProviders();

    const genderInput = screen.getByDisplayValue('male') as HTMLInputElement;
    fireEvent.change(genderInput, { target: { value: 'female' } });
    fireEvent.blur(genderInput);

    expect(updateFavoriteMock).toHaveBeenCalledWith('1', { gender: 'female' });
  });
});
