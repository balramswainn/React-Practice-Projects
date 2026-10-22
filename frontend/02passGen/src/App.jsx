import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("") 
  //React state me: String, Number, Boolean, Array, Object..sab store kar sakte ho.
// const [video, setVideo] = useState({ isEnd: false  startPlay: false ,isPlaying: false,});
// Update kaise karenge? -> setVideo(prev => ({ ...prev, isPlaying: true }));  ...prev nhi likhta toh pura object replace hojata bas {isPlaying: true} rehta


  //useRef hook
  const passwordRef = useRef(null) //Initially DOM element exist nahi karta, isliye ref ko null se initialize karte hain. 
  // so passwordRef= { current :null}
  // After render React automatically set karta hai:
//passwordRef.current = <input element>
// So flow: initial render -> passwordRef.current = null
// after DOM mount -> passwordRef.current = input element
//useRef = value ya DOM reference store karo bina re-render ke
// const passwordRef = useRef(); Ye valid hai. Agar initial value nahi dete, toh passwordRef.current ki initial value undefined hoti hai.Best practice: DOM element ko reference karna hai toh useRef(null) use kar.

// Rule 1: single DOM Element ko reference karna hai  :- const inputRef = useRef(null); Kyuki starting render pe input exist hi nahi karta.
// Rule 2: Ek value store karni hai jo rerender na karaye :- const countRef = useRef(0); 0,null,"" UI update nahi hoga. Kyuki ref change hone pe rerender nahi hota.
// Rule 3: Multiple DOM Elements store karne hain  :- const videoRef = useRef([]);
// useRef({}) 👉 "Mujhe key-value form me multiple references ya data store karna hai."



  const passwordGenerator = useCallback(() => {   
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  //Normally, in React:Every time your component re-renders(Component ke andar koi state change ho,Props change ho,Same component UI me dobara show ho,    Re-render means:When React redraws the UI because state or props changed(without browser refresh).),all functions written inside it are created again (new copies in memory).So if you didn’t use useCallback,passwordGenerator would be a new function every render —even if its logic didn’t change!

  //When to use useCallback?.....When passing function as prop to a child component,Function heavy/expensive computation karta ho Performance optimize,Function dependency ho kisi useEffect me(means useEffect me function call kiya hai and dependecy array mai hai )
  
  //Should we wrap all functions in useCallback?”No. Only those functions that are passed as props to children or used inside useEffect and could cause unnecessary re-renders ,should be wrapped in useCallback. Otherwise it harms performance.

  //useCallback is a React hook that memoizes (remembers) a function —meaning React won’t recreate that function every time your component re-renders unless its dependencies change.So it’s mainly used for performance optimization, especially when:You’re passing functions to child components (to avoid unnecessary re-renders)Or you have functions that are expensive to recreate,
  // useCallback function ki reference ko renders ke beech preserve karta hai, jab tak uski dependencies change nahi hoti. useCallback function ko automatically execute nahi karta. Woh function reference ko cache karta hai.

  //If you don’t use useCallback, the function would be recreated on every render, even if nothing changes — not a big issue here, but it’s a good habit So useCallback ensures React reuses the same function instance until any dependency changes.


  //Why setPassword is also inside useCallback dependency? Because you used it inside the function.React wants you to include everything you use inside a hook’s body.Even though setPassword doesn’t change (React guarantees that),it’s good practice and removes React warnings.
 

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();             // isiliye null check lagana pada bcz passwordRef ={ current:null } rehta toh error deta 
    passwordRef.current?.setSelectionRange(0, 999);  // passwordRef.current = <input element>  
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
        min={0}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
         //so react needs function reference not function call
          />
          <label>Length: {length}</label>
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




// useState → value change karo, UI re-render ho sakta hai.
// useRef → value ya DOM reference store karo, change se UI re-render nahi hota.


// 1. useState — value change hogi toh UI update hoga 
// (example counter value badhega toh ui me value dikhega bcz ui rerender hua)
// Andar kya hua?
// 1. setCount(1) call hua.
// 2. React ne component ko re-render kiya.
// 3. <h1>{count}</h1> mein nayi value 1 render hui.
// Matlab useState tab use karte hain jab value change hone par UI ko update karna ho.


// 2. useRef — value change hogi, lekin UI automatically update nahi hoga

// import { useRef } from "react";

// function App() {
//   const count = useRef(0);

//   return (
//     <>
//       <h1>{count.current}</h1>
//       <button onClick={() => count.current++}>
//         Increase
//       </button>
//     </>
//   );
// }
// Is code mein jab tu count.current++ karega, toh ref ki value badhegi, lekin React ko pata nahi chalta ki UI update karna hai. Isliye screen par purana number hi dikhega, jab tak koi doosri wajah se re-render na ho.

// Ref value ko store karta hai, par us value ko screen par update karne ka signal nahi deta.
// uses:- 1. DOM element ko directly access karna ,Input par focus, text select ya scroll karna.
// 2. Value store karna without re-render, Aisi value store karna jiske change se UI update nahi karna.
// 3. Previous value store karna, Pichli render ki value ko yaad rakhna.
// 4. Timer ID store karna, setTimeout ya setInterval ki ID store karna, taaki baad mein timer clear kar sakein.
// const timerRef = useRef(null);

// timerRef.current = setTimeout(() => {
//   console.log("Hello");
// }, 1000);
// Yaad rakh bhai: useRef ka sabse important use hai DOM ko access karna aur aisi values store karna jinhe change karne par React ka re-render trigger nahi karna.