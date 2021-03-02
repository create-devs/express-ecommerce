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
	let query;
	console.log(req.query)
	if(req.query.nested){
		query = {
			include: ['categories'],
			where: {
				categoryId: null
			}
		}
	}

	try {
		const data = await Category.findAll(query);
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
exports.deleteCategory = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Category.destroy({where: {id: id}});
		if(num == 1){
			return res.json({message: 'Category Deleted with id=' + id})
		}
		return res.status(500).json({message: 'Cannot Delete Category with id=' + id})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};

exports.updateCategory = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Category.update(req.body, {where: {id: id}});
		if(num == 1){
			return res.json({message: 'Category Updated'})
		}
		return res.status(500).json({message: 'Cannot update category'})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};