// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');         //import mongoose




const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

                                                                                                          
app.use(express.urlencoded()); 

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);  // 404 error page not found aya toh 404 page ko render kardena.

const PORT = 3000;

//_db = client.db('airbnb')mongo me airbnb se lete the wese yaha idhr likha airbnb.
const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/airbnb?appName=CompleteCoding"; 
//   Yeh tumhara Atlas cluster ka connection string hai. root:root = username + password , tw25bjj.mongodb.net = cluster address , appName = optional MongoDB name , Is URL ko MongoClient connect karega.

mongoose.connect(DB_PATH).then(() => { //MongoDB database se connection banata hai.
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});


// 1. npm i mongoose 


// const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/?appName=CompleteCoding"; 
// isme db nhi diya tha so isbar mongoose me yaha de dete hai 'airbnb'       
// const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/airbnb?appName=CompleteCoding"; 

// ✔️ MongoDB airbnb naam wale database me connect hoga.
// ✔️ Collections iske andar banengi (homes, users, bookings, etc.) 



// ==========================================

// MongoDB → actual database (where data is stored).
// Mongoose → a library (tool) in Node.js that helps you connect to MongoDB and manage data easily. 
// Mongoose is a JavaScript Object Data Modeling (ODM) library for MongoDB, used to structure and interact with data in Node.js applications. It simplifies working with MongoDB by providing a schema-based approach, enforcing data structure, performing validation, modeling relationships, and offering a powerful query builder to manage data efficiently. 

// We use Mongoose because:
// ✅ It makes MongoDB easier to use with Node.js.
// ✅ It gives structure to data using Schemas and Models.
// ✅ It helps in validations, queries, and relationships easily.

// you can use MongoDB without Mongoose — using the official MongoDB Node.js driver, but it’s more manual and code becomes longer.
   