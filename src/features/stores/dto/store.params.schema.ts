import { z } from "zod";

export const storeParamsSchema = z.object({
    id: z.uuid(),
});

export type StoreParamsDto = z.infer<typeof storeParamsSchema>;
