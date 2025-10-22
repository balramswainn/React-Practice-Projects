import {useEffect, useState} from "react"



function useCurrencyInfo(currency){
    const [data, setData] = useState({})
     //Always initialize state with a meaningful default. Objects/arrays → useState({}) ya useState([])Strings/numbers → useState(''), useState(0)Async/fetch data (jaise user) → useState(null)
     
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`)  
        .then((res) => res.json()) // json string ko js object me convert karta hai
        .then((res) => setData(res[currency]))    //res={jisme extra dta hai and usd:{all currency rates}} so  res[currency] res [usd] gives usd ka object milta hai { usd:{all the data that we will get }}} usd object milta hai jisme pura object mila { inr:009; euro: 9898;....}
        //Tumne function ko useCurrencyInfo("usd") se call kiya.Matlab currency = "usd".Jab bracket notation likha res[currency] → yeh res["usd"] ban gaya.
        console.log(data);
    }, [currency])
    console.log(data);
    return data
}

export default useCurrencyInfo;


//tere man me doubt araha hog ki bas usd ka value hi kyu liya from se niche  to se inr bhi toh hai but ye soch hum ye 
// usd object se bas uska key value pair chahiye jisme usd and inr dono hoga and most imp ( from me jo value hoga woh imp 
// hai for example abhi user usd select karega jo pre selected hai so usd ek object hai jiske andhr sab key value pairs hai jo 
// ye function me ja rha hai currency k through so hume key value pairs mila jisme usd bhi hai so bas convertor pe 
// usd show hoga and to me jo bhi tum select karoge woh usd k value se multiply hoga uss currency ka value pane k liye and 
// jab tum from me kuch aur karoge so uska object yaha aega jisee hume sabka key value pairs milega woh api hai jiske pass pehle 
// se data rehta hai)


// Why do we use custom hooks in React when we can manage things with Redux or Context?
// A:Custom hooks are used to reuse logic easily across components without depending on global state management.
// Redux/Context are good for app-wide state sharing.Custom hooks are good for component-level reusable logic (like API calls, form handling, timers).They make code clean, testable, and DRY (Don’t Repeat Yourself).You can even combine Redux/Context logic inside a custom hook for better abstraction.
// 👉 Example:If multiple components need to fetch users, instead of repeating useEffect + axios everywhere, we just write useUsers() once as a custom hook.

