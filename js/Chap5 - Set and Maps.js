// iterables 
// jispe hum for of loop laga sakein 
// ex:- string , array are iterable 
// object are not iterable

// const firstName = "Harshit";
// for(let char of firstName){
//     console.log(char);   //-> H a r s h i t  
// }

// const items = ['item1', 'item2', 'item3'];
// for(let item of items){
//     console.log(item);
// }

// array like object 
// jinke pas length property hoti hai 
// aur jiko hum index se access kar sakte hai
// example :- string 

// const firstName = "harshit";
// console.log(firstName.length);  //-> 7
// console.log(firstName[2]);  //-> r




// ===============================================



// Sets (it is iterable) Set is a built-in object that stores collections of unique values of any type, whether primitive values or object references. 
// store data  
// sets also have its own methods
// No index-based access 
// Order is not guaranteed
// unique items only (no duplicates allowed)


// let numbers = new Set([1,2,3,3])
// console.log(numbers)      //-> Set(3) {1, 2, 3}
// console.log(numbers[2])   //-> undefined    bcz No index-based access 


// sets also have its own methods
// const items = ['item1', 'item2', 'item3'];
// const numbers = new Set();
// numbers.add(1);
// numbers.add(2);
// numbers.add(3);
// numbers.add(4);
// numbers.add(5);
// numbers.add(6);
// console.log(numbers)  //-> Set(6) {1, 2, 3, 4, 5, 6}

// numbers.add(items);
// console.log(numbers)  //->  Set(7) {1, 2, 3, 4, 5, 6, Array(3)}

// numbers.add(['item1',"item2"])  //js k liye ye dono alag alag hai isiliye add hogya
// numbers.add(['item1',"item2"])
// console.log(numbers)  //->  Set(9) {1, 2, 3, 4, 5, 6, Array(3), Array(2), Array(2)}

// if(numbers.has(1)){      //-> to check condition when using Set .has()
//     console.log("1 is present")
// }else{
//     console.log("1 is not present")
// }


// for(let number of numbers){
//     console.log(number);
// }



// const myArray = [1,2,4,4,5,6,5,6];
// const uniqueElements = new Set(myArray);
// console.log(uniqueElements)  //-> Set(5) {1, 2, 4, 5, 6}
// let length = 0;
// for(let element of uniqueElements){
//     length++;
// }

// console.log(length);




// ===========================================================================



// Maps  : - A JavaScript Map is an object that can store collections of key-value pairs ,Maps differ from standard objects in that keys can be of any data type.
// map is an iterable

// store data in ordered fashion

// store key value pair (like object)
// duplicate keys are not allowed like objects


// different between maps and objects
// objects can only have string or symbol
// as key 
// in maps you can use anything as key
// like array, number, string 


// object literal 
// key -> string 
// key -> symbol


// const person = {
//     firstName : "harshit",
//     age: 7,
//     1:"one"
// }
// console.log(person.firstName);  //-> harshit
// console.log(person["firstName"]); //-> harshit
// console.log(person[1]); //-> one  type string hai

// for(let key in person){
//     console.log(typeof key);   //-> String
// }




// key value pair

// const person = new Map();
// person.set('firstName', 'Harshit');
// person.set('age', 7);
// person.set(1,'one');
// person.set([1,2,3],'onetwothree');
// person.set({1: 'one'},'onetwothree');
// console.log(person);  //-> Map(5) {'firstName' => 'Harshit', 'age' => 7, 1 => 'one', Array(3) => 'onetwothree', {…} => 'onetwothree'}
// console.log(person.get(1));  //-> one
// console.log(person.keys())   //-> MapIterator {'firstName', 'age', 1, Array(3), {…}}


// for(let key of person.keys()){
//     console.log(key, typeof key);  
// }
//->  firstName  string
//    age  string
//    1  'number'
//    (3)[1, 2, 3]  'object'
//    {1:'one'}  'object'



// object me for of loop nhi laga sakte the but yaha laka sakte hai 
// for(let [key, value] of person){    // array destructure kar rhe hai 
//     // console.log(Array.isArray(key));  //-> false false false true false
//     console.log(key, value)  
// }
//-> firstName Harshit 
//   age 7    
//   1 'one'   
//   (3) [1, 2, 3] 'onetwothree'
//   {1: 'one'} 'onetwothree'




// const person1 = {
//     id: 1,
//     firstName: "harshit"
// }
// const person2 = {
//     id: 2,
//     firstName: "harshta"
// }

// const extraInfo = new Map();
// extraInfo.set(person1, {age: 8, gender: "male"});
// extraInfo.set(person2, {age: 9, gender: "female"});
// // console.log(userInfo);
// console.log(person1.id);                      //->  1
// console.log(extraInfo.get(person1).gender);   //-> male
// console.log(extraInfo.get(person2).gender);   //-> female



// ===========================================================================


// clone using Object.assign   Object.assign() → Shallow Copy

// memory  

// const obj = {
//     key1: "value1",
//     key2: "value2"
// }

// const obj2 = obj;
// obj.key3 = "value3";
// console.log(obj2)  //-> {key1: 'value1', key2: 'value2', key3: 'value3'}  bcz heap memory and same hi reference hai 
// console.log(obj)   //-> {key1: 'value1', key2: 'value2', key3: 'value3'}

// const obj2 = Object.assign({},obj)  //{} = empty object (new object) -> obj ke saare properties ek naye object me copy kar do
// obj.key3 = "value3";
// console.log(obj2)  //-> {key1: 'value1', key2: 'value2'}     //Object.assign() yaha naya object hi bana raha hai — isliye obj2 change nahi hua.
// console.log(obj)   //-> {key1: 'value1', key2: 'value2', key3: 'value3'}
 

// const obj2 = {'key69': "value69",...obj};   //spread operator 
// console.log(obj);  //-> {key1: 'value1', key2: 'value2'}     // ye change nhi hua bcz spread operator use kiya 
// console.log(obj2); //-> {key69: 'value69', key1: 'value1', key2: 'value2'}


// const obj2 = Object.assign({'key69': "value69"}, obj);   
// console.log(obj);  //-> {key1: 'value1', key2: 'value2'}
// console.log(obj2); //-> {key69: 'value69', key1: 'value1', key2: 'value2'}



// =======================================================================


// optional chaining 

// const user  = {
//     firstName: "harshit",
//     // address: {houseNumber: '1234'}
// }

// console.log(user.address)   //-> undefined
// console.log(user.address.houseNumber)  //->  TypeError: Cannot read properties of undefined (reading 'houseNumber')


// console.log(user?.firstName);  //-> harshit    means user exist karta hai toh hi muje firstName de
// console.log(user?.address?.houseNumber);   //->undefined   optional chaining diya isiliye error nhi aya bas undefined aya, nhi diya hota toh error ata typerror :undefined 

// // Jab tak optional chaining use ho raha hai, undefined aane se React me koi runtime error nahi hota.