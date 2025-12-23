const Home = require("../models/home");    //home ko import kara uske method use karna hai na 
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {             //app me bataya tha ki views me dhund mil jaega and pehle direclty file name dalte 
    pageTitle: "Add Home to airbnb",        //the but ab yaha host folder andhr-> addHome hai so host/addHome dena pada 
    currentPage: "addHome",
    editing: false,                        // false hai bcz edit-home page humne define kiya hai ki false hoga toh input empty honge 
                                             // true hoga toh input me data hoga bcz baadme edit karn hoga
    isLoggedIn: req.isLoggedIn,          // isLoggedIn -> false hoga toh page baki sab page show nhi karega login k baad hi true hoga
    user: req.session.user,            //postlogin me create kiya tha user ab user ki details ab edit-home page acces kar paega 
  });                                      
};

exports.getEditHome = (req, res, next) => {  // host homes me edit pe click karega toh ye call hoga
  const homeId = req.params.homeId;             //req.params URL ke dynamic parts (variables) ko capture karta hai.URL ke andar jo :variable likha hota hai, uski value req.params me milti hai. ex :/edit-home/55 in url -> req.params = { homeId: "55" }
  // url me humne diyatha  -> href="/host/edit-home/<%=home._id%>?editing=true" 
  // <%=home._id%> -> "691daf433b9f63605da82fd4"  kese hua ye toh  new ObjectId("691daf433b9f63605da82fd4") tha bcz EJS value ko HTML me print karta hai.EJS jab ObjectId object ko string me convert karta hai, toh automatically: home._id.toString() call ho jata hai. And ObjectId.toString() returns only the hex string: "691daf433b9f63605da82fd4"EJS kabhi bhi new ObjectId(...) format print nahi karta.Woh sirf string print karta hai.Because URL me tum new ObjectId("...") nahi bhej sakte.URL sirf plain text / strings accept karta hai.Isliye EJS automatically object ko string me convert karta hai.

  const editing = req.query.editing === 'true';  //Hum URL se value puch rahe hain true ya false fhir woh value editing me store hoga
  //  edit pe href="/host/edit-home/<%=home._id%>?editing=true" ye link diya tha ?editing=true → query params and Express me query params aise req.query = { editing: 'true'} karke milte hai  so iska(req.query.editing === 'true') value true hua then editing = true;ab input me value dikhega
                            

 Home.findById(homeId).then( home => {   //Home.findById() mongoose ka built-in method hai jo _id ke basis par ek single document fetch karta hai.MongoDB me _id field ke base par exact ek document dhoondhta hai._id ko automatically ObjectId me convert kar deta hai.Promise return karta hai (isliye .then() use hota hai).Result single object deta hai (array nahi).

    if (!home) {                                    // object nhi mila toh isliye error handling hai ye
      console.log("Home not found for editing.");   
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home); //home -> object hai bas array nhi
    res.render("host/edit-home", {        //object mila toh edit-home page pe render karo  
      home: home,                          //bas object ja rha hai  
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,   // true hoga toh details inputs me dikhenge humne define kiya ejs file me
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};


exports.getHostHomes = (req, res, next) => {  
  //Home.find() Mongoose ka built-in query method hai jo collection ke documents fetch karta hai.
  Home.find().then( registeredHomes =>{    //Promise return karta hai Result array hota hai
    res.render("host/host-home-list", {       // registeredHomes -> [{},{},{}] sab data hotahai 
      registeredHomes: registeredHomes,       // isse -> host-home-list -> page  me dedena jo show homes listing show karega 
      pageTitle: "Host Homes List",           // un pages k pass ye object chali jati hai
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
});
};

exports.postAddHome = (req, res, next) => {              //post req hai->toh req me iska pas form ka data hoga isliye req.body
  const { houseName, price, location, rating, description } = req.body;  // isme photo nhi hai bcz 👉 File req.body me nahi aati isliye photo wahan se nahi nikla.Normal form fields (text, number) → req.bodyFile upload (input type="file") → Multer handle karta hai
  //object destructure hua req.body me sab object value hai na ye name se
   console.log(req.file);  // req.file me hume image milega bcz of multer middlewear ... so the situation is humne client side me hi filter lagaya tha in edit-home.ejs ke input me ki -> accept="image/jpg, image/jpeg, image/png" wohi image accept karna jo jpg,jpeg,png ho so if user ne koi aur file diya toh usse wohi error bata dega but error bypass hogya ho toh fhir hume server side me bhi filter  dena hai woh app.js me hai -> fileFilter name se ab waha agr koi dusra extention wala file dega toh -> cb(null, false); hoga ( to understand app.js file openkar) so toh file db jaega hi nahi toh uska error  yaha handle kiyahai
   if (!req.file) {
    return res.status(422).send("No image provided");
  }

 const photo = req.file.path; //Why req.file.path? -> File disk me save ho chuki hoti hai (uploads/...), DB me hum file ka path store karte hain, file khud nahi


 const home = new Home({houseName, price, location, rating, photo, description});// Mongoose apne aap constructor banata hai, isliye hume manually constructor likhne ki zaroorat nahi.Aur Mongoose ka constructor sirf ek hi argument leta hai — ek object {}, kyunki schema me field-names fixed hote hain.Agar hum multiple values pass karein: toh Mongoose confuse ho jayega ki kaunsi value kis field me set karni hai. Isliye hume always:object ke form me hi dena padta hai. for more detail niche jao 

 
 // jab home.save() hoga sab db me insert ho jaengi. Aur agar document me _id nahi hai toh MongoDB khud hi automatically _id generate karta hai, aur woh ObjectId type ka hota hai. 
   home.save().then(() => {  
    //.save() Mongoose ka built-in (inbuilt) function hai.Ye aap khud nahi banate — Mongoose automatically provide karta hai.Document ko MongoDB me insert karta hai (agar new hai)Ya existing document ko update karta hai (agar already DB me exist karta hai) Validation run karta hai (required, types, min/max, etc.) Promise return karta hai (isliye .then() use kar sakte ho)

    console.log('Home Saved successfully');
  });                                                         // ese hi hota hai ek object instance ban jata hai  home karke
   res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
   const { id, houseName, price, location, rating, description } = req.body; // id cuz humne id ko hidden input kiya tha jisse hum id ko use kar sakte woh object ko dhundne ko and ye id pehle objectId type tha  Ye _id ko string me convert karke bhejta hai (kyunki HTML input ONLY string leta hai).
    Home.findById(id).then((home) => { // findById(id) automatically string ko ObjectId me convert kar deta hai. fhir woh object ko dhundega Database me woh specific home find karta hai id k help se 
    home.houseName = houseName;     //Us found home ke fields ko update kiya
    home.price = price;             //Jo new values form se aayi, unse old values ko replace kar diya.
    home.location = location;
    home.rating = rating;
    home.description = description; 
    //   photo req.body se nhi req.file se araha hai toh uss hisab se  koi photo add kia toh db me uska path (pura img apne folder me save hota hai db me nhi ) change bhi karna hai ...   edit karne pe har baar img dalna pad rha tha  so to resolve this issue .... req.body se img nhi arha hai req.file se araha hai and hum db me img store nhi karte bas file path karte hai so req.file.path toh abhi ->>>> Agar user nayi photo upload karta hai,toh pehle purani photo delete hoti hai,phir nayi photo ka path save ho jaata hai.   but form fields me choose file hi dikhaega img ka naam nhi  nhi but file path db me hai 
     if (req.file) {    //👉 Check karta hai: kya user ne nayi image upload ki hai?
        fs.unlink(home.photo, (err) => {     //👉 Purani image file ko server (disk) uploads folder se delete karta hai , home.photo = purani image ka path
          if (err) {
            console.log("Error while deleting file ", err);
          }
        });
        home.photo = req.file.path; //👉 Database me photo ka path update kar deta hai (nayi uploaded image ka path)
      }

    home.save().then((result) => {     //Database me update save hota hai Existing document ko bhi update karta hai
      console.log("Home updated ", result);           //Agar naya hota to insert karta
    }).catch(err => {
      console.log("Error while updating ", err);
    })
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while finding home ", err);
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)             //findByIdAndDelete() ek hi step me document ko find + delete karta hai (by _id).
    .then(() => {                               //Given _id ke basis par document dhoondhta hai Aur milte hi delete kar deta hai
      res.redirect("/host/host-home-list");         
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};


// Need to add file upload functionality :- signup me photo input  me type="file" change kiya  and and in every file in vs code name change photoUrl -> photo ( bas name change kiya so abhi input form me bas url nhi dalna hai pura photo dalna hai .. select files karke ) .........so changes k baad bas req.body se dekha toh pura file (img) nahi bas image ka name save ho rha hai  so hume content-type change karna hoga ye manually bhi hosakta hai but humare pass ek express package jo type multipart karega 

// 1. npm install multer  (Multer is used to handle file uploads (images, PDFs, videos, etc.) in Node.js/Express apps.) 
// 2. sabse pehle form ko multipart banana padega so form me -> enctype="multipart/form-data" ye add karna padega ... means mera form multiple part me jaega
// 3. import  -> const multer = require('multer'); and app.use(multer(multerOptions).single('photo'));  in app.js ye lagane se hume file milne lagega 

// 4. app.use(multer(multerOptions).single('photo'));  //This middleware processes a single uploaded file named photo and makes it available as req.file. 👉 Ye Multer middleware hai jo: Request me aane wali single file handle karta hai, Form field ka naam photo hona chahiye, Uploaded file ko process & store karta hai, File ko req.file me daal deta hai, Baaki form data req.body me milta hai (kahi pe bhi isko photo naam ka field milega jo ki file type ka hao uski file download karke apne pass rakhlega...form ka sab data jo alag alag karke aya usko ek sath rakh liya )

// 5. const multerOptions = { dest: "uploads/" };  -> ye uploads name karke ek folder bana dega jisme humara img store hoga but abhi random names se img store ho rha hai so change that custom file name dena padega like .. profile pic 1  and unique hona chahiye
// 6. two function add kiya jo batayega ki 
//      1. storage= where to store uploaded files and how to generate a unique filename for each file.
//      2. fileFilter = which tells which file should be allowed based on their extention only (png,jpg,jpeg)

// 7. const multerOptions = { storage, fileFilter }; //This object tells Multer where to save files and which files are allowed.
// 8. hostController me if koi aur extension wali file user ne dala toh uska error bhi handle karna hai so postsignup me diya hai 
//      if (!req.file) { return res.status(422).send("No image provided");}  -> if koi aur extn wali file ho toh req.file banega hi nhi isliye

// 9. postAddhome me req.body me humne photo hata diya bcz 👉 File jo hai req.body me nahi aati isliye photo wahan se nahi aega . Normal form fields (text, number) → req.bodyFile upload (input type="file") → Multer handle karta hai  and add ->  const photo = req.file.path; //Why req.file.path? (fila ka path kyu ) -> File disk me save ho chuki hoti hai (uploads/...)  app.js me bataya tha na ki file uploads me store honge, DB me hum file ka path store karte hain, file khud nahi
// 10. ab postEditHome me changes kiya isse proper functional kiya photo req.body se nhi req.file se araha hai toh uss hisab se dikhana padega and koi photo add kia toh db me uska path (pura img apne folder project wale  me save hota hai db me nhi ) change bhi karna hai
// 11. add in app.js -> app.use("/uploads", express.static(path.join(rootDir, 'uploads')))  //sab image upload me hai so acces mile iska 
// 12. static middleware lagaya for "uploads", "/host/uploads", "homes/uploads"
// 13. delete functionality me image edit karke dusra image laga rha hoon toh uploads folder se delete nhi hua so add karenge fs module import kara and posteditHome delete fun add kiya 


// 1. app.use(express.static(path.join(rootDir, 'public')))       
    // ejs se ->  href="ouput.css" ka req gaya and     so public k andhr -> output.css root pe hai toh accessible hai 

// 2. app.use("/uploads", express.static(path.join(rootDir, 'uploads')))

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// in simple user ko file upload karna hai isliye upload functionality diya inputs me ,,, uske liye multer use kiya and filehume apne project folder me save karn hai db me nhi db me bas path rahenge and project me humare images uploads folder me ho and bas (pageNotFound,jpg,jpeg) hi ho iski functionality dala and ye sab easily acces ho jaye jab call ho toh ExpressValidator.static use kiya jisse sab images humare root folder me available ho 



// =====================================================================================

// Why use Multer in Node.js? (Short & clear)
// 👉 Multer is used to handle file uploads (images, PDFs, videos, etc.) in Node.js/Express apps.
// Multer is a middleware used in Node.js to handle multipart/form-data for uploading files in Express applications.

// What problem does Multer solve?
// HTML forms with enctype="multipart/form-data"
// Express cannot read files by default
// Multer parses file data and makes it available in req.file / req.files

// What Multer does ? 
// Accepts files from forms, Stores files on disk or memory, Gives file info like: filename, size, mimetype. ...Lets you filter file types (only images, etc.), Lets you limit file size

// When to use Multer ? 
// ✔ Profile photo upload
// ✔ Product image upload
// ✔ Document upload (PDF, resume)



// ==================================================


// exports.postAddHome = (req, res, next) => {             
//   const { houseName, price, location, rating, photo, description } = req.body;
 
//  const home = new Home({houseName, price, location, rating, photo, description});
//constructor toh home.js me create nhi kiya toh yaha kese bana rhe hai new instance?
//Kyunki Mongoose model ke andar pehle se constructor hota hai Jab aap ye likhte ho: module.exports = mongoose.model('Home', homeSchema);Toh Mongoose andar hi andar ek class banata hai: class Home extends MongooseDocument { ... } Is class ke andar already: constructor hota hai,document fields set karne ka logic hota hai, validation system hota hai, save(), update(), remove(), etc built-in methods hote hain.Isliye aap new Home({...}) likh sakte ho Chahe aapne constructor manually na banaya ho!
//Agar aap MongoDB driver khud se use karte → toh aapko class / constructor khud banana hota.Mongoose use karte → woh sab ready hota hai.Mongoose model automatically constructor banata hai.Isliye new Home({...}) bilkul sahi aur required method hai. Aapko schema me constructor likhne ki zaroorat nahi hoti.

 //constructor me directly value likhte the  pehle but not in mongoose isme { object k andhr likhna padta hai}
 // Object ({}) me value isliye pass karte hain kyuki → mongoose ke constructor ko ek hi argument chahiye hota hai → jo ek object hota hai jisme field-name + value hoti hai( req.body se value se jo form data aya). Multiple arguments Mongoose accept nahi karta. 

 //2. Schema me fields ka naam fixed hote hain Isliye data bhi aise hi dena padta hai: and if jese pehle karte the Agar aap 6 values direct pass kar doge, toh mongoose samajh hi nahi paayega ki: 1st value houseName hai ya location? 2nd value price hai ya rating?

 //3. 3. JavaScript object ka fayda 👍 flexible Position matter nahi karta, sirf key matter karta: 👍 optional fields skip kar sakte ho jese yaha id nhi diya hai
 