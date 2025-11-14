import mongoose, { Schema } from 'mongoose';

const todoSchema= new mongoose.Schema({
  content:{                                        //todo
    type:String,
    required:true
  },
  complete:{                                       // sare todo mark hogye toh automatically checked ho jaye ye complete hai 
    type:Boolean,
    default:false   //default value kya hona chahiye
  },
  createdBy:{     //iska relation hona chahiye user k sath so ye ek special type hai jese String ,boolean hai and reference dena padega
    type:mongoose.Schema.Types.ObjectId,  //jese hi ye likhte hai mongoose ko lagta hai hum use kisi model ka reference dene wale hai 
    ref:"User"                  //model("User",userSchema)isme "User" hai iska ref de rhe hai
  },
  subTodo:[                                //ye ek array hai jisme sab subtodos rahenge
    {                                          //humara ek object kese dikhaega uski modeling karna padega 
      type:mongoose.Schema.Types.ObjectId,
      ref:"SubTodo"
    }
  ]     // Array of subtodos
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema)





//yaha hum directly yaha bhi likh sakte the ,,,hume bas array ke andar ek object ka structure define karna hota hai,
//Mongoose khud samajh jaata hai ki us array me aise multiple objects store honge.

//  subTodo: [                             
//     {                                         
//       content: {
//         type: String,
//         required: true
//       },
//       completed: {
//         type: Boolean,
//         default: false
//       },
//       createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ]


// Agar alag schema (SubTodo model) banate ho:

// 👉 Benefits:

// Reusability: SubTodo ko kahin aur bhi use kar sakte ho (dusre models me).
// Independent operations: SubTodo ko alag se fetch, update, delete kar sakte ho bina Todo ke.
// Scalability: Jab SubTodos zyada badh jaayein (1000s+), alag collection hone se performance better rehta hai.
// Population support: populate() se easily SubTodo ka full data la sakte ho Todo ke sath.

// 👉 Loss:

// Thoda complex: Relation manage karna padta hai (ref, populate, etc).
// Zyada queries: Data lana ke liye kabhi 2 queries lagti hain (Todo + SubTodo).


// -----------------------------------------------------------------------------------------


// Agar same schema ke andar likh dete ho (embed karte ho):

// 👉 Benefits:

// Simple aur fast: Sab data ek hi document me hota hai — ek query me sab mil jaata hai.
// Easy to handle: populate ka jhanjhat nahi.

// 👉 Loss:

// Limited growth: Agar subTodos bahut zyada ho gaye, toh ek document bahut bada ho jaata hai (slow).
// Independent control nahi: SubTodo ko alag se update/delete karna mushkil hota hai.