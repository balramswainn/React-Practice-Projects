//Functions Declaration


// function sumThreeNumbers(number1, number2, number3){
//     return number1 + number2 + number3;
// }

// console.log(sumThreeNumbers(1,2))   //=> NAN(not a number) bcz number3 -> undefined hogya and 1+2+undefined = nan
// console.log(sumThreeNumbers(1,1,1,6)) //=> 3 .... 6 extra hai na waha koi uske liye parameter hi nhi   
 


// function 
// input : array, target (number)
// output: index of target if target present in array 

// function findTarget(array, target){
//     for(let i = 0; i<array.length; i++){
//         if(array[i]===target){
//             return i;
//         }
//     }
//     return -1;
// }
// const myArray = [1,3,8,90]
// const ans = findTarget(myArray, 4);
// console.log(ans);     //-> -1 bcz 4 array me nhi hai


// or ->

// function findTarget(array,target){
//    return array.findIndex((ele)=>{
//     return ele===target;
//    })
// }



// ============================================================


// Functions Expression

// const sumThreeNumbers = function(number1, number2, number3){
//     return number1 + number2 + number3;
// }
// const ans = sumThreeNumbers(2,3,4);
// console.log(ans); //-> 9

// or

// const ans = sumThreeNumbers(2,3); //ek arguement nhi diya
// console.log(ans); //-> NaN    -> not a number

// 1. extra argument dunga toh prblm nhi hai
// 2. argument nhi diya ho but parameter diya ho toh prblm nhi if use nhi ho rha ho function me
// 3. if argument nahi diya ho and parameter diya ho and usse use kar rhe ho toh error aaega NAN

//=============================================================

// Arrow Functions 

// const sumThreeNumbers = (number1, number2, number3) => {
//     return number1 + number2 + number3;
// }

// const ans = sumThreeNumbers(2,3,4);
// console.log(ans); //-> 9



//=====================================================



// hoisting  (only works on function declaration and var declarations)

// hello();   //-> hello world

// function hello(){
//         console.log("hello world");
//     }

// console.log(hello1);   //-> undefined  aya bcz of var declaration  || let , const rehta toh reference error
// var hello1 = "hello world";
// console.log(hello1); //-> hello world

// All declarations are hoisted, but only var is initialized with undefined and function declarations are fully hoisted. var → undefined, function declaration → full function, let/const → TDZ (uninitialized)

// memory phase me hello1 = undefined hogya tha toh execution phase me hello1 pehle hi call hogya and uski value baadme assign hui isliye undefined baadme call hota toh -> "hello world"


 

//=====================================================

// functions inside function 

// function app(){
//     const myFunc = () =>{
//         console.log("hello from myFunc")
//     }
    
//     const addTwo = (num1, num2) =>{
//         return num1 + num2;
//     }

//     const mul = (num1, num2) => num1* num2;

//     console.log("inside app");
//     myFunc();
//     console.log(addTwo(2,3));
//     console.log(mul(2,3));
// }
// app();   //-> inside app     hello from myFunc     5      6



//=====================================================


// lexical scope  
// Lexical scope means variables are accessible based on where the code is written, not where it is executed.
// Lexical scope is the rule that a function can access variables from its parent scope.
 
// A lexical environment is the internal structure that stores variables and has a reference to its outer (parent) lexical environment, which enables scope chaining.

// const myVar = "value1";



// function myApp(){
    

//     function myFunc(){
//         const myVar = "value59";
//         const myFunc2 = () =>{
//             console.log("inside myFunc", myVar);  // lexical scope :- has reference to its outer lexical environment
//         }
//         myFunc2();
//     }


//     console.log(myVar);  value1  // block scope hai const
//     myFunc();
//     console.log(myVar);  //-> value 1
// }

// myApp();

//-> value1
//-> inside myFunc value59
//-> value 1



// =======================================================




// block scope vs function scope 


// let and const are block scope
// var is function scope 

// {
//     let name = "jerry";   //block scope
// }
// console.log(name); //-> not defined bcz let and const is black scope ..only accessible inside a block



// if(true){
//     var firstName = "harshit";
//     console.log(firstName);
// }
// console.log(firstName);  //-> harshit     accessible bcz var is function scope



// function myApp(){
//     if(true){
//         var firstName = "harshit";
//         console.log(firstName);  //-> harshit
//     }

//     if(true){
//         console.log(firstName);   //-> harshit
//     }
//     console.log(firstName);   //-> harshit
// }
// console.log(firstName)  //-> firstName is not defined bcz var is function scope
// myApp();


// var first="first"
// function ran(){
//     var sec="second";
//     if(true){
//         console.log(first)   //->first 
//         console.log(sec)     //-> second
//     }
// }
// console.log(sec)  //-> not defined

// ran();

// =====================================================================


// default parameters 

// function addTwo(a,b){       // Es6 k pehle default parameters ese likhte the
//     if(typeof b ==="undefined"){
//         b = 2;
//     }
//     return a+b;
// }
// console.log(addTwo(2))   //-> 4



// function addTwo(a,b=0,c=2){
//     return a+b+c;   //4+8+2      c=2 default tha na and b=8 bcz default tab kam karega jab value na di ho
// }

// const ans = addTwo(4, 8);
// console.log(ans);  //->14


// =====================================================================


// rest parameters     used to collect all the remaining arguements into an array 

// function myFunc(a,b,...c){
//     console.log(`a is ${a}`);   //-> a is 3
//     console.log(`b is ${b}`);   //-> b is 4
//     console.log(`c is`, c);     //-> [5, 6, 7, 8, 9]
// }

// myFunc(3,4,5,6,7,8,9);



// function addAll(...numbers){
//     let total = 0;
//     for(let number of numbers){
//         total = total + number;
//     }
//     return total;
// }

// const ans = addAll(4,5,4,2,10);
// console.log(ans);   //->25



// function addAll(...numbers){       //👉 Saare arguments ko ek array me collect karta hai.
//     let total = 0;
//   console.log(numbers)  //-> [[4,5,4,2,10]] Matlab nested array
//     for(let number of numbers){
//         total = total + number;      //total = 0 + [4,5,4,2,10]     Array string me convert ho jata hai
//     }
//     return total;
// }

// const ans = addAll([4,5,4,2,10]);
// console.log(ans);   //-> '04,5,4,2,10'


// const arr = [4,5,4,2,10];
// const ans = addAll(...arr);        // addAll(4,5,4,2,10)
// console.log(ans);
//-> [4, 5, 4, 2, 10]   25

// | Operator     | Purpose                           |
// | ------------ | --------------------------------- |
// | Rest `...`   | Multiple values collect karta hai |
// | Spread `...` | Array ko values me todta hai      |



// ==========================================================================




// array destructuring

// let arr= [1,23,34,4]

// const [first,sec]= arr;
// console.log(first,sec) //-> 1 23


// param destructuring 

// object 
// react 

// const person = {
//     firstName: "harshit",
//     gender: "male",
//     age: 50
// }

// function printDetails(obj){    //name kuch bhi ho sakta hai 
//     console.log(obj.firstName);   //-> harshit
//     console.log(obj.gender);      //-> male
// }


// function printDetails({firstName, gender, age}){   //object destructure kiya fhir directly name dalkle use kar saktehai
//     console.log(firstName);    //-> harshit
//     console.log(gender);       //-> male
//     console.log(age);          //-> 50
// }

// printDetails(person);




// ==============================================================


// callback functions 

// function myFunc2(name){
//     console.log("inside my func 2")
//     console.log(`your name is ${name}`);
// }

// function myFunc(callback){
//     console.log("hello there I am a func and I can..")
//     callback("harshit");
// }


// myFunc(myFunc2);

//-> hello there I am a func and I can..                 
//-> inside my func 2
//-> your name is harshit



// ==============================================================



// function returning function 

// function myFunc(){
//     function hello(){
//         return "hello world"
//     }
//     return hello;
// }

// const ans = myFunc();
// console.log(ans());


// Higher-Order Functions (HOF)
// 👉 Jo function ek function ko accept kare ya return kare, usko HOF bolte hain.
// Map, filter, reduce → ye sab HOF hain.


// ======================================

// hoisting 

// 1. function are fully hoisted
// demo();

// function demo(){
//   console.log("hey")
// }

//-> hey



// 2. 
// demo();

// const demo=()=>{
//   console.log("hey")
// }
//-> Uncaught ReferenceError: Cannot access 'demo' before initialization





// 3. 
// function one(){
//   console.log("one")
//   two(); 
// }

// const two=()=>{
//   console.log("two")
// }

// one();

//-> one 
//-> two
// JS pura code memory me load karta hai, function one() fully hoist ho jata hai, const two hoist hota hai but TDZ me rehta hai

//one() call ho raha hai after: const two = () => {}
  
// Matlab jab two() call ho raha hai:
// 👉 two already initialize ho chuka hai mtlb Variable ko value assign kar dena.
// 👉 TDZ khatam ho chuka hai
// Isliye error nahi aaya.




// 4.
// function one(){
//   console.log("one")
//   two();
// }
// one();

// const two=()=>{
//   console.log("two")
// }

//-> one
//-> Uncaught ReferenceError: Cannot access 'two' before initialization

// 👉 yaha two initialize nhi hua tha






// 5.
// console.log(one) //-> undefined
// one(); //-> Uncaught TypeError: one is not a function
// var one = () =>{
//   console.log("one")
// }


// console.log(two) //-> undefined
// var two = "hey"

// so we use arrow function in react bcz 
// 1. arrow this ka problem solve karta hai Arrow function ka this lexical hota hai. Matlab — wo apna khud ka this nahi banata, balki parent scope ka this use karta hai.
// 2. Consistency Modern JS (ES6+) ke baad arrow common ho gaya. Code clean lagta hai.
// 3. Short Syntax Readable + compact.
// 4. React Pattern , React components mostly: arrow, so ecosystem me arrow default ban gaya.






// 6.
// let obj={
// sample: "hey",
// demo:()=>{
//   console.log(this.sample)
// }

// }
// obj.demo() //-> undefined


// let obj={
// sample: "hey",
// demo:function(){
//   console.log(this.sample)
// }

// }
// obj.demo()  //-> hey







// 7.
// const obj = {
//   name: "Balram",
//   normal: function() {
//     setTimeout(() => {
//       console.log(this.name);
//     }, 1000);
//   }
// };

// obj.normal(); // Balram

// 1️⃣ obj.normal() call hua
// Yaha normal ek normal function hai.

// Normal function jab object ke through call hota hai: obj.normal() -> this = obj
// So inside normal, this.name = "Balram"


// obj.normal()
//    ↓
// normal() me this = obj
//    ↓
// setTimeout arrow function
//    ↓
// arrow ka this = parent ka this = obj 
// Arrow functions do not have their own this. They inherit this from their surrounding (lexical) scope.
//    ↓
// console.log(obj.name)
//    ↓
// Balram


// Agar yaha normal function hota to?
// setTimeout(function() {
//   console.log(this.name); //-> blank 
//   console.log(this);
// }, 1000);

// this = window (browser me)




// With "use strict"
// "use strict";

// function test() {
//   console.log(this);
// }
// test(); //-> undefined   Yaha strict mode accidental global access ko rokta hai.
// In strict mode, when a regular function is called without an object, this becomes undefined instead of the global object.


// "use strict"
// const obj = {
//   name: "Balram",

//   normalFunc() {
//     function inner() {
//       console.log(this.name);
//       console.log(this)  // undefined
//     }

//     inner();
//   },
// };

// obj.normalFunc(); //->undefined  Kyuki inner() ek normal function hai, uska apna this hota hai.

// without use strict :- blank and window{}





// arrow fun ...with or without use strict will behave same 
// const obj = {
//   name: "Balram",

//   normalFunc() {
//     const arrow = () => {
//       console.log(this.name); //->Balram
//       console.log(this)  //->{name: 'Balram', normalFunc: ƒ}
//     };

//     arrow();
//   },
// };

// obj.normalFunc();



// ===================================================


// const random=()=>{
//   return console.log("random")
// }
// random() //-> random



// const random1=()=> console.log("random1")
// random1() //-> random1



// const random2=()=>(
//   console.log("random2")
// )
// random2() //-> random2



// const random3=()=>{
//   return (
//     console.log("random3")
//   )
// }
// random3() //-> random3



// const random=()=>(
//   return "random"
// )
// console.log(random())  //->Uncaught SyntaxError: Unexpected token 'return' 



// REACT 
// onClick={() => {
//   setSelectedUser(user);
//   setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }));
// }}

// Yaha tum: Koi value return nahi kar rahe, Sirf side effects kar rahe ho (state update) , onClick ko koi return value chahiye hi nahi. Isliye return ki zarurat nahi hai.React event handlers: Return value ignore kar dete hain. Unko bas function run karna hota hai.




// ------------------------------

//wrong 
// const addTwoPromises =async function(p1,p2){
//   let value=await Promise.all(p1,p2)
//  return [...value].reduce((a, b) => a + b, 0);
// }

// Promise.all() hamesha ek iterable expect karta hai, aur practically hum mostly array pass karte hain.
//  Promise.all(iterable) iterable ho sakta hai:
// Array ✅ // Set ✅  // String ✅ (technically iterable hai)  // Map ✅  // Custom iterable ✅
// Common Usage:- 
// Promise.all([
//   Promise.resolve(1),
//   Promise.resolve(2)
// ]);

// Promise.all() expects a single iterable as its argument. Most commonly, we pass an array of promises. It waits for all promises to resolve and returns an array of their resolved values.


// Lekin promises ke case me normally array use hota hai.

// const addTwoPromises = async function(promise1, promise2) {
//   return Promise.all([promise1,promise2])
//     .then(value => value.reduce((acc,val) => acc+val,0))
// };

// console.log(addTwoPromises(2,2))  //-> 
// Promise {<pending>}
// [[Prototype]]: Promise
// [[PromiseState]] : "fulfilled"
// [[PromiseResult]] :  4

// async function automatically Promise return karti hai already ek Promise return ho raha hai toh await ki zarurat nahi
 

// const addTwoPromises = async function(p1, p2) {
//   const values = await Promise.all([p1, p2]);
//   return values.reduce((a, b) => a + b, 0);
// };

// | Situation                         | Use      |
// | --------------------------------- | -------- |
// | Direct promise return kar rahe ho | `return` |
// | Value nikalni hai promise se      | `await`  |



// const [value1, value2] = await Promise.all([promise1, promise2]);
// return value1 + value2;

// Promise.all dono promises ko parallel run karta hai
// Jab dono resolve → [value1, value2]
// await us array ko nikal leta hai
// destructuring se values mil gayi
// sum return

// const values = Promise.all(...) // ❌ values = Promise (not array)   await nhi hai 
// const values = await Promise.all(...) // ✅ values = [2,5]


// -----------------

// async function sleep(millis) {
//     await new Promise(resolve => setTimeout(resolve, millis));
// }
// o/p :- Promise<undefined>

// function sleep(millis) {
//   return new Promise(resolve => setTimeout(resolve, millis));
// }
// o/p :- Promise<void>  // same behaviour


// 1️⃣ Function call hota hai  -> sleep(2000)
// 👉 Immediately return hota hai: Promise { <pending> }
// ✔️ Matlab function rukta nahi bahar se
// ✔️ Wo turant Promise return kar deta hai

// 2️⃣ Function ke andar kya ho raha hai
// await new Promise(...)
// 👉 Yaha: function ka andar wala execution pause hota hai
// pura function nahi rukta, sirf uska execution suspend hota hai

// 3️⃣ Jab timer complete  -> setTimeout(resolve, millis)
// 👉 resolve call hota hai
// 👉 await complete hota hai
// 👉 function aage badhta hai


// 4️⃣ Function ke end pe kya hota hai?
// 👉 Tumne return nahi likha
// 👉 Matlab internally: return undefined;
// 👉 Async function hone ki wajah se:    return Promise.resolve(undefined);

// 🔥 Final Reality: sleep(2000) 👉 return karta hai: Promise { <pending> } 👉 2 sec baad: Promise { resolved: undefined }



// async function test() {
//   return 5;
// }
// o/p :- test()  // 👉 Promise { 5 }        async function jo bhi return kare — wo automatically Promise ban jata hai
// return 5; JavaScript internally isko convert karta hai: 
// return Promise.resolve(5);

// 🔹 Value kaise nikale?
// 1.  test().then(val => console.log(val)); // 5

// 2. 
// const val = await test();
// console.log(val); // error aaega await async function k andhr hi chalega 
 

//->  

// async function test() {
//   return 5;
// }

// async function main() {
//   const val = await test();
//   console.log(val);
// }

// main(); //-> 5





// async function demo() {
//   return Promise.resolve(10);
// }
// o/p:- Promise { 10 }       👉 Double promise nahi banega — JS smart hai 😄


// 🔥 Kab await zaruri hota hai? 👉 Jab tumhe value use karni ho:

// async function sum() {
//   const a = await Promise.resolve(2);
//   const b = await Promise.resolve(3);
//   return a + b;
// }



// async function test() {
//   console.log("A");
//   await Promise.resolve();       //👉 await function ko block nahi karta, sirf pause karke baaki code ko aage chalne deta hai
//   console.log("B");
// }

// test();
// console.log("C");


// o/p :- A C B


// 1️⃣ test() call hua -> console.log("A");
// 2️⃣ await Promise.resolve()

// 👉 Yaha important game start hota hai:

// Promise.resolve() already resolved hai
// BUT await usko microtask queue me daal deta hai
// Function ka baaki part pause ho jata hai console.log("B"); ➡️ baad me chalega

// 3️⃣ Next line execute hogi 
// 👉 C print ho gaya

// 4️⃣ Microtask queue execute hoti hai
// 👉 Ab JS wapas aata hai paused function pe
// console.log("B");
// 👉 B print ho gaya


// if await nhi hota toh Promise.resolve() → ignore ho gaya (koi wait nahi)
// o/p ABC







