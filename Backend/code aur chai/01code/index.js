require('dotenv').config()    //import 'dotenv/config'  ese bhi likh sakte hai 
const express = require('express')   //This line imports the Express module,    require('express') means you are loading the Express package that you installed via npm. express is a function that helps you create a web server easily.

const app = express()  //Here, you are creating an Express application by calling the express() function. app is now your server object. With this object, you can define routes, middleware, and other configurations.

const port = 4000 //This defines a variable port with the value 3000.It means your server will run on http://localhost:3000 ,You can choose any free port, but 3000 is commonly used for development.

const githubData={
  "login": "hiteshchoudhary",
  "id": 11613311,
  "node_id": "MDQ6VXNlcjExNjEzMzEx",
  "avatar_url": "https://avatars.githubusercontent.com/u/11613311?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/hiteshchoudhary",
  "html_url": "https://github.com/hiteshchoudhary",
  "followers_url": "https://api.github.com/users/hiteshchoudhary/followers",
  "following_url": "https://api.github.com/users/hiteshchoudhary/following{/other_user}",
  "gists_url": "https://api.github.com/users/hiteshchoudhary/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/hiteshchoudhary/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/hiteshchoudhary/subscriptions",
  "organizations_url": "https://api.github.com/users/hiteshchoudhary/orgs",
  "repos_url": "https://api.github.com/users/hiteshchoudhary/repos",
  "events_url": "https://api.github.com/users/hiteshchoudhary/events{/privacy}",
  "received_events_url": "https://api.github.com/users/hiteshchoudhary/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Hitesh Choudhary",
  "company": null,
  "blog": "https://hitesh.ai",
  "location": "India",
  "email": null,
  "hireable": null,
  "bio": "I make coding videos on youtube and for courses. My youtube channel explains my work more. Check that out",
  "twitter_username": "hiteshdotcom",
  "public_repos": 113,
  "public_gists": 5,
  "followers": 50377,
  "following": 0,
  "created_at": "2015-03-23T13:03:25Z",
  "updated_at": "2025-10-03T03:50:56Z"
}

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

app.get('/login',(req,res) => {
  res.send("login here")
})

app.get('/github',(req,res) =>{
  res.json(githubData)
})
  
app.listen(process.env.PORT, () => {                    //env se port le rahe hai so to access the value we use process.env.PORT
  console.log(`Example app listening on port ${port}`)
})





// Explanation from start


// Express :- Fast, unopinionated, minimalist web framework for Node.js

// 1. npm init --> package name --> description --> entry port : index.js --> keywords : node char --> author : jerry
// 2. to run : node index.js  ...to change the run command goto package.json -> scripts me hata ye  "test": "echo \"Error: no test specified\" && exit 1" and add  "start": "node index.js"
// 3. now to run -> npm run start  
// 4. now install express.js -> npm install express .....goto docs and hello word copy code and paste here



// So, app.get() listens for that request, and the callback function inside it handles what happens next.
// In this case, we use res.send("Hello World") to send a response back to the client.
// The app.listen() function tells Express to start the server and listen on port 3000.
// After running, the app doesn’t close automatically because it keeps listening continuously for incoming requests.

// ******This is a route definition. Let’s break it:******
// app.get('/') → listens for GET requests at the root path /.
// (req, res) => { ... } → this is a callback function that runs when someone visits /.
// req → the request object (contains info about client request, like query, body, headers, etc.).
// res → the response object (used to send something back to the client).
// res.send('Hello World!') → sends the text "Hello World!" as the response.
// So, if you open http://localhost:3000/, you’ll see Hello World! in the browser.



// This starts the server.
// app.listen(port, ...) → tells Express to listen on port 3000.
// The callback function () => { ... } runs when the server starts successfully.
// console.log(...) → prints a message in your terminal:



// 2. install : npm i dotenv  

// dotenv is a Node.js package that allows you to load environment variables from a file named .env into your application.
// Environment variables are values that define your app’s configuration — like: Database username & password, API keys, Secret tokens, Port number, Cloud storage credentials,
// They’re sensitive and change between environments: Development (your laptop), Production (live server), Testing
