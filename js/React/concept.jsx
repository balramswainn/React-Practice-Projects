import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState('start')

  const arr=["balram","jerry","sumant","efwef","wewed","wefwef","wefrwqef","awedrwqe","qw3eq"]

const change=()=>{
  let num=Math.floor(Math.random() * arr.length)
  setCount(arr[num])
}

//  setInterval(change, 1000) ❌ //Har render pe ye line dobara run hogi, Har baar naya interval create hoga1 → 2 → 3 → 10 → 100 interval 😵 sab ek saath chal rahe → fast fast change

// or

  // useEffect(()=>{
  //   change();
  // },[change])   //infinite loop me ja toh rha hai but same number araha hai toh react ko lagta hai ye toh same number hai last state me jo tha so woh fhir change karna band kardeta hai 

// or

  useEffect(() => {
    const interval = setInterval(change, 1000)

    return () => clearInterval(interval) // cleanup
  }, []) // sirf ek baar chalega, useEffect sirf ek baar chala ,BUT usme jo setInterval lagaya… wo baar baar chal raha hai,
  // so mount pe useEffect chalega and setInterval chalte rahega and Kab clearInterval chalega? component unmount ho (page change / remove) ya dependency change ho (yaha nahi hoga because [] hai) 👉 Tab interval band ho jayega 

  // “Wapas kaise chalta hai?” tum page se bahar gaye → interval band phir wapas aaye → useEffect fir run → interval fir start
  // 👉 setInterval lagaya = clearInterval likhna compulsory


// Mujhe continuously chalana hai toh clearInterval kyu? -> Continuous chalana hai tab bhi cleanup zaroori hai
// Tum ek page pe aaye → interval start ,Phir dusre page pe chale gaye (component unmount)
// 👉 Agar clearInterval nahi kiya: wo interval background me chalta rahega 😨, aur har second change() call karta rahega
// 👉 Result: memory leak , unwanted API calls / state updates, errors ("Can't perform state update on unmounted component")

// 2. “Normal JS me toh clearInterval nahi lagate? Normal JS → page reload pe sab reset,React → component mount/unmount hota rehta hai
  return (

    <>
    <h1>{count} Welcomes You</h1> 
    {/* <button onClick={change} style={{backgroundColor:"red"}}>Change</button> */}
    </>

  )
}

export default App
