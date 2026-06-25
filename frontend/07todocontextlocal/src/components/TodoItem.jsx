import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id)
    setIsTodoEditable(false);
  }

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}  //Checkboxes work best with onChange, not onClick for controlled components in React.always use onChange instead of onClick to properly handle state changes without warnings. React gives you a controlled component (checked is managed by state). But onClick fires before the checkbox actually changes — so React gets out of sync with the DOM, and you might see warnings or weird behavior.
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable} // readOnly true ho toh editable nhi hoga isliye ulta likha ki isTodoEditable true ho toh yaha false dikha and edit kar paye
           
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();                       //second click pe run karega ye fhir update todo update hoga first click pe we can just edit
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
      </div>
  );
}

export default TodoItem;


// question  :- todo.todo k liye state banaya but toggle.completed k liye nhi usko state me kyu nhi rakha bas todo k liye state kyu ?

// -->  State sirf ek jagah honi chahiye (Single Source of Truth). app me todo.completed ki original state Context me hai. waha humne iska state define kiya hai true hai ya false  , Ab TodoItem ka kaam sirf us value ko dikhana hai. checked={todo.completed} Ab user click karta hai -> toggleComplete(todo.id) Ye Context ki state change karta hai. Context re-render karega. TodoItem ko naya prop milega todo.completed = true Aur checkbox khud update ho jayega.  

// To agar tum local state bhi banaoge const [checked,setChecked]=useState(todo.completed) to ab 2 jagah same data store ho gaya. Context -> Local State Ye unnecessary hai.

// 2. Fir todo.todo me state kyu banayi? so if mai value={todo.todo} deta hai onChange={(e)=> updateTodo(todo.id,{...todo,todo:e.target.value})} pe update kardeta toh jese jese me kuch bhi likhu har letter ya keypress pe context update hota rehta  
// L
// Le
// Lea
// Lear
// Learn
// Learn R
// ...

// ❌ Nahi. Hum chahte hain User jitna marzi type kare. Jab Save dabaye tab update ho. so isiliye state banaya jo help karega jab  Original value edit kare ya update and wo temporary copy banagea jisse humne update k andhr dala jo click hone k baad hi update ho

// use og value jab 
// todo.completed 👉 Original value hi dikhani hai.

// use useState jab copy chahiye 
// todo.todo 👉 Original value edit karne ke liye temporary copy chahiye.



// Jo value tum kisi existing data se nikal sakte ho uske liye alag state mat banao.

// Kya ye value already kahi exist karti hai? -> Yes
// Kya mujhe sirf display karni hai? ->  Yes -> state mat banao
// Ya mujhe iski temporary copy bana ke user se edit karwana hai? -> yes -> state banao



// function TodoItem() {
 

//   return (
//       <div
//           className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
//               todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
//           }`}
//       >
//           <input
//               type="checkbox"
//               className="cursor-pointer"
              
//           />
//           <input
//               type="text"
//               className={`border outline-none w-full bg-transparent rounded-lg ${
//                   isTodoEditable ? "border-black/10 px-2" : "border-transparent"
//               } ${todo.completed ? "line-through" : ""}`}
            
           
//           />
//           {/* Edit, Save Button */}
//           <button
//               className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
             
//           >
//               {isTodoEditable ? "📁" : "✏️"}
//           </button>
//           {/* Delete Todo Button */}
//           <button
//               className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              
//           >
//               ❌
//           </button>
//       </div>
//   );
// }

// export default TodoItem;