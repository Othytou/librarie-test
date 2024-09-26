// controllers/paymentController.js
const Order = require('../models/orderModel');

exports.processPayment = (req, res) => {
    const { orderId, paymentMethod, amount } = req.body;

    // Simulation d'un traitement de paiement
    setTimeout(() => {
        // Mise à jour du statut de la commande
        Order.updateOrderStatus(orderId, 'paid', (err, updatedOrder) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Payment processed successfully', order: updatedOrder });
        });
    }, 2000); // Simuler un délai de traitement de 2 secondes
};