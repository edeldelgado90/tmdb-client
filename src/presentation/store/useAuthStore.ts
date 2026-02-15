import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '@/src/domain/entities/user'; // Adjust based on alias

interface AuthActions {
    setSessionId: (sessionId: string) => void;
    setUser: (user: User) => void;
    setGuest: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            sessionId: null,
            user: null,
            isGuest: false,

            setSessionId: (sessionId) =>
                set({ sessionId, isAuthenticated: true, isGuest: false }),
            setUser: (user) => set({ user }),
            setGuest: () =>
                set({
                    isAuthenticated: true,
                    isGuest: true,
                    sessionId: null,
                    user: null,
                }),
            logout: () =>
                set({
                    isAuthenticated: false,
                    sessionId: null,
                    user: null,
                    isGuest: false,
                }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
