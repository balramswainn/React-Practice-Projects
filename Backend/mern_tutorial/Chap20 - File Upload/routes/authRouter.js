// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

authRouter.get("/signup",authController.getSignup)
authRouter.post("/signup",authController.postSignup)

module.exports = authRouter;


// 🔐 1. Authentication (AUTHN)
// ⭐ Meaning: “Are you the real user?”
// Authentication user ki identity verify karta hai.
// Example:
// Username + Password
// OTP
// Fingerprint
// Google Login

// ⭐ Questions authentication answers:
// Ye user kaun hai?
// Kya credentials sahi hain?
// Kya ye sach me Balram hi hai?

// ⭐ Result:
// 👉 System ko user ki identity ka pata chal jata hai.


// 🎫 2. Authorization (AUTHZ)
// ⭐ Meaning: “What is this user allowed to do?”
// Authentication ke baad system check karta hai ki user ke kya rights hain.
// Example:
// Normal user blog post read kar sakta
// Admin blog post delete kar sakta
// Customer apna order dekh sakta
// Staff customer data dekh sakta

// ⭐ Questions authorization answers:
// Kya user admin hai?
// Kya user ko is page ka access hai?
// Is user ko ye action perform karne ka right hai?

// ⭐ Result:
// 👉 System decide karta hai ki user kya kar sakta hai aur kya nahi.

// | Step        | Authentication     | Authorization              |
// | ----------- | ------------------ | -------------------------- |
// | Login page  | Password check     | ❌                          |
// | After login | User identified    | Role check                 |
// | Example     | "Balram logged in" | "Balram is admin or user?" |


// 🧠 Real World Example
// 📝 Authentication:
// You enter email & password → system checks → you're logged in.

// 🔑 Authorization:
// You try to access Admin Dashboard → system checks your role:
// If role = admin → allowed
// If role = user → denied