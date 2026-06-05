import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";

export default tseslint.config(
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "eslint.config.js",
            "prisma.config.ts",
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    {
        files: ["src/**/*.ts"],

        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },

        plugins: {
            prettier: prettierPlugin,
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/no-misused-promises": "error",

            "prefer-const": "error",
            "no-var": "error",
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],

            "no-console": [
                "warn",
                { allow: ["warn", "error"] }
            ],

            "no-debugger": "error",
            "no-duplicate-imports": "error",
            "no-return-await": "error",
            "object-shorthand": "error",

            "prettier/prettier": "warn",
        },
    },

    // 👇 ESTA ES LA FORMA CORRECTA
    prettier
);
