import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination component', () => {
  test('renders page info and navigation buttons', () => {
    render(<Pagination />);

    expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
