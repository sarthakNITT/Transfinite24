// stripe/stripe.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (amount) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tezos Payment Simulation',
            },
            unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://yourdomain.com/success', // Replace with your actual URLs
      cancel_url: 'https://yourdomain.com/cancel',
    });
    console.log('Stripe checkout session created:', session.id);
    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
};

module.exports = { createCheckoutSession };
