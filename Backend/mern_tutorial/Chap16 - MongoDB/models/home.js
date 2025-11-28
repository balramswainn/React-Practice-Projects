const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtils');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {                       //_id me koi value mila ho toh hi isme value dalna
      this._id = _id;                //Since _id is undefined, condition false, so _id set hi nahi hota.
    }                                //JavaScript koi error nahi deta. Jo parameter pass nahi hua, woh undefined ho jata hai.
  }                                  //Agar _id undefined hai → document me _id exist hi nahi karta. db me nhi jaega

  save() {           
    const db = getDB();  // ye function call kiya bcz hume isse  db ka acces milega
    if (this._id) { // if id hai toh update kar
      const updateFields = {             //ye object hai jisme updated values hoti hain: 
        houseName: this.houseName,       //id change nhi karsakte bcz indentify karne k liye id hi use kar rhe hai
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };
      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
      //MongoDB me sirf ek document update karega.Kis document ko update karna hai(_id match karega) 
      //MongoDB me _id hamesha ObjectId type hota hai ,Isliye hum this._id ko -> ObjectId me convert kar rahe hain(warna match nahi hoga) and isse this._id -> "691daf433b9f63605da82fd4" already string hai bcz edit-home.ejs me form me humne input hidden karke use kiya and <%=home._id%> ye diya tha pehle home._id ka value ->  new ObjectId("691daf433b9f63605da82fd4") tha but EJS value ko HTML me print karta hai.EJS jab ObjectId object ko string me convert karta hai, toh automatically: home._id.toString() call ho jata hai. And ObjectId.toString() returns only the hex string: "691daf433b9f63605da82fd4" EJS kabhi bhi new ObjectId(...) format print nahi karta.Woh sirf string print karta hai.Because URL me tum new ObjectId("...") nahi bhej sakte.URL sirf plain text / strings accept karta hai.Isliye EJS automatically object ko string me convert karta hai.
     
      // -> this._id → string aati hai  ( so wapis String(this._id) karna koi mean nhi but tutorial me kiya isliye likha)
      // -> usko new ObjectId(...) se ObjectId type me convert karna padta hai
      // -> tabhi MongoDB correct document ko match karega
      //{ $set: updateFields } ->$set matlab : Ye fields replace/update kar do.

      //MongoDB me har document ka ek unique id hota hai jise ObjectId bolte hain._id: ObjectId("673dfe9814aabcd12345ef90")Ye string nahi hota, ye ek special ObjectId type hota hai.


    } else { 
      return db.collection('homes').insertOne(this); //MongoDB me ‘homes’ collection ke andar current object (this) ko insert kar deta hai. return Isliye ki controller me isko Promise ki tarah .then() / await se handle kar sako....jab bhi save() call hoga insert ho jaega data.. yaha table ki jagah collection likhte hai name diya homes
      ///so jab home.save() hoga sab db me insert ho jaengi and MongoDB khud hi automatically _id generate karta hai, aur woh ObjectId type ka hota hai.  
      // → this ka matlab current object jo new Home(...) banate waqt create hua hai. 
      // → MongoDB us object ko direct as-it-is document ke form me insert kar deta hai.
      // → Yaha JSON.stringify ki zarurat nahi hoti, MongoDB driver khud convert kar deta hai BSON me.
      //Insert karte waqt → JavaScript object ko automatically BSON me convert karta hai
      // Read karte waqt → BSON ko automatically JS object (JSON-like) me convert kar deta hai

      //BSON (Binary JSON) is a binary-encoded serialization format used by databases like MongoDB to store and transmit data. It extends JSON by adding support for data types not included in JSON, such as dates, various integer sizes, and binary data, while maintaining a similar flexible, document-oriented structure. Because BSON is binary, it's more efficient for data storage and faster for databases to parse than human-readable JSON. 
      //uska structure :- 1. Collection = Array jaisa [ doc1, doc2, doc3, ... ] 2. Document = JavaScript object jaisa
      //MongoDB data BSON me store karta hai aur structure [{…}, {…}, {…}] jaisa hota hai.
           

      
    }
  }

  static fetchAll() {               //homes collection se saare documents fetch karna
    const db = getDB();             //.find() → cursor return karta hai and .toArray() → cursor ko array me convert karta hai
    return db.collection('homes').find().toArray(); 
    //Read karte waqt mongodb → BSON ko automatically JS object (JSON-like) me convert karke deta hai 
    //MongoDB data BSON me store karta hai aur structure [{…}, {…}, {…}] jaisa hota hai toh .toArray() kyu use kare jab apne pass array hai bcz MongoDB apna internal array directly nahi deta,because MongoDB server ke paas woh internal format hota hai,but client (Node.js) ko data network ke through bhejna padta hai..Agar Mongo saari 10 lakh files ek hi baar pack karke bhej de:Server heavy ho jayega, Network overload, Time zyada lagega, App crash bhi ho sakta hai, Isliye Mongo direct pura array kabhi nahi bhejta.so we use find() → poora data ek saath return nahi karta ye kehta hai: "Ye lo pointer (cursor), isse tum data read karna.

    //  Cursor = MongoDB ka pointer (iterator) jisse tum results ek-ek karke read kar sakte ho.
    // .toArray() → us streamed data ko JS array me convert karta hai.

//  Tum fir: ese Use kar sakte ho.
// .next() — next document laao
// .toArray() — saare documents ek saath array me convert karo
// .limit() — limited documents
// .sort() — sorted cursor
// .skip() — skip documents
// 🟣Why use Cursor? Agar collection me 1 million documents ho, aur Mongo ek hi baar me poora array return kare → memory crash. Isliye Mongo pehle cursor deta hai.
  }

  static findById(homeId) {         //_id match karke specific document dhoondo
    const db = getDB();             //ye function call kiya bcz hume isse  db ka acces milega
    return db.collection('homes')
    .find({_id: new ObjectId(String(homeId))}) //ObjectId() me convert zaroori hai cuz MongoDB me _id hamesha ObjectId type hota hai ,
    .next();                               //Isliye hum this._id ko ObjectId me convert kar rahe hain(warna match nahi hoga)
    //.find() ek cursor deta hai .next() us cursor ka first document return karta hai Because _id unique hota hai → 1 hi document milega
  }
 // structure
//   {
//   "_id": {
//     "$oid": "691daf433b9f63605da82fd4"
//   },
//   "houseName": "Atlantis",
//   "price": "12000",
//   "location": "Vasai",
//   "rating": "5",
//   "photoUrl": "https://images.unsplash.com",
//   "description": "book it"
// }
  static deleteById(homeId) {    //Jo document _id match karega → usse delete kar do
    const db = getDB();
    return db.collection('homes')     
    .deleteOne({_id: new ObjectId(String(homeId))});   //Again, id ko ObjectId me convert karna must
  }
};