import { ApolloServer, gql } from 'apollo-server';
import { BookAPI } from './api/book.api';
import { Category } from '@eyesofbanquo/hpbtypes';

const types = gql`
  type Category {
    id: Int
    name: String
  }
  interface Search {
    id: Int
    gqlType: String
    name: String
    rareFind: Boolean
    slug: String
    type: String
    categories: [Category]
  }

  type LiveSearch implements Search {
    gqlType: String
    bucket: String
    categories: [Category]
    by: [String]
    dedupe: String
    id: Int
    name: String
    rareFind: Boolean
    salesRankHpbStore: String
    slug: String
    type: String
    upc: String
  }

  type NormalSearch implements Search {
    gqlType: String
    type: String
    author: String
    categories: [Category]
    description: String
    firstEdition: Boolean
    genre: String
    hpbUsedPrice: Int
    id: Int
    name: String
    publicationDate: String
    rareFind: Boolean
    signed: Boolean
    slug: String
    synopsis: String
  }

  type Product {
    author: String
    categories: [Category]
    description: String
    firstEdition: Boolean
    genre: String
    hpbUsedPrice: Int
    id: Int
    name: String
    publicationDate: String
    rareFind: Boolean
    signed: Boolean
    slug: String
    subtitle: String
    synopsis: String
  }

  type TopSearch implements Search {
    gqlType: String
    type: String
    author: String
    categories: [Category]
    description: String
    firstEdition: Boolean
    genre: String
    hpbUsedPrice: Int
    id: Int
    name: String
    publicationDate: String
    rareFind: Boolean
    signed: Boolean
    slug: String
    subtitle: String
    synopsis: String
  }
`;

const Query = gql`
  input TopSearchInput {
    search: String
    page: String = "0"
    author: String = ""
  }

  input NormalInput {
    search: String
    page: String = "0"
  }

  type Query {
    live(search: String): [Search]
    normal(input: NormalInput): [Search]
    topSearch(input: TopSearchInput): [Search]
  }
`;

const typeDefs = gql`
  # Types go here
  ${types}

  # Root query
  ${Query}
`;

const resolvers = {
  Search: {
    __resolveType: (parent, args) => {
      if (parent.gqlType === 'live') {
        return 'LiveSearch';
      }

      if (parent.gqlType === 'search') {
        return 'NormalSearch';
      }

      if (parent.gqlType === 'top') {
        return 'TopSearch';
      }

      return null;
    },
    categories: (parent, args) => {
      return parent.categories as [Category];
    },
  },
  /* Entry Point */
  Query: {
    live: async (parent, args, { dataSources }) => {
      const bookAPI = dataSources.bookAPI as BookAPI;

      return bookAPI.getLiveSearchResults(args.search);
    },
    normal: async (parent, args, { dataSources }) => {
      const bookAPI = dataSources.bookAPI as BookAPI;
      return bookAPI.getSearchResults({
        searchTerm: args.input.search,
        page: args.input.page,
      });
    },

    topSearch: async (parent, args, { dataSources }) => {
      const bookAPI = dataSources.bookAPI as BookAPI;

      return bookAPI.getTopSearchResults({
        searchTerm: args.input.search,
        author: args.input.author,
        page: args.input.page,
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      bookAPI: new BookAPI(),
    };
  },
});
server.listen().then(({ url }) => {
  console.log(url);
});
