const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Clé secrète pour signer le token
const JWT_SECRET = 'secret_key';

// Fonction pour se connecter et obtenir un token
exports.login = (req, res) => {
	const { email, password } = req.body;

	// Vérifie que l'email et le mot de passe sont fournis
	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	// Récupère l'utilisateur par email
	User.getUserByEmail(email, (err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: 'Invalid email or password' });
		}

		// Compare le mot de passe haché
		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err || !isMatch) {
				return res.status(400).json({ error: 'Invalid email or password' });
			}

			// Crée un token JWT qui expire après 2 heures
			const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
				expiresIn: '2h'
			});

			// Renvoie le token
			res.status(200).json({ token });
		});
	});
};

// Fonction pour s'inscrire (registre)
exports.register = (req, res) => {
	const { username, email, password, first_name, last_name } = req.body;

	// Validation des champs
	if (!username || !email || !password) {
		return res.status(400).json({ error: "All fields (username, email, password) are required" });
	}

	// Vérifier si le username existe déjà
	User.getUserByUsername(username, (err, existingUser) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Appelle le modèle pour créer un utilisateur
		User.createUser({ username, email, password, first_name, last_name }, (err, user) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.status(201).json(user);
		});
	});
};
