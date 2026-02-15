import { useAuthViewModel } from '@/src/presentation/hooks/useAuthViewModel';
import { useAuthStore } from '@/src/presentation/store/useAuthStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';

const isWeb = Platform.OS === 'web';

export default function LoginScreen() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        isLoading,
        handleLogin,
        handleGuestLogin,
    } = useAuthViewModel();

    const theme = useTheme();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/(drawer)/(tabs)');
        }
    }, [isAuthenticated]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <Surface style={styles.content} elevation={0}>
                <Text variant="displayMedium" style={[styles.title, { color: theme.colors.primary }]}>
                    TMDB Client
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    Discover Movies & TV Shows
                </Text>

                <View style={styles.form}>
                    <TextInput
                        label="Username"
                        placeholder={isWeb ? 'Username' : undefined}
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        autoCapitalize="none"
                        style={[styles.input, isWeb && styles.inputWeb]}
                        disabled={isLoading}
                    />
                    <TextInput
                        label="Password"
                        placeholder={isWeb ? 'Password' : undefined}
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        style={[styles.input, isWeb && styles.inputWeb]}
                        disabled={isLoading}
                    />

                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        loading={isLoading}
                        disabled={isLoading}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Login
                    </Button>

                    <View style={styles.divider} />

                    <Button
                        mode="outlined"
                        onPress={handleGuestLogin}
                        disabled={isLoading}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Continue as Guest
                    </Button>
                </View>
            </Surface>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 48,
        opacity: 0.7,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    input: {
        marginBottom: 16,
    },
    inputWeb: {
        outlineWidth: 0,
    },
    button: {
        marginTop: 8,
        borderRadius: 8,
    },
    buttonContent: {
        height: 48,
    },
    divider: {
        height: 24,
    },
});
