import { ApolloServer, gql } from 'apollo-server';
import Database from './utils/db';

interface User {
  id: number;
  name: string;
  username: string;
  age?: number;
}

const db = new Database<User>([
  { id: 0, name: 'Luiz Felipe', username: 'lffg', age: 16 }
]);

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    username: String!
    age: Int
  }

  type Query {
    user(id: Int!): User
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, username: String!, age: Int): User!
    deleteUser(id: Int!): Boolean!
  }
`;

const resolvers = {
  Query: {
    user: (_: any, args: { id: number }) => {
      return db.select(({ id }) => id === args.id);
    },
    users: () => db.entries
  },
  Mutation: {
    createUser: (_: any, args: User) => {
      return db.insert({ ...args, id: db.entries.length });
    },
    deleteUser: (_: any, args: { id: number }) => {
      db.delete(({ id }) => id !== args.id);
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('🚀', url));
