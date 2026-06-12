const TMDB_BASE = "https://api.themoviedb.org/3";

const demoMovies = [
  {
    id: 1,
    title: "Sample Movie One",
    poster_path: null,
    release_date: "2024-01-01",
    vote_average: 7.8,
    overview: "This is a sample movie used when the API key is missing.",
    genre_ids: [18],
  },
  {
    id: 2,
    title: "Sample Movie Two",
    poster_path: null,
    release_date: "2024-02-15",
    vote_average: 8.1,
    overview: "This is another sample movie used for testing.",
    genre_ids: [28],
  },
  {
    id: 3,
    title: "Sample Movie Three",
    poster_path: null,
    release_date: "2024-03-20",
    vote_average: 7.4,
    overview: "This is a third sample movie used for testing.",
    genre_ids: [35],
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
      const [page1Response, page2Response, page3Response] = await Promise.all([
        fetch(
          `${TMDB_BASE}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
        ),
        fetch(
          `${TMDB_BASE}/movie/popular?api_key=${this.apiKey}&language=en-US&page=2`
        ),
        fetch(
          `${TMDB_BASE}/movie/popular?api_key=${this.apiKey}&language=en-US&page=3`
        ),
      ]);

      if (!page1Response.ok || !page2Response.ok || !page3Response.ok) {
        throw new Error("Bad response from TMDB");
      }

      const page1 = await page1Response.json();
      const page2 = await page2Response.json();
      const page3 = await page3Response.json();

      return [...page1.results, ...page2.results, ...page3.results];
    } catch (error) {
      console.warn("TMDB did not load, using demo data.", error);
      return demoMovies;
    }
  }

  async getGenres() {
    if (!this.apiKey) return [];

    const response = await fetch(
      `${TMDB_BASE}/genre/movie/list?api_key=${this.apiKey}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Bad response from TMDB");
    }

    const data = await response.json();
    return data.genres;
  }

  async searchMovies(query) {
    if (!this.apiKey) {
      return demoMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      const response = await fetch(
        `${TMDB_BASE}/search/movie?api_key=${this.apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );

      if (!response.ok) {
        throw new Error("Bad response from TMDB");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.warn("TMDB search did not load, using demo data.", error);
      return demoMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  async getMovieById(id) {
    if (!this.apiKey) {
      return demoMovies.find((movie) => String(movie.id) === String(id));
    }

    try {
      const response = await fetch(
        `${TMDB_BASE}/movie/${id}?api_key=${this.apiKey}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Bad response from TMDB");
      }

      return await response.json();
    } catch (error) {
      console.warn("TMDB movie details did not load, using demo data.", error);
      return demoMovies.find((movie) => String(movie.id) === String(id));
    }
  }

  async getTrailer(movieId) {
    if (!this.apiKey) {
      return null;
    }

    try {
      const response = await fetch(
        `${TMDB_BASE}/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Bad response from TMDB");
      }

      const data = await response.json();

      const trailer =
        data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        ) || data.results.find((video) => video.site === "YouTube");

      return trailer ? trailer.key : null;
    } catch (error) {
      console.warn("TMDB trailer did not load.", error);
      return null;
    }
  }
}