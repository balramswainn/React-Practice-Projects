import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)    // location pe click karne k baad dropdown band hona chahiye isiliye
  const { cartItem, setCartItem } = useCart()

  const getLocation = async () => {                                 //location nikalne k liye ye function
    navigator.geolocation.getCurrentPosition(async pos => {   //Ye browser ka built-in function hai jo user ka current GPS location (latitude & longitude) de deta hai. Permission maangta hai user se ("Allow location access?"). Agar allow mil gaya to position object return karta hai jisme location details hoti hain.

      //Ye function callback leta hai (ek function jo data milte hi chalega). callback ke andar async lagaya hai, taaki tum uske andar await use kar sako.
      const { latitude, longitude } = pos.coords    //Jab location milti hai, getCurrentPosition tumhe pos (position object) deta hai. 
//  {coords: { latitude: 19.1234,longitude: 72.5678,accuracy: 10,...},timestamp: 1698989898989}  humne destructuring use ki latitude = pos.coords.latitude  longitude = pos.coords.longitude


      // console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`  //ye ek api hai jo latitude and longitutde leke exact location batata hai jisme state,city sab kuch hota hai
      try {
        const location = await axios.get(url)        //Axios is a library used to create HTTP requests to external resources like fetch isme hume json object ko js object me convert nhi karna padta automatically hota hai 
        const exactLocation = location.data.address   //api k andhr ka value hai data.address
        setLocation(exactLocation)                    //loaction iske pass agyi ab location ko as aprop pass karke navbar me bhej diya location k andhr -> city ,country,state hai
        setOpenDropdown(false)               //false bcz jab detect location pe click karte hi ye func chalta hai us time pe click hone k baad woh pop up band karna hai isiliye ye state yaha likha and ab false toh click karte hai close hoga
        console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }

  useEffect(() => {
    getLocation()
  },[])

  //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>                           

    {/* for small websites and less complex k liye BrowserRouter use kar sakte hai 03example-router mai main me ye kiya tha and app k andhr sab pages ka link dala yaha directly app me hi kar rhe hai and outlet use nhi kiya direct sab routes idhr hi likh rhe hai 
    * Small/medium project → Use <BrowserRouter> + <Routes>. Ideal if you don’t need advanced features like loaders or actions.Great for MVPs, portfolios, or basic e-commerce.
    Large or complex project → Use createBrowserRouter() + <RouterProvider>.Supports advanced Data APIs (loader, action, errorElement).
Better for large-scale and long-term projects.
     */}

      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
