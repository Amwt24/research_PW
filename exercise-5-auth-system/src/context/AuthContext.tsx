import React, { createContext, useState, useEffect } from 'react';
import type { LoginInput, RegisterInput } from '../schemas/authSchema';

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<User>;
  register: (data: RegisterInput) => Promise<User>;
  updateUserBio: (bio: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'mock_auth_users';
const CURRENT_USER_KEY = 'mock_auth_current_user';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getStoredUsers = (): any[] => {
    const usersStr = localStorage.getItem(USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  };

  const login = async (data: LoginInput): Promise<User> => {
    await delay(1500); // Simulate API latency
    const users = getStoredUsers();
    const foundUser = users.find((u) => u.email === data.email);

    if (!foundUser) {
      throw new Error('User not found. Please register first.');
    }

    if (foundUser.password !== data.password) {
      throw new Error('Incorrect password. Please try again.');
    }

    const sessionUser: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      bio: foundUser.bio || 'This is a premium custom bio.',
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const register = async (data: RegisterInput): Promise<User> => {
    await delay(1500); // Simulate API latency
    const users = getStoredUsers();
    const emailExists = users.some((u) => u.email === data.email);

    if (emailExists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      username: data.username,
      email: data.email,
      password: data.password,
      bio: 'Welcome to your premium dashboard!',
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const sessionUser: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      bio: newUser.bio,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const updateUserBio = async (bio: string): Promise<void> => {
    await delay(1000); // Simulate network latency
    if (!user) throw new Error('Not authenticated');

    const updatedUser = { ...user, bio };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users database as well
    const users = getStoredUsers();
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].bio = bio;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, updateUserBio, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
