import { AuthRepository } from '@/src/domain/repositories/authRepository';
import { Session, User } from '@/src/domain/entities/user';
import { AuthRepositoryImpl } from '@/src/data/repositories/authRepositoryImpl';

export class LoginUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
        this.authRepository = authRepository;
    }

    async execute(username: string, password: string): Promise<{ session: Session; user: User }> {
        const requestToken = await this.authRepository.createRequestToken();
        if (!requestToken.success) {
            throw new Error('Failed to create request token');
        }

        const validatedToken = await this.authRepository.validateWithLogin(
            username,
            password,
            requestToken.request_token
        );
        if (!validatedToken.success) {
            throw new Error('Invalid credentials');
        }

        const session = await this.authRepository.createSession(validatedToken.request_token);
        if (!session.success) {
            throw new Error('Failed to create session');
        }

        const user = await this.authRepository.getAccountDetails(session.session_id);

        return { session, user };
    }
}
