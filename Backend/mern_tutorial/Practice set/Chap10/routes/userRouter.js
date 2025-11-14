// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router(); //so we can group routes in diff file

// Local Module
const rootDir = require("../utils/pathUtil");

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = userRouter;