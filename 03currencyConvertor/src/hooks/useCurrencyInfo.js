import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`)  
        .then((res) => res.json()) // json string ko js object me convert karta hai
        .then((res) => setData(res[currency]))    // res[currency] res [usd] gives only key value pairs  before it was usd={all the data } now only {key value pairs}
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



