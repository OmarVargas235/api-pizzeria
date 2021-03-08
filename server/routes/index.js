const express = require('express');
const router = express.Router();
const pizzeriaController = require('../controller/pizzeriaController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const resetPasswordController = require('../controller/resetPasswordController');

module.exports = () => {
	
	// Data de la tienda de pizzerias
	router.get('/data-pizzerias', pizzeriaController.dataPizzeria);

	// Obtener pizzeria
	router.get('/get-pizzeria/:id', pizzeriaController.getPizza);

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
	router.post('/logout', authController.logout);

	// Cambiar contraseña
	router.post('/change-password',
		userController.sanitizeFieldsFormSendChangePassword,
		userController.sendChangePassword
	);

	// Pagina para resetear la contraseña
	router.get('/reset-password/:token', resetPasswordController.sendEmail);
	router.post('/reset-password/:url',
		resetPasswordController.sanitizeFieldsFormResetPassword,
		resetPasswordController.resetPassword
	);

	return router;
}