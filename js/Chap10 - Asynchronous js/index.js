// synchronous programming vs asynchronous programming

// synchronous programming
// synchronous programming single threaded

// console.log("script start");

// for (let i = 1; i < 10000; i++) {
//   console.log("inside for loop");
// }

// console.log("script end");




// Asynchronous programming
// setTimeout → Executes a function once after a specified delay.
// setTimeout 👉 setTimeout expects a function.

// console.log("script start");                      

// const id = setTimeout(() => {    //👉 Returns a timeout ID (here 1), Browser har setTimeout ko unique number (ID) deta hai, Ye ID browser ko batata hai kaunsa timeout hai
//   console.log("inside setTimeout");
// }, 1000);                                

// for (let i = 1; i < 100; i++) {
//   console.log("....");
// }
// console.log("settimeout id is ", id);
// console.log("clearing time out");
// clearTimeout(id);                              //👉 Isi ID ki madad se browser us specific timeout ko cancel karta hai
// console.log("Script end");


// o/p :- 

// script start
// 99....
// settimeout id is  1        //👉 1 aya bcz setTimeout returns an ID so the scheduled task can be uniquely identified and cleared if needed.
// clearing time out
// Script end



// so normally koi bhi setTimeout jab call hoga js bolega ye browser ki functionality hai toh usse dedeta hai and kehta hai count kar 1000ms jab hojaye muje uska callback function de dena then after that ye callback function -> callback queue me chala jaega and event loop dekhega ki jab callstack khali hoga tab ye function bheju
// even if 0ms delay hota still ese hi work karta   




// ❓ Why "inside setTimeout" did NOT print?
// Because clearTimeout(id) cancels the timeout before 1 second is completed, so the callback never goes to the call stack.





// let a="hey";
// setTimeout(a,1000)
// console.log("script start");  //ReferenceError: hey is not defined  bcz 👉 setTimeout expects a function, but you passed a string variable.




//Technically, older browsers allowed strings like:
// setTimeout("console.log('hey')", 1000);     //But this is not recommended (it behaves like eval).


// =========================================================================





// setInterval → Executes a function repeatedly at specified time intervals.
// console.log("script start")
// setInterval(() => {
//   // console.log(total);
//   // console.log(Math.random());
// }, 500);
// console.log("script end");


// so ye bhi same hi work karega browser wait karega jese hi 500ms hoga broswer isse callback queue me bhej dega and jese hi empty hoga call stack ye chalega and this is setIterval so har 500ms fhir ye function run hoga ese hi itne time intervals par 
// and now if time 0ms pe set karde so fhir bhi ye print hoga bcz tab woh jese hi callstack me script likh k free hoga means pura code chal jaega ye print karega 

// and if callback function me complex functionality ho toh jo time diya hai usse jyada bhi lag sakta hai , so yaha pe diya 500ms but jyada time le rha hai
// ex:-

// console.log("script start")
// setInterval(()=>{
//   // let total=0;
//   // for(let i=0; i<1000000000;i++){
//   //   total += i
//   // }
//   // console.log(total)
//   console.log(Math.random())
// },500)
// console.log("script end");






// for this ek naya folder banaya gaya hai setInterval naam se
// intervalidId = id jaega jo clearInterval me kaam aaega  


// const body = document.body;
// const button = document.querySelector("button");
// const intervalId = setInterval(() => {
//   const red = Math.floor(Math.random() * 256);
//   const green = Math.floor(Math.random() * 256);
//   const blue = Math.floor(Math.random() * 256);
//   const rgb = `rgb(${red},${green}, ${blue})`;
//   body.style.background = rgb;
// }, 1000);

// button.addEventListener("click", () => {
//   clearInterval(intervalId);
//   button.textContent = body.style.background;
// });

// console.log(intervalId);






// =========================================================




// callback function is a function passed as an argument to another function, which is executed later.



// understand callback

// function myFunc(callback) {
//   console.log("Function is doing task 1 ");
//   callback();
// }



// function myFunc2() {
//   console.log("Function is doing task 2 ");
// }
// myFunc(myFunc2)                 //Function is doing task 1                  Function is doing task 2 

// // or

// myFunc(() => {           //ese direclty pura function bhi dal sakte hai bcz dono same hi hai uper wala bhi pura function hi tha
//   console.log("function is doing task 2");          //Function is doing task 1                  Function is doing task 2 
// });







// function getTwoNumbersAndAdd(number1, number2, onSuccess, onFailure) {    
//   if (typeof number1 === "number" && typeof number2 === "number") {
//     onSuccess(number1, number2);
//   } else {
//     onFailure();
//   }
// }

// function addTwoNumbers(num1, num2) {
//   console.log(num1 + num2);
// }

// function onFail(){
//     console.log("Wrong data type");
//     console.log("please pass numbers only")
// }
// getTwoNumbersAndAdd(4, 4,addTwoNumbers, onFail);      //function ko as argurements pass kardiya







// ===============================================================

// for this callBack folder banaya hai jisme html hai


// callbacks , callback hell, pyramid of doom


// asynchronous programming
const heading1 = document.querySelector(".heading1");
const heading2 = document.querySelector(".heading2");
const heading3 = document.querySelector(".heading3");
const heading4 = document.querySelector(".heading4");
const heading5 = document.querySelector(".heading5");
const heading6 = document.querySelector(".heading6");
const heading7 = document.querySelector(".heading7");
const heading8 = document.querySelector(".heading8");
const heading9 = document.querySelector(".heading9");
const heading10 = document.querySelector(".heading10");


//so hum setTimeout alag alag likh sakte the and wese hi kaam karta but usme prblm thi time ka issue kab konsa execute karna hai isme calculation karni padti jo ki sahi nhi hai and complex app me bhi prblm create kar sakti thi so setTimeout k andhr setTimeout likha taki woh execute hone k baad uske andhr wala ho but it will create callback hell

// Text       Delay   Color

// one        1s      Violet
// two        2s      purple
// three      2s      red
// four       1s      Pink
// five       2s      green
// six        3s      blue
// seven      1s      brown





// callback hell  

// setTimeout(()=>{
//   heading1.textContent = "one";
//   heading1.style.color = "violet";
//   setTimeout(()=>{
//     heading2.textContent = "two";
//     heading2.style.color = "purple";
//     setTimeout(()=>{
//       heading3.textContent = "three";
//       heading3.style.color = "red";
//       setTimeout(()=>{
//         heading4.textContent = "four";
//         heading4.style.color = "pink";
//         setTimeout(()=>{
//           heading5.textContent = "five";
//           heading5.style.color = "green";
//         },2000)
        
//       },1000)
      
//     },2000)
    
//   },2000)
  
// },1000)





// function changeText(element, text, color, time, onSuccessCallback, onFailureCallback) {
//   setTimeout(()=>{
//     if(element){
//       element.textContent = text;
//       element.style.color = color;
//       if(onSuccessCallback){
//         onSuccessCallback();
//       }
//     }else{
//       if(onFailureCallback){
//         onFailureCallback();
//       }
//     }
//   },time)
// }



// // pyramid of doom
// changeText(heading1, "one","violet",1000,()=>{
//   changeText(heading2, "two","purple",2000,()=>{
//     changeText(heading3, "three","red",1000,()=>{
//       changeText(heading4, "four","pink",1000,()=>{
//         changeText(heading5, "five","green",2000,()=>{
//           changeText(heading6, "six","blue",1000,()=>{
//             changeText(heading7, "seven","brown",1000,()=>{
//               changeText(heading8, "eight","cyan",1000,()=>{
//                 changeText(heading9, "nine","#cda562",1000,()=>{
//                   changeText(heading10, "ten","dca652",1000,()=>{
                    
//                   },()=>{console.log("Heading10 does not exist")})
//                 },()=>{console.log("Heading9 does not exist")})
//               },()=>{console.log("Heading8 does not exist")})
//             },()=>{console.log("Heading7 does not exist")})
//           },()=>{console.log("Heading6 does not exist")})
//         },()=>{console.log("Heading5 does not exist")})
//       },()=>{console.log("Heading4 does not exist")})
//     },()=>{console.log("Heading3 does not exist")})
//   },()=>{console.log("Heading2 does not exist")})
// },()=>{console.log("Heading1 does not exist")})