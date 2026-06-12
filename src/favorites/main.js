import Favorites from "../js/Favorites.mjs";

const favorites = new Favorites();

const listElement =
    document.querySelector(".favorite-list");

const movies = favorites.getFavorites();

if (movies.length === 0) {
    listElement.innerHTML =
        "<p>No favorite movies yet.</p>";
} else {
    listElement.innerHTML = movies
        .map((movie) => {
            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "";

            return `
        <li class="favorite-card">
          ${poster
                    ? `<img src="${poster}" alt="${movie.title}" />`
                    : ""
                }

          <h3>${movie.title}</h3>

          <p>
            Rating:
            ${movie.vote_average}
          </p>

          <button
            class="remove-btn"
            data-id="${movie.id}"
          >
            Remove
          </button>
        </li>
      `;
        })
        .join("");

    document
        .querySelectorAll(".remove-btn")
        .forEach((button) => {
            button.addEventListener("click", () => {
                favorites.removeFavorite(
                    Number(button.dataset.id)
                );

                location.reload();
            });
        });
}