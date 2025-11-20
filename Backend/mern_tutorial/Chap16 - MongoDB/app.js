// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const {mongoConnect} = require('./utils/databaseUtils');


const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

                                                                                                          
app.use(express.urlencoded()); 

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);  // 404 error page not found aya toh 404 page ko render kardena.

const PORT = 3000;
mongoConnect(() => {      //Server tabhi start hota hai jab Mongo connection successfully ho chuka hota hai. server start hone se pehle call karte hai bcz nhi kiya toh error aaega and baadme call kare toh Server early requests ko handle nahi kar paayega
  app.listen(PORT, () => {  //Pehle DB connect karo  ->Fir server start karo
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})


// MongoDB = NoSQL database, jisme data tables me nahi,
// documents (JSON objects) me store hota hai.

// 🟢 Key points:
// Schema-free (structure flexible hota hai)
// JSON-like documents (developer-friendly)
// High performance
// Horizontal scaling (easy to handle big data)
// Big apps me perfect (Uber, Netflix, Google use karte hain)


// ✅ 2. MongoDB Atlas vs Community (Difference)

// 🔵 MongoDB Community Server
// Free open-source version
// → Tum apne laptop/server pe install karte ho.

// ✔ Features:
// Full database on your machine
// Local development ke liye perfect
// No auto backups
// No monitoring dashboards
// No auto scaling
// Setup, security, config tumhe khud karna hota hai

// Use case:
// Local development, small apps, learning.


// 🟣 MongoDB Atlas
// Cloud version (SAAS) → Fully managed by MongoDB company.

// ✔ Features:
// Online database (URL milta hai)
// Auto backups
// Auto scaling
// Built-in monitoring dashboard
// Global clusters
// Security & updates handled automatically
// Sharding, replica sets built-in
// 24/7 uptime
// Production-ready

// Use case:
// Industry level large apps, enterprise use.

// npm install mongodb

//mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/?appName=CompleteCoding