import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import { useEffect, useState } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemCompletedOnServer,
} from "./services/itemsService";
import "./App.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then((initialItems) => {
      // Add completed property if it doesn't exist
      const itemsWithCompletedStatus = initialItems.map((item) => ({
        ...item,
        completed: item.completed || false,
      }));
      setTodoItems(itemsWithCompletedStatus);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {    
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);         //server ko bhejdeta hai todo fhir server db me add karke response deta hai 
    // Add completed property
    const newItem = { ...item, completed: false };                   // jo server se res aya usse 
    const newTodoItems = [...todoItems, newItem];                   // existing todoItems ko spread kiya and new ko add kiya and wapis usse state me update kardiya
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);     //ye jo id diya hai usse delete karega and uski id wapis return karega bcz tuje TodoItems se bhi woh hatana padega
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);   // bas wohi return karo jo same nhi hai deleteId ke
    setTodoItems(newTodoItems);
  };

  const handleToggleComplete = async (id) => {
    // await markItemCompletedOnServer(id);
    // // Find the item and toggle its completed status
    // const updatedItems = todoItems.map((item) => {    //ab yaha pe jo server ka response todo aya woh use nhi kar rha hai khudse hi ui me todo update kar rhe hai jo kio sahi nhi hai hume badalna padega 
    //   if (item.id === id) {
    //     // Create a new object with toggled 'completed' property
    //     return { ...item, completed: true };
    //   }
    //   return item;
    // });

    // // Update state
    // setTodoItems(updatedItems);

    // uper wale me jo server se response aaraha tha -> todo woh use nhi kar rhe the hum directly ui update kar rrhe the isiliye sahi nhi hai 

    //ab yaha pe hum direct setTodoItem use karke update kar rhe hai but humne jese uper kiya tha todoItems pe map lagake replace marna woh isiliye use nhi kiya bcz can cause bugs and Agar koi aur update already queue me ho: ❌ data overwrite ho sakta hai.

    // ye use kiya bcz Functional updater always latest state deta hai 3️⃣ Multiple updates safe Agar user fast clicks kare: Functional form safe rahega, Direct state read risky ho sakta hai The functional form of setState is preferred because it guarantees updates based on the latest state and avoids stale state bugs.

     const updatedTodo = await markItemCompletedOnServer(id);

      setTodoItems(prev =>
        prev.map(item =>
        item.id === id ? updatedTodo : item
        )
      );
  };

  // Sort items: incomplete items first, then completed items
  //Ye code todos ko is tarah sort karta hai ki incomplete items pehle aayein aur completed items baad me.
  const sortedItems = [...todoItems].sort((a, b) => {  //...todoItems → copy banata hai (original array safe) ...sort og array ko hi change kardega isiliye spread use kiya
    if (a.completed === b.completed) return 0; //Dono todos same status ke hain means [{1},{2}] sort ka concept hai a ,b, Order change nahi hoga
    return a.completed ? 1 : -1; //Agar a.completed === true toh a ko baad me bhej do...Agar a.completed === false  toh a ko aage rakho
  });     //sort method ka rule  Positive = push back, Negative = pull front

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <AppName />
            <AddTodo onNewItem={handleNewItem} />
            {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
            <TodoItems
              todoItems={sortedItems}
              onDeleteClick={handleDeleteItem}
              onToggleComplete={handleToggleComplete}
            ></TodoItems>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
