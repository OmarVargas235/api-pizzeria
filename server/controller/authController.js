const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.sanitizeFieldsFormLogin = (req, res, next) => {
	
	req.sanitizeBody('email').escape();
	req.sanitizeBody('password').escape();

	req.checkBody('email', "El email es obligatorio").isEmail();
	req.checkBody('password', "El password es requerido").notEmpty();

	const mistake = req.validationErrors();

	if (mistake) {
		
		const messageError = 'Todos los campos son obligatorios';

		res.status(404).json({
			ok: false,
			message: messageError,
		});

		return;
	}	

	next();
}

module.exports.loginUser = async (req, res, next) => {

	const { email, password } = req.body;
	const userBD = await User.findOne({ email });

	// Comprobando que el usuario exista

	if (userBD) {
		
		// Comprueba si las contraseñas son iguales.
		const validatePassword = await bcrypt.compare(password, userBD.password);

		if (validatePassword) {
			
			// Generera token
			const token = jwt.sign({
			  name: userBD.name,
			  lastName: userBD.lastName,
			  email: userBD.email,
			  id: userBD._id,
			}, process.env.SEED, { expiresIn: '10m' });
			
			// Guarda el token generado en la base de datos
			userBD.tokenAuth = token;
			await userBD.save();

			const dataUser = {
				name: userBD.name,
				lastName: userBD.lastName,
				email: userBD.email,
				id: userBD._id,
			}

			res.status(200).json({
				ok: true,
				token,
				dataUser,
			});

		} else {

			res.status(401).json({
				ok: false,
				message: 'La contraseña es incorrecta',
			});
		}

	} else {

		res.status(401).json({
			ok: false,
			message: 'Este usuario no existe',
		});
	}
}

///////////////////////////////////////////////////////////////////////

module.exports.logout = async (req, res) => {
	
	// Autorizacion por el header
	const token = req.get('token');

	const userBD = await User.findOne({ tokenAuth: token });

	// Invalidando el token que se genero al iniciar sesion
	userBD.tokenAuth = undefined;
	userBD.save();	

	res.status(200).json({
		ok: true,
		message: 'Su session, se a cerrado correctamente',
	});
}

// userPizza
// const auth = {
// 	isAuthenticated: true,
// 	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicnViZW4iLCJsYXN0TmFtZSI6InZhcmdhcyIsImVtYWlsIjoicnVsdWd1b21lbEBnbWFpbC5jb20iLCJpZCI6IjYwNDc3NzIwZDg2OThmMWIxODkxZTY1YiIsImlhdCI6MTYxNTI5NzAxMCwiZXhwIjoxNjE1Mjk3NjEwfQ.7wXM8PSj9G6vRa7mOXGOeTNTs8nGnF9YnkofWkB2soQ"
// }