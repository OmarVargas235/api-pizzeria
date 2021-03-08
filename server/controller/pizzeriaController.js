const Stores = require('../class/stores');
const stores = new Stores();

module.exports.dataPizzeria = (req, res) => {

	try {

		res.status(200).json({
			ok: true,
			data: stores.getStores(),
		});

	} catch(error) {

		res.status(404).json({
			ok: false,
			error: 'Ah ocurrido un error',
		});
	}
}

module.exports.getPizza = (req, res) => {
	
	const id = req.params.id;
	const pizzeria = stores.getStore(id);

	if (!pizzeria) return res.status(404).json({
		ok: false,
		error: 'No se a encontrado la pizzeria',
	});
	
	res.status(200).json({
		ok: true,
		data: pizzeria,
	});
}	