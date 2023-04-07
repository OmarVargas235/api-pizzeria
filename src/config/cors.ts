// import { type CorsOptions } from 'cors';

const whiteList = [process.env.FRONTEND_URL];

export const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, options?: boolean) => void) => {

        // Revisar si la peticion  viene de un servidor que esta en la whiteList
		const exists = whiteList.some(dominio => dominio === origin);

		if (exists || origin === undefined) {

			callback(null, true);
		
		} else {

			callback(new Error('No permitido por CORS'), false);
		}
	},
}