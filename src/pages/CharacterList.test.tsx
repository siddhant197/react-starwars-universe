import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { vi } from 'vitest';
import * as hook from '../hooks/useCharacters';
import * as api from '../api/fetchCharacters';

vi.mock('../../hooks/useCharacters');
vi.mock('../../api/fetchCharacters');

const mockData = {
  isLoading: false,
  error: null,
  characters: [
    { properties: { name: 'Luke Skywalker', gender: '', homeworld: '', url: '' }, uid: '12' },
    { properties: { name: 'Darth Vader', gender: '', homeworld: '', url: '' }, uid: '14' },
  ],
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

describe('CharacterList', () => {
  test('renders loading state', () => {
    render(<CharacterList />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders error state', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue({
      characters: [],
      isLoading: false,
      error: 'Error',
    });
    render(<CharacterList />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test('renders no characters found', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue({
      isLoading: false,
      error: null,
      characters: [],
    });

    render(<CharacterList />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  test('renders list of characters', () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue(mockData);

    render(<CharacterList />);
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    render(<CharacterList />);
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    render(<CharacterList />);
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('calls useCharacters with search term based on input', () => {
    const spy = vi.spyOn(hook, 'useCharacters');

    spy.mockReturnValue({
      characters: [],
      isLoading: false,
      error: null,
    });

    render(<CharacterList />);

    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: 'vader' } });

    expect(spy).toHaveBeenCalledWith('vader');
  });

  test('show next page characters when next is clicked', async () => {
    const useCharactersMock = vi.spyOn(hook, 'useCharacters');

    useCharactersMock.mockReturnValueOnce(mockPage1);

    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });

    useCharactersMock.mockReturnValueOnce(mockPage2);
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    });
  });

  test('show prev page characters when prev is clicked', async () => {
    const useCharactersMock = vi.spyOn(hook, 'useCharacters');

    useCharactersMock.mockReturnValueOnce(mockPage2);

    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
    });

    useCharactersMock.mockReturnValueOnce(mockPage1);
    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });
  });
});
