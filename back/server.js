const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON
app.use(bodyParser.json());

// Middleware pour traiter les requêtes avec des données encodées dans l'URL (formulaires)
app.use(express.urlencoded({ extended: true }));

// Utilise les routes utilisateur sous l'URL "/users"
app.use('/users', userRoutes);

// Route de test
app.get('/', (req, res) => {
	res.send('API is running');
});

// Lancer le serveur
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
