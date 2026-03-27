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

//Importand authentication koi value hold karke nhi rakh rha hai jese route pe define hai woh value rehta hai 
// ye use kar rha hai bcz url pe click karke page load na kar paye protected route protected rahe


// By default authentication = true , authstatus = false(bcz login nhi kiya)


// case 1 : new user -> register -> authstatus->true       so now  useEffect run hoga bcz dependency me diya hai 

// authenticatiom = true, authStatus = true

// if(authentication && authStatus !== authentication)    
//     true && true !== true 
//     true && false 
// -> else if pe jaega 

// else if(!authentication && authStatus !== authentication)
//     !true && true !== true
//     false && false
// setLoader pe jaega jo loader hata dega and usse jo page chahiye render karega means register karte hi app k andhr ja sakta hai 




// case 2: user logout -> authstatus = false , authentication = true ...but user url me add-post,edit-post,all-post daltahai tab

// authenticatiom = true, authStatus = false

// if(authentication && authStatus !== authentication)    
//     true && false !== true 
//     true && true 
// -> navigate("/login")   login pe chale jaega 




// case 3: user logout hi hai and login pe click karta hai but us route pe   <AuthLayout authentication={false}>  mention hai 

// authentication = false, authStatus= false 

// -> sab condition false hoga toh 
// setLoader pe jaega and login page render ho jaega 




// case 4:  user logged in hai and wants to access the login and signup page 

// authentication = false , authStatus = true

// else if(!authentication && authStatus !== authentication){   
//           !false && true !== false
//           true && true 

// home page render hoga but woh login and signup pe nhi ja paega if jana hai toh usse logout karna padega jisse authstatu = false hojaye

















