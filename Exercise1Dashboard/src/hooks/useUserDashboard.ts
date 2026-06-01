import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/userApi';

type SortOrder = 'asc' | 'desc';

export const useUserDashboard = () => {
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((user) =>
        user.name.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
      if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, sortOrder]);

  return {
    users: filteredAndSortedUsers,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    sortOrder,
    handleSort,
  };
};
