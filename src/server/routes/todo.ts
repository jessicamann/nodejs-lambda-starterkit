import { generateSchema } from "@anatine/zod-openapi";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addANote } from "../../todo/addNewNote";
import { DuplicateNoteError, NewNoteSchema, Note } from "../../todo/types";
import { toErrorResponse } from "../infra/errorHandling";

const toNotePresentation = (note: Note) => ({
  id: note.id,
});

export default async function (f: FastifyInstance) {
  f.post(
    "/todo",
    {
      attachValidation: true,
      schema: {
        description: "Add a new note",
        tags: ["todo"],
        body: generateSchema(NewNoteSchema),
        response: {
          201: {
            description: "Successfully added a new note",
            type: "object",
            properties: {
              id: { type: "integer" },
            },
          },
          400: {
            description: "An issue occured with the input.",
            content: {
              "application/json": {
                schema: {
                  $ref: "error#",
                },
              },
            },
          },
        },
      },
    },
    async (_: FastifyRequest, response: FastifyReply) => {
      try {
        const note = addANote({ name: "foo", content: "bar" });
        response.code(201).send(toNotePresentation(note));
      } catch (e) {
        if (e instanceof DuplicateNoteError) {
          response.code(400).send(toErrorResponse(e));
        } else {
          throw e;
        }
      }
    },
  );
}
