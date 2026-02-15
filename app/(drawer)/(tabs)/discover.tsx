import { View, FlatList, StyleSheet } from 'react-native';
import { SegmentedButtons, useTheme, ActivityIndicator } from 'react-native-paper';
import { useDiscoverViewModel } from '@/src/presentation/hooks/useDiscoverViewModel';
import { MediaCard } from '@/src/presentation/components/MediaCard';

export default function DiscoverScreen() {
    const { mediaType, setMediaType, mediaList, isLoading, handleMediaPress } = useDiscoverViewModel();
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <SegmentedButtons
                    value={mediaType}
                    onValueChange={(val) => setMediaType(val as 'movie' | 'tv')}
                    buttons={[
                        {
                            value: 'movie',
                            label: 'Movies',
                            icon: 'movie',
                        },
                        {
                            value: 'tv',
                            label: 'TV Shows',
                            icon: 'television',
                        },
                    ]}
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
    listContent: {
        padding: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
