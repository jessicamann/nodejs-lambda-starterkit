import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastify, { FastifyInstance } from "fastify";
import path from "path";
import { initializeLogger } from "../logger/logger";

type ServerOptions = {
  logger?: boolean;
};

const buildServer = (options: ServerOptions = {}): FastifyInstance => {
  const defaultOptions = {
    logger: options.logger && initializeLogger(),
  };

  const opt = { ...defaultOptions, ...options };
  const app = fastify(opt);

  app.register(fastifySensible);
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "nodejs-lambda-starterkit",
        description: "Testing the Notes API",
        version: "0.1.0",
      },
    },
  });

  app.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    ignorePattern: /.*(test).ts/,
    logLevel: "debug",
  });

  return app;
};

export { buildServer };
