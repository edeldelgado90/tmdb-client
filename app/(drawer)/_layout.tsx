import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'react-native-paper';

export default function DrawerLayout() {
    const theme = useTheme();

    return (
        <Drawer
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: theme.colors.primary,
                drawerInactiveTintColor: theme.colors.onSurfaceVariant,
                drawerStyle: {
                    backgroundColor: theme.colors.surface,
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: 'Home',
                    title: 'TMDB Client',
                }}
            />
        </Drawer>
    );
}
