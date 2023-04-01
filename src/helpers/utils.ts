import { type Response } from "express";
import { httpError } from "./handleError";

export const isEmptyObject = (body: object, resp: Response): boolean => {

    const isEmpty = Object.keys(body).length === 0;

    isEmpty && httpError({ resp, err: "Todos los campos son requeridos", status: 400 });

    return isEmpty;
}