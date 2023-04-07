import { type Response } from "express";
import jwt from 'jsonwebtoken';
import { httpError } from "./handleError";
import { type ValidatePassword, type GenerateToken } from "@interfaces/utils";
import fs from 'fs';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";

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

export const createDirectory = (path: string): void => {

    const isDirectory = fs.existsSync(path);
    !isDirectory && fs.mkdirSync(path, {recursive:true});
}

export const validatePassword = async ({ password, passwordBD, resp }: ValidatePassword): Promise<boolean> => {

    const validatePassword = await bcrypt.compare(password, passwordBD);
        
    if (!validatePassword) {
        
        httpError({ resp, err: "Contraseña incorrecta", status: 400 });
        return true;
    }

    return false;
}

export const saveCloudinary = async (fileName: string): Promise<{url: string; id: string}> => {

    try {

        const result = await cloudinary.uploader.upload(`./public/optimize/${fileName}`);
        return { id: result.public_id, url: result.url };
		
    } catch (error) {

        return { id: '', url: '' };
    }
}

export const deleteCloudinary = async (id: string): Promise<void> => {

	await cloudinary.uploader.destroy(id);
}