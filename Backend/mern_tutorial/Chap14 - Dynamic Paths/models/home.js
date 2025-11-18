// Core Modules
const fs = require("fs");//pehle registeredhomes array me sab object store karrhe the jise refresh pe delete hojata tha so we use this
const path = require("path");         //file banao jo form se data araha hai json me store kardo fhir fetch karke dikha do 
const rootDir = require("../utils/pathUtil");  
const Favourite = require("./favourite");

const homeDataPath = path.join(rootDir, "data", "homes.json"); //data folder me homes.json naamse file miljaega(using in multiple places)

module.exports = class Home {   //constructor banaya jo call karte hi object bana dega means koi bhi form bharega toh object ban jaega 
  constructor(houseName, price, location, rating, photoUrl) {   
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {      // controller me save se call hua and  contructor object bana k bheja tha woh aya 
    Home.fetchAll((registeredHomes) => { // new data add karne se pehle existing array data fetchAll se aya and aghe ka data push kar rhe
      
      if (this.id) { // edit home case               this=object so if object me uski id agar regsiteredHomes k andhr kisise bhi match ho 
        registeredHomes = registeredHomes.map(home =>   //rhi hai toh pura object replace karde woh specific wala
          home.id === this.id ? this : home);      
      } else { // add home case
        this.id = Math.random().toString();   //new object jo form se aya use ek id dedo
        registeredHomes.push(this);    // woh object ko registeredHomes  me push kardiya,“this” hamesha current object instance hota hai
      }
      // news form data aaega toh else pe jaega bcz usme id nhi 
      // edit karne k baad koi data araha hai toh usme id hai toh woh if me jaega and fhir woh id se registeredHomes k array me dhundega and pura particular object jisme woh id hai use replace kardega
    
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => { //homeDataPath jo ki homes.json file hai usme data daldo
        console.log("File Writing Concluded", error);                          //  data -> jo ki registeredHomes hai uska data daldo
      });       // pehli baar jabfile nhi ho writeFile create karega but jab file bani hui hai woh Wo existing file overwrite kar deta hai
    });
  }
  //Reason: fetchAll() ek STATIC method hai, class ke andar defined hai.Static method class ka part hota hai, object ka nahi.Isliye use call karne ka sahi syntax hai:Home.fetchAll()   
  //Home -> class hai , home -> object instance hai jo class se bana hai 
  //so static method ko access -> Home.fetchAll
  // save ek object method hai toh usse access karne k liye ->  home.save use kiya

  //fetchAll niche hai toh uper call hua -> JavaScript me function hoisting hoti hai,aur static methods class se upar ya niche kahi bhi likhe ho → class ke andar se call kar sakte ho.
  //Jab humne controller me home.save() call kiya :this = wahi home object Class ke andar “this” hamesha current object instance hota hai

  static fetchAll(callback) {        // homes.json me jo data hai use read karke show bhi toh karna hai ...refresh me delete na hojaye
    fs.readFile(homeDataPath, (err, data) => {  //error ho ya data hume dedena
      callback(!err ? JSON.parse(data) : []);  
      //error nhi hai toh -> data parse karke bhejdo ; error hai toh empty array jaega 
      //If file does NOT exist → fs.readFile() ✔ Ek error object deta hai, data = undefined hota hai,🔹 File nahi mili → error trueNode crash nahi hota , Sirf callback me err aa jata hai wohi error hume empty object dega according to condition
    });
  }

   static findById(homeId, callback) { //homeId kis id k liye ghar chahiye and callback jab id pata lagegi toh value pass hojaegi usme
    this.fetchAll(homes => {          //fetchAll se sab value leke loop lagaya 
      const homeFound = homes.find(home => home.id === homeId); //find -> jo id equal hua homeId se and true return kiya uss pure object 
      callback(homeFound);                                      // single object ko callback me dedo
    })                                     //in simple findById ko id mila toh woh tumhe us id ka object dedega and fhir usse save() me dedenga uss particular object ko replace marne
  }
  
   static deleteById(homeId, callback) {     //jo bhi id milegi usse lake fiter kardo 
    this.fetchAll(homes => {           
      homes = homes.filter(home => home.id !== homeId); // match nhi kar rha toh hi raho and jo kar rha usse nikal do
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {   // fhir woh main file ko rewrite kardo
        Favourite.deleteById(homeId, callback);
      });
    })
  }
};
// callback isliye liya bcz fetchAll pehle undefined return kar rha tha cuzz andhr toh async function chal rha hai data baadme aaga toh pehle undefined return na kare isliye callback liya


// nodemon me issue ho rha hai jese hi file -> jese hi file write hui means ye -> 
//  fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
// homes.json bana toh nodemon ko lag rha hai ki changes hue toh(Chahe tum code ko manually save karo ya chahe tumhari app kisi file ko modify kare,file change = Nodemon restart.) woh server fhirse restart kar diya so isiliye use batana padega configuration dena padega konse file ko watch kar and kise ignore (data file me kuch changes hue toh woh code changes nhi hai esa)

//   {
//   "watch": ["."],    -> jisme bhi dot laga gai sabpe karo watch
//   "ext": "js,json,ejs",   -> konse extension pe watch karn hai
//   "ignore": ["node_modules/", "data/"],   -> ignore kisse karna hai
//   "exec": "node app.js"
// }

// ye hone k baad -> npm start karo 

// ---------------------------------------------------------

// Static methods = class ke hote hain
// Instance methods = object ke hote hain

// Dono class ke andar likhe hote hain,par store alag-alag jagah hote hain.
// ➤ When you write: save() {}

// Ye object prototype me store hota hai:  Home.prototype.save
// Isliye object access kar sakta hai:
// const h = new Home();
// h.save();   // ✔ works


// ➤ But when you write: static fetchAll() {}
// Ye direct class me store hota hai: Home.fetchAll

// Object ke prototype me nahi jata.Isliye object se nahi chalega:
// const h = new Home();
// h.fetchAll(); // ❌ not available