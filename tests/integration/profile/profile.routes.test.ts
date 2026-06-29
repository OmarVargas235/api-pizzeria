import request from "supertest";
import { prisma } from "@database/prisma.js";
import app from "../../../src/app.js";
import { ERROR_CODES } from "@shared/errors/index.js";

jest.mock("@shared/storage/cloudinary.js", () => ({
    cloudinary: {
        uploader: {
            upload_stream: (
                _options: unknown,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
                callback: Function,
            ) => {
                callback(null, {
                    secure_url: "https://fake-avatar.com/avatar.png",
                });

                return {
                    end: jest.fn(),
                };
            },
        },
    },
}));

describe("GET /profile/me", () => {
    it("should return authenticated user profile", async () => {
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
            .get("/profile/me")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            email,
            firstName: "Omar",
            lastName: "Vargas",
        });
    });

    it("should return 401 when access token is missing", async () => {
        const response = await request(app).get("/profile/me");
        expect(response.status).toBe(401);
    });

    it("should return 401 when access token is invalid", async () => {
        const response = await request(app)
            .get("/profile/me")
            .set("Authorization", "Bearer invalid-token");
        expect(response.status).toBe(401);
    });

    it("should return 404 when user does not exist", async () => {
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
        await prisma.user.delete({ where: { email } });
        const response = await request(app)
            .get("/profile")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
    });
});

describe("PATCH /profile/me", () => {
    it("should update authenticated user profile", async () => {
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
            .patch("/profile/me")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                firstName: "Juan",
                lastName: "Perez",
            });
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject({
            email,
            firstName: "Juan",
            lastName: "Perez",
        });
    });

    it("should return 401 when updating profile without token", async () => {
        const response = await request(app).patch("/profile/me").send({
            firstName: "Juan",
            lastName: "Perez",
        });
        expect(response.status).toBe(401);
    });

    it("should return 400 when profile data is invalid", async () => {
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
            .patch("/profile/me")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ firstName: "" });
        expect(response.status).toBe(400);
    });
});

describe("PATCH /profile/avatar", () => {
    it("should update user avatar", async () => {
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
            .patch("/profile/avatar")
            .set("Authorization", `Bearer ${accessToken}`)
            .attach("avatar", Buffer.from("fake-image"), {
                filename: "avatar.png",
                contentType: "image/png",
            });
        expect(response.status).toBe(200);
        expect(response.body.data.avatarUrl).toBe("https://fake-avatar.com/avatar.png");
    });

    it("should return 400 when avatar file is missing", async () => {
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
            .patch("/profile/avatar")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(ERROR_CODES.FILE.FILE_REQUIRED);
    });

    it("should return 400 when avatar file type is invalid", async () => {
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
            .patch("/profile/avatar")
            .set("Authorization", `Bearer ${accessToken}`)
            .attach("avatar", Buffer.from("fake-pdf"), {
                filename: "document.pdf",
                contentType: "application/pdf",
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Only image files are allowed");
    });

    it("should return 400 when avatar file exceeds size limit", async () => {
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
        const bigFile = Buffer.alloc(6 * 1024 * 1024);
        const response = await request(app)
            .patch("/profile/avatar")
            .set("Authorization", `Bearer ${accessToken}`)
            .attach("avatar", bigFile, {
                filename: "big-image.png",
                contentType: "image/png",
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("File size exceeds the maximum allowed limit");
    });
});
