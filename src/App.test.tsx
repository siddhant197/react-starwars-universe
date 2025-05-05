import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from './context/FavoritesContext';

const querClient = new QueryClient();

describe('App', () => {
  test('renders CharacterList for root route', () => {
    render(
      <QueryClientProvider client={querClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByPlaceholderText(/search characters.../i)).toBeInTheDocument();
  });

  test('renders CharacterDetails for character route', () => {
    render(
      <QueryClientProvider client={querClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/character/12']}>
            <App />
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/character details/i)).toBeInTheDocument();
  });

  test('renders FavoritesList for favorites route', () => {
    render(
      <QueryClientProvider client={querClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/favorites']}>
            <App />
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/List of your Favorite Characters/i)).toBeInTheDocument();
  });

  test('renders NotFound for any other route', () => {
    render(
      <QueryClientProvider client={querClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/invalidroute']}>
            <App />
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/the page you're looking for doesn't exist/i)).toBeInTheDocument();
  });
});
