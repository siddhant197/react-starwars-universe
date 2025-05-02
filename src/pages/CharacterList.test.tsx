import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { vi } from 'vitest';
import * as hook from '../hooks/useCharacters';

vi.mock('../../hooks/useCharacters');

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
    vi.spyOn(hook, 'useCharacters').mockReturnValue({
      isLoading: false,
      error: null,
      characters: [
        { name: 'Luke Skywalker', uid: '12', url: '' },
        { name: 'Leia Organa', uid: '14', url: '' },
      ],
    });

    render(<CharacterList />);
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/leia organa/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    render(<CharacterList />);
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('renders search bar for finding characters', () => {
    render(<CharacterList />);
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  test('filters characters based on search input', async () => {
    vi.spyOn(hook, 'useCharacters').mockReturnValue({
      isLoading: false,
      error: null,
      characters: [
        { name: 'Luke Skywalker', uid: '12', url: '' },
        { name: 'Darth Vader', uid: '14', url: '' },
      ],
    });

    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(searchInput, { target: { value: 'vader' } });

    expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });
});
