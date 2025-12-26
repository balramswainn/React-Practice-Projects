// nhi chala toh mongo me jake connect kar ip change hogya hoga 
// desktop pe compasss pe bhi connect karna

//durse terminal pe tailwind chala if css style me prbl aayi


// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);//sab proper work kar rha tha but jese hi refresh ho jata hai server restart hota hai save karne pe kuch bhi code and memory initialize hoti hai sab session gayab ho jata hai fhir login karna padta hai session humare system memory me save ho rha hai hume backend me karna hai hume permanent store karna padega  so we use this

const { default: mongoose } = require('mongoose');         //import mongoose
const multer = require('multer');                   //import multer (Multer is used to handle file uploads (images, PDFs, videos, etc.) in Node.js/Express apps.) 
const DB_PATH = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/airbnb?appName=CompleteCoding"; 
//   Yeh tumhara Atlas cluster ka connection string hai. root:root = username + password , tw25bjj.mongodb.net = cluster address , appName = optional MongoDB name , Is URL ko MongoClient connect karega.

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require('./routes/authRouter')
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");




const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

const store = new MongoDBStore({ //Ye line Express-session ke liye MongoDB ko session storage bana rahi hai. “Sessions database me store karo, memory me nahi.”Iska kaam:👉 Express-session ko MongoDB se connect karna 👉 Sessions ko MongoDB me store karna
  uri: DB_PATH,    //👉 “Session database is here.”
  collection: 'sessions' //Ye MongoDB me waali collection ka naam define karta hai jisme saare sessions store honge.Example document:{  "_id": "abc123", "session": { "cookie": { ... }, "isLoggedIn": true, "userId": "7453..."},"expires": "2025-02-10T14:00:00Z"}Sessions will be saved inside a MongoDB collection called “sessions”.Why We Use MongoDBStore? Because:❌ Default memory store is not good: Server restart → sessions lost ,Not scalable, Not production-ready | ✔ MongoDB store is better: Sessions preserved even after server restarts, Can handle thousands of users ,Secure and persistent
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


 //This configuration tells Multer where to store uploaded files and how to generate a unique filename for each file.
const storage = multer.diskStorage({       //Ye batata hai file disk par kaise save hogi
  destination: (req, file, cb) => {        //Ye function Multer ko batata hai:Uploaded file kis folder me save karni hai, Yahan file uploads/ directory me jayegi
    cb(null, "uploads/");                 // 👉 cb = callback function Multer ne tumhe diya hai, tum usko result wapas de rahe ho.👉 Yahan null jaan-bujhkar pass kiya jaata hai 👉 Taaki Multer ko pata chale: ❌ koi error nahi hai, ✅ file safely folder me save kar sakta hai , Agar jaan-bujhkar error pass karoge?👉 Multer file upload cancel kar dega 👉 Folder me save nahi hogi
  },
  //This generates a unique filename for each uploaded file to avoid overwriting existing files.
  filename: (req, file, cb) => {            //👉 Multer ko bataya ja raha hai file ka naam kya rakhna hai jab save ho.
    cb(null, randomString(10) + '-' + file.originalname);        // 👉 Collision se bachne ke liye(Same naam ki files overwrite nahi hoti)  and Har upload ka unique filename banta hai ex: aZ9kP2LmQx-photo.png  .........randomString uper hai 
  }
});

const fileFilter = (req, file, cb) => { //👉 Ye function decide karta hai kaunsi file allow hogi
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {   //👉 Sirf PNG, JPG, JPEG images allow hain
    cb(null, true);   //null → koi error nahi, true → upload allow, false → upload skip (file save nahi hogi)
  } else {
    cb(null, false);
  }
}

const multerOptions = {    //This object tells Multer where to save files and which files are allowed.
  storage, fileFilter
};

app.use(express.urlencoded());   
app.use(multer(multerOptions).single('photo'));  //This middleware processes a single uploaded file named photo and makes it available as req.file. 👉 Ye Multer middleware hai jo: Request me aane wali single file handle karta hai, Form field ka naam photo hona chahiye, Uploaded file ko process & store karta hai, File ko req.file me daal deta hai, Baaki form data req.body me milta hai (kahi pe bhi isko photo naam ka field milega jo ki file type ka ho uski file download karke apne pass rakhlega...form ka sab data jo alag alag karke aya usko ek sath rakh liya ) 

app.use(express.static(path.join(rootDir, 'public'))) // static middleware and In simple public ko browser ka root folder bana do so if jab "views/partials/nav.ejs" me kisi ko css file chahiye ho woh direclty likhe <link rel="stylesheet" href="/output.css" /> bcz fhir ye browser me req jaega GET /output.css -> Express sochta hai: public/output.css ..bcz humne yaha bataya hi hai isliye toh express.static likha hai and  so browser k liye file root pe hai .....nav.ejs child folder me hone ke bawajood /output.css isliye access hota hai kyunki browser URL ke through file maangta hai, aur Express public folder ko URL root bana deta hai.👉 Browser ko file system (folders) ka pata hi nahi hota  👉 Browser sirf URL samajhta hai   so Express bolta hai:Agar koi /something maange toh public/something se do reason humne publicko rootfolder banadiya hai na...express.static(public) makes the public folder act as the website root, so files inside it are accessible directly using /filename.

app.use("/uploads", express.static(path.join(rootDir, 'uploads')))  

// 1. without prefix  -> public k andhr files root pe available ho jaega so -> output.css file ka direct access mil jaega 
// 2. with prefix -> "/uploads" ...uploads k andhr wale files -> uploads/images.jpg karke acces hogi

// Files become root-accessible only when express.static is used without a prefix; adding a prefix limits them under that path. Prefix diya ho toh file root pe nahi, prefix ke niche available hoti hai. and db me path -> photo: "uploads\images.jpg" karke save hai so jab ejs file render ho, image k liye ye req jatahai <%= home.photo %> toh url pe jata hai ->  uploads/images.jpg ... isiliye prefix imp hai and Taaki Express ko pata chale:  “Jo URL /uploads se start ho, usko uploads folder se serve karna hai”  working:- Express -> /uploads ko match karta hai -> Prefix hata deta hai   -> uploads/abc.jpg dhundhta hai -> File mil jaaye → serve kar deta hai

// 👉 Prefix hataya kyu ? prefix browser ke liye hota hai, Express ke liye nahi,express pehle prefix match karta hai uploads = uploads/images.jpg , then uses  remaining URL(uploads/images.jpg) part to find the file inside the folder.
// 👉 Prefix lagaya kyu jaata hai? 1️⃣ URL ko meaningful banane ke liye 2️⃣ Multiple static folders ko separate rakhne ke liye and avoids route conflicts.

app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')))  //( pehle host/host-home-list page me image nhi show kar rha tha   isliliye "/host/uploads" )

// Current page URL: /host/host-home-list  Agar image likhi hai (relative): <img src="uploads/abc.jpg"> </img> 
// Browser request banata hai: /host/uploads/abc.jpg not /host/host-home-list/uploads/abc.jpg  bcz ( Relative URL banate time browser last URL segment hata deta hai,
// phir uske baad relative path jodta hai.) Browser sochta hai: host-home-list = page (file) Directory = /host/
// Ab Express kya dekhta hai? Static middleware:app.use("/uploads", express.static("uploads")) ❌ match nahi hota (/host/uploads ≠ /uploads)
// app.use("/host/uploads", express.static("uploads"))  ✅ match ho jaata hai → file serve ho jaati hai
// /host/uploads isliye diya taaki browser ke /host/uploads/... request se static middleware match ho sake.


// home me dikh rha tha image but /host/host-home-list me nhi so hume bolna padega ki /host/host-home-list me bhi agr req aaye toh uploads serve karna ,Ye tab useful hai jab:/host section ke liye alag routing ho humne diya hai app.js me and  Uploads ko host-related URLs me dikhana ho, Requests starting with /host/uploads will serve files from the uploads folder.

app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads'))) // ( pehle "/uploads" tha bas to detail page me img show nhi ho rha tha )
// Image URL was relative, so browser sent /homes/uploads/abc.jpg; the static middleware was registered at /uploads, so it didn’t match, and Express treated it as /homes/:homeId, causing the conflict. Adding /homes/uploads made the static middleware match first, serve the file, and the dynamic route was never reached.

// Without homes/uploads kya prblm hogi ? 
// 1️⃣ Tum details page pe click karte ho -> /homes/123  -> Express match karta hai: /homes/:homeId  → homeId = 123 ✔️ Page render ho jaata hai
// 2️⃣ Ab page ke andar <img> tag hota hai <img src="<%= home.photo %>"> db se  home.photo = "uploads/abc.jpg" milta hai
// 3️⃣ Browser image ke liye new request bhejta hai -> Toh browser bana deta hai: /homes/uploads/abc.jpg
//     Reason : bcz img me relative url hai :- uploads/abc.jpg jo ki current url k sath jud jaega 
//     Without / = relative url→ current URL ke saath judta hai ||  With / = absolute url→ root se start hota hai
//     ab tu sochega /homes/69492eee56561042e5560161/uploads/abc.jpg esa hona chahiye tha but, Browser is URL ko aise todta hai: Last part (69492eee56561042e5560161) =    file-like segment, ye ek resource (file) hai, folder nahi isliye last segment hata deta hai
//     Base directory ban jaata hai: /homes/
//     Browser rule (IMPORTANT): Relative path hamesha current directory se resolve hota hai, pure URL se nahi means ( Relative URL banate time browser last URL segment hata deta hai, phir uske baad relative path jodta hai.) Relative URL = current URL ka last part hatao + relative path jodo.

//     question ek baar detail page render hogyi wapis karega hi kyu?
// 4️⃣ Express pehle static middleware check karta hai: /uploads prefix me homes nhi diya  prefix sirf -> uploads and url :-  homes/uploads so Static middleware kabhi match hi nahi hua and Dynamic route chal gaya Conflict hua {for more niche padho)
//     Ab Express ke saath kya hota hai Express ko sirf ye dikhta hai: GET /homes/uploads/abc.jpg
//     Express ye nahi jaanta: ye image ke liye hai, ye pehle details page se aayi hai, Express sirf routes dekhta hai 👇 Express route matching /homes/:homeId
// ❌ Conflict kaise hota hai : Request jaati hai: /homes/uploads/abc.jpg ......Express check karta hai: /homes/:homeId -> homeId = "uploads/abc.jpg"
//     Express har request ko fresh maan ke route match karta hai Use farq nahi padta page pehle load ho chuka hai ya nahi
//   👉Express k liye ye toh home details route hai -> Controller chal jaata hai , Image serve nahi hoti ,image broken ❌ Yahi conflict hai ❗

//   Details page load ho jaane ke baad bhi image ke liye alag request jaati hai, aur Express us request ko /homes/:homeId se match kar leta hai — isliye conflict hota hai.
// Conflict tab hota hai jab dynamic route (:param) kisi unexpected URL ko bhi match kar leta hai.

// so  use /homes/uploads in prefix 

// 1️⃣ Request aayi: /homes/uploads/abc.jpg img se
// 2️⃣ Express pehle static middleware check karta hai: /homes/uploads  ✅ MATCH  
//     means  app.use("/homes/uploads", express.static("uploads")) 👉 Ye line Express ko bolti hai: “Agar koi request /homes/uploads/... se start ho, toh usse file samajh ke uploads folder me dhundho.” Iska matlab: Express controller tak jaane se pehle file serve karne ki koshish karta hai Isi ko bolte hain static middleware.

// 3️⃣ Express file serve kar deta hai: uploads/abc.jpg
// 4️⃣ Request yahin khatam ❌ /homes/:homeId tak jaati hi nahi
// Static middleware ne request ko dynamic route se pehle handle kar liya.
// /homes/uploads prefix ensures image requests are caught by static middleware before they can match /homes/:homeId, so the conflict disappears.

// ===============================

// You can add a prefix to public, but it’s avoided to keep asset URLs clean; prefixes are mainly used for uploaded or special static folders.

// Toh public me prefix kyun nahi lagate?
// public files website ke main assets hote hain
// CSS / JS / images directly root se chahiye hote hain
// /public/style.css awkward lagta hai

// Phir uploads me prefix kyun?
// Uploads = user-generated files
// Clear separation chahiye
// Better security & control
// Isliye /uploads/... 👍


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
app.use("/host", (req, res, next) => {  // login hone k baad hi page access kar paye isme ye logic tha but  ek probm thi ,url me page ka 
  if (req.isLoggedIn) {       // link dala toh easily acces ho rha tha so to stop that we use this req -> isLoggedIn true hoga toh hi 
    next();                   //you can access all pages if false redirect to login 
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);


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
//login creds for host
// email: bswebdev7@gmail.com
// p: Bbswebdev7@gmail.com

//for guest 
// email : guest@gmail7.com
// p: Guest@gmail7.com

//email: guest2@gmail7.com
//p: Guest2@gmail7.com


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
   