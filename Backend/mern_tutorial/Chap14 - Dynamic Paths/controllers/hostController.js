const Home = require("../models/home");    //home ko import kara uske method use karna hai na 

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {             //  humne app me bataya tha ki views me dhundna mil jaega and pehle direclty file name dalte 
    pageTitle: "Add Home to airbnb",        //the but ab yaha host folder andhr-> addHome hai so host/addHome dena pada 
    currentPage: "addHome",
    editing: false,                        // false hai bcz edit-home page humne define kiya hai ki false hoga toh input empty honge 
  });                                      // true hoga toh input me data hoga bcz baadme edit karn hoga
};

exports.getEditHome = (req, res, next) => {  // host homes me edit pe click karega toh ye open hoga
  const homeId = req.params.homeId;             //req.params URL ke dynamic parts (variables) ko capture karta hai.URL ke andar jo :variable likha hota hai, uski value req.params me milti hai. ex :/edit-home/55 in url -> req.params = { homeId: "55" }
  const editing = req.query.editing === 'true';  //Hum URL se value puch rahe hain true ya false fhir woh value editing me store

  Home.findById(homeId, home => {          //findById se hume woh id jisme  woh object hai mil jaega
    if (!home) {                                    // object nhi mila toh jo ki hona chahiye isliye error handling hai ye
      console.log("Home not found for editing.");   //object nhi mila toh
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home); 
    res.render("host/edit-home", {        //object mila toh edit-home page open karo yaha bas apna kaam tha ye page open karna data 
      home: home,                            // baadme post pe jaega means fhir save() call hoga
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,   // true hoga toh true warna false 
    });
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

exports.postAddHome = (req, res, next) => {              //post req hai toh req me iska pas form ka data hoga isliye req.body
  const { houseName, price, location, rating, photoUrl } = req.body;//object destructure hua req.body me sab object value hai na ye namese
  const home = new Home(houseName, price, location, rating, photoUrl); // unhe nikal k as a value dediya ab class me new constructor call 
  home.save();                                                          // ese hi hota hai ek object instance ban jata hai  home karke

   res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();                              // jo edit karne k baad data aya usse object banaya and save() call kiya woh particular id pe 
  res.redirect("/host/host-home-list");     // object overwrite karne 
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting ', error);
    }
    res.redirect("/host/host-home-list");
  })
};



