import {createContext, useContext} from "react"

export const TodoContext = createContext({
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