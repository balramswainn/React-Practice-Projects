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

// -------------------------------------------------------
// app -> routes | controller | models 
//       routing | middleware | data store keses hoga (data read and write kese karenge db se)


// views -> html /ejs files ->  controller (middleware me link karte hai)
// utils -> root directory deta hai
// public-> css files 

//controller ka kam model ko bolna hai data leke aao data deke aao
// ----------------------------------------------------------



// MVC stands for Model-View-Controller,
//  a software architectural pattern that divides an application into three interconnected components to separate concerns like data, user interface, and application logic. 

// The Model manages the data and business logic,
// The View handles the user interface
// The Controller acts as a middleman to process user input, interact with the Model, and select the appropriate View to display.

// This separation makes applications more scalable, maintainable, and easier to test. 
 

// ✅ 1. MODEL — Data & Database Layer

// Yaha pure data se related kaam hota hai:
// ✅ Database reading
// ✅ Database writing
// ✅ Arrays / objects me data store karna
// ✅ Functions jo data ko handle kare
// ✅ Model = business logic related to data
// ❌ HTML/response ka koi kaam nahi


// ✅ 2. VIEW — User ko dikhta kya hai (UI layer)

// Ye templates hote hain (EJS, HTML, pug etc).
// ✅ UI show karne ka kaam
// ✅ Template files (home.ejs, product.ejs)
// ✅ View = bas data display karta hai
// ❌ Data process nahi karta
// ❌ Database se nahi jodta


// ✅ 3. CONTROLLER — Brain of the app

// Controller user request lunga → model se data loonga → view ko bhejunga.
// ✅ Controller = route request handle karta
// ✅ Model se data fetch karta
// ✅ View me data pass karta (res.render)
// ❌ HTML likhne ka kaam nahi
// ❌ DB store ka code nahi



// ✅ MVC Flow (super simple)
// 👉 User: “/products” URL open karta

// ↓

// 👉 Router request controller ko deta

// ↓

// 👉 Controller: Model se data leta

// ↓

// 👉 Controller: res.render() se View ko data deta

// ↓

// 👉 View: HTML me data display karta