import { render, screen } from '@testing-library/react';
import App from './App';

test('renders something', () => {
  render(<App />);
  expect(screen.getByText(/star wars universe/i)).toBeInTheDocument();
});
