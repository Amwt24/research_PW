import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { UserTable } from '../components/UserTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import React from 'react';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('UserTable Component', () => {
  it('should render loading state initially', () => {
    renderWithClient(<UserTable />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render users after data is fetched', async () => {
    renderWithClient(<UserTable />);
    
    // Esperamos a que los usuarios carguen
    await waitFor(() => {
      expect(screen.getByText('User 01 Name')).toBeInTheDocument();
      expect(screen.getByText('User 02 Name')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
  
  it('should filter users when typing in search input', async () => {
    renderWithClient(<UserTable />);
    
    await waitFor(() => {
      expect(screen.getByText('User 01 Name')).toBeInTheDocument();
    }, { timeout: 2000 });

    const searchInput = screen.getByPlaceholderText('Search users by name...');
    fireEvent.change(searchInput, { target: { value: 'User 01 Name' } });
    
    await waitFor(() => {
      expect(screen.getByText('User 01 Name')).toBeInTheDocument();
      expect(screen.queryByText('User 02 Name')).not.toBeInTheDocument();
    });
  });
});
