import multer from "multer";
import { AppError } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        callback(new AppError(HTTP_STATUS.BAD_REQUEST, "Only image files are allowed"));
        return;
    }
    callback(null, true);
};

export const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
});
