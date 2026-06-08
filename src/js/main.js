import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";

const dataSource = new MovieData();
const listElement = document.querySelector(".movie-list");

const movieList = new MovieList(dataSource, listElement);
movieList.init();