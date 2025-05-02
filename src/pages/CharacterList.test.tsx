import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';
import { BrowserRouter } from 'react-router-dom';

describe('CharacterList', () => {
  test('renders loading state', () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading characters/i)).toBeInTheDocument();
  });
});
