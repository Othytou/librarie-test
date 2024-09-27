const { Pool } = require('pg');
require('dotenv').config();

// Création d'un pool de connexions à la base de données PostgreSQL
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT || 5432,
});

// Vérifier la connexion
pool.connect((err, client, release) => {
	if (err) {
		return console.error('Erreur lors de la connexion à PostgreSQL :', err.stack);
	}
	console.log('Connecté à PostgreSQL.');
	release();  // Libérer le client après la connexion
});

module.exports = pool;
