// A Promise is an object that represents the eventual completion or failure of an asynchronous operation.
// A promise represents a value that may be available now, later, or never.
// A promise represents a future value of an async operation.

// we use promise bcz : JavaScript single-threaded hai.Ek time pe ek hi kaam karega. API se data fetch, Database call :- Ye sab time lete hain.Agar JS wait karega 👉 pura app freeze ho jayega. Promise bolta hai: “Abhi value ready nahi hai Future me mil jayegi…Tab tak baaki ka code chalta rahe.”

// We use promise:
// ❌ Error avoid karne ke liye nahi
// ✅ Async operation complete hone tak wait karne ke liye 






// for example need to create fried rice so 

// promise = fired rice (future value)

// status : pending
// value : undefined

// After promise completed
// status : fullfilled
// value : fried rice

// After promise 
// status: rejected
// value : " error message what we want"








// Promise
// console.log("script start");
// const bucket = ['coffee', 'chips','vegetables','salt','rice'];

// // promise ko kisi variable me store kar sakta hoon ya function se return 

// const friedRicePromise = new Promise((resolve,reject)=>{
//     if(bucket.includes("vegetables")&& bucket.includes("salt") && bucket.includes("rice")){
//         resolve({value:"friedrice"});   // resolve is method
//     }else{
//         reject("could not do it");
//     }
// })

// // so promise create kiya humne 

// // how to get the promise 

// friedRicePromise.then(             //then -> method  ye as a input ek method lega
//     // jab promise resolve hoga 
//     (myfriedRice)=>{
//     console.log("lets eat ", myfriedRice);
//     }
//     ).catch(
//     (error)=>{
//         console.log(error)
//     })



// setTimeout(()=>{
//     console.log("hello from settimeout")
// },0)  

// for(let i = 0; i <=100; i++){
//     console.log(Math.random(), i);
// }

// console.log("script end!!!!")


//->  script start
// 0.8878286643187111 0   to   0.62652848178786 100
// script end!!!!
// lets eat  {value: 'friedrice'}
// hello from settimeout


//  🔹 Browser ke Components:
// JavaScript Engine (V8 etc.)
// Web APIs (DOM, setTimeout, fetch, localStorage…)
// Event Loop
// Rendering Engine (HTML/CSS render karta hai)

// bcz promises Microtask queue me jata hai jo ki high priority hai isliye pehle promise print hua ,
// And  promises bhi browser handle karta hai 👉 but Promises Web API me nahi jaate.
// Promises are handled by the JavaScript engine( ye Promise create karta hai, resolve/reject karta hai), and their .then() callbacks are placed in the microtask queue, which the Browser runtime (event loop) run karwata hai  after the call stack is empty.
// Microtasks (Promises) are handled by the JavaScript engine itself, not by Web APIs.

// 🔹 Microtask Queue :- Stores high-priority async tasks like Promises (.then, .catch) and MutationObserver.
// 🔹 Callback Queue (Macrotask Queue):- Stores lower-priority tasks like setTimeout, setInterval, and DOM events.


//in detail

// 🔹 1️⃣ Jab code browser me run hota hai, JavaScript engine synchronously upar se niche tak code execute karta hai.
// 🔹 2️⃣ new Promise(...) jab run hota hai   const friedRicePromise = new Promise((resolve, reject) => {
//     👉 Promise constructor immediately execute hota hai, Ye async nahi hota

// Is time promise ka status hota hai:   Pending
// Phir condition check hoti hai: resolve({value:"friedrice"});
// Agar condition true hai: Pending → Fulfilled
// Agar false hai: Pending → Rejected
//  ⚠️ Ye status change immediately ho jata hai (synchronous execution ke andar).

//  🔹 3️⃣ .then() kya karta hai?    friedRicePromise.then(...)
// 👉 .then() callback ko Microtask Queue me daal deta hai 👉 Promises Web API me nahi jaate.👉 setTimeout Web API me jaata hai.
// 👉 Lekin execute tab hoga jab Call Stack empty hoga
// call stack (GEC -> 1. memory creation phase 2. execution phase)
// 🟣 Promise Flow      Call Stack -> Promise resolved -> .then() callback → Microtask Queue -> Event Loop -> Call Stack
//   

// 🔹 4️⃣ setTimeout(()=>{},0)    flow-> Call Stack -> Web API (Timer starts) ->  Callback Queue (after delay) -> Event Loop -> Call Stack
// 👉 Ye callback Web API me jata hai
// 👉 Phir Callback Queue (Macrotask Queue) me push hota hai


// Timer → time measure karna padta hai → browser ka kaam → Web API
// Promise → sirf state change + scheduling → JS engine handle karta hai







// ==============================================
// const myPromise = new Promise((resolve, reject) 👉 Yahan myPromise ek Promise object hai👉 Isliye directly .then() laga sakte ho
// Promise stored in variable → myPromise.then()          

// Function returning promise → myPromise().then()




// function returning promise

// function ricePromise(){
//   const bucket = ['coffee', 'chips','vegetables','salt','rice'];
//   return new Promise((resolve,reject)=>{
//     if(bucket.includes("vegetables")&& bucket.includes("salt") && bucket.includes("rice")){
//         resolve({value:"friedrice"});
//     }else{
//         reject("could not do it");
//     }
//   })
// }


// ricePromise().then(
//   // jab promise resolve hoga 
//   (myfriedRice)=>{
//   console.log("lets eat ", myfriedRice);
//   }
//   ).catch(
//   (error)=>{
//       console.log(error)
//   })


  //-> lets eat  {value: 'friedrice'}






//   =========================================================





// promise && setTimeout 


// I want to (resolve / reject) promise after 2 seconds 


// function myPromise(){
//     return new Promise((resolve, reject)=>{
//         const value = false;
//         setTimeout(()=>{
//             if(value){
//                 resolve();
//             }else{
//                 reject();
//             }
//         },2000)
//     })
// }

// myPromise()
//     .then(()=>{console.log("resolved")})
//     .catch(()=>{console.log("rejected")})


    //-> rejected     2sec baad result aya   bcz pehle setTimeout chalega uske baad promise 





// ========================================================




// Promise.resolve
// Promise chaining

// const myPromise = Promise.resolve(5);  //Ye line ek already fulfilled Promise create karti hai jiska resolved value 5 hota hai.
// myPromise.then(value => { console.log(value); // 5 });

// Promise.resolve(5).then(value=>{   //Ye ek already resolved promise banata hai jiska value 5 hai, aur .then() us value ko receive karke print karta hai.
//   console.log(value);
// })


// then()
// then method hamesha promise return karta hai


// function myPromise(){
//   return new Promise((resolve, reject)=>{
//     resolve("foo");
//   })
// }

// myPromise()
//   .then((value)=>{
//     console.log(value);  //-> foo
//     value += "bar";
//     return value    // return nhi karte toh undefined hojata
//   })
//   .then((value) =>{
//     console.log(value);   //-> foobar
//     value += "baaz";
//     return value;        
//   })
//   .then(value=>{
//     console.log(value);   //-> foobarbaaz
//   })





// ================================================

// for this mene chap10->Callback-> callback-Demo.html se ye page link kiya waha jake live server chalu kar
// callback hell hua tha usse kese thikh kare uska solution

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


// function changeText(element, text, color, time) {
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             if(element){
//               element.textContent = text;
//               element.style.color = color;
//               resolve();
//             }else{
//               reject("element not found");
//             }
//           },time)
//     })  
//   }

// //   changeText(heading1, "one","red",1000)   //ye function ek promise return kar rha hai so .then laga sakte hai

// // 👉 .then() hamesha ek naya Promise return karta hai.Isliye tum uspe fir se .then() laga sakte ho.

// changeText(heading1, "one", "red", 1000)
//   .then((success)=>{
//         console.log(success)      //-> undefined  bcz humne resolve me kuch nhi dala

//       return changeText(heading2, "two", "purple", 1000) //Agar changeText() khud promise return karta hai,toh return karne ka matlab hai: Next .then() tab tak wait kare jab tak ye promise resolve na ho.❌ Agar return nahi karoge 👉 Next .then() immediately execute ho jayega 👉 Wait nahi karega 👉 Promise chain break ho jayegi for example return nhi likha three and four me toh dono sath me print hoga four wait nhi karega three k print hone ka 
// // 🔹 Isliye chaining ka rule
// // ✔️ Agar async function call kar rahe ho
// // ✔️ Aur sequential execution chahiye
// // 👉 Toh return karna zaroori hai
//     })
//   .then(()=>changeText(heading3, "three", "green", 1000))   // arrow function me {} nhi dala toh return bhi likhne ki jarurat nhi return ho rha hai but ye short hai
//   .then(()=>changeText(heading4, "four", "orange", 1000))  // imagine yaha pe error aya so ye next line nhi chalaega direct catch chalega
//   .then(()=>changeText(heading5, "five", "red", 1000))
//   .then(()=>changeText(heading6, "six", "blue", 1000))
//   .then(()=>changeText(heading7, "seven", "pink", 1000))
//   .then(()=>changeText(heading8, "eight", "green", 1000))
//   .then(()=>changeText(heading9, "nine", "black", 1000))
//   .then(()=>changeText(heading10, "ten", "orange", 1000))
//   .catch((error)=>{
//       alert(error);
//   })





// ==============================================================================




// BASIC THEORY 

// AJAX : asynchronous javascript and XML

// HTTP request

// is a set of "web development techniques" 
// using many web technologies on the "client-side "
// to create asynchronous web applications. 


// With Ajax, web applications can send and retrieve 
// data from a server asynchronously (in the background) 
// without interfering with the display and 
// behaviour of the existing page

// We don't use data in XML format anymore. 
// we use JSON now. 


// we have 3 most common ways to create and send request to server
// 1.) xmlHTTPRequest (old way of doing)
// 2.) fetch API (new way of doing)
// 3.) axios (this is third party library)




// =========================================
// XHR = XMLHttpRequest

// const URL = "https://jsonplaceholder.typicode.com/posts";
// const xhr = new XMLHttpRequest();
// // console.log(xhr);      //-> XMLHttpRequest {onreadystatechange: null, readyState: 0, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}

// // step1
// // console.log(xhr.readyState);
// xhr.open("GET",URL);
// // console.log(xhr.readyState);
// // xhr.onreadystatechange = function(){
// //     // console.log(xhr.readyState);
// //     if(xhr.readyState === 4){
// //         console.log(xhr)
// //         const response = xhr.response;
// //         const data = JSON.parse(response);
// //         console.log(typeof data);
// //     }
// // }

// xhr.onload = function(){
//     const response = xhr.response;
//     const data = JSON.parse(response);
//     console.log(data);                     //-> (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]        json data parse hoke mila hai
// }

// xhr.send();


// ======================================================


// const URL = "https://jsonplaceholder.typicode.com/posts";

// const xhr = new XMLHttpRequest();

// xhr.open("GET", URL);
// xhr.onload = () => {
//     if(xhr.status >= 200 && xhr.status < 300) {
//         const data = JSON.parse(xhr.response);
//         console.log(data);                 //-> (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//         const id = data[3].id;
//         const xhr2 = new XMLHttpRequest();
//         const URL2 = `${URL}/${id}`
//         console.log(URL2);                //-> https://jsonplaceholder.typicode.com/posts/4
//         xhr2.open("GET", URL2);
//         xhr2.onload = () => {
//             const data2 = JSON.parse(xhr2.response);
//             console.log(data2);        //-> {userId: 1, id: 4, title: 'eum et est occaecati', body: 'ullam et saepe reiciendis voluptatem adipisci\nsit … ipsam iure\nquis sunt voluptatem rerum illo velit'}
//         }
//         xhr2.send();
//     }
//    else{
//        console.log("something went wrong");
//    }
// }

// xhr.onerror = () => {       //network related error
//     console.log("network error");
// }
// xhr.send();


//===========================================================


// const URL = "https://jsonplaceholder.typicode.com/posts";

// function sendRequest(method, url) {
//     return new Promise(function(resolve, reject) {
//         const xhr  = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.onload = function() {
//             if(xhr.status >= 200 && xhr.status < 300){
//                 resolve(xhr.response);
//             }
//             else{
//                 reject(new Error("Something Went wrong"));
//             }
//         }

//         xhr.onerror = function() {
//             reject(new Error("Something went wrong"));
//         }

//         xhr.send();
//     })
// }

// sendRequest("GET", URL)
//     .then(response => {
//         const data = JSON.parse(response);
//         // console.log(data)
//         return data;
//     })
//     .then(data=>{
//         const id = data[3].id;
//         return id;
//     })
//     .then(id=>{
//         const url = `${URL}/${id}ssss`;
//         return sendRequest("GET", url);
//     })
//     .then(newResponse => {
//         const newData = JSON.parse(newResponse);
//         console.log(newData);
//     })
//     .catch(error =>{
//         console.log(error);
//     })




// 🔹 2xx – Success : Request successfully completed
// 200 OK
// 201 Created


// 🔹 3xx – Redirection : Resource kisi aur URL pe move ho gaya
// 301 Moved Permanently
// 302 Found

// 🔹 4xx – Client Errors : Client side mistake (request galat)
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found


// 5xx – Server Errors: Server side problem
// 500 Internal Server Error
// 502 Bad Gateway
// 503 Service Unavailable




    // ==================================================================


// fetch  fetch() is a browser API used to make network requests (like getting data from a server) and it returns a Promise.

// const URL = "https://jsonplaceholder.typicode.com/posts";


//fetch me Second object ko options object bolte hain — isme hum request ka configuration dete hain. fetch(url) 👉 Ye by default GET request bhejega 
// fetch(url) 👉 Ye by default GET request bhejega  👉 Koi body nahi 👉 Koi custom headers nahi

// fetch(URL,{           
//     method: 'POST',         //Server ko bol rahe ho ki hum data bhejna chahte hain (create / insert).
//     body: JSON.stringify({           //Server ko data string format (JSON string) me chahiye hota hai, object nahi.          //body -> server ko bhejne wala data
//         title: 'foo',                  //Server ko bhejne se pehle convert hota hai: '{"title":"foo"}'
//         body: 'bar',
//         userId: 1,
//     }),
//     headers: {             //Headers server ko batate hain ki hum jo data bhej rahe hain uska format kya hai.
//         'Content-type': 'application/json; charset=UTF-8',       //means “Jo data body me bheja hai wo JSON format me hai.”
//     },           //charset=UTF-8 👉 Ye batata hai ki text encoding UTF-8 use ho rahi hai, 👉 Taaki special characters sahi se read ho sake
//     })

//     .then(response =>{
//         if(response.ok){              //🔹 response.ok true hota hai jab status 200–299 ho 🔹 Agar 404 / 500 aaye → response.ok false hoga
//             return response.json()        //response.json() bhi promise return karta hai Isliye next .then() me data milta hai
//         }else{
//             throw new Error("Something went wrong!!!") //fetch() 404 par reject nahi karta Isliye hum manually throw kar rahe hai, Ye throw promise ko reject kar deta hai.
//         }
//     })
//     .then(data =>{
//         console.log(data);
//     })
//     .catch(error =>{      //fetch() ka .catch() tab chalta hai jab network error ho ya request fail ho (jaise no internet, wrong domain, server unreachable).
//         console.log("inside catch");     //❌ Agar server 404 ya 500 de de 👉 Tab bhi .catch() nahi chalega
//         console.log(error);
//     })

//-> {title: 'foo', body: 'bar', userId: 1, id: 101}



    // ==========================================================




// const URL = "https://jsonplaceholder.typicode.com/posts";

// fetch(URL)
//     .then(response => {
//         console.log(response)   //-> Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/posts', redirected: false, status: 200, ok: true, …}
        
//         return response.json()  //-> .json() response body ko read karta hai Aur us JSON string ko JavaScript object me convert karta hai,Ye method promise return karta hai
//      // Kyu promise return karta hai? Response ka body: ReadableStream -> Matlab data chunk by chunk aata hai, Isliye usko read karna async process hai

//      // console.log(response.json()) //-> Promise {<pending>}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: Array(100)

//     })
//     .then(data => {
//         console.log(data);
//     })

// Response object hota hai (raw HTTP response) Ye sirf data nahi hota — ye pura metadata hota hai.

//A ReadableStream is a programming interface (in JavaScript/Web APIs and Node.js) for handling streams of data, allowing you to read data in chunks as it arrives, rather than waiting for the entire dataset, making it efficient for large files or network responses, and is used in browser APIs (Fetch API) and Node.js for tasks like streaming file contents or HTTP data. It manages data flow using methods like read(), events like 'data', and can be created with a constructor or from iterables, providing control over data consumption and cleanup.  
    






// ==========================================================
    
    
// async await

console.log("script start");
const URL = "https://jsonplaceholder.typicode.com/posts";

// // async function getPosts(){
// //     const response = await fetch(URL);
// //     if(!response.ok){
// //         throw new Error("Something went wrong")
// //     }
// //     const data = await response.json();
// //     return data;
// // }


// // or

const getPosts = async() =>{                 //async function hamesha Promise return karti hai.
    const response = await fetch(URL);      //👉 await yahan function ko pause karta hai 👉 Lekin poora JS thread block nahi hota 👉 Sirf async function pause hoti hai
    // 👉 await fetch ke promise ke resolve hone ka wait karta hai,  Matlab: Server response aane tak rukega, Jab response aa jayega tab next line chalegi
    // ❓ Par wait kyu kare? .then() se handle kar sakte the na? yes kar sakte the jese pehle kiya tha fetch().then() but fhir await kyu use kiya bcz 👉 await code ko synchronous jaisa readable bana deta hai 👉 Function ke andar sequential flow milta hai  means await wait karega and jab fetch resolve hoga ( server se response aaega ) tab await aghe function ko chalne dega 
    //👉 Nahi, har jagah await likhna zaroori nahi. 👉 await tab likhte hain jab tumhe result chahiye immediately.
    if(!response.ok){
        throw new Error("Something went wrong")   //👉 Agar status 200–299 nahi hai, To manually error throw kar rahe ho, Promise reject ho jayega , but manually error throw kyu karna hai?  👉 fetch() 404/500 pe reject nahi karta 👉 Sirf network error pe reject karta hai 👉 Tum manually promise ko reject kar rahe ho 👉 Taaki .catch() chale , We manually throw an error because fetch does not reject on HTTP errors like 404.
    }
    const data = await response.json();  // 👉 response.json() bhi promise return karta hai isiliye await jab response aaega tab chalega
    return data;
    // ✅ Await kab use karna chahiye? 👉 Jab function promise return kare 👉 Aur tumhe uska result next line me chahiye jese fetch k pehle lagaya Examples:fetch(), response.json(), database calls, file reads
}
// Behind the scenes JS isko convert karta hai:->return Promise.resolve(data); Async function return value ->Automatically wrapped in Promise isliye then lagake milega value
const myData = getPosts();
console.log(myData);       //Promise {<pending>}    // yaha data nhi milega promise return karega  bcz async fun promise hi return karega

getPosts()
    .then((myData) => {          //promise resolve hota hai fhir hume array milega
        console.log(myData);
    })
    .catch(error =>{
        console.log("inside catch")
        console.log(error);
    })


console.log("script end ");

//-> 
// script start
// script end 
// (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]


// ✅ 1️⃣ fetch 404/500 pe reject kyu nahi karta? 
// 404 aur 500 ka matlab hai server ne successfully response bheja, bas response me error status hai.Server tak request pahunchi ✅Server ne reply diya ✅Toh network level pe sab sahi tha, Isliye fetch() ke liye ye successful request hai.Fetch kisi bhi HTTP error pe reject nahi karta, jaise:400 (Bad Request) ,  401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error),502, 503 etc. Sab pe fetch resolve karega.

// 404 Not Found → Jo resource (page / API / file) tum maang rahe ho wo server pe exist nahi karta.
// 500 Internal Server Error → Server ke andar kuch toot gaya / crash ho gaya / coding error hai.Request sahi thi, Server process nahi kar paya

// 🔹 fetch kis pe reject karta hai?
// Jab request server tak pahunch hi nahi paati.

// Fetch only rejects on network failures, not on HTTP errors like 404 or 500, because the server still sends a valid response.
// Network Error: ❌ Internet band hai,❌ Wrong domain (example: htttps://wrong.com),❌ DNS issue, ❌ Server down hai, ❌ CORS blocked
// 👉 Browser ko server se response mila hi nahi 👉 Isliye promise reject hota hai 👉 .catch() chalega