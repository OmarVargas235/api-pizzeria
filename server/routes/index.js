const express = require('express');
const router = express.Router();
const pizzeriaController = require('../controller/pizzeriaController');

module.exports = () => {
	
	// Data de la tienda de pizzerias
	router.get('/data-pizzerias', pizzeriaController.dataPizzeria);

	// Obtener pizzeria
	router.get('/get-pizzeria/:id', pizzeriaController.getPizza);

	return router;
}