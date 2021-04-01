import { RESTDataSource } from 'apollo-datasource-rest';

class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      'https://8x6i7fbaae.execute-api.us-east-1.amazonaws.com/dev/';
  }

  async getProduct(slug: string) {
    return this.get(`product?slug=${slug}`);
  }

  async getSearchResults(options: { searchTerm: string; page?: string }) {
    const { searchTerm } = options;
    const searchString =
      `search=${searchTerm}` + options.page ? `&page=${options.page}` : '';

    this.get(`search?${searchString}`);
  }

  async getLiveSearchResults(searchTerm: string) {
    this.get(`search/live?search=${searchTerm}`);
  }

  async getTopSearchResults(options: {
    searchTerm: string;
    page?: string;
    author: string;
  }) {
    const { searchTerm, author } = options;
    const searchString =
      `search=${searchTerm}` + `by=${author}` + options.page
        ? `&page=${options.page}`
        : '';

    this.get(`search/top?${searchString}`);
  }
}
