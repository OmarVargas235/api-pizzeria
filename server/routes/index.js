const express = require('express');
const router = express.Router();
const pizzeriaController = require('../controller/pizzeriaController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

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

	return router;
}