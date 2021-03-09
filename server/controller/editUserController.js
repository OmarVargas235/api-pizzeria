const User = require('../models/user');

module.exports.getUser = async (req, res) => {
	
	const userBD = await User.findOne( { tokenAuth: req.params.token } );
	
	if (!userBD) return res.status(400).json({
		ok: false,
		message: 'A ocurrido un error',
	});

	const data = {
		name: userBD.name,
		lastName: userBD.lastName,
		email: userBD.email,
		id: userBD._id,
	}

	res.status(200).json({
		ok: true,
		img: userBD.img || '',
		data,
	});
}