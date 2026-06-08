const TMDB_BASE = "https://api.themoviedb.org/3";

const demoMovies = [
  {
    id: 1,
    title: "Sample Movie One",
    poster_path: null,
    release_date: "2024-01-01",
    vote_average: 7.8,
  },
  {
    id: 2,
    title: "Sample Movie Two",
    poster_path: null,
    release_date: "2024-02-15",
    vote_average: 8.1,
  },
  {
    id: 3,
    title: "Sample Movie Three",
    poster_path: null,
    release_date: "2024-03-20",
    vote_average: 7.4,
  },
];

export default class MovieData {
  constructor() {
    this.apiKey = import.meta.env.VITE_TMDB_API_KEY;
  }

  async getPopularMovies() {
    if (!this.apiKey) {
      return demoMovies;
    }

    try {
      const response = await fetch(
        `${TMDB_BASE}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Bad response from TMDB");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.warn("TMDB did not load, using demo data.", error);
      return demoMovies;
    }
  }
}