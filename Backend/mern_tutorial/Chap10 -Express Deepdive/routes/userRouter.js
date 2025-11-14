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



// const userRouter = express.Router(); →  routes ko alag file me group karne ka tarika.
// → Is line ka matlab hai ek chhota router object banana jisme users se related routes likhoge.
// Large projects me saare routes app.js me likhne se code messy ho jata hai.So Express Router allow karta hai routes ko alag files me group karne ke liye.


// pehle hum saare routes directly app par likhte the, ab hum router bana ke app.use() se connect karte hai. Ab (With express.Router())

// Step 1 → Alag router file me routes likho
// Step 2 → Main app.js me connect karo -> app.use("/user", userRouter);