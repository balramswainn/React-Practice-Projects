// External Module
const express = require('express');

const app = express();

app.get("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  // res.send("<p>Came from First Middleware</p>");  
  //ye comment hai bcz we cannot call next() after res.send cuz res ja chuka hai so aghe ka call nhi hoga 
  // next();
});

app.post("/submit-details", (req, res, next) => {           //Route Middleware Sirf /submit-details POST request pe chalega
  console.log("Came in second middleware", req.url, req.method); //means form submit hua hum res bhej rhe hai
  res.send("<p>Welcome to Complete Coding Nodejs series</p>"); 
});

app.use("/", (req, res, next) => {                          //Global Middleware  -> Har request pe chalega (sab URLs pe)
  console.log("Came in another middleware", req.url, req.method);
  res.send("<p>Came from another Middleware</p>");    
});


const PORT = 3002;
app.listen(PORT, () => {          //Middleware nahi hai ❌Ye sirf server ko start karta hai (port pe listen karne ke liye)
  console.log(`Server running on address http://localhost:${PORT}`);
});



// next() -> next middleware k pass jata hai res.send() k baad next() nhi chalega
// app.use() → Har request pe chalega (URL ya method kuch bhi ho)
// app.get() → Sirf GET requests pe chalega (e.g., page open karte time)
// app.post() → Sirf POST requests pe chalega (e.g., form submit / data send)



// 👉 app.get('/', handlerFunction)

// '/' = route
// handlerFunction = middleware
// ⭐ Middleware: (req, res, next) => { res.send("hey") }
// Ye exactly middleware hi hai.
//Aur jab tum ise app.get() ke andar pass karte ho → ye route middleware ban jata hai.


// Express is a web framework for Node.js.
// It helps you build server-side applications easily — mainly APIs and backend services.
// Express = Server + Routing + Middleware + Request/Response Handling

// Think of Express as a toolbox that simplifies:

// Receiving requests from the browser
// Processing data
// Calling databases
// Sending responses back
// Without Express, doing this in pure Node.js is much harder and longer.

//content-type,http,createserver, res.end apne aap ho jata hai so ye sab set karne ki isme need nhi

// | Task                       | What Express Helps With                                   |
// | -------------------------- | --------------------------------------------------------- |
// | Create a server            | `const app = express()`                                   |
// | Listen on a port           | `app.listen(3000)`                                        |
// | Handle routes (URLs)       | `app.get('/home', ...)`                                   |
// | Read request data (inputs) | `req.body`, `req.params`, `req.query`                     |
// | Send responses             | `res.send()`, `res.json()`                                |
// | Work with databases        | You connect DB inside route handlers                      |
// | Middleware support         | Add functions to run before request reaches final handler |



// What is Middleware?

// Middleware is just a function that runs before your main route (request handler) runs.It is used to check, modify, or log the request before sending a response.
// Jab browser request bhejta hai, Express us request ko direct route tak nahi bhejta.
// Pehle wo request middleware se pass hoti hai.

// Why Middleware is needed?

// Because many tasks are common for multiple routes, for example:
// | Kaam               | Kyu?                                           |
// | ------------------ | ---------------------------------------------- |
// | Check user login   | Agar login nahi hai → route tak mat jaane do   |
// | Log karna          | Console me dikha do ki kis URL pe request aayi |
// | Body ko read karna | JSON data ko JS object me convert karna        |
// | Permissions check  | Ye user allowed hai ya nahi                    |



// Instead of repeating code in every route → middleware does it once.

// How Middleware Works (Flow)
// Client → Request → Middleware → Route Handler → Response → Client

// Type of Middleware

// 1. Application / Global Middleware:   app.use(...) -> Har request ke liye chalta hai.

// 2. Route Middleware : app.get(), app.post() ke andar jo function hota hai. -> Sirf specific route pe chalta hai.

// 3. Third-Party Middleware: Bahar se install karte ho.Example:
// const cors = require("cors");
// app.use(cors());

// 4. Error Handling Middleware: Jab koi error ho jaye tab chalta hai. Isme 4 parameters hote hai:
// app.use((err, req, res, next) => {
//   res.status(500).send("Something went wrong");
// });

// Then app.use() kab use hota hai?

// app.use() middleware ke liye use hota hai:
// Authentication check (user logged in hai ya nahi)
// Logging (console me request print)
// Request body parse (express.json())
// Static files serve karna (CSS, Images, JS)
// Error handling

