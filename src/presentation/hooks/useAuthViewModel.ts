import { debugLog, debugError } from '@/src/config/debug';
import { GuestLoginUseCase } from '@/src/domain/usecases/auth/GuestLoginUseCase';
import { LoginUseCase } from '@/src/domain/usecases/auth/LoginUseCase';
import { useAuthStore } from '@/src/presentation/store/useAuthStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export function useAuthViewModel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { setSessionId, setUser, setGuest } = useAuthStore();
    const router = useRouter();

    const loginUseCase = new LoginUseCase();
    const guestLoginUseCase = new GuestLoginUseCase();

    const handleLogin = async () => {
        debugLog('Login', 'handleLogin called', { username: username ? '***' : '' });
        if (!username || !password) {
            showError('Error', 'Please enter username and password');
            return;
        }

        try {
            setIsLoading(true);
            debugLog('Login', 'Executing login...');
            const { session, user } = await loginUseCase.execute(username, password);
            setSessionId(session.session_id);
            setUser(user);
            debugLog('Login', 'Login success, navigating to drawer');
            router.replace('/(drawer)/(tabs)');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Something went wrong';
            debugError('Login', 'Login failed', error);
            showError('Login Failed', message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        debugLog('GuestLogin', 'handleGuestLogin called');
        try {
            setIsLoading(true);
            debugLog('GuestLogin', 'Creating guest session...');
            await guestLoginUseCase.execute();
            setGuest();
            debugLog('GuestLogin', 'Guest session OK, navigating to drawer');
            router.replace('/(drawer)/(tabs)');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Something went wrong';
            debugError('GuestLogin', 'Guest login failed', error);
            showError('Guest Login Failed', message);
        } finally {
            setIsLoading(false);
        }
    };

    function showError(title: string, message: string): void {
        if (Platform.OS === 'web') {
            window.alert(`${title}: ${message}`);
        } else {
            Alert.alert(title, message);
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        isLoading,
        handleLogin,
        handleGuestLogin,
    };
}
