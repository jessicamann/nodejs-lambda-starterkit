import { get } from "env-var";

const config = {
  port: () => get("PORT").required().asPortNumber(),
  environment: () => get("ENVIRONMENT").asString(),
  logLevel: () =>
    get("LOG_LEVEL")
      .default("info")
      .example("Use one of: trace, debug, info, warn, error, fatal")
      .asString(),
  usePrettyLogger: () => get("PRETTY_LOG").default("false").asBool(),
};

export { config };
