import React, { useState } from 'react'
import { products } from '../Utils/Data'
import ProductCard from '../components/ProductCard'
import { FaFilter } from 'react-icons/fa';
import empty from '../assets/empty.jpg'

const Shop = () => {
  const [search,setSearch]=useState('');
  const [categorys,setCategorys]= useState('');
  const [ranges,setRanges]=useState([0,500])
  const [resnav,setResnav]=useState(false)

  

  const filteredProducts=products.filter((product)=>{
    return product.name.toLowerCase().includes(search.toLowerCase()) && (categorys === "" || product.category ===categorys) && product.price >= ranges[0] && product.price <= ranges[1]
  })
  return (
    <div className='max-w-6xl mx-auto flex flex-col lg:gap-6 my-7 lg:mt-28 mt-24 h-max'>
      {/* filter section */}
      <div className='col-span1 p-4 bg-gray-100 h-max rounded-lg fixed w-[280px] mb-10 hidden md:block'>
    
        
           <h2 className='text-lg font-semibold mb-4'>Filters</h2>
          <input type="text" className='bg-white px-3' placeholder='Search..' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <select className='border-2 border-gray-700' value={categorys} onChange={(e)=>setCategorys(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Meat">Meat</option>
          </select>
          <div>
            <label>Price Range ${ranges[0]} - ${ranges[1]}</label><br />
          <input type="range" min={0} max={500} value={ranges[1]} onChange={(e)=> setRanges([ranges[0],Number(e.target.value)])}/>
          </div>
          <button className='bg-red-600 text-white px-3 py-1 rounded-2xl' onClick={()=> {
            setSearch('') ; setCategorys('') ; setRanges([0,500])
          }}>Reset</button>

      </div>

        <div className={`md:hidden bg-gray-100 flex justify-between items-center mx-4 px-4 py-20 mt-10 ${resnav ? "rounded-t-md" : "rounded-md"}`}>
        <h1 className='font-semibold text-lg'>Filters </h1>
        <FaFilter onClick={()=> setResnav((prev)=> !prev)} className='text-gray-80 cursor-pointer' />
          </div>
      {resnav ?  <div className=''>
          <h2>Filters</h2>
          <input type="text" className='bg-white px-3' placeholder='Search..' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <select className='border-2 border-gray-700' value={categorys} onChange={(e)=>setCategorys(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Meat">Meat</option>
          </select>
          <div>
            <label>Price Range ${ranges[0]} - ${ranges[1]}</label><br />
          <input type="range" min={0} max={500} value={ranges[1]} onChange={(e)=> setRanges([ranges[0],Number(e.target.value)])}/>
          </div>
          <button className='bg-red-600 text-white px-3 py-1 rounded-2xl' onClick={()=> {
            setSearch('') ; setCategorys('') ; setRanges([0,500])
          }}>Reset</button>

        </div>:<div></div>}
          
   
     
       {/* products section */}
      {
        filteredProducts.length > 0 ? (
          <div className='col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:ml-[300px] px-4 md:px-0 mt-6 md:mt-0'>
            {
              filteredProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />
              })
            }
          </div>
        ) : (
          <div className='lg:ml-[300px] flex justify-center'>
            <img src={empty} alt="" className='w-[500px]' />
          </div>
        )
      }
    </div>
  )
}

export default Shop
