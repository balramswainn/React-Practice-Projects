// methods = function inside object
// method is a function stored as a property of an object

// an object is a dynamic collection of key-value pairs, where each key (known as property names) has a value.The values can be primitives (like strings or numbers), arrays, or functions (which are called methods when part of an object). Almost everything in JavaScript, except for primitive types (string, number, boolean, null, undefined, symbol, bigint), is an object. 

 // "this" -> refers to the current object the code is executing within, allowing methods to access their own object's properties (like this.name) or for functions to refer to the object they belong to, acting as a reference to the object itself

// const person = {
//     firstName : "harsh",
//     age: 8,
//     ran:this,
//     abouthis: function(){   //method
//       console.log(this) 
//     }
// }


// person.abouthis();   //-> {firstName: 'harsh', age: 8, abouthis: ƒ}
// console.log(person)  //-> {firstName: 'harsh', age: 8, abouthis: ƒ}

// console.log(person.ran)  //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// 👉 this sirf function/method ke ANDAR hi current object ko refer karta hai
// 👉 Object ke bahar / property assign karte waqt this = window (browser me)
// 👉 Reason:
// Object banate waqt this object ko refer nahi karta. cuz 👉 JS pehle se kisi person object ke andar nahi hoti, Is waqt JS global scope me hoti hai Browser me global this = window ->    ran: this    -> Ye line object ke bahar execute hoti hai (global context me).

// this ye nahi dekhta:
// ❌ function kaha likha hai

// this ye dekhta hai:
// ✅ function kese call hua hai -> person.abouthis();    dot ke left me person hai  → this = person  ...this = jisne call kiya




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
//👉 Jo function / variable globally define hota hai (var ya function se), wo window object ka part ban jata hai.
// ❌ let / const → window me nahi jata


// "use strict";
// function myFunc(){
//     console.log(this);  
// }
// myFunc();  //-> //undefined ....bcz we used "use strict"  if strict nhi hota toh window object milta 




// function myFunc(){
//     console.log("hello worlds");
// }   

// myFunc.call()  //hello worlds .....👉 call() function ko execute karta hai Bas farq itna hai ki wo this ko control karne ka option deta hai

// call() is a JavaScript method used to invoke (run) a function immediately while explicitly setting the value of this and passing arguments individually.
// call() runs a function and lets you decide what "this" should be.
// Normal function call vs .call() 
// myFunc()  -> function chalao
// myFunc.call(); -> function chalao (bas extra feature ke sath -> this ko control karne ka option deta hai)
// humne  call() me: this nahi diya, arguments nahi diye
//⚠️ Phir bhi function execute hota hai, isliye output aaya:
// call() function ko turant execute karta hai.Agar this ya arguments pass na karo, tab bhi function chalega.








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

//the JavaScript bind() method explicitly creates and returns a new function. The original function remains unchanged, and the new "bound" function is permanently linked to a specified this value and optional initial arguments.
//  The primary use of bind() is to control the value of the this keyword inside the function, regardless of how or where the new function is eventually called. This is especially useful for callbacks or event handlers, where the original context might otherwise be lost.
// ==========================================================================



// const user1 = {
//     firstName : "harshit",
//     age: 8,
//     about: function(){
//         console.log(this.firstName, this.age);
//     }   
// }

// user1.about();  //-> harshit 8

// function myFunc(){   console.log(this); }
// myFunc(); -> window object  rule 👉 Function ko bina kisi object ke call kiya gaya hai, isliye this = window (browser me)



// don't do this mistake 

// const myFunc = user1.about;                // myFunc = function() {  console.log(this.firstName, this.age) };
// myFunc()    //-> undefined undefined     //in simple user1.about -> function hai so sirf woh function store hoga myFunc mai but fhir woh fun me this hai uski value kya hogi ? this = current object    but ab koi object hi nhi so this = window  and window me koi firstname and age nhi hai so undefined

// const myFunc = user1.about();  //-> harshit 8     bcz ye yaha pe call hogya hai and myFunc undefined aya bcz myFunc me kuch exist hi nhi karta 
// console.log(myFunc)  //-> undefined       reason bcz uper humne console.log kiya hai yaha kuch value return nhi ho rhi hai if return hota toh woh value myFunc me jati


// const ran=user1.about
// ran.call(user1)  //-> harshit 8           call k waje se uske andhr user1 likha hai user1 k context me this run hoga
// user1.about.call(user1) //-> harshit 8     means jo function hai user1 k andhr usse kisi aur object k sath bhi use kar sakte hai

// const ran=user1.about.call(user1)
// ran();  //->  TypeError: ran is not a function

// const myFunc = user1.about.bind(user1);     //bcz bind new function create karta hai and bind karega user1 object k sath bcz ye object ka context chala gya tha na 
// myFunc();   //-> harshit 8







// =========================================



// arrow functions 

// const user1 = {
//     firstName : "harshit",
//     age: 8,
//     about: () => {
//         console.log(this.firstName, this.age);
//     }   
// }

// user1.about();   //-> undefined undefined   bcz 👉 Arrow function ka this apna nahi hota, wo bahar wale scope se this le leta hai. and bahar wala scope toh window object hai  and winodw me firstname and age nhi hai so undefined 
// so if parent scope ek object ho toh ? 👉 tab bhi window hi aayega — agar “parent” normal object ho. Arrow function sirf function-scope / lexical scope se this leta hai,object se nahi.

// example:-
// const parent = { firstName: "Parent", age: 40,
//   child: { about: () => { console.log(this.firstName, this.age); } }
// };

// parent.child.about(); // undefined undefined   Kyu?Arrow function sirf function-scope / lexical scope se this leta hai,object se nahi. child ek object hai Object scope this provide nahi karta Arrow function bahar jata hai → global scope Browser me global this = window

// Kab arrow function ko “sahi this” milega? ✅
// function Parent() {
//   this.firstName = "Parent";
//   this.age = 40;

//   this.about = () => {
//     console.log(this.firstName, this.age);
//   };
// }

// const p = new Parent();
// p.about(); // Parent 40   Kyu kaam kiya?  Arrow function ne this Parent function se lock kar liya  Ab call ka koi effect nahi

// ❌ Object ke andar arrow → window
// ✅ Function / constructor ke andar arrow → correct this


// ===============================================================



// const user1 = {
//     firstName : "harshit",
//     age: 8,
//     about: function(){
//         console.log(this.firstName, this.age);
//     }   
// }

// const user1 = {
//     firstName : "harshit",
//     age: 8,
//     about(){   //ese bhi likh sakte hai same hi hai 
//         console.log(this.firstName, this.age);
//     }   
// }

// user1.about();



// =====================================================





// so har baar har user k liye hum object nhi bana sakte isliye esa koi way chahiye jo object banate rahe so we use constructor but yaha pe usse different way me dekhenge 
// function (that function create object)
// 2.) add key value pair 
// 3.) object ko return krega 

// function createUser(firstName, lastName, email, age, address){
//     const user = {};
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.email = email;
//     user.age = age;
//     user.address = address;
//     user.about = function(){
//         return `${this.firstName} is ${this.age} years old.`;
//     };
//     user.is18 =  function(){
//         return this.age >= 18;
//     }
//     return user;
// }

// const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 19, "my address");
// console.log(user1);  //-> {firstName: 'harshit', lastName: 'vashsith', email: 'harshit@gmail.com', age: 19, address: 'my address', about:ƒ (),is18:ƒ () }

// const is18 = user1.is18();
// console.log(is18)   //-> true
// const about = user1.about();
// console.log(about); //-?> harshit is 19 years old.


// so yaha pe ek issue hai so harbaar object create hoga toh baar baar ye method  create honge jo ki memory badha rhe hai so to solve niche likha hai 
// ====================================================================



// const userMethods = {
//     about : function(){
//         return `${this.firstName} is ${this.age} years old.`;
//     },
//     is18 : function(){
//         return this.age >= 18;
//     }
// }
// function createUser(firstName, lastName, email, age, address){
//     const user = {};
//     user.firstName = firstName; 
//     user.lastName = lastName;
//     user.email = email;
//     user.age = age;
//     user.address = address;
//     user.about = userMethods.about;   //iska reference likha hai yaha so harbaar object create hoga toh baar baar ye method nhi create honge jo ki memory badha rhe the
//     user.is18 = userMethods.is18;
//     return user;
// }

// const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
// const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");
// console.log(user1.about());  //-> harshit is 9 years old.
// console.log(user3.about());  //-> mohit is 17 years old.


// so isme ek prblm hai ki har baar if mene new method banaya toh baar baar isme add karna padeg like user.is18 = userMethods.is18; so we need to solve this

// ====================================================================


const obj1 = {
    key1: "value1",
    key2: "value2"
}

// __proto__

// offical ecmascript documentation 

// [[prototype]]

// __proto__ , [[prototype]]



// prototype    

const obj2 = Object.create(obj1); // {}
// there is one more way to create empty object
obj2.key3 = "value3";
// obj2.key2 = "unique";
console.log(obj2);

console.log(obj2.__proto__);
