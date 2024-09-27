const express = require('express');
const path = require('path');
// const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'front')));


// Middleware pour traiter les requêtes JSON et les formulaires
// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Route Accueil
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'front', 'index.html'));
});

// Lancer le serveur
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
