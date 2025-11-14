import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({

  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  quantity:{
    type:Number,
    required:true
  }
}) 
// yaha timestamps dalne ki jarurat nhi hai bcz orderSchema me hai

// puri tarah product store karne ki koi jarurat nhi hai hum id store karke reference lelenge uske basis pe find karlenge 
// jitne bhi schema banta hai har ek individual product ka unique id generate hota hai mongodb karta hai


const orderSchema=new mongoose.Schema({
  orderPrice:{
    type:Number,
    required:true
  },
  customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User", 
  },
  orderItems: {
    type:[orderItemSchema]    // ye array hai isme multiple product ho sakte hai aur har product ka quantity  ho sakta hai 

    // type:[           //esa bhi kar sakte the hum direclty yaha hi likh diya if bas yaha hi use karna hai toh
    //   {
    //     productId:{},
    //     quantity:{}
    //   }
    // ]

    // and jese pehle  todo me subtodo k liye kiya alag sa model , schema  bana k bhi ho sakta hai
  },
  address:{
    type:String,
    required:true
  },
  status:{                          //hume ek restrictec field chahiye ki order ka field ismese kuch hi ho sakta hai
    type:String,              //enum -> choices ki me kya kya choice de rha hoon
    enum:["PENDING","CANCELLED","DELIVERED"],      // you can only choose from here
    default:"PENDING"
  }

},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema)



// orderItems -> ek order me multiple items ho sakte hai , so for example orderItems me mene type: Array dala so uske andhr bhi kuch dalna padega na if product dala toh , quantity bhi toh dekhni  padegi( product me modify nhi kar sakte waha stock rakh rhe hai ) ki kitne product hai so alag schema banana padega so we get know which product and how many product bcz of this we will create mini model new schema isi file me bcz ye bas structure decide karne me help karega aur bas yehi kaam aaega isiliye