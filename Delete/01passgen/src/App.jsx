import React from 'react'
import {useState,useCallback,useEffect,useRef} from 'react'

function App() {

    const [password,setPassword] =useState('')
    const [length,setLength] =useState(8)
    const [charAllowed,setCharAllowed] =useState(false)
    const [numberAllowed,setNumberAllowed] =useState(false)

    const passGen=useCallback(()=>{
        let pass=''
        let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(charAllowed) str+="~!@#$%^&*()"
        if(numberAllowed) str+="1234567890"

        for(let i=0;i<length;i++){
            pass+=str.charAt(Math.round(Math.random()*str.length+1))
        }
        setPassword(pass)
    },[length,charAllowed,numberAllowed,setPassword])

    useEffect(()=>{
        passGen();
    },[length,charAllowed,numberAllowed,passGen])

    let passRef=useRef(null)

    function copytoClips(){
        passRef.current?.focus()
        passRef.current?.setSelectionRange(0,3)
        window.navigator.clipboard.writeText(password)
    }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          value={password}
          ref={passRef}
          
    
      />
      <button 
        onClick={copytoClips}
      
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={20}
      value={length}
      onChange={(e)=>setLength(e.target.value)}
      
       className='cursor-pointer'
       
        />
        <label>Length:{length} </label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        value={numberAllowed}
       onChange={(e)=> setNumberAllowed && setNumberAllowed((prev)=>!prev)}
        
        id="numberInput"
        
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            value={charAllowed}
            onChange={(e)=> setCharAllowed && setCharAllowed((prev)=>!prev)}
           
            id="characterInput"
           
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
   </div>
  )
}

export default App





