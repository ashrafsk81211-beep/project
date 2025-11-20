const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// db.js or db-connection.js
const DATABASE_URL="postgresql://neondb_owner:npg_pWQUb2ze9PNL@ep-bold-grass-a4xllfeg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"


const connectionString = process.env.DATABASE_URL || DATABASE_URL;
if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set!');
  // optional: throw new Error('DATABASE_URL missing');
}

const pool = new Pool({
  connectionString,
  // For many managed Postgres (Render/Heroku/Neon) you need SSL:
  ssl: {
    rejectUnauthorized: false
  },
  // optionally set idleTimeoutMillis, connectionTimeoutMillis, etc.
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
