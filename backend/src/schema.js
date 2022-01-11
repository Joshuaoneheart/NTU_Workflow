const { gql, makeExecutableSchema } = require('apollo-server');
const AuthService = require('./auth');

const typeDefs = gql`
  type User {
    id: ID
    email: String
  }

  type Query {
    user: User
  }

  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: User
  }
`;

const resolvers = {
  Query: {
    user: (parentValue, args, req) => {
      return req.user;
    }
  },
  Mutation: {
    signup: (parentValue, { email, password }, req) => {
      // request also called 'context'
      return AuthService.signup({ email, password, req });
    },
    login: (parentValue, { email, password }, req) => {
      return AuthService.login({ email, password, req });
    },
    logout: (parentValue, args, req) => {
      const { user } = req;
      req.logout();
      return user;
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});