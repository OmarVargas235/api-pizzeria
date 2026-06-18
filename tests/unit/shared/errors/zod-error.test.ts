import type { z } from "zod";
import { formatZodErrors } from "@shared/errors/index.js";

describe("AuthService", () => {
    it("should format a single zod issue", () => {
        const issues = [{ path: ["email"], message: "Email is required" }] as z.core.$ZodIssue[];
        const result = formatZodErrors(issues);
        expect(result).toEqual({
            email: ["Email is required"],
        });
    });

    it("should group multiple errors for the same field", () => {
        const issues = [
            { path: ["password"], message: "Required" },
            { path: ["password"], message: "Too short" },
        ] as z.core.$ZodIssue[];
        const result = formatZodErrors(issues);
        expect(result).toEqual({
            password: ["Required", "Too short"],
        });
    });

    it("should format nested paths", () => {
        const issues = [
            { path: ["user", "email"], message: "Invalid email" },
        ] as z.core.$ZodIssue[];
        const result = formatZodErrors(issues);
        expect(result).toEqual({
            "user.email": ["Invalid email"],
        });
    });
});
