import { Media } from './media';

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface MediaDetails extends Media {
    genres: Genre[];
    runtime?: number;
    episode_run_time?: number[];
    credits: {
        cast: Cast[];
        crew: any[];
    };
    videos: {
        results: Video[];
    };
    homepage?: string;
    status: string;
    tagline?: string;
}
