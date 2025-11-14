const http=require('http')  
//This imports Node.js’s built-in HTTP module.This module lets you create an HTTP server — no need to install anything extra.

const server = http.createServer((req,res)=>{      //http.createServer() creates a server object.
  console.log(req); 
  // res.end("hey")            // orinally ye nhi tha ye likhne k baad response jaega and infinite refresh stop ho jaega
});

const PORT=3000;            //Defines the port number your server will listen on.

server.listen(PORT, ()=>{   //This starts the server and makes it listen for incoming requests on port 3000.
  console.log(`server running at http://localhost:${PORT}`)
})


// const server = http.createServer((req, res) => { ... })
// http.createServer() creates a server object. Aur ye object Node.js ke http module se aata hai. Ye object ek network listener hai —
// jo TCP port (jaise 3000) pe baith kar requests sunta hai. Jab koi request aati hai (browser se),toh Node.js internally:  request ko parse karta hai, usse req (request) aur res (response) objects me convert karta hai, aur tumhare callback function ko call karta hai.

// It takes a callback function with two parameters:
// req → request object (contains info about the incoming request — URL, method, headers, etc.)
// res → response object (used to send data back to the client).
// Here, inside the callback, we do console.log(req) to print request details whenever someone hits the server.


// You are only logging the request…
// but you never send a response back to the browser using res.end() or res.write().


// 💡 What happens because of that:
// When the browser requests http://localhost:3000, Node receives it (req object logs ✅).

// But since you didn’t send any response,the browser keeps waiting… thinking:

// “I’ve asked for something, but the server hasn’t replied yet 😕.”

// So, the browser keeps loading infinitely ⏳.

//✅ Use res.end() → to send data and close the connection.






// 👉 Server = koi bhi system jo request ka response deta hai.Ye ek concept hai, koi ek specific machine nahi.

// ⭐ Hosting machine = server
// Kyuki woh tumhara app run karke duniya ko response deta hai.

// ⭐ Tumhara Express app = server
// Kyuki woh bhi request lekar response deta hai.


// Hosting server ka kaam sirf ek hi major cheez hai:Tumhare Node.js / Express app ko internet par chala dena.
// Express ka role kya?

// Express logic handle karta hai:
// ✔ request aaye → route match
// ✔ data fetch → processing
// ✔ response bhejna
// ✔ business logic
// ✔ database communication
// Yeh sab tumne code likh ke banaya.


// Jab tum apna Express server hosting server pe upload karte ho:
// 👉 Hosting server tumhara Node.js + Express code run karta है
// 👉 Ab duniya ke users ki request tumhare Express routes me aati है
// 👉 Response vahi Express server deta है

