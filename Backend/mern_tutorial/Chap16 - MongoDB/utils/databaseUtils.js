const mongo = require('mongodb');  //mongodb package load kiya

const MongoClient = mongo.MongoClient;  //Uske andar ka MongoClient object nikala, MongoClient = MongoDB se connect hone ka tool

const MONGO_URL = "mongodb+srv://root:root@completecoding.tw25bjj.mongodb.net/?appName=CompleteCoding";
// Yeh tumhara Atlas cluster ka connection string hai. root:root = username + password , tw25bjj.mongodb.net = cluster address , appName = optional MongoDB name , Is URL ko MongoClient connect karega.

let _db;   //Local variable to store DB instance,Jab Mongo connect hota hai, _db me actual DB object store hoga.Baad me koi bhi file getDB() se is DB ko use karegi.Initially _db = undefined.

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)                   // MongoClient Atlas se connection open karta hai, Returns a Promise
  .then(client => {                                //Jab connection successful ho jaye:client me Mongo cluster ka connection object hoga
    callback(); //Connection successful hone ke baad app ko start karwa deta hai Usually app.listen() yahi callback me hota hai(app.js me)
    _db = client.db('airbnb');//Usme se tum DB select karte ho: "airbnb database" pick kiya Atlas cluster se. jo atlas me humne banaya tha
  }).catch(err => {                           //db se  connection bana k variable _db me rakh liya
    console.log('Error while connecting to Mongo: ', err);
  });
}  

const getDB = () => {             //jisse bhi variable chahiye jisme object _db= {} ye function callkaro
  if (!_db) {                  //Agar _db set nahi hai → connection abhi tak nahi hua → error throw
    throw new Error('Mongo not connected');
  }
  return _db;                  //Agar set hai → database object return kar do  Baad me koi bhi file DB access karte waqt karega:
                              //const db = getDB(); db.collection("homes").find().toArray();
}

exports.mongoConnect = mongoConnect;  //mongoConnect() → server start hone se pehle call karte ho (bcz nhi kiya toh error aaega Server early requests ko handle nahi kar paayega)
exports.getDB = getDB;              //getDB() → baaki files se DB use karte ho


// 🔥 Basic Purpose:
// Ye file ka kaam hai:
// MongoDB Atlas se connect karna
// Database ka object _db save karna
// Baaki files ko getDB() ke through DB access dena
// Ye MERN apps me most common pattern hai.

//mongoConnect() Mongo se connection open karta hai, getDB() same connection ko baaki code me use karne deta hai.


// ✅ 1. mongoConnect() server start hone se pehle call kyu karna padta hai?
// ✔ Because server ko DB ke bina chalana bekaar hai.
// Agar server start ho gaya par DB connect nahi hua,
// toh:
// koi page data fetch nahi kar paayega
// koi route crash ho jayega
// errors aayenge
// app partially broken hoga

// Isliye:
// 👉 Pehle MongoDB se connection successful hona chahiye
// 👉 Tab hi Express server start karna safe hai

// Otherwise server chal jayega par DB unreachable hoga.