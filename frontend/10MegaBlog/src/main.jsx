import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

//Diff way
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" element={<Home />} />
      
//       <Route path="/login" element={
//         <AuthLayout authentication={false}>
//           <Login />
//         </AuthLayout>
//       } />
      
//       <Route path="/signup" element={
//         <AuthLayout authentication={false}>
//           <Signup />
//         </AuthLayout>
//       } />
      
//       <Route path="/all-posts" element={
//         <AuthLayout authentication>
//           <AllPosts />
//         </AuthLayout>
//       } />
      
//       <Route path="/add-post" element={
//         <AuthLayout authentication>
//           <AddPost />
//         </AuthLayout>
//       } />
      
//       <Route path="/edit-post/:slug" element={
//         <AuthLayout authentication>
//           <EditPost />
//         </AuthLayout>
//       } />
      
//       <Route path="/post/:slug" element={<Post />} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

// if authenticate ho toh baki pagesa ka access milega  if nhi ho toh nhi ho toh bas  login and signup dikehga
// Login/Signup sirf logged out users ke liye, baaki routes sirf logged in users ke liye.


// authentication={true}  → Login karo pehle, tab aao
// authentication={false} → Login ho chuke ho? Yahan mat aao

{/* <AuthLayout authentication> */}  //authentication alone (no value)  
// Ye shorthand hai authentication={true} ka Matlab — login hona zaroori hai is route pe jaane ke liye, Agar logged out ho → /login pe redirect


//authentication={false}
{/* <AuthLayout authentication={false}> */}
// - Matlab — **already logged in ho toh mat aao**
// - Agar logged in ho → `/` pe redirect
// - Login/Signup pages ke liye use hota hai 




















// Core React
// react & react-dom — The UI library itself. React builds the component tree; react-dom renders it to the browser DOM.

// Routing
// react-router-dom — Enables multi-page navigation (e.g., /login, /notes, /notes/:id) without full page reloads.

// State Management
// @reduxjs/toolkit — Manages global app state (logged-in user, active note, etc.) with less boilerplate than plain Redux.
// react-redux — Connects Redux store to React components via hooks like useSelector and useDispatch.

// Backend / Database
// appwrite — Your Backend-as-a-Service. Handles user authentication, database (storing notes), and file storage — no custom server needed.

// Forms
// react-hook-form — Manages form state and validation (login, signup, note title fields) efficiently with minimal re-renders.

// Rich Text Editor
// @tinymce/tinymce-react — Gives users a Word-like editor to write formatted notes (bold, italic, headings, lists, etc.).
// html-react-parser — Converts the HTML string that TinyMCE outputs back into renderable React elements for display.

// Styling
// tailwindcss — Utility-first CSS framework for rapid UI styling without writing custom CSS files.
// @tailwindcss/vite — Vite plugin that integrates Tailwind's build process directly into Vite.


// Dev Dependencies
// vite & @vitejs/plugin-react — Fast dev server and build tool optimized for React.
// eslint + plugins — Catches code errors and enforces best practices during development.
// @types/react & @types/react-dom — TypeScript type definitions for React (useful even in JS projects with some editors).
// globals — Provides global variable definitions for ESLint's environment configuration.