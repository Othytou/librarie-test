const Order = require('../models/orderModel');

// Créer une commande
exports.createOrder = (req, res) => {
	const { user_id, status, books, total_price } = req.body;

	if (!user_id || !status || !books || !total_price) {
		return res.status(400).json({ error: 'All fields are required (user_id, status, books, total_price)' });
	}

	// Créer la commande
	Order.createOrder({ user_id, status, total_price }, (err, newOrder) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		// Ajouter les livres à la commande
		const orderId = newOrder.id;
		const booksList = books;  // books est un tableau de { book_id, quantity }

		Order.addBooksToOrder(orderId, booksList, (err, result) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.status(201).json({ order: newOrder, books: result });
		});
	});
};

// Récupérer toutes les commandes
exports.getAllOrders = (req, res) => {
	Order.getAllOrders((err, orders) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(orders);
	});
};

// Récupérer une commande par ID
exports.getOrderById = (req, res) => {
	const id = req.params.id;

	Order.getOrderById(id, (err, order) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		res.status(200).json(order);
	});
};

// Mettre à jour l'état d'une commande
exports.updateOrderStatus = (req, res) => {
	const id = req.params.id;
	const { status } = req.body;

	if (!status) {
		return res.status(400).json({ error: 'Status is required' });
	}

	Order.updateOrderStatus(id, status, (err, updatedOrder) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(updatedOrder);
	});
};

// Supprimer une commande
exports.deleteOrder = (req, res) => {
	const id = req.params.id;

	Order.deleteOrder(id, (err, deletedOrder) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(deletedOrder);
	});
};
