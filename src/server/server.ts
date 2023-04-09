import fastify from "fastify";
import fastifySensible from "@fastify/sensible";
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

  app.get("/ping", async (request, response) => {
    response.code(200).send({ ping: "pong" });
  });

  return app;
};

export { buildServer };
