const User = require('../models/userModel');

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
	User.getAllUsers((err, users) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(users);
	});
};

exports.createUser = (req, res) => {
	const user = {
		username: req.body.username,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	};

	userModel.createUser(user, (err, newUser) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		res.status(201).json(newUser);
	});
};


// Fonction pour récupérer un utilisateur par ID
exports.getUserById = (req, res) => {
	const userId = req.params.id;

	User.getUserById(userId, (err, user) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé' });
		}
		res.json(user);
	});
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = (req, res) => {
	const userId = req.params.id;
	const updatedUser = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};

	User.updateUser(userId, updatedUser, (err, user) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(user);
	});
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = (req, res) => {
	const userId = req.params.id;

	User.deleteUser(userId, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(204).json({ message: 'Utilisateur supprimé' });
	});
};
