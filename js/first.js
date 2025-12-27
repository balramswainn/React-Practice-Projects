// 1. Netscape navigator - 1995
// Brendan eich - js creator
// Mocha - js first name
// livescript - js second name
// javascript - js third name

// internet explorer -> jscript

// ECMAScript (ES) is a programming language standard that forms the core of popular scripting languages like JavaScript. It is developed and maintained by Ecma International's Technical Committee 39 (TC39) and published as the ECMA-262 specification. 

// ES6 : 2015
// ES6 : ES2015  

// Babel is most commonly known as a JavaScript compiler that converts modern JS code (like ES6+) into older, compatible versions for broader browser support

// keyword is a reserved word with a special meaning that cannot be used as an identifier (like a variable or function name). Examples include const, function, and if. 

// variables are containers for storing data values. they are casesensitive

// string is a primitive data type used to represent and manipulate a sequence of characters, essentially textual data. Strings are immutable, meaning their contents cannot be changed after creation, and any method that seems to modify a string actually returns a new one. 

// "use strict"enables strict mode in JavaScript Strict mode enforces stricter parsing and error handling on your code, which helps you write cleaner, safer, and more robust JavaScript by catching common mistakes and disallowing "unsafe" or poorly thought-out features of the language. 






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



// strings are immutable in JavaScript means that once a string value is created, its content cannot be changed. 
// ex:

// let name = "jerry"
// console.log(name.toUpperCase())   // -> JERRY
// console.log(name) // -> jerry   change karne k baad bhi nhi badli value lowercase me hi hai

// name = name.toUpperCase() 
// console.log(name) // -> JERRY .... value ko badal nhi sakte but value ko  reassigned kar sakte hai wohi variable me   

// or

// let name2 = name.toUpperCase() 
// console.log(name2) // -> JERRY .... aghe ese value change karne k baad store karenge durse variable me 


// ----------------------
 

// trics

// let age = 22;
// age = age + "";
// console.log(typeof(age)) //-> string

// let myStr = +"34";
// console.log(typeof myStr) //-> number

// let str1 = "20";
// let str2 = "40";

// let newstr = str1 + str2;
// console.log(newstr)  -> 2040
// let newstr2 = +str1 + +str2;
// console.log(newstr2) -> 60 



// bug -> typeof null -> object     ye null hona chahiye tha but object dikha rha hai so ye bug 



// ----------------------------------------------



// BigInt  is a built-in JavaScript numeric data type used to represent whole numbers larger than the maximum value that the standard Number type can safely handle, which is Number.MAX_SAFE_INTEGER (2⁵³ - 1, or 9,007,199,254,740,991). 

// let myNumber = BigInt(12);   -> 12n
// let sameNumber = 123n;
// console.log(typeof sameNumber)  -> bigint