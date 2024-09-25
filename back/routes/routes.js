const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Routes d'utilisateurs
router.use('/users', userRoutes);

// Routes d'authentification
router.use('/auth', authRoutes);

module.exports = router;
