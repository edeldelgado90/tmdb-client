export interface RequestToken {
    success: boolean;
    expires_at: string;
    request_token: string;
}

export interface Session {
    success: boolean;
    session_id: string;
}

export interface User {
    id: number;
    username: string;
    name: string;
    include_adult: boolean;
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: string | null;
        };
    };
}

export interface AuthState {
    isAuthenticated: boolean;
    sessionId: string | null;
    user: User | null;
    isGuest: boolean;
}
