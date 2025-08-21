import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

app.get('/', (req, res) => {
});

app.get('/catalog', (req, res) => {
  res.send('Catalog');
});

app.get('/checkout', (req, res) => {
  res.send('Checkout');
});