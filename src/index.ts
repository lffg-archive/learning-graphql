import { ApolloServer, gql } from 'apollo-server';

interface User {
  id: number;
  name: string;
  username: string;
  age?: number;
}

let DATABASE: User[] = [
  { id: 1, name: 'Luiz Felipe', username: 'lffg', age: 16 }
];

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
    deleteUser(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    user: (_: any, args: { id: number }) => {
      return DATABASE.find(({ id }) => id === args.id);
    },
    users: () => DATABASE
  },
  Mutation: {
    createUser: (_: any, args: User) => {
      const user = { ...args, id: DATABASE.length + 1 };
      DATABASE.push(user);
      return user;
    },
    deleteUser: (_: any, args: { id: number }) => {
      const user = DATABASE.find(({ id }) => id === args.id);
      DATABASE = DATABASE.filter(({ id }) => id !== args.id);
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('🚀', url));
