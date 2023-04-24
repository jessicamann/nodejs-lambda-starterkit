import { extendApi } from "@anatine/zod-openapi";
import { config } from "@config";
import { z } from "zod";

const ErrorResponseSchema = extendApi(
  z.object({
    errors: z.array(
      z.object({
        code: extendApi(z.string(), {
          description: "Unique application error code reference",
          example: "TD-1",
        }),
        message: extendApi(z.string(), {
          description: "Detail about the error",
          example: "Required field missing in request: 'foo'",
        }),
      }),
    ),
  }),
  {
    title: "ErrorResponse",
    description: "What went wrong with the request",
  },
);

interface AppError {
  errorCode: string;
  messageForConsumers: string;
}

function isAppError(sourceObj: any): sourceObj is AppError {
  return "messageForConsumers" in sourceObj;
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

export { toErrorResponse, AppError, isAppError, ErrorResponseSchema };
