// closures
// A closure in JavaScript is a function that remembers and accesses variables from its surrounding scope (its lexical environment), even after the outer function has finished executing. Every function in JavaScript is inherently a closure. \

// A closure is a function that has access to its lexical scope even after the parent scope has finished executing.

// Lexical environment is the current scope of a function along with references to its parent scopes, determined by where the code is written.
//  Lexical scope means JavaScript determines variable access based on where the code is written, not where it is executed.


// function can return functions

// function outerFunction(){
//     function innerFunction(){
//         console.log("hello world")
//     }
//     return innerFunction;
// }

// const ans = outerFunction();
// // console.log(ans);         // innerfunction ka function definition
// ans();                       // hello world



// function printFullName(firstName, lastName){        //------ 1   
//     function printName(){               //-----2.1
//         console.log(firstName, lastName);
//     }
//     return printName;                   //------2.2      // 👉 Memory creation phase me koi function call hota hi nahi. 
// }

// const ans = printFullName("harshit", "sharma");     // --------2

// ans();       //->  harshit sharma                   //------3       👉 Memory creation phase me koi function call hota hi nahi.


// so  Global execution context chalega jisse  
// 1. Memory creation phase =  window:{}, this: window , printFullName= function definition , ans = uninitalized .
// 2. Execution phase =  printFullName (Kuch bhi execute nahi hota. Function sirf memory me available rehta hai, jab tak usko explicitly call na kiya jaye.)
//                      ans =printFullName("harshit", "sharma")  isme function call hua hai so iska Function Execution Context banega 

// Call stack -> GEC -> FEC

            //   Function Execution Context
            //  1. Local Memory creation phase =  arguments:["harshit", "sharma"], firstName :harshit, lastName :sharma, printName:function definition
            //  2. Execution phase = printName , return printName ( so const ans = ye function store hoga so now -> const ans = printName) (bcz of closure jab ye return hoga ye firstName,lastName ka value leke return hoga ki inki jarurat padh sakti hai)
  
//  Call stack -> GEC -> FEC ( ye nikal jaega )

// now -> const  ans = function printName(){ console.log(firstName, lastName); }  + value of both("harshit", "sharma")

// Global execution context chalega
// 1. Memory creation phase =  window:{}, this: window , printFullName= function definition , ans = function definition .-> idhr ininitiaized hat gaya
// 2. Execution phase =  printFullNAme , ans() -> ye call hua iska ab alag se FEC banega 

// Call stack -> GEC -> FEC

            //   Function Execution Context
            //  1. Local Memory creation phase =  arguments:[],
            //  2. Execution phase = firstName : ?, lastName :?  console.log(firstName, lastName) hai na but value nhi hai bcz uper wala jo function woh execute hogya na and call stack se bhi nikal gaya uske passs value thi dono ki  ab ye apne lexical scope k pass jata hai but uske pass bhi nhi hai ( GEC k pass but value FEC k pass thi but ab woh hat ye wala FEC agya hai)  but we have closure so ye printName apne lexical environment k sath return hoga ->  +value of both("harshit", "sharma") bhi return hogyi so print ho jaega console me 



// ==============================

// closures example

// function hello(x){
//     const a  = "varA";
//     const b = "varB";
//     return function(){
//         console.log(a,b,x);
//     }
// }

// const ans = hello("arg");
// ans();




//----------------------------------

//const myFunction = power => number => number**power  (can write like this also) 

// function myFunction(power){
//     return function(number){
//         return number ** power
//     }
// }



// const square = myFunction(2);
// const ans = square(3);
// console.log(ans);      //-> 9      (3**2 = 9)


// const cube = myFunction(3);
// const ans2 = cube(3);
// console.log(ans2);  //->  27    (3**3 = 27)




// =======================================



// function func(){
//     let counter = 0;
//     return function(){
//         if(counter < 1){
//             console.log("Hi You Called me");
//             counter++;
//         }else{
//             console.log("Mai already ek bar call ho chuka hoon!");
//         }
//     }
// }

// const myFunc = func();
// myFunc();   //->Hi You Called me
// myFunc();   //->Mai already ek bar call ho chuka hoon!


