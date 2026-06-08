import type { z } from "zod";

export type ValidationErrors = Record<string, string[]>;

export const formatZodErrors = (issues: z.core.$ZodIssue[]): ValidationErrors => {
    return issues.reduce<ValidationErrors>((acc, issue) => {
        const field = issue.path.join(".");
        if (!acc[field]) {
            acc[field] = [];
        }
        acc[field].push(issue.message);
        return acc;
    }, {});
};
