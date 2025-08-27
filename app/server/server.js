import express from 'express';
import 'dotenv/config';
import { pool, executeSQL, executeNewMigrations } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

executeNewMigrations();

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

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/inventory', async (req, res) => {
  const result = await executeSQL('/sql/inventory/get_all.sql');
  console.log(result);
  const items = await result.rows.map(item => {
    return {
      name: item.name,
      sku: item.sku,
      archived: item.archived,
      description: item.description,
      price: item.rental_price,
      images: item.images,
      tags: item.tag_id,
    }
  });
  await res.status(200).send(JSON.stringify({ items }));
});

app.get('/checkout', (req, res) => {
  res.send('Checkout');
});