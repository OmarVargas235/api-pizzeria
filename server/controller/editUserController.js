const User = require('../models/user');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

module.exports.selectImage = (req, res) => {

	const id = req.params.id;
	
	if (!req.files) {

		return res.status(400).json({
			ok: false,
			message: 'No se a seleccionado ningun archivo',
		})
	}

	const file = req.files['img-user'];
	const name = file.name.split('.')[0];
	const extension = file.name.split('.')[1];
	
	// Extensiones validas
	const extensionsValid = ['png', 'jpg', 'jpeg'];
	
	// Validar que la extension sea valida
	if (!extensionsValid.includes(extension)) {

		return res.status(400).json({
			ok: false,
			message: 'Las extensiones permitidas son ' + extensionsValid.join(', '),
		});
	}

	// Cambiar nombre al archivo
	const nameFile = `${name}-${shortid.generate()}.${extension}`;

	// Path de la carpeta publica donde se guardan las imagenes
	const uploads = path.resolve(__dirname, `../../public/uploads/`);
	
	file.mv(`${uploads}/${nameFile}`, async function(err) {

	    if (err){
	      	return res.status(500).json({
				ok: false,
				err
			});
	    }
		
		const userBD = await User.findById( id );
		const pathImage = path.resolve(__dirname, `../../public/uploads/${userBD.img}`);
		
		// Si el usuario previamente ya tiene una imagen la borra y guarda la nueva
		if (fs.existsSync(pathImage)) fs.unlinkSync(pathImage);

		userBD.img = nameFile;
		await userBD.save();

		res.status(200).json({
			ok: true,
			img: userBD.img,
			message: 'Imagen cambiada con exito',
		});
  	});
}

/////////////////////////////////////////////////////////////////////////

module.exports.sanitizeFieldsFormEditUser = (req, res, next) => {
	
	req.sanitizeBody('name').escape();
	req.sanitizeBody('lastName').escape();

	req.checkBody('name', "El nombre es obligatorio").notEmpty();
	req.checkBody('lastName', "El apellido es obligatorio").notEmpty();

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


module.exports.editUser = async (req, res) => {
	
	const { name, lastName } = req.body;
	const id = req.params.id;

	const userBD = await User.findById( id );

	if (!userBD) return res.status(404).json({
		ok: false,
		message: 'Este usuario no existe',
	});

	// Cambiando el nombre y el apellido en la base de datos
	userBD.name = name;
	userBD.lastName = lastName;
	await userBD.save();

	const data = {
		name: userBD.name,
		lastName: userBD.lastName,
		email: userBD.email,
		id: userBD._id,
	}

	res.status(200).json({
		ok: true,
		message: 'Se a editado con exito',
		data,
	});
}

/////////////////////////////////////////////////////////////////////////

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