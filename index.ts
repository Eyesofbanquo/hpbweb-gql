import { ApolloServer, gql } from 'apollo-server';
import { BookAPI } from './api/book.api';

const types = `
  type LiveSearch {
    bucket: String
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
`;

const Query = `
  type Query {
    books(search: String): [LiveSearch]
  }
`;

const typeDefs = gql`
  # Types go here
  ${types}

  # Root query
  ${Query}
`;

const books: [{ id: string; title: string }] = [
  {
    id: '0',
    title: 'Huckleberry',
  },
];

const resolvers = {
  Query: {
    books: async (parent, args, { dataSources }) => {
      const bookAPI = dataSources.bookAPI as BookAPI;

      return bookAPI.getLiveSearchResults(args.search);
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
