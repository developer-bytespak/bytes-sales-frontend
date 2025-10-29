"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserFormData } from '@/types/user';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserFormData>) => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async () => {
    // Redirect to backend Google OAuth - backend will handle the redirect
    router.push('http://localhost:4000/auth/google');
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post('http://localhost:4000/auth/logout');
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state
      setUser(null);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Get user error:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data: Partial<UserFormData>) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await api.patch(`/users/${user.id}`, data);
      setUser(response.data);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        login,
        logout,
        updateUser,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
