import request from "supertest";
import app from "../../../src/app.js";

describe("GET /store", () => {
    it("should return stores list", async () => {
        const response = await request(app)
            .get("/store")
            .expect(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("total");
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
