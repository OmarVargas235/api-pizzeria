import request from "supertest";
import { prisma } from "@database/prisma.js";
import app from "../../../src/app.js";

describe("GET /stores", () => {
    it("should return stores", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const password = "Password123";
        await request(app).post("/auth/register").send({
            email,
            password,
            name: "Omar",
            lastName: "Vargas",
        });
        const loginResponse = await request(app).post("/auth/login").send({
            email,
            password,
        });
        const accessToken = loginResponse.body.data.accessToken;
        await prisma.store.create({
            data: {
                description: "",
                imageUrl: "",
                name: "Sucursal Centro",
                address: "Calle 1",
            },
        });
        const response = await request(app)
            .get("/store")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.data.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Sucursal Centro",
                    address: "Calle 1",
                }),
            ]),
        );
    });

    it("should return 401 when token is missing", async () => {
        const response = await request(app).get("/store");
        expect(response.status).toBe(401);
    });

    it("should return 401 when token is invalid", async () => {
        const response = await request(app)
            .get("/store")
            .set("Authorization", "Bearer invalid-token");
        expect(response.status).toBe(401);
    });
});

describe("GET /stores/:id", () => {
    it("should return store by id", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const password = "Password123";
        await request(app).post("/auth/register").send({
            email,
            password,
            name: "Omar",
            lastName: "Vargas",
        });
        const loginResponse = await request(app).post("/auth/login").send({
            email,
            password,
        });
        const accessToken = loginResponse.body.data.accessToken;
        const store = await prisma.store.create({
            data: {
                name: "Sucursal Centro",
                address: "Calle 1",
                description: "",
                imageUrl: "",
            },
        });
        const response = await request(app)
            .get(`/store/${store.id}`)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            id: store.id,
            name: "Sucursal Centro",
            address: "Calle 1",
        });
    });

    it("should return 401 when token is missing", async () => {
        const response = await request(app).get("/store/random-id");
        expect(response.status).toBe(401);
    });

    it("should return 401 when token is invalid", async () => {
        const response = await request(app)
            .get("/store/random-id")
            .set("Authorization", "Bearer invalid-token");
        expect(response.status).toBe(401);
    });

    it("should return 404 when store does not exist", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const password = "Password123";
        await request(app).post("/auth/register").send({
            email,
            password,
            name: "Omar",
            lastName: "Vargas",
        });
        const loginResponse = await request(app).post("/auth/login").send({
            email,
            password,
        });
        const accessToken = loginResponse.body.data.accessToken;
        const response = await request(app)
            .get("/store/00000000-0000-0000-0000-000000000000")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
    });
});
