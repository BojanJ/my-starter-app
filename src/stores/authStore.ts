import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userProfile: { name: string; email: string } | null;
  login: (userProfile: { name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userProfile: null,
  login: (userProfile) => set({ isAuthenticated: true, userProfile }),
  logout: () => set({ isAuthenticated: false, userProfile: null }),
}));
