// Array

// let names = ["jerry","balram","sumant"]
// names[1]="swain"
// console.log(names) //->  ['jerry', 'swain', 'sumant']

// let obj = {}; //object literal 
// console.log(typeof names)   //-> object
// console.log(typeof obj)  //-> object

// // array methods
// push(); //-> element add karega in the end and length return karega
// pop();  //-> last element remove and also return karega last element

// unshift(); //-> element add karefga start me and length return karega
// shift(); //-> first remove and return krega first wala element 



// ===============================================================

// primitve vs reference data types

// let num1 = 6;
// let num2 = num1;
// console.log( num1 ); //-> 6     
// console.log( num2 ); //-> 6  👉 num2 ko 6 ki copy mili 👉 Dono independent hain
// num1++;                       // 👉 Ye internally hota hai: num1 = num1 + 1;
// console.log("after incrementing num1") 
// console.log( num1 ); //-> 7 
// console.log( num2); //-> 6 

// now why 6?
//Because numbers are primitive data types in JavaScript, assigning one variable to another copies the value, not the reference. Therefore, incrementing num1 does not affect num2. 👉 Ye value type hote hain 👉 Direct value store hoti hai, reference nahi.  Isliye num1++ ka num2 pe koi effect nahi hota.

// let num1 = 6;
// num1++;
// let num2 = num1;
// console.log(num1)  //->7
// num1++
// console.log(num1)  //->8
// console.log(num2)  //->7   bcz num1++ badhane k baad assign kiya num2 me 
// num2++
// console.log(num2) //-> 8
// console.log(num1) //-> 8   ye nhi change hoga 



// reference types 

// let array1 = ["item1", "item2"];

// let array2 = array1;
// console.log( array1 ); //-> ["item1", "item2"]
// console.log( array2 ); //-> ["item1", "item2"]

// console.log(array1===array2); //-> true

// array1.push("item3");

// console.log("after pushing element to array 1");
// console.log( array1 ); //-> ["item1", "item2", "item3"]
// console.log( array2 ); //-> ["item1", "item2", "item3"]

//bcz ye refernce type hai

// array2.push("random")

// console.log( array1 ); //-> ['item1', 'item2', 'random']
// console.log( array2 ); //-> ['item1', 'item2', 'random']



// let array1 = ["item1", "item2"];
// array1 = array1.push("2")   //bcz push length return karta hai toh isne 3 kiya return jo ki array1 me store hogya 
// console.log(array1)  //-> 3 



// =================================================================



// JavaScript data types are categorized into two main groups: Primitive types (which represent simple, immutable values) and Non-Primitive (Reference) types (which represent more complex, mutable structures). 

// JS engine ke paas 2 main memory areas hoti hain:
// 1️⃣ Stack Memory   → primitives (Number,null,String,Symbol,BigInt,boolean)
// 2️⃣ Heap Memory    → non primitives (objects / arrays / functions)

// 1️⃣ Primitive Data Types (Stack memory)
// Example:
// let a = 6;
// let b = a;

// STACK
// ┌─────────┐
// │ a : 6   │
// │ b : 6   │
// └─────────┘
// 👉 Actual value store hoti hai
// 👉 Copy banti hai
// 👉 Koi shared memory nahi

// a++;

// STACK
// ┌─────────┐
// │ a : 7   │
// │ b : 6   │
// └─────────┘
// ✔️ b unchanged




// 2️⃣ Reference Data Types (Heap memory)

// let obj1 = { value: 6 };
// let obj2 = obj1;

// STACK                  HEAP
// ┌───────────────┐      ┌──────────────┐
// │ obj1 : 0x123  │ ───▶ │ { value: 6 } │
// │ obj2 : 0x123  │ ───▶ │              │
// └───────────────┘      └──────────────┘

// 👉 Stack me address (reference) hota hai
// 👉 Heap me actual object hota hai
// 👉 Dono same object point karte hain

// obj1.value++;
// HEAP -> { value: 7 }
// 👉 obj2 ko bhi change dikhega


// Stack me value, Heap me object — stack sirf heap ka address rakhta hai.

// Primitive values are stored directly in stack memory and are copied by value, whereas objects are stored in heap memory and variables hold references to them.

// ❌ “Stack me sab primitive store hote hain” nahi
// ✅ “Stack me variables ke values store hote hain, aur objects ke references store hote hain”



// ======================================



// how to clone array 

// how to concatenate two arrays



// let fullname ="balramswain"   //slice kya karta hai jitna tuje chahiye utna nikal k deta hai immutable hai 
// console.log(fullname.slice(0,1)) //-> b   (0 se 1 k bich ka nikal k de)
// console.log(fullname.slice(0)) //-> balramswain   (0 se sab nikal k de)
// console.log(fullname.slice(1))   //-> alramswain   (1 se sab nikal k de)
// console.log(fullname.slice(-1))  //-> n
// console.log(fullname.slice(-3))  //-> ain
// console.log(fullname.slice(-0))  //-> balramswain




// let array1 = ["item1", "item2"];

// let array2 = array1.slice() //-> ["item1", "item2"]    // slice() hamesha NAYA array banata hai  Chahe tum: slice(0) , slice() dono ka matlab: 👉 copy the array
// console.log(array1 === array2) //-> false      bcz of slice it created new array and 👉 Different memory locations 👉 Different references

// let array2 = array1.slice(0).concat(["item3", "item4"]);   //-> ['item1', 'item2', 'item3', 'item4'] 


// ⚠️ Important point : slice() shallow copy karta hai. Agar array ke andar object hota:
// let a = [{ x: 1 }];
// let b = a.slice();

// a[0].x = 99;
// console.log(b[0].x); // 99    👉 Inner object same reference hota hai
// console.log(a == b)  //-> false     dono array alag hai but inke andhr ka object ka reference same hai
// console.log(a[0].x == b[0].x) //-> true   👉 Dono same object (O1) ke property compare kar rahe ho

// Shallow copy creates a new object but copies references to nested objects, meaning changes in nested parts affect both original and copy; it's fast but shares data.
//slice() naya array banata hai, lekin uske andar ke objects ke references copy karta hai — isliye inner object same rehta hai.
// STACK              HEAP
// a ───▶  A1 ───▶  [ O1 ]                  //a → array (A1)
//                  O1 = { x: 1 }            //Array ke andar → object (O1)
                 

// STACK              HEAP
// a ───▶  A1 ───▶  [ O1 ]
// b ───▶  A2 ───▶  [ O1 ] 

// ✔️ slice() ne: NAYA array banaya (A2) par elements ko copy nahi kiya sirf references copy kiye 👉 Dono arrays ke andar same object (O1) ka reference hai 
// ❓ “Heap me toh actual array/object store hota hai, reference toh stack me hota hai. Phir heap ke andar reference kaise aa gaya?”
// Heap ke andar object store hota hai, lekin object ke properties ya array ke elements   k andhr references ho sakte hain.
// Stack = variables, Heap = objects, Objects ke andar values bhi ho sakti hain, references bhi 
// Array ke elements direct value nahi hote (jab element object ho)  (means array k andhr if object ho toh usse direct nhi likhte uska reference hota hai )
// Stack stores variable references, heap stores objects, and objects can themselves contain references to other objects.   
// Reference koi special memory type nahi hai Reference bhi bas ek value hai (address) Ye value stack me bhi ho sakti hai, heap ke andar bhi



// 1️⃣ Array copy methods
// | Method     | Copy type |
// | ---------- | --------- |
// | `slice()`  | Shallow   |
// | `[...arr]` | Shallow   |
// | `concat()` | Shallow   |



// let array2 = [].concat(array1,["item3", "item4"]); //->  ['item1', 'item2', 'item3', 'item4']
 
// spread operator
// let oneMoreArray = ["item3", "item4"]
// let array2 = [...array1, ...oneMoreArray];   //-> ['item1', 'item2', 'item3', 'item4']

// array1.push("item3");

// console.log(array1===array2);  //-> false  bcz alag spread operator creates a new array  and shallow copy banata hai 
// console.log(array1) 
// console.log(array2)



// 👉 Spread operator [...array] kyun new array banata hai ?
// Spread operator array ke elements ko nikal kar ek naya array literal me daal deta hai — isliye naya array banta hai.
// Spread operator values ko copy karta hai, container ko nahi — isliye naya array banta hai par inner objects same rehte hain.
// let a = [10,20,30]
// let b = [...a];
// Iska matlab JS engine ke liye:       let b = new Array(a[0], a[1], a[2], ...);
// 👉 ...a = unpack elements
// 👉 [] = new array create
// 👉 New array, new reference
// 👉 spread create shallow copy


// ====================================================

// use const for creating array


// const fruits = ["apple", "mango"]; 
// fruits.push("banana");
// console.log(fruits);

//const variable ko reassign nahi kar sakte, par uske andar ke object/array ko mutate kar sakte ho.
//ab ye kese hua stack me bas address(reference store hai) and heap memory -> ["apple", "mango"]  so hum change toh heap me kar rhe hai stack me nhi 
// STACK              HEAP
// fruits ───▶ A1 ───▶ ["apple", "mango"]
// 👉 fruits variable A1 reference ko hold karta hai
// 👉 const ka rule: Reference change nahi ho sakta (jo stack memory me hai )

// 👉 fruits.push("banana"); -> fruits ko reassign nahi kiya ,Sirf same array object mutate kiya ✔️ Allowed

// ❌ Ye allowed nahi hai ->  fruits = ["kiwi"]; // ❌ Error 👉 Kyunki reference change ho raha hai

// const prevents reassignment of the variable, not mutation of the object it refers to.

//isiliye we always use const when assigning  array or object bcz we know ek baar array/object assign karliya toh wapis banega nhi safe rahega isme hi push ,pop and sab methods use karke manipulate kar sakte hai

// Q1. Why do we use const for arrays, objects, and functions?
// We use const to prevent reassignment of the variable reference, ensuring safer and more predictable code while still allowing controlled mutations if needed.

// Q2. Why can we change values inside an array or object declared with const?
// Because const makes the reference immutable, not the object itself—so the object’s internal properties can still be modified.



// =================================

// for of loop in array

// const fruits = ["apple", "mango", "grapes", "fruit4", "fruit5"];
// const fruits2 = [];

// for(let fruit of fruits){
//     fruits2.push(fruit.toUpperCase());
// }
// console.log(fruits2);   //->  ['APPLE', 'MANGO', 'GRAPES', 'FRUIT4', 'FRUIT5']



//==================================================

// for in loop in array

// const fruits = ["apple", "mango", "grapes", "fruit4", "fruit5"];
// const fruits2 = [];

// for(let index in fruits){
//     fruits2.push(fruits[index].toUpperCase());
//     console.log(index)  //-> 0 1 2 3 4
// }
// console.log(fruits2);  //-> ['APPLE', 'MANGO', 'GRAPES', 'FRUIT4', 'FRUIT5']


//==================================================


// array destructuring 
// const myArray = ["value1", "value2", "value3","value4"];
// let myvar1 = myArray[0];
// let myvar2 = myArray[1];
// console.log("value of myvar1", myvar1);  //->  value1
// console.log("value of myvar2", myvar2);  //->  value2

// or

// let [myvar1,myvar2] = myArray;         //Array destructuring hai — myArray ke first two values automatically myvar1 aur myvar2 me assign ho jaate hain.
// console.log("value of myvar1", myvar1);  //->  value1
// console.log("value of myvar2", myvar2);  //->  value2
// let [myvar1, ,myvar2] = myArray;    //ek index skip ho jaegi  myvar2 = "value3"


// let [myvar1, myvar2, ...myNewArray] = myArray;
// console.log("value of myvar1", myvar1);  //->  value1
// console.log("value of myvar2", myvar2);  //->  value2
// console.log(myNewArray);                    //->  ['value3', 'value4']



// ==================================================================



// objects reference type  
// arrays are good but not sufficient 
// for real world data 
// objects store key value pairs 
// objects don't have index

// how to create objects 

// const person = {name:"Harshit",age:22};
// const person = {
//     name: "harshit",
//     age: 22,
//     hobbies: ["guitar", "sleeping", "listening music"]
// }
// console.log(person);

// how to access data from objects 
// console.log(person["name"]);    //js me key string me hoti hai by default
// console.log(person["age"]);
// console.log(person.hobbies);

// how to add key value pair to objects
// person.gender ="make";
// or
// person["person"] = "male";
// console.log(person);


// ==============================


// difference between dot and bracket notaion

// const key = "email";
// const person = {
//     name: "harshit",
//     age: 22,
//     "person hobbies": ["guitar", "sleeping", "listening music"]

// }

// console.log(person["person hobbies"]);  
// console.log(person."person hobbies");  //-> ese likhte toh error(SyntaxError: Unexpected string) ata so correct way bracket notation
// person[key] = "harshitvashisth@gmail.com";  //-> uper declare kiya hai key
// console.log(person);



//============================================

// how to iterate object 

// const person = {
//     name: "harshit",
//     age: 22,
//     "person hobbies": ["guitar", "sleeping", "listening music"]
// }

// for in loop 
// Object.keys 

// for(let key in person){
    // console.log(`${key} : ${person[key]}`); 
    // console.log(key," : " ,person[key]);
// }

// console.log(Object.keys(person));    //->  ['name', 'age', 'person hobbies']
// console.log(Object.values(person));    //->  ['harshit', 22, Array(3)]
// console.log(typeof (Object.keys(person)));  //-> object
// const val = Array.isArray(Object.keys(person));
// console.log(val);                 //-> true


// ===========================================================


// computed properties

// const key1 = "objkey1";
// const key2 = "objkey2";

// const value1 = "myvalue1";
// const value2 = "myvalue2";

//// const obj = {                 //esa chahiye muje so to do this go down
////     objkey1 : "myvalue1",
////     objkey2 : "myvalue2",
//// }

// const obj = {                
    // [key1] : value1,
    // [key2] : value2
// }
// console.log(obj);    //-> {objkey1: 'myvalue1', objkey2: 'myvalue2'}

// or

// const obj = {};
// obj[key1] = value1;
// obj[key2] = value2;
// console.log(obj);    //-> {objkey1: 'myvalue1', objkey2: 'myvalue2'}



//===================================================================

// spread operator

// const array1 = [1, 2, 3];
// const array2 = [5, 6, 7];

// const newArray = [...array1, ...array2, 89, 69];
// console.log(newArray);  //->  [1, 2, 3, 5, 6, 7, 89, 69]

// const newArray = [..."123456789"];
// console.log(newArray);  //-> ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// spread operator in objects

// const obj1 = {    
//   key1: "value1",
//   key2: "value2",
//   key1: "value99"   // key ka name same nhi ho sakta same hai toh jo baadme declare hua woh value ajaegi
// }; 
// console.log(obj1)   //-> {key1: 'value99', key2: 'value2'}

// const obj1 = {
//   key1: "value1",
//   key2: "value2",
// };
// const obj2 = {
//   key1: "valueUnique",
//   key3: "value3",
//   key4: "value4",
// };
                                                               // key1: 'value1' bcz obj1 ko baadme call kiya hai and value overwrite hogya isliye one time key1
// const newObject = { ...obj2, ...obj1, key69: "value69" };   //-> {key1: 'value1', key3: 'value3', key4: 'value4', key2: 'value2', key69: 'value69'}
// const newObject = { ...["item1", "item2"] };                //-> {0: 'item1', 1: 'item2'}
// const newObject = { ..."abcdefghijklmnopqrstuvwxyz" };      //-> {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j', 10: 'k', 11: 'l', 12: 'm', 13: 'n', 14: 'o', 15: 'p', 16: 'q', 17: 'r', 18: 's', 19: 't', 20: 'u', 21: 'v', 22: 'w', 23: 'x', 24: 'y', 25: 'z'}
// console.log(newObject);




// ======================================================

// object destructuring

// const band = {
//   bandName: "led zepplin",
//   famousSong: "stairway to heaven",
//   year: 1968,
//   anotherFamousSong: "kashmir",
// };

// let { bandName, famousSong, ...restProps } = band;
// console.log(bandName);   //-> led zepplin
// console.log(restProps);  //-> {year: 1968, anotherFamousSong: 'kashmir'}
// bandName = "jerry"       // bcz humne let likha hai variable let se ban rha hai 
// console.log(bandName)  //-> jerry   

// const likhte toh change nhi hota
// const {bandName ,...restprops} =band;
// bandName = "jerry"
// console.log(bandName) //->   TypeError: Assignment to constant variable.

// let { bandName:var1, famousSong:var2} = band;         //default name bhi de sakte hai
// console.log(var1,var2)  //-> led zepplin    stairway to heaven


//======================================================================


// objects inside array 

// very useful in real world applications

// const users = [
//     {userId: 1,firstName: 'harshit', gender: 'male'},
//     {userId: 2,firstName: 'mohit', gender: 'male'},
//     {userId: 3,firstName: 'nitish', gender: 'male'},
// ]
// for(let user of users){
//     console.log(user.firstName);    //->  harshit   mohit   nitish
// }



//===============================================================================

// nested destructuring 
// const users = [
//     {userId: 1,firstName: 'harshit', gender: 'male'},
//     {userId: 2,firstName: 'mohit', gender: 'male'},
//     {userId: 3,firstName: 'nitish', gender: 'male'},
// ]

// const [user1,user2,user3] = users;
// console.log(user1)        //-> {userId: 1, firstName: 'harshit', gender: 'male'}

// const [{firstName: user1firstName, userId}, , {gender: user3gender}] = users;
// console.log(user1firstName);  //-> harshit 
// console.log(userId);         //-> 1
// console.log(user3gender);    //-> male