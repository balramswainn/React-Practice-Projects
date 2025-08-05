import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
const data=useLoaderData();

 // const [data, setData] = useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/hiteshchoudhary')
    //  .then(response => response.json())
    //  .then(data => {
    //     console.log(data);
    //     setData(data)
    //  })
    // }, [])

    //if we dont use useEffect will it work?
    
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
        Name:{data.name} <br />Github followers:{data.followers} 
       <img src={data.avatar_url} alt="Git pic" width={300}></img>
     </div>
  )
}






export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}

