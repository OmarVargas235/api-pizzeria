import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "1h",
    });
};

export const generateRefreshToken = (userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.verify(token, JWT_SECRET) as { userId: string };
};
