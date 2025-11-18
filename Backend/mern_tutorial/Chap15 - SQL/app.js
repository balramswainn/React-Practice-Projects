// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");


const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

                                                                                                          
app.use(express.urlencoded()); 

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});


// mySql install karo -> username:root , pass: root
// goto app: create new schema -> name -> apply ->ise schema banega airbnb name se(mysql me hum ui se karte hai)command se bhi hosakta hai
// airbnb -> tables,views, stored procedures, functions ....andr ban gaya but kuch hai nhi inke andhr create karna padega
// now goto vscode and run -> npm install mysql2 -> this helps to connect with mysql(jese work bench ui hume help karta hai)
// create file databaseUtils.js inside utils  