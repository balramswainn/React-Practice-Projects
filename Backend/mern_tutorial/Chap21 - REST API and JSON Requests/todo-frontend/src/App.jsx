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
    const item = await addItemToServer(itemName, itemDueDate);         //server ko bhej deta hai todo fhir server db me add karke response deta hai 
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
    await markItemCompletedOnServer(id);
    // Find the item and toggle its completed status
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        // Create a new object with toggled 'completed' property
        return { ...item, completed: true };
      }
      return item;
    });

    // Update state
    setTodoItems(updatedItems);
  };

  // Sort items: incomplete items first, then completed items
  const sortedItems = [...todoItems].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

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
