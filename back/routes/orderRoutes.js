const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const paiementController = require('../controllers/paiementController');

// Routes pour les commandes
router.get('/', orderController.getAllOrders);  // Récupérer toutes les commandes
router.get('/:id', orderController.getOrderById);  // Récupérer une commande par ID
router.post('/create', orderController.createOrder);  // Créer une commande
router.put('/:id/status', orderController.updateOrderStatus);  // Mettre à jour le statut d'une commande
router.delete('/:id', orderController.deleteOrder);  // Supprimer une commande

// pour les paiments
router.post('/:id/pay', paiementController.processPayment);

module.exports = router;
