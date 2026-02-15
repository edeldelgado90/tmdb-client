import { RequestToken, Session, User } from '../entities/user';

export interface AuthRepository {
    createRequestToken(): Promise<RequestToken>;
    validateWithLogin(username: string, password: string, requestToken: string): Promise<RequestToken>;
    createSession(requestToken: string): Promise<Session>;
    createGuestSession(): Promise<Session>;
    getAccountDetails(sessionId: string): Promise<User>;
}
