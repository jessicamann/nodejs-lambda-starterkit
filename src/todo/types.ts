import { AppError } from "../server/infra/errorHandling";

type NewNote = {
  name: string;
  content: string;
};

type Note = {
  id: number;
  name: string;
  content: string;
};

class DuplicateNoteError extends Error implements AppError {
  errorCode = "001";
  messageForConsumers =
    "A note with that name already exists. Please use a unique name.";

  constructor(...args: any) {
    super(args);
  }
}

export { NewNote, Note, DuplicateNoteError };
