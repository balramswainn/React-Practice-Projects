import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete,toggleHighlight} = useTodo()
  

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
    setIsTodoEditable(false)
  }

  const togglehighlight =() =>{
    toggleHighlight(todo.id)
    setIsTodoEditable(false) 
  }

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black 
            ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"} 
            ${todo.highlight ? "border-4 border-green-500 shadow-lg shadow-red-500/50" : "border-4 border-black/10"}

            `}
            // ye jo todo.highlight hai ye direct uper wale prop se le rha hoon iske andr jo hightlight
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""} `}

              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}    //initially readonly=true onclick iski value false hui so we can edit
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();           //second click pe run karega ye fhir update todo updat hoga first click pe we can just edit 
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>


          {/* <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.highlight}
              onChange={togglehighlight}
          />

          <button onClick={()=>setHighlight((prev)=>!prev)}>
          📌
          </button> */}

           {/* <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.highlight}
              onChange={togglehighlight}
          /> */}

          <button onClick={togglehighlight}>
          📌
          </button>
      </div>
  );
}

export default TodoItem;