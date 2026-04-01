import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { getKey } from './utilityFunctions.js';
import { execute, migrate } from './db.js';
import { inventoryScript } from './scripts/001_inventory.js';

const app = express();
const port = process.env.PORT || 3000;

const { CLIENT_ID, CLIENT_DOMAIN, SECRET, SESSION_SECRET } = process.env;

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

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

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
  const { email, status } = req.body;
  let user;
  const result = await execute('/sql/users/get_by_email.sql', [email, status]);

  if (result.rows.length) {
    user = result.rows[0];
  } else {
    user = await execute('/sql/users/put.sql', [email, status]);
  }

  res.send({ ok: true, status });
});

app.post('/session/login', async (req, res) => {
  const { idToken } = req.body;

  jwt.verify(idToken, getKey, { audience: CLIENT_ID, issuer: `https://${CLIENT_DOMAIN}/`, algorithms: ['RS256']}, (err, decoded) => {
    if (err) return res.status(401).send('Invalid Auth0 token');

    req.session.user = {
      sub: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };
    res.send({ ok: true });
  });
});

app.post('/session/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.send({ ok: true });
  });
});