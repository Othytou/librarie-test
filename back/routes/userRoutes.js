const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Importer le middleware

const router = express.Router();

// Route pour créer un utilisateur (sans authentification)
router.post('/', userController.createUser);

// Route pour récupérer tous les utilisateurs (protégée par le middleware)
router.get('/', authenticateToken, userController.getAllUsers);

// Route pour récupérer un utilisateur par ID (protégée par le middleware)
router.get('/:id', authenticateToken, userController.getUserById);

// Route pour mettre à jour un utilisateur par ID (protégée par le middleware)
router.put('/:id', authenticateToken, userController.updateUser);

// Route pour supprimer un utilisateur par ID (protégée par le middleware)
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
