const db = require('./db.js');  // Assurez-vous que le chemin est correct pour accéder à votre base de données

// Ajout de 3 utilisateurs
const addUsers = () => {
	const users = [
		{ username: 'user1', email: 'oo1@oo.oo', password: 'pwd', role: 'user' },
		{ username: 'user2', email: 'oo2@oo.oo', password: 'pwd', role: 'user' },
		{ username: 'user3', email: 'oo3@oo.oo', password: 'pwd', role: 'admin' }
	];

	users.forEach(user => {
		const query = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;

		db.query(query, [user.username, user.email, user.password, user.role], function (err) {
			if (err) {
				console.error(`Erreur lors de l'insertion de l'utilisateur ${user.username}:`, err.message);
			} else {
				console.log(`Utilisateur ${user.username} ajouté avec succès (ID: ${this.lastID})`);
			}
		});
	});
};

// Ajout de 3 livres
const addBooks = () => {
	const books = [
		{ title: 'Livre 1', author: 'Auteur 1', edition: 'Edition 1', price: 10.0 },
		{ title: 'Livre 2', author: 'Auteur 2', edition: 'Edition 2', price: 15.0 },
		{ title: 'Livre 3', author: 'Auteur 3', edition: 'Edition 3', price: 20.0 }
	];

	books.forEach(book => {
		const query = `INSERT INTO books (title, author, edition, price) VALUES (?, ?, ?, ?)`;

		db.query(query, [book.title, book.author, book.edition, book.price], function (err) {
			if (err) {
				console.error(`Erreur lors de l'insertion du livre ${book.title}:`, err.message);
			} else {
				console.log(`Livre ${book.title} ajouté avec succès (ID: ${this.lastID})`);
			}
		});
	});
};

// Fonction pour insérer les utilisateurs et les livres
const seedDatabase = () => {
	addUsers();
	addBooks();
};

// Exécuter le script d'insertion
seedDatabase();
