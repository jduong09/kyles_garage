import { readFile } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'kyles_garage',
  port: 5432,
});

const client = await pool.connect();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory


/*const filepath = join(__dirname, '/sql/sql.sql');

readFile(filepath, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
*/
/**
 * DB Query
 */

/**
 * SQL Query Given a filepath
 * @description Given a filepath, read SQL query and perform transaction.
 */
const executeSQL = (file, values = {}) => {
  const filepath = join(__dirname, file);
  readFile(filepath, 'utf-8', async (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(values.length);  
    try {
      await client.query('BEGIN');
      const result = await values.length ? client.query(data, values) : client.query(data);
      result.rows.forEach(row => {
        console.log(row.name);
      });
    } catch (e) {
      await client.query();
    } finally {
      client.release();
    }
  });
}

executeSQL('/sql/migrations/2025_08_04_init_migrations.sql');

/**
 * Select all migrations, filter out executed migrations, and executes leftover migrations.
 */
const executeNewMigrations = () => {
  // Select All Migrations

}
