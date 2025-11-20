const { pool } = require("../../db");
const { isValidUrl } = require("../utils/validateUrl");


const createLink = async (req, res) => {
    try {
      const { url, code } = req.body;
  
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }
  
      if (!isValidUrl(url)) {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      // If same URL already exists, return existing short code
    const existingUrl = await pool.query(
        "SELECT * FROM links WHERE url=$1",
        [url]
    );
  
    if (existingUrl.rows.length > 0) {
        return res.status(400).json({message: "Url already exists"});
    }
  
      // custom code validation
      if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
        return res.status(400).json({ error: "Invalid code format" });
      }
  
      // If custom code exists, 409
      if (code) {
        const check = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
        if (check.rows.length > 0) {
          return res.status(409).json({ error: "Short code already exists" });
        }
      }
  
      // Generate random code if not provided
      const shortCode =
        code ||
        Math.random().toString(36).substring(2, 10).slice(0, 6);
  
      const insert = await pool.query(
        "INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *",
        [shortCode, url]
      );
  
      return res.status(201).json(insert.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
};

const getAllLinks = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM links ORDER BY created_at DESC");
      return res.json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };



  const getLinkStats = async (req, res) => {
    try {
      const { code } = req.params;
      const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Link not found" });
      }
  
      return res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  const deleteLink = async (req, res) => {
    try {
      const { code } = req.params;
  
      await pool.query("DELETE FROM links WHERE code=$1", [code]);
  
      return res.json({ message: "Deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
    const redirectLink = async (req, res) => {
    try {
      const { code } = req.params;
  
      const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
  
      if (result.rows.length === 0) {
        return res.status(404).send("Not found");
      }
      console.log("result",result)
  
      // Increment click count + update last clicked
      await pool.query(
        "UPDATE links SET clicks = clicks + 1, updated_at = NOW() WHERE code=$1",
        [code]
      );
      console.log("helllobcbsh")
      return res.redirect(302, result.rows[0].url);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  };

module.exports = {createLink,getAllLinks,getLinkStats,deleteLink,redirectLink}
  