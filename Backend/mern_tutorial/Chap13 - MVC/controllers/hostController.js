const Home = require("../models/home");    //home ko import kara uske method use karna hai na 

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {  //jisne bhi form bhara hai muje woh data chahiye so me fetchAll se data lelunga 
  Home.fetchAll((registeredHomes) =>          // fetchAll ->model me hai jo hume homes.json ka data parse karke dega 
    res.render("host/host-home-list", { // waha callback me data rakh liya tha so woh as registeredHome(object) name kuch bhi hosakta hai
      registeredHomes: registeredHomes,       // isse -> host-home-list -> page  me dedenga jo show homes listing show karega 
      pageTitle: "Host Homes List",           // un pages k pass ye object chali jati hai
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;//object destructure hua req.body me sab object value hai na ye namese
  const home = new Home(houseName, price, location, rating, photoUrl); // unhe nikal k as a value dediya ab class me new constructor call 
  home.save();                                                          // ese hi hota hai ek object instance ban jata hai  home karke

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};





