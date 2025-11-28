// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);//sab proper work kar rha tha but jese hi refresh ho jata hai server restart hota hai save karne pe kuch bhi code and memory initialize hoti hai sab session gayab ho jata hai fhir login karna padta hai session humare system memory me save ho rha hai hume backend me karna hai hume permanent store karna padega  so we use this

const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/airbnb?appName=CompleteCoding"; 
//   Yeh tumhara Atlas cluster ka connection string hai. root:root = username + password , tw25bjj.mongodb.net = cluster address , appName = optional MongoDB name , Is URL ko MongoClient connect karega.

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require('./routes/authRouter')
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');         //import mongoose




const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

const store = new MongoDBStore({ //Ye line Express-session ke liye MongoDB ko session storage bana rahi hai. “Sessions database me store karo, memory me nahi.”Iska kaam:👉 Express-session ko MongoDB se connect karna 👉 Sessions ko MongoDB me store karna
  uri: DB_PATH,    //👉 “Session database is here.”
  collection: 'sessions' //Ye MongoDB me waali collection ka naam define karta hai jisme saare sessions store honge.Example document:{  "_id": "abc123", "session": { "cookie": { ... }, "isLoggedIn": true, "userId": "7453..."},"expires": "2025-02-10T14:00:00Z"}Sessions will be saved inside a MongoDB collection called “sessions”.Why We Use MongoDBStore? Because:❌ Default memory store is not good: Server restart → sessions lost ,Not scalable, Not production-ready | ✔ MongoDB store is better: Sessions preserved even after server restarts, Can handle thousands of users ,Secure and persistent
});

                                                                                                          
app.use(express.urlencoded());   
app.use(session({             //This entire block enables sessions in your Express app. Jab ye middleware run hota hai: 👉 Every incoming request gets a new property: req.session Aur Express-session aapka session system handle karne lagta hai.
  secret: "KnowledgeGate AI with Complete Coding", //-> Session ID ko sign karne ke liye secret key chahiye hoti hai taaki koi attacker session ID ko modify na kar sake , Secret = session ko secure banane ke liye sign karne wala password.

  resave: false,//Session change nahi hua →store me dobara save mat karo.Performance better hota hai Unnecessary writes store pe nahi hote

  saveUninitialized: true, //User ke req.session me kuch data na bhi ho, fir bhi session create ho jaye. User ne login nahi kiya koi data set nahi hua Fir bhi session create hota hai

  store  // -> store:store -> Ye tumhare session ka backend hota hai. Example:MemoryStore,MongoDB Store,Redis Store It stores sessions like:{ "abc123": { isLoggedIn: true, userId: "64378..."}} Where all sessions are saved (backend storage). After this:👉 You can do: req.session.isLoggedIn = true; 👉 And access later: req.session.isLoggedIn .. 
})); 



app.use((req, res, next) => { 
  //ye har path me chalega isiliye koi path nhi hai -> cookies ko read karne k liye we use this why?goto-> authController me bataya hai Postlogin me but in simple sabko batana padega ki redirect k baad isloggedin true hai so jese hi req pehli baar server k passayi check karlo cookie aayi hai ya nhi if aayi toh uski value nikal k req me set kardo humne pehle hi define kiya hai isloggedin true toh menu dikhao so sabko pata chal jaega 
  
//const cookies = req.get("Cookie") || "";  //req se cookie liya jo  controller me-> res.cookie("isLoggedIn", true) kiya tha
//const isLoggedInCookie = cookies.split("; ").find(c => c.startsWith("isLoggedIn=")); //mere browser bahot sare cookies pehle se thi so 
  //req.isLoggedIn = isLoggedInCookie ? isLoggedInCookie.split("=")[1] === "true": false;// split kiya find kiya ["isLoggedIn=",true] so [1]-> true so hume value true mili toh sab  menus dikhenge  but there is a prblm koi bhi browser me cookies me jake change kar sakta hai  true ya false so we need something more secure so we use sessions with cookies and Sirf cookies use karne pe data secure nahi hota, isliye hum sensitive data ko server side store karne ke liye sessions use karte hain.

  req.isLoggedIn = req.session.isLoggedIn; //“Session me jo user ka login status stored hai, use request object me copy kar do.”taaki views aur routes me easily use ho sake. we know ki  Session server me kuch aise store hota hai:{ "abc123": { cookie: { ... }, isLoggedIn: true, userId: "64378..."}} req.session = FLAT object hota hai  Jab tum likhte ho: req.session.isLoggedIn = true; Toh session object browser/request me actually aisa hota hai(req pe change hojata hai ): req.session = { cookie: { ... },isLoggedIn: true,userId: "64378..." } so req.session.isLoggedIn directly value return karta hai → true  
  // but req.session pe aa kar FLAT object kyu ban jata hai? Express-session backend me raw data store karta hai optimized for saving, but request pe usable, clean format bana kar deta hai — taaki developer ko easy access mile.

  // IMPORTANT :- abhi har controller me humne  isLoggedIn: req.isLoggedIn, kiya hai but if usse ->  isLoggedIn: req.session.isLoggedIn, kiya toh ye pura middleware ki jarurat nhi  usse directly session se pata chal jaega
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {  // login hone k baad hi page access honge isme ye logic tha but  ek probm thi ,url me page ka 
  if (req.isLoggedIn) {       // link dala toh easily acces ho rha tha so to stop that we use this req -> isLoggedIn true hoga toh hi 
    next();                   //you can access all pages if false redirect to login 
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);  // 404 error page not found aya toh 404 page ko render kardena.

const PORT = 3000;



mongoose.connect(DB_PATH).then(() => { //MongoDB database se connection banata hai.
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});



// # for session:
// step 1: npm install express-session
// 2. const session = require('express-session');

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
   