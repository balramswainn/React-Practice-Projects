exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false          //by default humne isLoggedIn false kiya hai,true hone pe hi sab menu and pages show honge so websiteopen hote hi false hai and login pe jane k baad bhi false hai ... jab login karega tab true hoga and sab dikehega ...nav toh ek hi sabka bas ek component ki tarah use kar rhe hai so waha pe define kiya hai
  });
};

//niche res.render me isLoggedIn: true->  use nhi kar rhe hai but directly req.isLoggedIn = true kar rhe 
// req is used to share data across middleware and controllers in the same request, while res.render is used to pass data directly to the view. mtlb directly apne html page pe jata hai res.render



exports.postLogin = (req, res, next) => {
  console.log(req.body); 
  //pehle sirf cookies use kiya tha but abhi session kiya bcz Sirf cookies use karne pe data secure nahi hota, isliye hum sensitive data ko server side store karne ke liye sessions use karte hain.

  req.session.isLoggedIn = true; //“Login successful — store login status securely in the user’s session on the server.”
  //Current user ke session me isLoggedIn = true store karo , User ne successfully login kiya ,Ab server uske session me ek property bana deta hai: isLoggedIn: true , Iska matlab: ye user abse login state me hai ,Server har request me session read karke check kar sakta hai ke user logged in hai ya nahi,  Session server me kuch aise store hota hai:{ "abc123": { cookie: { ... }, isLoggedIn: true, userId: "64378..."}} Browser me sirf sessionId hota hai: sessionId=abc123 ,Server sessionId dekh kar sahi session data load karta hai.
  res.redirect("/");  //redirect k baad cookies bhi sath me jaegi and client k browser storage me save ho jaegi 
}

exports.postLogout = (req, res, next) => {
   res.cookie("isLoggedIn", false)
   req.session.destroy(() => {  //user ka session completely delete karta hai aur logout implement karne ke liye use hota hai.
    res.redirect("/login");  //session ko MongoDB ki collection se bhi delete kar deta hai.
  })
}

//flow : $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// so to understand ( code and db server pe rahega)  so browser se user req bhejega to the server, server ye backend code run karega jisme humne authenticate kiya hai chap19 me ki user jab login karega and creds match honge db se fhir session banega   

// 1️⃣ POST /login request server pe aati hai -> 2️⃣ Express-session middleware check karta hai: Is request ke saath session cookie aayi hai ya nahi -> 3️⃣ Agar pehli baar hai: Nayi session ID generate hoti hai -> Session DB me create hota hai 4️⃣ hum req.session.isLoggedIn = true set kar dete hai  -> Sessions create a unique session ID per user and store each session separately in the database. so har user ka alag session banega and ab humare case me ek session create hua db me   -> 5️⃣ Response ke saath session ID cookie browser ko bhej di jaati hai ->  user sends again a req then Browser automatically session ID cookie bhejta hai -> Server DataBase se same session load karta hai and req.session.isLoggedIn === true mil jaata hai ✅ hai toh unhe wapis dediya jatahai nhi milta toh bolte hai ki wapis login karo , wapis authenticate karo Server har request me session read karke check karta hai ke user logged in hai ya nahi,  Session server me kuch aise store hota hai:{ "abc123": { cookie: { ... }, isLoggedIn: true, userId: "64378..."}} Browser me sirf sessionId hota hai: sessionId=abc123 ,Server sessionId dekh kar sahi session data load karta hai. ) and then On logout, req.session.destroy() completely deletes that user’s session from the DB. and jab fhir login karega yehi sab repeat hoga but save hoke nhi rahega login me session banega and logout pe pura delete.




// ek baar authentication humne bana liya and save karliya ya cache karliya apne session me aur uske baad hum man kar chal rhe hai ki for all subsequent req jab tak user mere pass cookie lekar ata rahega me manunga user authentic hai




// ========================
//1. way
// req.isLoggedIn = true;     // simply adds a new property called isLoggedIn to the request object with value true.
// res.redirect("/");           // Ye property sirf isi request keliye hoti hai Request khatam → property gayab ❌
  
// so login k baad req.isLoggedIn = true ho jaye esa define kiya tha but jese hi login kiya ye redirect hogya index page pe "/" so now its a new req object(req sirf current request tak zinda hota hai Redirect = new request = new req ...req.isLoggedIn survives only for the request in which it is set; clicking another link creates a new request and the value is lost.)  ye bhul gaya ki ye login hua tha  uske liye false hi hai so we need cookies so in between req me koi state maintain kar saku and woh bhi client side me ...global variable work nhi karega bcz waha set kardiya ki isloggenin true hogya toh sab user(alag alag insan jo ye app use karenge) k liye ho jaega hume har specific user k liye chahiye so cookie is perfect 

// =================================================

//2.way
// res.cookie("isLoggedIn", true) 
// res.redirect("/");  //redirect k baad cookies bhi sath me jaegi and client k browser storage me save ho jaegi 

//due to this redirect hone k baad usne browser me store kiya cookies me ki isLoggedIn = true hai (browser me cookies karke option hai waha) but still sab page load nhi hua bcz cookies ko read(batana padega na sabko ki cookies se read karke ki isloggedIn true hai ) nhi kya so to do that app.js me ek middleware dalna padega sabse pehle koi bhi router lagane se pehle 

// ye karne k baad work karega sab menus dikhenge  but there will be a prblm koi bhi browser me cookies me jake change kar sakta hai  true ya false so we need something more secure so we use sessions with cookies and  Sirf cookies use karne pe data secure nahi hota, isliye hum sensitive data ko server side store karne ke liye sessions use karte hain.


// Session ka poora system cookies ko automatically handle karta hai.Hume manually cookies handle karne ki zarurat NHI hoti.“Sessions handle cookies automatically — hum bas req.session use karte hain.”

// =======================================
//3.way -> correct
// step 1: npm install express-session
// step 2: app.use(session({
//           secret: "KnowledgeGate AI with Complete Coding",
//           resave: false,
//           saveUninitialized: true,
//           store
//         }));
// step 3: req.session.isLoggedIn = true;  in post login -> controller jisse server pe session store hojaye jo secure ho
// step 4: req.isLoggedIn = req.session.isLoggedIn; in app.js jisse req k pass isloggedin ka value miljaye from session jisse woh menu dikhapaye

// step 5: npm i connect-mongodb-session 
//sab proper work kar rha tha but jese hi refresh ho jata hai server restart hota hai save karne pe kuch bhi code and memory initialize hoti hai sab session gayab ho jata hai fhir login karna padta hai session humare system memory me save ho rha hai hume backend me karna hai hume permanent store karna padega  so we use this

//step 6 : const store = new MongoDBStore({
//   uri: DB_PATH,
//   collection: 'sessions'
// });
// step 7: app.use(session({
//           secret: "KnowledgeGate AI with Complete Coding",
//           resave: false,
//           saveUninitialized: true,
//           store  -> store ab add karna chahiye backend me aur ek collection banaya usme store kar rha sab
//         }));
// step 8: req.session.destroy(() => {  //user ka session completely delete karta hai aur logout implement karne ke liye use hota hai.
//          res.redirect("/login");  //session ko MongoDB ki collection se bhi delete kar deta hai.
//         })

