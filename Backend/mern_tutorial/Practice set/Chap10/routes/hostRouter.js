// Core Module
const path = require('path');

// External Module
const express = require('express'); 
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
})

hostRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body)
  res.sendFile(path.join(rootDir, 'views', 'succes.html'));
})

module.exports = hostRouter;