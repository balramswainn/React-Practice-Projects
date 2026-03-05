
function customRender(mainContainer,reactElement){
  let domElement = document.createElement(reactElement.type);
  domElement.innerHTML=reactElement.children;

  for(let prop in reactElement.attr){
    console.log(reactElement.attr[prop])   //-> link to google
    console.log(reactElement.attr.prop)    //-> undefined   -> prop ek variable hai jisme key ka naam store hota hai. prop = "href" so Correct access Ye dynamic key access karta hai. reactElement.attr[prop]
    if(prop === 'chidlren') continue;   //children bhi attributes me aa jaye to problem hogi. means reactElement me  attr object k andhr <a children="text"> Jo invalid attribute hai. so isiliye 👉 agar children aaye to skip karo.
    domElement.setattribute(prop,reactElement.attr[prop]);
  }

 mainContainer.append(domElement)

}
// React applications typically use a bundler (such as Vite, Webpack, or Parcel). The bundler works together with tools like Babel behind the scenes.

// Babel’s job is to transpile modern JavaScript and JSX syntax into standard JavaScript that browsers can understand.

// When we write JSX in React, Babel converts it into React element objects using React.createElement(). React then uses these objects to build the Virtual DOM, compare changes, and finally update the real DOM, which is displayed in the browser.

// Flow :-  JSX → Babel converts it to React.createElement() → React creates element objects → React updates the DOM.

const reactElement={       
  type:'a',
  attr:{
    href:'https://www.google.com',
    alt:"link to google"
  },
  children:"go to this link"
}

let mainContainer =document.getElementById('root')  //But better practice: 👉 function call ke paas likhna 1️⃣ Code more readable 2️⃣ Variables jab needed ho tab declare karo Agar top pe likhoge:Tab track karna mushkil hota hai.
customRender(mainContainer,reactElement)

