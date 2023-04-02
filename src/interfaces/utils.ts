import { type Response } from "express";

export interface GenerateToken {
    name:  string;
    lastName: string;
    email: string;
    expire?: string;
}

export interface ValidatePassword {
    password:  string;
    passwordBD: string;
    resp: Response;
}