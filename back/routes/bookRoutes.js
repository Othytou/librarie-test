const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Routes CRUD pour la librairie
router.get('/', bookController.getAllBooks);  // Obtenir tous les livres
router.post('/add', bookController.createBook);  // Créer un livre
router.get('/:id', bookController.getBookById);  // Obtenir un livre par son ID
router.put('/:id', bookController.updateBook);  // Mettre à jour un livre
router.delete('/:id', bookController.deleteBook);  // Supprimer un livre

module.exports = router;
