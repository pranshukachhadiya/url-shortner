require('dotenv').config();
const pool = require('./db');

async function setup() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      long_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('Table created (or already exists)');
  process.exit(0);
}

setup();