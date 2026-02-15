import { useState, useEffect, useCallback } from 'react';
import { GetMediaDetailsUseCase } from '@/src/domain/usecases/media/GetMediaDetailsUseCase';
import { MediaDetails } from '@/src/domain/entities/mediaDetails';
import { Alert } from 'react-native';

export function useMediaDetailsViewModel(id: number, type: 'movie' | 'tv' | 'person') {
    const [details, setDetails] = useState<MediaDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMediaDetailsUseCase = new GetMediaDetailsUseCase();

    const fetchDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getMediaDetailsUseCase.execute(id, type);
            setDetails(data);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to load details');
        } finally {
            setIsLoading(false);
        }
    }, [id, type]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    return {
        details,
        isLoading,
        refetch: fetchDetails
    };
}
