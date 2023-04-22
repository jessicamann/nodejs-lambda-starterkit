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

  app.addHook("preHandler", (req, res, next) => {
    if (req.validationError) {
      res
        .code(400)
        .send({ errors: [{ message: req.validationError.message }] });
    }
    next();
  });

  app.setErrorHandler((err, req, res) => {
    req.log.error("request erroring due to uncaught exception", err);
    res.code(500).send({ errors: [{ message: "Sorry, we screwed up." }] });
  });

  return app;
};

export { buildServer };
