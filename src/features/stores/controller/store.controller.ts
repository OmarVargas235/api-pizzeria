import type { Request, Response } from "express";
import { ok } from "@shared/http/responses.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { StoreService } from "../service/store.service.js";
import { storeParamsSchema } from "../dto/store.params.schema.js";
import { paginationQuerySchema } from "../dto/store.pagination.schema.js";

export class StoreController {
    private readonly storeService = new StoreService();

    getStores = async (req: Request, res: Response) => {
        const { page, limit } = paginationQuerySchema.parse(req.query);
        const stores = await this.storeService.getStores(page, limit);
        return ok(res, stores);
    };

    getStoreById = async (req: Request, res: Response) => {
        const { id } = storeParamsSchema.parse(req.params);
        const store = await this.storeService.getStoreById(id);
        return res.status(HTTP_STATUS.OK).json({ data: store });
    };
}
