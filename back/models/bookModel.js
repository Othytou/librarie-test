const db = require('../config/db.js');

// Créer la table 'books' si elle n'existe pas encore
db.query(`CREATE TABLE IF NOT EXISTS books (
   id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    edition TEXT,
    price REAL NOT NULL,
    description TEXT,
    date_publication DATE
)`);

// Fonction pour créer un livre
exports.createBook = (book, callback) => {
	const { title, author, edition, price, description, date_publication } = book;

	const query = `INSERT INTO books (title, author, edition, price, description, date_publication) VALUES (?, ?, ?, ?, ?, ?)`;
	db.query(query, [title, author, edition, price, description, date_publication], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { id: this.lastID, ...book });
	});
};

// Fonction pour récupérer tous les livres
exports.getAllBooks = (callback) => {
	const query = `SELECT * FROM books`;

	db.query(query, (err, result) => {
		if (err) {
			return callback(err);
		}
		callback(null, result.rows);
	});
};

// Fonction pour récupérer un livre par son ID
exports.getBookById = (id, callback) => {
	const query = `SELECT * FROM books WHERE id = ?`;
	db.get(query, [id], (err, row) => {
		if (err) {
			return callback(err);
		}
		callback(null, row);
	});
};

// Fonction pour mettre à jour un livre par son ID
exports.updateBook = (id, book, callback) => {
	const { title, author, edition, price, description, date_publication } = book;
	const query = `UPDATE books SET title = ?, author = ?, edition = ?, price = ?, description = ?, date_publication = ? WHERE id = ?`;

	db.query(query, [title, author, edition, price, description, date_publication, id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { id, ...book });
	});
};

// Fonction pour supprimer un livre par son ID
exports.deleteBook = (id, callback) => {
	const query = `DELETE FROM books WHERE id = ?`;
	db.query(query, [id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { deletedID: id });
	});
};
