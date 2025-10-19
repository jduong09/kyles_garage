import express from 'express';
import { auth } from 'express-openid-connect';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { execute, migrate } from './db.js';
import { inventoryScript } from './scripts/001_inventory.js';

const app = express();
const port = process.env.PORT || 3000;

const { CLIENT_ID, CLIENT_DOMAIN, SECRET } = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: CLIENT_ID,
  issuerBaseURL: `https://${CLIENT_DOMAIN}`,
  secret: SECRET,
  authorizationParams: {
    response_type: 'id_token',
    response_mode: 'form_post',
    scope: 'openid profile email',
  },
  afterCallback: async (req, res, session, decodedState) => {
    // Get Email from Login
    const { email } = jwt.decode(session.id_token);

    // Check table 'users' for user by email
    // TODO: Change this to Function to return 'user' instead of 'rows'
    const { rows: [user] } = await execute('/sql/users/get_by_email.sql', [email]);
  
    // Need to Change schema for users to not force first/last name, add nickname. From Auth0 username/password, create user in db with status, nickname, email
    if (!user) {
      const { rows: [newUser]}  = await execute('/sql/users/put.sql', [email]);
      return {
        message: 'hello'
      };
    } else { 
      return {
        message: 'hello'
      }
    }
  },
};
// inventoryScript();
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
  console.log(req.oidc);
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

app.get('/callback', (req, res) => {
  console.log(req.body);
  console.log(req.session);
  res.oidc.callback({ redirectUri: 'http://localhost:5173' });
})