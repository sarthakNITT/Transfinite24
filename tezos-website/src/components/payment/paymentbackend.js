require('dotenv').config();  // Ensure .env is loaded
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Using the actual Stripe key
const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');
const Binance = require('node-binance-api');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests from React

// Tezos setup
const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');
Tezos.setProvider({
  signer: new InMemorySigner(process.env.TEZOS_PRIVATE_KEY),
});

// Binance setup
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
});

// Simulate sending XTZ on Tezos Ghostnet
const sendTestXTZ = async (recipientAddress, amountXTZ) => {
  try {
    const operation = await Tezos.wallet.transfer({
      to: recipientAddress,
      amount: amountXTZ,
    }).send();
    await operation.confirmation();
    console.log('Test XTZ sent successfully:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error sending test XTZ:', error);
    throw error;
  }
};

// Simulate Binance conversion (XTZ to USD)
const simulateBinanceConversion = (xtzAmount) => {
  const conversionRate = 0.69;  // 1 XTZ = 0.69 USD
  const fiatAmount = xtzAmount * conversionRate;
  console.log(`Simulated conversion: ${xtzAmount} XTZ = ${fiatAmount} USD`);
  return fiatAmount;
};

// Create Stripe Checkout session
const createCheckoutSession = async (amountUSD) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tezos Payment Simulation',
          },
          unit_amount: Math.round(amountUSD * 100),  // Stripe expects amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',  // Frontend success page
      cancel_url: 'http://localhost:3000/cancel',  // Frontend cancel page
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
};

// Payment processing route
app.post('/api/process-payment', async (req, res) => {
  const { xtzAmount } = req.body;

  try {
    // Step 1: Send XTZ (Tezos Ghostnet)
    const recipientAddress = 'tz1Vm3pWd78oVAsC94EcRcRJYiwXyjQF9847'; // Replace with your address
    await sendTestXTZ(recipientAddress, xtzAmount);

    // Step 2: Simulate Binance conversion (XTZ to USD)
    const fiatAmount = simulateBinanceConversion(xtzAmount);

    // Step 3: Create Stripe Checkout session
    const session = await createCheckoutSession(fiatAmount);

    // Step 4: Return session URL to the client
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Serve the backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
