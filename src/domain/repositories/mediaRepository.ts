import { MediaResponse } from '../entities/media';

export interface MediaRepository {
    getTrending(timeWindow?: 'day' | 'week'): Promise<MediaResponse>;
    search(query: string, page?: number): Promise<MediaResponse>;
    getDiscover(type: 'movie' | 'tv', page?: number): Promise<MediaResponse>;
    getDetails(id: number, type: 'movie' | 'tv' | 'person'): Promise<any>; // Using any for now or MediaDetails
}
