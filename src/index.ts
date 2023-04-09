import { config } from "./config/config";
import { buildServer } from "./server/server";

const app = buildServer({ logger: true });

if (require.main === module) {
  // starting node app directly
  const port = config.port();

  app.listen({ port }, (err) => {
    if (err) console.error(err);
    console.log(`server listening on ${port}`);
  });
}

// if execute as a lambda
export { app };
