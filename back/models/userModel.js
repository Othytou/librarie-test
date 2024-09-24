const db = require('../config/db.js'); // Importe ta connexion à la base de données

// Créer la table 'users' si elle n'existe pas encore
db.run(`CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
  )`);

// Fonction pour créer un nouvel utilisateur
exports.createUser = (user, callback) => {
	const { name, email, password } = user;

	const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
	db.run(query, [name, email, password], function (err) {
		if (err) {
			return callback(err);
		}
		// Retourne l'ID de l'utilisateur nouvellement créé
		callback(null, { id: this.lastID, ...user });
	});
};

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = (callback) => {
	const query = `SELECT * FROM users`;

	db.all(query, [], (err, rows) => {
		if (err) {
			return callback(err);
		}
		callback(null, rows);
	});
};

// Fonction pour récupérer un utilisateur par son ID
exports.getUserById = (id, callback) => {
	const query = `SELECT * FROM users WHERE id = ?`;

	db.get(query, [id], (err, row) => {
		if (err) {
			return callback(err);
		}
		callback(null, row);
	});
};

// Fonction pour mettre à jour un utilisateur par son ID
exports.updateUser = (id, user, callback) => {
	const { name, email, password } = user;

	const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
	db.run(query, [name, email, password, id], function (err) {
		if (err) {
			return callback(err);
		}
		// Retourne le nombre de lignes modifiées
		callback(null, { id, ...user });
	});
};

// Fonction pour supprimer un utilisateur par son ID
exports.deleteUser = (id, callback) => {
	const query = `DELETE FROM users WHERE id = ?`;
	db.run(query, [id], function (err) {
		if (err) {
			return callback(err);
		}
		// Retourne le nombre de lignes supprimées
		callback(null, { deletedID: id });
	});
};