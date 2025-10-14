import express from 'express';
import { auth } from 'express-openid-connect';
import { randomBytes } from 'crypto';
import 'dotenv/config';
import { execute, migrate } from './db.js';
import { inventoryScript } from './scripts/001_inventory.js';

const app = express();
const port = process.env.PORT || 3000;

const { CLIENT_ID, CLIENT_DOMAIN, CLIENT_SECRET } = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: CLIENT_ID,
  issuerBaseURL: `https://${CLIENT_DOMAIN}`,
  secret: CLIENT_SECRET,
  authorizationParams: {
    response_type: 'id_token',
    response_mode: 'form_post',
    scope: 'openid profile email',
  },
};

inventoryScript();
migrate();

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});


// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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

app.get('/login', (req, res) => {
  const NONCE = randomBytes(16).toString('base64');
  console.log('Made it to Login Function');

  fetch(`https://${CLIENT_DOMAIN}/authorize?
    client_id=${CLIENT_ID}&
    state=hello&
    nonce=${NONCE}`);
});