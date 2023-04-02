import express from 'express';
import cors from 'cors';
import { router } from '@routes/index';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/1.0', router);

app.listen(3000, () => {
    
    console.log('Corriendo en el puerto 3000');
});