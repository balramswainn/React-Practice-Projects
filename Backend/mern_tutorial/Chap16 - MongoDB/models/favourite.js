const { getDB } = require("../utils/databaseUtils");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();                      //dhund jiske id houseID se match ho
    return db.collection('favourites').findOne({houseId: this.houseId}).then(existingFav => {
      //“Kya favourites collection me koi document exist karta hai jiska houseId = this.houseId ho?” Yaani user ne ye home already favourite kiya ya nahi.
      if (!existingFav) {                                   //Agar favourite nahi mila:→ Yeh new favourite insert kar do.
        return db.collection('favourites').insertOne(this);  
      }
      return Promise.resolve();   
      //If favourite already exists:“Favourite pehle se hai, kuch mat karo, bas promise resolve kar do.”Yani duplicate entry avoid ho gayi.Promise.resolve()? Kyuki .then() chain ko break nahi karna chahte, but return me kuch bhi insert nahi karna. Toh hum simply empty successful promise return kar dete hain.
    })
  }

  static getFavourites() {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection('favourites').deleteOne({houseId: delHomeId}); // usse del karna jiska houseId : delHomeId ho
  }
};

  // favourites collection ka structure  [{},{},{}]
// {
//   "_id": {                                  //ye nhi
//     "$oid": "691dc23fc8dd2cab42cba325"
//   },
//   "houseId": "691daf433b9f63605da82fd4"       //hum ye use kar rhe hai identify karne k liye
// }