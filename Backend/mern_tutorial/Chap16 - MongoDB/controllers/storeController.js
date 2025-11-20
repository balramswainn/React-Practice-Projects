const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then( registeredHomes =>{   //fetchAll promise return kar rha hai to handle that we use then 
    res.render("store/index", {                 //there were two arrays so humne array destructuring kiya bas pehle wala chahiye tha
      registeredHomes: registeredHomes,          // callback me bas .then(result=>{}) likhe toh -> [[{real data}],[data type define hai]] 
      pageTitle: "airbnb Home",                //mil jaega but hume sirf data chaiye na ki type wla array so [registeredHomes]
      currentPage: "index",               // to know more homes.js me check karle
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then( registeredHomes  => {
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
  Favourite.getFavourites().then(favourites => {   // yaha se favourites ka array mil jaega
     favourites = favourites.map(fav => fav.houseId);
     console.log(favourites) // -> ["691daf433b9f63605da82fd4","691daf433b9f63605da82fd4","691daf433b9f63605da82fd4"]
    Home.fetchAll().then( registeredHomes  => {    // yaha se array jisme sab objects hai ............. array.includes(id) ->
        // console.log(favourites, registeredHomes);
      const favouriteHomes = registeredHomes.filter(home =>  favourites.includes(home._id.toString())); 
      //favouriteHomes contains only those values from registeredHomes that also exist in favourites, because includes() checks if a value is present in the array."  favourites k andhr jo value hai woh value regiteredHomes me bhi hai toh match karega wohi aaega baki sab nhi
      //jo include hai usse dedo yaha pe apne Favourites me  registeredHomes
    
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // so sab objects jo condition match kiya sab array me agye  [{},{},{}] fav me woh dikhenge
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })
};

exports.postAddToFavourite = (req, res, next) => {
   const homeId = req.body.id;          // ye post req hai isliye me req.params.homeId se nhi req.body.id se le rha hoon id
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log('Fav added: ', result);
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  }).finally(() => {                                      //then ho ya catch redirect toh hona hi hai
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
   const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;           //home pe humne id details pe click kiya toh woh particluar home ki id ajeaga ayaha pe 
 Home.findById(homeId).then( home => {            //yaha id dalke woh object mil jaega 

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

