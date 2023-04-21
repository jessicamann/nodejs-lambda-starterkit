import { buildServer } from "../server";

describe("POST /todo", () => {
  it("returns a 201 after successfully creating a new todo note", async () => {
    const server = buildServer({ logger: false });

    const response = await server.inject({
      method: "POST",
      url: "/todo",
    });

    expect(response.statusCode).toEqual(201);
    expect(JSON.parse(response.body)).toEqual({ id: expect.any(String) });
  });
});
