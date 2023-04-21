import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addANote } from "../../todo/addNewNote";
import { Note } from "../../todo/types";

const toNotePresentation = (note: Note) => ({
  id: note.id,
});

export default async function (f: FastifyInstance) {
  f.post("/todo", async (_: FastifyRequest, response: FastifyReply) => {
    const note = addANote({ name: "foo", content: "bar" });
    response.code(201).send(toNotePresentation(note));
  });
}
