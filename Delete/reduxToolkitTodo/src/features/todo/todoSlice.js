import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState={
    todos:[{id:1,text:"something"}]
}

export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id !== action.payload)
        },
        updateTodo:(state,action)=>{
            state.todos=state.todos.map((todo)=> todo.id === action.payload.id ? {...todo,text:action.payload.text} : todo)
        }
       
    }
})

export const {addTodo,removeTodo,updateTodo} = todoSlice.actions
export default todoSlice.reducer

// updateTodo: (state, action) => {
        //     state.todos = state.todos.map((todo) =>
        //       todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        //     );
        //   }

          

        // updateTodo: (state, action) => {
        //     const { id, text } = action.payload;
        //     const todo = state.todos.find(todo => todo.id === id);
        //     if (todo) {
        //       todo.text = text;
        //     }
        //   }