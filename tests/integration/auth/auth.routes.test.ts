import request from "supertest";
import app from "../../../src/app.js";

describe("POST /auth/register", () => {
    it("should register a new user", async () => {
        const email = `test-${Date.now()}@mail.com`;

        const response = await request(app)
            .post("/auth/register")
            .send({
                email,
                password: "Password123",
                name: "Omar",
                lastName: "Vargas",
            });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("data");

        expect(response.body.data).toMatchObject({
            email,
            firstName: "Omar",
            lastName: "Vargas",
        });
    });
});