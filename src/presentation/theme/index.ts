import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const PaperThemeDark = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#BB86FC',
        secondary: '#03DAC6',
        background: '#121212',
        surface: '#1E1E1E',
        error: '#CF6679',
        onBackground: '#FFFFFF',
        onSurface: '#FFFFFF',
    },
};

export const PaperThemeLight = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        error: '#B00020',
        onBackground: '#000000',
        onSurface: '#000000',
        onSurfaceVariant: '#49454F', // Dark grey for placeholders/labels
        outline: '#79747E',
    },
};

export const NavThemeDark = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: PaperThemeDark.colors.primary,
        background: PaperThemeDark.colors.background,
        card: PaperThemeDark.colors.surface,
        text: PaperThemeDark.colors.onSurface,
        border: '#2C2C2C',
        notification: PaperThemeDark.colors.secondary,
    },
};

export const NavThemeLight = {
    ...LightTheme,
    colors: {
        ...LightTheme.colors,
        primary: PaperThemeLight.colors.primary,
        background: PaperThemeLight.colors.background,
        card: PaperThemeLight.colors.surface,
        text: PaperThemeLight.colors.onSurface,
        border: '#E0E0E0',
        notification: PaperThemeLight.colors.secondary,
    },
};
