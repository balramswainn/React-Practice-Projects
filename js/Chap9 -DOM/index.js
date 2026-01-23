// 🔹 Normal script  :   <script src="app.js"></script>

// HTML parsing stops
// JS file downloads & executes
// Then HTML continues


// 🔹 async : <script async src="app.js"></script>

// JS file downloads in parallel
// Executes as soon as it’s ready
// HTML parsing may pause anytime
// 👉 Order not guaranteed
// 👉 Best for independent scripts (ads, analytics)


// 🔹 defer : <script defer src="app.js"></script>

// JS file downloads in parallel
// Executes after HTML is fully parsed
// Execution order maintained
// 👉 Best for DOM-related scripts


// ====================================


// DOM (Document Object Model): The DOM is a tree-like representation of an HTML page that allows JavaScript to read, change, and manipulate elements on the webpage.

// Document: document is the main object provided by the browser that represents the entire HTML page and gives access to the DOM.

// console.log(document)  //->  #document ( shows the document as an HTML structure )
// console.dir(document)  //->  #document ( shows the document as a JavaScript object with its properties and methods )



// ====================================




// select element using get element by id
 
// const mainHeading = document.getElementById("main-heading");
// console.log(mainHeading);      //->  <h2 id="main-heading">...</h2>

// console.dir(document.getElementById("main-heading"))   //-> h2#main-heading   -> object 




// =================================================


// select element using query selector

// const mainHeading = document.querySelector("#main-heading");   //->  <h2 id="main-heading">...</h2>
// const header = document.querySelector(".header");              //->  <header class="header">..</header>
// const navItem = document.querySelectorAll(".nav-item")         //-> NodeList(3) [li.nav-item, li.nav-item, li.nav-item]
// console.log(navItem);                                         


// A NodeList in JavaScript is an array-like collection of DOM nodes (elements, text, comments, etc.). It is typically returned by DOM methods such as document.querySelectorAll() and Node.childNodes. 
// Array-like, not an Array: A NodeList has a length property and you can access items using index notation (e.g., myNodeList[1]), but it does not have all the built-in Array methods like push(), pop(), slice(), or filter().
// Iterable: You can iterate over a NodeList using a for loop, a for...of loop, or the built-in forEach() method.




// ===========================================


// change text 
// textContent and innerText

// const mainHeading = document.getElementById("main-heading");
// console.log(mainHeading.innerText);   //-> Manage your tasks
// console.log(mainHeading.textContent)  //-> Manage your tasks Hello       (html doc me ek span element dala hai jisme hello hai use display:none kardiya hai)

// mainHeading.textContent = "This is something else";
// console.log(mainHeading.textContent);  //->  This is something else



  // ==============================




  // change the styles of elements

// const mainHeading = document.querySelector("div.headline h2");   //ese bhi likh sakte hai h2 ko target karna tha
// console.log(mainHeading.style);              //->CSSStyleDeclaration {accentColor: '', additiveSymbols: '', alignContent: '', alignItems: '', alignSelf: '', …}   object
// mainHeading.style.backgroundColor = "blue"; 
// mainHeading.style.border = "20px solid green";



// =============================================================



// get and set attrubutes

// const link = document.querySelector("a");  
// console.log(link)                                     //-> <a href="#home">Home</a>
// console.log(link.getAttribute("href"))                //-> #home
// console.log(link.getAttribute("href").slice(1));      //->home

// link.setAttribute("href", "https://codprog.com");     //-><a href="https://codprog.com">Home</a>
// console.log(link.getAttribute("href"));               //-> https://codprog.com

// const inputElement = document.querySelector(".form-todo input");  //-> <input type="text" name id placeholder="Add Todo">
// console.log(inputElement.getAttribute("type"));                   //->text



// ==============================================================


// get multiple elements using getElements by class name 
// get multiple elements items using querySelectorAll

// const navItems = document.getElementsByClassName("nav-item"); // HTMLCollection   Arraylike object not array
// console.log(navItems);                                        //-> HTMLCollection(3) [li.nav-item, li.nav-item, li.nav-item]
// console.log(navItems[1]);                                     //-> <li class="nav-item">...</li>
// console.log(Array.isArray(navItems));         //-> false               

// const navItems1 = document.querySelectorAll(".nav-item");        // NodeList   Arraylike object not array
// console.log(navItems1);                                          //-> NodeList(3) [li.nav-item, li.nav-item, li.nav-item]
// console.log(navItems1[1]);                                       //-> <li class="nav-item">...</li>
// console.log(Array.isArray(navItems1));          //-> false               


// NodeListe me forEach use kar sakte hai


//==============================================================


// get multiple elements using getElements by class name 
// get multiple elements items using querySelectorAll
// array like object ---> indexing, length property 

// let navItems = document.getElementsByTagName("a"); // HTMLCollection
// console.log(navItems);                             //-> HTMLCollection(3) [a, a, a]


// we can't use forEach method to iterate through HTMLCollection
// we can use :- simple for loop , for of loop  

// for(let i=0; i< navItems.length; i++){
//     // console.log(navItems[i]);
//     const navItem = navItems[i];
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";

// }

// for(let navItem of navItems){
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// }

// to use forEach we need to convert it to array

// navItems = Array.from(navItems); // array me convert kardiya
// console.log(navItems)                    //->  [a, a, a]
// console.log(Array.isArray(navItems));    //-> true
 
// navItems.forEach((navItem)=>{
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// })



// -------------------------





// let navItems = document.querySelectorAll("a");
// console.log(navItems)                               //->NodeList(3) [a, a, a]


// we can use :- simple for loop , for of loop ,forEach 


// for(let i=0; i< navItems.length; i++){
//     // console.log(navItems[i]);
//     const navItem = navItems[i];
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";

// }

// for(let navItem of navItems){
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// }

// navItems.forEach((navItem)=>{
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// })
// console.log(navItems);      //->NodeList(3) [a, a, a]

// NodeList to array

// navItems = Array.from(navItems);
// console.log(navItems)                          //-> [a, a, a]
// console.log(Array.isArray(navItems));           //true



// =============================================================



// innerHtML 
// const headline = document.querySelector(".headline");
// console.log(headline.innerHTML);    //-> <h2 id="main-heading"> Manage your tasks <span style="display: none">Hello</span></h2> 
// // <button class="btn btn-headline">Learn More</button>

      
// headline.innerHTML = "<h1>Inner html changed </h1>";   //button bhi add karna hai so add this and button bhi add hojaye isiliye esa kiya niche
// headline.innerHTML += "<button class= \"btn\"> Learn More </button>"    //  \" -> "  (jab double quotes ho bahar toh wapis use nhi kiya ye kiya)
// console.log(headline.innerHTML);



// ========================================================
//classlist


// const sectionTodo = document.querySelector(".section-todo");      //-> <section class="section-todo container">...<section>
// console.log(sectionTodo.classList);         //-> DOMTokenList(2) ['section-todo', 'container', value: 'section-todo container']     // bas 2 class hai 

// sectionTodo.classList.add('bg-dark');
// sectionTodo.classList.remove("container");
// console.log(sectionTodo.classList);         //-> DOMTokenList(2) ['section-todo', 'bg-dark', value: 'section-todo bg-dark']

// const ans = sectionTodo.classList.contains("container");
// console.log(ans);                   //-> false    

// sectionTodo.classList.toggle("bg-dark");   // jo class hai hata deta hai and nhi hai toh add kardeta hai
// console.log(sectionTodo.classList)

// const header = document.querySelector(".header");    //-><header class="header bg-dark">...</header>


// header.classList.add("bg-dark");
// console.log(header.classList);   //-> DOMTokenList(2) ['header', 'bg-dark', value: 'header bg-dark']





// ===========================================================


// difference between innerHTML,innerText,textContent

// const todoList = document.querySelector(".todo-list");

// console.log(todoList.innerHTML)    
//       //  <li>
//       //     <span class="text">Do this do that</span>
//       //     <div class="todo-buttons">
//       //       <button class="todo-btn done">Done</button>
//       //       <button class="todo-btn remove">Remove</button>
//       //     </div>
//       //   </li>
// console.log(todoList.textContent)   //->   Do this do that          Done        Remove
// console.log(todoList.innerText)  //-> Do This Do That        Done Remove


// | Property        | What it returns          | Special Behavior                   |
// | --------------- | ------------------------ | ---------------------------------- |
// | **innerText**   | Only visible text        | Ignores hidden text & respects CSS |
// | **innerHTML**   | Full HTML inside element | Includes tags and formatting       |
// | **textContent** | All text inside element  | Includes hidden text, ignores CSS  |




// ------------------




// Add new HTML elements to page 


// innerHTML to add html element

// const todoList = document.querySelector(".todo-list");
// console.log(todoList.innerHTML)    //->  pura html elements print hoga        <li>   </li>

// todoList.innerHTML = "<li>New Todo 2 </li>"
// console.log(todoList)                                      //-> <ul class="todo-list"> <li>New Todo 2 </li> </ul>
// todoList.innerHTML += "<li>New Todo </li>";              //jo pehli html elemts thi woh and aghe jo add kareunga
// todoList.innerHTML += "<li>teach students </li>";
// console.log(todoList)                                      //-> <ul class="todo-list"> <li>New Todo 2 </li><li>New Todo </li><li>teach students </li> </ul>
// console.log(todoList.innerHTML)     //-> <li>New Todo 2 </li><li>New Todo </li><li>teach students </li>

// when you should use it , when you should not
// todoList.insertAdjacentElement("afterbegin", '<li>Hi</li>')





// =========================================



// document.createElement()   element create kar sakte hai
// append(last), prepend(start), remove



// const newTodoItem = document.createElement("li");       //-> <li></li>
// const newTodoItemText = document.createTextNode("Teach students");   //-> "Teach students"
// // or
// newTodoItem.textContent = "Teach students";
// console.log(newTodoItem)                        //-> <li>Teach students</li>


// const todoList = document.querySelector(".todo-list");           
// console.log(todoList) 
//  /*<ul class="todo-list">
//         <li>
//           <span class="text">Do this do that</span>
//           <div class="todo-buttons">
//             <button class="todo-btn done">Done</button>
//             <button class="todo-btn remove">Remove</button>
//           </div>
//         </li>
//       </ul> */

// todoList.prepend(newTodoItem);     //ek element start me add hoga
// console.log(todoList) 

// {/* <ul class="todo-list">
//         <li>Teach students</li>                
//         <li>
//           <span class="text">Do this do that</span>
//           <div class="todo-buttons">
//             <button class="todo-btn done">Done</button>
//             <button class="todo-btn remove">Remove</button>
//           </div>
//         </li>
//       </ul> */}



// const todo1 = document.querySelector('.todo-list li');         //-> <li>Teach students</li>
// todo1.remove();
// console.log(todoList)         //-> wo <li>Teach students</li>  remove ho jaega


// -----------------------
// before 
// after

// const newTodoItem = document.createElement("li");
// newTodoItem.textContent = "Teach students";
// const todoList = document.querySelector(".todo-list");
// todoList.after(newTodoItem);      //-> <ul class="todo-list"></ul>    iska baad print hoga  ->  Teach students
// todoList.before(newTodoItem);     //-> <ul class="todo-list"></ul>    iska baad print hoga  -> Teach students






// ========================================================



// element.insertAdjacentHTML(where, html)    uper kesa pehle li banao fhir usse prepend ,append karo yaha direct ho sakta hai

// beforebegin
// afterbegin;
// beforeend;
// afterend;

// const todoList = document.querySelector(".todo-list");

// todoList.insertAdjacentHTML("beforeend", "<li>Teach Students </li>");       //->ul element k andhr last me add hoga  ... ui me show hoga console me nhi
// todoList.insertAdjacentHTML("afterbegin", "<li>Teach Students </li>");      //->ul element k andr pehle add hoga  

// todoList.insertAdjacentHTML("afterend", "<li>Teach Students </li>");        //->ul element k baad me add hoga  
// todoList.insertAdjacentHTML("beforebegin", "<li>Teach Students </li>");     //->ul element k pehle me add hoga  







// =========================================


// clone nodes (clone karna ho toh)

// const ul = document.querySelector(".todo-list");
// const li = document.createElement("li");
// li.textContent = "new todo";    //-> <li>new todo</li>

// const li2 = li.cloneNode(true); //-> <li>new todo</li>        true means deep cloning hogi child bhi hogi means uska andhr ka text nhi toh bas <li>

// ul.append(li);         //->ul element k andr pehle add hoga        <li>new todo</li>
// ul.prepend(li2);       //->ul element k andhr last me add hoga    <li>new todo</li>



//========================================


// some old methods to support poor IE
// appendChild;
// insertBefore;
// replaceChild;
// removeChild


// const ul = document.querySelector(".todo-list");

// // new element
// const li = document.createElement("li");
// li.textContent = "new todo";


// const referenceNode = document.querySelector(".first-todo");

// ul.insertBefore(li,referenceNode)     // ul k andhr jo bhi referenceNode humne select kiya uske pehle print hoga
// // ul.removeChild(referenceNode);       //  first-todo remove ho jaega
// ul.appendChild(li,referenceNode)     // ul k andhr jo bhi referenceNode humne select kiya uske baadme print hoga
// ul.replaceChild(li,referenceNode)     // ul k andhr jo bhi referenceNode humne select kiya woh hat jaega li aajega uske jagah





// =========================================
// static list  vs  live list

// querySelectorAll will give  static list 
// getElementsBySomthing(class,tagname) will give live list


//first added 4 <li> in html page NodeList(5) [li.first-todo, li, li, li, li]



// const ul = document.querySelector(".todo-list");
// const listItems = ul.getElementsByTagName("li");    //ul k andhr jitne bhi li hai
// console.log(listItems)        //->   HTMLCollection(5) [li.first-todo, li, li, li, li]      

// const sixthLi = document.createElement("li");
// sixthLi.textContent = "item 6";

// ul.append(sixthLi);
// console.log(listItems);      //->  HTMLCollection(6) [li.first-todo, li, li, li, li, li]   last me add hogya 

// or


// const ul = document.querySelector(".todo-list");
// const listItems = ul.querySelectorAll("li");    //ul k andhr jitne bhi li hai
// console.log(listItems)        //->   NodeList(5) [li.first-todo, li, li, li, li]        

// const sixthLi = document.createElement("li");
// sixthLi.textContent = "item 6";

// ul.append(sixthLi);
// console.log(listItems);      //->  NodeList(5) [li.first-todo, li, li, li, li]   last li toh add kiya tha (ui me hua) but yaha show nhi ho rha hai  bcz ye static list hai




// =========================================


// how to get the dimension of element
// height width 
// const sectionTodo = document.querySelector(".section-todo");
// const info = sectionTodo.getBoundingClientRect();
// console.log(info);       //-> DOMRect {x: 29.65625, y: -7.8125, width: 533.6875, height: 444.46875, top: -7.8125, …}



//====================================================


// intro to events
// click 
// event add karne ke 3 tarike hai 


// const btn = document.querySelector(".btn-headline");
// // method --- addEventListener

// btn.addEventListener("click", function(){   
//     console.log("you clicked me !!!!");
// });


// btn.addEventListener("click", ()=>{          //arrow function
//     console.log("arrow function !!!")
// });



// ===================


// this keyword in eventlistener

// const btn = document.querySelector(".btn-headline");

// btn.addEventListener("click",function(){
//     console.log("you clicked me !!!!");                    //-> you clicked me !!!!
//     console.log("value of this")                 //-> value of this
//     console.log(this);       //-> <button class="btn btn-headline">Learn More</button>         this ki value ye element hi hogi
// });


// btn.addEventListener("click",()=>{
//     console.log(this);       //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …} cuz ye arrow function tha
// });



// ==============================================================





// for this ek new page banaya hai -> clickEvent.html usme jake liveserver on kar to view

// const allButtons = document.querySelectorAll(".my-buttons button");
// console.log(allButtons)      //->NodeList(3)0: button#one1: button#two2: button#threelength: 3[[Prototype]]: NodeList
                             //-> NodeList(3) [button#one, button#two, button#three]                


// for(let index of allButtons){

//    index.addEventListener('click',function(){
//     console.log(this)                         //<button id="two">My Button Two</button>     jis button pe click karo uska pura element dedega cuz of this
//     console.log(this.textContent)             // My Button Two        button k andhr ka text
//    })

// //    or

// //    index.addEventListener('click',()=>{           //arrow function
// //     console.log(this)                            //-> Window {window: Window, self: Window, document: document, name: '', location: Location, …}        
// //    }) 

// }

// for(let i = 0 ; i< allButtons.length; i++){
//     allButtons[i].addEventListener("click", function(){
//         console.log(this);             //-> <button id="three">My Button three</button>
//     })
// }

// allButtons.forEach(function(button){
//     button.addEventListener("click", function(){
//         console.log(this);              //-> <button id="three">My Button three</button>
//         });
// })





// =================================================================================


// for this ek new page banaya hai -> clickEvent.html usme jake liveserver on kar to view



// event object 
// const firstButton = document.querySelector("#one");


// firstButton.addEventListener("click", function(event){
//     console.log(event);    //-> PointerEvent {isTrusted: true, pointerId: 3, width: 1, height: 1, pressure: 0, …}   pura object mil jaega jisse you can access all the prop
// })

// jab bhi mai kisi bhi element pe event listener add hoga 
// js Engine --- line by line execute karta hai 
// browser ---- js Engine + extra features 
// browser ----- js Engine + WebApi

// jab browser ko pata chala ki user ne event perform kia 
// jo hum listen kar rahe hai 
// browser ----- 2 
// 1.) callback function hai vo js Engine ko degi ...... 
// 2.)  callback function ke sath browser jo event hua hai uski information bhi dega
// ye info hamein ek object ke form mai milegi 




// 🔹 Difference in Simple Words

// target → jis element pe click hua
// currentTarget → jis element pe listener laga hai

// Agar click aur listener same element pe hai → output same
// Agar click child pe hai aur listener parent pe hai → output different

// const allButtons = document.querySelectorAll(".my-buttons button");


// for(let button of allButtons){
//     button.addEventListener("click",(e)=>{
//         console.log(e.currentTarget);           //-><button id="one">My Button one</button>
//         console.log(e.target);           //-><button id="one">My Button one</button>
//     })
// }





// ======================================================

// for this ek new page banaya hai -> clickEvent.html usme jake liveserver on kar to view



// console.log("script start !!!!!")
// const allButtons = document.querySelectorAll(".my-buttons button"); //-> NodeList(3) [button#one, button#two, button#three]


// allButtons.forEach((button)=>{                //jab button click hoga tab chalega
//     button.addEventListener("click", (e)=>{
//         let num = 0;
//         for(let i = 0; i<= 1000000000; i++){      //It calculates the sum of numbers from 0 to 1 billion.    100cr = 1billion
//             num += i;
//         }
//         console.log(e.currentTarget.textContent, num);
//     })
// })

// let outerVar = 0;
// for(let i = 0; i<= 100000000; i++){
//     outerVar += i;
// }
// console.log("value of outer variable is ", outerVar);
// console.log("script end !!!!!")

// Ye code page load hote hi kuch heavy calculations karta hai aur buttons pe click hone par bhi heavy calculation karta hai, jisse JavaScript ka single-threaded behavior samajh aata hai.
// JavaScript single-threaded hai, isliye jab heavy loop chal raha hota hai, tab button clicks wait karte hain.



// ✅ Browser = JavaScript Engine + Web APIs    
// The browser runs JavaScript using a JS engine and provides extra capabilities through Web APIs.

// 🔹 JavaScript Engine :- JS code ko run karta hai ,  Example: V8 (Chrome), SpiderMonkey (Firefox)

// 🔹 Web APIs :- Browser provide karta hai extra,   features: DOM API → document.getElementById(), Timers API → setTimeout(), Fetch API → fetch(), Local Storage, Geolocation, etc
// Web APIs are browser-provided features that allow JavaScript to interact with the DOM, timers, network requests, and other browser capabilities.

// Callback Queue: The callback queue holds callback functions (like event handlers and setTimeout) waiting to be executed.

// Event Loop: The event loop continuously checks whether the call stack is empty and then moves tasks from the callback queue to the call stack for execution.

// 1. code run -> GEC 
// 2. so buttons memory phase me hai allButtons = NodeList(3) [button#one, button#two, button#three] 
// 3. so hume listen karna hai , user jab button click karega but js ye kaam nhi karegi bcz its a single threaded hai js ko aur bhi code execute karni hai so js browser se help letahai and bolega user jab click karega muje callback function dedena and Browser k pass api hoti hai jo provide karti hai extra features  humne lagaya hai na  button.addEventListener jo js ko callback dega jab button click hoga ... so js aghe ka code run karega 
// 4. so now user button click kiya toh directly call stack nhi jata sab button callback queue me jata hai and wait karte hai jab call stack empty hoga tab event loop call stack se btns ko call stack me move karega (GEC chal rha hota hai jab GEC khtm tab bhejega pehle btn1 ko fhir woh execute hoga then btn2 ko )

//                          ┌────────────────────┐
//                          │      Web APIs      │
//                          │────────────────────│
//                          │ setTimeout()       │
//                          │ DOM Events         │
//                          │ fetch()            │
//                          └─────────┬──────────┘
//                                    │
//                                    │ callbacks
//                                    ▼
// ┌───────────────┐   checks   ┌──────────────┐   pushes   ┌─────────────────┐
// │  Call Stack   │ ◀───────── │  Event Loop  │ ─────────▶│  Callback Queue │
// │───────────────│            │              │            │─────────────────│
// │ main()        │            │              │            │ click handlers  │
// │ functions     │            │              │            │ timer callbacks │
// └───────────────┘            └──────────────┘            └─────────────────┘

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

// ================================================

// style


// // little practice with click event
// const allButtons = document.querySelectorAll(".my-buttons button")
// // console.log(allButtons.length);

// allButtons.forEach(button =>{
//     button.addEventListener("click", (e)=>{
//         // console.log(e.target);
//         e.target.style.backgroundColor = "yellow";
//         e.target.style.color = "#333";
//     })
// })




// ====================================================

// random color generator
//pehle little-demo me ja   ke live server chalu karo usme html ka code hai




// const mainButton = document.querySelector("button");   //-> <button id="one">My Button one</button>
// console.log(mainButton)
// const body = document.body; 
// console.log(body)      //-> <body>...</body>


// const currentColor = document.querySelector(".current-color");

// function randomColorGenerator(){
//     const red = Math.floor(Math.random() * 256);
//     const green = Math.floor(Math.random() * 256);
//     const blue = Math.floor(Math.random() * 256);
//     const randomColor = `rgb(${red}, ${green}, ${blue})`
//     return randomColor;
// }

// mainButton.addEventListener("click",()=>{
//     const randomColor = randomColorGenerator();
//     body.style.backgroundColor = randomColor;
//     currentColor.textContent = randomColor;
// })




// =====================================================================

// keypress event  : - pure body me koi bhi key press kare muje pata lagna chahiye ( keyboard me koi bhi letter type karu woh dega)
// mouseover event :- jese hi hover karu toh trigger hoga
// const body = document.body;


// keypress event
// body.addEventListener("keypress", (e) => {
//     console.log(e.key)  //-> s
//   console.log(e); //-> KeyboardEvent {isTrusted: true, key: 's', code: 'KeyA', location: 0, ctrlKey: false, …}
// });


// const mainButton = document.querySelector(".btn-headline");
// console.log(mainButton);         //->  <button class="btn btn-headline">Learn More</button>

// mainButton.addEventListener("mouseover", () => {
//   console.log("mouseover event ocurred!!!");
// });

// mainButton.addEventListener("mouseleave", () => {
//   console.log("mouseleave event ocurred!!!");
// });





// ================= go to Folder Event-Bubbling-Capturing-Delegation================

// uske baad ye ==============================================







// const todoForm = document.querySelector(".form-todo");
// const todoInput = document.querySelector(".form-todo input[type='text']");
// const todoList = document.querySelector(".todo-list");

// todoForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newTodoText = todoInput.value;
//   const newLi = document.createElement("li");
//   const newLiInnerHtml = `
//         <span class="text">${newTodoText}</span>
//         <div class="todo-buttons">
//             <button class="todo-btn done">Done</button>
//             <button class="todo-btn remove">Remove</button>
//         </div>`;
//   newLi.innerHTML = newLiInnerHtml;
//   todoList.append(newLi);
//   todoInput.value = "";
// });

// todoList.addEventListener("click", (e) => {
//   // check if user clicked on done button
//   if (e.target.classList.contains("remove")) {
//     const targetedLi = e.target.parentNode.parentNode;
//     targetedLi.remove();
//   }
//   if (e.target.classList.contains("done")) {
//     const liSpan = e.target.parentNode.previousElementSibling;
//     liSpan.style.textDecoration = "line-through";
//   }
// });


