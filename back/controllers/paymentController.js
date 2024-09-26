const stripe = require('../config/stripe');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


exports.createPaymentIntent = async (req, res) => {
	const { amount, currency } = req.body;

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount, // Montant en centimes
			currency,
			payment_method_types: ['card'], // Types de paiement acceptés
		});

		res.set('Authorization', `Barear ${process.env.STRIPE_SECRET}`);

		res.status(200).send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		res.status(400).send({
			error: error.message,
		});
	}
};
