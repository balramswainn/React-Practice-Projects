//async hai kyunki network request time leti hai


//pehle hum sab frontend files views me likh rhe the -> so waha se directly hume app.use(express.urlencoded()); app me likh ke req.body se sab data le lete the and data bhejna ho toh controller me -> res.render karke jis page pe bhejna hai and object me data bhej dete the easily yaha prblm hai bcz front end ka file hi alag hai so dono ko connect toh karna padega data backend k pass aaega kese and front end ko show kese hoga 


// User clicks "Add"
// ↓
// Frontend function runs
// ↓
// addItemToServer(task, date)
// ↓
// fetch() → POST request   ... data stringify karke (json me convert karke) bheja
// ↓
// Server receives data
// ↓
// Server saves in DB
// ↓
// Server sends saved item
// ↓
// response.json()    ->  json data to js object and server data to frontend format me convert
// ↓
// UI update


// 👉 addItemToServer = bridge between frontend & backend
// Ye function frontend se todo data backend ko bhejta hai, server ka response leta hai, aur frontend-friendly format me return karta hai.

export const addItemToServer = async (task, date) => {   //👉 Ye function server me ek naya todo item add karta hai(Store karna server ka kaam hai db me , Frontend sirf bhejta hai) and server se response wapas leta 👉 task aur date frontend se aate hain

  const response = await fetch("http://localhost:3001/api/todo", {  //fetch ka kaam hai server se baat karna , Frontend se server ko data bhejna hai, Server ko bolna hai:“Bhai ye todo save kar lo” bcz Direct function call ❌ (possible nahi) saveToDatabase(task) // ❌ Isliye network request bhejte hain → fetch
  // 👉 Browser backend ko request bhej raha hai, URL = backend ka API endpoint , await = jab tak response na aaye, wait karo, backend me app.js me -> app.use("/api/todo", todoItemsRouter); isliye url k baad api/todo  
    method: "POST",  //👉 “Server, main naya data bhej raha hoon”
    headers: {                     //Server ko bata rahe ho: “Main JSON format me data bhej raha hoon” , ⚠️ Ye header na ho toh backend req.body empty aa sakta hai
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }), //JavaScript object -> converts to ->  JSON string, Ye data backend ke req.body me milega agr nhi kiya toh  Server ko kuch nahi milega (req.body empty)
  });

  // uper fetch se data bheja and response object mila 
  //response = server ka reply “Ye raha saved todo item” -> response ek Response object hai Isme hota hai: status code (200, 201, 400) ,headers, body (data)
  //Server JSON bhejta hai (text form me)  fetch() ko raw response object milta hai
  const item = await response.json();     //👉 Server jo data wapas bheja hai (JSON text) 👉 Usko JS object me convert kar rahe ho 
//Example server response: {  "_id": "abc123",  "task": "Buy milk", "date": "2025-12-24" }
// Frontend ko milta hai: item = { _id: "abc123", task: "Buy Milk", date: "2025-12-24" }  ✔️ Ab ye normal JS object hai
  return mapServerItemToLocalItem(item); //👉 Server ka data frontend ke format me convert kar rahe ho
  // server 👉 Ye server ka format hai 👉 MongoDB / backend style ⚠️ Agar direct server object use karoge: UI messy ho jayega Backend change hua → frontend toot jayega
// { _id: "abc123", task: "Buy milk" }
// ✅ Solution: Mapping function mapServerItemToLocalItem
// frontend
// { id: "abc123", text: "Buy milk" }

};




//jab addItemToServer se response mil gaya (saved item), toh getItemsFromServer kyun chahiye?
// addItemToServer = 1 item create karta hai  .........jab todo add kiya usse ui me show bhi karna hai na toh isliye response bas woh single todo mila jo add kiya
//getItemsFromServer = saare items fetch karta hai

export const getItemsFromServer = async () => {                        // 👉 Server se saare todo items lana
  const response = await fetch("http://localhost:3001/api/todo");        //👉 Backend ko GET request bhej rahe ho 👉 Server bolega: “ye lo saare todos”
  const items = await response.json();                                      //👉 Server ka JSON response JS array/object me convert ho gaya
  return items.map(mapServerItemToLocalItem);               //👉 Har server item ko frontend format me convert 👉 New array return hoti hai (clean, UI-ready)
};



//Ye function server pe todo ko completed mark karta hai aur updated todo frontend-ready format me return karta hai.
export const markItemCompletedOnServer = async (id) => {  //👉 id = jis todo ko complete karna hai “Server, is ID wale todo ko completed kar do”
  const response = await fetch(
    `http://localhost:3001/api/todo/${id}/completed`,   //“Ye specific todo update karna hai”
    {
      method: "PUT",   //👉 PUT ka matlab: Existing data update karna
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};



// /Ye function server se ek todo delete karta hai aur frontend ko batata hai kaunsa id delete hua ,DELETE API normally data return nahi karta isliye hum sirf id return karke frontend state update karte hain.
export const deleteItemFromServer = async (id) => {  //“Server, is ID wale todo ko hata do”
  await fetch(`http://localhost:3001/api/todo/${id}`, {  
    method: "DELETE",  //👉 HTTP method = DELETE  👉 Server: item delete karta hai usually sirf OK status bhejta hai
  });       
  // Yaha response.json() kyun nahi? DELETE ke baad aksar server: 204 No Content ya simple "OK" bhejta hai, 👉 Matlab: Koi JSON data nahi aata
  
  return id; //👉 Frontend ko batane ke liye: “Ye wala item delete ho gaya”
};



//Ye function server ke raw data ko frontend ke clean format me convert karta hai.
const mapServerItemToLocalItem = (serverItem) => {  //Ye object server se aaya hua hai.
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};