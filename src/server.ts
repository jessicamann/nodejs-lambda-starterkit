import fastify from "fastify";

const defaultOptions: ServerOptions = {
  logger: true,
};

type ServerOptions = {
  logger?: boolean;
};

const buildServer = (options: ServerOptions = {}) => {
  const opt = { ...defaultOptions, ...options };
  const app = fastify(opt);

  app.get("/ping", async (request, response) => {
    response.code(200).send({ ping: "pong" });
  });

  return app;
};

export { buildServer };
