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
const sectionTodo = document.querySelector(".section-todo");
const info = sectionTodo.getBoundingClientRect();
console.log(info);       //-> DOMRect {x: 29.65625, y: -7.8125, width: 533.6875, height: 444.46875, top: -7.8125, …}



//====================================================