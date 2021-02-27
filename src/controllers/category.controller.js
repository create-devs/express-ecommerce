const db = require("../config/db.config");
const Category = db.categories;
const Product = db.products;

exports.createCategory = async (req, res) => {

	if(!req.body.name){
		res.status(400).json({
			message: "Name can not be empty!"
		})
	}

	try {
		const data = await Category.create(req.body);
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}

};

exports.getAllCategories = async (req, res) => {
	try {
		const data = await Category.findAll();
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
}

exports.getCategoryById = async (req, res) => {

	const id = req.params.id;

	try {
		const data = await Category.findByPk(id, { 
			include: [
				{
					model: Product,
					as: "products"
				}
			]
		});
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
  
};