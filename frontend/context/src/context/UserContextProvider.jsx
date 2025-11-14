import React from "react"
import UserContext from "./UserContext"

const UserContextProvider =({children})=>{
    const [user,setUser] = React.useState(null)
    // Matlab tumne explicitly bataya ki shuru me koi user nahi hai.Ye clear hai ki baad me user object milega ya null rahega.Isse type aur intention dono clear ho jata hai.        Always initialize state with a meaningful default. Objects/arrays → useState({}) ya useState([])Strings/numbers → useState(''), useState(0)Async/fetch data (jaise user) → useState(null)


    // useState({}) Iska matlab hai ki shuru me ek empty object milega.Lekin dikkat ye hai ki tum baad me code me agar check karoge:if(user) { ye hamesha true hoga, kyunki {} truthy hai}             Matlab tumhe pata hi nahi chalega ki user API se load hua hai ya abhi empty hai.Agar null diya hai toh aage null check lagana padega.Yaha pe tumhe user && user.name ya user?.name (optional chaining) use karna padega. Agar tum default empty data dikhana chahte ho (jaise empty list UI me show karni hai) → useState({}) ya useState([])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {/*pehle object jsx expression and second object bcz context expect object for multiple values if single value hoti toh value="user" likh sakte the */}
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider









