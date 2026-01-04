import 'dotenv/config';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.get('/secret', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({client_secret: paymentIntent.client_secret});
});