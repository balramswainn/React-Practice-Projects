import {createSlice, nanoid } from '@reduxjs/toolkit';


const initialState = {
    todos: [{id: 1, text: "Hello world"}],
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload  //yaha sirf ek hi value arahi hai koi object nhi hai ,and yaha addtodo file me  dispatch(addTodo(input)) hai ye direct value hai so isiliye action.payload.text nhi likh sakte 
            }
            state.todos.push(todo)   
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload ) //same here bas id araha hai koi object nhi
        },
         updateTodo:(state,action)=>{
            state.todos=state.todos.map((todo)=> todo.id === action.payload.id ? {...todo,text:action.payload.text} : todo)
            //yaha pura object araha hai, dispatch(updateTodo({ id: todo.id, text: editText })); isiliye  action.payload.text likhn a jaruri hai to identify the correct todo
        }
    }
})



export const {addTodo, removeTodo,updateTodo} = todoSlice.actions

export default todoSlice.reducer



// Redux store ek centralized global state provide karta hai. Toh jab page reload nahi hota, ya session chal raha hota hai, Redux state me data rehta hai.

// Lekin:

// Page reload hone pe Redux store reset ho jata hai — isliye agar tum data persist karna chahte ho across page refreshes, tab bhi localStorage ki jarurat padti hai.

// 🔥 Ab Context API me jarurat zyada kyu padti hai?
// Context API me tum khud se state manage kar rahe ho (aur uska update logic).

// Redux Toolkit me middleware, DevTools, persist, and structure zyada powerful hai.