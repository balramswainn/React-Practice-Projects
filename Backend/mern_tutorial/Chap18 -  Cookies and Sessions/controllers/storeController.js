const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  console.log("Session Value: ", req.session);
  Home.find().then( registeredHomes =>{   //Home.find() Mongoose ka built-in query method hai jo collection ke documents fetch karta hai.
    res.render("store/index", {                
      registeredHomes: registeredHomes,   // [{},{},{}...]       
      pageTitle: "airbnb Home",               
      currentPage: "index",      
      isLoggedIn: req.isLoggedIn,        
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
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  })
};

// exports.getFavouriteList = (req, res, next) => {
//   Favourite.getFavourites().then(favourites => {   // yaha se favourites ka array mil jaega
//      favourites = favourites.map(fav => fav.houseId);
//      console.log(favourites) // -> ["691daf433b9f63605da82fd4","691daf433b9f63605da82fd4","691daf433b9f63605da82fd4"]
//     Home.fetchAll().then( registeredHomes  => {    // yaha se array jisme sab objects hai ............. array.includes(id) ->
//         // console.log(favourites, registeredHomes);
//       const favouriteHomes = registeredHomes.filter(home =>  favourites.includes(home._id.toString())); 
//       //favouriteHomes contains only those values from registeredHomes that also exist in favourites, because includes() checks if a value is present in the array."  favourites k andhr jo value hai woh value regiteredHomes me bhi hai toh match karega wohi aaega baki sab nhi
//       //jo include hai usse dedo yaha pe apne Favourites me  registeredHomes
//       //fav me include hai ye iske andr toh isko rakh le 
    
//       res.render("store/favourite-list", {
//         favouriteHomes: favouriteHomes, // so sab objects jo condition match kiya sab array me agye  [{},{},{}] fav me woh dikhenge
//         pageTitle: "My Favourites",
//         currentPage: "favourites",
//       })
//     });
//   })
// };


exports.getFavouriteList = (req, res, next) => {
  Favourite.find() //Ye Favourite collection se saare favourite items fetch karta hai.
  .populate('houseId') //Favourite document me houseId ek reference (ObjectId) hota hai means humne favourite.js me reference diya hai na type define karte waqt so uska type objectId hai and ref home.js jisme sab details hai ghar ka ,Toh populate us id ko use karke related Home document ka complete data fetch kar leta hai.pehle houseId = "671daf43...." sirf ek id hota tha ab populate ke baad → pura Home object milta:  
  // before populate { _id: "fav1", houseId: "671daf43..."   // sirf id }
  //after populate { _id: "fav1", houseId: { _id: "671daf43...",houseName: "Goa Villa",price: 5000,location: "Goa",rating: 4.7, ...}}
  .then((favourites) => {
    // favourites =[{ houseId: { ...Home full data... } },{ houseId: { ...Home full data... } }] ispe map lagega
    const favouriteHomes = favourites.map((fav) => fav.houseId); 
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,   //->[{...Home full data...},{...Home full data...}...]
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId: homeId}).then((fav) => {   //Check karte hai ki ye home already favourite me hai ya nahi, Favourite model me har favourite ke andar ek field hoti hai → houseId Agar same houseId already exist karta hai → means ye home pehle se favourite me added hai.
    if (fav) {       
      console.log("Already marked as favourite");
    } else {
      fav = new Favourite({houseId: homeId}); //Favourite model me field ka naam schema me fixed hai → houseId Isliye aapko object me bhi same name dena padta hai: houseId: homeId bcz sirf houseId likhenge toh new object create kese hoga uska value toh homeId me hai
      fav.save().then((result) => {
        console.log("Fav added: ", result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  });
};


exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId}) //Ye bhi Mongoose ka inbuilt method hai. object dhoondo jiska houseId = homeId hoAur milte hi delete kar do .Favourite collection me search karega Jis document ka field houseId hai aur value homeId ke equal hai Milte hi usi moment delete karega
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
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
       });
    }
  })
};

