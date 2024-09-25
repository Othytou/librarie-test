const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();
const port = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON et les formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Route de test
app.get('/', (req, res) => {
	res.send('API is running');
});

// Lancer le serveur
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
