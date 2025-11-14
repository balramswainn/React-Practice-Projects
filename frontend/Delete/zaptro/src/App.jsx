import { BrowserRouter, Routes,Route } from "react-router-dom"
import {useEffect, useState} from "react"
import Home from "./pages/Home"
import Products from "./pages/Products"
import SingleProduct from "./pages/SingleProducts"
import CategoryProduct from "./pages/CategoryProduct"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Navbar from "./components/Navbar"
import axios from "axios"
import Footer from "./components/Footer"



function App(){

  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)  
  
 
  const getLocation = async () => {                                
    navigator.geolocation.getCurrentPosition(async pos => {  

      
      const { latitude, longitude } = pos.coords   

      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)        
        const exactLocation = location.data.address   
        setLocation(exactLocation)                   
        setOpenDropdown(false)               
        // console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }

  useEffect(() => {
    getLocation()  //component render hote hi ek baar user ka location fetch kar lo (auto detect on load). page load hote hi 1st time location le lo (default location detection). so waha clickkarne pe show hoga and ye na likhe toh bhi chalega but tumhe bina click kiya location chahiye toh ye bas hai
  },[])
  

  return (
    
     <BrowserRouter>
     <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/products' element={<SingleProduct />}></Route>
        <Route path='/category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
       <Footer/>
     </BrowserRouter>
  )
}

export default App
