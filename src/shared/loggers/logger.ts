import pino, { type LoggerOptions } from "pino";
import { env } from "@config/env.js";

const isDev = env.NODE_ENV !== "production";
const options: LoggerOptions = {
    level: isDev ? "debug" : "info",
};
if (isDev) {
    options.transport = {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
        },
    };
}

export const logger = pino(options);
