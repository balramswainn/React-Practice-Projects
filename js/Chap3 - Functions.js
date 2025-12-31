//Functions Declaration


// function sumThreeNumbers(number1, number2, number3){
//     return number1 + number2 + number3;
// }

// console.log(sumThreeNumbers(1,2))   //=> NAN(not a number) bcz number3 -> undefined hogya and 1+2+undefined = nan
// console.log(sumThreeNumbers(1,1,1,6)) //=> 3 .... 6 extra hai na waha koi uske liye parameter hi nhi   
 


// function 
// input : array, target (number)
// output: index of target if target present in array 

// function findTarget(array, target){
//     for(let i = 0; i<array.length; i++){
//         if(array[i]===target){
//             return i;
//         }
//     }
//     return -1;
// }
// const myArray = [1,3,8,90]
// const ans = findTarget(myArray, 4);
// console.log(ans);     //-> -1 bcz 4 array me nhi hai


// or

// function findTarget(array,target){
//    return array.findIndex((ele)=>{
//     return ele===target;
//    })
// }


// ============================================================


// Functions Expression

// const sumThreeNumbers = function(number1, number2, number3){
//     return number1 + number2 + number3;
// }
// const ans = sumThreeNumbers(2,3,4);
// console.log(ans); //-> 9


//=============================================================

// Arrow Functions 

// const sumThreeNumbers = (number1, number2, number3) => {
//     return number1 + number2 + number3;
// }

// const ans = sumThreeNumbers(2,3,4);
// console.log(ans); //-> 9



//=====================================================

// hoisting  (only works on function declaration and var declarations)

// hello();   //-> hello world

// function hello(){
//         console.log("hello world");
//     }

// console.log(hello);   //-> undefined  aya bcz of var declaration  || let , const rehta toh reference error
// var hello = "hello world";
// console.log(hello);


//=====================================================

// functions inside function 

// function app(){
//     const myFunc = () =>{
//         console.log("hello from myFunc")
//     }
    
//     const addTwo = (num1, num2) =>{
//         return num1 + num2;
//     }

//     const mul = (num1, num2) => num1* num2;

//     console.log("inside app");
//     myFunc();
//     console.log(addTwo(2,3));
//     console.log(mul(2,3));
// }
// app();   //-> inside app     hello from myFunc     5  6



//=====================================================


// lexical scope  
// Lexical scope means variables are accessible based on where the code is written, not where it is executed.
// Lexical scope is the rule that a function can access variables from its parent scope.
 
// A lexical environment is the internal structure that stores variables and has a reference to its outer (parent) lexical environment, which enables scope chaining.

// const myVar = "value1";

// function myApp(){
    

//     function myFunc(){
//         // const myVar = "value59";
//         const myFunc2 = () =>{
//             console.log("inside myFunc", myVar);
//         }
//         myFunc2();
//     }


//     console.log(myVar);
//     myFunc();
// }

// myApp();

//-> value1
//-> inside myFunc value1


// =======================================================


// block scope vs function scope 


// let and const are block scope
// var is function scope 

// {
//     let name = "jerry";   //block scope
// }
// console.log(name); //-> not defined bcz let and const is black scope ..only accessible inside a block



// if(true){
//     var firstName = "harshit";
//     console.log(firstName);
// }
// console.log(firstName);  //-> harshit     accessible bcz var is function scope



// function myApp(){
//     if(true){
//         var firstName = "harshit";
//         console.log(firstName);  //-> harshit
//     }

//     if(true){
//         console.log(firstName);   //-> harshit
//     }
//     console.log(firstName);   //-> harshit
// }

// myApp();


// var first="first"
// function ran(){
//     var sec="second";
//     if(true){
//         console.log(first)   //->first 
//         console.log(sec)     //-> second
//     }
// }
// console.log(sec)  //-> not defined

// ran();

// =====================================================================


// default parameters 

// function addTwo(a,b){       // Es6 k pehle default parameters ese likhte the
//     if(typeof b ==="undefined"){
//         b = 2;
//     }
//     return a+b;
// }
// console.log(addTwo(2))   //-> 4



// function addTwo(a,b=0,c=2){
//     return a+b+c;   //4+8+2      c=2 default tha na and b=8 bcz default tab kam karega jab value na di ho
// }

// const ans = addTwo(4, 8);
// console.log(ans);  //->14


// =====================================================================


// rest parameters     used to collect all the remaining arguements into an array 

// function myFunc(a,b,...c){
//     console.log(`a is ${a}`);   //-> a is 3
//     console.log(`b is ${b}`);   //-> b is 4
//     console.log(`c is`, c);     //-> [5, 6, 7, 8, 9]
// }

// myFunc(3,4,5,6,7,8,9);



// function addAll(...numbers){
//     let total = 0;
//     for(let number of numbers){
//         total = total + number;
//     }
//     return total;
// }

// const ans = addAll(4,5,4,2,10);
// console.log(ans);   //->25



// ==========================================================================

// param destructuring 

// object 
// react 

// const person = {
//     firstName: "harshit",
//     gender: "male",
//     age: 50
// }

// function printDetails(obj){    //name kuch bhi ho sakta hai 
//     console.log(obj.firstName);   //-> harshit
//     console.log(obj.gender);      //-> male
// }


// function printDetails({firstName, gender, age}){   //object destructure kiya fhir directly name dalkle use kar saktehai
//     console.log(firstName);    //-> harshit
//     console.log(gender);       //-> male
//     console.log(age);          //-> 50
// }

// printDetails(person);

// ==============================================================


// callback functions 

// function myFunc2(name){
//     console.log("inside my func 2")
//     console.log(`your name is ${name}`);
// }

// function myFunc(callback){
//     console.log("hello there I am a func and I can..")
//     callback("harshit");
// }


// myFunc(myFunc2);



// ==============================================================



// function returning function 

// function myFunc(){
//     function hello(){
//         return "hello world"
//     }
//     return hello;
// }

// const ans = myFunc();
// console.log(ans());


// Higher-Order Functions (HOF)
// 👉 Jo function ek function ko accept kare ya return kare, usko HOF bolte hain.
// Map, filter, reduce → ye sab HOF hain.
