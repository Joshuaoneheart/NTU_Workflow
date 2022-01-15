import { GraphQLServer, PubSub } from "graphql-yoga";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import Document from "./resolvers/Document.js";
import Workflow from "./resolvers/Workflow.js";
import DateResolver from "./resolvers/Date.js";
import StatusResolver from "./resolvers/Status.js";
import ChatBox from "./resolvers/ChatBox.js";
import Message from "./resolvers/Message.js";

import * as db from "./models/models.js"; //mongo schema

import express from "express";
import cors from "cors";
import dotenv from "dotenv-defaults";
import path from "path";
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
dotenv.config();

import { connect } from "./mongo.js";
connect();
//const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);
const schemas = loadTypedefsSync(path.join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = schemas.map((schema) => schema.document);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(
  graphqlUploadExpress({
    maxFileSize: 30000000,
    maxFiles: 20,
  })
);
app.use("/graphql", (req, res, next) => {
  console.log(req.body.query);
  console.log(req.body.variables);
  return next();
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const pubSub = new PubSub();

const httpServer = http.createServer(app);
const schema = makeExecutableSchema({
  typeDefs: gql`
    ${typeDefs[0]}
  `,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Document,
    Workflow,
    ChatBox,
    Message,
    Upload: GraphQLUpload,
    Date: DateResolver,
    Status: StatusResolver,
  },
});
const subscriptionServer = SubscriptionServer.create(
  {
    // This is the `schema` we just created.
    schema,
    execute,
    subscribe,
    onOperation: (message, params, webSocket) => {
      return { ...params, context: { db, pubSub } };
    },
  },
  {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/graphql",
  }
);
const server = new ApolloServer({
  schema,
  context: {
    db,
    pubSub,
  },
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});
const startApollo = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
startApollo();
<<<<<<< HEAD

const port = process.env.PORT | 5000;

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`The server is up on port ${port} ${server.graphqlPath}!`);
  console.log(`Graphql Port at ${port} ${server}`);
=======
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT | 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`The server is up on port ${port}!`);
  console.log(`Graphql Port at ${port} ${server.SubscriptionsPath}`);
>>>>>>> a167c7a (Frontend (#7))
});
