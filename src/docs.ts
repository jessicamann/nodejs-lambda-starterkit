import fs from "fs";
import { buildServer } from "./server/server";

const app = buildServer({ logger: false });

(async () => {
  await app.ready();
  const what = app.swagger();
  fs.writeFileSync("./docs/spec.json", JSON.stringify(what));
  console.log("docs generated");
})();
