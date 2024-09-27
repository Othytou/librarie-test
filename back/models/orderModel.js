const db = require('../config/db.js'); // Connexion à la base de données

// Création de la table 'orders' si elle n'existe pas
db.query(`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'En Cours',
    total_price REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`);

db.query(`CREATE TABLE IF NOT EXISTS order_books (
    order_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    PRIMARY KEY (order_id, book_id)
);`);

// Créer une nouvelle commande
exports.createOrder = (orderData, callback) => {
	const { user_id, status, total_price } = orderData;

	const query = `INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)`;
	db.query(query, [user_id, status, total_price], function (err) {
		if (err) {
			return callback(err);
		}
		// Retourne la commande nouvellement créée
		callback(null, { id: this.lastID, ...orderData });
	});
};

// Ajouter des livres à une commande (dans order_books)
exports.addBooksToOrder = (orderId, books, callback) => {
	const query = `INSERT INTO order_books (order_id, book_id, quantity) VALUES (?, ?, ?)`;

	// Utilisation d'une transaction pour insérer plusieurs livres dans la commande
	db.serialize(() => {
		const stmt = db.prepare(query);

		books.forEach(book => {
			stmt.run(orderId, book.book_id, book.quantity || 1);  // Si quantité non définie, par défaut 1
		});

		stmt.finalize((err) => {
			if (err) {
				return callback(err);
			}
			callback(null, books);  // Retourne la liste des livres ajoutés
		});
	});
};

// Récupérer toutes les commandes
exports.getAllOrders = (callback) => {
	const query = `SELECT * FROM orders`;
	db.query(query, [], (err, rows) => {
		if (err) {
			return callback(err);
		}
		callback(null, rows);
	});
};

// Récupérer une commande par son ID
exports.getOrderById = (id, callback) => {
	const query = `SELECT * FROM orders WHERE id = ?`;
	db.get(query, [id], (err, row) => {
		if (err) {
			return callback(err);
		}
		callback(null, row);
	});
};

// Mettre à jour l'état d'une commande
exports.updateOrderStatus = (id, status, callback) => {
	const query = `UPDATE orders SET status = ? WHERE id = ?`;
	db.query(query, [status, id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { id, status });
	});
};

// Supprimer une commande
exports.deleteOrder = (id, callback) => {
	const query = `DELETE FROM orders WHERE id = ?`;
	db.query(query, [id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { deletedID: id });
	});
};
