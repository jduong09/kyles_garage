import { Pool } from 'pg';
import seedData from "../seedData/inventory.js";

export const pool = new Pool({
  host: 'localhost',
  database: 'kyles_garage',
  port: 5432,
});

export const populateInventory = async () => {
  const client = await pool.connect();
  try {
    await client.query('Begin');

    await client.query('INSERT INTO catalog (name) VALUES ($1);', ["Large Tool"]);
    await client.query('INSERT INTO catalog (name) VALUES ($1);', ["Small Tool"]);

    for (let i = 0; i < seedData.length; i++) {
      const { name, description, dailyRate, sku, catalog_id } = seedData[i];
      await client.query('INSERT INTO inventory (name, description, rental_price, sku, catalog_id) VALUES ($1, $2, $3, $4, $5);', [name, description, dailyRate, sku, catalog_id]);
    }
    await client.query('COMMIT');
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch(e) {
      console.log('Could not rollback: ', e);
    }
    throw err;
  } finally {
    await client.release();
  }
}