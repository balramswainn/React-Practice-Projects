import mongoose from "mongoose";

const userSchema=new mongoose.Schema(           //this creates a schema, schema k andhr data rakhte hai 
  // {
  //   username: String,    // we can write like this also
  //   email:String,
  //   isActive: Boolean
  // }

  {
    username:{               //for more control we can write like this also and big projects me hum yehi use karte hai
      type:String, 
      required:true,         //matlab ki yeh field hona hi chahiye, agar yeh field nahi hoga to error aayega
      unique:true,      //matlab ki yeh field unique hona chahiye, agar yeh field duplicate hoga to error aayega e.g insta uername
      lowercase:true   //matlab ki yeh field lowercase me hi hoga
    },   
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },
    password:{
      type:String,
      required:true
   // required:[true,"Password is required"],   //Custom validator We can write like this agar password nahi hoga to yeh message show hoga
    }
  },{timestamps:true} //In secondary object , jab pura schema ban jata hai to hum iske andhr options bhi de sakte hai jaise ki timestamps:true, to yeh "createdAt" aur "updatedAt" fields automatically add kar dega means user kab bana date timing
)   

export const User=mongoose.model("User",userSchema)  //this creates a model and exports it, model ka naam hoga User and based hoga userSchema pe, and jab ye mongodb me jayega ye , "User" change ho jayega users, so model convert hojayega plural me and lowercase me
// dono ka name same rakhte hai 











//here we are practicing data modeling using mongoose ,and also validation using mongoose
//data modeling means how we structure our data in the database
//mongoose is a library that helps us to connect to mongodb and manage data easily


// jab ye model connect hoga database se to ye files automatically run ho jati hai , and mongodb me structure create ho jata hai and inke andhr fhir data ana suru hoga
// mongoose automatically creates a collection named "users" in the database
// mongoose automatically pluralizes the model name and makes it lowercase to create the collection name


// "User" → model name hai.
// userSchema → uska structure/schema define karta hai.
// MongoDB me documents collections me store hote hain (jaise SQL me tables).
// Par Mongoose me tum collection ka naam directly nahi dete, balki wo model name se auto-generate karta hai.Model name ko lowercase karta hai  "User" → "user" Aur plural form me convert karta hai   "user" → "users" ,Yeh design decision Mongoose ke creators ne liya taki: Convention follow ho (ek user nahi, multiple users store honge), Consistency rahe across models (jaise Product → products, Post → posts)
// Developer ko manually collection name specify na karna pade (auto ho jaye)








