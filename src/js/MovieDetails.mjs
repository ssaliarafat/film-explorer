import Favorites from "./Favorites.mjs";

export default class MovieDetails {
    constructor(movieId, dataSource, containerElement) {
        this.movieId = movieId;
        this.dataSource = dataSource;
        this.containerElement = containerElement;
        this.favorites = new Favorites();
        this.movie = {};
    }

    async init() {
        this.movie = await this.dataSource.getMovieById(this.movieId);
        this.renderMovieDetails();
        this.setFavoriteListener();
        await this.renderTrailer();
    }

    renderMovieDetails() {
        const poster = this.movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
            : "";

        this.containerElement.innerHTML = `
      <article class="movie-detail-card">
        ${poster
                ? `<img class="movie-detail-poster" src="${poster}" alt="${this.movie.title}" />`
                : `<div class="poster-fallback">No Image</div>`
            }

        <div class="movie-detail-info">
          <h1>${this.movie.title}</h1>

          <p><strong>Rating:</strong> ${this.movie.vote_average || "N/A"}</p>

          <p><strong>Release Date:</strong> ${this.movie.release_date || "Unknown"}</p>

          <p><strong>Overview:</strong> ${this.movie.overview || "No description available."
            }</p>

          <button id="favoriteBtn" type="button">
            ${this.favorites.isFavorite(this.movie.id)
                ? "Remove Favorite"
                : "Add to Favorites"
            }
          </button>

          <section class="movie-trailer">
            <h2>Trailer</h2>
            <div id="trailerContainer">Loading trailer...</div>
          </section>
        </div>
      </article>
    `;
    }

    async renderTrailer() {
        const trailerContainer = document.querySelector("#trailerContainer");
        const trailerKey = await this.dataSource.getTrailer(this.movie.id);

        if (trailerKey) {
            trailerContainer.innerHTML = `
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${trailerKey}"
          title="Movie Trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
        } else {
            trailerContainer.innerHTML = "<p>Trailer not found.</p>";
        }
    }

    setFavoriteListener() {
        const favoriteBtn = document.querySelector("#favoriteBtn");

        favoriteBtn.addEventListener("click", () => {
            if (this.favorites.isFavorite(this.movie.id)) {
                this.favorites.removeFavorite(this.movie.id);
                favoriteBtn.textContent = "Add to Favorites";
                alert("Movie removed from favorites!");
            } else {
                this.favorites.addFavorite(this.movie);
                favoriteBtn.textContent = "Remove Favorite";
                alert("Movie added to favorites!");
            }
        });
    }
}