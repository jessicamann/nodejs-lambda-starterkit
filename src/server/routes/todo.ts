import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addANote } from "../../todo/addNewNote";
import { DuplicateNoteError, Note } from "../../todo/types";

type ErrorBody = {
  errors: { message: string }[];
};

const toErrorResposne = (e: any): { code: number; body: ErrorBody } => {
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
  } else {
    return {
      code: 500,
      body: {
        errors: [
          {
            message: "Something went wrong.",
          },
        ],
      },
    };
  }
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
    async (req: FastifyRequest, response: FastifyReply) => {
      if (req.validationError) {
        response
          .code(400)
          .send({ errors: [{ message: req.validationError.message }] });
      }

      try {
        const note = addANote({ name: "foo", content: "bar" });
        response.code(201).send(toNotePresentation(note));
      } catch (e) {
        const error = toErrorResposne(e);
        response.code(error.code).send(error.body);
      }
    },
  );
}
