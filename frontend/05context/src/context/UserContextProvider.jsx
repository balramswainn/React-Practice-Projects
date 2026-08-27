import React from "react"
import UserContext from "./UserContext"

const UserContextProvider =({children})=>{
    const [user,setUser] = React.useState(null)
    // Matlab tumne explicitly bataya ki shuru me koi user nahi hai.Ye clear hai ki baad me user object milega ya null rahega.Isse type aur intention dono clear ho jata hai.        Always initialize state with a meaningful default. Objects/arrays → useState({}) ya useState([]) , Strings/numbers → useState(''), useState(0) , Async/fetch data (jaise user) → useState(null)


    // useState({}) Iska matlab hai ki shuru me ek empty object milega.Lekin dikkat ye hai ki tum baad me code me agar check karoge:if(user) { ye hamesha true hoga, kyunki {} truthy hai}             Matlab tumhe pata hi nahi chalega ki user API se load hua hai ya abhi empty hai.Agar null diya hai toh aage null check lagana padega.Yaha pe tumhe user && user.name ya user?.name (optional chaining) use karna padega. Agar tum default empty data dikhana chahte ho (jaise empty list UI me show karni hai) → useState({}) ya useState([])

    // const value={user,setUser}    value={value}   ese bhi likh sakte the, value prop is what you want to share globally.
    return (
        <UserContext.Provider value={{user,setUser}}>{/* UserContext.Provider This component provides data to all child components that use UserContext. */}
            {/*pehla object jsx expression and second is object bcz context expect object for multiple values , if single value hota string value toh value="user" likh sakte the */}
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider




// | Data kya hai?                  | Initial state             | Example                      |
// | ------------------------------ | ------------------------- | ---------------------------- |
// | Ek object aana hai             | `null`                    | `user`, `product`, `profile` |
// | Multiple objects/list aani hai | `[]`                      | `users`, `products`, `posts` |
// | Text/string aani hai           | `''`                      | `name`, `search`, `email`    |
// | Number aana hai                | `0` / `null`              | `age`, `price`, `count`      |
// | Boolean                        | `false`                   | `isLoading`, `isOpen`        |
// | Form ka complete object        | `{}` ya predefined object | form fields                  |





// 1. API se single user aayega → null best     
// const [user, setUser] = useState(null);
// {user ? <h1>{user.name}</h1> : <p>Loading...</p>}  ya <h1>{user?.name}</h1>

// ex:- api se koi price arahi ho toh null de bcz 0 rakhunga toh uska price 0 show hoga koi bhi product k initially , samaj user select karna ho jisme multiple user ho so better hai inital null ho, koi product select karna ho store se 

// 2. API se list aayegi → []
// const [users, setUsers] = useState([]);
// {users.map(user => (
//   <p>{user.name}</p>
// ))}
// {users.length === 0 && <p>No users found</p>}


// bcz if single user raha toh usse hum ese show karte hai {user?.name} so yaha if humne null ki jagah useState({}) diya ye toh humesha true hi hoga user na milaho toh bhi isiliye null and if array k andhr sab objects ho usme hum {users.length === 0 && <p>No users found</p>} isse check karlete hai

// so bas display karna hai something toh direct [] but load karva ke fhir show karnahai toh
// Lekin kab API array mein null useful hai?Agar tumhe ye 3 states distinguish karni hain:
// null  → API abhi load nahi hui
// []    → API load hui, but kuch nahi mila
// [...] → data mil gaya

// const [products, setProducts] = useState(null); Ye useful hai.

// {products === null ? (
//   <Loader />
// ) : products.length === 0 ? (
//   <p>No products found</p>
// ) : (
//   products.map(product => <ProductCard product={product} />)
// )}




// 3. Text → ''
// const [name, setName] = useState('');
// <input
//   value={name}
//   onChange={(e) => setName(e.target.value)}
// />



// 4. Boolean → false
// const [isOpen, setIsOpen] = useState(false);
// {isOpen && <Menu />}


// 5. Number → context ke according Agar 0 genuinely valid initial value hai:
// const [count, setCount] = useState(0);

// Lekin agar "abhi number mila hi nahi" aur 0 ka matlab kuch aur hai:
// const [price, setPrice] = useState(null);

// Because: null = price abhi available nahi hai, 
// 0    = price actually zero hai




// | API response                                  | Default       | Why                                                        |
// | --------------------------------------------- | ------------- | ---------------------------------------------------------- |
// | Single object                                 | `null` ✅      | "data not available yet" clearly represent hota hai        |
// | Array/list                                    | `[]` ✅        | `.map()`, `.length`, `.filter()` directly use kar sakte ho |
// | Array + loading/no-data distinction important | `null` → `[]` | 3 states distinguish karni hain                            |
// | String                                        | `''`          | Empty string valid initial state                           |
// | Number                                        | `0`           | Agar `0` meaningful hai                                    |
// | Number + "not loaded" distinction             | `null`        | `null` = not available                                     |
// | Boolean                                       | `false`       | Natural initial state                                      |


// | Data kya hai?                  | Initial state             | Example                      |
// | ------------------------------ | ------------------------- | ---------------------------- |
// | Ek object aana hai             | `null`                    | `user`, `product`, `profile` |
// | Multiple objects/list aani hai | `[]`                      | `users`, `products`, `posts` |
// | Text/string aani hai           | `''`                      | `name`, `search`, `email`    |
// | Number aana hai                | `0` / `null`              | `age`, `price`, `count`      |
// | Boolean                        | `false`                   | `isLoading`, `isOpen`        |
// | Form ka complete object        | `{}` ya predefined object | form fields                  |



