const shortid = require('shortid');

class Store {

	constructor(name, img, address, description, products) {

		this.name = name;
		this.img = img;
		this.address = address;
		this.description = description;
		this.products = products;
		this.id = shortid.generate();
	}
}

module.exports = Store;