import request from "supertest";
import { jest } from "@jest/globals";
import { prisma } from "@database/prisma.js";
import app from "../../../src/app.js";
import { ERROR_CODES } from "@shared/errors/index.js";

jest.mock("../../../src/shared/email/email.service.js", () => ({
    EmailService: jest.fn().mockImplementation(() => ({
        sendResetPasswordEmail: jest.fn(),
    })),
}));

describe("POST /auth/register", () => {
    it("should register a new user", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const response = await request(app).post("/auth/register").send({
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

    it("should return 409 when email already exists", async () => {
        const email = `test-${Date.now()}@mail.com`;
        await request(app).post("/auth/register").send({
            email,
            password: "Password123",
            name: "Omar",
            lastName: "Vargas",
        });
        const response = await request(app).post("/auth/register").send({
            email,
            password: "Password123",
            name: "Omar",
            lastName: "Vargas",
        });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe(ERROR_CODES.RESOURCE.EMAIL_ALREADY_EXISTS);
        expect(response.body.data).toBeNull();
    });
});

describe("POST /auth/login", () => {
    it("should login successfully", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const password = "Password123";
        await request(app).post("/auth/register").send({
            email,
            password,
            name: "Omar",
            lastName: "Vargas",
        });
        const response = await request(app).post("/auth/login").send({ email, password });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");
        expect(typeof response.body.data.accessToken).toBe("string");
        expect(typeof response.body.data.refreshToken).toBe("string");
    });

    it("should return 401 when email does not exist", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "not-found@mail.com",
            password: "Password123",
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        expect(response.body.data).toBeNull();
    });

    it("should return 401 when password is invalid", async () => {
        const email = `test-${Date.now()}@mail.com`;
        await request(app).post("/auth/register").send({
            email,
            password: "Password123",
            name: "Omar",
            lastName: "Vargas",
        });

        const response = await request(app).post("/auth/login").send({
            email,
            password: "WrongPassword123",
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        expect(response.body.data).toBeNull();
    });
});

describe("POST /refresh-token", () => {
    it("should refresh token successfully", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const password = "Password123";
        await request(app).post("/auth/register").send({
            email,
            password,
            name: "Omar",
            lastName: "Vargas",
        });
        const loginResponse = await request(app).post("/auth/login").send({ email, password });
        const refreshToken = loginResponse.body.data.refreshToken;
        const response = await request(app).post("/auth/refresh-token").send({ refreshToken });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");
        expect(typeof response.body.data.accessToken).toBe("string");
        expect(typeof response.body.data.refreshToken).toBe("string");
    });

    it("should return 401 when refresh token is invalid", async () => {
        const response = await request(app).post("/auth/refresh-token").send({
            refreshToken: "invalid-token",
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN);
        expect(response.body.data).toBeNull();
    });
});

describe("POST /logout", () => {
    it("should logout successfully", async () => {
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
            .post("/auth/logout")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Logout successful");
    });

    it("should invalidate refresh token after logout", async () => {
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
        const refreshToken = loginResponse.body.data.refreshToken;
        await request(app).post("/auth/logout").set("Authorization", `Bearer ${accessToken}`);
        const response = await request(app).post("/auth/refresh-token").send({
            refreshToken,
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN);
    });
});

describe("POST /auth/forgot-password", () => {
    it("should generate reset password token", async () => {
        const email = `test-${Date.now()}@mail.com`;
        await request(app).post("/auth/register").send({
            email,
            password: "Password123",
            name: "Omar",
            lastName: "Vargas",
        });
        const response = await request(app).post("/auth/forgot-password").send({
            email,
        });
        expect(response.status).toBe(200);
    });
});

describe("POST /auth/reset-password", () => {
    it("should reset password successfully", async () => {
        const email = `test-${Date.now()}@mail.com`;
        const oldPassword = "Password123";
        const password = "NewPassword123";
        await request(app).post("/auth/register").send({
            email,
            password: oldPassword,
            name: "Omar",
            lastName: "Vargas",
        });
        await request(app).post("/auth/forgot-password").send({ email });
        const user = await prisma.user.findUnique({
            where: { email },
        });
        const response = await request(app).post("/auth/reset-password").send({
            token: user?.resetToken,
            password,
        });
        expect(response.status).toBe(200);
        const loginResponse = await request(app).post("/auth/login").send({
            email,
            password: password,
        });
        expect(loginResponse.status).toBe(200);
    });

    it("should reject invalid reset token", async () => {
        const response = await request(app).post("/auth/reset-password").send({
            token: "invalid-token",
            password: "NewPassword123",
        });
        expect(response.status).toBe(400);
    });
});
