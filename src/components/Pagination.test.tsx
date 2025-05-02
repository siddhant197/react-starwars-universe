import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('renders page info and navigation buttons', () => {
    const mockSetPage = vi.fn();
    render(<Pagination page={1} totalPages={5} setPage={mockSetPage} />);

    expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  test('handle prev navigation button click', () => {
    const mockSetPage = vi.fn();
    render(<Pagination page={2} totalPages={5} setPage={mockSetPage} />);

    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
    const prevButton = screen.getByRole('button', { name: /prev/i });

    fireEvent.click(prevButton);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  test('handle next navigation button click', () => {
    const mockSetPage = vi.fn();
    render(<Pagination page={1} totalPages={5} setPage={mockSetPage} />);

    expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(nextButton);
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
