const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db");
const { linkRouter } = require("./src/routes/linkRoutes");
const { createLinksTable } = require("./src/models/linkSchema");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS FIRST
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://frontend-cyan-phi-v32uado3yy.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ✅ FIX: SAFE PREFLIGHT HANDLER FOR EXPRESS v5
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.use(linkRouter);

// DB
connectDB();
createLinksTable();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});