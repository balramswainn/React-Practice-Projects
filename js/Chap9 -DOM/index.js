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


const sectionTodo = document.querySelector(".section-todo");      //-> <section class="section-todo container">...<section>
console.log(sectionTodo.classList);         //-> DOMTokenList(2) ['section-todo', 'container', value: 'section-todo container']

sectionTodo.classList.add('bg-dark');
sectionTodo.classList.remove("container");
console.log(sectionTodo.classList);         //-> DOMTokenList(2) ['section-todo', 'bg-dark', value: 'section-todo bg-dark']

const ans = sectionTodo.classList.contains("container");
console.log(ans);                   //-> false

sectionTodo.classList.toggle("bg-dark");

const header = document.querySelector(".header");    //-><header class="header bg-dark">...</header>


header.classList.add("bg-dark");
console.log(header.classList);   //-> DOMTokenList(2) ['header', 'bg-dark', value: 'header bg-dark']