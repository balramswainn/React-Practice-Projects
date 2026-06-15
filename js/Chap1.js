// 1. Netscape navigator - 1995
// Brendan eich - js creator
// Mocha - js first name
// livescript - js second name
// javascript - js third name

// internet explorer -> jscript.

// ECMAScript is the official standard of JavaScript managed by Ecma International. It defines how JavaScript should work and what  rules, syntax, and features that JavaScript follows. New JavaScript features like let, const, arrow functions, and classes are introduced through new ECMAScript versions.
// It serves as the foundational rulebook and core standard that languages like JavaScript, JScript, and ActionScript are based upon, ensuring that code runs consistently across all web browsers and environments.
//  It is developed and maintained by Ecma International's Technical Committee 39 (TC39) and published as the ECMA-262 specification. 

// ES6 : 2015
// ES6 : ES2015  


// Babel is a JavaScript compiler that converts modern JavaScript code into older JavaScript code so it can run in older browsers.We use Babel to ensure that modern JavaScript features(like ES6+) work across older browsers that do not support them.

// keyword is a reserved word with a special meaning that cannot be used as an identifier (like a variable or function name). Examples include const, function, and if. 

// variables are containers for storing data values. they are casesensitive

// string is a primitive data type used to represent and manipulate a sequence of characters, essentially textual data. Strings are immutable, meaning their contents cannot be changed after creation, and any method that seems to modify a string actually returns a new one. 

// "use strict" enables strict mode in JavaScript Strict mode enforces stricter parsing and error handling on your code, which helps you write cleaner, safer, and more robust JavaScript by catching common mistakes and disallowing "unsafe" or poorly thought-out features of the language. 

// use strict" enables strict mode in JavaScript, which helps catch common coding mistakes and makes the code more secure.Prevents accidental global variables .Makes code more secure and easier to debug.

// 1. Undeclared Variables Ko Allow Nahi Karta :
//  "use strict";
// x = 10; // ❌ ReferenceError

// 2. Duplicate Parameters Allow Nahi
// "use strict";
// function add(a, a) { // ❌ Error }

// 3. Delete Restrictions
// "use strict";
// let name = "Balram";
// delete name; // ❌ Error

// 4. this Ka Safer Behavior
// "use strict";
// function test() {
//   console.log(this);
// }
// test();  //->  undefined....window -> hota without use strict

// Modern JS modules (import/export) automatically strict mode me hote hain. // Automatically strict mode :- export const name = "Balram";
// Isliye React, Next.js, Node ES Modules me mostly "use strict" manually nahi likhna padta.


// ==============================================





// Mandatory Rules for Variables :

// Allowed Characters: Names can contain only letters (A-Z, a-z), digits (0-9), underscores (_), and dollar signs ($).

// Cannot Start with a Digit: The first character of a variable name must be a letter, an underscore (_), or a dollar sign ($).

// Case-Sensitivity: JavaScript is case-sensitive, meaning age and Age are treated as two different variables.

// Reserved Words: You cannot use JavaScript reserved keywords (e.g., let, const, if, function, class, return) as variable names.

// No Spaces or Hyphens: Variable names cannot contain spaces or hyphens (-), as hyphens are reserved for subtraction operations. 


// var name = "balram";  
// var name = "jerry";
// console.log(name)   //this will not give an error yaha 2 variable declare hogya

// let surname = "balram";
// let surname = "jerry";
// console.log(surname)  //SyntaxError: Identifier 'surname' has already been declared 

// let surname = "balram";
//  surname = "jerry";
//  console.log(surname)  //value change ho jaegi 

// const name = "balram"
// name = "jerry"
// console.log(name)  // TypeError: Assignment to constant variable.
// console.log(name + "swain") // o/p : balramswain ... const cannot be reassigned to a different value or reference, but the contents of mutable data types like objects and arrays can be changed (mutated). 




// =========================================================================




// String 

// index :- 
// b a l r a m
// 0 1 2 3 4 5

// length :- 
// b a l r a m
// 1 2 3 4 5 6

// let name = "balram      "
// console.log(name.length)  // o/p -> 12 ...space bhi gina 





// Strings are immutable, which means their contents cannot be changed after creation. However, variables holding strings can be reassigned to a new string value. Reassignment changes the variable's reference, not the original string itself.


// strings are immutable in JavaScript means that once a string value is created, its content cannot be changed. 
// ex:
// let str = "Hello";

// str[0] = "Y";
// console.log(str) //-> Hello



// let name = "jerry"
// console.log(name.toUpperCase())   // -> JERRY
// console.log(name) // -> jerry   change karne k baad bhi nhi badli value lowercase me hi hai

// name = name.toUpperCase() 
// console.log(name) // -> JERRY .... value ko badal nhi sakte but value ko  reassigned kar sakte hai wohi variable me   

// or

// let name2 = name.toUpperCase() 
// console.log(name2) // -> JERRY .... aghe ese value change karne k baad store karenge durse variable me 

// let first = "balram";
// let sec = first.toUpperCase();
// console.log(sec)   //-> BALRAM
// console.log(first)  //-> balram    ye change nhi hua 

 

// ----------------------
 

// trics

// let age = 22;
// age = age + "";
// console.log(age) //-> 22
// console.log(typeof(age)) //-> string

// let myStr = +"34";
// console.log(typeof myStr) //-> number

// let str1 = "20";
// let str2 = "40";

// let newstr = str1 + str2;
// console.log(newstr)  -> 2040
// let newstr2 = +str1 + +str2;   //-> number ban gye
// console.log(newstr2) -> 60 

// ========================================

// (null > 0) -> false
// (null == 0) -> false
// (null >= 0) -> true  comparison operator convert null to number

// true -> 1
// false-> 0
// null -> 0
// ""   -> 0
// '5'  -> 5
// 'abc'-> NaN
// undefined -> NaN

// "a-b" -> NaN
// ' 1'+2+2 -> '122'
//   8 +'5' -> '85'
//  '5'+ 8  -> '58'
//   8 -'5' -> 3
//  '5'- 8  -> -3
//  '5'-'8' -> -3

//  '1'--'1' ->  2
//  '1'++'1' -> '1'+ 1 -> '1' + '1'->'11'  (so pehle +1 -> number ban gya fhir '1' + k wajah se fhir "1" string)
//  '1'-+'1' -> '1'- 1 -> 1 - 1 -> 0
//  '1'+-'1' -> '1'+ (-1) -> '1+ '-1' -> '1-1'

// "10"+true -> 10true
// "5"+null -> 5null
// "5"+{} -> 5[object object]
// true-false-> 1
// '5'-true -> 4  




//symbol 
// const uniqueId = Symbol('description');
// console.log(uniqueId)  //-> Symbol(description)



// bug -> typeof null -> object     ye null hona chahiye tha but object dikha rha hai so ye bug 
 
// console.log(typeof 22)   //-> number


// console.log(typeof(22))  //-> number
// console.log(typeof(null))  //-> object
// console.log(typeof("d"))  //-> string
// console.log(typeof(Symbol('description')))  //-> symbol
// console.log(typeof(true))  //-> boolean
// console.log(typeof(22n))  //-> bigint
// console.log(typeof(undefined))  //-> undefined

// console.log(typeof({}))  //-> object
// console.log(typeof(["ff",8]))  //-> object
// console.log(typeof(function(){}))  //-> function



// ----------------------------------------------



// BigInt  is a built-in JavaScript numeric data type used to represent whole numbers larger than the maximum value that the standard Number type can safely handle, which is Number.MAX_SAFE_INTEGER (2⁵³ - 1, or 9,007,199,254,740,991). 

// let myNumber = BigInt(12);   //-> 12n
// let sameNumber = 123n;       //-> ese bhi bigint likh sakte hai 
// console.log(typeof sameNumber)  -> bigint

// let normalNumber = 10 ;
// console.log(sameNumber + normalNumber)  // -> TypeError: Cannot mix BigInt and other types, use explicit conversions


// -----------------------------------------------

// loose equality vs strict equality

// let num1 = 7;
// let num2 ="7";

// console.log(num1 == num2 ) //-> true
// console.log(num1 === num2 ) //-> false    compares the value but also the data types

// console.log(num1 != num2) //-> false   only comapres the value
// console.log(num1 !== num2) //-> true 

// -----------------------------------------------

// falsy values:- false,"",null,0,undefined
// truthy values:- true,"hey",12,-1

//--------------------------------------------------


//  else if

// const temp = 15;

// if(temp < 0 ){
//   console.log(" extemely cold outside")
// }else if(temp < 10){
//   console.log("it is chilly")
// }else if(temp < 16){
//   console.log(" normal")
// }else if(temp < 25){
//   console.log("warm")
// }else if(temp < 35){
// console.log("hot")
// }

// console.log("hello ")

// o/p :- normal    -> jo pehle condition match kiya bas fhir execution bahaar jump  
// hello  


// ----------------------------------------------------------

// while loop

// let i = 0;

// while( i < 5){
//   console.log(i);
//   i++;
// }

// o/p -> 0 1 2 3 4 




//for loop

// for(let i=0; i<10;i++){     // i ka valu 0 hai and jb tak condition true ha chalte rahegi jese hi false hogi loop ruk jaega
//   console.log(i)           //o/p :->  0 1 2 3 4 5 6 7 8 9    
// }

// console.log(i)    -> refernce error bcz let -> block scope variable banata hai toh i bahar exist nhi karta 


// for(var i=0; i<10;i++){    
//   console.log(i)
// }
// o/p :->  0 1 2 3 4 5 6 7 8 9    -> not 10 bcz uspe condition satisfy ho jata hai 
// console.log(i)    //-> 10 bcz var only creates function scope variable  



// let i=0
// for( i<10; i++ ){    
//   console.log(i)
// }
// o/p :->  0 1 2 3 4 5 6 7 8 9    
// console.log(i)    //-> 10 bcz i ko bahar declare kiya hai  


//do while loop.... condition false ho toh bhi ek baar toh chalega hi

// let i=0;
// do{
//   console.log(i);
//   i++;
// }while(i<10)




// =========================================================


// localStorage  (setItem, getItem , removeItem)

// let obj ={
//     name:"jerry",
//     surname:"swain"
// }

// localStorage.setItem("obj",JSON.stringify(obj))     // browser k localstorage me save kardiya stringify karke   ( js object -> json string format )
// let final=JSON.parse(localStorage.getItem("obj"))  //  localstorage se object get karne k liye parse karke  ( json string format  -> js object )
// console.log(final)
// localStorage.removeItem("obj")   // localstorage se object remove karne k liye


// =====================

// let n=10;
// console.log(n++) //-> 10
// console.log(n) //->11
// console.log(n++) //-> 11
// console.log(n++) //-> 12
// console.log(n) //-> 13

// console.log(n--) //-> 13
// console.log(n)   //-> 12
// console.log(--n) //-> 11



// console.log(010)  //-> 8  octal (base 8) maana jata tha
// console.log(00001 === 1) //->true

// ------------

// "use strict"
// console.log(010)    //-> Uncaught SyntaxError: Octal literals are not allowed in strict mode. 
// console.log(00001 === 1) //-> Uncaught SyntaxError: Octal literals are not allowed in strict mode. 
// const obj2= new Demo2("jerry2",22,02);  //-> argument me bhi if 0 pehle likhoge toh error
// console.log(0o10) //-> 8  isme error nhi aaega   ....Modern JavaScript: mai octal likhne ka official tarika hai.

// console.log(0010) // 10  Modern JavaScript (strict mode aur most environments) me: simply decimal 10 treat hota hai.
// ========================

// function one(){
//   setTimeout(()=>{console.log("first")})
// }
// function two(){
//   setTimeout(()=>( console.log("sec")))
// }
// function three(){
//   setTimeout(()=>{
//     return (
//       console.log("third"))
//   })
// }

// one();
// two();
// three();


// ======================

// syntax error  
// Parentheses () Single expression ke liye:
// Multiple statements ke liye: Curly Braces {}

// function two(callback){
//   setTimeout(()=>(
//   console.log("sec"); 
//   callback();
//   ),2000)
// }

// function three(callback){
//   setTimeout(()=>{
//     return (
//       console.log("third")
//       callback();
//       )
//   },3000)
// }



// ==========================
// callback hell


// function one(callback){
//   setTimeout(()=>{
//     console.log("first")
//     callback();
//   },1000)
// }
// function two(callback){
//   setTimeout(()=>{
//   console.log("sec"); 
//   callback();
//   },2000)
// }
// function three(callback){
//   setTimeout(()=>{
//       console.log("third")
//       callback();
//   },2000)
// }

// one(()=>{
//   two(()=>{
//     three(()=>{
//       console.log("finished");
//     })
//   })
// });

// Output:

// first
// sec
// third
// finished



// with promises

// function one(){
//   return new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//       resolve("one")
//   },1000)
//   })
// }
// function two(){
//   return new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//       resolve("two")
//   },1000)
//   })
// }


// one().then((res)=>{console.log(res); return two(); })
//      .then((res)=> console.log(res))





// async function test(){
//    const data = fetch("url");
//    console.log(data);
// }

// test();
// Output:
// Promise { pending }
// Haan ✅ await nahi lagaya toh usually Promise object (often pending state me) print hoga, actual resolved value nahi.



// await:
// ❌ pure JavaScript ko nahi rokta
// ✅ sirf current async function ko pause karta hai
// async function test(){
//    console.log("A");
//    await fetch("url");
//    console.log("B");
// }
// console.log("Start");
// test();
// console.log("End");

// o/p:- 
// Start
// A
// End
// (B baad me)