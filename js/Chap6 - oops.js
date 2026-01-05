// methods = function inside object
// method is a function stored as a property of an object

// an object is a dynamic collection of key-value pairs, where each key (known as property names) has a value.The values can be primitives (like strings or numbers), arrays, or functions (which are called methods when part of an object). Almost everything in JavaScript, except for primitive types (string, number, boolean, null, undefined, symbol, bigint), is an object. 

// const person = {
//     firstName : "harsh",
//     age: 8,
//     abouthis: function(){   //method
//       console.log(this)  //refers to the current object the code is executing within, allowing methods to access their own object's properties (like this.name) or for functions to refer to the object they belong to, acting as a reference to the object itself
//     }
// }
// person.abouthis();   //-> {firstName: 'harsh', age: 8, abouthis: ƒ}
// console.log(person)  //-> {firstName: 'harsh', age: 8, abouthis: ƒ}




// function personInfo(){
//     console.log(`person name is ${this.firstName} and age is ${this.age}`);
// }

// const person1 = {
//     firstName : "harsh",
//     age: 8,
//     about: personInfo
// }
// const person2 = {
//     firstName : "mohit",
//     age: 18,
//     about: personInfo
// }
// const person3 = {
//     firstName : "nitish",
//     age: 17,
//     about: personInfo
// }

// person1.about();   //-> person name is harsh and age is 8
// person2.about();   //-> person name is mohit and age is 18
// person3.about();   //-> person name is nitish and age is 17




// ==============================================================================


// Window object :- The JavaScript window object is the global object for all JavaScript code running in a web browser environment. It represents the browser's window or a frame, and all global variables and functions automatically become properties and methods of this object. The window object is the entry point to the Browser Object Model (BOM) and contains other important objects like the document, location, history, navigator, and screen. 

// console.log(this) //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(window); //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(this === window)  //-> true       current object window hai 



// function myFunc(){
//     console.log("hello worlds");
// }      
// myFunc(); // hello worlds
// window.myFunc(); //hello world    bcz window object k pass -> myFunc() hai

// myFunc.call()  //hello worlds .....👉 call() function ko execute karta hai Bas farq itna hai ki wo this ko control karne ka option deta hai

// call() is a JavaScript method used to invoke (run) a function immediately while explicitly setting the value of this and passing arguments individually.
// call() runs a function and lets you decide what "this" should be.
// Normal function call vs .call() 
// myFunc()  -> function chalao
// myFunc.call(); -> function chalao (bas extra feature ke sath -> this ko control karne ka option deta hai)
// humne  call() me: this nahi diya, arguments nahi diye
//⚠️ Phir bhi function execute hota hai, isliye output aaya:
// call() function ko turant execute karta hai.Agar this ya arguments pass na karo, tab bhi function chalega.





// "use strict";
// function myFunc(){
//     console.log(this);  
// }
// myFunc();  //-> //undefined ....bcz we used "use strict"


// ===========================================================

// const user1 = {
//     firstName : "harshit",
//     age: 8, 
//     about:function(){
//       console.log(this.firstName, this.age)
//     }  
// }
// const user2 = {
//     firstName : "mohit",
//     age: 9,
    
// }

// user1.about();  //-> harshit 8    👉 this = user1
// user1.about.call(user2)  //-> mohit 9    
// 👉 Rule: call(x) → function ke andar this = x      this === user2
// call() function ko chalata hai aur function ke andar this ko kisi aur object se replace kar deta hai.means this ki value kya hogi call() k andhr likh sakte hai 

// user1.about.call()  //-> undefined  undefined   bcz this ki value kya hogi humne defined hi nhi kiya empty choda hai
// user1.about.call(user1);  //-> harshit 8 





// function about(hobby, favMusician){
//     console.log(this.firstName, this.age, hobby, favMusician);
// }
// const user1 = {
//     firstName : "harshit",
//     age: 8,   
// }
// const user2 = {
//     firstName : "mohit",
//     age: 9, 
// }

// about.call(user1,"dd","dd")  //-> harshit 8 dd dd
// user1.about.call(user1,"dd","dd")  //-> TypeError: Cannot read properties of undefined (reading 'call')

// apply -> apply() is a JavaScript method used to invoke (run) a function immediately while setting the value of this, and it accepts arguments as an array.
// about.apply(user1, ["guitar", "bach"]);  //-> harshit 8 guitar bach         call me alag alag argument de rhe the apply me array me dena hai

// bind -> bind() is a JavaScript method that creates a new function with a fixed value of this (and optional arguments), but it does NOT execute the function immediately.
// const func = about.bind(user2, "guitar", "bach");   //-> fun return kar rha hai 
// func();  //-> mohit 9 guitar bach