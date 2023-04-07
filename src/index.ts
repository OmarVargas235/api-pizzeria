import express from 'express';
import cors from 'cors';
import { router } from '@routes/index';
import dotenv from 'dotenv';
import path from 'path';
import '@config/cloudinary';
import { corsOptions } from '@config/cors';

dotenv.config();

const app = express();

app.use( cors(corsOptions) );
app.use(express.json());

app.use('/api/1.0', router);

app.use(express.static( path.resolve(__dirname, '../public/assets/') ));
app.use(express.static( path.resolve(__dirname, '../public/optimize/') ));

app.listen(process.env.PORT, () => {
    
    console.log('Corriendo en el puerto', process.env.PORT);
});