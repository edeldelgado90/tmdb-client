import { AuthRepository } from '@/src/domain/repositories/authRepository';
import { Session } from '@/src/domain/entities/user';
import { AuthRepositoryImpl } from '@/src/data/repositories/authRepositoryImpl';

export class GuestLoginUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<Session> {
        const session = await this.authRepository.createGuestSession();
        if (!session.success) {
            throw new Error('Failed to create guest session');
        }
        return session;
    }
}
