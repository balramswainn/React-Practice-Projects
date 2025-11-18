const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {   // yaha se favourites ka array mil jaega
    Home.fetchAll((registeredHomes) => {    // yaha se array jisme sab objects hai ............. array.includes(id) ->
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id)); //array me jo include hai usse dedo
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // so sab objects jo condition match kiya sab array me agye  [{},{},{}] fav me woh dikhenge
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })

};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
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
  Home.findById(homeId, home => {             //yaha id dalke woh object mil jaega 
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
