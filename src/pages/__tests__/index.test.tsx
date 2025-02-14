import { render, screen } from '@testing-library/react';
import Home from '../index';
import axios from 'axios';

// Mock Axios
jest.mock('axios');

describe('Home Page', () => {
  test('renders book list', async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: 'Test Book 1', author: 'Author 1', publicationYear: 2021, description: 'Description' },
        { id: 2, title: 'Test Book 2', author: 'Author 2', publicationYear: 2021, description: 'Description' },
      ],
    });

    render(<Home />);

    // Check if books are displayed
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Test Book 2')).toBeInTheDocument();
  });
});
