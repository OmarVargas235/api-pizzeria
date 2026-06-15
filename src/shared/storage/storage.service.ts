import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "./cloudinary.js";

export class StorageService {
    uploadAvatar = (fileBuffer: Buffer, userId: string): Promise<UploadApiResponse> => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "pizzeria/users",
                    public_id: userId,
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result!);
                },
            );
            stream.end(fileBuffer);
        });
    };
}
