// routes/paymentRouter.js

const express = require('express');
const { sendTestXTZ } = require('../models/tezos');
const { simulateBinanceConversion } = require('../binance/binance');
const { createCheckoutSession } = require('../stripe/stripe');
const router = express.Router();

router.post('/process-payment', async (req, res) => {
  let { xtzAmount } = req.body; // Receive xtzAmount

  // Parse and validate xtzAmount
  xtzAmount = parseFloat(xtzAmount);
  if (isNaN(xtzAmount) || xtzAmount <= 0) {
    return res.status(400).json({ error: 'Invalid XTZ amount' });
  }

  try {
    // Step 1: Send XTZ (Tezos Ghostnet)
    const recipientAddress = process.env.TEZOS_RECIPIENT_ADDRESS; // Use environment variable
    await sendTestXTZ(recipientAddress, xtzAmount);

    // Step 2: Simulate Binance Conversion
    const fiatAmount = await simulateBinanceConversion(xtzAmount);

    // Step 3: Create Stripe Checkout Session
    const session = await createCheckoutSession(fiatAmount);

    // Step 4: Send back session URL to redirect user
    res.status(200).json({ fiatAmount, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment processing failed. Please try again later.' });
  }
});

module.exports = router;
