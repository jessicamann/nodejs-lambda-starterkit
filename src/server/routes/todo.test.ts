import { buildServer } from "../server";

describe("POST /todo", () => {
  it("returns a 201 after successfully creating a new todo note", async () => {
    const server = buildServer({ logger: false });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
    });

    expect(response.statusCode).toEqual(201);
    expect(JSON.parse(response.body)).toEqual({ id: expect.any(Number) });
  });

  it("returns a 400 if the note is a duplicate", async () => {
    const server = buildServer({ logger: false });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
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
});
