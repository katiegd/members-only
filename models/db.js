const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL_RENDER,
  // ssl: {
  //   rejectUnauthorized: false,
  // },

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
