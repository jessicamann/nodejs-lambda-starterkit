import { create, findByName } from "./noteStore";
import { NewNote, Note } from "./types";

const addANote = (note: NewNote): Note => {
  if (findByName(note.name)) {
    throw new Error(`Note with name "${note.name}" already taken.`);
  }

  return create({
    id: 1,
    name: note.name,
    content: note.content,
  });
};

export { addANote };
