import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import CharacterDetails from './pages/CharacterDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesList from './pages/FavoritesList';

const queryClient = new QueryClient();

describe('App', () => {
  test('renders home page', () => {
    render(<App />);
    expect(screen.getByText(/star wars universe/i)).toBeInTheDocument();
  });

  test('renders CharacterDetails page when navigating to /character/:id', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/character/12']}>
            <Routes>
              <Route path="/*" element={<App />} />
              <Route path="/character/:id" element={<CharacterDetails />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/character details/i)).toBeInTheDocument();
  });

  test('renders FavoritesList page when navigating to /favorites', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/favorites']}>
            <Routes>
              <Route path="/*" element={<App />} />
              <Route path="/favorites" element={<FavoritesList />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/your favorites/i)).toBeInTheDocument();
  });
});
