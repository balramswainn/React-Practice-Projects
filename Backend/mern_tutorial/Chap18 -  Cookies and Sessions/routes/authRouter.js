// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;


// 1. What Are Cookies?
// Cookies are small pieces of data stored in the user’s browser by the website.

// 2. Where Are Cookies Stored?
// Cookies are stored in the browser, not on the server.

// 3. When Are Cookies Sent?
// Every time the browser makes a request to the same website, it automatically sends all cookies related to that domain.Example request header:Cookie: isLoggedIn=true; userId=12345  This happens automatically — you don’t need to write extra code.

// 4. Why Do We Use Cookies?
// (1) To keep the user logged in:- Example: User logged in today → close browser → reopen → still logged in Because cookie: isLoggedIn=true is stored.
// (2) To identify users between requests:- HTTP is stateless → Server does not remember who made the previous request. Cookies solve this by storing something like: userId=12345 Now server knows: 👉 “Oh this user is Balram, not someone else.”
// (3) To store small preferences:- Examples: Dark mode: theme=dark , Language: lang=en,  Items per page: items=20
// (4) For tracking & analytics:- Example: Google Analytics, Stripe, Ad trackers, These save cookies like: _ga=abc123, stripe_mid=xyz 
// (5) For cart systems (before login):- Before login, cart items are stored in cookies: cart=[{id:1, qty:2}]

//5. What Cookies Are NOT Used For?
// ❌ They are not for large data ❌ Not for secure passwords ❌ Not for storing private info (unless encrypted)

// 6. Are Cookies Secure?  
// They can be — if we use: HttpOnly → JS cannot read, Secure → only over HTTPS, SameSite → prevents CSRF

// ===============================================================================================


// 1. What Are Sessions? 
// Sessions store user data on the server (not in the browser). The browser only stores a session ID (tiny string), and the server stores the actual user data. Example browser cookie: sessionId=abc123xyz | 
// Example server data (session store): {
//   abc123xyz: {
//     userId: "6743...",
//     username: "Balram",
//     isLoggedIn: true
//   }
// }

// 2. Where Are Sessions Stored?
// Sessions are stored on the server side, usually in: Memory,  Redis, Database, File storage, Browser me sirf sessionId store hota hai.

// 3. How Sessions Work (Easy Flow)
// 1️⃣ User login karta hai
// 2️⃣ Server user ka data store karta hai as a "session"
// 3️⃣ Server browser ko sessionId cookie return karta hai
// 4️⃣ Browser har request me sessionId send karta hai
// 5️⃣ Server sessionId dekh kar user ko identify karta hai

// 4. Why Do We Use Sessions?
// (1) To keep user logged in securely:- User ke login details server me stored hote hain. Browser me sirf ek harmless ID hoti hai. This makes sessions safe & secure.
// (2) To store large user data (server side):- Cookies = store small data, Sessions = store bigger, sensitive data
// Example session data: cart: [...], role: "admin", name: "Balram" . Cookies me aisa data store nahi karna chahiye.
// (3) Because HTTP is stateless:- Server ko nahi pata ki: Ye request kiska hai? Ye user logged in hai? Ye admin hai ya normal user? Session server ko user ko "pehchan" maintain karna allow karta hai.
// (4) To secure authentication :- Sensitive data like: userId, role, permissions, login status, sessions me safe rehta hai.
// (5) Better security than cookies:- Cookies → client side, Sessions → server side, Agar attacker cookies me data modify kare, session server me safe rehta hai.

// 5. What Sessions Are NOT Used For
// ❌ Storing huge files/data
// ❌ Sharing between different domains
// ❌ Permanent storage (session usually expire)

// 🔒 6. Are Sessions Secure?
// Yes — much more secure because: Data server par hota hai, Browser me sirf sessionId hota hai, SessionId ko HttpOnly + Secure se protect kar sakte