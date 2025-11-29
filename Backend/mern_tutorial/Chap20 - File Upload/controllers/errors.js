exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { 
      pageTitle: "Page Not Found",
      currentPage: "404",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user, //postlogin me create kiya tha user ab user ki details 404 page acces kar paega 
    });
};

//user: req.session.user, ->
// 404 page always needs REAL user data (NOT empty object) 404 ka matlab hai: URL galat tha, Page exist nahi hai, Route match nahi hua Ye user ki galti nahi hoti. Validation fail nahi hai. User agar logged-in hai → unki details available honi chahiye , Page bas NOT FOUND hua, login state lost nahi hota ....User already logged-in hai , Already session me user ka real object stored hai, Navbar me guest/host features dikhne chahiye










// ✅ MVC basically ek folder structure + code organization pattern hai.

// M (Model) → data & database logic
// V (View) → UI templates
// C (Controller) → request–response logic

// Bas is pattern me project ko organize karne se code clean, readable, aur maintainable hota hai.


// app.js -> server create hogi and isme sab routes rahange (store -> for user , host -> for admin) dono k liye alag 
// routes -> storeRoutes , hostRoutes -> yaha bas routing handle hogi
// controller -> storeController , hostController -> yaha middleware likhenge and view se pages kese link kare routes se and usse routes me bhej denge
// models -> main logic ki db se data fetch and send kese kare


// flow 
// 1. app.js -> server banaya and mongodb Atlas cluster ka connection string lake connect kiya mongoose se and server start kiya
// 2. models -> homes.js,favourite.js -> schema and model ( data ka blueprint and data ka structure kese hoga)
// 3. routes -> only routing
// 4. controllers ->main logic part (function use honge for crud)
    

// save()
// find()
// findById(homeId)
// findByIdAndDelete(homeId)
// findOne({houseId: homeId})
// findOneAndDelete({houseId: homeId})