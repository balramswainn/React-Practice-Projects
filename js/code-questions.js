// 1. Object me bas numeric value ko hi multiply karna hai 20 se?

// let obj= {
//   one : 20,
//   two : "two",
//   three: 40
// }

//example :- 
// obj.one = 400;
// or
// obj.one = obj.one *200;   //-> {one: 4000, two: 'two', three: 40}


// for(let key in obj){ 
//   if(typeof obj[key] === "number"){     //We compare with "number" because typeof always returns the data type as a string.
//     obj[key] = obj[key] * 20               // obj.one = 20 * 20
//   }
// }

// console.log(obj)     //-> {one: 400, two: 'two', three: 800}




// 1.1 new object banana hai ?

// let newobj = {};

// for(let key in obj){
//   if( typeof obj[key] === "number"){
//     newobj[key] = obj[key] * 20;
//   }else{
//     newobj[key] = obj[key]
//   }
// }
// console.log(newobj)    //-> {one: 400, two: 'two', three: 800}



// ===================================================


// let name="jerry"
// console.log(name.slice(1)) //-> erry
// console.log(name.slice(-1)) //-> y

// let name="e"
// console.log(name.slice(1))   //-> ""  empty string

// "e" ki length = 1, slice(1) ka matlab: index 1 se end tak, Lekin index 1 par koi character exist hi nahi karta , 
// Isliye result: empty string ("")


// ---------------------------------


// 2. Reverse the string using recursion ?\

// In recursion, each function call waits for the result of the next call, so the remaining operation stays pending on the call stack. Once the base case is reached, the function starts returning and completes the pending operations, which produces the reversed string.





// function reverseString(str) {
//   if (str === "") {
//     return "";
//   }
//   return reverseString(str.slice(1)) + str[0];       //ye fhirse call ho rha hai, so jab last me "o" bachega tab empty string return hoga
// } 
// console.log(reverseString("hello"));  





// return reverseString(str.slice(1)) + str[0];   
  // Is line ka main rule: Pehle left side complete hoga, tab hi + str[0] lagega, JavaScript expression ko left-to-right evaluate karta hai. so ye continous call hota hi rahega jab tak usse result nhi milta means jab tab str==="" na hojaye tab tak call karte rahega , ❌ "h" tab tak add nahi ho sakta ,jab tak reverseString("ello") ka result nahi aa jata.  -> “Pehle function call complete karo, baad me + "h" lagayenge.”  

  // "h" kahi gaya nahi -> "h" store ho gaya is function ke execution context me Function pause ho gaya , Yahi pause = call stack me pending

  //Ye sab call stack me pending kyu rehta hai?   “Mujhe result chahiye reverseString("ello") ka, tab main + "h" karunga.”
  // Par result abhi mila hi nahi 😄 Toh JS is function ko pause karke stack me rakh deta hai. Is pause ko hi hum bolte hain: Pending in call stack

// reverse("hello") → waiting for reverse("ello")
// reverse("ello")  → waiting for reverse("llo")
// reverse("llo")   → waiting for reverse("lo")
// reverse("lo")    → waiting for reverse("o")
// reverse("o")     → waiting for reverse("")
// reverse("")      → base case found → return ""


// Ab jab base case mila, JS bolta hai: “Okay, ab upar jaake pending kaam complete karte hain.”


// ""        + "o" → "o"
// "o"       + "l" → "ol"
// "ol"      + "l" → "oll"
// "oll"     + "e" → "olle"
// "olle"    + "h" → "olleh" 

// The empty string is returned only by the base case. The str[0] used in concatenation belongs to each parent function call (har function call pe jo str[0] tha woh)
// The remaining str[0] values are added because each function call pauses with its return expression incomplete and resumes after the base case returns.Kyunki har function call apna execution context ke saath memory me zinda rehta hai jab tak uska return complete nahi hota. ( if yaaf ho andhr hi andhr woh FEC banata rehta hai bcz return nhi hua + str[0] ruka hua hai so last me jab hua return woh sabko add karte gaaya)
// 👉 Isliye reverse output last me poora banta hai



// =======================================================================
