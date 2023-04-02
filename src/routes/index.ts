import express from 'express';
import fs from 'fs';

const router = express.Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string): string => {

    return fileName.split('.').shift() ?? '';
}

fs.readdirSync(pathRouter).filter(file => !file.includes('map')).forEach(file => {

    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);

    if (!skip) {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`).router);
    }
});

export { router };