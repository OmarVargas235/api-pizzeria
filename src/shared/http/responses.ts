import type { Response } from "express";

import { HTTP_STATUS } from "./status.js";
import type { ApiResponse } from "./type.js";

export const ok = <T>(res: Response, data: T, message = "Success") => {
    const response: ApiResponse<T> = {
        message,
        data,
    };
    return res.status(HTTP_STATUS.OK).json(response);
};

export const created = <T>(res: Response, data: T, message = "Created") => {
    const response: ApiResponse<T> = {
        message,
        data,
    };
    return res.status(HTTP_STATUS.CREATED).json(response);
};

export const noContent = (res: Response) => {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
};
