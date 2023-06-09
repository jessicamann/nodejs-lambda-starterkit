import path from "path";
import fastify, { FastifyInstance } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";

import openApiConfig from "./openapi/appOptions.json";
import { commonSchemas } from "./openapi/schemas";
import { initializeLogger } from "../logger/logger";
import { config } from "@config";

import { toErrorResponse, AppError, isAppError } from "./infra/errorHandling";

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
  app.register(fastifySwagger, openApiConfig);
  commonSchemas.forEach((s) => app.addSchema(s));

  app.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    ignorePattern: /.*(test).ts/,
    logLevel: "debug",
  });

  app.addHook("preHandler", (req, res, next) => {
    if (req.validationError) {
      res.code(400).send({
        errors: [
          {
            code: `${config.appName()}-V1`,
            message: req.validationError.message,
          },
        ],
      });
    }
    next();
  });

  app.setErrorHandler((err, req, res) => {
    if (isAppError(err)) {
      req.log.warn(err);
      res.code(400).send(toErrorResponse(err as AppError));
    } else {
      req.log.error(err);
      res.code(500).send({
        errors: [
          {
            code: `${config.appName()}-OPS1`,
            message: "Sorry, we screwed up.",
          },
        ],
      });
    }
  });

  return app;
};

export { buildServer };
