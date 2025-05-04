import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { vi } from 'vitest';
import * as hook from '../hooks/useCharacters';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '../context/FavoritesContext';

vi.mock('../../hooks/useCharacters');

const useCharacterResponseMockData = {
  characters: [],
  isLoading: false,
  error: '',
  totalPages: 1,
};

const useCharacterResponseMockData1 = {
  isLoading: false,
  error: null,
  characters: [
    { properties: { name: 'Luke Skywalker', gender: '', homeworld: '', url: '' }, uid: '12' },
    { properties: { name: 'Darth Vader', gender: '', homeworld: '', url: '' }, uid: '14' },
  ],
  totalPages: 1,
};

const mockPage1 = {
  characters: [
    { properties: { name: 'Luke Skywalker', gender: '', homeworld: '', url: '' }, uid: '12' },
  ],
  isLoading: false,
  error: null,
  totalPages: 2,
};

const mockPage2 = {
  characters: [
    { properties: { name: 'Darth Vader', gender: '', homeworld: '', url: '' }, uid: '14' },
  ],
  isLoading: false,
  error: null,
  totalPages: 2,
};

const renderWithProviders = () =>
  render(
    <FavoritesProvider>
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    </FavoritesProvider>
  );

describe('CharacterList', () => {
  test('renders loading state', () => {
    renderWithProviders();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders error state', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue({
      ...useCharacterResponseMockData,
      error: 'Error',
    });
    renderWithProviders();

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test('renders no characters found', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue(useCharacterResponseMockData);

    renderWithProviders();
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  test('renders list of characters', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue(useCharacterResponseMockData1);

    renderWithProviders();
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('calls useCharacters with search term based on input', () => {
    const spy = vi.spyOn(hook, 'useCharacters');

    spy.mockReturnValue(useCharacterResponseMockData1);

    renderWithProviders();

    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: 'vader' } });

    expect(spy).toHaveBeenCalledWith('vader', 1, 12);
  });

  test('show next page characters when next is clicked', async () => {
    const useCharactersMock = vi.spyOn(hook, 'useCharacters');

    useCharactersMock.mockImplementation((search, page, limit) => {
      if (page === 1) return mockPage1;
      if (page === 2) return mockPage2;
      return { characters: [], isLoading: false, error: null, totalPages: 2 };
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    });
  });

  test('show prev page characters when prev is clicked', async () => {
    const useCharactersMock = vi.spyOn(hook, 'useCharacters');

    useCharactersMock.mockImplementation((search, page, limit) => {
      if (page === 1) return mockPage1;
      if (page === 2) return mockPage2;
      return { characters: [], isLoading: false, error: null, totalPages: 2 };
    });

    renderWithProviders();

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    });

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });
  });

  test('each character card links to the correct character detail route', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue(useCharacterResponseMockData1);

    renderWithProviders();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/character/12');
    expect(links[1]).toHaveAttribute('href', '/character/14');
  });

  test('does not show pagination when no characters', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue(useCharacterResponseMockData);

    renderWithProviders();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });
});
