import { renderListWithTemplate } from "./utils.mjs";
import { movieCardTemplate } from "./MovieList.mjs";

export default class MovieSearch {
  constructor(dataSource, listElement, formElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.formElement = formElement;
  }

  init() {
    this.formElement.addEventListener("submit", this.handleSearch.bind(this));
  }

  async handleSearch(event) {
    event.preventDefault();

    const input = this.formElement.querySelector("input");
    const query = input.value.trim();

    if (!query) {
      const movies = await this.dataSource.getPopularMovies();
      this.renderList(movies);
      return;
    }

    const movies = await this.dataSource.searchMovies(query);
    this.renderList(movies);
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