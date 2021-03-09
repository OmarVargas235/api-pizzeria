const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {

	// Autorizacion por el header
	const token = req.get('token');
	const userBD = await User.findOne({ tokenAuth: token });

	if (!token) {

		return res.status(401).json({
			ok: false,
			message: 'No autenticado, no hay JWT',
		});
	}

	try {

		const decoded = jwt.verify(userBD.tokenAuth, process.env.SEED);
		req.user = decoded;
		next();

	} catch(error) {
		
		res.status(401).json({
			ok: false,
			message: 'Su seccion a expirado',
		});
	}
}