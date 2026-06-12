import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";
import MovieSearch from "./MovieSearch.mjs";

const dataSource = new MovieData();
const listElement = document.querySelector(".movie-list");
const searchForm = document.querySelector(".search-form");
const genreSelect = document.querySelector("#genreFilter");

const movieList = new MovieList(dataSource, listElement);
const movieSearch = new MovieSearch(dataSource, listElement, searchForm);

async function init() {
    await movieList.init();
    movieSearch.init();

    const genres = await dataSource.getGenres();

    genres.forEach((genre) => {
        genreSelect.innerHTML += `
      <option value="${genre.id}">
        ${genre.name}
      </option>
    `;
    });

    genreSelect.addEventListener("change", () => {
        const genreId = Number(genreSelect.value);

        if (!genreId) {
            movieList.renderList(movieList.movies);
            return;
        }

        const filtered = movieList.movies.filter((movie) =>
            movie.genre_ids.includes(genreId)
        );

        movieList.renderList(filtered);
    });
}

init();