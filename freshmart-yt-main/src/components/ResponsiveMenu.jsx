import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Link,NavLink } from 'react-router-dom'

const ResponsiveMenu = ({isNavOpen, setIsNavOpen}) => {
  return (
    <div className={`${isNavOpen ? "left-0":"-left-[100%]"}      fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-green-100 px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
      <div>
        <div>
            <h1 className='text-green-600 text-3xl font-bold'>FreshMart</h1>
        </div>
        <nav className='mt-12'>
           
            <ul className='flex flex-col gap-7 text-xl font-semibold'>
                <NavLink to={'/'} className={({isActive})=>`cursor-pointer ${isActive? "text-green-600":" text-gray-700"}`} onClick={()=>setIsNavOpen(false)}><li>Home</li></NavLink>

                <NavLink to={'shop'} className={({isActive})=>`cursor-pointer ${isActive? "text-green-600":" text-gray-700"}`} onClick={()=>setIsNavOpen(false)}><li>Shop</li></NavLink>

                <NavLink to={'about'} className={({isActive})=>`cursor-pointer ${isActive? "text-green-600":" text-gray-700"}`} onClick={()=>setIsNavOpen(false)}><li>About</li></NavLink>

                <NavLink to={'contact'} className={({isActive})=>`cursor-pointer ${isActive? "text-green-600":" text-gray-700"}`} onClick={()=>setIsNavOpen(false)}><li>Contact</li></NavLink>
                
                <Link><button onClick={()=>setIsNavOpen(false)} className='px-3 py-1 w-max rounded-md bg-green-600 text-white flex items-center gap-1'>Login<FaChevronRight/></button></Link>
            </ul>

            
        </nav>
      </div>
      <div>
       
      </div>
    </div>
  )
}

export default ResponsiveMenu
