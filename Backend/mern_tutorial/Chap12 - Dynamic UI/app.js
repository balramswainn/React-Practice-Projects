// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter") //yahabas hostRouter chaiye so destructure kiya bcz waha se object banke export hua
const rootDir = require("./utils/pathUtil");

const app = express();

app.set('view engine', 'ejs'); //Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
app.set('views', 'views'); //Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

                                                                                                          
app.use(express.urlencoded()); 
app.use(userRouter);   
app.use("/host", hostRouter);  

app.use(express.static(path.join(rootDir, 'public')))   

app.use((req, res, next) => {  
  res.status(404).render('404', {pageTitle: 'Page Not Found', currentPage: '404'});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});




// EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
// EJS or Embedded JavaScript is a template engine for JavaScript that is used for web development which allows users to generate dynamic HTML markup using JavaScript code within HTML templates. 

// 1. -> npm i --save ejs

// 2. add this after const app = express(); 
//   -> 
// app.set('view engine', 'ejs');  -> Express ko batata hai ki HTML files render karne ke liye EJS template engine use karna hai.
// app.set('views', 'views'); -> Express ko batata hai ki EJS templates kis folder me milenge (usually views/).

//app.set -> Express ko configuration set karne ke liye use hota hai (jaise view engine, views folder).


//  change file extension to home.ejs 
// <% js %> -> to write ejs 
// <%= home.houseName %> -> and to show the value in UI like {state} in jsx 
// <%- include('partials/head') %>  -> now to include dif ejs file like component in react   


//partials jo hum component ki tarah baar baar use kar sakte hai 



// to start tailwind from npm (version 3) : -> npm run tailwind
// Add this in package.json
// "scripts": {
//   "tailwind": "tailwindcss -i ./views/input.css -o ./public/output.css --watch"
// }


// to restart tailwind without  npm run tailwind (version 4)
// npx @tailwindcss/cli -i ./views/input.css -o ./public/output.css --watch


// for now tutorial me jesa dono ko run karne k lie ye 
// "start": "nodemon app.js & npm run tailwind" 
// diya hai work nhi karega bcz ye version 3 use kar rha hai, uske script me ye hai ->  "tailwind": "tailwindcss -i ./views/input.css -o ./public/output.css --watch"      ye rehta hai toh hi hum    -> npm run tailwind  ..........kar sakte the ab version 4 me  ye script nhi hoti toh hum->  npm run tailwind .......... use nhi kar skate isliye ye ......    "start": "nodemon app.js & npm run tailwind"  work nhi karta   

 // to use both add script ->  "tailwind": "tailwindcss -i ./views/input.css -o ./public/output.css --watch"
// in the json file so npm start se work karega 

//simple work nhi kiya toh alag terminal me use kar sirf tailwind
 