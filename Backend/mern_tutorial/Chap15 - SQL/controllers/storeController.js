const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes])=>{   //fetchAll promise return kar rha hai to handle that we use then 
    res.render("store/index", {                 //there were two arrays so humne array destructuring kiya bas pehle wala chahiye tha
      registeredHomes: registeredHomes,          // callback me bas .then(result=>{}) likhe toh -> [[{real data}],[data type define hai]] 
      pageTitle: "airbnb Home",                //mil jaega but hume sirf data chaiye na ki type wla array so [registeredHomes]
      currentPage: "index",               // to know more homes.js me check karle
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {   // yaha se favourites ka array mil jaega
    Home.fetchAll().then(([registeredHomes]) => {    // yaha se array jisme sab objects hai ............. array.includes(id) ->
      const fav = favourites.map(id => Number(id));  //favourites ['1','2']string tha and home.id -> number isliye includes me kuch nhiaya
      const favouriteHomes = registeredHomes.filter(home => fav.includes(home.id)); //array me jo include hai usse dedo
      console.log(favouriteHomes,"hey")
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // so sab objects jo condition match kiya sab array me agye  [{},{},{}] fav me woh dikhenge
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })
};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {  //url me aur bhi data hai woh object se id nikala
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  })
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;           //home pe humne id details pe click kiya toh woh particluar home ki id ajeaga ayaha pe 
 Home.findById(homeId).then(([homes]) => {            //yaha id dalke woh object mil jaega 
   const home = homes[0];  //reason niche likha hai
    if (!home) {                              
    console.log("Home not found");
      res.redirect("/homes");                 // home nhi hai toh homes pe redirect kardo jo wohi page hai
    } else {
      res.render("store/home-detail", {       // detail wala page open ho jaega 
        home: home,                           // home -> object hai jisme data hai toh isse hume woh data ejs page jaega and dikehga
        pageTitle: "Home Detail",
        currentPage: "Home",
       });
    }
  })
};

// ⭐ homes[0] ka meaning

// Database me id unique hota hai.
// So SELECT * FROM homes WHERE id=? hamesha ek hi row return karta hai.

// Lekin MySQL hamesha data array ke form me deta hai.

// Isliye:homes[0] → us array ka first (and only) object.
// Example:
// [
//   { id: 5, name: "ABC", ... }  // <-- homes[0]
// ]