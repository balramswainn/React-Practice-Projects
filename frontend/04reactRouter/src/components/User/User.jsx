import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} =useParams()

    // const params = useParams();    
// const userid = params.userid;

// ese bhi likh sakte hai uper wala bas object destructuring hai url se jo bhi dalemge object banke ata hai useParams me eg user/123  -> {userid:123} ye userid jo main jsx me route me likha tha user/:userid
  return (
    <div className='flex justify-center bg-gray-600 text-white text-3xl p-4'>
      User:{userid}
    </div>
  )
}

export default User
