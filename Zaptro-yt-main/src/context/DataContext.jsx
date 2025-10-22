import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);
// agar koi Provider wrap nahi karega toh context ka value null hoga.Sabko samajh aata hai ki "yaha initially koi value nahi hai, baad me Provider se milegi".Error handling easy hota hai: null na do to bhi chalega but default value undefined ho jaayegi.   Always initialize state with a meaningful default. Objects/arrays → useState({}) ya useState([])Strings/numbers → useState(''), useState(0)Async/fetch data (jaise user) → useState(null)

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()
    // Agar tum kuch nahi doge → default value undefined hoti hai.Matlab data ka type abhi uncertain hai → kabhi object ho sakta hai, kabhi array, kabhi string.Ye loose approach hai, jaldi bug create kar sakti hai.

    // fetching all products from api
    const fetchAllProducts = async () => {
        try {
           const res = await axios.get('https://fakestoreapi.in/api/products?limit=150')
           console.log(res);
           //Jab tum axios.get() use karte ho, uska response ek object hota jisme {data:{},status: 200,..bahot kuch hota hai} Matlab API se jo raw data aata hai wo res.data ke andar hota hai.
 
           const productsData = res.data.products   //data:{...,products:[],..} object k andhr ek products karke array hai usse access karne k liye
           setData(productsData)   //so pura array ka acces milgya products k
           
        } catch (error) {
            console.log(error);

        }
    }

    const getUniqueCategory = (data, property) =>{  // data jo hai na woh ek array hai [{},{},...]  
        let newVal = data?.map((curElem) =>{    // curElem har ek object pe iterate kar rha hai usme ek key hai category 
            return curElem[property]    //curElem["category"] bracket notation se access kiya bcz hume category string me diya niche
        })                               //category sab ek array me agye [...] but hume unique chahiye repeated nhi
        newVal = ["All",...new Set(newVal)]   // yaha hume bas unique category chahiye repeated nhi usse array me dediya
        return newVal
      }
    
      const categoryOnlyData = getUniqueCategory(data, "category")  // uper wale function me directly category likhta toh ajata curElem.category and yaha string ,me nhi likhna padta but hume brand k liye ye function wapis se likhna padta isiliye esa diya 
      const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{ data, setData,fetchAllProducts, categoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)





// second way


// import axios from "axios";
// import { createContext, useContext, useState } from "react";

// // context banate waqt ek "shape" (default object) define kar diya
// export const DataContext = createContext({
//   data: [],
//   setData: () => {},
//   fetchAllProducts: () => {},
//   categoryOnlyData: [],
//   brandOnlyData: [],
// });

//Yeh real state nahi hai.Yeh sirf ek fallback/dummy structure hai → taaki:Agar galti se Provider wrap karna bhool jao → app crash na ho.IntelliSense / TypeScript ko pata chale ki is context ke andar data aur setData property hamesha hongi.

// // custom hook for easy usage
// export const useData = () => {
//   return useContext(DataContext);
// };

// // Provider
// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(
//         "https://fakestoreapi.in/api/products?limit=150"
//       );
//       const productsData = res.data.products;
//       setData(productsData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getUniqueCategory = (data, property) => {
//     let newVal = data?.map((curElem) => curElem[property]);
//     newVal = ["All", ...new Set(newVal)];
//     return newVal;
//   };

//   const categoryOnlyData = getUniqueCategory(data, "category");
//   const brandOnlyData = getUniqueCategory(data, "brand");

//   return (
//     <DataContext.Provider
//       value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };


//for example createContext({
//  data:{}, diya and real state me main data ko array  const [data, setData] = useState(["real data"]);  de //raha hoon toh muje error dega?
//❌ Error nahi aayega — React ko fark nahi padta types alag hain.
//⚠️ Lekin agar dummy value aur real value ke type match nahi karte, toh tumhare component me galat assumption se runtime error ho sakta hai (jaise .map() array pe chalta hai, object pe nahi).

//Dummy value ka type waise hi rakhna jaise real state ka type hoga.Matlab agar real data array hai → dummy bhi array do ([]).Agar real data object hai → dummy bhi object do ({}).