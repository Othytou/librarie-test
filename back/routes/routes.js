const express = require('express');
const path = require('path');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const orderRoutes = require('./orderRoutes');
const paymentRoutes = require('./paymentRoutes');




const router = express.Router();

// Routes d'utilisateurs
router.use('/users', userRoutes);

// Routes d'authentification
router.use('/auth', authRoutes);
// Routes pour la librairie
router.use('/books', bookRoutes);
// Routes pour les commandes
router.use('/orders', orderRoutes);
// Routes pour les paiements
router.use('/payments/', paymentRoutes);


// Routes Front
router.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'front', 'index.html'));
});


module.exports = router;
