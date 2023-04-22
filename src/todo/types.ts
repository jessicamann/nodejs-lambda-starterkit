type NewNote = {
  name: string;
  content: string;
};

type Note = {
  id: number;
  name: string;
  content: string;
};

class DuplicateNoteError extends Error {
  constructor(...args: any) {
    super(args);
    this.name = "DuplicateNoteError";
  }
}

export { NewNote, Note, DuplicateNoteError };
