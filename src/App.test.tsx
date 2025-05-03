import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import CharacterDetails from './pages/CharacterDetails';

test('renders home page', () => {
  render(<App />);
  expect(screen.getByText(/star wars universe/i)).toBeInTheDocument();
});

test('renders CharacterDetails page when navigating to /character/:id', () => {
  render(
    <MemoryRouter initialEntries={['/character/12']}>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/character details/i)).toBeInTheDocument();
});
