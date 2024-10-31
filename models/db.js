const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL_RENDER,
});

module.exports = pool;
