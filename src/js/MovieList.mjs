import { renderListWithTemplate } from "./utils.mjs";

export function movieCardTemplate(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  return `
    <li class="movie-card">
      <a class="movie-card__link" href="/movie/index.html?id=${movie.id}">
        <article>
          ${
            poster
              ? `<img src="${poster}" alt="${movie.title}" />`
              : `<div class="poster-fallback">No Image</div>`
          }
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.vote_average || "N/A"}</p>
          <p>${movie.release_date || "Unknown date"}</p>
        </article>
      </a>
    </li>
  `;
}

export default class MovieList {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.movies = [];
  }

  async init() {
    this.movies = await this.dataSource.getPopularMovies();
    this.renderList(this.movies);
  }

  renderList(list) {
    renderListWithTemplate(
      movieCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}