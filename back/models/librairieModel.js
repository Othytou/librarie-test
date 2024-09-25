const db = require('../config/db.js');

// Créer la table 'librairie' si elle n'existe pas encore
db.run(`CREATE TABLE IF NOT EXISTS librairie (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    auteur TEXT NOT NULL,
    edition TEXT,
    prix REAL NOT NULL,
    description TEXT,
    date_publication DATE
)`);

// Fonction pour créer un livre
exports.createBook = (book, callback) => {
	const { titre, auteur, edition, prix, description, date_publication } = book;

	const query = `INSERT INTO librairie (titre, auteur, edition, prix, description, date_publication) VALUES (?, ?, ?, ?, ?, ?)`;
	db.run(query, [titre, auteur, edition, prix, description, date_publication], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { id: this.lastID, ...book });
	});
};

// Fonction pour récupérer tous les livres
exports.getAllBooks = (callback) => {
	const query = `SELECT * FROM librairie`;
	db.all(query, [], (err, rows) => {
		if (err) {
			return callback(err);
		}
		callback(null, rows);
	});
};

// Fonction pour récupérer un livre par son ID
exports.getBookById = (id, callback) => {
	const query = `SELECT * FROM librairie WHERE id = ?`;
	db.get(query, [id], (err, row) => {
		if (err) {
			return callback(err);
		}
		callback(null, row);
	});
};

// Fonction pour mettre à jour un livre par son ID
exports.updateBook = (id, book, callback) => {
	const { titre, auteur, edition, prix, description, date_publication } = book;
	const query = `UPDATE librairie SET titre = ?, auteur = ?, edition = ?, prix = ?, description = ?, date_publication = ? WHERE id = ?`;

	db.run(query, [titre, auteur, edition, prix, description, date_publication, id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { id, ...book });
	});
};

// Fonction pour supprimer un livre par son ID
exports.deleteBook = (id, callback) => {
	const query = `DELETE FROM librairie WHERE id = ?`;
	db.run(query, [id], function (err) {
		if (err) {
			return callback(err);
		}
		callback(null, { deletedID: id });
	});
};
