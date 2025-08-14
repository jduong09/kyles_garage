import { readFile, readdirSync } from 'node:fs';
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

/**
 * DB Query
 */

/**
 * SQL Query Given a filepath
 * @description Given a filepath, read SQL query and perform transaction.
 */
const executeSQL = (file, values = []) => {
  const filepath = join(__dirname, file);
  const array = new Promise ((resolve, reject) => {
    let mappedArray = [];
    readFile(filepath, 'utf-8', async (err, data) => {
      if (err) throw err;
      try {
        await client.query('BEGIN');
        const result = await client.query(data, values);
        result.rows.forEach((row) => {
          mappedArray.push(row);
        });
        await client.query('COMMIT');
        resolve(mappedArray);
      } catch (e) {
        await client.query('ROLLBACK');
        reject(e);
      } finally {
      }
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
          console.log(file);
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

executeNewMigrations();