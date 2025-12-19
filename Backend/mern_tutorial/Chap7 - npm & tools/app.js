const http = require('http');
const { inherits } = require('util');


const server = http.createServer();

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});



// 1. npm init -> to create package.json file

// 2. add -> "start" : "node app.js" in package.json so hum " npm start " karke bhi server start kar sakte hai 

// 3. custom script : add -> "demo": "node app.js " to run -> npm run demo (run dalna padega bich me )

// 4. npm install nodemon --save-dev    -> baar baar server start karne ki jarurat nhi padegi nodemon se , --save-dev -> ye dev dependencies hai ye deployement me nhi jaegi   

// now change "start":"nodemon app.js" 
// npm start -> se run hona chahiye bina global install k 

// different way ->  nodemon app.js but it will not work , bcz nodemon ko apne local pc k terminal me chalane k liye globally install karna padega 

// to install it globally-> npm install nodemon -g .....now -> nodemon app.js ...it will run (ek pc pe ek baar hi globaly intall hoga) 



// npm i nodemon --save-dev  -> npm start  ( for every project )
//or
// npm i nodemon -g    --->    nodmeon app.js  (ye globally installed hai toh locally install karne ki jarurat nhi next time koi bhi project banana  no need to install nodemon only in your pc )

// 1. npm init 
// 2. node app.js                 -> to run 
// 3. npm i nodemon --save-dev   
// 4. nodemon app.js              -> to run 
// 5. "start":"nodemon app.js"    -> add this in package.json file