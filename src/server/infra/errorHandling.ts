import { config } from "@config";

interface AppError {
  errorCode: string;
  messageForConsumers: string;
}

type ErrorBody = {
  errors: { code: string; message: string }[];
};

const toErrorResponse = (e: AppError): ErrorBody => {
  return {
    errors: [
      {
        code: `${config.appName()}-${e.errorCode}`,
        message: e.messageForConsumers,
      },
    ],
  };
};

export { toErrorResponse, AppError };
