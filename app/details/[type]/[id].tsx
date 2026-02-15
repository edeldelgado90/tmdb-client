import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, useTheme, Surface, Chip } from 'react-native-paper';
import { useMediaDetailsViewModel } from '@/src/presentation/hooks/useMediaDetailsViewModel';
// import { LinearGradient } from 'expo-linear-gradient'; // Removed unused import

export default function DetailsScreen() {
    const { type, id } = useLocalSearchParams();
    const mediaId = Number(id);
    const mediaType = type as 'movie' | 'tv' | 'person';

    const { details, isLoading } = useMediaDetailsViewModel(mediaId, mediaType);
    const theme = useTheme();

    if (isLoading || !details) {
        return (
            <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const backdropUrl = details.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
        : null;

    const posterUrl = details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const title = details.title || details.name;

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: title, headerTransparent: true, headerTintColor: '#fff' }} />
            <ScrollView>
                <View style={styles.backdropContainer}>
                    {backdropUrl && (
                        <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />
                    )}
                    <View style={styles.backdropOverlay} />
                    <View style={styles.posterContainer}>
                        <Image source={{ uri: posterUrl }} style={styles.poster} />
                        <View style={styles.headerInfo}>
                            <Text variant="headlineSmall" style={styles.titleText}>{title}</Text>
                            {details.vote_average > 0 && (
                                <Chip icon="star" style={styles.ratingChip}>{details.vote_average.toFixed(1)}</Chip>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Overview</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{details.overview || 'No overview available.'}</Text>

                    {details.genres && details.genres.length > 0 && (
                        <View style={styles.genres}>
                            {details.genres.map(g => (
                                <Chip key={g.id} style={styles.genreChip} mode="outlined">{g.name}</Chip>
                            ))}
                        </View>
                    )}

                    {details.credits?.cast?.length > 0 && (
                        <>
                            <Text variant="titleMedium" style={styles.sectionTitle}>Cast</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castList}>
                                {details.credits.cast.map(person => (
                                    <Surface key={person.id} style={styles.castCard} elevation={1}>
                                        <Image
                                            source={{ uri: person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Img' }}
                                            style={styles.castImage}
                                        />
                                        <View style={styles.castInfo}>
                                            <Text variant="labelMedium" numberOfLines={1}>{person.name}</Text>
                                            <Text variant="bodySmall" numberOfLines={1} style={{ opacity: 0.7 }}>{person.character}</Text>
                                        </View>
                                    </Surface>
                                ))}
                            </ScrollView>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdropContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    backdropOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    posterContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
        paddingBottom: 24,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ratingChip: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    content: {
        padding: 16,
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
    },
    genreChip: {
        marginRight: 8,
        marginBottom: 8,
    },
    castList: {
        marginTop: 8,
        marginHorizontal: -16,
    },
    castCard: {
        marginLeft: 16,
        width: 100,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginBottom: 16, // Surface elevation shadow need space
    },
    castImage: {
        width: 100,
        height: 150,
        backgroundColor: '#eee',
    },
    castInfo: {
        padding: 4,
    },
});
