const librairieModel = require('../models/librairieModel');

// Créer un nouveau livre
exports.createBook = (req, res) => {
	const { titre, auteur, edition, prix, description, date_publication } = req.body;

	if (!titre || !auteur || !prix) {
		return res.status(400).json({ error: "Les champs 'titre', 'auteur' et 'prix' sont obligatoires" });
	}

	librairieModel.createBook({ titre, auteur, edition, prix, description, date_publication }, (err, book) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(201).json(book);
	});
};

// Obtenir tous les livres
exports.getAllBooks = (req, res) => {
	librairieModel.getAllBooks((err, books) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(books);
	});
};

// Obtenir un livre par son ID
exports.getBookById = (req, res) => {
	const { id } = req.params;

	librairieModel.getBookById(id, (err, book) => {
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
	const { titre, auteur, edition, prix, description, date_publication } = req.body;

	librairieModel.updateBook(id, { titre, auteur, edition, prix, description, date_publication }, (err, book) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(book);
	});
};

// Supprimer un livre par son ID
exports.deleteBook = (req, res) => {
	const { id } = req.params;

	librairieModel.deleteBook(id, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json({ message: "Livre supprimé avec succès", deletedID: id });
	});
};
