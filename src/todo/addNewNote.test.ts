import { addANote } from "./addNewNote";
import { clearAllNotes, findByName } from "./noteStore";

describe("add a new note", () => {
  beforeEach(() => {
    clearAllNotes();
  });

  it("returns a new note", () => {
    const actual = addANote({ name: "foo", content: "my new note" });
    expect(actual).toEqual({
      id: expect.any(Number),
      name: "foo",
      content: "my new note",
    });
  });

  it("does not allow new notes with a name already in a preivous note", () => {
    addANote({ name: "foo", content: "my new note" });

    expect(() =>
      addANote({ name: "foo", content: "my new note" }),
    ).toThrowError('Note with name "foo" already taken.');
  });
});

describe("find existing notes by name", () => {
  beforeEach(() => {
    clearAllNotes();
  });

  it("returns the existing note", () => {
    const note = addANote({ name: "foo", content: "my new note" });

    expect(findByName("foo")).toEqual(note);
  });

  it("return undefined if no note with that name is found", () => {
    addANote({ name: "foo", content: "my new note" });

    expect(findByName("bar")).toBeUndefined();
  });
});
