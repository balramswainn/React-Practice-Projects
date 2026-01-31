// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const userRouter = require("./routes/userRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");

const app = express();
                                                                                                          //just an example
app.use(express.urlencoded()); //Form submit data ko req.body me convert karta hai. and object me show karta hai(not needed now)
app.use(userRouter);   // yaha bina base path ka connect kiya bcz need nhi but niche -> host/add-home karke access kar paye isiliye
app.use("/host", hostRouter);  //isko hum routes ko group / organize karne ke liye use karte hain. /host → base path, hostRouter → ek alag file me likhe hue routes..So jo bhi routes hostRouter me hain, woh sab /host se start honge. so /host/add-home karke access

app.use((req, res, next) => {   // ordering of middleware is imp isse start me lagadeta toh error hi ata baki kuch nhi chalta
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html')); 
  //res.status(404) -> ye bolega ki error aya hai status chnge ho jaega , error dikhana bhi jaruri hai 
  //imp bcz project jab server pe jaega file path change ho jaega toh dynamic path dena jaruri hai
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

// Single line → " " or ' '
// Multi line → ` `  (backticks required)


// app.use(express.urlencoded()); -> Form submit data ko req.body me convert karta hai.
//Ye middleware HTML form data ko read karne ke liye use hota hai.Jab koi form submit hota hai, data URL-encoded format me aata hai (string format).Express ko wo samajh nahi aata, to ye middleware use karke Express us data ko object me convert kar deta hai.
//Without express.urlencoded() → req.body empty rahega ❌ With express.urlencoded() → req.body normal object ban jaata hai ✅

// const path = require('path');
// res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));

// path.join() → different folder names ko sahi OS format me join karta hai.
// rootDir → project ka main folder  ya main path jo humne pathUtil.js me banaya tha 
// 'views' → folder name
// '404.html' → file

// Why do this?
// Windows, Linux, Mac sab me file path ka format different hota hai.
// path.join() ensure karta hai ki file path sahi bane.

// Aur rootDir ensure karta hai ki relative path ki dikkat na aaye.




// hum -> (require.main.filename) ye pathUtil.js me hai... se file ka path le rhe hai jo rootDir hai simple yaha toh path alag hoga and server pe alag so hard coded nhi rakh sakte dynamic hon chahiye jo path hai mil jaega 

// laptop me project ka folder yaha ho sakta hai: res.sendFile("C:/Users/YourName/Desktop/MyProject/views/home.html");
// But Jab Project Server par Upload Hota Hai…

// Server (like Railway, Render, AWS, VPS, Hosting etc.) tumhara Desktop wala path nahi hota.
// Server ka internal directory kuch aisa hoga:

// /usr/local/src/apps/MyProject  -> Path completely change ho gaya. so hard-coded path nhi chalega 



// ----------------------------------------------------------


//  WE CAN ALSO WRITE module.exports LIKE THIS
// multiple exports using object 

// module.exports={
//     handler: requestHandler,
//     extra: "Extra"
// }

//Setting multiple properties

// module.exports.handler = requestHandler;
// module.exports.extra = "Extra";


//shortcut   but object ban ke export ho rha hai toh waha bhi wese destructure  karna padega like { requestHandler } to import or obj me dalke obj.handler() use karna 
  
// exports.handler = requestHandler;
// exports.extra = "Extra"







