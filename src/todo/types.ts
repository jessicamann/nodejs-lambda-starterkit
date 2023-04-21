type NewNote = {
  name: string;
  content: string;
};

type Note = {
  id: number;
  name: string;
  content: string;
};

class DuplicateNoteError extends Error {}

export { NewNote, Note, DuplicateNoteError };
