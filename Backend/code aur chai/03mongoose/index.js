// const express=require('express')
import express from 'express'

const app=express();
const port=3000;

app.get('/',(req,res)=>{
  res.send("hey therse")
})


app.listen(port,()=>{
  console.log(`serve http://localhost:${port}`)
})




// npm init -> npm i express -> "type":"module" -> "start":"node index.js" -> npm run start -> npm i mongoose


// ------------------------- paste it in next file ---------------------

// MongoDB → actual database (where data is stored).
// Mongoose → a library (tool) in Node.js that helps you connect to MongoDB and manage data easily. 
// Mongoose is a JavaScript Object Data Modeling (ODM) library for MongoDB, used to structure and interact with data in Node.js applications. It simplifies working with MongoDB by providing a schema-based approach, enforcing data structure, performing validation, modeling relationships, and offering a powerful query builder to manage data efficiently. 

// We use Mongoose because:
// ✅ It makes MongoDB easier to use with Node.js.
// ✅ It gives structure to data using Schemas and Models.
// ✅ It helps in validations, queries, and relationships easily.

// you can use MongoDB without Mongoose — using the official MongoDB Node.js driver, but it’s more manual and code becomes longer.


// A Schema defines the structure of your data — what fields each document will have and their types.
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String
// })
// So every user in the database will have these fields: name, age, email.Think of a Schema like a blueprint or plan for your data.

// A Model is created from a Schema — it is used to actually create, read, update, and delete data in the database.
// const User = mongoose.model('User', userSchema)
// User.find()        // get all users
// User.create({...}) // add a new user
// User.updateOne()   // update user
// User.deleteOne()   // delete user


// Schema → defines the structure (what data looks like)

// Model → uses that structure to talk to the database


// ---------------------------------------------------------------

// (1) SQL Databases (Relational) Examples: MySQL, PostgreSQL, SQLite, Microsoft SQL Server

// Store data in tables (rows & columns),Have relationships between data (foreign keys), Use SQL language, Ensure data consistency & integrity, Best when data is structured and related

// Use when: You have clear relationships (e.g., users, orders, products), You need complex queries and transactions, 
// Example apps:, Banking system, E-commerce, Employee management system 🧑‍💼




// (2) NoSQL Databases (Non-Relational), Examples: MongoDB, Firebase, Cassandra, Redis, Store data in JSON-like format (documents) or key-value pairs, Very flexible — no fixed schema required, Scales easily (great for large, dynamic apps), Great for unstructured or semi-structured data

// Use when:Data structure changes frequently, You need fast reads/writes, You don’t need complex joins

// Example apps: Social media, Chat apps, Real-time analytics, IoT data 


// | Type      | Structure        | Flexibility | Example DB        | Best For                    |
// | --------- | ---------------- | ----------- | ----------------- | --------------------------- |
// | **SQL**   | Tables           | Low         | MySQL, PostgreSQL | Structured & related data   |
// | **NoSQL** | Documents / JSON | High        | MongoDB, Firebase | Dynamic & unstructured data |

//We choose a database based on what our app needs - SQL for structured & relational data, NoSQL for flexibility & scalability.

