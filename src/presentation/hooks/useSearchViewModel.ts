import { useState, useCallback, useEffect } from 'react';
import { SearchMediaUseCase } from '@/src/domain/usecases/media/SearchMediaUseCase';
import { Media } from '@/src/domain/entities/media';
// import debounce from 'lodash/debounce'; // Removed unused import
import { Alert } from 'react-native';
import { router } from 'expo-router';

// Simple debounce implementation since I shouldn't rely on lodash being installed unless I install it
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function useSearchViewModel() {
    const [query, setQuery] = useState('');
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    const searchMediaUseCase = new SearchMediaUseCase();

    useEffect(() => {
        if (debouncedQuery) {
            performSearch(debouncedQuery);
        } else {
            setMediaList([]);
        }
    }, [debouncedQuery]);

    const performSearch = async (searchTerm: string) => {
        try {
            setIsLoading(true);
            const response = await searchMediaUseCase.execute(searchTerm);
            setMediaList(response.results);
        } catch (error: any) {
            console.error(error);
            // Optional: Show error only if critical
        } finally {
            setIsLoading(false);
        }
    };

    const handleMediaPress = (id: number, type: 'movie' | 'tv' | 'person') => {
        router.push(`/details/${type}/${id}`);
    }

    return {
        query,
        setQuery,
        mediaList,
        isLoading,
        handleMediaPress,
    };
}
