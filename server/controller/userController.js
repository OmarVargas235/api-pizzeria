const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../config/mailer');
const jwt = require('jsonwebtoken');

module.exports.sanitizeFieldsFormRegister = (req, res, next) => {
	
	req.sanitizeBody('name').escape();
	req.sanitizeBody('lastName').escape();
	req.sanitizeBody('email').escape();
	req.sanitizeBody('password').escape();
	req.sanitizeBody('repeatPassword').escape();

	req.checkBody('name', "El nombre es obligatorio").notEmpty();
	req.checkBody('lastName', "El apellido es obligatorio").notEmpty();
	req.checkBody('email', "El email es obligatorio").isEmail();
	req.checkBody('password', "El password es requerido").notEmpty();
	req.checkBody('repeatPassword', 'El password es diferente').equals(req.body.password);

	const mistake = req.validationErrors();

	if (mistake) {
		
		const messageError = mistake.map(error => error.msg);

		res.status(404).json({
			ok: false,
			message: messageError,
		});

		return;
	}	
	
	next();
}

module.exports.createUser = async (req, res) => {
	
	try {

		const user = new User(req.body);
		const hash = await bcrypt.hash(req.body.password, 12);

		user.password = hash;		
		await user.save();

		res.status(200).json({
			ok: true,
			message: 'Usuario Creado Correctamente',
		});
	
	} catch (error) {
		
		res.status(404).json({
			ok: false,
			message: error.length > 0 ? error : 'Hubo un error',
		});
	}
}

///////////////////////////////////////////////////////////////////////

module.exports.sanitizeFieldsFormSendChangePassword = (req, res, next) => {
	
	req.sanitizeBody('email').escape();

	req.checkBody('email', "El email es obligatorio").isEmail();

	const mistake = req.validationErrors();

	if (mistake) {

		const messageError = mistake[0].msg;

		res.status(404).json({
			ok: false,
			message: messageError,
		});

		return;
	}	

	next();
}

module.exports.sendChangePassword = async (req, res, next) => {

	try {

		const { email } = req.body;
		const userBD = await User.findOne({ email });

		if (!userBD) {

			return res.status(401).json({
				ok: false,
				message: 'Este usuario no existe',
			});
		}

		// Generar token
		const token = jwt.sign({
		  name: userBD.name,
		  lastName: userBD.lastName,
		  email: userBD.email,
		  id: userBD._id,
		}, process.env.SEED, { expiresIn: '5m' });

		// Guarda el token generado en la base de datos
		userBD.tokenURL = token;
		await userBD.save();
		const resetUrl = `http://${req.headers.host}/reset-password/${userBD.tokenURL}`;

		// Enviar email
		await sendEmail({
			email,
			subject: 'Password Reset',
			resetUrl
		});
		
		res.status(200).json({
			ok: true,
			message: 'Revisa la bandeja de entrada de su correo electronico',
		});	
	
	} catch(err) {

		console.log(err);

		res.status(404).json({
			ok: false,
			message: 'A ocurrido un error',
		});	
	}
	
}