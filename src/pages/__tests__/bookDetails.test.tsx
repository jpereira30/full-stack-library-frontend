import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookDetails from '../books/[id]'; // Adjust import based on file structure
import axios from 'axios';
import { useRouter } from 'next/router';

// Mock Axios and Next.js Router
spyOn(axios, 'get'); // Jasmine-style mock for axios
spyOn(useRouter, 'mockImplementation');

describe('Book Details Page', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: { id: '1' },
    }));
  });

  it('displays book details correctly', async () => {
    axios.get.and.returnValue(Promise.resolve({
      data: { id: 1, title: 'Test Book', author: 'Author 1', isbn: '12345', publicationYear: 2021, description: 'A great book' },
    }));

    render(<BookDetails />);

    await waitFor(() => screen.getByText('Test Book'));

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('A great book')).toBeInTheDocument();
  });

  it('fetches AI insights', async () => {
    axios.get.and.returnValue(Promise.resolve({
      data: { insights: 'A catchy summary!' },
    }));

    render(<BookDetails />);

    await waitFor(() => screen.getByText('Test Book'));

    fireEvent.click(screen.getByText('Get AI Insights'));

    await waitFor(() => screen.getByText('A catchy summary!'));

    expect(screen.getByText('A catchy summary!')).toBeInTheDocument();
  });
});
