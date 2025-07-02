// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, logoutUser, getCurrentUser } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth, setLoading, user } = useAuthStore();
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Query to check current user on app load
  const { isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      setLoading(true);
      const user = await getCurrentUser();
      setAuth(user);
      setLoading(false);
      return user;
    },
    staleTime: Infinity, // User data doesn't usually go stale quickly
    gcTime: Infinity, // Keep user data in cache
    enabled: isAppLoading, // Only run on initial app load
  });

  useEffect(() => {
    if (!isUserLoading) {
      setIsAppLoading(false);
    }
  }, [isUserLoading]);

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      setAuth(data);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); // Invalidate user query
      navigate('/dashboard'); // Navigate to a protected route
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Handle error (e.g., show toast notification)
    },
  });

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setAuth(null);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); // Invalidate user query
      queryClient.clear(); // Clear all Tanstack Query cache on logout (important for multi-user apps)
      navigate('/login'); // Redirect to login page
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return {
    user,
    isAuthenticating: isUserLoading, // Renamed for clarity
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
