const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const librairieRoutes = require('./librairieRoutes');


const router = express.Router();

// Routes d'utilisateurs
router.use('/users', userRoutes);

// Routes d'authentification
router.use('/auth', authRoutes);
// Routes pour la librairie
router.use('/librairie', librairieRoutes);


module.exports = router;
