// const express=require('express')  //old way CommonJS
import express from 'express'        //new way ES Module
// require('dotenv').config()        //old way CommonJS
import dotenv from 'dotenv'          //new way ES Module
dotenv.config()



const app=express();
const port=process.env.PORT || 3000;

const gitapi={
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

app.get('/',(req,res)=>{
   res.send("server is ready")
})

app.get('/login',(req,res)=>{
  res.send("login here")
})
app.get('/github',(req,res)=>{
  res.json(gitapi)                 //ye jo api hai wo json hai isiliye res.json likha 
})

app.get('/api/jokes',(req,res)=>{    // pehle /api/jokes bcz of standard practice
  const jokes=[
    {
      id:1,
      title:"joke 1",
      content:" this is joke 1"
    },
     {
      id:2,
      title:"joke 2",
      content:" this is joke 2"
    },
     {
      id:3,
      title:"joke 3",
      content:" this is joke 3"
    },
     {
      id:4,
      title:"joke 4",
      content:" this is joke 4"
    },
     {
      id:5,
      title:"joke 5",
      content:" this is joke 5"
    }
  ]

  res.send(jokes)
})

app.listen(port,()=>{
  console.log(`Serve at http://localhost:${port}`)
})





// 1. we are using ( import express from 'express' ) instead of ( const express=require('express') ) so it will give error -> Cannot use import statement outside a module so to solve it goto package.json  and paste -> "type":"module", and remove "type": "commonjs", if both are present, Node will only read the last one

//Node.js supports two module systems — ways to import and export code between files :- CommonJS (CJS) and ES Module (ESM)  

      // CommonJS (CJS) :  Import -> const express = require('express') 
      //                   export -> module.exports = app
      //           File extension -> .js or .cjs
      //   config in package.json -> "type": "commonjs"
// --------------------------------------------------------------------------------------
      // ES Module(ESM) :  Import -> import express from 'express'
      //                   export -> export default app
      //           File extension -> .js or .mjs
      //   config in package.json -> "type": "module"

      // now in ES Module(ESM) You can no longer use require()bcz humne "type": "commonjs" remove kiya .You must use import everywhere.so isiliye uper require('dotenv').config() pe error de rha tha yaha require use kiya tha ab import kiya

      // 1. npm init -> npm i express -> "type": "module"-> "start":"node index.js" -> npm i dontenv-> npm run start
      
      //npm init ka kaam ek naya Node.js project shuru karna hota hai,To npm tumse kuch questions puchta hai:,Phir wo ek file banata hai:package.json->Yah ek project ki identity aur configuration hoti hai!,Bin iske dependencies manage nahi kar paoge

      //Agar questions nahi chahiye Direct default values ke saath run: npm init -y