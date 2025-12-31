// important array methods 



// forEach is technically a method that is used for iteration, functioning similarly to a loop. It is a high-order function
//ye bas value deta hai new function return nhi karta

// forEach is non-mutating  means og array ko change nhi karega

//  const numbers = [4,2,5,8];

// numbers.forEach(function(number,index){
//     console.log(`index is ${index} number is ${number}`);   
// });



// const users = [
//     {firstName: "harshit", age: 23},
//     {firstName: "mohit", age: 21},
//     {firstName: "nitish", age: 22},
//     {firstName: "garima", age: 20},
// ]

// users.forEach((user, index)=>{     //index likna ya na likhna optional hai
//     console.log(user.firstName, index);
// })

// for(let user of users){
//     console.log(user.firstName);
// }


// ========================================================================================


// map method   (new array banaega) is non-mutating  means og array ko change nhi karega

// const numbers = [3,4,6,1,8];

// const square = function(number){
    // return number*number; 
// }
// console.log(numbers.map(square)) //->[9, 16, 36, 1, 64]
// console.log(numbers)  //-> [3,4,6,1,8]

// const squareNumber = numbers.map((number, index)=>{
//     return index;
// });
// console.log(squareNumber);   //-> [0, 1, 2, 3, 4]

// const users = [
//     {firstName: "harshit", age: 23},
//     {firstName: "mohit", age: 21},
//     {firstName: "nitish", age: 22},
//     {firstName: "garima", age: 20},
// ]

// const userNames = users.map((user)=>{
//     return user.firstName;
// });

// console.log(userNames);    //-> ['harshit', 'mohit', 'nitish', 'garima']


// ===========================================================================



// filter method is non-mutating  means og array ko change nhi karega

// const numbers = [1,3,2,6,4,8];



// const evenNumbers = numbers.filter((number)=>{
//     return number % 2 === 0;
// });
// console.log(evenNumbers);   //->[2, 6, 4, 8]



//=========================================================================


// reduce  is non-mutating  means og array ko change nhi karega
// const numbers = [1,2,3,4,5, 10];

// aim : sum of all the numbers in array 

// const sum = numbers.reduce((accumulator, currentValue)=>{
//     return accumulator + currentValue;
// },0); //-> initial value

// console.log(sum);
// accumulator , currentValue,  return 
// 0               1              1
// 1               2              3 
// 3               3              6
// 6               4              10
// 10              5              15
// 15              10             25


// const userCart = [
//     {productId: 1, productName: "mobile", price: 12000},
//     {productId: 2, productName: "laptop", price: 22000},
//     {productId: 3, productName: "tv", price: 15000},
// ]


// const totalAmount = userCart.reduce((totalPrice, currentProduct)=>{
//     return totalPrice + currentProduct.price;
// }, 0)

// console.log(totalAmount);
                                  // so start me currentvalue {} thi ... return baadme hota hai uske baad and return k baad 12000
// total price      currentValue     return 
// 0                {}                   12000   
// 12000            22000                34000
// 34000            15000                49000



// =======================================================================================


// sort method    is mutating  means og array ko change  karega
// ASCII TABLE 
//char : ascii value


// '0' : 48
// '1' : 49
// '2' : 50
// '3' : 51
// '4' : 52
// '5' : 53
// '6' : 54
// '7' : 55
// '8' : 56
// '9' : 57


// ':' : 58
// ';' : 59
// '<' : 60
// '=' : 61
// '>' : 62
// '?' : 63
// '@' : 64


// 'A' : 65
// 'B' : 66
// 'C' : 67
// 'D' : 68
// 'E' : 69
// 'F' : 70
// 'G' : 71
// 'H' : 72
// 'I' : 73
// 'J' : 74
// 'K' : 75
// 'L' : 76
// 'M' : 77
// 'N' : 78
// 'O' : 79
// 'P' : 80
// 'Q' : 81
// 'R' : 82
// 'S' : 83
// 'T' : 84
// 'U' : 85
// 'V' : 86
// 'W' : 87
// 'X' : 88
// 'Y' : 89
// 'Z' : 90



// '[' : 91
// '\' : 92
// ']' : 93
// '^' : 94
// '_' : 95
// '`' : 96



// 'a' : 97
// 'b' : 98
// 'c' : 99
// 'd' : 100
// 'e' : 101
// 'f' : 102
// 'g' : 103
// 'h' : 104
// 'i' : 105
// 'j' : 106
// 'k' : 107
// 'l' : 108
// 'm' : 109
// 'n' : 110
// 'o' : 111
// 'p' : 112
// 'q' : 113
// 'r' : 114
// 's' : 115
// 't' : 116
// 'u' : 117
// 'v' : 118
// 'w' : 119
// 'x' : 120
// 'y' : 121
// 'z' : 122
// '{' : 123
// '|' : 124
// '}' : 125


// sort  

// 5,9,1200, 400, 3000
// 5, 9, 400, 1200, 3000 (expected)

// const numbers = [5,9,1200, 400, 3000]
// numbers.sort();       // pehle string me convert karta hai fhir sort kart hai
// console.log(numbers)  //-> [1200, 3000, 400, 5, 9]

// ["5", "9", "1210", "410", "3000"]        imp: 1210 -> 1 -> 49 (bas first digit ka hi dekhega ascii code )
// [53, 57, 49, 52, 51]    -> ASCII code

// const userNames = ['harshit', 'abcd', 'mohit', 'nitish', 'aabc', 'ABC', 'Harshit'];
// userNames.sort();
// console.log(userNames);   //->  ['ABC', 'Harshit', 'aabc', 'abcd', 'harshit', 'mohit', 'nitish']   capital letter pehle sort hoga bcz unka ascii code kam haia isiliye opehle aaye and small letters ka jyada hai 

// const numbers = [5,9,1200, 410, 3000];
// numbers.sort((a,b)=> b-a);
// console.log(numbers);  //-> [3000, 1200, 410, 9, 5]

// numbers.sort((a,b)=>a-b);
// console.log(numbers);  //-> [5, 9, 410, 1200, 3000]

// 1200,410 
// a-b ---> 790
// a-b ---> postive (greater than 0) ---> b, a   (positive aya toh b pehle likhega )
// 410 , 1200

// a-b ---> negative ----> a,b   (negative aya toh a pehle likhega )
// 5, 9 ---> -4 


// price lowToHigh HighToLow 
// const products = [
//     {productId: 1, produceName: "p1",price: 300 },
//     {productId: 2, produceName: "p2",price: 3000 },
//     {productId: 3, produceName: "p3",price: 200 },
//     {productId: 4, produceName: "p4",price: 8000 },
//     {productId: 5, produceName: "p5",price: 500 },
// ]


// const lowToHigh = products.slice(0).sort((a,b)=>{    //slice isiliye taki og array change na ho slice creates a new array 
//     return a.price-b.price
// });
// console.log(lowToHigh)  // kam price se high price 
// console.log(products)  // og array 


// const highToLow = products.slice(0).sort((a,b)=>{
//     return b.price-a.price;
// });
// console.log(highToLow)  




// const users = [
//     {firstName: "harshit", age: 23},
//     {firstName: "mohit", age: 21},
//     {firstName: "nitish", age: 22},
//     {firstName: "garima", age: 20},
// ]


// users.sort((a,b)=>{
//     if(a.firstName > b.firstName){
//         return 1;
//     }else{
//         return -1;
//     }
// });

// console.log(users);



// =================================================



// find method  (first element return karega jo condition satisfy karega woh )

// const myArray = ["Hello", "catt", "dog", "lion"];


// const ans = myArray.find((string)=>string.length===3);
// console.log(ans);  //-> dog

// const users = [
//     {userId : 1, userName: "harshit"},
//     {userId : 2, userName: "harsh"},
//     {userId : 3, userName: "nitish"},
//     {userId : 4, userName: "mohit"},
//     {userId : 5, userName: "aaditya"},
// ];

// const myUser = users.find((user)=>user.userId===3);
// console.log(myUser);  //-> {userId: 3, userName: 'nitish'}



// =========================================================


// every method   (sabelelement condition satisfy karega toh hi true return karega)

// const numbers = [2,4,6,9,10];
// const ans = numbers.every((number)=>number%2===0);
// console.log(ans); //false

// const userCart = [
//     {productId: 1, productName: "mobile", price: 12000},
//     {productId: 2, productName: "laptop", price: 22000},
//     {productId: 3, productName: "tv", price: 35000},
// ]


// const ans = userCart.every((cartItem)=>cartItem.price < 30000);
// console.log(ans);  //-> false



// =================================================================


// some method    ( even one element stisfies the condition toh ye true return karega)

// const numbers = [3,5,11,9];

// kya ek bhi number esa hai jo even hai 

// const ans = numbers.some((number)=>number%2===0);
// console.log(ans); //-> false

// const userCart = [
//     {productId: 1, productName: "mobile", price: 12000},
//     {productId: 2, productName: "laptop", price: 22000},
//     {productId: 3, productName: "tv", price: 35000},
//     {productId: 3, productName: "macbook", price: 250000},
// ]

// const ans = userCart.some((cartItem)=>cartItem.price > 100000);
// console.log(ans);  // true  product 3 is has high price



//======================================================================


// fill method 
// value , start , end 

// const myArray = new Array(10).fill(0);
// console.log(myArray);  //-> [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// const myArray = new Array(6).fill(-10);
// console.log(myArray);    //-> [-10, -10, -10, -10, -10, -10]

// const myArray = [1,2,3,4,5,6,7,8];
// myArray.fill(0,2,5);   // 0 fill karna hai , 2 index se-> isse start karna hai , 5 index -> means 5 k pehle tak hi change hoga 5 nhi
// console.log(myArray);  //-> [1, 2, 0, 0, 0, 6, 7, 8]



//===================================================================



// splice method 
// start , delete , insert 

// const myArray = ['item1', 'item2', 'item3'];

// delete
// const deletedItem = myArray.splice(1, 2);
// console.log("delted item", deletedItem);
// insert 
// myArray.splice(1, 0,'inserted item');

// insert and delete 
// const deletedItem = myArray.splice(1, 2, "inserted item1", "inserted item2")
// console.log("delted item", deletedItem);
// console.log(myArray);