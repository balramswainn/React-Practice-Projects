import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeTodo,updateTodo} from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)  //useSelector ek React hook hai jo tumhe Redux store ke state ko read karne deta hai.useSelector ko ek function dete ho: (state) => state.todo.todos Ye function ko Redux store ka state object pass hota hai(meaning configurestore me jo reducer pass kiya uska state object banta hai jisme har reduder ka naam key and uski value jo uska state hai waha jake dekh bataya hai ab yaha multiple slices nhi hai single hai toh waha koi reducer ka object nhi bana isliye state.todos karke access ho jaega nhi toh state.todo.todos )

    // reducer: todoReducer -> state:{ todos: [...] } acess kese kare->  state.todos        todoReducer toh state hi hai jisme todos hai object k andhr
    
    const dispatch = useDispatch()

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    

  return (
    <>
    <div>Todos</div>
    <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <input
                type="text"
                className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
                value={editText}
                
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}


            {editId === todo.id ? (
              <button
                onClick={() => {
                  dispatch(updateTodo({ id: todo.id, text: editText }));  //if me  todo.id:todo.id leta ya todo.text:editText leta key me, toh value mil jata  na hume bas key likhna hai isiliye id and text chahiye
                  setEditId(null);
                  
                }}
                className="text-white bg-green-500 py-1 px-3 rounded hover:bg-green-600 mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditId(todo.id);
                //   setEditText(todo.text);
                }}
                className="text-white bg-yellow-500 py-1 px-3 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos