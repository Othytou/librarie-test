const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Si tu veux protéger certaines routes

const router = express.Router();

// Route pour s'inscrire
router.post('/register', authController.register);

// Route pour se connecter
router.post('/login', authController.login);

// Route protégée (exemple) - Tu peux ajouter plus de routes protégées ici
router.get('/profile', authMiddleware.authenticateToken, (req, res) => {
	res.status(200).json({ message: `Hello ${req.user.email}`, user: req.user });
});

module.exports = router;
