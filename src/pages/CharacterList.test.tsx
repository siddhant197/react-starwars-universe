import { render, screen, waitFor } from '@testing-library/react';
import CharacterListPage from './CharacterListPage';
import { BrowserRouter } from 'react-router-dom';

test('displays character list from API', async () => {
  render(
    <BrowserRouter>
      <CharacterListPage />
    </BrowserRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument());
});
