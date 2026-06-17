import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json",
            },
        ],
    },
    moduleFileExtensions: ["ts", "js", "json"],
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/**/index.ts"],
    coverageDirectory: "coverage",
    clearMocks: true,
    moduleNameMapper: {
        "^@shared/(.*)\\.js$": "<rootDir>/src/shared/$1",
        "^@features/(.*)\\.js$": "<rootDir>/src/features/$1",
        "^@database/(.*)\\.js$": "<rootDir>/src/database/$1",
        "^@config/(.*)\\.js$": "<rootDir>/src/config/$1",
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};

export default config;
