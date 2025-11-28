const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({        //mongoose se kitna jyada code kam hogya
  houseId: {         //iska relation hona chahiye Home k sath so ye ek special type hai jese String ,boolean hai and reference dena padega
    type: mongoose.Schema.Types.ObjectId, //jese hi ye likhte hai mongoose ko lagta hai hum use kisi model ka reference dene wale hai 
    ref: 'Home',                            //model('Home', homeSchema)isme "Home" hai iska ref de rhe hai
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);


  // favourites collection ka structure  [{},{},{}]
// {
//   "_id": {                                  //ye nhi
//     "$oid": "691dc23fc8dd2cab42cba325"
//   },
//   "houseId": "691daf433b9f63605da82fd4"       //hum ye use kar rhe hai identify karne k liye
// }
