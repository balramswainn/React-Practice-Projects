const mongoose = require('mongoose');
const favourite = require('./favourite');

const homeSchema = mongoose.Schema({       //  //this creates a schema, schema k andhr data rakhte hai

   // {
  //   username: String,    // we can write like this also
  //   email:String,
  //   isActive: Boolean
  // }

  houseName: {                          //for more control we can write like this also and big projects me hum yehi use karte hai
    type: String,                      //type -> string hai
    required: true                 //matlab ki yeh field hona hi chahiye, agar yeh field nahi hoga to error aayega
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: String,
  description: String,
});
//favorite jo select kiya usse add karne k liye pehle hum fav ko map karke id nikalte the fhir homes me jake dekhte the uska data nikalne k liye ki id include hai toh pura home dedo (object ) jo use kar paye fav display karne k liye

//pre hook  -> Jab bhi koi Home delete hoga means host-home-list page se  → ye hook chalega
// Home.findByIdAndDelete(homeId) -> Ye Home model ka method hai — isliye pre-hook trigger hota hai: 
// 1.User command: Home delete karo -> Home delete NAHI hota — pehle pre-hook chalega -> Pre-hook favourite collection me: 
// yani: Is home se linked saare favourites delete

homeSchema.pre('findOneAndDelete', async function(next) {   //Home delete hone se pehle kuch kaam automatically run hoga.
  console.log('Came to pre hook while deleting a home');
  const homeId = this.getQuery()._id;  //delete karne wali query laata hai Agar delete call aisa hai: Home.findByIdAndDelete(homeId) -> Mongoose internally isko convert karta hai into: Home.findOneAndDelete({ _id: homeId })
//findByIdAndDelete(id) = internally sameas findOneAndDelete({ _id: id })Isliye Home ke pre('findOneAndDelete') hook ko trigger milta hai.
// this.getQuery() returns:{ _id: homeId } Because tumne delete call aise kiya:Home.findByIdAndDelete("654xyz...")Internally become:
//findOneAndDelete({ _id: "654xyz..." })
  
  await favourite.deleteMany({houseId: homeId}); 
  // Favourite collection me jitne documents hain jisme houseId = iss homeId → sab delete kar do.
  next(); //→ delete process aage continue karo Pre hook complete Ab Mongoose asal me home ko delete karega
}); //in simple jese hi home me kisine delete kiya fav se bhi delete ho jaye 

module.exports = mongoose.model('Home', homeSchema);//this creates a model and exports it, model ka naam hoga Home and based hoga homeSchema pe, and jab ye mongodb me jayega ye , "Home" change ho jayega-> homes, so model convert hojayega plural me and lowercase me


// A Schema defines the structure of your data — what fields each document will have and their types.
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String
// })
// So every user in the database will have these fields: name, age, email.Think of a Schema like a blueprint or plan for your data.

// A Model is created from a Schema — it is used to actually create, read, update, and delete data in the database.
// const User = mongoose.model('User', userSchema)
// User.find()        // get all users
// User.create({...}) // add a new user
// User.updateOne()   // update user
// User.deleteOne()   // delete user


// Schema → defines the structure (what data looks like)

// Model → uses that structure to talk to the database






//here we are practicing data modeling using mongoose ,and also validation using mongoose
//data modeling means how we structure our data in the database
//mongoose is a library that helps us to connect to mongodb and manage data easily


// jab ye model connect hoga database se to ye files automatically run ho jati hai , and mongodb me structure create ho jata hai and inke andhr fhir data ana suru hoga
// mongoose automatically creates a collection named "homes" in the database
// mongoose automatically pluralizes the model name and makes it lowercase to create the collection name


// "Home" → model name hai.
// homeSchema → uska structure/schema define karta hai.
// MongoDB me documents collections me store hote hain (jaise SQL me tables).
// Par Mongoose me tum collection ka naam directly nahi dete, balki wo model name se auto-generate karta hai.Model name ko lowercase karta hai  "Home" → "home" Aur plural form me convert karta hai   "home" → "homes" ,Yeh design decision Mongoose ke creators ne liya taki: Convention follow ho (ek home nahi, multiple homes store honge), Consistency rahe across models (jaise Product → products, Post → posts)
// Developer ko manually collection name specify na karna pade (auto ho jaye)
