import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import * as hook from '../hooks/useCharacterDetails';
import { vi } from 'vitest';

vi.mock('../hooks/useCharacterDetails');

const withRouter = () =>
  render(
    <MemoryRouter initialEntries={['/character/12']}>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>
  );

const mockCharacterData = {
  details: {
    uid: '12',
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      homeworld: 'Tatooine',
      hair_color: 'black',
      eye_color: 'brown',
      url: '',
    },
    films: [],
    starships: [],
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
    withRouter();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders error when occurred', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue({
      ...mockCharacterData,
      isLoading: false,
      error: 'Error',
    });
    withRouter();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  test('renders character details page with character name', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue(mockCharacterData);
    withRouter();

    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });

  test('renders "No details found" when details object is empty', async () => {
    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue({
      ...mockCharacterData,
      details: {},
    });

    withRouter();

    expect(await screen.findByText(/no details found/i)).toBeInTheDocument();
  });

  test('renders films and starships if available', async () => {
    const filmStarshipData = {
      ...mockCharacterData,
      details: {
        ...mockCharacterData.details,
        films: ['A New Hope', 'Empire Strikes Back'],
        starships: ['X-Wing', 'TIE Fighter'],
      },
    };

    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue(filmStarshipData);

    withRouter();

    expect(await screen.findByText(/a new hope/i)).toBeInTheDocument();
    expect(screen.getByText(/x-wing/i)).toBeInTheDocument();
  });

  test('does not render films or starships when empty', async () => {
    const noFilmStarshipData = {
      ...mockCharacterData,
      details: {
        ...mockCharacterData.details,
        films: [],
        starships: [],
      },
    };

    vi.spyOn(hook, 'useCharacterDetails').mockReturnValue(noFilmStarshipData);

    withRouter();

    expect(screen.queryByText(/films:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/starships:/i)).not.toBeInTheDocument();
  });
});
