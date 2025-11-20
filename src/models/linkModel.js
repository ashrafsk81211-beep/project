const pool = require("../../config/db");

exports.createLink = async (url, code) => {
  const query = `
    INSERT INTO links (url, code)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await pool.query(query, [url, code]);
  return result.rows[0];
};

exports.getAllLinks = async () => {
  const result = await pool.query(`SELECT * FROM links ORDER BY id DESC`);
  return result.rows;
};
