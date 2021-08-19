const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.sendEmail = async (req, res) => {
	
	const { token } = req.params;

	try {
		
		const user = await User.findOne({ tokenURL: token });

		// Verifica si el token de la url esta vencido
		jwt.verify(user.tokenURL, process.env.SEED);

	} catch {

		res.status(404).json({
			ok: false,
			message: 'Esta url ya no es valida, vuelve a solicitar otro cambio de contraseña',
		});	
	}
}

///////////////////////////////////////////////////////////////////////

module.exports.sanitizeFieldsFormResetPassword = (req, res, next) => {

	req.sanitizeBody('password').escape();
	req.sanitizeBody('repeatPassword').escape();

	req.checkBody('password', "El password es obligatorio").notEmpty();
	req.checkBody('repeatPassword', "Los passwords son diferentes").equals(req.body.password);

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

module.exports.resetPassword = async (req, res) => {
	
	try {
		
		const { url } = req.params;
		const { password } = req.body;

		// Sobre escribir contraseña de la base de datos
		const user = await User.findOne({ tokenURL: url });
		const hash = await bcrypt.hash(password, 12);
		user.password = hash;
		user.tokenURL = undefined;

		await user.save();

		res.status(200).json({
			ok: true,
			message: 'Su contraseña se ah cambiado con exito',
		});

	} catch(err) {

		console.log('error', err);

		res.status(404).json({
			ok: true,
			message: 'A ocurrido un error',
		});
	}
}