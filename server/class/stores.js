const Store = require('./Store');

// Tipo de pizzeria
const panos = 'Esta pizzeria se especializa en ingredientes salados';
const sbarro = 'Esta pizzeria se especializa en ingredientes picantes';
const camion = 'Esta pizzeria se especializa en ingredientes vegetales';
const voglia = 'Esta pizzeria se especializa en ingredientes maarinos';
const stroller = 'Esta pizzeria se especializa en ingredientes tropicales';
const trulli = 'Esta pizzeria se especializa en ingredientes mediterraneos';

// Productos que ofrece la pizzeria
const products = [
	{
		img: 'pollo.png',
		description: 'Pizza de Pollo',
	},
	{
		img: 'pollo&champiñones.png',
		description: 'Pizza de Pollo y Champiñones',
	},
	{
		img: 'vegetales.png',
		description: 'Pizza de Vegetales',
	},
	{
		img: 'vegetales&atun.png',
		description: 'Pizza de Vegetales y Atun',
	},
	{
		img: 'queso&champiñones.png',
		description: 'Pizza 3 Quesos con Champiñones',
	},
	{
		img: 'queso&jamon.png',
		description: 'Pizza de Jamon y Queso',
	},
];

class Stores {

	constructor() {

		this.stores = [
			new Store("Pano's Pizza", 'Panos_pizza.png', 'Calle 1 #2-3', panos, products),
			new Store("SBarro", 'Sbarro.png', 'Calle 2 #3-4', sbarro, products),
			new Store("Pizzeria Camión", 'pizzeria_camion.png', 'Calle 3 #4-5', camion, products),
			new Store("Voglia Di Pizza", 'voglia_di_pizza.png', 'Calle 4 #5-6', voglia, products),
			new Store("Stroller Pizza", 'stroller_pizza.png', 'Calle 5 #6-7', stroller, products),
			new Store("Trulli", 'trulli.png', 'Calle 9 #10-11', trulli, products),
		];
	}

	getStores() {
		
		return this.stores;
	}

	getStore(id) {

		return this.stores.find(store => store.id === id);
	}
}

module.exports = Stores;