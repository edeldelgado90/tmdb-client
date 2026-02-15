import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Media } from '@/src/domain/entities/media';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MediaCardProps {
    media: Media;
    onPress: (id: number, type: 'movie' | 'tv' | 'person') => void;
}

export function MediaCard({ media, onPress }: MediaCardProps) {
    const theme = useTheme();
    const imageUrl = media.poster_path
        ? `${IMAGE_BASE_URL}${media.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const title = media.title || media.name || 'Unknown';
    const date = media.release_date || media.first_air_date || '';

    return (
        <Pressable
            onPress={() => onPress(media.id, media.media_type)}
            style={({ pressed }) => [styles.container, { opacity: pressed ? 0.9 : 1 }]}
        >
            <Surface style={styles.surface} elevation={1}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.poster}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
                        {title}
                    </Text>
                    {date ? (
                        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                            {new Date(date).getFullYear()}
                        </Text>
                    ) : null}
                    <View style={[styles.badge, { backgroundColor: theme.colors.secondaryContainer }]}>
                        <Text variant="labelSmall" style={{ color: theme.colors.onSecondaryContainer }}>
                            {media.media_type.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </Surface>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        maxWidth: '46%', // 2 columns
    },
    surface: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    poster: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#e1e1e1',
    },
    info: {
        padding: 8,
    },
    title: {
        marginBottom: 4,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 6,
    },
});
