import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    roots: ["<rootDir>/tests/integration"],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json",
            },
        ],
    },
    moduleFileExtensions: ["ts", "js", "json"],
    moduleNameMapper: {
        "^@shared/(.*)\\.js$": "<rootDir>/src/shared/$1",
        "^@features/(.*)\\.js$": "<rootDir>/src/features/$1",
        "^@database/(.*)\\.js$": "<rootDir>/src/database/$1",
        "^@config/(.*)\\.js$": "<rootDir>/src/config/$1",
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    clearMocks: true,
};

export default config;
