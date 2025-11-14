import React,{useState} from 'react'
import { NavLink,Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import ResponsiveMenu from './ResponsiveMenu'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import CartComp from './CartComp'

const Navbar = () => {
  const cart=useSelector(state=> state.cart.cart)

  const [isOpen,setIsOpen]= useState(false)
  const [isNavOpen,setIsNavOpen]=useState(false);

  const toggleNav=()=>{
    setIsNavOpen(prev=>!prev)
  }
  return (
    <div>
        <div className='mx-auto flex justify-between items-center px-6 py-3 fixed top-0 z-20 bg-green-100 w-full border border-gray-100 shadow-xl lg:px-[180px]'>
              {/* logo section */}
             <Link to={''}><img src={Logo} className='md-wd-52 w-40'/></Link>

             {/* menu section */}
             <nav className='flex gap-5'>
               <ul className='text-xl font-semibold md:flex items-center gap-7 hidden'>
                <NavLink to={'/'} className={({isActive})=>` ${isActive? "text-green-600":" text-gray-700"}`}>Home</NavLink>
                <NavLink to={'shop'} className={({isActive})=>` ${isActive? "text-green-600":" text-gray-700"}`}>Shop</NavLink>
                <NavLink to={'about'} className={({isActive})=>` ${isActive? "text-green-600":" text-gray-700"}`}>About</NavLink>
                <NavLink to={'contact'} className={({isActive})=>` ${isActive? "text-green-600":" text-gray-700"}`}>Contact</NavLink>
               </ul>
               <Link className='relative'  onClick={()=>setIsOpen(prev=>!prev)}>
                 <ShoppingCart className='w-6 h-6'/>
                 <span className='absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{cart.length}</span>
               </Link>
               {
                isNavOpen ? <HiMenuAlt3 className='h-7 w-7 md:hidden' onClick={toggleNav}/>:<HiMenuAlt1 className='h-7 w-7 md:hidden' onClick={toggleNav}/>
               }{
                isOpen && <div className='fixed top-0 left-0 w-full h-full bg-black/70 z-40' onClick={()=>setIsOpen(false)}></div>
               }
             </nav>
        </div>
        { isNavOpen && <ResponsiveMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>}
         <CartComp isOpen={isOpen} setIsOpen={setIsOpen}/>  
    </div>
  )
}

export default Navbar
