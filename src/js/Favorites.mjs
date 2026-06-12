const FAVORITES_KEY = "favoriteMovies";

export default class Favorites {
    getFavorites() {
        return JSON.parse(
            localStorage.getItem(FAVORITES_KEY)
        ) || [];
    }

    addFavorite(movie) {
        const favorites = this.getFavorites();

        const exists = favorites.find(
            (item) => item.id === movie.id
        );

        if (!exists) {
            favorites.push(movie);

            localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favorites)
            );
        }
    }

    removeFavorite(movieId) {
        const favorites = this.getFavorites().filter(
            (movie) => movie.id !== movieId
        );

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );
    }

    isFavorite(movieId) {
        return this.getFavorites().some(
            (movie) => movie.id === movieId
        );
    }
}