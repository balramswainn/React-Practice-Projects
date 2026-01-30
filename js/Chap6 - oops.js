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

// var myFunc=()=>{
//     console.log("d")
// }

// myFunc(); //-> hello worlds
// window.myFunc(); //hello world    bcz window object k pass -> myFunc() hai   (this will not work in let and const if FE and arrow function usse define kiya ho )
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





// function fun(){
//     console.log("hello jerry",this)
// }
// fun.call()  //-> hello jerry Window {window: Window, self: Window, document: document, name: '', location: Location, …}







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

// user1.about.call()  //-> undefined  undefined   bcz this ki value kya hogi humne defined hi nhi kiya empty choda hai(bcz user1.about -> about function hai ab about.call() hai so this undefined hogya ab if bas about() call karu toh undefined hi hota hai na yaha bas call hua if object k context me call karna hai toh andhr object likho)

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
// myFunc(); //-> window object  rule 👉 Function ko bina kisi object ke call kiya gaya hai, isliye this = window (browser me)


// //don't do this mistake 

// const myFunc = user1.about;                           
//                                 //myFunc = function() {  console.log(this.firstName, this.age) };

// myFunc()    //-> undefined undefined     //in simple user1.about -> function hai so sirf woh function store hoga myFunc mai but fhir woh fun me this hai uski value kya hogi ? this = current object    but ab koi object hi nhi so this = window  and window me koi firstname and age nhi hai so undefined


// const myFunc = user1.about();  //-> harshit 8     bcz ye yaha pe call hogya hai and myFunc undefined aya bcz myFunc me kuch exist hi nhi karta 
// console.log(myFunc)  //-> undefined       reason bcz uper humne console.log kiya hai yaha kuch value return nhi ho rhi hai if return hota toh woh value myFunc me jati





// const ran=user1.about
// ran()   //-> undefined undefined
// ran.call(user1)  //-> harshit 8           call k waje se uske andhr user1 likha hai user1 k context me this run hoga
// user1.about.call(user1) //-> harshit 8     means jo function hai user1 k andhr usse kisi aur object k sath bhi use kar sakte hai

// const ran=user1.about.call(user1)  //-> harshit 8

// ran();  //->  TypeError: ran is not a function

// const myFunc = user1.about.bind(user1);     //bcz bind new function create karta hai and bind karega user1 object k sath bcz ye object ka context chala gya tha na 
// myFunc();   //-> harshit 8







// =========================================



// arrow functions 

// const demo = ()=>{
//     console.log(this)
// }
// demo()  //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// const user1 = {
//     firstName : "harshit",
//     age: 8,
//     about: () => {
//         console.log(this.firstName, this.age);
//     }   
// }

// user1.about();   //-> undefined undefined   bcz 👉 Arrow function ka this apna nahi hota, wo bahar wale scope se this le leta hai. and bahar wala scope toh window object hai  and window me firstname and age nhi hai so undefined 
// so if parent scope ek object ho toh ? 👉 tab bhi window hi aayega — agar “parent” normal object ho. Arrow function sirf function-scope / lexical scope se this leta hai,object se nahi.

// example:-
// const parent = { firstName: "Parent", age: 40,
//   child: { about: () => { console.log(this.firstName, this.age); } }
// };
// const parent = { firstName: "Parent", age: 40,
//   child: { about: function(){ console.log(this.firstName, this.age); } }
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

// const p = new Parent(); // new => object banaega
// console.log(p)  //-> Parent {firstName: 'Parent', age: 40, about: ƒ}
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


// so yaha pe ek issue hai so harbaar object create hoga toh baar baar ye object k andhr jo method hai create honge jo ki memory badha rhe hai so to solve niche likha hai 
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

// console.log(user1)  //-> {firstName: 'harshit', lastName: 'vashsith', email: 'harshit@gmail.com', age: 9, address: 'my address', about: ƒ, is18: ƒ}

// console.log(user1.about());  //-> harshit is 9 years old.
// console.log(user3.about());  //-> mohit is 17 years old.


// so isme ek prblm hai ki har baar if mene new method banaya toh baar baar isme add karna padeg like user.is18 = userMethods.is18; so we need to solve this

// ====================================================================


// const obj1 = {
//     key1: "value1",
//     key2: "value2"
// }


// there is one more way to create empty object
// const obj2 = Object.create(obj1);   //👉 Object.create(obj1) ek naya object banata hai jiska prototype obj1 hota hai (inherit karta hai obj1 se). 👉 obj2 ke paas apni properties nahi hoti, wo missing properties obj1 se lookup karta hai (via prototype).
// console.log(obj2) //->  {}



// obj2.key3 = "value3";      //value add hui obj2
// console.log(obj2)  //->  {key3: 'value3'}

// obj2 me key2 toh hai nhi toh value kese aayi undefined kyu nhi aayi bcz humne uper ek connection bana liya tha jise obj2 me ye key nhi mili toh woh obj1 me dhundega
// console.log(obj2.key2)  //-> value2
//so ussse obj2 me nhi mila but js me  -> __proto__  hota hai usme reference hotahai ek object usme dhundte hai ye case me reference obj1 tha

// offical ecmascript documentation 
// __proto__ = [[prototype]]    ye dono same hai 

// prototype     but ye alag hai 

// [[Prototype]] : Object
// key1 : "value1"
// key2 : "value2"

// if same name ka key add kardenge toh ye obj1 k pass nhi jaega 
// obj2.key2 = "unique";
// console.log(obj2.key2)  //-> unique
// console.log(obj2)  //-> {key3: 'value3', key2: 'unique'}

// console.log(obj2.__proto__);  //-> {key1: 'value1', key2: 'value2'}     hume obj1 ka object mila 

// -----------------------------------------------------------------------------



// prototype 👉 Ye sirf constructor function ke paas hota hai 
//👉 JavaScript me normal function hi constructor function hota hai (jab new ke saath use karo). except arrow wo constructor nhi hota
// function User() {}
// User.prototype.sayHi = function () {};
// prototype = property, Sirf functions (constructor) ke paas hoti hai, Naye objects ke liye blueprint / common store






// __proto__ kya hai? 👉 Ye har object ke paas hota hai 

// 👉 Prototype(__proto__) ek backup object hota hai Agar JS ko kisi object me property/method nahi milta, toh wo prototype me dhundta hai.
// Prototype(__proto__) kyu hai? (main reason) 👉 Memory bachane ke liye + code reuse ke liye ,Socho agar 100 objects ko same function chahiye: ❌ har object me copy banaoge → memory waste ✅ ek jagah rakho → sab use kare , Prototype = common store
// Object me prototype kyu hota hai? 👉 JS ko inheritance chahiye bina class ke (old JS) Isliye har object ke peeche ek hidden link hota hai: [[Prototype]]  →  kisi aur object ki taraf

// object.__proto__ === Constructor.prototype
// u.__proto__ === User.prototype // true

// prototype = jaha se banana hai
// __proto__  = jisse object connected hai


// =======================================================================




// __proto__ = k wajah se ab har object me hume method likhne ki jarurat nhi ek baar bana lo and usko use karo bina object me daalke like user1.about = userMethods.about

// const userMethods = {
//     about : function(){
//         return `${this.firstName} is ${this.age} years old.`;
//     },
//     is18 : function(){
//         return this.age >= 18;
//     },
//     sing: function(){
//         return 'toon na na na la la ';
//     } //ek naya object banata hai jiska prototype obj1 hota hai (inherit karta hai obj1 se). 👉 obj2 ke paas apni properties nahi hoti, wo missing properties obj1 se lookup karta hai (via prototype).
// }
// function createUser(firstName, lastName, email, age, address){  
//     const user = Object.create(userMethods);// {}    
// 
//pehle humne khud empty object define  kiya tha ab object.create ek empty object banaega,Object.create() -> iske andhr jo object dalenge __proto__ me uska refernce milega, ab user call hoga toh usme proto hoga jo ki refernce hoga userMethods ka  jisse user -> userMethods ka method access kar paega and ab bas mthods ko access karne k liye -> user.about = userMethods.about;  nhi  linkhna padega  directly access kar paenge

// yaha Object.create( andhr function ) bhi likh sakte hai Ye technically allowed hai, but ye useful nahi hai Kyuki function khud ek object hota hai, to obj.__proto__ us function pe point karega — lekin normally hum methods ka object dete hain, single function nahi.Object.create() ke andar object with methods pass karo, single function nahi.


//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.email = email;
//     user.age = age;
//     user.address = address;
//     return user;
// }

// const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
// const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");
// console.log(user1);   //-> {firstName: 'harshit', lastName: 'vashsith', email: 'harshit@gmail.com', age: 9, address: 'my address'}
// console.log(user1.about());   //-> harshit is 9 years old.
// console.log(user3.sing());  //-> toon na na na la la 


// ==================================================================



// function hello(){
//     console.log("hello world");
// }

// javascript function ===> function  + object  (means fun ko bhi object jese access kar sakte hai )

// name property ---> tells function name;
// console.log(hello.name);   //-> hello

// you can add your own properties 
// hello.myOwnProperty = "very unique value";      // jese object me key value pair add karte the yaha bhi kardiya
// console.log(hello.myOwnProperty);   //-> very unique value


// function provides more usefull properties.

// hello ek constructor function hai, jisme prototype naam ki property hoti hai aur usme hum key–value pairs (shared methods) store kar sakte hain.
// console.log(hello.prototype);   //->  {}   ye ek empty object hai 
// 👉 hello.prototype ek object hota hai 👉 By default usme ek property hoti hai constructor 👉 constructor ki value wahi function hoti hai (hello) -> hello.prototype = { constructor: hello }, hello constructor function hai (kyunki normal function hai), Har constructor function ke paas ek prototype property hoti hai, prototype ek object hota hai , Us object me hum shared properties / methods add kar sakte hain

// only functions provide prototype property

// hello.prototype.abc = "abc";
// hello.prototype.xyz = "xyz";
// hello.prototype.sing = function(){
//     return "lalalla";
// };
// console.log(hello.prototype.sing());   //-> lalalla
// console.log(hello.prototype)   //-> {abc: 'abc', xyz: 'xyz', sing: ƒ}



// const obj = {
//     key1: "value1",
// }
// console.log(obj.prototype) //-> undefined so prototype bas function k sath hi milta hai 



// ====================================================================


// prototype 👉 Ye sirf function ke paas hota hai except arrow function  (har constructor function ke pass prototype naam ki property hoti hai aur usme hum key–value pairs (shared methods) functions, store kar sakte hain. )
// __proto__ 👉 Ye har object ke paas hota hai ,jise hum reference se sare methods access kar paye 

// function -> prototype        (expect arrow fun)
// object -> __proto__  or [[Prototype]]


// function createUser(firstName, lastName, email, age, address){   //Object.create -> empty object banata hai
//     const user = Object.create(createUser.prototype);// {}   yaha pe createUser.prototype ki jagah object tha userMethods jise hum user k andhr jo __proto__ ke reference se sare methods access kar pa rhe the(bcz ) ab yaha pe direct prototype likh rhe cuz prototype me hum sab function dalne wale hai fhir user easily access kar paega bina koi aur bahar ke object ko use kiye
    
//  //  Object.create() -> iske andhr jo function ya object dalenge __proto__ me uska refernce milega
//  //  so ye user ={} ko ab proto se   createUser.prototype(isme hum methods and key value pairs store kar sakte hai) ka refer kar paega and is se value acces kar paega 

//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.email = email;
//     user.age = age;
//     user.address = address;
//     return user;
// }
// createUser.prototype.about = function(){
//     return `${this.firstName} is ${this.age} years old.`;
// };
// createUser.prototype.is18 = function (){
//     return this.age >= 18; 
// }
// createUser.prototype.sing = function (){
//     return "la la la la ";
// }


// const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
// const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");
// console.log(user1);  //-> createUser {firstName: 'harshit', lastName: 'vashsith', email: 'harshit@gmail.com', age: 18, address: 'my address'}
// console.log(user1.is18());   //-> true





// ========================================================================
// uper hum ->  const user = Object.create(createUser.prototype);     ise hum ek new object bana rhe the  and uske __proto__ ko refernce de rhe the  contructor function k prototype k sath (means Us object ka __proto__ set kar rahe hain → createUser.prototype se) so-> new keyword exactly yahi 2 kaam karta hai (plus 2 aur) :-



// new keyword 👉 new JS me ek naya object banata hai aur usse constructor function ke prototype se connect karta hai. 
// 1️⃣ Empty object banata hai   let obj = {}
// 2️⃣ Us object ka [[Prototype]] (__proto__) set karta hai ->  obj.__proto__ = CreateUser.prototype  means   (iska matlab: agar obj me koi property/method nahi milegi,
//     toh JS CreateUser.prototype me dhundega) ,    naye object k andhr jo proto hai woh (jisse hum ref leke value access karte hai usse yaha set kardiya jisse ab function k andhr jo value use access kar paenge  ) = CreateUser.prototype(isme hum methods and key value pairs store kar sakte hai) 
// 3️⃣ Constructor function call karta hai ->  CreateUser.call(obj, firstName, lastName, email, age, address)  (yaha `this` = obj hota hai)
// 4️⃣ Agar constructor kuch return nahi karta,  toh JS automatically `obj` return kar deta hai

// 🔍 Ab step-by-step dekhte hain: new actually kya karta hai
// const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
// 🧩 STEP 1: Empty object create hota hai -> user1 = {}

// 🧩 STEP 2: Prototype link set hota hai  -> user1.__proto__ = CreateUser.prototype
// means->  user1.is18   // pehle user1 me dhundega
//             // nahi mila → CreateUser.prototype.is18
//             user1.is18(); // kaam karta hai

// 🧩 STEP 3: Constructor function call hota hai
// CreateUser.call( user1, 'harshit', 'vashsith', 'harshit@gmail.com', 18, 'my address');     
// Ab function ke andar: 
// this.firstName = 'harshit';  // user1.firstName 
// this.age = 18;              // user1.age        👉 Saari values user1 ke andar store ho jati hain

// 🧩 STEP 4: Object return hota hai:-  return user1;
//    console.log(user1);  pura object


// new = object creation + prototype linking + this binding
// new sirf normal functions ke saath kaam karta hai ❌ Arrow functions ke saath nahi
// this constructor ke andar new object ko refer karta hai

// 1.) empty object banaega ={}            hum usme value fill karenge
// 2.) wohi  object return karega {}    pehle hume khud return karna padta tha  -> return user 
// 3.) __proto__ me value set kardega CreateCser.prototype

// __proto__ isse official ecmascript document main esa likha hai [[prototype]]  dono same hai

// constructor function    -- C -> first letter capital 

// function CreateUser(firstName, lastName, email, age, address){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.age = age;
//     this.address = address;
// }
// CreateUser.prototype.about = function(){
//     return `${this.firstName} is ${this.age} years old.`;
// };
// CreateUser.prototype.is18 = function (){
//     return this.age >= 18; 
// }
// CreateUser.prototype.sing = function (){
//     return "la la la la ";
// }


// const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
// const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");
// console.log(user1);   //-> CreateUser {firstName: 'harshit', lastName: 'vashsith', email: 'harshit@gmail.com', age: 18, address: 'my address'}
// console.log(user1.is18());  //-> true





// ==============================================================================

// hasOwnProperty() -> 


// function CreateUser(firstName, lastName, email, age, address){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.age = age;
//     this.address = address;
// }
// CreateUser.prototype.about = function(){
//     return `${this.firstName} is ${this.age} years old.`;
// };
// CreateUser.prototype.is18 = function (){
//     return this.age >= 18; 
// }
// CreateUser.prototype.sing = function (){
//     return "la la la la ";
// }


// const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
// const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");


// console.log(Object.getPrototypeOf(user1));   //-> {about: ƒ, is18: ƒ, sing: ƒ}   so ye methods use kar sakte hai

// for(let key in user1){

//     //console.log(key);  //->  firstName    lastName     email   age   address   about   is18    sing         (prototype jo function hai woh bhi agye key banke)

//     if(user1.hasOwnProperty(key)){    // user1 ki khud ki property
//         console.log(key);     //->    firstName    lastName     email   age   address        (isme protoype wale function nhi hai)
//     }

// }



// ======================================================================

// Jab tum likhte ho: let arr = [1, 2, 3, 5];

// JavaScript engine kya karta hai? (simplified model)
// Conceptually ye steps hote hain:

// 1️⃣ Ek naya Array object create hota hai
// 2️⃣ Uska [[Prototype]] → Array.prototype se link hota hai
// 3️⃣ Elements 1,2,3,5 us object me store ho jaate hain
// 4️⃣ length property set ho jaati hai

// Isliye:  arr.__proto__ === Array.prototype // true   and  Array.prototype me sab array methods hai

// Array literal ([]) internally new Array() jaisa behave karta hai,
// but engine actually usse better & safer tareeke se create karta hai.



// so  hum jo array k methods hai -> map,filter,some,concat...sab prototype se mil rhe hai ,wohijo hum function store kar rhe the and access ese -> user.prototype.somefun()
// let numbers = [1,2,3];  
// console.log(numbers);    //->   [1, 2, 3]
// console.log(numbers.prototype); //-> undefined


// // 1️⃣ Multiple values pass ki new Array(1, 2, 3); ✔️ Result: [1, 2, 3]
// // 2️⃣ Sirf ek number passkiya new Array(5);       ⚠️ Result: [ <5 empty slots> ]  (length = 5, values nahi)
// // Isliye best practice kya hai? ❌ Avoid:new Array(1,2,3)


// let numbers2 = new Array(1,2,3)   //👉 Ek naya array banati hai jisme values hoti hain: numbers2 = [1, 2, 3];
// console.log(numbers2)  //->   [1, 2, 3] 
// console.log(numbers2.prototype); //-> undefined
// console.log(Array.prototype);   //-> [at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]   ye Array k prototype me sare methods hai

// // but ye methods toh object mai hote hai ye array k andhr kyuhai bcz js me array bhi object hotehai
 
// console.log(Object.getPrototypeOf(numbers));  //-> [at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]  ye bhi prototype me kya hai bata dega 
 // so jese hum constructor se new object banate the and uske prototype me sab methods hote the example:  Object.getPrototypeOf(user1));   //-> {about: ƒ, is18: ƒ, sing: ƒ}   
 // array me wese uske methods hote hai jisse hum use kare logic lagete hai  ex:- numbers.map()

// function hello(){
//     console.log("hello");
// }

// console.log(hello.prototype)  //-> {} constructor:ƒ



// =============================================================================




// 2015 / es6 
// class keyword 
// class are fake

// class is template for creating objects 
// Class = constructor function + prototype methods (clean syntax) 👉 Matlab class koi naya concept nahi, bas syntax clean hai.
// 3️⃣ Constructor se multiple objects ban rahe the, ❓ fir class kyu use ki? 
// ✅ Reasons 
// 🔹 1. Readability & Clean code   Class easy to read hai
// class Car { start(){} stop(){} }     vs   Car.prototype.start = function(){}

// 🔹 3. Built-in features
// | Feature       | constructor           | class          |
// | ------------- | --------------------- | -------------- |
// | Constructor   | manual                | built-in       |
// | Methods       | prototype me manually | auto prototype |
// | Inheritance   | complex               | `extends`      |
// | super keyword | ❌                     | ✅              |

// 🔹 4. Inheritance easy ho jata hai

// Constructor function se kaam ho jaata tha,
// class use hoti hai because code clean, readable & maintainable hota hai




// class CreateUser{
//     constructor(firstName, lastName, email, age, address){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.email = email;
//         this.age = age;
//         this.address = address;
//     }

//     about(){
//         return `${this.firstName} is ${this.age} years old.`;
//     }
//     is18(){
//         return this.age >= 18;
//     }
//     sing(){
//         return "la la la la ";
//     }

// }


// const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
// const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
// const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

// console.log(Object.getPrototypeOf(user1));  //-> {about: ƒ, is18: ƒ, sing: ƒ}  


// =============================================================

// class practice 

// class Animal {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating`;
//     }

//     isSuperCute(){
//         return this.age <= 1;
//     }

//     isCute(){
//         return true;
//     }
// }

// class Dog extends Animal{
    
// } 

 //object ka name hai tommy and hum dog class ka contructor call kar rhe hai but dog class ka yaha koi constructor nhi hai yaha, new consructor call karta hai but constructor nhi hai but hum Animal class se extend kar rhe hai so hum uska sb access kar sakte hai so tommy me add ho jaegi ye properties ( name ,age ) and animal wala constructor use hoga and if koi method nhi mili so js jis class me extend kar rhe hai waha dekhegi

// const tommy = new Dog("tommy", 3);    
// console.log(tommy);    //-> Dog {name: 'tommy', age: 3}
// console.log(tommy.isCute());  //-> true
// console.log(tommy.eat())  //-> tommy is eating



// ========================================================================



// // super 
// class Animal {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating`;
//     }

//     isSuperCute(){
//         return this.age <= 1;
//     }

//     isCute(){
//         return true;
//     }
// }

// class Dog extends Animal{
//     constructor(name, age, speed){
//         super(name,age);
//         this.speed = speed;
//     }

//     run(){
//         return `${this.name} is running at ${this.speed}kmph`
//     }
// } 
// // object / instance 
// const tommy = new Dog("tommy", 3,45);
// console.log(tommy.run());  //-> tommy is running at 45kmph



// ======================================================




// same method in subclass
// class Animal {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating`;
//     }

//     isSuperCute(){
//         return this.age <= 1;
//     }

//     isCute(){
//         return true;
//     }
// }

// class Dog extends Animal{
//     constructor(name, age, speed){
//         super(name,age);
//         this.speed = speed;
//     }

//     eat(){
//         return `Modified Eat : ${this.name} is eating`
//     }

//     run(){
//         return `${this.name} is running at ${this.speed}kmph`
//     }
// } 
// // object / instance 
// const tommy = new Dog("tommy", 3,45);
// console.log(tommy.run());  //->tommy is running at 45kmph
// console.log(tommy.eat());  //-> Modified Eat : tommy is eating        same method ho toh uper wale class me nhi jaega yaha se hi print karega

// const animal1 = new Animal('sheru', 2);
// console.log(animal1.eat());  //-> sheru is eating


// console.log(Object.getPrototypeOf(animal1));  //-> {eat: ƒ, isSuperCute: ƒ, isCute: ƒ}





// ----------------------------------


//to find prototype   ( function pe direclty milega , Object k liye ek method likkhna padega)

// console.log(Object.getPrototypeOf(animal1));  //-> {eat: ƒ, isSuperCute: ƒ, isCute: ƒ}

// function random(){
    // console.log("hey")
// }
// console.log(random.prototype)  //-> {}   kuch add nhi kiya prototype mai

// random.prototype.fun=function(){
    // console.log("hey")
// }
// console.log(random.prototype) //-> {fun: ƒ}
// console.log(Object.getPrototypeOf(random))   //-> ƒ () { [native code] }


// let arr = [1,2,3,4]
// console.log(arr.prototype) //-> undefined
// console.log(Array.prototype) //-> [at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]    sare methods hai



// ============================================================




// 👉 Getter: Object ki value read / get karne ka method     .. but can get as a object property not as function 
// 👉 Setter: Object ki value change / set karne ka method

// getter and setters 
// class Person{
//     constructor(firstName, lastName, age){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.age = age;
//     }
//     myNameDemo(){    //demo  normal method
//         return `${this.firstName} ${this.lastName}`
//     }
//     get fullName(){
//         return `${this.firstName} ${this.lastName}`
//     }
//     changeDemo(firstName,lastName){   //demo change karne ka normal method
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//     set fullName(fullName){
//         const [firstName, lastName] = fullName.split(" ");   //fullName ko split kiya fhir use array destructure
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }


// const person1 = new Person("harshit", "sharma", 5);
// console.log(person1.myNameDemo());  //-> harshit sharma    ( method ko call karte the pehle esa )

// console.log(person1.fullName);    //-> harshit sharma     (get k wajah se isse as a object property k tarah access kar pa rhe hai bina call kiye )
// console.log(person1.fullName());    //   TypeError: person1.fullName is not a function   ye function nhi hai property ban gya hai



// person1.changeDemo("balram","swain");   // (if value change karmi ho toh)
// console.log(person1)        //-> Person {firstName: 'balram', lastName: 'swain', age: 5}    

// person1.fullName = "mohit vashistha";      //  (set k wajah se value bhi change kar sakte hai bcz as a object property access hua so uski tarah change bhi hosakta hai)
// console.log(person1);           //-> Person {firstName: 'mohit', lastName: 'vashistha', age: 5}  Lagta hai jaise simple property assign kar rahe ho → cleaner & natural 👉 User ko ye nahi pata hota andar kya logic hai

// Normal method se value change ho sakti hai,Setter isliye use hota hai kyunki wo property jaisa behave karta hai + rules enforce karta hai.
// 2️⃣ Abstraction (andar ka logic chhupa rehta hai) 3️⃣ Control & Validation Setter me tum rule laga sakte ho: Normal method me log directly galat data bhej denge.



// ==========================================================




// static methods and properties
// 👉 A static method belongs to the class itself, not to its objects, and can be called directly using the class name without creating an instance.

// class Person{
//     constructor(firstName, lastName, age){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.age = age;
//     }
//     static classInfo(){
//         return 'this is person class';
//     }
//     static desc = "static property";
   
//     eat(){
//         return `${this.firstName} is eating`;
//     }

   
// }

// const person1 = new Person("harshit", "sharma", 8);
// console.log(person1.eat());  //-> harshit is eating

// const info = Person.classInfo();
// console.log(info);  //->this is person class

// console.log(Person.desc)  //-> static property

// console.log(person1.desc);  //-> undefined    bcz static method belongd directly to class , object ko nhi so bina instance create kiya directly object se call hota hai
 



// class Demo{
//     constructor(name,age){
//         this.name = name
//         this.age = age
//     }
   
//     static demo3(){
//         return `hey ${this.name}`
//     }
//     static demo4(){
//         return `hey without this`
//     }


// }

// const demo1 = new Demo("balram","swain")

// console.log(Demo.demo3())  //-> hey Demo     ( Static method me this object ko nahi, class ko refer karta hai.)
// console.log(Demo.demo4())  //-> hey without this