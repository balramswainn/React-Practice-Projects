import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  productImage:{   //buffer format me hum img databse me rakh sakte hai but nhi karna chahiye cuz database ko heavy kardeti hai so
    type:String       //Database me image ka link ->(string) store karte hain,aur actual image server ya cloud storage me rakhte hain.
  },
  price:{
    type:Number,
    default:0
  },
  stock:{                 // kitne products hai apne pass wesa wala stock
    type:Number,
    default:0 
  },
  category:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Category",
  required:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)





// 🧠 1. Hum image database me direct store kyu nahi karte?

// Image ek binary file (BLOB – Binary Large Object) hoti hai.
// Agar tum usse database me direct store karte ho, to:
// ⚠️ Database heavy ho jata hai (images ka size bada hota hai).
// ⚠️ Query slow ho jati hai (kyunki har baar image data load karna padta hai).
// ⚠️ Backup aur migration difficult ho jata hai.
// ⚠️ Storage aur performance dono affect hote hain.

//Hum image ko file system (server folder) ya cloud storage (like Cloudinary, AWS S3, Firebase Storage) me store karte hain.Aur database me sirf us image ka URL (path) store karte hain.




