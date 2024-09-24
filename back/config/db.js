const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Génère un chemin absolu vers le fichier de base de données
const dbPath = path.resolve(__dirname, 'db.sqlite');

// Ouvre une connexion à la base de données SQLite
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Erreur lors de la connexion à la base de données SQLite :', err.message);
	} else {
		console.log('Connecté à la base de données SQLite.');
	}
});

module.exports = db;
