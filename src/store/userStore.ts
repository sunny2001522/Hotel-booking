
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      login: (token: string) => set({ token, isLoggedIn: true }),
      logout: () => set({ token: null, isLoggedIn: false }),
    }),
    {
      name: 'user-auth-storage', // local storage 中的 key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
