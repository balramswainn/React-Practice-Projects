const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userType: {
    type: String,
    enum: ['guest', 'host'],
    default: 'guest'  //koi value na de toh guest hi manenge
  },
  favourites: [{     //ab favourites hum yaha store karenge per user k liye specific means har user ab aalag alag fav store kar paega 
    //iska relation hona chahiye Home k sath so ye ek special type hai jese String ,boolean hai and reference dena padega
    type: mongoose.Schema.Types.ObjectId,  //jese hi ye likhte hai mongoose ko lagta hai hum use kisi model ka reference dene wale hai 
    ref: 'Home'                         ////model('Home', homeSchema)isme "Home" hai iska ref de rhe hai              
  }]
});

module.exports = mongoose.model('User', userSchema);