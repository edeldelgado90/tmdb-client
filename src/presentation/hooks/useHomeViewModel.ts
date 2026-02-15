import { useState, useEffect, useCallback } from 'react';
import { GetTrendingUseCase } from '@/src/domain/usecases/media/GetTrendingUseCase';
import { Media } from '@/src/domain/entities/media';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export function useHomeViewModel() {
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getTrendingUseCase = new GetTrendingUseCase();

    const fetchTrending = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getTrendingUseCase.execute();
            setMediaList(response.results);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to fetch trending');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchTrending();
    }, [fetchTrending]);

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchTrending();
    };

    const handleMediaPress = (id: number, type: 'movie' | 'tv' | 'person') => {
        router.push(`/details/${type}/${id}`);
    };

    return {
        mediaList,
        isLoading,
        isRefreshing,
        onRefresh,
        handleMediaPress,
    };
}
