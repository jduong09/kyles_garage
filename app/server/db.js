import { readFile, readdirSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use for Production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/*
const pool = new Pool({
  host: 'localhost',
  database: 'kyles_garage',
  port: 5432,
});
*/

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

const convertSQL = (data, values) => {
  if (values.length) {
    for (let i = 0; i < values.length; i++) {
      const str = `$${i + 1}`;
      data = data.replace(str, values[i].toString());
    }
  }
  return data;
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
const executeNewMigrations = async () => {
  let migrations = [];
  try {
    // Select All Migrations
    const allMigrations = await executeSQL('/sql/migrationQueries/get_all.sql');
    migrations = allMigrations.map((migration) => migration.file_name);
  } catch {
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