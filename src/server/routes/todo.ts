import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addANote } from "../../todo/addNewNote";
import { DuplicateNoteError, Note } from "../../todo/types";

type ErrorBody = {
  errors: { message: string }[];
};

const toErrorResposne = (e: any): { code: number; body: ErrorBody } | Error => {
  if (e instanceof DuplicateNoteError) {
    return {
      code: 400,
      body: {
        errors: [
          {
            message:
              "A note with that name already exists. Please use a unique name.",
          },
        ],
      },
    };
  }

  return e;
};

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
        body: {
          type: "object",
          required: ["name", "content"],
          properties: {
            name: { type: "string" },
            content: { type: "string" },
          },
        },
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
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
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
        const error = toErrorResposne(e);
        if (error instanceof Error) {
          throw error;
        }
        response.code(error.code).send(error.body);
      }
    },
  );
}
