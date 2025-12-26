// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/todo?appName=CompleteCoding";

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter")
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = 3001;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});



//steps
// 1. pehle front end ka ui banaya
// 2. backend me ( app.js , models, routes, controller) banaya
// 3. sab dependencies install kiye ( nodemon , express, mongodb, mongoose, )
//     cors - npm i cors
// 4. app.use(express.json());   json bhi use karn hai 

// frontend me jao 
// src -> create folder services backend se baat chit ye karega
// src -> services -> itemsService.js








// 🔒 What is CORS?

// CORS (Cross-Origin Resource Sharing) ek browser security rule hai.
// Ye decide karta hai ki frontend (browser) kisi dusre domain/port ke backend se data le sakta hai ya nahi.

// Example:
// Frontend → http://localhost:3000
// Backend → http://localhost:5000
// ❌ Browser bolega: Blocked by CORS (jab tak backend allow na kare)


// 🤔 CORS error kyun aata hai?
// Browser request bhejne se pehle check karta hai:
// Origin (domain + port + protocol) same hai ya nahi
// Agar different origin hai → backend ko headers ke through allow karna padta hai

// ✅ Node.js / Express me CORS ka solution
// 1️⃣ Sabse easy (using cors package)
// npm install cors
// app.use(cors()); // sab origins allow
// ✔️ Ab koi bhi frontend is backend ko call kar sakta hai



// =====  Deployment k time =========

// ✅ Ye sahi hai (production)
// app.use(cors({
//   origin: "https://yourfrontend.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// 👉 Sirf tera frontend domain backend ko call kar sakta hai
// 👉 Baaki sab block

// 🧠 Simple logic (1 line me)

// Development → open CORS
// Production → restricted CORS
// ==========================================

// 🏗️ Different deployment scenarios

// 1️⃣ Frontend & Backend SAME domain
// https://yourapp.com
// https://yourapp.com/api
// ✔️ CORS ki zarurat hi nahi
// // cors middleware hata bhi sakta hai


// 2️⃣ Frontend & Backend DIFFERENT domain (most common)
// Frontend → https://bestdeal.in
// Backend  → https://api.bestdeal.in

// app.use(cors({
//   origin: "https://bestdeal.in"
// }));
// ✔️ CORS REQUIRED

// 3️⃣ Multiple frontends (admin + user)
// const allowedOrigins = [
//   "https://bestdeal.in",
//   "https://admin.bestdeal.in"
// ];

// app.use(cors({
//   origin: allowedOrigins
// }));


// ✅ Best practice (PRO tip)

// Environment-based config use kar:

// const corsOptions = {
//   origin:
//     process.env.NODE_ENV === "production"
//       ? "https://bestdeal.in"
//       : "http://localhost:3000",
//   credentials: true
// };

// app.use(cors(corsOptions));


// =========================================================

// 1️⃣ Network Request

// 👉 A network request is when a client (browser/app) asks data or sends data to a server over the internet.
// Example:
// Browser → request → Server → response


// 2️⃣ Async Requests

// 👉 Asynchronous requests don’t block the page.
// The app continues running while data loads in the background.
// Example:
// Fetching data using fetch() / axios without page reload.


// 3️⃣ API

// 👉 API (Application Programming Interface) is a set of rules that lets two applications communicate.
// Example:
// Frontend calls backend API to get user data.


// 4️⃣ REST API (Core Concepts)

// 👉 REST API is an API design style that uses HTTP methods and URLs.
// Core concepts:
// Uses HTTP methods (GET, POST, etc.)
// Uses URLs for resources (/users, /products)
// Uses JSON for data
// Stateless means:
// 👉 Server does not remember client state
// 👉 Every request must contain all required data (like token)


// 5️⃣ HTTP Methods

// GET → Fetch data
// POST → Create new data
// PUT → Update entire data
// PATCH → Update partial data
// DELETE → Remove data

// 6️⃣ Decoupling Frontend & Backend

// 👉 Frontend and backend are independent and talk only via APIs.
// Benefits:
// Frontend & backend can be developed separately
// Same backend can serve web, mobile, etc.
// Easier maintenance & scalability