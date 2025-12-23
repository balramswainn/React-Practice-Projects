const Home = require("../models/home");
const User = require("../models/user")

exports.getIndex = (req, res, next) => {
  console.log("Session Value: ", req.session);
  Home.find().then( registeredHomes =>{   //Home.find() Mongoose ka built-in query method hai jo collection ke documents fetch karta hai.
    res.render("store/index", {                
      registeredHomes: registeredHomes,   // [{},{},{}...]       
      pageTitle: "airbnb Home",               
      currentPage: "index",      
      isLoggedIn: req.isLoggedIn,        
      user: req.session.user,     //postlogin me create kiya tha user ab user ki details ab index page acces kar paega 
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then( registeredHomes  => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user, 
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user, 
  })
};

//We use async/await because it makes Mongoose code cleaner, easier to read,avoids nested .then() chains, and makes error handling simple.

exports.getFavouriteList = async (req, res, next) => { //Jab user “My Favourites” page open kare, ye function run hota hai
  const userId = req.session.user._id; //Currently logged-in user ka ID ...session me humne user store kiya tha jab login hua
  const user = await User.findById(userId).populate('favourites'); //DB se user object find karo  But with populate('favourites'): favourites array originally aise hota hai: favourites: ["67aa1...","67aa2..."]   // only Home IDs 
//populate in IDs ko real Home objects me convert kar deta hai: 
//   favourites: [
//   { _id: "67aa1", houseName: "Sky villa", price: 2000, ... },
//   { _id: "67aa2", houseName: "Beach Home", price: 3500, ... }
// ] Ab UI me complete home details show ho sakti hain.
  res.render("store/favourite-list", {  //session se id nikala to populate favourites  so sab id convert hogye pure object me 
    favouriteHomes: user.favourites,   //ye array  hai user.favourites=[{},{},{}] 
    pageTitle: "My Favourites",        //Isko directly EJS page me loop karke cards show kar sakte ho
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};
//This function runs when user clicks “Add to Favourite” async because DB calls + await use honge
// add to fav karne pe -> muje chahiye ki ye mere user collection me favourites array me add ho jaye but usse pehle check karna padega ki ye pehle se add hai ki nhi if nhi hai tab hi add hoga ya toh nhi so for that i need ( homeid & userid ) homeid chahaiye ye home identify karne k liye and userid user identify karne k liye .... pehle jab fav ka collection tha toh directly fav ko import karke dal dete the but abhi ye User collection k andhr hai toh user to lena padega
// userid milega muje sessions se 
// homeid milega muje req.body.id se 
exports.postAddToFavourite = async (req, res, next) => {  // todo : hume id leke user collection k fav array me id dalni hai
  const homeId = req.body.id;             //ye ghar ka id hai ...add to fav karne pe jo form se id aya post req pe 
  const userId = req.session.user._id;    //ye user ka id hai ...Currently logged-in user ka ID ...session me humne user store kiya tha jab login hua
  const user = await User.findById(userId); //Database me real user object find karo Jisme favourites ka array stored hai: favourites array humne model me banaya tha user.js me ex: {_id: "123",firstName: "Balram",favourites: ["home1","home2"] } bas id store karte hai .....user ={ pura object }
  if (!user.favourites.includes(homeId)) {  //if homeId pehle se nhi hai array me toh ye new user id push kardo 
    user.favourites.push(homeId); 
    await user.save();           //Updated user ko database me save kar do
  }
  res.redirect("/favourites");
};



exports.postRemoveFromFavourite = async (req, res, next) => { //Runs when user clicks “Remove from Favourites”
  const homeId = req.params.homeId;    //URL se home ka ID aata hai Example URL: /remove-favourite/673abc123
  const userId = req.session.user._id;                                //req.params.homeId → "673abc123"
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {   //if homeId pehle se hai array me toh delete kardo 
    user.favourites = user.favourites.filter(fav => fav != homeId); //Yani sirf woh homes rakhna jo equal nahi hai
    await user.save(); //Updated favourites array database me save karo
  }
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;      //home pe humne id details pe click kiya toh woh particluar home ki id ajeaga ayaha pe 
 Home.findById(homeId).then( home => {            //yaha id dalke woh object mil jaega 

    if (!home) {                              
    console.log("Home not found");
      res.redirect("/homes");                 // home nhi hai toh homes pe redirect kardo jo wohi page hai
    } else {
      res.render("store/home-detail", {       // detail wala page open ho jaega 
        home: home,                           // home -> object hai jisme data hai toh isse hume woh data ejs page jaega and dikehga
        pageTitle: "Home Detail",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn, 
        user: req.session.user, 
       });
    }
  })
};

