// src/models/linkschema.js

const { pool } = require("../../db");

const createLinksTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        code VARCHAR(255) UNIQUE NOT NULL,
        clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(sql);
    console.log("✅ Links table ready");
  } catch (err) {
    console.error("❌ Error creating links table:", err);
  }
};

module.exports = { createLinksTable };
