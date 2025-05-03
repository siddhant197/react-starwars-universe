import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import * as hook from '../hooks/useCharacterDetails';
import { vi } from 'vitest';

vi.mock('../hooks/useCharacter');

const mockCharacterData = {
  result: {
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      homeworld: 'Tatooine',
      url: 'https://swapi.tech/api/people/1',
    },
  },
};

describe('CharacterDetails', () => {
  test('renders character details page with character name', async () => {
    render(
      <MemoryRouter initialEntries={['/character/12']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });

  test('renders character details from API', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue(mockCharacterData);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });
  });
});
