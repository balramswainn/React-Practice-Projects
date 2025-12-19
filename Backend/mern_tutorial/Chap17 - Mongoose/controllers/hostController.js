const Home = require("../models/home");    //home ko import kara uske method use karna hai na 

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {             //app me bataya tha ki views me dhund mil jaega and pehle direclty file name dalte 
    pageTitle: "Add Home to airbnb",        //the but ab yaha host folder andhr-> addHome hai so host/addHome dena pada 
    currentPage: "addHome",
    editing: false,                        // false hai bcz edit-home page humne define kiya hai ki false hoga toh input empty honge 
  });                                      // true hoga toh input me data hoga bcz baadme edit karn hoga
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
      home: home,                            
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,   // true hoga toh details inputs me dikhenge humne define kiya ejs file me
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
    })
});
};

exports.postAddHome = (req, res, next) => {              //post req hai->toh req me iska pas form ka data hoga isliye req.body
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  //object destructure hua req.body me sab object value hai na ye name se
 const home = new Home({houseName, price, location, rating, photoUrl, description});// Mongoose apne aap constructor banata hai, isliye hume manually constructor likhne ki zaroorat nahi.Aur Mongoose ka constructor sirf ek hi argument leta hai — ek object {}, kyunki schema me field-names fixed hote hain.Agar hum multiple values pass karein: toh Mongoose confuse ho jayega ki kaunsi value kis field me set karni hai. Isliye hume always:object ke form me hi dena padta hai. for more detail niche jao 
// -> {houseName: houseName ,price:price} isse short me {houseName ,price } ese pass kar rhe hai
 
 // jab home.save() hoga sab db me insert ho jaengi. Aur agar document me _id nahi hai toh MongoDB khud hi automatically _id generate karta hai, aur woh ObjectId type ka hota hai. 
   home.save().then(() => {  
    //.save() Mongoose ka built-in (inbuilt) function hai.Ye aap khud nahi banate — Mongoose automatically provide karta hai.Document ko MongoDB me insert karta hai (agar new hai)Ya existing document ko update karta hai (agar already DB me exist karta hai) Validation run karta hai (required, types, min/max, etc.) Promise return karta hai (isliye .then() use kar sakte ho)

    console.log('Home Saved successfully');
  });                                                         // ese hi hota hai ek object instance ban jata hai  home karke
   res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
   const { id, houseName, price, location, rating, photoUrl, description } = req.body; // id cuz humne id ko hidden input kiya tha jisse hum id ko use kar sakte woh object ko dhundne ko and ye id pehle objectId type tha  Ye _id ko string me convert karke bhejta hai (kyunki HTML input ONLY string leta hai).
    Home.findById(id).then((home) => { // findById(id) automatically string ko ObjectId me convert kar deta hai. fhir woh object ko dhundega Database me woh specific home find karta hai id k help se 
    home.houseName = houseName;     //Us found home ke fields ko update kiya
    home.price = price;             //Jo new values form se aayi, unse old values ko replace kar diya.
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;

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






// exports.postAddHome = (req, res, next) => {             
//   const { houseName, price, location, rating, photoUrl, description } = req.body;
 
//  const home = new Home({houseName, price, location, rating, photoUrl, description});
//constructor toh home.js me create nhi kiya toh yaha kese bana rhe hai new instance?
//Kyunki Mongoose model ke andar pehle se constructor hota hai Jab aap ye likhte ho: module.exports = mongoose.model('Home', homeSchema);Toh Mongoose andar hi andar ek class banata hai: class Home extends MongooseDocument { ... } Is class ke andar already: constructor hota hai,document fields set karne ka logic hota hai, validation system hota hai, save(), update(), remove(), etc built-in methods hote hain.Isliye aap new Home({...}) likh sakte ho Chahe aapne constructor manually na banaya ho!
//Agar aap MongoDB driver khud se use karte → toh aapko class / constructor khud banana hota.Mongoose use karte → woh sab ready hota hai.Mongoose model automatically constructor banata hai.Isliye new Home({...}) bilkul sahi aur required method hai. Aapko schema me constructor likhne ki zaroorat nahi hoti.

 //constructor me directly value likhte the  pehle but not in mongoose isme { object k andhr likhna padta hai}
 // Object ({}) me value isliye pass karte hain kyuki → mongoose ke constructor ko ek hi argument chahiye hota hai → jo ek object hota hai jisme field-name + value hoti hai( req.body se value se jo form data aya). Multiple arguments Mongoose accept nahi karta. 

 //2. Schema me fields ka naam fixed hote hain Isliye data bhi aise hi dena padta hai: and if jese pehle karte the Agar aap 6 values direct pass kar doge, toh mongoose samajh hi nahi paayega ki: 1st value houseName hai ya location? 2nd value price hai ya rating?

 //3. 3. JavaScript object ka fayda 👍 flexible Position matter nahi karta, sirf key matter karta: 👍 optional fields skip kar sakte ho jese yaha id nhi diya hai
 