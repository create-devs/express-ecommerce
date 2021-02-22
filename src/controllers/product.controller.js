const db = require("../config/db.config");
const Product = db.products;

// Create and Save a new Product
exports.createProduct = async (req, res) => {
	const images = req.files.map((file) => file.path);

	if(!req.body.title){
		res.status(400).json({
			message: "Content can not be empty!"
		})
	}

	const {title, description, price, sale_price, category, manage_stock, stock} = req.body;

	const product = {title, description, price, sale_price, category, manage_stock, stock, image: images};

	try {
		const data = await Product.create(product);
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}

};

// Retrieve all Products from the database.
exports.getAllProducts = async (req, res) => {
	try {
		const data = await Product.findAll();
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

// Find a single Product with an id
exports.getProductById = async (req, res) => {

	const id = req.params.id;

	try {
		const data = await Product.findByPk(id, { include: ["reviews"] });
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
  
};

// Update a Product by the id in the request
exports.updateProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Product.update(req.body, {where: {id: id}});
		if(num == 1){
			return res.json({message: 'Product Updated'})
		}
		return res.status(500).json({message: 'Cannot update product'})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};

// Delete a Product with the specified id in the request
exports.deleteProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Product.destroy({where: {id: id}});
		if(num == 1){
			return res.json({message: 'Product Deleted with id=' + id})
		}
		return res.status(500).json({message: 'Cannot delete Product with id=' + id})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};