import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { AppError } from "../server/infra/errorHandling";

const NewNoteSchema = extendApi(
  z.object({
    name: extendApi(z.string().nonempty(), {
      description: "What you need to do",
    }),
    content: extendApi(z.string(), {
      description: "Detailed information about the task",
    }),
  }),
  {
    title: "NewNote",
    description: "Something to be done",
    examples: [
      {
        name: "Schedule holidays",
        content: "Add to work and personal calendar",
      },
    ],
  },
);

type NewNote = z.infer<typeof NewNoteSchema>;

const NoteSchema = NewNoteSchema.merge(z.object({ id: z.number().positive() }));
type Note = z.infer<typeof NoteSchema>;

class DuplicateNoteError extends Error implements AppError {
  errorCode = "001";
  messageForConsumers =
    "A note with that name already exists. Please use a unique name.";

  constructor(...args: any) {
    super(args);
  }
}

export { NewNote, Note, NewNoteSchema, DuplicateNoteError };
