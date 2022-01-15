import { GraphQLServer, PubSub } from "graphql-yoga";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import Koa from "koa";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";

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
//import {importSchema} from "graphql-import";
dotenv.config();

import { connect } from "./mongo.js";
connect();
//const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);
const schema = loadTypedefsSync(join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = schema.map((schema) => schema.document);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const pubSub = new PubSub();
const server = new ApolloServer({
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
    Date: DateResolver,
    Status: StatusResolver,
  },
  context: {
    db,
    pubSub,
  },
});
const startApollo = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
startApollo();
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT | 5000;

httpServer.listen(port, () => {
  console.log(`The server is up on port ${port}!`);
  console.log(`Graphql Port at ${port} ${server.SubscriptionsPath}`);
});
