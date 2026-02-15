import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Avatar, useTheme, Surface } from 'react-native-paper';
import { useAuthStore } from '@/src/presentation/store/useAuthStore';
import { router } from 'expo-router';

export default function AccountScreen() {
    const { user, isGuest, logout } = useAuthStore();
    const theme = useTheme();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    logout();
                    router.replace('/');
                }
            },
        ]);
    };

    const username = user?.username || (isGuest ? 'Guest' : 'User');
    const avatarUrl = user?.avatar?.tmdb?.avatar_path
        ? `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`
        : null;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Surface style={styles.header} elevation={1}>
                <View style={styles.avatarContainer}>
                    {avatarUrl ? (
                        <Avatar.Image size={80} source={{ uri: avatarUrl }} />
                    ) : (
                        <Avatar.Icon size={80} icon="account" />
                    )}
                </View>
                <Text variant="headlineSmall" style={styles.username}>{username}</Text>
                {isGuest && <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Guest Session</Text>}
            </Surface>

            <View style={styles.content}>
                <Button
                    mode="outlined"
                    onPress={handleLogout}
                    icon="logout"
                    style={styles.logoutButton}
                    textColor={theme.colors.error}
                >
                    Logout
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 32,
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    username: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    logoutButton: {
        marginTop: 16,
        borderColor: '#CF6679',
    },
});
