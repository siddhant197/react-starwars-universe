import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './App';

vi.mock('./pages/CharacterList', () => ({
  default: () => <div>CharacterList</div>,
}));

vi.mock('./pages/CharacterDetails', () => ({
  default: () => <div>CharacterDetails</div>,
}));

vi.mock('./pages/FavoritesList', () => ({
  default: () => <div>FavoritesList</div>,
}));

describe('App', () => {
  test('renders CharacterList for root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('CharacterList')).toBeInTheDocument();
  });

  test('renders CharacterDetails for character route', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('CharacterDetails')).toBeInTheDocument();
  });

  test('renders FavoritesList for favorites route', () => {
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('FavoritesList')).toBeInTheDocument();
  });
});
