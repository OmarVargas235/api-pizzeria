import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pizzeria API",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./src/**/docs/*.ts", "./src/**/docs/common/*.ts"],
});
