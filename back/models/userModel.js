const db = require('../config/db.js');
const bcrypt = require('bcrypt');

// Créer la table 'users' si elle n'existe pas encore
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);`);

// Fonction pour créer un nouvel utilisateur
exports.createUser = (user, callback) => {
	const { username, email, password, first_name, last_name } = user;

	// Hachage du mot de passe
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			return callback(err);
		}

		const query = `INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)`;
		db.run(query, [username, email, hash, first_name || null, last_name || null], function (err) {
			if (err) {
				return callback(err);
			}
			// Retourne l'ID de l'utilisateur nouvellement créé
			callback(null, { id: this.lastID, username, email, first_name, last_name });
		});
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

// Fonction pour récupérer un utilisateur par son nom d'utilisateur
exports.getUserByUsername = (username, callback) => {
	const query = `SELECT * FROM users WHERE username = ?`;

	db.get(query, [username], (err, row) => {
		if (err) {
			return callback(err);
		}
		callback(null, row); // Retourne l'utilisateur s'il existe, sinon null
	});
};

exports.getUserByEmail = (email, callback) => {
		const query = 'SELECT * FROM users WHERE email = ?';
		db.get(query, [email], (err, row) => {
			if (err) {
				return callback(err);
			}
			callback(null, row);
		});
};

// Fonction pour mettre à jour un utilisateur par son ID
exports.updateUser = (id, user, callback) => {
	const { username, first_name, last_name, email, password } = user;

	const query = `UPDATE users SET username = ?, first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?`;
	db.run(query, [username, first_name, last_name, email, password, id], function (err) {
		if (err) {
			return callback(err);
		}
		// Retourne le nombre de lignes modifiées
		callback(null, { id, username, first_name, last_name, email });
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
