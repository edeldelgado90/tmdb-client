import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, useTheme, ActivityIndicator } from 'react-native-paper';
import { useSearchViewModel } from '@/src/presentation/hooks/useSearchViewModel';
import { MediaCard } from '@/src/presentation/components/MediaCard';

export default function SearchScreen() {
    const { query, setQuery, mediaList, isLoading, handleMediaPress } = useSearchViewModel();
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Searchbar
                    placeholder="Search movies, TV shows..."
                    onChangeText={setQuery}
                    value={query}
                    loading={isLoading}
                    style={styles.searchbar}
                />
            </View>

            {isLoading && mediaList.length === 0 ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={mediaList}
                    renderItem={({ item }) => (
                        <MediaCard media={item} onPress={handleMediaPress} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
    },
    searchbar: {
        elevation: 2,
    },
    listContent: {
        padding: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
