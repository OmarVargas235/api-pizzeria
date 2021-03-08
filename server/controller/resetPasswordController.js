const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.sendEmail = async (req, res) => {
	
	const { token } = req.params;

	const user = await User.findOne({ tokenURL: token });

	try {

		// Verifica si el token de la url esta vencido
		jwt.verify(user.tokenURL, process.env.SEED);
		res.render('reset-password', {
			token,
		});

	} catch {

		res.render('respChangePassword', {
			message: 'Esta url ya no es valida, vuelve a solicitar otro cambio de contraseña'
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

		res.render('respChangePassword', {
			message: messageError
		});

		return;
	}	
	
	next();
}

module.exports.resetPassword = async (req, res) => {
	
	const { url } = req.params;
	
	try {

		// Sobre escribir contraseña de la base de datos

		const user = await User.findOne({ tokenURL: url });
		const hash = await bcrypt.hash(req.body.password, 12);
		user.password = hash;
		user.tokenURL = undefined;

		await user.save();

		res.render('respChangePassword', {
			message: 'Su contraseña se ah cambiado con exito',
			success: true
		});

	} catch(err) {

		console.log('error', err)
		res.render('respChangePassword', {
			message: 'Error!!!!!!!!!!!'
		});
	}
}