const config = {
  port: () => parseInt(process.env["PORT"]!),
  environment: () => process.env["ENVIRONMENT"],
  logLevel: () => process.env["LOG_LEVEL"],
  usePrettyLogger: () => (process.env["PRETTY_LOG"] === "yes" ? true : false),
};

export { config };
