import { LoginUseCase } from '../LoginUseCase';
import { AuthRepository } from '../../../repositories/authRepository';

// Mock repository
const mockAuthRepository: AuthRepository = {
    createRequestToken: jest.fn(),
    validateWithLogin: jest.fn(),
    createSession: jest.fn(),
    createGuestSession: jest.fn(),
    getAccountDetails: jest.fn(),
};

describe('LoginUseCase', () => {
    let loginUseCase: LoginUseCase;

    beforeEach(() => {
        loginUseCase = new LoginUseCase(mockAuthRepository);
        jest.clearAllMocks();
    });

    it('should return session and user on successful login', async () => {
        // Arrange
        const mockRequestToken = { success: true, expires_at: 'now', request_token: 'token123' };
        const mockValidatedToken = { success: true, expires_at: 'now', request_token: 'token123' };
        const mockSession = { success: true, session_id: 'session123' };
        const mockUser = { id: 1, username: 'testuser', name: 'Test User', include_adult: false, avatar: { gravatar: { hash: '' }, tmdb: { avatar_path: '' } } };

        (mockAuthRepository.createRequestToken as jest.Mock).mockResolvedValue(mockRequestToken);
        (mockAuthRepository.validateWithLogin as jest.Mock).mockResolvedValue(mockValidatedToken);
        (mockAuthRepository.createSession as jest.Mock).mockResolvedValue(mockSession);
        (mockAuthRepository.getAccountDetails as jest.Mock).mockResolvedValue(mockUser);

        // Act
        const result = await loginUseCase.execute('testuser', 'password');

        // Assert
        expect(mockAuthRepository.createRequestToken).toHaveBeenCalled();
        expect(mockAuthRepository.validateWithLogin).toHaveBeenCalledWith('testuser', 'password', 'token123');
        expect(mockAuthRepository.createSession).toHaveBeenCalledWith('token123');
        expect(mockAuthRepository.getAccountDetails).toHaveBeenCalledWith('session123');
        expect(result).toEqual({ session: mockSession, user: mockUser });
    });

    it('should throw error if request token creation fails', async () => {
        (mockAuthRepository.createRequestToken as jest.Mock).mockResolvedValue({ success: false });

        await expect(loginUseCase.execute('user', 'pass')).rejects.toThrow('Failed to create request token');
    });
});
