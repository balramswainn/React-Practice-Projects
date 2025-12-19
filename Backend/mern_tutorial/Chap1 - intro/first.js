console.log("KG coding is the best ")
const fs = require('fs');                                 //fs module (file system)

fs.writeFile("output.txt","Writing File", (err) => {       // isme output.txt file create hogyi, uske andhr "writing file" likhajaega
  if(err) console.log("Error Occured");
  else  console.log('File Written Succesfully');
})


// to run this file -> node first.js

//The fs (File System) module in Node.js is a built-in module that provides an API for interacting with the file system on your computer. It allows you to perform various file and directory operations, such as creating, reading, writing, deleting, and modifying files and folders.

// REPL (read,eval,print,loop) for -> quick testing, session management, node api ko check ya test karne k liye 
// jo bhi statment isme likhenge usse read karega , evaluate karega ,  fhir output show hoga.

// write -> node ......in vs code terminal ( browser k console jese chalega)
// ex:- 4+3 -> 7