const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db");
const { linkRouter } = require("./src/routes/linkRoutes");
const { createLinksTable } = require("./src/models/linkSchema");
const cors = require("cors")

dotenv.config();

const app = express();
app.use(express.json());

app.use(linkRouter)
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
  
// Connect DB
connectDB();

createLinksTable()

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
