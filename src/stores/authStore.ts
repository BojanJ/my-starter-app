import { create } from 'zustand';

interface UserData {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean; // Add loading state for initial check
  setAuth: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true, // Start as true for initial check
  setAuth: (user) => set({ isAuthenticated: !!user, user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
