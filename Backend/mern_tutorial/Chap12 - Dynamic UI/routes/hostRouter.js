// Core Module
const path = require('path');

// External Module
const express = require('express'); 
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
 res.render('addHome', {pageTitle: 'Add Home to airbnb', currentPage: 'addHome'}); //addHome page ka name hai and { pageTitle}: page ka title   ...currentpage isiliye nav me hightlight kar paye
  //  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));  pehle ka
})

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  // registeredHomes.push({houseName: req.body.houseName});// data bahot jyada ho jaye...so to identify and handle object me daldiya
  registeredHomes.push(req.body);  // req.body -> {} pura object hi hai jo key value pairs me hi araha hai isme alag se uper jese key define nhi karna pad rha hai uper kiya bcz hum pura req.body jo object hai woh nhi le rhe the hum bas uska value le rhe the and key define kar rhe the
   res.render('homeAdded', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;





//console.log('Home Registration successful for:', req.body, req.body.houseName);

//her req.body pehle chapter se jo hume { houseName: 'jerry' } dega 
// To acces -> { houseName: 'jerry' } -> req.body.houseName  -> jerry


// module.exports = hostRouter; -> bas hostRouter middleware export 

// exports.hostRouter = hostRouter; -> multiple exports dono ese kartehai
// exports.registeredHomes = registeredHomes;


// module.exports = {
//   hostRouter: hostRouter,
//   registeredHomes: registeredHomes
// }

// use in app.js
// const { hostRouter, registeredHomes } = require("./router");