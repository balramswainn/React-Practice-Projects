// Core Modules
const db = require("../utils/databaseUtils");

module.exports = class Home {  //constructor banaya jo call karte hi object bana dega means koi bhi form bharega toh object ban jaega 
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) { // update  Object me agar id already hai → record pehle se database me exist karta hai.
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);

    } else { // insert //Does NOT send id (kyunki DB khud id generate karta hai—AUTO_INCREMENT)
      return db.execute('INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]); 
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes'); // means Homes table se saare rows laao. Ye query Promise return karti hai. Controller ---->.then() ya await se data read karega.          SELECT * = saare columns, saare records.
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id=?', [homeId]); // Home table me sirf us row ko laao jiska id = homeId. ? placeholder me homeId insert hoga safely. Promise return hota hai.Ek specific record find karne ke liye use hota hai — edit page ke liye perfect.
  }

  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id=?', [homeId]);//Table me jis row ka id = homeId ho → woh delete kar do.Again placeholder ke through SQL injection safe way.Promise return karta hai.Always return Promise so controller action finish hone ka wait kar sakta hai.
  }
};


// static fetchAll() -> yaha db ko req bhej k data le rhe hai 
 // db.execute('SELECT * FROM homes') // callback me bas result likhe toh [[{real data}],[data type define hai]] mil jaega jo
// .then(([rows,fields]) => {  //there were two arrays so humne array destructuring kiya bas pehle wala chahiye tha - >rows                 
//   console.log('Getting from DB', rows);  
// })
// .catch(error => {
//   console.log('Errpr while reading home records',error);
// })
// 

// -------------------------------------

// 1. return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);

// ✅ 1. db.execute(...) kya karta hai?
// db is your MySQL connection pool with .promise() attached.  meansMySQL ko SQL query bhejna aur Promise return karna.
// db.execute → ALWAYS returns a Promise

// ✅ 2. SQL query me ? question marks kyu use hote hain?
// These ? are placeholders for values.Instead of writing risky SQL:
// UPDATE homes SET houseName='abc' WHERE id=5

// Tum safe version likhte ho:
// UPDATE homes SET houseName=? WHERE id=?

// Aur values array me dete ho:[this.houseName, this.id]
// This prevents SQL injection and simplifies writing queries.


// ✅ 3. Ye return kyu likha?

// Simple reason : b.execute() returns a Promise.
// Agar return nahi likhoge: Controller ko Promise milega hi nahi, Tum .then() ya await ka use nahi kar paoge, Controller ko pata hi nahi chalega DB operation kab complete hua


// ---------------------------------------------------------------------------


// 2.  return db.execute('INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]); 

// INSERT INTO homes (...) VALUES (?,?,?,?,?,?)
// ✔ Table me new row add karo
// ✔ 6 columns me 6 values insert karo
// ✔ id column MySQL khud banayega (auto-increment)

//  ? marks = placeholders (temporary empty boxes)
// SQL me ? ka matlab:
// 👉 “Yaha par actual value baad me daalo.” 

// ✅ 2. SQL injection se bachane ke liye
// Agar tum values direct SQL me likh do:
// INSERT INTO homes VALUES ('abc', 2000, ...)
// Ye dangerous hota hai.
// Placeholder (?) use karne se MySQL values ko safe tarike se insert karta hai.

// ID nahi, kyunki:
// ✔ INSERT me id MySQL automatically generate karta hai
// ✔ Tumhe bhejne ki zaroorat nahi