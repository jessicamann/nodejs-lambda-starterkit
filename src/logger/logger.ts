import { pino, LoggerOptions as PinoLogOptions, Logger } from "pino";
import { config } from "../config/config";

const localPrettyOutput = config.usePrettyLogger()
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    }
  : {};

const defaultOptions: PinoLogOptions = {
  // configurable
  level: config.logLevel(),
  ...localPrettyOutput,

  // fixed
  messageKey: "message",
  errorKey: "error",
  nestedKey: "payload",
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level: (label) => ({ level: label }),
    bindings: (bindings) => ({ hostname: bindings.hostname }),
  },
};

const initializeLogger = (): Logger => {
  return pino(defaultOptions);
};

export { initializeLogger };
