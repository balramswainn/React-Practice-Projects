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
           const productsData = res.data.products
           setData(productsData)
           
        } catch (error) {
            console.log(error);

        }
    }

    const getUniqueCategory = (data, property) =>{
        let newVal = data?.map((curElem) =>{
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal
      }
    
      const categoryOnlyData = getUniqueCategory(data, "category")
      const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{ data, setData,fetchAllProducts, categoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)
