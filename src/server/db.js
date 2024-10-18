import pg from "pg";
import "dotenv/config";

const db = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  passowrd: process.env.DB_PASSOWRD,
  database: process.env.DB_DATABASE,
});

export default db