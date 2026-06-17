import { Readable } from "stream";

export const createUser = () => ({
    id: "user-1",
    email: "test@gmail.com",
    password: "",
    firstName: "pepito",
    lastName: "perez",
    avatarUrl: null,
    refreshToken: null,
    resetToken: null,
    resetTokenExpiry: null,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const createFileAvatar = () => ({
    fieldname: "avatar",
    originalname: "avatar.jpg",
    encoding: "7bit",
    mimetype: "image/jpeg",
    size: 1024,
    destination: "uploads",
    filename: "avatar.jpg",
    path: "uploads/avatar.jpg",
    buffer: Buffer.from("fake-image"),
    stream: new Readable({ read() {} }),
});
