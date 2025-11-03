import express from 'express';
import 'dotenv/config';
import { execute, migrate } from './db.js';
import { inventoryScript } from './scripts/001_inventory.js';

const app = express();
const port = process.env.PORT || 3000;

const { CLIENT_ID, CLIENT_DOMAIN, SECRET } = process.env;

// inventoryScript();
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

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
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

app.get('/checkout', (req, res) => {
  res.send('Checkout');
});

app.post('/user', async (req, res) => {
  const { email } = req.body;
  let user;
  const result = await execute('/sql/users/get_by_email.sql', [email]);

  if (!result.rows.length) {
    user = await execute('/sql/users/put.sql', [email]);
  } else {
    user = result.rows[0];
  }
  console.log(user);
});