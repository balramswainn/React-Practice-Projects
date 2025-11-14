import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)   //appwrite se data fetch karenge toh aane ko time lagta hai ho sakta hai network request me time lag jaye isiliye ye state banaya hai so conditional rendering ho sake true hai toh loader chalu ho jaye 
  const dispatch = useDispatch()

  useEffect(() => {                 // bcz jese hi application load ho toh ye run kare ki login ho ya nhi ho
    authService.getCurrentUser()         // auth me ye method banaya tha currentuser dene k liye mila toh .then
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))     // userData:{details users ka in object}
      } else {
        dispatch(logout())           // use login nhi hai toh logout kardo
      }
    })
    .finally(() => setLoading(false))       // finally run hoga hi kuch bhi ho   ...loading ko false kardiya 
  }, [])
  
  return !loading ? (          //loading false hai toh ye dikhega nhi toh null (means loading ka animation hogya jo mankiya wo)
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App