import { generateSchema } from "@anatine/zod-openapi";
import { ErrorResponseSchema } from "../infra/errorHandling";

// prettier-ignore
export const commonSchemas = [
    {
        "$id": "error",
        ...generateSchema(ErrorResponseSchema),
    },
];
