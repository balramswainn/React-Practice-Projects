// const rootNode = document.getRootNode();
// console.log(rootNode)                                   //-> #document   object

// const htmlElementNode = rootNode.childNodes;            //->NodeList [html]       ek child hai html->   NodeList [html] > 0:html  length: 1  >[[Prototype]]: NodeList

// const htmlElementNode = rootNode.childNodes[0];
// console.log(htmlElementNode)                            //->     <html>   ek hi tha so [0] se html hi milega            

// console.log(htmlElementNode.childNodes); //NodeList(3) [head, text, body]         bcz head k child yehi hai

// const headElementNode = htmlElementNode.childNodes[0];   //-> <head>...</head>
// const textNode1 = htmlElementNode.childNodes[1];         //-> #text
// const bodyElementNode = htmlElementNode.childNodes[2];   //-> <body>...</body>

// console.log(headElementNode.nextSibling);  //->#text   bcz next line kiya tha na 
// console.log(headElementNode.nextSibling.nextSibling);  //-> <body>...</body>   
// console.log(headElementNode.nextElementSibling);       //-> <body>...</body>   

// console.log(headElementNode.childNodes);     //->NodeList(5) [text, title, text, script, text] 
// //  text nodes new lines, spaces, and indentation ko represent karte hain jo HTML me likhe hote hain.



// sibling relation 

// const h1 = document.querySelector("h1");
// const body = h1.parentNode.parentNode;       //-> <body>...</body>       //parent ka parent
// body.style.color = "#efefef";
// body.style.backgroundColor = "#333"


// const body = document.body;       //-> <body>...</body>
// body.style.color = "#efefef";
// body.style.backgroundColor = "#333"

// const head = document.querySelector("head");    //-> <head>...</head>
// const title = head.querySelector("title");   //-> <title>Dom traversing</title>
// console.log(title.childNodes);                //->NodeList [text]

// const container = document.querySelector(".container");      //-> <div class="container">...</div>
// console.log(container.children);   //-> HTMLCollection(2) [h1, p]


