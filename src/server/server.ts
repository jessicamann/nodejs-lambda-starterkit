import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import fastify from "fastify";
import path from "path";
import { logger } from "../logger/logger";

type ServerOptions = {
  logger?: boolean;
};

const buildServer = (options: ServerOptions = {}) => {
  const defaultOptions = {
    logger: options.logger && logger(),
  };

  const opt = { ...defaultOptions, ...options };
  const app = fastify(opt);

  app.register(fastifySensible);
  app.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    ignorePattern: /.*(test).ts/,
    logLevel: "debug",
  });

  return app;
};

export { buildServer };
