import fastify from "fastify";
import { initializeLogger } from "../logger/logger";

type ServerOptions = {
  logger?: boolean;
};

const buildServer = (options: ServerOptions = {}) => {
  const defaultOptions = {
    logger: options.logger && initializeLogger(),
  };

  const opt = { ...defaultOptions, ...options };
  const app = fastify(opt);

  app.get("/ping", async (request, response) => {
    response.code(200).send({ ping: "pong" });
  });

  return app;
};

export { buildServer };