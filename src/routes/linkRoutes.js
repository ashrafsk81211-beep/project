const express = require("express");
const { createLink, getAllLinks, getLinkStats, deleteLink, redirectLink } = require("../controllers/linkController");

const app = express()

const linkRouter = express.Router()

linkRouter.post("/api/links", createLink);
linkRouter.get("/api/links",getAllLinks)
linkRouter.get("/api/links/:code", getLinkStats);
linkRouter.delete("/api/links/:code", deleteLink);

// redirect route
linkRouter.get("/:code", redirectLink);


module.exports = {linkRouter}