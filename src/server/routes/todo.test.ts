import { buildServer } from "../server";
import { addANote } from "../../todo/addNewNote";
import { DuplicateNoteError } from "../../todo/types";

jest.mock("../../config/config");
jest.mock("../../todo/addNewNote", () => ({
  addANote: jest.fn(),
}));

describe("POST /todo", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns a 201 after successfully creating a new todo note", async () => {
    const server = buildServer({ logger: false });
    (addANote as jest.Mock).mockReturnValue({ id: 1 });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
      payload: {
        name: "foo",
        content: "bar",
      },
    });

    expect(response.statusCode).toEqual(201);
    expect(JSON.parse(response.body)).toEqual({ id: 1 });
  });

  it("returns a 400 if the note is a duplicate", async () => {
    const server = buildServer({ logger: false });
    (addANote as jest.Mock).mockImplementationOnce(() => {
      throw new DuplicateNoteError();
    });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
      payload: {
        name: "foo",
        content: "bar",
      },
    });

    expect(response.statusCode).toEqual(400);
    expect(JSON.parse(response.body)).toEqual({
      errors: [
        {
          message:
            "A note with that name already exists. Please use a unique name.",
        },
      ],
    });
  });

  it("returns a 400 if the payload is missing required fields", async () => {
    const server = buildServer({ logger: false });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
      payload: {},
    });

    expect(response.statusCode).toEqual(400);
    expect(JSON.parse(response.body)).toEqual({
      errors: [
        {
          message: "body must have required property 'name'",
        },
      ],
    });
  });

  it("returns a 500 if an unhandled error occurs", async () => {
    const server = buildServer({ logger: false });
    (addANote as jest.Mock).mockImplementationOnce(() => {
      throw new Error("some unexpected error");
    });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
      payload: {
        name: "foo",
        content: "bar",
      },
    });

    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body)).toEqual({
      errors: [
        {
          message: "Sorry, we screwed up.",
        },
      ],
    });
  });
});
