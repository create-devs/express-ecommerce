const db = require("../config/db.config");
const Order = db.orders;
const OrderItem = db.order_items;
const Product = db.products;

exports.createOrder = async (req, res) => {

	const status = (req.body.payment_method === "COD") ? "Processing" : "Pending Payment";
	const name = req.body.name;
	const phone = req.body.phone;
	const address = req.body.address;
	const payment_method = req.body.payment_method;
	const payment_status = false;
	const shipping_method = req.body.shipping_method;
	const shipping_fee = 60;
	
	const productIds = req.body.order_items.map(orderItem => orderItem.productId);
	const productItems = await Product.findAll({where: {id: productIds}});
	const subtotal = productItems.map(product => product.price).reduce((a, b) => a + b, 0);

	const total = subtotal + shipping_fee;

	const order_items = productItems.map((product, index) => ({
		productId: product.id, 
		title: product.title,
		price: product.price,
		quantity: req.body.order_items[index].quantity
	}));

    const order = {status, name, phone, address, payment_status, shipping_method, payment_method, subtotal, shipping_fee, total, userId: req.user.id};

	try {
		const data = await Order.create(order);
		order_items.forEach((item) => {
			const orderProduct = {...item, orderId: data.id};
			OrderItem.create(orderProduct);
		})
		res.json({...data.dataValues, order_items});
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
}

exports.getSingleUserOrder = async (req, res) => {
	try {
		const data = await Order.findAll({where: {userId: req.user.id},  include: ["order_items"] });
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

exports.getOrderById = async (req, res) => {

	const id = req.params.id;

	try {
		const data = await Order.findByPk(id, { include: ["order_items"] });
		res.json(data);
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
  
};

exports.deleteOrder = async (req, res) => {
	const id = req.params.id;
	try {
		await OrderItem.destroy({where: {orderId: id}});
		const num = await Order.destroy({where: {id: id}});
		if(num == 1){
			return res.json({message: 'Order Deleted with id=' + id})
		}
		return res.status(500).json({message: 'Cannot delete Order with id=' + id})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};