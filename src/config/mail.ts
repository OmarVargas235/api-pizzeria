import nodemailer from 'nodemailer';
import util from 'util';

interface Options {
    email: string;
    subject: string;
    resetUrl: string;
}

const templete = (url: string): string => ( `
	<h1 style="text-align:center; font-family: Arial, Helvetica;">Reestablecer Password</h1>

	<p style="font-family: Arial, Helvetica;">Hola, has solicitado reestablecer tu password, haz click en el siguiente enlace, este enlace es temporal, si se vence es necesario que vuelvas a solicitar otro e-mail.</p>

	<a style="display:block; 
		font-family: Arial, Helvetica;
		padding: 1rem; 
		background-color: #00C897; 
		color:white; 
		text-transform:uppercase; 
		text-align:center;
		text-decoration: none;" 
		href="${url}"
		target="_blank"
	>Resetear Password</a>

	<p style="font-family: Arial, Helvetica;">Si no puedes acceder a este enlace, visita: <a target="_blank" href="${url}">Aqui</a></p>
	<p style="font-family: Arial, Helvetica;">Si no solicitaste este e-mail, puedes ignorarlo</p>
`);

const transport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: 'ov1356270@gmail.com',
		pass: 'dnuayoeqqwywchru',
	},
});

export const sendEmail = async (options: Options): Promise<void> => {

	const optionsEmail = {
		from: 'pizza <noreply@pizza_best.com',
		to: options.email,
		subject: options.subject,
		html: templete(options.resetUrl),
	}

	const sendMail = util.promisify(transport.sendMail);
	await sendMail.call(transport, optionsEmail);
}