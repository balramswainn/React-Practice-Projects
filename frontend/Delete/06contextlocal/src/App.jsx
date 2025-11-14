import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))  //return jo match nhi kar rha 
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  // const toggleHighlight=(id) =>{
  //   setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id ===id ? {...prevTodo, highlight : !prevTodo.highlight }:prevTodo))
  // }

  const toggleHighlight = (id) => {
  setTodos((prev) => {
    // Step 1: Update highlight toggle
    const updatedTodos = prev.map((prevTodo) =>
      prevTodo.id === id
        ? { ...prevTodo, highlight: !prevTodo.highlight }
        : prevTodo
    );

    // Step 2: Bring the updated todo to the front
    const target = updatedTodos.find((todo) => todo.id === id);
    const rest = updatedTodos.filter((todo) => todo.id !== id);

    // Step 3: Return new array with target first
    return [target, ...rest];
  });
};

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete,toggleHighlight}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App





// import './App.css'
// import React, { useEffect } from 'react'
// import { TodoProvider } from './contexts'



// function App() {



//   return (
//     <TodoProvider value={{todos,addTodo,updateTodo,deleteTodos,toggleComplete}}>
//       <div className="bg-[#172842] min-h-screen py-8">
//                 <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
//                     <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
//                     <div className="mb-4">
//                         {/* Todo form goes here */} 
                        
//                     </div>
//                     <div className="flex flex-wrap gap-y-3">
//                         {/*Loop and Add TodoItem here */}
                          
//                     </div>
//                 </div>
//             </div>
//     </TodoProvider>
//   )
// }

// export default App