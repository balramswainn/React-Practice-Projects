// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");
const { registeredHomes } = require('./hostRouter'); // destructure kiya bcz hostRouter se object banke export hua 

userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'Home'});
  //humne app.js me likha hai app.set('view engine', 'ejs') Express .ejs extension automatically add karta hai.; app.set('views', 'views');Express views folder ke andar EJS files dhundta hai.Express automatically internally karta hai:views/home.ejs find karo, Usko render karo, Usme data inject karo, HTML bana ke browser ko send karo, Tumhe .ejs likhne ki zaroorat nahi., Tumhe full path likhne ki zaroorat nahi., Express khud hi views folder me home.ejs dhund leta hai.

//   {registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'Home'}
//   Key (left side) = EJS me variable ka naam,Value (right side) = actual data jo tum bhej rahe ho
// ✅ EJS automatically is object ko template variables me convert kar deta hai.
// ✅ Tum directly un variable names ko EJS me use kar sakte ho.

  //Template file ko render karke final HTML response browser ko bhejta hai.Because res.render() ko hamesha ek OBJECT chahiye, jiske andar template ko pass kiya hua data hota hai.registeredHomes chahe array ho, string, number, object, kuch bhi ho…✅ res.render() hamesha data ko ek object ke form me leta hai.Left side (key) → EJS template ke andar naam, Right side (value) → Actual data (yaha array) so registeredHomes=[] hai so isliye hum-> home me registeredHomes.forEach kar pa rahe the  ,  header me page title dena hai isiliye
});

module.exports = userRouter;



// const userRouter = express.Router(); →  routes ko alag file me group karne ka tarika.
// → Is line ka matlab hai ek chhota router object banana jisme users se related routes likhoge.
// Large projects me saare routes app.js me likhne se code messy ho jata hai.So Express Router allow karta hai routes ko alag files me group karne ke liye.


// pehle hum saare routes directly app par likhte the, ab hum router bana ke app.use() se connect karte hai. Ab (With express.Router())

// Step 1 → Alag router file me routes likho
// Step 2 → Main app.js me connect karo -> app.use("/user", userRouter);