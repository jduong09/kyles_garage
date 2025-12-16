import express from 'express';
import 'dotenv/config';
import stripe from 'stripe';
import { execute, migrate } from './db.js';
import { inventoryScript } from './scripts/001_inventory.js';


const stripeAPI = stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3000;

inventoryScript();
migrate();

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/inventory', async (req, res) => {
  const result = await execute('/sql/inventory/get_all.sql');
  const items = await result.rows.map(item => {
    return {
      name: item.name,
      sku: item.sku,
      archived: item.archived,
      description: item.description,
      price: item.rental_price,
      images: item.images,
      tags: item.tag_id,
      inventory_uuid: item.inventory_uuid,
    }
  });
  await res.status(200).send(JSON.stringify({ items }));
});

app.post('/checkout', async (req, res) => {
  const { price } = req.body;
  const paymentIntent = await stripeAPI.paymentIntents.create({
    amount: price,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({ client_secret: paymentIntent.client_secret });
});
