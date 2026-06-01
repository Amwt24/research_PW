export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `usr-${i + 1}`,
  name: `User ${String(i + 1).padStart(2, '0')} Name`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 5 === 0 ? 'Inactive' : 'Active',
}));

export const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 800);
  });
};
