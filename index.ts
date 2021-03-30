import { ApolloServer, gql } from 'apollo-server';

const types = `
  type Book {
    id: ID
    title: String
  }
`;

const Query = `
  type Query {
    books: [Book]
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
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(url);
});
