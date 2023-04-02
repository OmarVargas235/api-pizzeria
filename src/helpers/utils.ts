import { type Response } from "express";
import jwt from 'jsonwebtoken';
import { httpError } from "./handleError";
import { type GenerateToken } from "@interfaces/utils";

export const isEmptyObject = (body: object, resp: Response): boolean => {

    const isEmpty = Object.keys(body).length === 0;

    isEmpty && httpError({ resp, err: "Todos los campos son requeridos", status: 400 });

    return isEmpty;
}

export const generateToken = ({ name, lastName, email, expire='10m' }: GenerateToken): string => {

    const token = jwt.sign({
        name,
        lastName,
        email,
    }, process.env.SEED ?? '', { expiresIn: expire });

    return token;
}