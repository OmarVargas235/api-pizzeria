import multer from 'multer';
import sharp from 'sharp';

import { createDirectory } from '@helpers/utils';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const directory = './public/uploads';
        createDirectory(directory);
        
        cb(null, directory);
    },
    filename: (req, file, cb) => {

        const ext: string = file.originalname.split('.').pop() ?? '';
        cb(null, `${Date.now()}.${ext}`);
    },
});

export const uploads = multer({ storage });

export const helperImg = async (filePath: string, fileName: string, size: number): Promise<string> => {
    
    createDirectory('./public/optimize');

    await sharp(filePath)
        .resize(size, size)
        .toFile(`./public/optimize/${fileName}`);

    return fileName;
}