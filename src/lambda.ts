import awsLambdaFastify from "@fastify/aws-lambda";
import { app } from "./index";

const proxy = awsLambdaFastify(app);

export const api = proxy;
