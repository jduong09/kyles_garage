import 'dotenv/config';
import { readFileSync, readdirSync } from 'node:fs';
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
 * @param {String} sql
 * @param {Array} values
 * @description Given a sql query and values array, perform transaction
 */
const transaction = async (sql, values) => {
  const client = await pool.connect();
  let result;
  try {
    if (values) {
      result = await client.query(sql, values);
    } else {
      result = await client.query(sql);
    }
    return result;
  } catch(err) {
    console.log(`Error in transaction of ${sql}: `, err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

/**
 * @param {String} file
 * @description Given a filepath, read SQL query and perform transaction.
 */
export const sqlToStr = (file) => {
  const filepath = join(__dirname, file);
  const result = readFileSync(filepath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Read File Error: ', err);
    }
    return data;
  });
  return result;
}

/**
 * @param {String} file 
 * @param {Array} values 
 * @returns Result object of database call
 */
export const execute = (file, values) => {
  const sql = sqlToStr(file);
  return new Promise((resolve, reject) => {
    try {
      resolve(transaction(sql, values));
    } catch(err) {
      reject(err);
    }
  })
}

/**
 * @description Select all migrations, filters out executed migrations, and executes leftover migrations.
 */
export const migrate = async () => {
  let migrations = [];
  const client = await pool.connect();
  try {
    const allMigrations = await client.query(sqlToStr('/sql/migrationQueries/get_all.sql'));
    migrations = allMigrations.rows.map((migration) => migration.file_name);
  } catch (e) {
    console.log('First migration');
  }
  
  const dirPath = join(__dirname, '/sql/migrations/');
  const files = readdirSync(dirPath);
  
  try {
    await client.query('BEGIN');
    files.forEach(async (file) => {
      if (!migrations.includes(file)) {
        await client.query(sqlToStr(`/sql/migrations/${file}`));
        await client.query(sqlToStr('/sql/migrationQueries/put.sql'), [file]);
      }
    });
    await client.query('COMMIT');
  } catch(err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
