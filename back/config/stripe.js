const Stripe = require('stripe');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports = stripe;
