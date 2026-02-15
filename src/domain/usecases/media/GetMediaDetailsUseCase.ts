import { MediaRepository } from '@/src/domain/repositories/mediaRepository';
import { MediaDetails } from '@/src/domain/entities/mediaDetails';
import { MediaRepositoryImpl } from '@/src/data/repositories/mediaRepositoryImpl';

export class GetMediaDetailsUseCase {
    private mediaRepository: MediaRepository;

    constructor(mediaRepository: MediaRepository = new MediaRepositoryImpl()) {
        this.mediaRepository = mediaRepository;
    }

    async execute(id: number, type: 'movie' | 'tv' | 'person'): Promise<MediaDetails> {
        const details = await this.mediaRepository.getDetails(id, type);
        return details;
    }
}
