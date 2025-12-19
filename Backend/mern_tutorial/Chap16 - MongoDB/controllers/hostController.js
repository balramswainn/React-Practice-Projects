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
  // url me humne diyatha  -> href="/host/edit-home/<%=home._id%>?editing=true" 
  // <%=home._id%> -> "691daf433b9f63605da82fd4"  kese hua ye toh  new ObjectId("691daf433b9f63605da82fd4") tha bcz EJS.., value ko HTML me print karta hai.EJS jab ObjectId object ko string me convert karta hai, toh automatically: home._id.toString() call ho jata hai. And ObjectId.toString() returns only the hex string: "691daf433b9f63605da82fd4"EJS kabhi bhi new ObjectId(...) format print nahi karta.Woh sirf string print karta hai.Because URL me tum new ObjectId("...") nahi bhej sakte.URL sirf plain text / strings accept karta hai.Isliye EJS automatically object ko string me convert karta hai.

  const editing = req.query.editing === 'true';  //Hum URL se value puch rahe hain true ya false fhir woh value editing me store hoga
  //  edit pe href="/host/edit-home/<%=home._id%>?editing=true" ye link diya tha ?editing=true → query params and Express me query params aise req.query = { editing: 'true'} karke milte hai  so iska(req.query.editing === 'true') value true hua then editing = true;ab input me value dikhega
                            

 Home.findById(homeId).then( home => {        //findById se hume woh id jisme  woh object hai mil jaega

    if (!home) {                                    // object nhi mila toh jo ki hona chahiye isliye error handling hai ye
      console.log("Home not found for editing.");   //object nhi mila toh
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home); //yhome -> object hai bas array nhi
    res.render("host/edit-home", {        //object mila toh edit-home page open karo yaha bas apna kaam tha ye page open karna data 
      home: home,                            // baadme post pe jaega means fhir save() call hoga
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,   // true hoga toh true warna false 
    });
  });
};


exports.getHostHomes = (req, res, next) => {  //jisne bhi form bhara hai muje woh data chahiye so me fetchAll se data lelunga 
  Home.fetchAll().then( registeredHomes =>{    // registeredHomes -> [{},{},{}] sab data hotahai 
    res.render("host/host-home-list", { 
      registeredHomes: registeredHomes,       // isse -> host-home-list -> page  me dedenga jo show homes listing show karega 
      pageTitle: "Host Homes List",           // un pages k pass ye object chali jati hai
      currentPage: "host-homes",
    })
});
};

exports.postAddHome = (req, res, next) => {              //post req hai toh req me iska pas form ka data hoga isliye req.body
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  //object destructure hua req.body me sab object value hai na ye name se
 const home = new Home(houseName, price, location, rating, photoUrl, description); //Agar tum constructor me 7 parameters define karte ho:Aur tum object banate ho sirf 6 parameters ke saath: ex yaha id nhi diya ➡️ JavaScript koi error nahi deta. Jo parameter pass nahi hua, woh undefined ho jata hai.
 // unhe nikal k as a value dediya ab class me new constructor call 
 //so jab home.save() hoga sab db me insert ho jaengi. Aur agar document me _id nahi hai toh MongoDB khud hi automatically _id generate karta hai, aur woh ObjectId type ka hota hai. 
   home.save().then(() => {  // bcz promise return hua tha Without .then() bhi chalega, but tumko save complete hone ki confirmation nahi milegi and if insert fail ho jaaye toh .catch() me error handle kar sakte hai isliye imp hai.
    console.log('Home Saved successfully');
  });                                                         // ese hi hota hai ek object instance ban jata hai  home karke
   res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
   const { id, houseName, price, location, rating, photoUrl, description } = req.body; // id cuzyaha apne pass id pehle se tha
  const home = new Home(houseName, price, location, rating, photoUrl, description, id); // ye id 

 home.save().then(result => {              // jo edit karne k baad data aya usse object banaya and save() call kiya woh particular id pe 
    console.log('Home updated ', result);
  });                         
  res.redirect("/host/host-home-list");     // object overwrite karne 
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting ', error);
  })
};



