import { tmdbClient } from '../api/client';
import { MediaResponse } from '@/src/domain/entities/media';
import { MediaRepository } from '@/src/domain/repositories/mediaRepository';

export class MediaRepositoryImpl implements MediaRepository {
    async getTrending(timeWindow: 'day' | 'week' = 'day'): Promise<MediaResponse> {
        const response = await tmdbClient.get<MediaResponse>(`/trending/all/${timeWindow}`);
        return response.data;
    }

    async search(query: string, page: number = 1): Promise<MediaResponse> {
        const response = await tmdbClient.get<MediaResponse>('/search/multi', {
            params: { query, page },
        });
        return response.data;
    }

    async getDiscover(type: 'movie' | 'tv', page: number = 1): Promise<MediaResponse> {
        const response = await tmdbClient.get<MediaResponse>(`/discover/${type}`, {
            params: { page },
        });
        return response.data;
    }

    async getDetails(id: number, type: 'movie' | 'tv' | 'person'): Promise<any> {
        const response = await tmdbClient.get(`/${type}/${id}`, {
            params: { append_to_response: 'credits,videos,images' },
        });
        return response.data;
    }
}
