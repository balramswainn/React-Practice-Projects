import {createContext, useContext} from "react"

export const TodoContext = createContext({   //dummy value  object use kiya bcz Yahan multiple cheezein pass karni thi — todos bhi, functions bhi.
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider


//for example createContext({
//  data:{}, diya and real state me main data ko array  const [data, setData] = useState(["real data"]);  de //raha hoon toh muje error dega?
//❌ Error nahi aayega — React ko fark nahi padta types alag hain.
//⚠️ Lekin agar dummy value aur real value ke type match nahi karte, toh tumhare component me galat assumption se runtime error ho sakta hai (jaise .map() array pe chalta hai, object pe nahi).

//Dummy value ka type waise hi rakhna jaise real state ka type hoga.Matlab agar real data array hai → dummy bhi array do ([]).Agar real data object hai → dummy bhi object do ({}).




// // ❌ Unnecessarily object mat banao
// createContext({ theme: "light" })  // agar sirf theme hi hai

// // ✅ Direct do
// createContext("light")



// Object tab use karo jab:
// javascript// Multiple cheezein ek saath deni ho
// createContext({
//     theme: "light",    // ← string
//     toggle: () => {},  // ← function
//     fontSize: 16       // ← number
// })


// // Sirf ek string hai toh object ki zarurat nahi
// createContext("light")  // theme ke liye

// createContext(0)        // number ke liye

// createContext(false)    // boolean ke liye

// createContext([])       // sirf array chahiye toh



// createContext({
//     todos: [],        // ← data
//     addTodo: () => {}, // ← function
//     deleteTodo: () => {} // ← function
// })

// // Agar array karte toh kaise likhte? ❌ Awkward hota
// createContext([todos, addTodo, deleteTodo]) // koi naam nahi, confusing