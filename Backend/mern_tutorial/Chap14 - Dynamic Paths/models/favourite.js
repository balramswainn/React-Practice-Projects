// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {

  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {      
      if (favourites.includes(homeId)) {              //if homeid pehle se array me hai toh      
        callback("Home is already marked favourite");   //ye jaega callback me
      } else {
        favourites.push(homeId);                        //homeid array me push ho jaega and yaha humbas id hi store kar rhe hai array me
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback); 
        //file nhi hai toh create karlo and data ko stringify karke daldo
      }
    });
  }

  static getFavourites(callback) {           //same pehle ki tarah file read karo file nhi toh error aega and empty array return karega 
    fs.readFile(favouriteDataPath, (err, data) => {  // fhir woh array uper jaega 
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites(homeIds => {           // parse kiya hua array hai usme filter lagaya 
      homeIds = homeIds.filter(homeId => delHomeId !== homeId);   // jo match nhi kar rha usse hi aane do baki sab nikal do
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds),callback);  // and fhir sab data fhir se file me daldo
    })
  }
};