import { Note } from "./types";

let store = new Map();

const create = (note: Note): Note => {
  store.set(note.name, note);
  return note;
};

const findByName = (name: string): Note | undefined => {
  return store.get(name);
};

const clearAllNotes = () => {
  store = new Map();
};

export { create, findByName, clearAllNotes };
