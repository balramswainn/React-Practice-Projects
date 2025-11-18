const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',   // production me db koi aur hi server pe hota hai( ip ,dns) ye dena hota hai for now hum local pe hai  
  user: 'root',        // db banate waqt diya tha user and password
  password: 'root',
  database: 'airbnb'  // jo humne workbench me schema banaya woh
});

module.exports = pool.promise();


// ✔ mysql.createPool({...})
// → MySQL ke saath connection pool banata hai (multiple connections handle karta hai).

// ✔ host, user, password, database
// → MySQL server ka address + login details + konsi database use karni hai.

// ✔ pool.promise()
// → MySQL ko promise-based bana deta hai, so tum async/await use kar sakte ho.

// ✔ module.exports = ...
// → Is pool ko baaki files me import karke queries run kar sakte ho.


//ab data store karne k liye table banana padega
//mysql workbench me ja double click kar -> create table - name should be plural and small ex-"homes"...after then put data ->apply
//now click tables -> homes -> 3 third icon to view thw tables "result grid " -> khudse hi valuedala (1,Utsav,999,Goa,4.9,https://thumbs.dreamstime.com/b/northern-sunset-part-2-941312.jpg	,This is the best house in goa) 
//ab isse apne code me bhi lana hai project me bhi dikhana hai ui me data