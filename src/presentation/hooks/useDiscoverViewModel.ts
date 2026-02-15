import { useState, useEffect, useCallback } from 'react';
import { Media } from '@/src/domain/entities/media';
import { MediaRepositoryImpl } from '@/src/data/repositories/mediaRepositoryImpl';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export function useDiscoverViewModel() {
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const mediaRepository = new MediaRepositoryImpl(); // Should use DI or UseCase

    const fetchDiscover = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await mediaRepository.getDiscover(mediaType);
            setMediaList(response.results);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to fetch discover');
        } finally {
            setIsLoading(false);
        }
    }, [mediaType]);

    useEffect(() => {
        fetchDiscover();
    }, [fetchDiscover]);

    const handleMediaPress = (id: number, type: 'movie' | 'tv' | 'person') => {
        router.push(`/details/${type}/${id}`);
    };

    return {
        mediaType,
        setMediaType,
        mediaList,
        isLoading,
        handleMediaPress,
    };
}
