import React, { useState } from 'react'

function App(){

  const  [counter, setCounter] = useState(12);

  const funcounter =()=>{
    
    setCounter(counter + 1)   
    setCounter(counter + 1)
    setCounter(counter + 1)
  }
  return (
    <div onClick={funcounter}>counter {counter}</div>
  )
}

export default App;




// case 1: 
  // const  [counter, setCounter] = useState(12);

    setCounter(counter + 1)   
    setCounter(counter + 1)
    setCounter(counter + 1)  //-> 13

//  Both lines run during the same render, so both see the same value (12).
// When multiple setState calls use the same state value in one render, React batches the updates. So both setCounter(counter + 1) use the same previous value, resulting in only one increment.
  
// Correct way (functional update) :- 

 setCounter(prev => prev + 1) //-> 13
 setCounter(prev => prev + 1) //-> 14


// case 2:
  // const  [counter, setCounter] = useState(12);

  setCounter(counter++); //-> Uncaught TypeError: Assignment to constant variable.

// counter is const, and counter++ tries to modify it directly. const x = 5; x++ // ❌ not allowed React state must not be mutated directly.


// case 3:
  // let  [counter, setCounter] = useState(12);

  setCounter(counter++); //-> 13
  setCounter(counter++); //-> 13

//Now counter++ is allowed because let variables can change.But ⚠️ this is bad practice in React. React state should never be mutated directly.Always keep it const.


// case 4:
// let  [counter, setCounter] = useState(12);

setCounter(++counter) //-> 13
setCounter(++counter) //-> 14
setCounter(++counter) //-> 15

//Because ++counter mutates the variable immediately. ++counter → 13  -> setCounter(13) So it increased 3 times. But again ⚠️ this is not recommended.