const express = require('express');
const router = express.Router();
const librairieController = require('../controllers/librairieController');

// Routes CRUD pour la librairie
router.get('/', librairieController.getAllBooks);  // Obtenir tous les livres
router.post('/add', librairieController.createBook);  // Créer un livre
router.get('/:id', librairieController.getBookById);  // Obtenir un livre par son ID
router.put('/:id', librairieController.updateBook);  // Mettre à jour un livre
router.delete('/:id', librairieController.deleteBook);  // Supprimer un livre

module.exports = router;
