import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import * as hook from '../hooks/useCharacterDetails';
import { vi } from 'vitest';

vi.mock('../hooks/useCharacterDetails');

const mockCharacterData = {
  character: {
    uid: '1',
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      homeworld: 'Tatooine',
      hair_color: 'black',
      eye_color: 'brown',
    },
  },
  isLoading: false,
  error: '',
};

describe('CharacterDetails', () => {
  test('renders loading icon when fetching details', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue({
      ...mockCharacterData,
      isLoading: true,
    });
    render(
      <MemoryRouter initialEntries={['/character/12']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders error when occurred', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue({
      ...mockCharacterData,
      isLoading: false,
      error: 'Error',
    });
    render(
      <MemoryRouter initialEntries={['/character/12']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  test('renders character details page with character name', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue(mockCharacterData);
    render(
      <MemoryRouter initialEntries={['/character/12']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });
});
