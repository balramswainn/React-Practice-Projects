
// 🧠 JavaScript kya hai internally?
// 👉 JavaScript single-threaded, synchronous by default, non-blocking language hai
// 👉 Browser / Node.js ke paas JS Engine hota hai (Chrome → V8)

// Browser ke andar multiple cheezein hoti hain:
// JavaScript Engine (JS code run karta hai)
// Chrome → V8
// Firefox → SpiderMonkey
// Safari → JavaScriptCore

// Web APIs

// Event Loop

// Rendering Engine


// ✅ Frontend (Browser Environment)
// Jab tumhara frontend project browser me run hota hai, browser ke paas hota hai:
// 🔹 Browser ke Components:
// JavaScript Engine (V8 etc.)
// Web APIs (DOM, setTimeout, fetch, localStorage…)
// Event Loop
// Rendering Engine (HTML/CSS render karta hai)

// 👉 Yahan DOM bhi hai
// 👉 UI bhi render hota hai




// ✅ Backend (Node.js Environment)
// Node.js browser nahi hai ❌
// Node.js me hota hai:
// 🔹 Node.js ke Components:
// V8 Engine (JS run karta hai)
// Node APIs (fs, http, path, crypto etc.)
// Event Loop (libuv based)

// ❌ No DOM
// ❌ No Rendering Engine



// 0.1 Javascript is interpreted or compiled ?
// JavaScript is primarily considered an interpreted language, but modern JavaScript engines also utilize Just-In-Time (JIT) compilation for performance optimization.
// It uses a hybrid model with both interpretation and compilation.
// Modern JS engines (like V8 used in Chrome & Node.js) use a JIT (Just-In-Time) compiler.

// Compiled Language :- A compiled language is one where the entire code is translated into machine code(01010) before execution.
// •	Compilation happens once
// •	Code runs faster
// •	Errors are shown at compile time
// Examples: C, C++, Java (compiled to bytecode)
// One-liner :
// Compiled languages convert the whole program into machine code before running, which makes execution faster.

// Interpreted Language:- An interpreted language is one where the code is executed line by line at runtime.
// •	No separate compilation step
// •	Slower compared to compiled languages
// •	Errors appear during execution
// Examples: JavaScript, Python, PHP
// One-liner :
// Interpreted languages run code line by line at runtime using an interpreter.
// Many modern languages like JavaScript and Python use both interpretation and just-in-time compilation for better performance.

// Just-In-Time (JIT) Compilation is a technique where code is compiled into machine code at runtime, just before it is executed, instead of compiling everything in advance.
// 👉 It combines benefits of interpreted and compiled languages.
// •	Happens during program execution
// •	Frequently used code is compiled for faster performance
// •	Improves speed compared to pure interpretation


// ========================================================== 


// How does JavaScript actually execute?

// Step-by-step in the V8 engine:
// 1️⃣ Parsing: The engine reads and checks syntax.
// 2️⃣ Interpreter (Ignition): Converts JS code to bytecode.
// 3️⃣ JIT Compiler (TurboFan): Converts frequently used bytecode into machine code for better performance.
// 4️⃣ Execution: The optimized machine code runs directly on the CPU.
// This makes JavaScript fast like compiled languages and flexible like interpreted ones.

// ====================================================================================================






//normal flow 

// console.log(this);    //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(window);  //->Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(firstName);  //-> undefined
// var firstName = "Harshit";  
// console.log(firstName);  //-> Harshit


// =================================


// 1️⃣ Compilation Phase 
//   1. Early erorr checking
//   2. Determining appropriate scope for varibale

// 2️⃣ Code Execution Phase 
//   1. Global Execution Context 
//     - Memory Creation Phase 
//     - Execution Phase

// JavaScript engine first goes through a Compilation Phase, where it checks for early errors and determines variable scopes.Then in the code Execution Phase, it creates the Global Execution Context, performs memory allocation, and executes the code line by line.

// =====================================================



// 1. Compilation Phase 

// Pehli line execute hone se pehle code compile hota hai so we can do :- 
// 1. Early erorr checking hota hai 
// 2. Determining appropriate scope for varibale (means variable kis scope me belong karta hai ye pata hona chahiye code ko execute karne se pehle)  for example niche diye hua example js ko pata hai ki firstName naam ka variable  global scope me belong karta hai  but abhi tak variable create nhi hua hai 

// Compilation Phase(parsing phase) =  1. tokenizing/ lexing    2. parsing     3. code generation

// Now to know how js parse code before exceuting :- 
//( pehli toh 'this' execute hona chahiiye tha but nhi hua bcz code execute hone se pehle hi parse hojata hai jimse syntax error pakad leta hai)

// console.log(this);    
// console.log(window);  
// console.log(firstName);  
// var firstName = ."Harshit";     //-> Uncaught SyntaxError: Unexpected token '.' 
// console.log(firstName);  





// 2. Code Execution Phase   

// In js code execute inside execution context ( so to execute code we need to create execution context )  and sabse pehle jo execution context create hota hai usse hum Global Execution context kehte hai  pehli line bhi execute hone se pehle ye create hogi 

// 🔁 JavaScript ka execution = 2 PHASE

  // 🔹 PHASE 1: Memory Creation Phase 
  // 🔹 PHASE 2: Execution Phase




// 🔹 PHASE 1: Memory Creation Phase 
// Is phase me code execute nahi hota, sirf memory allocate hoti hai.

// JS engine kya karta hai:
// 1️⃣ Global Execution Context (GEC) banata hai
// 2️⃣ Memory Creation Phase
//  Memory allocate karta hai:
//     1. Variables → undefined
//     2. Functions → poora function definition, memory me store hota ha (only applys to function declaration) baki sab undefined hi store karenge

// Example: console.log(a); var a = 10;
// Creation phase me:   a = undefined

// 3️⃣this set karta hai   Browser me: this === window   ;  Node.js me: this === {} // (module object) 
//  this aaya kaha se? this JavaScript engine provide karta hai, tum define nahi karte. Jab bhi Execution Context banta hai: JS engine automatically add karta hai: this ,Variable Environment, Lexical Environment 

    // Creation Phase me this kaise decide hota hai?
    // Global Execution Context mai this -> :
    // Browser → window
    // Node → {}

    // Function Execution Context mai this -> :
    // Normal function call → window (non-strict)
    // Method call → object
    // Constructor (new) → new object
    // Arrow function → parent this
    // this JavaScript ka keyword nahi,execution context ka automatic binding hai jo JS engine har context banate waqt set karta hai.






// 🔹 PHASE 2: Execution Phase
// Ab code line by line execute hota hai. Har function call par new execution context banta hai.

// Types: Global Execution Context,  Function Execution Context
// Har execution context me: Memory, Code execution, this



// -----------------------------------

// 📚 Call Stack
// Call Stack track karta hai: Kaunsa function currently run ho raha hai aur next kaunsa run hoga.
// JavaScript single-threaded hai 👉 ek time pe sirf ek kaam kar sakta hai

// Example:                                         
// function one(){  two() ;}
// function two(){  console.log("hi"); }
// one();

// Call Stack flow:  LIFO → Last In First Out

// | two() |
// | one() |            
// | GEC  |

// STEP 1️⃣ Program start :- Global Executio n Context (GEC) create hota hai, GEC Call Stack me push hota hai ->    | GEC |
// STEP 2️⃣ one() call hua , one() ka execution context bana , Call Stack me push hua
// STEP 3️⃣ one() ke andar two() call hua, two() ka execution context bana, Call Stack me push hua
// STEP 4️⃣ two() execute hua , Output: hi , two() ka kaam khatam 👉 two() stack se pop ho gaya || one() complete hua and aur kaam nahi one() bhi pop
// STEP 6️⃣ Program end, GEC bhi pop, Call Stack empty   : Output -> hi




// ====================================================================================


// Hoisting is JavaScript’s behavior where variable and function declarations are processed before code execution. During the memory creation phase, variables declared with var are initialized as undefined, while function declarations are fully hoisted (meaning their entire function body is available in memory and can be called before the function is defined in the code.).

// var, let, and const are all hoisted in JavaScript.
// Variables declared with var are initialized as undefined, while let and const remain in the Temporal Dead Zone and cannot be accessed before declaration.

// Temporal Dead Zone is the time between a variable’s hoisting and its declaration where let and const exist in scope but cannot be accessed, and any access results in a ReferenceError.
// TDZ means variables declared with let and const cannot be accessed before their declaration, even though they are hoisted.

// console.log(this);     //->Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(window);   //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.log(myFunction);  //-> ƒ myFunction(){ console.log("this is my function");}

// console.log(fullName);   //-> undefined

// function myFunction(){
//     console.log("this is my function");
// }

// var firstName = "Harshit";
// var lastName = "Sharma"
// var fullName = firstName + " " + lastName;  
// console.log(fullName);       //->Harshit Sharma




// ===================================================


// Function declarations are fully hoisted, but function expressions with var hoist the variable as undefined.

// console.log(myFunction);  //-> undefined

// var myFunction = function(){
//     console.log("this is my function");
// }

// console.log(myFunction);   //-> ƒ (){ console.log("this is my function"); }


// ---------------------


//  let and const declarations are hoisted, but they remain uninitialized. 

//This throws a ReferenceError because let-declared function expressions are hoisted but remain in the Temporal Dead Zone, so the variable cannot be accessed before initialization. memory creation phase me keyword let = uninitialized

// console.log(myFunction);       //-> ReferenceError: Cannot access 'myFunction' before initialization

//  let myFunction = function(){
//     console.log("this is my function");
// }
// console.log(myFunction);



// console.log(firstName);  //-> Uncaught ReferenceError:  Cannot access 'firstName' before initialization
// let firstName;
// console.log(firstName);  //-> undefined



// ========================================================


// Function Execution Context
// 👉 Jab bhi koi function call hota hai, JavaScript us function ke liye ek naya execution context banata hai — isi ko Function Execution Context kehte hain.




// let foo = "foo";
// console.log(foo); //-> foo

// function getFullName(firstName, lastName){
//     console.log(arguments);                 //->Arguments(2) ['harshit', 'sharma', callee: ƒ, Symbol(Symbol.iterator): ƒ]
//     let myVar = "var inside func";         //-> var inside func
//     console.log(myVar);
//     const fullName = firstName + " " + lastName;
//     return fullName;
// }

// const personName = getFullName("harshit", "sharma");      // yaha function call hua so js ek naya execution context banata hai so isi ko Function Execution Context kehte hain.
// console.log(personName);     //-> harshit sharma


// 1. memory creation phase :- 👉 Memory creation phase me koi function call hota hi nahi.Memory creation phase ka kaam sirf memory allocate karna hota hai
// window: {}
// this: window
// foo : uninitialised
// getFullName : function definition
// personName : uninitialised              

// 2. execution phase :-
// foo : foo            
// getFullName : function definition     //Kuch bhi execute nahi hota. Function sirf memory me available rehta hai, jab tak usko explicitly call na kiya jaye.
// personName : uninitialised      //function call hua so ab yaha pe ye function k liye Function Execution Context chalega 



// Function Execution Context
// -----------------------------|
// 1. memory creation phase :-  |
// agrument:[...] length
// firstName : harshit
// lastName : sharma
// myVar : uninitialised
// fullName : uninitialised


// 2. execution phase :- 
// agrument:[...] length
// firstName : harshit
// lastName : sharma
// myVar : var inside func
// fullName : harshit sharma  (store ho jaega)

// -----------------------------|


// uper wala 
// 2. execution phase :-
// foo : foo            
// getFullName : function definition   
// personName : harshit sharma 






// ==========================================================


// lexical environment, scope chain

// Lexical environment = own variables + outer (parent) reference
// Lexical environment is the current scope of a function along with references to its parent scopes, determined by where the code is written.




// Lexical Scope 
// Lexical scope means JavaScript determines variable access based on where the code is written, not where it is executed.


// Lexical Scope → rule

// Variables are accessible based on where the code is written.

// Lexical Environment → mechanism / structure

// The actual place where variables and references are stored.


// Lexical Environment is where JavaScript keeps variables and functions and decides from which scope a variable can be accessed.
// “Code jahan likha hai, JS wahi se variables dhoondhta hai.”
// A lexical environment consists of an environment record (variables/functions) and a reference to its outer lexical environment, which enables scope chaining.
// 🧠 Key points to remember: Created whenever an execution context is created, Based on where code is written, not where it’s called, Used to resolve variables via scope chain

// const lastName = "Vashistha";            //uninitialized -> Vashistha

// const printName = function(){      // yaha pe ye const and function expression hai isliye memory creation phase me ye uninitialized hogyi fhir execution phase me ye function hoga 
//     const firstName = "harshit";        //fec -> uninitialized -> harshit
//         console.log(firstName);
//         console.log(lastName);   // ab yaha toh lastName define nhi hai toh kaha se laega ye FEC hai iske bahar GEC hai so waha se laega uske lexical environment se aur ye tab tak dekhte raheg jab tak hum GEC tak pahuch nhi jate
    
// }
// printName();            // yaha function execution context chalega




// lexical environment, scope chain

// const lastName = "Vashistha";

// const printName = function(){
//     const firstName = "harshit";
//     function myFunction(){            //Here, firstName is accessed from myFunction’s lexical environment, which includes variables from its parent scope (printName) through the scope chain.
//         console.log(firstName);      //myFunction apne lexical environment ke through parent function printName se firstName access kar raha hai.
//         console.log(lastName);
//     }
//     myFunction()
    
// }
// printName();






