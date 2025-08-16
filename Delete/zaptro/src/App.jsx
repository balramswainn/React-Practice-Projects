import { BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"


function App() {

  

  return (
    
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
       
     </BrowserRouter>
  )
}

export default App
