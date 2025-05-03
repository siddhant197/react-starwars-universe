import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import CharacterDetails from './pages/CharacterDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders home page', () => {
  render(<App />);
  expect(screen.getByText(/star wars universe/i)).toBeInTheDocument();
});

test('renders CharacterDetails page when navigating to /character/:id', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/character/12']}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/character details/i)).toBeInTheDocument();
});
