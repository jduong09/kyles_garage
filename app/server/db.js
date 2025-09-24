import 'dotenv/config';
import { readFile, readdirSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

/**
 * Use for Production
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require',
  }
});
*/

/*
* For Testing
*/
export const pool = new Pool({
  host: 'localhost',
  database: 'kyles_garage',
  port: 5432,
});

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory

/**
 * Transaction
 * @description Given a query, perform transaction
 */
const transaction = async (sql, values) => {
  const client = await pool.connect();
  let result;
  try {
    await client.query('BEGIN');
    if (values.length) {
      result = await client.query(sql, values);
    } else {
      result = await client.query(sql);
    }
    await client.query('COMMIT');
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch(e) {
      console.log('could not rollback: ', e);
    }
    throw err;
  } finally {
    client.release();
  }
  return result;
}

/**
 * SQL Query Given a filepath
 * @description Given a filepath, read SQL query and perform transaction.
 */
export const executeSQL = (file, values = []) => {
  const filepath = join(__dirname, file);
  const array = new Promise((resolve, reject) => {
    readFile(filepath, 'utf-8', async (err, data) => {
      if (err) reject(err);
      resolve(transaction(data, values));
    });
  });
  return array;
}

/**
 * Select all migrations, filter out executed migrations, and executes leftover migrations.
 */
export const executeNewMigrations = async () => {
  let migrations = [];
  try {
    // Select All Migrations
    const allMigrations = await executeSQL('/sql/migrationQueries/get_all.sql');
    migrations = allMigrations.rows.map((migration) => migration.file_name);
  } catch (e) {
    console.log(e);
    console.log('First migration');
  }

  await pool.connect(async (error, client, release) => {
    if (error) {
      console.log(error);
    }
    try {
      await client.query('BEGIN');
      // Filtered Out Executed Migrations and Execute Non Migrated Files
      const dirPath = join(__dirname, '/sql/migrations/');
      const files = readdirSync(dirPath);
      files.forEach(async (file) => {
        if (!migrations.includes(file)) {
          await executeSQL(`/sql/migrations/${file}`);
          await executeSQL('/sql/migrationQueries/put.sql', [file]);
        }
      });
      await client.query('COMMIT');
    } catch (e) {
      console.log(e);
      await client.query('ROLLBACK');
    } finally {
      await release();
    }
  });
}