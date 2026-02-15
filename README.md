# TMDB React Native Client

A production-grade React Native application for browsing movies and TV shows using the TMDB API. Built with Expo, TypeScript, Clean Architecture, and Zustand.

## Features

-   **Authentication**: TMDB Login & Guest Mode.
-   **Discovery**: Trending list, Search, and Genre exploration.
-   **Rich Details**: Deep dive into movies, shows, and people.
-   **Dark Mode**: First-class dark theme support.

## Tech Stack

-   **Framework**: React Native (Expo)
-   **Language**: TypeScript
-   **State**: Zustand
-   **Navigation**: Expo Router
-   **UI**: React Native Paper
-   **Network**: Axios
-   **Testing**: Jest, Testing Library

## Setup

1.  Clone the repository.
2.  Copy `.env.example` to `.env` and add your TMDB API Key:
    ```bash
    cp .env.example .env
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the app:
    ```bash
    npm run android    # For Android
    npm run ios        # For iOS
    ```

## Architecture

The app follows Clean Architecture principles:
-   `src/domain`: Business logic
-   `src/data`: API integration & repositories
-   `src/presentation`: UI & State management

## Testing

Run unit tests:
```bash
npm test
```
