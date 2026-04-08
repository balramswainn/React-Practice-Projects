// synchronous programming vs asynchronous programming

// synchronous programming
// synchronous programming single threaded



// console.log("script start");

// for (let i = 1; i < 10000; i++) {
//   console.log("inside for loop");
// }

// console.log("script end");

//-> script start
//-> 9999 inside for loop
//-> script end



// Asynchronous programming
// setTimeout → Executes a function once after a specified delay.
// setTimeout 👉 setTimeout expects a function.

// console.log("script start");                      

// const id = setTimeout(() => {    //👉 Returns a timeout ID (here 1), Browser har setTimeout ko unique number (ID) deta hai, Ye ID browser ko batata hai kaunsa timeout hai
//   console.log("inside setTimeout");      //ye print nhi hua bcz cancel hogya
// }, 1000);                                

// for (let i = 1; i < 100; i++) {
//   console.log("....");
// }
// console.log("settimeout id is ", id);
// console.log("clearing time out"); 
// clearTimeout(id);                              //👉 Isi ID ki madad se browser us specific timeout ko cancel karta hai
// console.log("Script end");


// o/p :- 

// script start
// 99....
// settimeout id is  1        //👉 1 aya bcz setTimeout returns an ID so the scheduled task can be uniquely identified and cleared if needed.
// clearing time out
// Script end



// so normally koi bhi setTimeout jab call hoga js bolega ye browser ki functionality hai toh usse dedeta hai and kehta hai count kar 1000ms jab hojaye muje uska callback function de dena then after that ye callback function -> callback queue me chala jaega and event loop dekhega ki jab callstack khali hoga tab ye function bheju
// even if 0ms delay hota still ese hi work karta   




// ❓ Why "inside setTimeout" did NOT print?
// Because clearTimeout(id) cancels the timeout before 1 second is completed, so the callback never goes to the call stack.





// let a="hey";
// setTimeout(a,1000)
// console.log("script start");  //ReferenceError: hey is not defined  bcz 👉 setTimeout expects a function, but you passed a string variable.




// Technically, older browsers allowed strings like:
// setTimeout("console.log('hey')", 1000);     //But this is not recommended (it behaves like eval).


// =========================================================================





// setInterval → Executes a function repeatedly at specified time intervals.
// console.log("script start")
// setInterval(() => {
//   // console.log(total);
//   console.log(Math.random());
// }, 500);
// console.log("script end");


// so ye bhi same hi work karega browser wait karega jese hi 500ms hoga broswer isse callback queue me bhej dega and jese hi empty hoga call stack ye chalega and this is setIterval so har 500ms fhir ye function run hoga ese hi itne time intervals par 
// and now if time 0ms pe set karde so fhir bhi ye print hoga bcz tab woh jese hi callstack me script likh k free hoga means pura code chal jaega ye print karega 

// GEC → sirf register karta hai
// code execution phase main -> js engine bhej deta hai -> web api k pass -> setInterval KO 
// web api ->Jab 500ms complete ho jate hain,Timer complete → Web API callback ko Callback Queue (Task Queue) mein daal deta hai
// Event loop continuously check karta hai:Call Stack empty hai ya nahi -> Call Stack empty ✅ → toh queue se callback uthake stack mein daal deta hai → execute


// and if callback function me complex functionality ho toh jo time diya hai usse jyada bhi lag sakta hai , so yaha pe diya 500ms but jyada time le rha hai
// ex:-

// console.log("script start")
// setInterval(()=>{
//   let total=0;
//   for(let i=0; i<1000000000;i++){
//     total += i
//   }
//   console.log(total)                 //thoda delay ho rha hai 
//   console.log(Math.random())
// },500)
// console.log("script end");     



// 👉 Code execution phase mein JS engine(JavaScript Engine (like V8) + Browser Runtime milke ) hi decide karta hai ki kaun sa function Web API ko bhejna hai, aur phir usse browser ko delegate kar deta hai.
// Jab tum JavaScript Execution Context ke code execution phase mein ho, tab kuch specific functions hote hain jo Web APIs ko diye jaate hain:
// 👉 Common examples:
// setTimeout
// setInterval
// fetch ✔️ fetch Promise return karta hai btu 👉 Fetch API khud ek Web API hai
// XMLHttpRequest
// addEventListener (DOM events)
// geolocation

// 👉 Ye sab browser-provided APIs hain (JS engine ka part nahi).

// Step-by-step flow:
// Code execution phase chal raha hai , JS engine line dekhta hai: 

// setInterval(callback, 500)
// JS engine ko pata hai:
// 👉 setInterval ek Web API function hai
// 👉 JS engine kya karta hai?
// Callback function + timer info
// Browser ke Web API environment ko handover kar deta hai



// 🔹 1. fetch Web API ke paas kyun jaata hai? 
// ✔️ fetch Promise return karta hai but 👉 Fetch API khud ek Web API hai 
// JS engine dekhta hai → ye Web API hai -> Browser ko bolta hai → "bhai network request tu kar" -> Browser request bhejta hai (background mein)

// 🔹 2. Promise kaha rehta hai? 👉 Promise JavaScript environment (memory) mein hi rehta hai ❌ Web API mein nahi 
// Web API → kaam karta hai (network, timer etc.) Promise → JS side pe state maintain karta hai

// 🔹 3. Jab response aata hai tab kya hota hai? Jab request complete hoti hai:
// Browser (Web API) response le aata hai -> Promise ko resolve karta hai -> .then() callback ko Microtask Queue mein daal diya jata hai

// | Type                                 | Queue           |
// | ------------------------------------ | --------------- |
// | setTimeout / setInterval             | Callback Queue  |
// | Promise / then / catch / async-await | Microtask Queue |


// 🔥 🔹 1. Microtask Queue vs Callback Queue (Table)
// | Feature          | Microtask Queue 🚀               | Callback Queue (Task Queue) 🕒 |
// | ---------------- | -------------------------------- | ------------------------------ |
// | Priority         | 🔥 High (pehle execute hota hai) | Low                            |
// | Kab run hota hai | Call stack empty hote hi         | Microtasks ke baad             |
// | Use hota hai     | Promises / fast async            | Timers / events                |

 
// 🔹 2. Kaun-kaun Microtask Queue mein jaata hai?
// | चीज                 | जाता hai? | Notes                |
// | ------------------- | --------- | -------------------- |
// | `Promise.then()`    | ✅         | most common          |
// | `Promise.catch()`   | ✅         |                      |
// | `Promise.finally()` | ✅         |                      |
// | `async/await`       | ✅         | internally promise   |
// | `queueMicrotask()`  | ✅         | direct microtask API |
// | `MutationObserver`  | ✅         | DOM change observer  |


// 🔹 3. Kaun-kaun Callback Queue (Task Queue) mein jaata hai?
// | चीज                   | जाता hai? | Notes             |
// | --------------------- | --------- | ----------------- |
// | `setTimeout`          | ✅         | timer             |
// | `setInterval`         | ✅         | repeat timer      |
// | `setImmediate` (Node) | ✅         | Node.js           |
// | `addEventListener`    | ✅         | click, scroll etc |
// | `XMLHttpRequest`      | ✅         | old AJAX          |
// | UI events             | ✅         | user interaction  |


// 👉 Sirf fetch aisa case hai:

// Web API bhi use karta hai
// aur result Microtask Queue me deta hai
// 👉 fetch ➡️ Web API → Promise resolve → Microtask Queue
// 👉 setTimeout ➡️ Web API → Callback Queue
// 👉 Promise ➡️ Direct → Microtask Queue


// 🔥 🔹 6. Golden Rule (Yaad rakhna)

// 👉 Rule #1:
// Sab microtasks pehle execute honge

// 👉 Rule #2:
// Phir ek callback queue task execute hoga

// Microtasks = “jab tak khatam na ho tab tak chalte rahenge”
// Callback tasks = “line mein ek-ek karke chance milega”


// 🔹 1. Sabse pehle ek important term: “Tick” / “Cycle”

// Event loop ek loop hai jo baar-baar ye steps karta hai:

// 👉 Ek cycle (tick) ka structure:
// Call Stack execute karo
// Microtask Queue ko FULL empty karo 🔥
// Callback Queue se sirf 1 task uthao
// Phir dubara loop start

// ex:-
// 1.
// Promise.resolve().then(() => console.log("A"));
// Promise.resolve().then(() => console.log("B"));

// setTimeout(() => console.log("C"), 0);

// o/p :-  a b c


// 2.
// 👉 Microtasks ke andar aur microtasks add ho sakte hain 😈

// Promise.resolve().then(() => {
//   console.log("A");

//   Promise.resolve().then(() => {
//     console.log("B");
//   });
// });

// setTimeout(() => console.log("C"), 0);

// Step-by-step:
// Microtask queue: A
// A execute hua: "A" print
// NEW microtask (B) add ho gaya
// Event loop kya karega? 👉 Rule follow karega → queue empty karo 
// B bhi run hoga

// o/p : - A B C


// 3. 
// setTimeout(() => console.log("T1"), 0);
// setTimeout(() => console.log("T2"), 0);

// Promise.resolve().then(() => console.log("P1"));

// o/p :- P1  T1 T2
// event loop ->microtask empty kiya -> callbacke se ek utahaya fhir micro check kiya empty hai toh callback se fhir utahaya

// 4. 
// Promise.resolve().then(() => console.log("P1"));
// setTimeout(() => console.log("T1"), 0);
// setTimeout(() => console.log("T2"), 0);

// Promise.resolve().then(() => console.log("P2"));
// o/p :- P1 P2   T1 T2


// 5.
// Promise.resolve().then(() => console.log("P1"));
// setTimeout(() => console.log("T1"), 0);
// console.log("only one")
// setTimeout(() => console.log("T2"), 0);

// Promise.resolve().then(() => console.log("P2"));
// O/P :- only one  P1 P2  T1 T2


// ✔️ Promises (microtasks) = fast + predictable
// chaining break na ho
// .then().then() immediately run ho

// ✔️ Timers (callback queue) = lower priority
// UI block na ho
// fairness maintain ho





// 🔥 🔹 6. Real World Impact

// 👉 Agar microtasks continuously add hote rahe:

// function loop() {
//   Promise.resolve().then(loop);
// }
// loop();

// ❗ Result:
// Callback queue kabhi run hi nahi karega
// UI freeze ho sakta hai

// 👉 Isko kehte hain:
// Microtask Starvation





// ===============================================

// for this ek naya folder banaya gaya hai setInterval naam se
// intervalidId = id jaega jo clearInterval me kaam aaega  


// const body = document.body;
// const button = document.querySelector("button");
// const intervalId = setInterval(() => {
//   const red = Math.floor(Math.random() * 256);
//   const green = Math.floor(Math.random() * 256);
//   const blue = Math.floor(Math.random() * 256);
//   const rgb = `rgb(${red},${green}, ${blue})`;
//   body.style.background = rgb;
// }, 1000);

// button.addEventListener("click", () => {
//   clearInterval(intervalId);
//   button.textContent = body.style.background;
// });

// console.log(intervalId);






// =========================================================




// callback function is a function passed as an argument to another function, which is executed later.



// understand callback

// function myFunc(callback) {
//   console.log("Function is doing task 1 ");
//   callback();
// }



// function myFunc2() {
//   console.log("Function is doing task 2 ");
// }
// myFunc(myFunc2)                 //Function is doing task 1                  Function is doing task 2 

// // or

// myFunc(() => {           //ese direclty pura function bhi dal sakte hai bcz dono same hi hai uper wala bhi pura function hi tha
//   console.log("function is doing task 2");          //Function is doing task 1                  Function is doing task 2 
// });







// function getTwoNumbersAndAdd(number1, number2, onSuccess, onFailure) {    
//   if (typeof number1 === "number" && typeof number2 === "number") {
//     onSuccess(number1, number2);
//   } else {
//     onFailure();
//   }
// }

// function addTwoNumbers(num1, num2) {
//   console.log(num1 + num2);
// }

// function onFail(){
//     console.log("Wrong data type");
//     console.log("please pass numbers only")
// }
// getTwoNumbersAndAdd(4, 4,addTwoNumbers, onFail);      //function ko as argurements pass kardiya







// ===============================================================

// for this callBack folder banaya hai jisme html hai


// callbacks , callback hell, pyramid of doom


// asynchronous programming
// const heading1 = document.querySelector(".heading1");
// const heading2 = document.querySelector(".heading2");
// const heading3 = document.querySelector(".heading3");
// const heading4 = document.querySelector(".heading4");
// const heading5 = document.querySelector(".heading5");
// const heading6 = document.querySelector(".heading6");
// const heading7 = document.querySelector(".heading7");
// const heading8 = document.querySelector(".heading8");
// const heading9 = document.querySelector(".heading9");
// const heading10 = document.querySelector(".heading10");


//so hum setTimeout alag alag likh sakte the and wese hi kaam karta but usme prblm thi time ka issue kab konsa execute karna hai isme calculation karni padti jo ki sahi nhi hai and complex app me bhi prblm create kar sakti thi so setTimeout k andhr setTimeout likha taki woh execute hone k baad uske andhr wala ho but it will create callback hell

// Text       Delay   Color

// one        1s      Violet
// two        2s      purple
// three      2s      red
// four       1s      Pink
// five       2s      green
// six        3s      blue
// seven      1s      brown





// callback hell  

// setTimeout(()=>{
//   heading1.textContent = "one";
//   heading1.style.color = "violet";
//   setTimeout(()=>{
//     heading2.textContent = "two";
//     heading2.style.color = "purple";
//     setTimeout(()=>{
//       heading3.textContent = "three";
//       heading3.style.color = "red";
//       setTimeout(()=>{
//         heading4.textContent = "four";
//         heading4.style.color = "pink";
//         setTimeout(()=>{
//           heading5.textContent = "five";
//           heading5.style.color = "green";
//         },2000)
        
//       },1000)
      
//     },2000)
    
//   },2000)
  
// },1000)


// //or


// function changeText(element, text, color, time, onSuccessCallback, onFailureCallback) {
//   setTimeout(()=>{
//     if(element){
//       element.textContent = text;
//       element.style.color = color;
//       if(onSuccessCallback){
//         onSuccessCallback();
//       }
//     }else{
//       if(onFailureCallback){
//         onFailureCallback();
//       }
//     }
//   },time)
// }



// // pyramid of doom
// changeText(heading1, "one","violet",1000,()=>{
//   changeText(heading2, "two","purple",2000,()=>{
//     changeText(heading3, "three","red",1000,()=>{
//       changeText(heading4, "four","pink",1000,()=>{
//         changeText(heading5, "five","green",2000,()=>{
//           changeText(heading6, "six","blue",1000,()=>{
//             changeText(heading7, "seven","brown",1000,()=>{
//               changeText(heading8, "eight","cyan",1000,()=>{
//                 changeText(heading9, "nine","#cda562",1000,()=>{
//                   changeText(heading10, "ten","dca652",1000,()=>{
                    
//                   },()=>{console.log("Heading10 does not exist")})
//                 },()=>{console.log("Heading9 does not exist")})
//               },()=>{console.log("Heading8 does not exist")})
//             },()=>{console.log("Heading7 does not exist")})
//           },()=>{console.log("Heading6 does not exist")})
//         },()=>{console.log("Heading5 does not exist")})
//       },()=>{console.log("Heading4 does not exist")})
//     },()=>{console.log("Heading3 does not exist")})
//   },()=>{console.log("Heading2 does not exist")})
// },()=>{console.log("Heading1 does not exist")})