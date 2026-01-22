// A Promise is an object that represents the eventual completion or failure of an asynchronous operation.
// A promise represents a value that may be available now, later, or never.
// A promise represents a future value of an async operation.


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
console.log("script start");
const bucket = ['coffee', 'chips','vegetables','salt','rice'];

// promise ko kisi variable me store kar sakta hoon ya function se return 

const friedRicePromise = new Promise((resolve,reject)=>{
    if(bucket.includes("vegetables")&& bucket.includes("salt") && bucket.includes("rice")){
        resolve({value:"friedrice"});   // resolve is method
    }else{
        reject("could not do it");
    }
})

// so promise create kiya humne 

// how to get the promise 

friedRicePromise.then(             //then -> method  ye as a input ek method lega
    // jab promise resolve hoga 
    (myfriedRice)=>{
    console.log("lets eat ", myfriedRice);
    }
    ).catch(
    (error)=>{
        console.log(error)
    })


setTimeout(()=>{
    console.log("hello from settimeout")
},0)  

for(let i = 0; i <=100; i++){
    console.log(Math.random(), i);
}

console.log("script end!!!!")


//->  script start
// 0.8878286643187111 0   to   0.62652848178786 100
// script end!!!!
// lets eat  {value: 'friedrice'}
// hello from settimeout


// bcz promises Microtask queue me jata hai jo ki high priority hai isliye pehle promise print hua ,
// And  promises bhi browser handle karta hai 
// Promises are handled by the JavaScript engine, and their .then() callbacks are placed in the microtask queue, which the browser executes after the call stack is empty.


// 🔹 Microtask Queue :- Stores high-priority async tasks like Promises (.then, .catch) and MutationObserver.
// 🔹 Callback Queue (Macrotask Queue):- Stores lower-priority tasks like setTimeout, setInterval, and DOM events.