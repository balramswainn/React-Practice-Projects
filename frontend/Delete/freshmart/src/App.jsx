import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shop from './pages/Shop'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {


  return (
   <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/shop' element={<Shop/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
