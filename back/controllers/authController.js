const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/userModel');

// Clé secrète pour signer le token
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', process.env.JWT_SECRET);
// Fonction pour se connecter et obtenir un token
exports.login = (req, res) => {
    console.log('Tentative de connexion:', req.body);
    const { email, password } = req.body;

    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !password) {
        console.log('Email ou mot de passe manquant');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Récupère l'utilisateur par email
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            console.log('Utilisateur non trouvé pour l\'email:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('Utilisateur trouvé:', user);

        // Compare le mot de passe haché
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la comparaison des mots de passe:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (!isMatch) {
                console.log('Mot de passe incorrect pour l\'utilisateur:', email);
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            console.log('Connexion réussie pour l\'utilisateur:', email);

            // Crée un token JWT
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: '2h'
            });

            res.status(200).json({ token });
        });
    });
};

// Fonction pour s'inscrire (registre)
exports.register = (req, res) => {
    console.log('Tentative d\'inscription:', req.body);
    const { username, email, password, first_name, last_name } = req.body;

    // Validation des champs
    if (!username || !email || !password || !first_name || !last_name) {
        console.log('Champs manquants:', { username, email, password, first_name, last_name });
        return res.status(400).json({ error: "All fields are required" });
    }

    // Vérifier si l'email existe déjà
    User.getUserByEmail(email, (err, existingUser) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email:', err);
            return res.status(500).json({ error: err.message });
        }

        if (existingUser) {
            console.log('Email déjà existant:', email);
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hasher le mot de passe
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Erreur lors du hachage du mot de passe:', err);
                return res.status(500).json({ error: "Error hashing password" });
            }

            // Créer l'utilisateur avec le mot de passe haché
            User.createUser({ username, email, password: hashedPassword, first_name, last_name }, (err, user) => {
                if (err) {
                    console.error('Erreur lors de la création de l\'utilisateur:', err);
                    return res.status(500).json({ error: err.message });
                }
                // Ne pas renvoyer le mot de passe haché
                const { password, ...userWithoutPassword } = user;
                console.log('Utilisateur créé avec succès:', userWithoutPassword);
                res.status(201).json(userWithoutPassword);
            });
        });
    });
};