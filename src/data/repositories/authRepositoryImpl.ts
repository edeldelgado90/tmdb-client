import { tmdbClient } from '../api/client';
import { RequestToken, Session, User } from '@/src/domain/entities/user';
import { AuthRepository } from '@/src/domain/repositories/authRepository';

export class AuthRepositoryImpl implements AuthRepository {
    async createRequestToken(): Promise<RequestToken> {
        const response = await tmdbClient.get<RequestToken>('/authentication/token/new');
        return response.data;
    }

    async validateWithLogin(username: string, password: string, requestToken: string): Promise<RequestToken> {
        const response = await tmdbClient.post<RequestToken>('/authentication/token/validate_with_login', {
            username,
            password,
            request_token: requestToken,
        });
        return response.data;
    }

    async createSession(requestToken: string): Promise<Session> {
        const response = await tmdbClient.post<Session>('/authentication/session/new', {
            request_token: requestToken,
        });
        return response.data;
    }

    async createGuestSession(): Promise<Session> {
        const response = await tmdbClient.get<Session>('/authentication/guest_session/new');
        return response.data;
    }

    async getAccountDetails(sessionId: string): Promise<User> {
        const response = await tmdbClient.get<User>('/account', {
            params: { session_id: sessionId },
        });
        return response.data;
    }
}
