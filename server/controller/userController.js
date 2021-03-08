const User = require('../models/user');
const bcrypt = require('bcrypt');

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
	
	const user = new User(req.body);
	const hash = await bcrypt.hash(req.body.password, 12);
	user.password = hash;

	try {
		
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