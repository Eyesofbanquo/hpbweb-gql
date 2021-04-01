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

    const results = await this.get(`search`, {
      search: searchTerm,
      page: options.page ?? '0',
    });

    const modifiedResults = results.map((result) => {
      return { gqlType: 'search', ...result };
    });

    return modifiedResults;
  }

  async getLiveSearchResults(searchTerm: string) {
    const results = await this.get(`search/live`, {
      search: searchTerm,
    });

    const modifiedResults = results.map((result) => {
      return { gqlType: 'live', ...result };
    });

    return modifiedResults;
  }

  async getTopSearchResults(options: {
    searchTerm: string;
    page?: string;
    author: string;
  }) {
    const { searchTerm, author } = options;

    const results = await this.get(`search/top`, {
      search: searchTerm,
      by: author,
      page: options.page,
    });

    const modifiedResults = results.map((result) => {
      return { gqlType: 'top', ...result };
    });

    return modifiedResults;
  }
}

export { BookAPI };
