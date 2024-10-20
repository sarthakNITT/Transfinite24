const express = require('express');
const { sendTestXTZ } = require('../models/tezos');
const { simulateBinanceConversion } = require('../binance/binance');
const { createCheckoutSession } = require('../stripe/stripe');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

const createStripeCustomer = async () => {
    try {
        const customer = await stripe.customers.create({
            email: 'test@example.com',  // Replace with a test email
        });
        console.log('Test customer created:', customer.id);
        return customer.id;
    } catch (error) {
        console.error('Error creating Stripe customer:', error);
        throw error;
    }
};

router.post('/process-payment', async (req, res) => {
    const { xtzAmount } = req.body; // Only use xtzAmount

    try {
        // Step 1: Send XTZ (Tezos Ghostnet)
        const recipientAddress = 'tz1Vm3pWd78oVAsC94EcRcRJYiwXyjQF9847';
        await sendTestXTZ(recipientAddress, xtzAmount);

        // Step 2: Simulate Binance Conversion
        const fiatAmount = await simulateBinanceConversion(xtzAmount); // Ensure this is correctly implemented

        // Step 3: Create Stripe Checkout Session
        const session = await createCheckoutSession(fiatAmount);

        // Step 4: Send back session URL to redirect user
        res.status(200).json({ fiatAmount, sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
});





module.exports = router;
