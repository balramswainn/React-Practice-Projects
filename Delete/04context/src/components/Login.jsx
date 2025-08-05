import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

function Login() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const {setUser} =useContext(UserContext)

    const clicky=(e)=>{
        e.preventDefault();
        setUser({username,password})
    }
  return (
    <>
        <h1>Login</h1>
        <input type='text' value={username} 
        onChange={(e)=> setUsername(e.target.value)} />
        {' '}
        <input type='text' value={password} 
        onChange={(e)=> setPassword(e.target.value)} />

        <button onClick={clicky}>Submit</button>
      
    </>
  )
}

export default Login
