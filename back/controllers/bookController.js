const bookModel = require('../models/bookModel');

// Créer un nouveau livre
exports.createBook = (req, res) => {
	const { title, author, edition, price, description, date_publication } = req.body;

	if (!title || !author || !price) {
		return res.status(400).json({ error: "Les champs 'title', 'author' et 'price' sont obligatoires" });
	}

	bookModel.createBook({ title, author, edition, price, description, date_publication }, (err, book) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(201).json(book);
	});
};

// Obtenir tous les livres
exports.getAllBooks = (req, res) => {
	bookModel.getAllBooks((err, books) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(books);
	});
};

// Obtenir un livre par son ID
exports.getBookById = (req, res) => {
	const { id } = req.params;

	bookModel.getBookById(id, (err, book) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!book) {
			return res.status(404).json({ error: "Livre non trouvé" });
		}
		res.status(200).json(book);
	});
};

// Mettre à jour un livre par son ID
exports.updateBook = (req, res) => {
	const { id } = req.params;
	const { title, author, edition, price, description, date_publication } = req.body;

	bookModel.updateBook(id, { title, author, edition, price, description, date_publication }, (err, book) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(book);
	});
};

// Supprimer un livre par son ID
exports.deleteBook = (req, res) => {
	const { id } = req.params;

	bookModel.deleteBook(id, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json({ message: "Livre supprimé avec succès", deletedID: id });
	});
};
