const express = require('express');
const router = express.Router();
const pizzeriaController = require('../controller/pizzeriaController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const resetPasswordController = require('../controller/resetPasswordController');
const editUserController = require('../controller/editUserController');

const auth = require('../middleware/auth');

module.exports = () => {
	
	// Data de las pizzerias
	router.get('/data-pizzerias', auth, pizzeriaController.dataPizzeria);

	// Obtener pizzeria
	router.get('/get-pizzeria/:id', auth, pizzeriaController.getPizza);

	// Registro de usuarios
	router.post('/register-user',
		userController.sanitizeFieldsFormRegister,
		userController.createUser
	);

	// Autenticar usuario
	router.post('/login',
		authController.sanitizeFieldsFormLogin,
		authController.loginUser
	);

	// Cerrar sesion
	router.post('/logout', auth, authController.logout);

	// Cambiar contraseña
	router.post('/change-password',
		userController.sanitizeFieldsFormSendChangePassword,
		userController.sendChangePassword
	);

	// Pagina para cambiar la contraseña
	router.post('/reset-password/:token', resetPasswordController.sendEmail);
	router.post('/send-form-password/:url',
		resetPasswordController.sanitizeFieldsFormResetPassword,
		resetPasswordController.resetPassword
	);

	// Editar imagen
	router.post('/edit-user-image/:id', auth, editUserController.selectImage);

	// Editar perfil
	router.post('/edit-user/:id',
		auth,
		editUserController.sanitizeFieldsFormEditUser,
		editUserController.editUser,
	);

	// Obtener la data del perfil del usuario
	router.get('/get-user/:token', auth, editUserController.getUser);

	return router;
}