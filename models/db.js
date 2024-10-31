const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL_RENDER,
});

if (process.env.DATABASE_URL_RENDER) {
  pool.ssl = { rejectUnauthorized: false };
}

module.exports = pool;
