import { MediaRepository } from '@/src/domain/repositories/mediaRepository';
import { MediaResponse } from '@/src/domain/entities/media';
import { MediaRepositoryImpl } from '@/src/data/repositories/mediaRepositoryImpl';

export class GetTrendingUseCase {
    private mediaRepository: MediaRepository;

    constructor(mediaRepository: MediaRepository = new MediaRepositoryImpl()) {
        this.mediaRepository = mediaRepository;
    }

    async execute(timeWindow: 'day' | 'week' = 'day'): Promise<MediaResponse> {
        return this.mediaRepository.getTrending(timeWindow);
    }
}
