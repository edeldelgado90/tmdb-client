import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const tmdbClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_key: API_KEY, // TMDB allows API key in query params
    },
});

tmdbClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
