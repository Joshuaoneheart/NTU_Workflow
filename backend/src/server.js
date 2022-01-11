import { GraphQLServer, PubSub } from "graphql-yoga";
import Koa from "koa";
import { ApolloServer, gql } from "apollo-server-koa";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";

import Document from "./resolvers/Document.js";
import Workflow from "./resolvers/Workflow.js";

import DateResolver from "./resolvers/Date.js";
import StatusResolver from "./resolvers/Status.js";


import * as models from "./models/models.js"; //mongo schema

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    //Query,
    // Mutation,
    // Subscription,
    Document,
    // Workflow,

    Date: DateResolver,
    Status: StatusResolver,
  },
  context: {
    models,
    pubSub,
  },
});

// graphQLServer.applyMiddleware({
//   app: server
// });

export default server;