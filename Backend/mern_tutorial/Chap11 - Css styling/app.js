// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const userRouter = require("./routes/userRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");

const app = express();
                                                                                                          
app.use(express.urlencoded()); 
app.use(userRouter);   
app.use("/host", hostRouter);  

app.use(express.static(path.join(rootDir, 'public')))   //explanation niche hai ye bas automatic route bana deta hai so manually likhne ki jarurat nhi and public ki saari files ko server root URL me available ho jaegi

app.use((req, res, next) => {  
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html')); 
 
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});







// ✅ express.static() route banata hai without callback,
// ✅ aur normal app.get() route banata hai callback ke saath.

// app.get("/add-home", (req, res) => {
//   res.sendFile(path.join(rootDir, "views", "addHome.html"));
// });

// ✅ Jab user /add-home URL open kare → tab server ye page bheje
// ✅ Tum manually control kar rahe ho kaun file kab send hogi



// express.static() kaise kaam karta hai Ye automatically ek folder expose kar deta hai.
// app.use(express.static(path.join(rootDir, "public")));

// ✅ Public folder ke andar ki saari files ko server root URL me available kar do
// ✅ Tumhe har file ke liye route banane ki zaroorat nahi
// ✅ No callback required
// Now you can access:
// http://localhost:3000/home.css
// http://localhost:3000/script.js
// http://localhost:3000/img1.png

// Bina koi route banaye.
// This is why CSS works with just:<link rel="stylesheet" href="/home.css"></link>




// Why no callback?

// Because Express tumhari public folder ki har file ke liye automatically routes bana deta hai, jaise:
// GET /home.css        → public/home.css
// GET /script.js       → public/script.js
// GET /img1.png        → public/img1.png

// Tumhe manually:
// js
// Copy code
// app.get("/home.css", ...)
// likhne ki zarurat nahi.

// Ye sab express.static khud karta hai.


