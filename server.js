const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db");
const { linkRouter } = require("./src/routes/linkRoutes");
const { createLinksTable } = require("./src/models/linkSchema");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ FIX 1: CORS MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ✅ FIX 2: Allow preflight requests
app.options("*", cors());

// Routes
app.use(linkRouter);

// Connect DB
connectDB();
createLinksTable();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});