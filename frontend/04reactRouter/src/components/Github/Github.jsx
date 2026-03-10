// import React from 'react'
// import {useState,useEffect} from 'react'

// export default function Github() {
//     const [data,setData] =useState([])

// useEffect(()=>{
//     fetch("https://api.github.com/users/hiteshchoudhary")
//     .then((res)=> res.json())
//     .then((data)=> setData(data))
// },[])
//   return (
//     <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
//       Github followers:{data.followers}
//       <img src={data.avatar_url} alt="Git pic" width={300}></img>
//     </div>
//   )
// }





// or 




// import React, { useEffect, useState } from 'react'

// function Github() {
//   const [data, setData] = useState({})

//   useEffect(() => {        //useEffect ka callback async function nahi hona chahiye.useEffect ka callback async function nahi hona chahiye.
//     const fetchData = async () => {
//       const response = await fetch('https://api.github.com/users/hiteshchoudhary')
//       const json = await response.json()
//       setData(json)
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
//       Github followers: {data.followers}
//       <img src={data.avatar_url} alt="Git pic" width={300} />
//     </div>
//   )
// }
// export default Github




//or 




// for optimization Github pe hover karte hi start ho jaega

import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()   // Yaha bhi technically response.json() Promise return kar raha hai. but 👉 React Router ka loader automatically Promise resolve (await) karta hai.

    // or

    // const res = await response.json()   // response.json() k pehle await likhna hota hai bcz wo promise return karta hai
    // return res;
}













