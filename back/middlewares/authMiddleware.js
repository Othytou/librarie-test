const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const JWT_SECRET = process.env.TOKEN;

// Middleware pour protéger les routes
exports.authenticateToken = (req, res, next) => {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(401).json({ error: 'Access denied. No token provided.' });
	}

	jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: 'Invalid or expired token' });
		}
		req.user = decoded; // Décodage du token
		next(); // Passe à l'étape suivante (la route protégée)
	});
};
