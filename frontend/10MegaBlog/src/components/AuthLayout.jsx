import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {  //children — jo component wrap kiya hai wo, authentication = true — default protected route hai.   true — login hona chahiye access ke liye,    false — already logged in ho toh mat aao (login/signup page)

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)  // state ka access liya login hai ya nahi , true -> loggedin , false-> loggedout

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){  
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)  // dono true ho ya dono false direct yaha aaega 
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>  //Pehli baar app load hoti hai — authStatus check hone me time lagta hai Tab tak Loading dikhao Check ho gaya — setLoader(false) — children render karo
}



// *Case 1: `authentication=true` (protected route) + user logged out

// authentication = true
// authStatus = false -> user logged out hai 
// true && false !== true  ✅
// → "/login" pe bhejo

// loggein user ne logout kiya so authstatus -> false and authentication -> true isiliye login pe bhejo





// *Case 2: `authentication=false` (login/signup page) + user already logged in

// authentication = false
// authStatus = true
// !false && true !== false  ✅
// → "/" pe bhejo

// new user register kiya authstatus true hua and authentication false bcz new user hai so -> home page pe 
//  authentication=false isliye hai kyunki login/signup page pe already logged in user ko nahi aana chahiye, new user ka koi lena dena nahi. Agar koi logged in user manually /signup URL pe jaaye toh usse home pe bhejo.





// *Case 3: Sab sahi hai — kuch mat karo, children render karo

// authentication = true, authStatus = true  → match, no redirect
// authentication = false, authStatus = false → match, no redirect

// Jab authentication aur authStatus dono match karte hain — koi redirect nahi, bas children render karo

// Case 3a:
// User logged in hai → /all-posts pe jaata hai authentication=true, authStatus=true → match ✅
// → AllPosts dikhao


// Case 3b:
// User logged out hai → /login pe jaata hai authentication=false, authStatus=false → match ✅
// → Login page dikhao


