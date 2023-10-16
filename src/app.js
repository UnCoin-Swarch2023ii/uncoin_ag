// dotenv
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  // Enable CORS to allow requests from other services within the Docker Compose network
  // Allow all origins
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use("/graphql", expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
}
