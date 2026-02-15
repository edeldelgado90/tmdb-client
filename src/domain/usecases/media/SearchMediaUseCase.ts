import { MediaRepository } from '@/src/domain/repositories/mediaRepository';
import { MediaResponse } from '@/src/domain/entities/media';
import { MediaRepositoryImpl } from '@/src/data/repositories/mediaRepositoryImpl';

export class SearchMediaUseCase {
    private mediaRepository: MediaRepository;

    constructor(mediaRepository: MediaRepository = new MediaRepositoryImpl()) {
        this.mediaRepository = mediaRepository;
    }

    async execute(query: string, page: number = 1): Promise<MediaResponse> {
        if (!query.trim()) {
            return { page: 1, results: [], total_pages: 0, total_results: 0 };
        }
        return this.mediaRepository.search(query, page);
    }
}
