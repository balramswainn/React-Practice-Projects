import { useState, useCallback, useEffect, useRef } from 'react'




function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {   
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  //Normally, in React:Every time your component re-renders(Component ke andar koi state change ho,Props change ho,Same component UI me dobara show ho,    Re-render means:When React redraws the UI because state or props changed(without browser refresh).),all functions written inside it are created again (new copies in memory).So if you didn’t use useCallback,passwordGenerator would be a new function every render —even if its logic didn’t change!
  //When to use useCallback?.....When passing function as prop to a child component,Function heavy/expensive computation karta ho Performance optimize,Function dependency ho kisi useEffect me(means useEffect me function call kiya hai ).............Should we wrap all functions in useCallback?”No. Only those functions that are passed as props to children or used inside useEffect and could cause unnecessary re-renders ,should be wrapped in useCallback. Otherwise it harms performance.

//useCallback is a React hook that memoizes (remembers) a function —meaning React won’t recreate that function every time your component re-renders unless its dependencies change.So it’s mainly used for performance optimization, especially when:You’re passing functions to child components (to avoid unnecessary re-renders)Or you have functions that are expensive to recreate,

//If you don’t use useCallback, the function would be recreated on every render, even if nothing changes — not a big issue here, but it’s a good habit So useCallback ensures React reuses the same function instance until any dependency changes.


//Why setPassword is also inside useCallback dependency? Because you used it inside the function.React wants you to include everything you use inside a hook’s body.Even though setPassword doesn’t change (React guarantees that),it’s good practice and removes React warnings.
 

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

 
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  //All variables or functions you use inside useEffect should be listed in its dependency array.Inside your effect, you used:So React needs to know when that function changes.That’s why it’s included in [passwordGenerator].Now, since passwordGenerator is memoized with useCallback,it will only “change” when its internal dependencies change (like length, numberAllowed, or charAllowed).

  //Because passwordGenerator is a function,and functions are objects in JavaScript — meaning:Every time a new function is created, its reference (memory address) changes.So, if React sees that passwordGenerator (the function reference) changes,it will think something new happened and re-run the useEffect.

  //useCallback ensures passwordGenerator doesn’t change unless, length, numberAllowed, or charAllowed change.So by including it in the dependency array:We keep the dependency list complete (React won’t warn you),And thanks to useCallback, it won’t trigger unnecessary re-runs.✅ It’s both safe and optimized.

  //If we didn’t use useCallback Then passwordGenerator would be a new function every render,so your useEffect would keep running infinitely — causing an infinite loop ⚠️ if put inside useEffect so use useCallback when you put a function inside useEffect. 

   //Why setPassword is also inside useCallback dependency? Because you used it inside the function.React wants you to include everything you use inside a hook’s body.Even though setPassword doesn’t change (React guarantees that),it’s good practice and removes React warnings.

  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
         //so react needs function reference not function call
          />
          <label>Lengthss: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          checked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>

  )
}

export default App













// function App() {
 

  
  
//   return (
//           <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
//         <h1 className='text-white text-center my-3'>Password generator</h1>
//        <div className="flex shadow rounded-lg overflow-hidden mb-4">
//         <input
//             type="text"
//             className="outline-none w-full py-1 px-3"
//             placeholder="Password"
           
//         />
//         <button
        
//         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
//         >copy</button>
        
//     </div>
//     <div className='flex text-sm gap-x-2'>
//       <div className='flex items-center gap-x-1'>
//         <input 
//         type="range"
       
//          className='cursor-pointer'
         
//           />
//           <label>Length: </label>
//       </div>
//       <div className="flex items-center gap-x-1">
//       <input
//           type="checkbox"
         
//           id="numberInput"
          
//       />
//       <label htmlFor="numberInput">Numbers</label>
//       </div>
//       <div className="flex items-center gap-x-1">
//           <input
//               type="checkbox"
             
//               id="characterInput"
             
//           />
//           <label htmlFor="characterInput">Characters</label>
//       </div>
//     </div>
// </div>
    

//   )
// }

// export default App