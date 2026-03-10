import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from './components/Layout'
import {About, Contact, User, Home} from './components/index'
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom'
import Github,{githubInfoLoader} from './components/Github/Github'



// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children:[
//       {
//         path:"/",
//         element:<Home/>
//       },
//       {
//         path:"/about",
//         element:<About/>
//       },
//       {
//         path:"/contact",
//         element:<Contact/>
//       },
//       {
//         path:"/github",
//         element:<Github/>
//       }
//     ]
//   }
// ])   

// or

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='user/:userid' element={<User/>}/>
      <Route path='github' 
      loader={githubInfoLoader}  //ye function call karega jo api call kar rha hai but woh sab yaha bhi  {()=>{}} kar skate hai api call 
      element={<Github/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)


// 1️⃣ BrowserRouter (Old / Traditional way) for small / medium apps me common
// 2️⃣ RouterProvider (New Data Router) React Router v6.4+ me new system introduce hua hai: Data Router. for Medium / large apps

// Feature	BrowserRouter	RouterProvider
// loader	      ❌	            ✅
// actions	    ❌	            ✅
// data APIs	  ❌	            ✅
// Agar BrowserRouter use karoge toh API call component ke andar useEffect me karna padega.means uper loader use kiya hai woh api callkar rha hai normally useEffect me hota hai





// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'

// import Layout from './components/Layout'
// import { About, Contact, User, Home } from './components/index'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Github from './components/Github/Github'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Layout />}>        
//           <Route index element={<Home />} />
//           <Route path='about' element={<About />} />
//           <Route path='contact' element={<Contact />} />
//           <Route path='user/:userid' element={<User />} />
//           <Route path='github' element={<Github />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// )