import fs from "fs";
import { buildServer } from "./server/server";

const app = buildServer({ logger: false });

(async () => {
  await app.ready();
  const apiSpec = app.swagger();
  fs.writeFileSync("./docs/spec.json", JSON.stringify(apiSpec));
  console.log("docs generated");
})();
