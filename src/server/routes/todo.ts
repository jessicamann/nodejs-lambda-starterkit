import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function (f: FastifyInstance) {
  f.post("/todo", async (_: FastifyRequest, response: FastifyReply) => {
    response.code(201).send({ id: "todo-1" });
  });
}
