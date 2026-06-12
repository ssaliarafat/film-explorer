import MovieData from "./MovieData.mjs";
import MovieDetails from "./MovieDetails.mjs";
import { getParam } from "./utils.mjs";

const movieId = getParam("id");
const dataSource = new MovieData();
const containerElement = document.querySelector(".movie-detail");

const movieDetails = new MovieDetails(movieId, dataSource, containerElement);
movieDetails.init();