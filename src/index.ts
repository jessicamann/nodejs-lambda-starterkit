import { buildServer } from "./server";

const app = buildServer();

if (require.main === module) {
  // starting node app directly
  app.listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3000");
  });
}

// if execute as a lambda
export { app };
