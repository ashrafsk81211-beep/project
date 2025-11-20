const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  keepAlive: true
});

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");   // ← REAL CONNECTION HAPPENS HERE
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

module.exports = { pool, connectDB };
