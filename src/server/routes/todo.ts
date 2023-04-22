import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addANote } from "../../todo/addNewNote";
import { DuplicateNoteError, Note } from "../../todo/types";

type ErrorBody = {
  errors: { message: string }[];
};

const errorMap: { [key: string]: { code: number; message: string } } = {
  DuplicateNoteError: {
    code: 400,
    message: "A note with that name already exists. Please use a unique name.",
  },
};

const toErrorBody = (...msg: string[]) => {
  return { errors: msg.map((m) => ({ message: m })) };
};

const toErrorResposne = (e: any): { code: number; body: ErrorBody } => {
  const errorDetails = errorMap[e.name];
  if (errorDetails) {
    return {
      code: errorDetails.code,
      body: toErrorBody(errorDetails.message),
    };
  }

  throw e;
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
        const { code, body } = toErrorResposne(e);
        response.code(code).send(body);
      }
    },
  );
}
